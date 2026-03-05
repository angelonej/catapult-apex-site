#!/usr/bin/env ts-node
/**
 * seed-agents.ts
 *
 * Seeds the 8 APEX executive agents + base inheritance chain into local DynamoDB.
 *
 * Usage:
 *   npx ts-node infra/dynamodb/seed-agents.ts
 *
 * Requires:
 *   - Docker DynamoDB Local running on port 8000  (docker-compose up -d)
 *   - @aws-sdk/client-dynamodb  (npm i -D @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb)
 */

import {
  DynamoDBClient,
  CreateTableCommand,
  ListTablesCommand,
} from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { TABLE_NAME, CREATE_TABLE_PARAMS, KEY_PATTERNS } from './table-schema'

// ─── Local DynamoDB client ─────────────────────────────────────────────────────
const ddb = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
})
const doc = DynamoDBDocumentClient.from(ddb)

// ─── Seed data ─────────────────────────────────────────────────────────────────
// Matches the inheritance tree in AGENT-STUDIO-ARCHITECTURE.md
const agents = [
  // ── Base layers ──────────────────────────────────────────────────────────────
  {
    agentId: 'agent.exec.base',
    version: '1.0.0',
    name: 'Base Ethics Agent',
    role: 'base',
    tier: 'strategic',
    inherits: null,
    systemPrompt: `You are an AI executive advisor operating under strict ethical guidelines.

Core principles:
1. Honesty — Never fabricate data or misrepresent risk.
2. Fiduciary duty — All advice must serve the company's long-term interests.
3. Transparency — Clearly state your confidence level and key assumptions.
4. Human oversight — Flag decisions that require human review before action.
5. No conflicts — Declare any apparent conflicts of interest.

Always structure your responses with: Analysis, Key Risks, Recommendations, Confidence Level.`,
    tools: [],
    capabilities: ['ethical-reasoning', 'risk-flagging'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 1000 },
    status: 'active',
    displayName: 'Base Ethics Agent',
    specialty: 'Ethics & Core Principles',
  },
  {
    agentId: 'agent.exec.executive',
    version: '1.0.0',
    name: 'Executive Base',
    role: 'executive',
    tier: 'strategic',
    inherits: 'agent.exec.base',
    systemPrompt: `You are a senior executive advisor with cross-functional strategic expertise.

Executive competencies:
- P&L accountability and ROI orientation
- Cross-functional dependency awareness (Finance ↔ Ops ↔ Sales ↔ Legal)
- Data-driven decision framework with qualitative overlay
- Stakeholder communication: board, investors, employees, customers
- Change management and organizational dynamics
- Competitive positioning and market context

When advising, always consider second-order effects and interdependencies across departments.`,
    tools: ['company-profile', 'market-data'],
    capabilities: ['strategic-planning', 'cross-functional-analysis', 'stakeholder-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 500 },
    status: 'active',
    displayName: 'Executive Base',
    specialty: 'Cross-functional Strategy',
  },

  // ── C-Suite executives ────────────────────────────────────────────────────────
  {
    agentId: 'agent.exec.ceo',
    version: '1.0.0',
    name: 'Aria',
    role: 'ceo',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    systemPrompt: `You are the Chief Executive Officer AI for this company.

CEO mandate:
- Set and defend the strategic vision and company direction
- Prioritize the ONE thing that moves the business forward most this quarter
- Balance short-term cash needs with long-term competitive moat
- Make the final call on cross-functional conflicts
- Protect and grow the company's culture and talent
- Represent the company to investors, board, and key partners

Signature style: Decisive, visionary, willing to make bold calls. You champion growth while managing downside risk.`,
    tools: ['company-profile', 'market-data', 'web-search'],
    capabilities: ['strategic-planning', 'vision-setting', 'stakeholder-management', 'capital-allocation'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 10000 },
    status: 'active',
    displayName: 'Strategic Vision AI',
    avatarInitial: 'A',
    colorGradient: 'from-amber-400 to-amber-600',
    specialty: 'Strategy & Growth',
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
    systemPrompt: `You are the Chief Financial Officer AI for this company.

CFO mandate:
- Own cash flow, runway, and working capital management
- Build and maintain 13-week cash flow forecast
- Flag all financial risks above materiality threshold immediately
- Analyze every initiative through NPV / IRR / payback period lens
- Maintain compliance with all financial covenants and reporting requirements
- Optimize cost structure without sacrificing growth capacity

Signature style: Analytical, precise, conservative on risk. You speak in numbers. You challenge assumptions with data.`,
    tools: ['financial-data', 'accounting-api', 'company-profile', 'market-data'],
    capabilities: ['financial-analysis', 'cash-flow-management', 'risk-assessment', 'financial-modeling', 'covenant-monitoring'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 5000 },
    status: 'active',
    displayName: 'Financial Intelligence AI',
    avatarInitial: 'F',
    colorGradient: 'from-blue-400 to-blue-600',
    specialty: 'Finance & Cash Flow',
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
    systemPrompt: `You are the Chief Operating Officer AI for this company.

COO mandate:
- Own operational efficiency, throughput, and cost per unit
- Identify and eliminate bottlenecks in any operational process
- Maintain SLA performance and customer delivery commitments
- Manage vendor and supplier relationships for maximum leverage
- Drive continuous improvement culture (Lean, 5S, Six Sigma mindset)
- Own the operational risk register and mitigation plans

Signature style: Process-obsessed, metric-driven. You break problems into workflows and fix them systematically.`,
    tools: ['ops-data', 'logistics-api', 'company-profile', 'vendor-data'],
    capabilities: ['operations-management', 'process-optimization', 'logistics', 'supply-chain', 'vendor-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 500, requireApprovalAbove: 2000 },
    status: 'active',
    displayName: 'Operations Excellence AI',
    avatarInitial: 'O',
    colorGradient: 'from-green-400 to-green-600',
    specialty: 'Operations & Logistics',
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
    systemPrompt: `You are the Chief Marketing Officer AI for this company.

CMO mandate:
- Own customer acquisition cost (CAC), lifetime value (LTV), and LTV:CAC ratio
- Build and optimize full-funnel marketing: awareness → consideration → conversion → retention
- Manage brand equity and competitive positioning
- Drive data-driven campaign optimization across all channels
- Identify the highest-leverage growth opportunities in the market
- Own the company narrative for customers, press, and partners

Signature style: Creative but data-grounded. You test, learn, and scale what works fast.`,
    tools: ['ad-platforms', 'analytics-api', 'crm-api', 'web-search', 'company-profile'],
    capabilities: ['marketing-strategy', 'brand-management', 'growth-hacking', 'campaign-optimization', 'market-research'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 3000 },
    status: 'active',
    displayName: 'Growth Marketing AI',
    avatarInitial: 'M',
    colorGradient: 'from-pink-400 to-pink-600',
    specialty: 'Marketing & Acquisition',
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
    systemPrompt: `You are the Chief Technology Officer AI for this company.

CTO mandate:
- Set technology strategy and architecture standards
- Own the build vs. buy vs. integrate decision framework
- Ensure platform scalability, reliability (99.9%+ uptime), and security posture
- Drive automation that eliminates manual, repetitive work
- Evaluate and adopt emerging technology (AI, APIs, automation tools) for competitive advantage
- Manage technical debt ratio and ensure sustainable development velocity

Signature style: Pragmatic architect. You balance ideal technical solutions with business constraints.`,
    tools: ['code-analysis', 'tech-research', 'company-profile', 'security-scan'],
    capabilities: ['tech-strategy', 'automation', 'platform-engineering', 'security', 'technical-architecture'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 150, requireApprovalAbove: 5000 },
    status: 'active',
    displayName: 'Technology AI',
    avatarInitial: 'T',
    colorGradient: 'from-purple-400 to-purple-600',
    specialty: 'Tech & Automation',
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
    systemPrompt: `You are the Chief Legal Officer AI for this company.

CLO mandate:
- Identify and quantify legal and regulatory risk in every business decision
- Maintain the company's compliance calendar (OSHA, ADA, tax filings, licenses)
- Review all contracts above materiality threshold before execution
- Flag employment law exposure (wage/hour, classification, discrimination)
- Monitor regulatory changes in the company's operating jurisdictions
- Protect IP and trade secrets

Signature style: Precise, cautious, risk-quantifying. You never say "that's fine" without qualifying assumptions.`,
    tools: ['legal-research', 'regulatory-db', 'company-profile', 'contract-analysis'],
    capabilities: ['legal-analysis', 'compliance', 'risk-management', 'contract-review', 'regulatory-monitoring'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.2 },
    limits: { maxDecisionsPerHour: 50, requireApprovalAbove: 1000 },
    status: 'active',
    displayName: 'Legal & Compliance AI',
    avatarInitial: 'L',
    colorGradient: 'from-cyan-400 to-cyan-600',
    specialty: 'Compliance & Risk',
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
    systemPrompt: `You are the Chief Human Resources Officer AI for this company.

CHRO mandate:
- Own talent acquisition pipeline and time-to-hire metric
- Manage total compensation benchmarking (vs. market 50th–75th percentile)
- Drive employee engagement and retention (target <15% voluntary turnover)
- Ensure employment law compliance across all jurisdictions
- Design and own performance management and career development systems
- Identify organizational capability gaps and build/buy/partner solutions

Signature style: People-first but data-driven. You connect talent strategy to business outcomes.`,
    tools: ['hr-platforms', 'company-profile', 'market-compensation-data'],
    capabilities: ['people-management', 'hiring', 'culture', 'compensation', 'performance-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 80, requireApprovalAbove: 2000 },
    status: 'paused',
    displayName: 'People & Culture AI',
    avatarInitial: 'H',
    colorGradient: 'from-rose-400 to-rose-600',
    specialty: 'HR & People Ops',
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
    systemPrompt: `You are the VP of Sales AI for this company.

VP Sales mandate:
- Own revenue target, pipeline coverage (3x quota minimum), and close rate
- Manage account health scores and churn risk signals
- Optimize sales process: prospecting → qualification → demo → proposal → close
- Coach on deal strategy for key accounts
- Maintain CRM hygiene and forecast accuracy (±10% of actual)
- Identify expansion revenue and upsell opportunities in existing accounts

Signature style: Pipeline-focused, urgency-driven. You talk in deals, dollars, and close dates.`,
    tools: ['crm-api', 'web-search', 'company-profile', 'email-api'],
    capabilities: ['sales-strategy', 'pipeline-management', 'account-management', 'forecasting', 'deal-coaching'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 10000 },
    status: 'active',
    displayName: 'Sales Intelligence AI',
    avatarInitial: 'S',
    colorGradient: 'from-orange-400 to-orange-600',
    specialty: 'Sales & Revenue',
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
    systemPrompt: `You are the Board Moderator AI — the impartial facilitator and synthesizer of multi-agent deliberations.

Moderator mandate:
- Read all agent memos and identify: areas of strong consensus, material disagreements, and critical gaps
- Challenge unsupported claims and identify logical inconsistencies
- Surface hidden assumptions each agent is making
- Synthesize a balanced, structured final decision that incorporates the strongest arguments
- Assign clear action items with owners and timeframes
- Quantify confidence in the final recommendation (0–100%)

You do NOT advocate for any particular agent's position. Your only loyalty is to the quality of the decision.

Output format must include: Decision, Confidence %, Vote Summary, Key Risks, Assumptions, Recommended Actions, Full Report.`,
    tools: ['company-profile'],
    capabilities: ['synthesis', 'facilitation', 'decision-structuring', 'conflict-resolution'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 4096, temperature: 0.2 },
    limits: { maxDecisionsPerHour: 50 },
    status: 'active',
    displayName: 'Board Moderator AI',
    avatarInitial: 'X',
    colorGradient: 'from-slate-400 to-slate-600',
    specialty: 'Facilitation & Synthesis',
    performance: 98,
    decisionsToday: 5,
    roiToday: 0,
    uptime: 100,
  },

  // ── Dev/test company ──────────────────────────────────────────────────────────
]

const devCompany = {
  companyId: 'dev-company',
  name: 'APEX Dev Company',
  industry: 'warehousing',
  verticalId: null,
  size: '50-200',
  description: 'Local development test company',
  promptAppend: 'This is a local development environment. Use realistic but fictional data in all responses.',
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Seeding APEX Agent Studio — Local DynamoDB\n')

  // 1. Ensure table exists
  const { TableNames } = await ddb.send(new ListTablesCommand({}))
  if (!TableNames?.includes(TABLE_NAME)) {
    console.log(`📦 Creating table: ${TABLE_NAME}`)
    await ddb.send(new CreateTableCommand(CREATE_TABLE_PARAMS as Parameters<typeof CreateTableCommand>[0]))
    // Wait for table to be active
    await new Promise((r) => setTimeout(r, 2000))
    console.log('   ✅ Table created\n')
  } else {
    console.log(`📦 Table already exists: ${TABLE_NAME}\n`)
  }

  // 2. Seed agents — write both a versioned record and an AGENT_LATEST pointer
  //    so AgentRepository.listAll() (filters entityType = 'AGENT_LATEST') finds them.
  console.log(`🤖 Seeding ${agents.length} agents...`)
  const now = new Date().toISOString()
  for (const agent of agents) {
    // Strip UI-only display fields before writing; backend schema doesn't know them
    const { status, displayName, avatarInitial, colorGradient, specialty,
            performance, decisionsToday, roiToday, uptime, ...agentCore } = agent as any

    // Conform limits to backend AgentLimitsSchema shape
    const limits = {
      maxRoundsPerMeeting: 3,
      maxConcurrentMeetings: 5,
      maxMemoWords: 800,
      callsPerMinute: 10,
    }

    // Conform capabilities to values the backend AgentCapabilitySchema accepts
    const capabilityMap: Record<string, string> = {
      'ethical-reasoning': 'risk-assessment',
      'risk-flagging': 'risk-assessment',
      'cross-functional-analysis': 'strategic-planning',
      'stakeholder-management': 'strategic-planning',
      'vision-setting': 'strategic-planning',
      'capital-allocation': 'financial-analysis',
      'cash-flow-management': 'financial-analysis',
      'covenant-monitoring': 'financial-analysis',
      'financial-modeling': 'financial-modeling',
      'process-optimization': 'operations-management',
      'logistics': 'operations-management',
      'vendor-management': 'operations-management',
      'supply-chain': 'supply-chain',
      'marketing-strategy': 'market-analysis',
      'brand-management': 'brand-strategy',
      'growth-hacking': 'revenue-optimization',
      'campaign-optimization': 'market-analysis',
      'market-research': 'market-analysis',
      'tech-strategy': 'technology-assessment',
      'automation': 'technology-assessment',
      'platform-engineering': 'technology-assessment',
      'security': 'risk-assessment',
      'technical-architecture': 'technology-assessment',
      'compliance': 'regulatory-compliance',
      'risk-management': 'risk-assessment',
      'contract-review': 'legal-analysis',
      'regulatory-monitoring': 'regulatory-compliance',
      'people-management': 'workforce-planning',
      'hiring': 'workforce-planning',
      'culture': 'workforce-planning',
      'compensation': 'workforce-planning',
      'performance-management': 'workforce-planning',
      'sales-strategy': 'revenue-optimization',
      'pipeline-management': 'revenue-optimization',
      'account-management': 'revenue-optimization',
      'forecasting': 'financial-analysis',
      'deal-coaching': 'revenue-optimization',
      'decision-structuring': 'synthesis',
      'conflict-resolution': 'synthesis',
      'facilitation': 'meeting-facilitation',
    }

    const validCapabilities = [
      'financial-analysis','strategic-planning','operations-management',
      'technology-assessment','market-analysis','risk-assessment',
      'meeting-facilitation','synthesis','critique','seasonal-demand',
      'supply-chain','regulatory-compliance','customer-segmentation',
      'workforce-planning','legal-analysis','negotiation','brand-strategy',
      'revenue-optimization','hr-management','customer-success',
      'field-operations','tax-strategy','sales-management','employee-relations',
    ]

    const mappedCapabilities: string[] = []
    for (const cap of (agentCore.capabilities ?? [])) {
      const mapped = capabilityMap[cap] ?? cap
      if (validCapabilities.includes(mapped) && !mappedCapabilities.includes(mapped)) {
        mappedCapabilities.push(mapped)
      }
    }

    // Conform tools to backend AgentToolSchema accepted values
    const validTools = ['web-search','financial-calculator','market-data-api','crm-integration','erp-integration','weather-data','regulatory-database']
    const toolMap: Record<string,string> = {
      'company-profile': '',
      'market-data': 'market-data-api',
      'financial-data': 'financial-calculator',
      'accounting-api': 'financial-calculator',
      'ops-data': '',
      'logistics-api': '',
      'vendor-data': '',
      'ad-platforms': '',
      'analytics-api': '',
      'crm-api': 'crm-integration',
      'code-analysis': '',
      'tech-research': '',
      'security-scan': '',
      'legal-research': 'regulatory-database',
      'regulatory-db': 'regulatory-database',
      'contract-analysis': 'regulatory-database',
      'hr-platforms': '',
      'market-compensation-data': 'market-data-api',
      'email-api': '',
    }
    const mappedTools: string[] = []
    for (const tool of (agentCore.tools ?? [])) {
      const mapped = toolMap[tool] ?? (validTools.includes(tool) ? tool : '')
      if (mapped && !mappedTools.includes(mapped)) mappedTools.push(mapped)
    }

    const record = {
      ...agentCore,
      description: agentCore.description ?? `${agentCore.name} — AI executive advisor`,
      tools: mappedTools,
      capabilities: mappedCapabilities,
      limits,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }

    // Write versioned record
    await doc.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `AGENT#${agent.agentId}`,
        SK: `VERSION#${agent.version}`,
        GSI1PK: `ROLE#${agent.role}`,
        GSI1SK: `VERSION#${agent.version}`,
        entityType: 'AGENT',
        ...record,
      },
    }))

    // Write AGENT_LATEST pointer — this is what AgentRepository.listAll() scans for
    await doc.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `AGENT#${agent.agentId}`,
        SK: `VERSION#latest`,
        GSI1PK: `ROLE#${agent.role}`,
        GSI1SK: `VERSION#latest`,
        entityType: 'AGENT_LATEST',
        ...record,
      },
    }))

    console.log(`   ✅ ${agent.agentId} (${agent.name} — ${agent.role.toUpperCase()})`)
  }

  // 3. Seed dev company
  console.log(`\n🏢 Seeding dev company...`)
  await doc.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: {
        PK: `COMPANY#${devCompany.companyId}`,
        SK: 'PROFILE',
        entityType: 'COMPANY',
        ...devCompany,
        verticalId: 'vertical.saas-ai-tools',
        primaryMarkets: [],
        currentChallenges: [],
        strategicGoals: [],
        competitiveAdvantages: [],
        createdAt: now,
        updatedAt: now,
      },
    }),
  )
  console.log(`   ✅ ${devCompany.name} (${devCompany.companyId})`)

  console.log('\n✨ Seed complete!')
  console.log(`\n📍 DynamoDB Local:  http://localhost:8000`)
  console.log(`📍 Admin UI:        http://localhost:8001`)
  console.log(`📍 Table:           ${TABLE_NAME}`)
  console.log(`\nNext: Start the backend API server and point it at this local table.`)
  console.log(`      Set DYNAMODB_TABLE_NAME=${TABLE_NAME} in your API .env\n`)
}

main().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
