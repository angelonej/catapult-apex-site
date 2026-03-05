#!/usr/bin/env node
/**
 * mp-sync-check.mjs
 *
 * Run after pulling MagicPatterns commits to verify critical config files
 * haven't been overwritten or corrupted. Repairs what it can automatically.
 *
 * Usage:
 *   node scripts/mp-sync-check.mjs          # check + auto-repair
 *   node scripts/mp-sync-check.mjs --dry    # check only, no writes
 *
 * Also runs as a git pre-commit hook (see scripts/install-hooks.mjs).
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DRY = process.argv.includes('--dry')

let warnings = 0
let repairs = 0

// ─── helpers ──────────────────────────────────────────────────────────────────

function read(rel) {
  try { return fs.readFileSync(path.join(ROOT, rel), 'utf8') } catch { return null }
}

function write(rel, content) {
  if (DRY) { console.log(`  [DRY] would write: ${rel}`); return }
  fs.writeFileSync(path.join(ROOT, rel), content, 'utf8')
  repairs++
  console.log(`  ✅ repaired: ${rel}`)
}

function warn(msg) {
  warnings++
  console.warn(`  ⚠️  ${msg}`)
}

function ok(msg) {
  console.log(`  ✓  ${msg}`)
}

// ─── checks ───────────────────────────────────────────────────────────────────

// 1. vite.config.ts — must keep proxy config for /api and /local
function checkViteConfig() {
  console.log('\n[vite.config.ts]')
  const content = read('vite.config.ts')
  if (!content) { warn('vite.config.ts missing!'); return }

  const REQUIRED_VITE = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // /api/* → ai-exec-board backend (agent registry, read-only)
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\/api/, ''),
      },
      // /local/* → local-api (board roster CRUD against local DynamoDB :8000)
      '/local': {
        target: 'http://localhost:3002',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\\/local/, ''),
      },
    },
  },
})
`
  const hasProxy = content.includes("'/api'") && content.includes("'/local'")
  const hasReact = content.includes('@vitejs/plugin-react')

  if (!hasProxy) {
    warn('vite.config.ts is missing proxy config — restoring...')
    write('vite.config.ts', REQUIRED_VITE)
  } else if (!hasReact) {
    warn('vite.config.ts is missing react plugin — restoring...')
    write('vite.config.ts', REQUIRED_VITE)
  } else {
    ok('proxy config intact')
  }
}

// 2. tailwind.config.js — must have our custom color tokens
function checkTailwindConfig() {
  console.log('\n[tailwind.config.js]')
  const content = read('tailwind.config.js')
  if (!content) { warn('tailwind.config.js missing!'); return }

  const checks = [
    ["content glob for src/**", content.includes("'./src/**/*.{js,ts,jsx,tsx}'")],
    ["custom 'electric' color token", content.includes("electric:")],
    ["custom 'gold' color token", content.includes("gold:")],
    ["custom 'accent' color token", content.includes("accent:")],
    ["glow animations", content.includes("'glow'")],
    ["glow box shadows", content.includes("'glow-sm'")],
  ]

  let ok_count = 0
  for (const [label, pass] of checks) {
    if (!pass) warn(`tailwind.config.js: missing ${label}`)
    else ok_count++
  }
  if (ok_count === checks.length) ok('all custom tokens present')
  else warn('tailwind.config.js has been modified by MagicPatterns — review manually or restore from git:\n    git checkout HEAD -- tailwind.config.js')
}

// 3. package.json — must keep custom scripts (local-api, seed, etc.)
function checkPackageJson() {
  console.log('\n[package.json]')
  const content = read('package.json')
  if (!content) { warn('package.json missing!'); return }

  let pkg
  try { pkg = JSON.parse(content) } catch { warn('package.json is not valid JSON!'); return }

  const REQUIRED_SCRIPTS = ['local-api', 'seed', 'seed:all', 'seed-board']
  const REQUIRED_DEPS = ['framer-motion', 'lucide-react', 'react', 'react-dom']

  let allGood = true
  for (const s of REQUIRED_SCRIPTS) {
    if (!pkg.scripts?.[s]) {
      warn(`package.json: missing script "${s}"`)
      allGood = false
    }
  }
  for (const d of REQUIRED_DEPS) {
    if (!pkg.dependencies?.[d] && !pkg.devDependencies?.[d]) {
      warn(`package.json: missing dependency "${d}"`)
      allGood = false
    }
  }
  if (allGood) ok('scripts and dependencies intact')
}

