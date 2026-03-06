#!/usr/bin/env tsx
/**
 * provision-aws.ts
 *
 * One-shot script that:
 *  1. Creates the DynamoDB table in real AWS (if it doesn't exist)
 *  2. Seeds it from infra/lambda/seed-data.json  (export first with export-local-data.ts)
 *  3. Bundles the Lambda handler with esbuild
 *  4. Creates (or updates) the Lambda function
 *  5. Creates (or updates) an HTTP API Gateway wired to the Lambda
 *  6. Prints the API Gateway invoke URL  → set as VITE_API_URL in Amplify
 *
 * Usage:
 *   npx tsx --tsconfig infra/dynamodb/tsconfig.json infra/lambda/provision-aws.ts
 *
 * Prerequisites:
 *   npm install -D esbuild  (one-time)
 *   AWS CLI configured with admin credentials
 */

import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
  DescribeTableCommand,
  waitUntilTableExists,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, BatchWriteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import {
  LambdaClient,
  CreateFunctionCommand,
  UpdateFunctionCodeCommand,
  GetFunctionCommand,
  AddPermissionCommand,
  CreateFunctionUrlConfigCommand,
  GetFunctionUrlConfigCommand,
} from '@aws-sdk/client-lambda'
import {
  IAMClient,
  CreateRoleCommand,
  GetRoleCommand,
  AttachRolePolicyCommand,
  PutRolePolicyCommand,
} from '@aws-sdk/client-iam'
import {
  ApiGatewayV2Client,
  CreateApiCommand,
  GetApisCommand,
  CreateIntegrationCommand,
  CreateRouteCommand,
  CreateStageCommand,
  GetStagesCommand,
  GetIntegrationsCommand,
  GetRoutesCommand,
} from '@aws-sdk/client-apigatewayv2'
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join } from 'path'

// ─── Config ───────────────────────────────────────────────────────────────────

const REGION        = process.env.AWS_REGION    ?? 'us-east-2'
const TABLE_NAME    = process.env.DYNAMO_TABLE  ?? 'ApexAgentStudio-prod'
const LAMBDA_NAME   = process.env.LAMBDA_NAME   ?? 'apex-agent-api'
const API_NAME      = process.env.API_NAME      ?? 'apex-agent-api'
const ROLE_NAME     = process.env.ROLE_NAME     ?? 'apex-lambda-role'
const ROOT          = join(import.meta.dirname ?? __dirname, '..', '..')
const DIST_DIR      = join(ROOT, 'infra', 'lambda', 'dist')
const BUNDLE_FILE   = join(DIST_DIR, 'handler.mjs')
const ZIP_FILE      = join(DIST_DIR, 'handler.zip')
const SEED_FILE     = join(ROOT, 'infra', 'lambda', 'seed-data.json')
const HANDLER_SRC   = join(ROOT, 'infra', 'lambda', 'api-handler.ts')

// ─── AWS clients ──────────────────────────────────────────────────────────────

const ddbRaw  = new DynamoDBClient({ region: REGION })
const ddb     = DynamoDBDocumentClient.from(ddbRaw)
const lambda  = new LambdaClient({ region: REGION })
const iam     = new IAMClient({ region: REGION })
const apigw   = new ApiGatewayV2Client({ region: REGION })

// ─── Helpers ──────────────────────────────────────────────────────────────────

function log(msg: string) { console.log(`\n▸ ${msg}`) }
function ok(msg: string)  { console.log(`  ✓ ${msg}`) }

async function getAccountId(): Promise<string> {
  const { STSClient, GetCallerIdentityCommand } = await import('@aws-sdk/client-sts')
  const sts = new STSClient({ region: REGION })
  const { Account } = await sts.send(new GetCallerIdentityCommand({}))
  return Account!
}

// ─── Step 1: DynamoDB table ───────────────────────────────────────────────────

