#!/usr/bin/env tsx
/**
 * push-setup-direct.ts
 *
 * Pushes a hard-coded company setup + filtered exec agents directly
 * to the prod API (no local DynamoDB needed).
 *
 * Edit EXEC_ROLES below to match exactly what the wizard selected,
 * then run: npx tsx --tsconfig infra/dynamodb/tsconfig.json infra/lambda/push-setup-direct.ts
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─── Load VITE_API_URL from .env.production ───────────────────────────────────
function loadEnvFile(path: string): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync(path, 'utf8')
        .split('\n')
        .filter((l) => l.includes('=') && !l.startsWith('#'))
        .map((l) => {
          const idx = l.indexOf('=')
          return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()] as [string, string]
        })
    )
  } catch {
    return {}
  }
}

const env = loadEnvFile(resolve(process.cwd(), '.env.production'))
const API_URL = env.VITE_API_URL
if (!API_URL) {
  console.error('❌  VITE_API_URL not found in .env.production')
  process.exit(1)
}
console.log(`📡  Target API: ${API_URL}`)

// ─── Exec roles from the wizard (from dashboard screenshot) ──────────────────
// Visible agents: Aria(CEO) Felix(CFO) Orion(COO) Maya(CMO) Theo(CTO)
//                 Hana(CHRO) Sage(CRO) Rex(CPO) Nova(CDO) Iris(CDO?)
//                 Shield(CISO) Ember(CSO) Lex(CLO) Cleo(CCO)
// "cdo" appears twice (Nova + Iris) — Iris is likely "clo" or another role.
// Adjust this list to exactly match what you picked in the wizard:
const EXEC_ROLES = ['ceo','cfo','coo','cmo','cto','chro','cro','cpo','cdo','ciso','cso','clo','cco']

// ─── Seed agent data (same as localAgentStore SEED_AGENTS) ───────────────────
// We read seed-data.json which has all 83 items exported from local DynamoDB.
// Filter to only exec agents matching EXEC_ROLES.
interface RawItem { agentId?: string; role?: string; [k: string]: unknown }

let seedAgents: RawItem[] = []
try {
  const raw = readFileSync(resolve(process.cwd(), 'infra/lambda/seed-data.json'), 'utf8')
  const items: RawItem[] = JSON.parse(raw)
  const allowed = new Set(['ceo', ...EXEC_ROLES])
  seedAgents = items.filter((item) => {
    const id = item.agentId ?? ''
    if (typeof id !== 'string' || !id.startsWith('agent.exec.')) return false
    const role = (item.role as string) ?? id.replace('agent.exec.', '')
    return allowed.has(role)
  })
  console.log(`📦  Found ${seedAgents.length} exec agents in seed-data.json`)
} catch (e) {
  console.error('❌  Could not read infra/lambda/seed-data.json:', (e as Error).message)
  process.exit(1)
}

// ─── Company setup payload ────────────────────────────────────────────────────
const setupPayload = {
  companyName: 'My Company',   // update if you know the name from the wizard
  industry: 'technology',
  teamSize: '51-200',
  executives: EXEC_ROLES,
  allRoles: EXEC_ROLES,
  approvalLimit: '10000',
  integrations: [],
  launchedAt: new Date().toISOString(),
}

async function main() {
  // 1. Push company setup
  console.log('\n📤  Pushing company setup...')
  const setupRes = await fetch(`${API_URL}/company-setup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(setupPayload),
  })
  if (!setupRes.ok) {
    console.error(`❌  ${setupRes.status} ${await setupRes.text()}`)
    process.exit(1)
  }
  console.log('✅  Company setup saved.')

  // 2. Push exec agents
  console.log(`\n📤  Pushing ${seedAgents.length} exec agents...`)
  let pushed = 0
  for (const agent of seedAgents) {
    const res = await fetch(`${API_URL}/board-agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent),
    })
    if (res.ok) { pushed++; process.stdout.write('.') }
    else console.error(`\n❌  ${agent.agentId}: ${res.status}`)
  }
  console.log(`\n✅  Pushed ${pushed}/${seedAgents.length} exec agents.`)
  console.log('\n🎉  Done! Open the prod site in incognito — it will now load your org chart.')
}

main().catch((e) => { console.error(e); process.exit(1) })
