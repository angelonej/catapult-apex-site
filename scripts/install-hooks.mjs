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

// ─── pre-commit: runs mp-sync-check before every local commit ─────────────────
const PRE_COMMIT = `#!/bin/sh
# Auto-installed by scripts/install-hooks.mjs
# Runs mp-sync-check before every commit to catch MagicPatterns config drift.
node scripts/mp-sync-check.mjs
`

// ─── post-merge: runs automatically after git pull / git merge ────────────────
// Also shows a diff summary of what MP changed in src/ so you can review.
const POST_MERGE = `#!/bin/sh
# Auto-installed by scripts/install-hooks.mjs
# Runs after every git pull or git merge.

echo ""
echo "═══════════════════════════════════════════"
echo " Post-pull: running MagicPatterns sync check"
echo "═══════════════════════════════════════════"
node scripts/mp-sync-check.mjs

# Show a summary of what changed in src/ so you know what MP touched
CHANGED=$(git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD -- src/ 2>/dev/null)
if [ -n "$CHANGED" ]; then
  echo ""
  echo "Files changed in src/ by this pull:"
  echo "$CHANGED" | sed 's/^/  📝 /'
  echo ""
fi
`

if (!fs.existsSync(HOOKS_DIR)) {
  console.error('❌ .git/hooks not found — is this a git repo? Run: git init')
  process.exit(1)
}

fs.writeFileSync(path.join(HOOKS_DIR, 'pre-commit'), PRE_COMMIT, { mode: 0o755 })
fs.writeFileSync(path.join(HOOKS_DIR, 'post-merge'), POST_MERGE, { mode: 0o755 })

console.log('✅ pre-commit hook installed  → runs mp-sync-check before every commit')
console.log('✅ post-merge hook installed  → runs mp-sync-check + diff summary after every git pull')
console.log('   To run manually: npm run check')
