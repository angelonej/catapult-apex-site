#!/usr/bin/env tsx
/**
 * seed-board.ts
 *
 * Wipes the BOARD#default partition in ApexAgentStudio-local and re-seeds
 * it with the 9 canonical APEX executive agents, exactly matching the mockup.
 *
 * Usage:
 *   npx tsx infra/dynamodb/seed-board.ts
 *
 * Requires DynamoDB Local on :8000 (docker-compose up -d in infra/dynamodb/)
 */

import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
  ResourceInUseException,
} from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb'
import { TABLE_NAME, CREATE_TABLE_PARAMS } from './table-schema'

const BOARD_ID = 'default'

const rawClient = new DynamoDBClient({
  endpoint: process.env.DYNAMODB_ENDPOINT ?? 'http://localhost:8000',
  region: 'us-east-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
})
const doc = DynamoDBDocumentClient.from(rawClient)

// ─── Ensure table ─────────────────────────────────────────────────────────────
async function ensureTable() {
  const { TableNames = [] } = await rawClient.send(new ListTablesCommand({}))
  if (TableNames.includes(TABLE_NAME)) return
  console.log(`📦 Creating table: ${TABLE_NAME}`)
  try {
    await rawClient.send(new CreateTableCommand(CREATE_TABLE_PARAMS as any))
    await new Promise((r) => setTimeout(r, 1500))
  } catch (e) {
    if (!(e instanceof ResourceInUseException)) throw e
  }
}

