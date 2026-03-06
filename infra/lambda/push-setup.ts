#!/usr/bin/env tsx
/**
 * push-setup.ts
 *
 * One-shot: reads the company setup + exec agents from local DynamoDB
 * and pushes them to the prod API Gateway (VITE_API_URL from .env.production).
 *
 * Run: npx tsx --tsconfig infra/dynamodb/tsconfig.json infra/lambda/push-setup.ts
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─── Load VITE_API_URL from .env.production ───────────────────────────────────
function loadEnvFile(path: string): Record<string, string> {
  try {
    return Object.fromEntries(
      readFileSync(path, 'utf8')
        .split('\n')
        .filter((l) => l.includes('=') && !l.startsWith('#'))
        .map((l) => l.split('=').map((s) => s.trim()) as [string, string])
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

// ─── Local DynamoDB ───────────────────────────────────────────────────────────
const LOCAL_TABLE = 'ApexAgentStudio-local'
const BOARD_ID    = 'default'
const COMPANY_ID  = 'default'

const rawClient = new DynamoDBClient({ endpoint: 'http://localhost:8000', region: 'us-east-1' })
const doc       = DynamoDBDocumentClient.from(rawClient)

async function main() {
  // 1. Read company setup from local DB
  console.log('\n📋  Reading company setup from local DynamoDB...')
  const { Item: setupItem } = await doc.send(new GetCommand({
    TableName: LOCAL_TABLE,
    Key: { PK: `COMPANY#${COMPANY_ID}`, SK: 'SETUP' },
  }))

  if (!setupItem) {
    console.error('❌  No company setup found in local DynamoDB.')
    console.error('    Run the wizard locally first, then re-run this script.')
    process.exit(1)
  }

  const { PK: _pk1, SK: _sk1, ...setup } = setupItem
  const executives: string[] = setup.executives ?? []
  console.log(`✅  Setup found. Executives: ${executives.join(', ')}`)

  // 2. Push company setup to prod
  console.log('\n📤  Pushing company setup to prod...')
  const setupRes = await fetch(`${API_URL}/company-setup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(setup),
  })
  if (!setupRes.ok) {
    console.error(`❌  Failed to push setup: ${setupRes.status} ${await setupRes.text()}`)
    process.exit(1)
  }
  console.log('✅  Company setup saved to prod.')

  // 3. Read exec agents from local DB (only exec agents in the wizard's list)
  console.log('\n📋  Reading exec agents from local DynamoDB...')
  const { Items: allAgents = [] } = await doc.send(new ScanCommand({
    TableName: LOCAL_TABLE,
    FilterExpression: 'begins_with(PK, :prefix)',
    ExpressionAttributeValues: { ':prefix': `BOARD#${BOARD_ID}` },
  }))

  const allowedRoles = new Set(['ceo', ...executives])
  const execAgents = allAgents
    .map(({ PK: _pk, SK: _sk, ...agent }) => agent)
    .filter((a) => {
      const id = a.agentId as string ?? ''
      if (!id.startsWith('agent.exec.')) return false
      const role = a.role as string ?? id.replace('agent.exec.', '')
      return allowedRoles.has(role)
    })

  console.log(`✅  Found ${execAgents.length} exec agents to push.`)

  // 4. Push each exec agent to prod (replaces any stale seed data)
  console.log('\n📤  Pushing exec agents to prod...')
  let pushed = 0
  for (const agent of execAgents) {
    const res = await fetch(`${API_URL}/board-agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(agent),
    })
    if (res.ok) {
      pushed++
      process.stdout.write('.')
    } else {
      console.error(`\n❌  Failed to push ${agent.agentId}: ${res.status}`)
    }
  }
  console.log(`\n✅  Pushed ${pushed}/${execAgents.length} exec agents to prod.`)
  console.log('\n🎉  Done! Other devices will now load your exact org chart.')
}

main().catch((err) => { console.error(err); process.exit(1) })
