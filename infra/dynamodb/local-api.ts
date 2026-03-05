#!/usr/bin/env tsx
/**
 * local-api.ts
 *
 * Tiny Node http server (no Express needed) that provides a local CRUD API
 * for the Apex board agent roster, persisted directly to local DynamoDB.
 *
 * Port  : 3002
 * Table : ApexAgentStudio-local  (DynamoDB Local on :8000)
 *
 * Endpoints:
 *   GET    /board-agents           → list all board agents
 *   POST   /board-agents           → add a board agent
 *   DELETE /board-agents/:agentId  → remove a board agent
 *
 * Start:
 *   npx tsx infra/dynamodb/local-api.ts
 *
 * Vite proxy routes /local/* → http://localhost:3002
 * so the browser calls /local/board-agents and never hits CORS.
 */

import http from 'http'
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
} from '@aws-sdk/lib-dynamodb'

// ─── Config ───────────────────────────────────────────────────────────────────

const PORT = 3002
const DYNAMO_ENDPOINT = process.env.DYNAMODB_ENDPOINT ?? 'http://localhost:8000'
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME ?? 'ApexAgentStudio-local'

// Key patterns — board roster uses a dedicated GSI-friendly prefix
// PK = BOARD#<boardId>  SK = AGENT#<agentId>
// For simplicity we use a single board "default" for the dev workspace.
const BOARD_ID = 'default'

// ─── DynamoDB client ──────────────────────────────────────────────────────────

const rawClient = new DynamoDBClient({
  endpoint: DYNAMO_ENDPOINT,
  region: 'us-east-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
})
const doc = DynamoDBDocumentClient.from(rawClient)

// ─── Ensure table exists ──────────────────────────────────────────────────────

async function ensureTable(): Promise<void> {
  const { TableNames = [] } = await rawClient.send(new ListTablesCommand({}))
  if (TableNames.includes(TABLE_NAME)) {
    console.log(`[local-api] Table "${TABLE_NAME}" already exists`)
    return
  }

  console.log(`[local-api] Creating table "${TABLE_NAME}"…`)
  try {
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
    console.log(`[local-api] Table created.`)
  } catch (err) {
    const name = (err as any)?.name ?? ''
    if (name === 'ResourceInUseException') {
      console.log(`[local-api] Table already exists (race condition) — OK`)
    } else {
      throw err
    }
  }
}

// ─── Board agent helpers ──────────────────────────────────────────────────────

function boardPK(boardId: string) {
  return `BOARD#${boardId}`
}
function agentSK(agentId: string) {
  return `AGENT#${agentId}`
}

async function listBoardAgents(): Promise<unknown[]> {
  const result = await doc.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'begins_with(PK, :prefix)',
      ExpressionAttributeValues: { ':prefix': boardPK(BOARD_ID) },
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
        PK: boardPK(BOARD_ID),
        SK: agentSK(agentId),
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
        PK: boardPK(BOARD_ID),
        SK: agentSK(agentId),
      },
    }),
  )
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

function cors(res: http.ServerResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function json(res: http.ServerResponse, statusCode: number, body: unknown) {
  cors(res)
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

function readBody(req: http.IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => (data += chunk.toString()))
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })
}

// ─── Route handler ────────────────────────────────────────────────────────────

const server = http.createServer(async (req, res) => {
  const url = req.url ?? '/'
  const method = req.method ?? 'GET'

  // CORS preflight
  if (method === 'OPTIONS') {
    cors(res)
    res.writeHead(204)
    res.end()
    return
  }

  try {
    // GET /board-agents
    if (method === 'GET' && url === '/board-agents') {
      const agents = await listBoardAgents()
      json(res, 200, { success: true, agents, count: agents.length })
      return
    }

    // POST /board-agents
    if (method === 'POST' && url === '/board-agents') {
      const raw = await readBody(req)
      const agent = JSON.parse(raw) as Record<string, unknown>
      if (!agent.agentId) {
        json(res, 400, { success: false, error: 'agentId is required' })
        return
      }
      await putBoardAgent(agent)
      json(res, 201, { success: true, agent })
      return
    }

    // DELETE /board-agents/:agentId
    const deleteMatch = /^\/board-agents\/(.+)$/.exec(url)
    if (method === 'DELETE' && deleteMatch) {
      const agentId = decodeURIComponent(deleteMatch[1])
      await deleteBoardAgent(agentId)
      json(res, 200, { success: true, agentId })
      return
    }

    // Health check
    if (method === 'GET' && url === '/health') {
      json(res, 200, { status: 'ok', table: TABLE_NAME, board: BOARD_ID })
      return
    }

    json(res, 404, { success: false, error: `No route: ${method} ${url}` })
  } catch (err) {
    console.error('[local-api] Error:', err)
    json(res, 500, {
      success: false,
      error: err instanceof Error ? err.message : 'Internal error',
    })
  }
})

// ─── Start ────────────────────────────────────────────────────────────────────

async function main() {
  try {
    await ensureTable()
  } catch (err) {
    console.warn('[local-api] DynamoDB not reachable — running without persistence:', err instanceof Error ? err.message : err)
  }

  server.listen(PORT, () => {
    console.log(`[local-api] Listening on http://localhost:${PORT}`)
    console.log(`[local-api] DynamoDB: ${DYNAMO_ENDPOINT}  table: ${TABLE_NAME}`)
    console.log(`[local-api] Board: ${BOARD_ID}`)
    console.log()
    console.log('  GET    /board-agents')
    console.log('  POST   /board-agents')
    console.log('  DELETE /board-agents/:agentId')
    console.log()
  })
}

main().catch((err) => {
  console.error('[local-api] Fatal:', err)
  process.exit(1)
})
