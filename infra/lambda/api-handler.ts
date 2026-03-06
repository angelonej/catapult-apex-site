/**
 * api-handler.ts
 *
 * AWS Lambda handler — production version of local-api.ts.
 * Deployed behind API Gateway (HTTP API, proxy integration).
 *
 * Environment variables (set by provision-aws.ts / Lambda config):
 *   DYNAMODB_TABLE_NAME  — e.g. "ApexAgentStudio-prod"
 *   AWS_REGION           — injected automatically by Lambda runtime
 */

import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb'

// ─── Config ───────────────────────────────────────────────────────────────────

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME ?? 'ApexAgentStudio-prod'
const BOARD_ID   = 'default'
const COMPANY_ID = 'default'

// ─── DynamoDB client (no endpoint override — uses real AWS) ───────────────────

const rawClient = new DynamoDBClient({})
const doc = DynamoDBDocumentClient.from(rawClient)

// ─── Ensure table exists (idempotent) ─────────────────────────────────────────

async function ensureTable(): Promise<void> {
  const { TableNames = [] } = await rawClient.send(new ListTablesCommand({}))
  if (TableNames.includes(TABLE_NAME)) return

  await rawClient.send(
    new CreateTableCommand({
      TableName: TABLE_NAME,
      BillingMode: 'PAY_PER_REQUEST',
      KeySchema: [
        { AttributeName: 'PK', KeyType: 'HASH' },
        { AttributeName: 'SK', KeyType: 'RANGE' },
      ],
      AttributeDefinitions: [
        { AttributeName: 'PK', AttributeType: 'S' },
        { AttributeName: 'SK', AttributeType: 'S' },
        { AttributeName: 'GSI1PK', AttributeType: 'S' },
        { AttributeName: 'GSI1SK', AttributeType: 'S' },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'GSI1',
          KeySchema: [
            { AttributeName: 'GSI1PK', KeyType: 'HASH' },
            { AttributeName: 'GSI1SK', KeyType: 'RANGE' },
          ],
          Projection: { ProjectionType: 'ALL' },
        },
      ],
    }),
  )
}

// ─── Board agent helpers ──────────────────────────────────────────────────────

async function listBoardAgents(): Promise<unknown[]> {
  const result = await doc.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(PK, :prefix)',
      ExpressionAttributeValues: { ':prefix': `BOARD#${BOARD_ID}` },
    }),
  )
  return (result.Items ?? []).map(({ PK: _pk, SK: _sk, ...rest }) => rest)
}

async function putBoardAgent(agent: Record<string, unknown>): Promise<void> {
  const agentId = agent.agentId as string
  await doc.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `BOARD#${BOARD_ID}`,
        SK: `AGENT#${agentId}`,
        ...agent,
        boardId: BOARD_ID,
        addedAt: new Date().toISOString(),
      },
    }),
  )
}

async function deleteBoardAgent(agentId: string): Promise<void> {
  await doc.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        PK: `BOARD#${BOARD_ID}`,
        SK: `AGENT#${agentId}`,
      },
    }),
  )
}

// ─── Company setup helpers ────────────────────────────────────────────────────

async function saveCompanySetup(setup: Record<string, unknown>): Promise<void> {
  await doc.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `COMPANY#${COMPANY_ID}`,
        SK: 'SETUP',
        ...setup,
        companyId: COMPANY_ID,
        updatedAt: new Date().toISOString(),
      },
    }),
  )
}

async function getCompanySetup(): Promise<unknown | null> {
  const { Item } = await doc.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { PK: `COMPANY#${COMPANY_ID}`, SK: 'SETUP' },
    }),
  )
  if (!Item) return null
  const { PK: _pk, SK: _sk, ...rest } = Item
  return rest
}

// ─── Response helpers ─────────────────────────────────────────────────────────

function respond(statusCode: number, body: unknown) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
    body: JSON.stringify(body),
  }
}

// ─── Lambda handler ───────────────────────────────────────────────────────────

export const handler = async (event: {
  httpMethod?: string
  requestContext?: { http?: { method?: string; path?: string } }
  rawPath?: string
  path?: string
  body?: string | null
}) => {
  // Support both REST API (v1) and HTTP API (v2) event shapes
  const method =
    event.httpMethod ??
    event.requestContext?.http?.method ??
    'GET'
  const path =
    event.rawPath ??
    event.path ??
    event.requestContext?.http?.path ??
    '/'

  // Strip any stage prefix (e.g. /prod/board-agents → /board-agents)
  const cleanPath = path.replace(/^\/[^/]+(?=\/)/, '')

  // CORS preflight
  if (method === 'OPTIONS') {
    return respond(204, {})
  }

  try {
    // Ensure table on first cold start (fast no-op after)
    await ensureTable()

    // GET /board-agents
    if (method === 'GET' && cleanPath === '/board-agents') {
      const agents = await listBoardAgents()
      return respond(200, { success: true, agents, count: agents.length })
    }

    // POST /board-agents
    if (method === 'POST' && cleanPath === '/board-agents') {
      const agent = JSON.parse(event.body ?? '{}') as Record<string, unknown>
      if (!agent.agentId) return respond(400, { success: false, error: 'agentId is required' })
      await putBoardAgent(agent)
      return respond(201, { success: true, agent })
    }

    // DELETE /board-agents/:agentId
    const deleteMatch = /^\/board-agents\/(.+)$/.exec(cleanPath)
    if (method === 'DELETE' && deleteMatch) {
      await deleteBoardAgent(decodeURIComponent(deleteMatch[1]))
      return respond(200, { success: true, agentId: deleteMatch[1] })
    }

    // GET /company-setup
    if (method === 'GET' && cleanPath === '/company-setup') {
      const setup = await getCompanySetup()
      return respond(200, { success: true, setup })
    }

    // POST /company-setup
    if (method === 'POST' && cleanPath === '/company-setup') {
      const setup = JSON.parse(event.body ?? '{}') as Record<string, unknown>
      await saveCompanySetup(setup)
      return respond(201, { success: true, setup })
    }

    // Health check
    if (method === 'GET' && cleanPath === '/health') {
      return respond(200, { status: 'ok', table: TABLE_NAME })
    }

    return respond(404, { success: false, error: `No route: ${method} ${cleanPath}` })
  } catch (err) {
    console.error('[api-handler] Error:', err)
    return respond(500, {
      success: false,
      error: err instanceof Error ? err.message : 'Internal error',
    })
  }
}