async function ensureDynamoTable(): Promise<void> {
  log(`DynamoDB table: ${TABLE_NAME}`)
  const { TableNames = [] } = await ddbRaw.send(new ListTablesCommand({}))
  if (TableNames.includes(TABLE_NAME)) {
    ok(`Table already exists — skipping create`)
    return
  }

  await ddbRaw.send(
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
  ok(`Table created. Waiting for ACTIVE …`)
  await waitUntilTableExists({ client: ddbRaw, maxWaitTime: 60 }, { TableName: TABLE_NAME })
  ok(`Table ACTIVE`)
}

// ─── Step 2: Seed data ────────────────────────────────────────────────────────

async function seedData(): Promise<void> {
  log('Seeding DynamoDB from seed-data.json')

  if (!existsSync(SEED_FILE)) {
    console.log(`  ⚠  ${SEED_FILE} not found — skipping seed.`)
    console.log(`     Run: npx tsx --tsconfig infra/dynamodb/tsconfig.json infra/lambda/export-local-data.ts`)
    return
  }

  const items = JSON.parse(readFileSync(SEED_FILE, 'utf8')) as Record<string, unknown>[]
  if (items.length === 0) {
    ok('No items to seed')
    return
  }

  // BatchWrite in chunks of 25
  const chunks: Record<string, unknown>[][] = []
  for (let i = 0; i < items.length; i += 25) chunks.push(items.slice(i, i + 25))

  for (const chunk of chunks) {
    await ddb.send(
      new BatchWriteCommand({
        RequestItems: {
          [TABLE_NAME]: chunk.map((Item) => ({ PutRequest: { Item } })),
        },
      }),
    )
  }
  ok(`Seeded ${items.length} items across ${chunks.length} batch(es)`)
}

// ─── Step 3: IAM role for Lambda ──────────────────────────────────────────────

async function ensureLambdaRole(): Promise<string> {
  log(`IAM role: ${ROLE_NAME}`)
  try {
    const { Role } = await iam.send(new GetRoleCommand({ RoleName: ROLE_NAME }))
    ok(`Role already exists: ${Role!.Arn}`)
    return Role!.Arn!
  } catch (e: any) {
    if (e.name !== 'NoSuchEntityException') throw e
  }

  const { Role } = await iam.send(
    new CreateRoleCommand({
      RoleName: ROLE_NAME,
      AssumeRolePolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Principal: { Service: 'lambda.amazonaws.com' },
          Action: 'sts:AssumeRole',
        }],
      }),
      Description: 'Lambda execution role for APEX Agent API',
    }),
  )

  // Basic Lambda execution (CloudWatch logs)
  await iam.send(
    new AttachRolePolicyCommand({
      RoleName: ROLE_NAME,
      PolicyArn: 'arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole',
    }),
  )

  // DynamoDB full access to our specific table
  const accountId = await getAccountId()
  await iam.send(
    new PutRolePolicyCommand({
      RoleName: ROLE_NAME,
      PolicyName: 'apex-dynamo-access',
      PolicyDocument: JSON.stringify({
        Version: '2012-10-17',
        Statement: [{
          Effect: 'Allow',
          Action: [
            'dynamodb:GetItem',
            'dynamodb:PutItem',
            'dynamodb:DeleteItem',
            'dynamodb:Scan',
            'dynamodb:Query',
            'dynamodb:BatchWriteItem',
            'dynamodb:DescribeTable',
            'dynamodb:CreateTable',
            'dynamodb:ListTables',
          ],
          Resource: [
            `arn:aws:dynamodb:${REGION}:${accountId}:table/${TABLE_NAME}`,
            `arn:aws:dynamodb:${REGION}:${accountId}:table/${TABLE_NAME}/index/*`,
          ],
        }],
      }),
    }),
  )

  ok(`Role created: ${Role!.Arn}`)
  // Brief pause for IAM propagation
  await new Promise(r => setTimeout(r, 10_000))
  return Role!.Arn!
}

// ─── Step 4: Bundle Lambda ────────────────────────────────────────────────────

async function bundleLambda(): Promise<void> {
  log('Bundling Lambda with esbuild')
  mkdirSync(DIST_DIR, { recursive: true })

  execSync(
    `npx --yes esbuild@0.24 "${HANDLER_SRC}" --bundle --platform=node --target=node20 --format=esm --outfile="${BUNDLE_FILE}" --external:@aws-sdk/*`,
    { stdio: 'inherit', cwd: ROOT },
  )

  // Zip it
  execSync(`powershell -Command "Compress-Archive -Path '${BUNDLE_FILE}' -DestinationPath '${ZIP_FILE}' -Force"`)
  ok(`Bundled → ${ZIP_FILE}`)
}

// ─── Step 5: Lambda function ──────────────────────────────────────────────────

async function ensureLambda(roleArn: string): Promise<string> {
  log(`Lambda function: ${LAMBDA_NAME}`)
  const zipBytes = readFileSync(ZIP_FILE)

  let lambdaArn: string

  try {
    await lambda.send(new GetFunctionCommand({ FunctionName: LAMBDA_NAME }))
    ok('Function exists — updating code …')
    const { FunctionArn } = await lambda.send(
      new UpdateFunctionCodeCommand({
        FunctionName: LAMBDA_NAME,
        ZipFile: zipBytes,
      }),
    )
    lambdaArn = FunctionArn!
    ok(`Code updated`)
  } catch (e: any) {
    if (e.name !== 'ResourceNotFoundException') throw e

    ok('Creating Lambda function …')
    const { FunctionArn } = await lambda.send(
      new CreateFunctionCommand({
        FunctionName: LAMBDA_NAME,
        Runtime: 'nodejs20.x' as any,
        Role: roleArn,
        Handler: 'handler.handler',
        Code: { ZipFile: zipBytes },
        Timeout: 29,
        MemorySize: 256,
        Environment: {
          Variables: {
            DYNAMODB_TABLE_NAME: TABLE_NAME,
          },
        },
        Description: 'APEX Agent Studio — board agent API',
      }),
    )
    lambdaArn = FunctionArn!
    ok(`Lambda created: ${lambdaArn}`)
  }

  return lambdaArn
}

// ─── Step 6: API Gateway (HTTP API) ──────────────────────────────────────────

