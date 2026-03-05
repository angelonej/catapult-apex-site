#!/usr/bin/env node
/**
 * install-hooks.mjs
 *
 * Installs the mp-sync-check as a git pre-commit hook.
 * Run once after cloning:  node scripts/install-hooks.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const HOOKS_DIR = path.join(ROOT, '.git', 'hooks')
const HOOK_PATH = path.join(HOOKS_DIR, 'pre-commit')

const HOOK_CONTENT = `#!/bin/sh
# Auto-installed by scripts/install-hooks.mjs
# Runs mp-sync-check before every commit to catch MagicPatterns config drift.
node scripts/mp-sync-check.mjs
`

if (!fs.existsSync(HOOKS_DIR)) {
  console.error('❌ .git/hooks not found — is this a git repo? Run: git init')
  process.exit(1)
}

fs.writeFileSync(HOOK_PATH, HOOK_CONTENT, { mode: 0o755 })
console.log('✅ pre-commit hook installed at .git/hooks/pre-commit')
console.log('   mp-sync-check will run automatically before every git commit.')
console.log('   To run manually: node scripts/mp-sync-check.mjs')
