#!/usr/bin/env tsx
/**
 * export-local-data.ts
 *
 * Dumps all items from local DynamoDB into infra/lambda/seed-data.json
 * so provision-aws.ts can import them into the real AWS table.
 *
 * Usage:
 *   npx tsx --tsconfig infra/dynamodb/tsconfig.json infra/lambda/export-local-data.ts
 *
 * Requires Docker DynamoDB Local running on :8000
 */

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { writeFileSync } from 'fs'
import { join } from 'path'

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME ?? 'ApexAgentStudio-local'

const client = new DynamoDBClient({
  endpoint: 'http://localhost:8000',
  region: 'us-east-1',
  credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
})
const doc = DynamoDBDocumentClient.from(client)

async function scanAll(): Promise<unknown[]> {
  const items: unknown[] = []
  let lastKey: Record<string, unknown> | undefined

  do {
    const result = await doc.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        ExclusiveStartKey: lastKey as any,
      }),
    )
    items.push(...(result.Items ?? []))
    lastKey = result.LastEvaluatedKey as Record<string, unknown> | undefined
  } while (lastKey)

  return items
}

async function main() {
  console.log(`Scanning local table "${TABLE_NAME}" on http://localhost:8000 …`)
  const items = await scanAll()
  console.log(`Found ${items.length} items.`)

  const outPath = join(import.meta.dirname ?? __dirname, 'seed-data.json')
  writeFileSync(outPath, JSON.stringify(items, null, 2))
  console.log(`Written to ${outPath}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