// ─── The 9 canonical APEX execs (matches mockup exactly) ─────────────────────
const BOARD_AGENTS = [
  {
    agentId: 'agent.exec.ceo',
    version: '1.0.0',
    name: 'Aria',
    role: 'ceo',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    description: 'Chief Executive Officer — AI strategic vision and company direction.',
    systemPrompt: `You are the Chief Executive Officer AI for this company. Set and defend the strategic vision, prioritize the ONE thing that moves the business forward most this quarter, balance short-term cash needs with long-term competitive moat, and make the final call on cross-functional conflicts.`,
    tools: ['web-search', 'market-data-api'],
    capabilities: ['strategic-planning', 'stakeholder-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Strategic Vision AI',
    avatarInitial: 'A',
    colorGradient: 'from-amber-400 to-amber-600',
    specialty: 'Strategy & Growth',
    status: 'active',
    performance: 94,
    decisionsToday: 23,
    roiToday: 4280,
    uptime: 99.8,
  },
  {
    agentId: 'agent.exec.cfo',
    version: '1.0.0',
    name: 'Felix',
    role: 'cfo',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    description: 'Chief Financial Officer — AI cash flow, forecasting, and financial risk.',
    systemPrompt: `You are the Chief Financial Officer AI. Own cash flow, runway, and working capital management. Build and maintain 13-week cash flow forecast. Flag all financial risks above materiality threshold immediately.`,
    tools: ['financial-calculator', 'market-data-api'],
    capabilities: ['financial-analysis', 'risk-assessment'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Financial Intelligence AI',
    avatarInitial: 'F',
    colorGradient: 'from-blue-500 to-indigo-600',
    specialty: 'Finance & Cash Flow',
    status: 'active',
    performance: 97,
    decisionsToday: 47,
    roiToday: 6140,
    uptime: 99.9,
  },
  {
    agentId: 'agent.exec.coo',
    version: '1.0.0',
    name: 'Orion',
    role: 'coo',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    description: 'Chief Operating Officer — AI operational efficiency and process optimization.',
    systemPrompt: `You are the Chief Operating Officer AI. Own operational efficiency, throughput, and cost per unit. Identify and eliminate bottlenecks. Maintain SLA performance and customer delivery commitments.`,
    tools: [],
    capabilities: ['operations-management', 'supply-chain'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Operations Excellence AI',
    avatarInitial: 'O',
    colorGradient: 'from-green-400 to-emerald-600',
    specialty: 'Operations & Logistics',
    status: 'active',
    performance: 91,
    decisionsToday: 156,
    roiToday: 8320,
    uptime: 99.7,
  },
  {
    agentId: 'agent.exec.cmo',
    version: '1.0.0',
    name: 'Maya',
    role: 'cmo',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    description: 'Chief Marketing Officer — AI growth, brand, and customer acquisition.',
    systemPrompt: `You are the Chief Marketing Officer AI. Own CAC, LTV, and LTV:CAC ratio. Build and optimize full-funnel marketing. Drive data-driven campaign optimization across all channels.`,
    tools: ['web-search', 'crm-integration'],
    capabilities: ['market-analysis', 'brand-strategy', 'revenue-optimization'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Growth Marketing AI',
    avatarInitial: 'M',
    colorGradient: 'from-pink-400 to-rose-600',
    specialty: 'Marketing & Acquisition',
    status: 'active',
    performance: 88,
    decisionsToday: 31,
    roiToday: 3910,
    uptime: 99.5,
  },
  {
    agentId: 'agent.exec.cto',
    version: '1.0.0',
    name: 'Theo',
    role: 'cto',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    description: 'Chief Technology Officer — AI platform strategy, automation, and engineering.',
    systemPrompt: `You are the Chief Technology Officer AI. Set technology strategy and architecture standards. Own the build vs. buy vs. integrate decision framework. Ensure platform scalability, reliability, and security.`,
    tools: ['web-search'],
    capabilities: ['technology-assessment', 'risk-assessment'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Technology AI',
    avatarInitial: 'T',
    colorGradient: 'from-violet-500 to-purple-700',
    specialty: 'Tech & Automation',
    status: 'active',
    performance: 93,
    decisionsToday: 18,
    roiToday: 2100,
    uptime: 99.9,
  },
  {
    agentId: 'agent.advisor.legal',
    version: '1.0.0',
    name: 'Lex',
    role: 'legal',
    tier: 'operational',
    inherits: 'agent.exec.executive',
    description: 'Chief Legal Officer — AI compliance, contracts, and regulatory risk.',
    systemPrompt: `You are the Chief Legal Officer AI. Identify and quantify legal and regulatory risk in every business decision. Maintain the compliance calendar. Review all contracts above materiality threshold.`,
    tools: ['regulatory-database'],
    capabilities: ['legal-analysis', 'regulatory-compliance', 'risk-assessment'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.2 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Legal & Compliance AI',
    avatarInitial: 'L',
    colorGradient: 'from-cyan-400 to-teal-600',
    specialty: 'Compliance & Risk',
    status: 'active',
    performance: 99,
    decisionsToday: 12,
    roiToday: 9800,
    uptime: 100,
  },
  {
    agentId: 'agent.exec.chro',
    version: '1.0.0',
    name: 'Hana',
    role: 'chro',
    tier: 'operational',
    inherits: 'agent.exec.executive',
    description: 'Chief HR Officer — AI talent acquisition, people ops, and culture.',
    systemPrompt: `You are the Chief Human Resources Officer AI. Own talent acquisition pipeline and time-to-hire metric. Manage total compensation benchmarking. Drive employee engagement and retention.`,
    tools: [],
    capabilities: ['workforce-planning', 'hr-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.6 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'People & Culture AI',
    avatarInitial: 'H',
    colorGradient: 'from-red-400 to-rose-600',
    specialty: 'HR & People Ops',
    status: 'paused',
    performance: 86,
    decisionsToday: 0,
    roiToday: 0,
    uptime: 0,
  },
  {
    agentId: 'agent.exec.vpsales',
    version: '1.0.0',
    name: 'Sage',
    role: 'vpsales',
    tier: 'operational',
    inherits: 'agent.exec.executive',
    description: 'VP of Sales — AI pipeline management, revenue, and deal strategy.',
    systemPrompt: `You are the VP of Sales AI. Own revenue target, pipeline coverage (3x quota minimum), and close rate. Manage account health scores and churn risk signals. Optimize the full sales process.`,
    tools: ['crm-integration', 'web-search'],
    capabilities: ['revenue-optimization', 'sales-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Sales Intelligence AI',
    avatarInitial: 'S',
    colorGradient: 'from-orange-400 to-amber-600',
    specialty: 'Sales & Revenue',
    status: 'active',
    performance: 90,
    decisionsToday: 29,
    roiToday: 5240,
    uptime: 99.6,
  },
  {
    agentId: 'agent.exec.moderator',
    version: '1.0.0',
    name: 'Axiom',
    role: 'moderator',
    tier: 'strategic',
    inherits: 'agent.exec.base',
    description: 'Board Moderator — impartial AI facilitator and synthesizer of multi-agent deliberations.',
    systemPrompt: `You are the Board Moderator AI. Read all agent memos and identify consensus, disagreements, and critical gaps. Challenge unsupported claims. Synthesize a balanced final decision. Assign clear action items with owners and timeframes.`,
    tools: [],
    capabilities: ['meeting-facilitation', 'synthesis', 'critique'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 4096, temperature: 0.2 },
    limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 },
    displayName: 'Board Moderator AI',
    avatarInitial: 'X',
    colorGradient: 'from-slate-400 to-slate-600',
    specialty: 'Facilitation & Synthesis',
    status: 'active',
    performance: 98,
    decisionsToday: 5,
    roiToday: 0,
    uptime: 100,
  },
]

// ─── Clear existing board entries ─────────────────────────────────────────────
async function clearBoard() {
  console.log(`🧹 Clearing BOARD#${BOARD_ID} entries...`)
  const result = await doc.send(
    new ScanCommand({
      TableName: TABLE_NAME,
      FilterExpression: 'PK = :pk',
      ExpressionAttributeValues: { ':pk': `BOARD#${BOARD_ID}` },
    }),
  )
  const items = result.Items ?? []
  if (items.length === 0) {
    console.log('   (nothing to clear)')
    return
  }
  for (const item of items) {
    await doc.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { PK: item['PK'], SK: item['SK'] },
      }),
    )
  }
  console.log(`   ✅ Cleared ${items.length} items`)
}

// ─── Seed board ───────────────────────────────────────────────────────────────
async function seedBoard() {
  console.log(`\n🤖 Seeding ${BOARD_AGENTS.length} board agents...`)
  const now = new Date().toISOString()
  for (const agent of BOARD_AGENTS) {
    await doc.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: `BOARD#${BOARD_ID}`,
          SK: `AGENT#${agent.agentId}`,
          boardId: BOARD_ID,
          addedAt: now,
          ...agent,
        },
      }),
    )
    console.log(`   ✅ ${agent.agentId} — ${agent.name} (${agent.role.toUpperCase()})`)
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Seeding APEX Board — ApexAgentStudio-local\n')

  await ensureTable()
  await clearBoard()
  await seedBoard()

  console.log(`\n✨ Board seeded! ${BOARD_AGENTS.length} execs on the board.`)
  console.log('   Restart (or hard-refresh) the Vite dev server to see changes.\n')
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
