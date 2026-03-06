#!/usr/bin/env tsx
/**
 * push-prod-setup.ts
 *
 * Writes the wizard setup + exec agent roster DIRECTLY to DynamoDB prod
 * using the AWS SDK (bypasses Lambda/API Gateway entirely).
 *
 * Run: npx tsx --tsconfig infra/dynamodb/tsconfig.json infra/lambda/push-prod-setup.ts
 *
 * Edit EXEC_ROLES to exactly match the executives you picked in the wizard.
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const TABLE   = 'ApexAgentStudio-prod'
const BOARD_ID   = 'default'
const COMPANY_ID = 'default'
const REGION  = 'us-east-2'

// ── Edit this list to match exactly what the wizard selected ─────────────────
// From wizard screenshot: CEO, COO, CFO, CHRO, CTO
const EXEC_ROLES = ['ceo','coo','cfo','chro','cto']

// ── Company setup (update companyName/industry/teamSize if you remember them) ─
const SETUP = {
  companyName: 'Newco',
  industry:    'technology',
  teamSize:    '51-200',
  executives:  EXEC_ROLES,
  allRoles:    EXEC_ROLES,
  approvalLimit: '10000',
  integrations: [] as string[],
  launchedAt:  new Date().toISOString(),
}

// ── Exec agent seed data (mirrors localAgentStore SEED_AGENTS) ────────────────
const EXEC_SEEDS: Record<string, { name: string; displayName: string; avatarInitial: string; colorGradient: string; specialty: string }> = {
  ceo:  { name:'Aria',   displayName:'CEO AI',                avatarInitial:'A', colorGradient:'from-amber-400 to-amber-600',    specialty:'Strategic Leadership' },
  cfo:  { name:'Felix',  displayName:'CFO AI',                avatarInitial:'F', colorGradient:'from-blue-400 to-blue-600',      specialty:'Financial Strategy' },
  coo:  { name:'Orion',  displayName:'COO AI',                avatarInitial:'O', colorGradient:'from-green-400 to-green-600',    specialty:'Operations Excellence' },
  cmo:  { name:'Maya',   displayName:'CMO AI',                avatarInitial:'M', colorGradient:'from-pink-400 to-pink-600',      specialty:'Brand & Growth' },
  cto:  { name:'Theo',   displayName:'CTO AI',                avatarInitial:'T', colorGradient:'from-purple-400 to-purple-600',  specialty:'Tech & Engineering' },
  chro: { name:'Hana',   displayName:'CHRO AI',               avatarInitial:'H', colorGradient:'from-rose-400 to-rose-600',      specialty:'People & Culture' },
  cro:  { name:'Sage',   displayName:'CRO AI',                avatarInitial:'S', colorGradient:'from-red-400 to-rose-600',       specialty:'Revenue & Sales' },
  cpo:  { name:'Rex',    displayName:'CPO AI',                avatarInitial:'R', colorGradient:'from-indigo-400 to-violet-600',  specialty:'Product Vision' },
  cdo:  { name:'Nova',   displayName:'CDO AI',                avatarInitial:'N', colorGradient:'from-sky-400 to-cyan-600',       specialty:'Data & Analytics' },
  ciso: { name:'Shield', displayName:'CISO AI',               avatarInitial:'S', colorGradient:'from-slate-400 to-gray-600',     specialty:'Security & Compliance' },
  cso:  { name:'Ember',  displayName:'CSO AI',                avatarInitial:'E', colorGradient:'from-orange-400 to-orange-600',  specialty:'Strategy & Innovation' },
  clo:  { name:'Lex',    displayName:'CLO AI',                avatarInitial:'L', colorGradient:'from-cyan-400 to-cyan-600',      specialty:'Legal & Compliance' },
  cco:  { name:'Cleo',   displayName:'CCO AI',                avatarInitial:'C', colorGradient:'from-teal-400 to-emerald-600',   specialty:'Customer Experience' },
}

const client = new DynamoDBClient({ region: REGION })
const doc    = DynamoDBDocumentClient.from(client)

async function main() {
  // 1. Save company setup
  console.log('📤  Writing company setup...')
  await doc.send(new PutCommand({
    TableName: TABLE,
    Item: {
      PK: `COMPANY#${COMPANY_ID}`,
      SK: 'SETUP',
      companyId: COMPANY_ID,
      updatedAt: new Date().toISOString(),
      ...SETUP,
    },
  }))
  console.log('✅  Company setup saved.')

  // 2. Delete ALL existing board agents (including the 83 seed dump)
  console.log('\n🗑️   Clearing old board agents from prod...')
  const { Items: existing = [] } = await doc.send(new ScanCommand({
    TableName: TABLE,
    FilterExpression: 'begins_with(PK, :b)',
    ExpressionAttributeValues: { ':b': `BOARD#${BOARD_ID}` },
    ProjectionExpression: 'PK, SK',
  }))
  for (const item of existing) {
    await doc.send(new DeleteCommand({ TableName: TABLE, Key: { PK: item.PK, SK: item.SK } }))
    process.stdout.write('.')
  }
  console.log(`\n✅  Removed ${existing.length} stale agents.`)

  // 3. Write only the wizard-selected exec agents
  console.log('\n📤  Writing exec agents...')
  let written = 0
  for (const role of EXEC_ROLES) {
    const seed = EXEC_SEEDS[role]
    if (!seed) { console.warn(`⚠️  No seed for role "${role}", skipping`); continue }
    const agentId = `agent.exec.${role}`
    await doc.send(new PutCommand({
      TableName: TABLE,
      Item: {
        PK: `BOARD#${BOARD_ID}`,
        SK: `AGENT#${agentId}`,
        boardId: BOARD_ID,
        addedAt: new Date().toISOString(),
        agentId,
        version: '1.0.0',
        role,
        tier: 'strategic',
        status: 'active',
        performance: 95,
        decisionsToday: 10,
        roiToday: 5000,
        uptime: 99.5,
        ...seed,
      },
    }))
    process.stdout.write('.')
    written++
  }
  console.log(`\n✅  Written ${written} exec agents.`)

  // 4. Verify
  const { Items: verify = [] } = await doc.send(new ScanCommand({
    TableName: TABLE,
    FilterExpression: 'begins_with(PK, :b)',
    ExpressionAttributeValues: { ':b': `BOARD#${BOARD_ID}` },
    ProjectionExpression: 'agentId',
  }))
  console.log(`\n📊  Prod board now has ${verify.length} agents.`)
  console.log('\n🎉  Done! Open the prod site in incognito — it will show exactly your org chart.')
}

main().catch((e) => { console.error(e); process.exit(1) })