// 4. tsconfig.json — must have paths/strict config intact
// Note: tsconfig uses JSONC (comments allowed) — strip them before parsing
function checkTsConfig() {
  console.log('\n[tsconfig.json]')
  const content = read('tsconfig.json')
  if (!content) { warn('tsconfig.json missing!'); return }

  // Strip single-line comments (/* */ and //) before parsing
  const stripped = content
    .replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '')
    .replace(/\/\/[^\n]*/g, '')

  let cfg
  try { cfg = JSON.parse(stripped) } catch { warn('tsconfig.json is not valid JSON!'); return }

  if (!cfg.compilerOptions?.jsx) {
    warn('tsconfig.json: missing compilerOptions.jsx — may cause build failures')
  } else {
    ok('compilerOptions.jsx present')
  }
  if (cfg.compilerOptions?.strict !== true) {
    warn('tsconfig.json: strict mode disabled — TypeScript safety reduced')
  } else {
    ok('strict mode enabled')
  }
}

// 5. src/lib/ data layer — these files must NOT be overwritten by MP
function checkDataLayer() {
  console.log('\n[src/lib/ data layer]')
  const CRITICAL_LIBS = [
    'src/lib/localAgentStore.ts',
    'src/lib/personaStore.ts',
    'src/lib/agentApi.ts',
    'src/hooks/useAgents.ts',
    'src/hooks/usePersonas.ts',
  ]

  for (const f of CRITICAL_LIBS) {
    const content = read(f)
    if (!content) { warn(`${f} is MISSING — data layer broken!`); continue }

    // Spot-check for key identifiers that must be present
    const checks = {
      'src/lib/localAgentStore.ts': ['localAgentStore', 'SEED_AGENTS', 'apex:board-agents'],
      'src/lib/personaStore.ts': ['personaStore', 'PERSONA_SEEDS', 'apex:personas'],
      'src/lib/agentApi.ts': ['AgentRole', 'ROLE_META', 'ethics-chair'],
      'src/hooks/useAgents.ts': ['useAgents', 'localAgentStore', 'MOCK_AGENTS'],
      'src/hooks/usePersonas.ts': ['usePersonas', 'personaStore'],
    }

    const markers = checks[f] || []
    const missing = markers.filter(m => !content.includes(m))
    if (missing.length > 0) {
      warn(`${f}: missing key identifiers [${missing.join(', ')}] — may have been overwritten by MP!`)
      warn(`  Restore with: git diff HEAD -- ${f}`)
    } else {
      ok(`${f.replace('src/', '')} intact`)
    }
  }
}

// 6. index.html + index.css — must have correct root div; Inter font is loaded via CSS
function checkIndexHtml() {
  console.log('\n[index.html + index.css]')
  const html = read('index.html')
  if (!html) { warn('index.html missing!'); return }

  if (!html.includes('id="root"')) warn('index.html: missing root div')
  else ok('root div present')

  if (!html.includes('src/index.tsx') && !html.includes('src/main.tsx')) {
    warn('index.html: missing entry script tag (src/index.tsx or src/main.tsx)')
  } else {
    ok('entry script tag present')
  }

  // Inter is loaded via @import in index.css — check there
  const css = read('src/index.css')
  if (css && css.includes('Inter')) ok('Inter font loaded via CSS')
  else warn('src/index.css: Inter font @import may be missing')
}

// ─── run all checks ───────────────────────────────────────────────────────────

console.log('═══════════════════════════════════════════')
console.log(' MagicPatterns Sync Check')
console.log('═══════════════════════════════════════════')

checkViteConfig()
checkTailwindConfig()
checkPackageJson()
checkTsConfig()
checkDataLayer()
checkIndexHtml()

console.log('\n═══════════════════════════════════════════')
if (warnings === 0) {
  console.log(' ✅ All checks passed — safe to run npm run dev')
} else {
  console.log(` ❌ ${warnings} issue(s) found, ${repairs} auto-repaired`)
  if (DRY) console.log('    Re-run without --dry to apply repairs')
  if (warnings > repairs) {
    console.log('    Manual review needed for remaining issues ↑')
    process.exit(1)  // fail pre-commit if unresolved issues remain
  }
}
console.log('═══════════════════════════════════════════\n')