async function ensureApiGateway(lambdaArn: string): Promise<string> {
  log(`API Gateway HTTP API: ${API_NAME}`)
  const accountId = await getAccountId()

  // Check if API already exists
  const { Items: apis = [] } = await apigw.send(new GetApisCommand({}))
  let apiId = apis.find(a => a.Name === API_NAME)?.ApiId

  if (!apiId) {
    ok('Creating HTTP API …')
    const { ApiId } = await apigw.send(
      new CreateApiCommand({
        Name: API_NAME,
        ProtocolType: 'HTTP',
        CorsConfiguration: {
          AllowOrigins: ['*'],
          AllowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
          AllowHeaders: ['Content-Type', 'Authorization'],
        },
        Description: 'APEX Agent Studio API',
      }),
    )
    apiId = ApiId!
    ok(`API created: ${apiId}`)
  } else {
    ok(`API already exists: ${apiId}`)
  }

  // Check if integration exists
  const { Items: integrations = [] } = await apigw.send(
    new GetIntegrationsCommand({ ApiId: apiId }),
  )

  let integrationId: string

  if (integrations.length === 0) {
    ok('Creating Lambda integration …')
    const lambdaUri = `arn:aws:apigateway:${REGION}:lambda:path/2015-03-31/functions/${lambdaArn}/invocations`
    const { IntegrationId } = await apigw.send(
      new CreateIntegrationCommand({
        ApiId: apiId,
        IntegrationType: 'AWS_PROXY',
        IntegrationUri: lambdaUri,
        PayloadFormatVersion: '2.0',
      }),
    )
    integrationId = IntegrationId!
    ok(`Integration created: ${integrationId}`)
  } else {
    integrationId = integrations[0].IntegrationId!
    ok(`Integration already exists: ${integrationId}`)
  }

  // Check if catch-all route exists
  const { Items: routes = [] } = await apigw.send(
    new GetRoutesCommand({ ApiId: apiId }),
  )

  if (!routes.find(r => r.RouteKey === '$default')) {
    ok('Creating $default catch-all route …')
    await apigw.send(
      new CreateRouteCommand({
        ApiId: apiId,
        RouteKey: '$default',
        Target: `integrations/${integrationId}`,
      }),
    )
  }

  // Check if $default stage exists
  const { Items: stages = [] } = await apigw.send(
    new GetStagesCommand({ ApiId: apiId }),
  )

  if (!stages.find(s => s.StageName === '$default')) {
    ok('Creating $default auto-deploy stage …')
    await apigw.send(
      new CreateStageCommand({
        ApiId: apiId,
        StageName: '$default',
        AutoDeploy: true,
      }),
    )
  }

  // Grant API Gateway permission to invoke Lambda
  ok('Adding Lambda invoke permission for API Gateway …')
  try {
    await lambda.send(
      new AddPermissionCommand({
        FunctionName: LAMBDA_NAME,
        StatementId: `apigw-invoke-${apiId}`,
        Action: 'lambda:InvokeFunction',
        Principal: 'apigateway.amazonaws.com',
        SourceArn: `arn:aws:execute-api:${REGION}:${accountId}:${apiId}/*/*`,
      }),
    )
  } catch (e: any) {
    if (e.name !== 'ResourceConflictException') throw e
    ok('Permission already exists')
  }

  const invokeUrl = `https://${apiId}.execute-api.${REGION}.amazonaws.com`
  return invokeUrl
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════')
  console.log(' APEX Agent Studio — AWS Provision')
  console.log(`  Region : ${REGION}`)
  console.log(`  Table  : ${TABLE_NAME}`)
  console.log(`  Lambda : ${LAMBDA_NAME}`)
  console.log(`  API GW : ${API_NAME}`)
  console.log('═══════════════════════════════════════════════════')

  await ensureDynamoTable()
  await seedData()
  const roleArn    = await ensureLambdaRole()
  await bundleLambda()
  const lambdaArn  = await ensureLambda(roleArn)
  const invokeUrl  = await ensureApiGateway(lambdaArn)

  const envLine = `VITE_API_URL=${invokeUrl}`

  console.log('\n═══════════════════════════════════════════════════')
  console.log(' ✅  Done!')
  console.log(`\n  API invoke URL:\n  ${invokeUrl}`)
  console.log('\n  Add this environment variable in Amplify Console:')
  console.log(`\n    ${envLine}\n`)
  console.log('  Also create/update your local .env.production:')
  console.log(`    echo "${envLine}" >> .env.production`)
  console.log('═══════════════════════════════════════════════════\n')

  // Write .env.production automatically
  const envPath = join(ROOT, '.env.production')
  const existing = existsSync(envPath) ? readFileSync(envPath, 'utf8') : ''
  if (!existing.includes('VITE_API_URL')) {
    writeFileSync(envPath, existing + `\n${envLine}\n`)
    console.log(`  Written to ${envPath}`)
  }
}

main().catch((err) => {
  console.error('\n❌ Provision failed:', err)
  process.exit(1)
})
