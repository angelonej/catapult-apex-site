/**
 * decisionStore.ts
 *
 * localStorage-backed decision log.
 *
 * Seeds from SEED_DECISIONS on first load so there's always data to show.
 * updateStatus persists approve/reject back to localStorage.
 * API is async so it can be swapped for a real backend later.
 */

import { ROLE_META } from './agentApi'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DecisionItem {
  id: string
  exec: string       // e.g. "COO"
  execColor: string  // Tailwind text-* class
  execBg: string     // Tailwind bg-* class
  role: string
  decision: string
  impact: string
  confidence: number
  time: string       // relative display string e.g. "4 min ago"
  createdAt: string  // ISO timestamp — source of truth for sorting/display
  outcome: string
  status: 'approved' | 'pending' | 'flagged' | 'rejected'
  hash: string
  category: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'apex:decisions'

/** Convert ROLE_META colorGradient (from-*-400 to-*-600) → text-* / bg-* classes */
function roleColors(role: string): { execColor: string; execBg: string } {
  const gradient = ROLE_META[role]?.colorGradient ?? 'from-slate-400 to-slate-600'
  // Extract the "from" colour name e.g. "amber" from "from-amber-400 to-orange-500"
  const m = gradient.match(/from-(\w+)-\d+/)
  const color = m?.[1] ?? 'slate'
  return {
    execColor: `text-${color}-400`,
    execBg: `bg-${color}-500/20`,
  }
}

/** Format a stored ISO timestamp as a human-readable relative string */
function relativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`
  return `${Math.floor(hrs / 24)} day${Math.floor(hrs / 24) > 1 ? 's' : ''} ago`
}

// ─── Seed data ────────────────────────────────────────────────────────────────

interface SeedDecision {
  role: string
  decision: string
  outcome: string
  impact: string
  confidence: number
  status: DecisionItem['status']
  category: string
  hash: string
  minutesAgo: number
}

const SEED_DECISIONS: SeedDecision[] = [
  {
    role: 'coo', decision: 'Rerouted 3 warehouse crews to Dock B — incoming shipment 2hrs early',
    outcome: 'Prevented $4,200 overtime charge', impact: 'High', confidence: 96,
    status: 'approved', category: 'Operations', hash: '0x7f3a...c91b', minutesAgo: 4,
  },
  {
    role: 'cfo', decision: 'Flagged net-60 invoice from Acme Corp — recommend converting to net-30 with 2% discount',
    outcome: 'Projected $8,200 cash flow improvement', impact: 'High', confidence: 91,
    status: 'pending', category: 'Finance', hash: '0x2b9e...f44a', minutesAgo: 18,
  },
  {
    role: 'legal', decision: 'OSHA inspection scheduled for March 14 — initiated 12-point compliance checklist',
    outcome: 'Avoided potential $45K fine exposure', impact: 'Critical', confidence: 99,
    status: 'approved', category: 'Compliance', hash: '0x9c1d...b72f', minutesAgo: 60,
  },
  {
    role: 'ceo', decision: 'Recommend expanding to 3rd warehouse location in Phoenix — market analysis complete',
    outcome: 'Requires human strategic review', impact: 'Critical', confidence: 84,
    status: 'flagged', category: 'Strategy', hash: '0x4e8c...a19d', minutesAgo: 120,
  },
  {
    role: 'cmo', decision: 'Launched retargeting campaign for Q2 — 14 ad variants A/B tested',
    outcome: 'Projected +$12K revenue this quarter', impact: 'Medium', confidence: 88,
    status: 'approved', category: 'Marketing', hash: '0x6a2f...d83e', minutesAgo: 180,
  },
  {
    role: 'vpsales', decision: 'Identified 3 at-risk accounts — initiated retention outreach sequence',
    outcome: 'Protecting $38K ARR', impact: 'High', confidence: 92,
    status: 'approved', category: 'Sales', hash: '0x1b7c...e52a', minutesAgo: 240,
  },
  {
    role: 'cto', decision: 'Automated invoice processing workflow — eliminated 6hrs/week manual entry',
    outcome: 'Saving $840/month in labor', impact: 'Medium', confidence: 95,
    status: 'approved', category: 'Technology', hash: '0x8d4b...c63f', minutesAgo: 300,
  },
  {
    role: 'cfo', decision: 'Q1 cash flow projection updated — recommend drawing $50K credit line buffer',
    outcome: 'Awaiting owner approval', impact: 'High', confidence: 89,
    status: 'pending', category: 'Finance', hash: '0x3f9a...b28c', minutesAgo: 360,
  },
  {
    role: 'chro', decision: 'Flagged high turnover risk in Dock C night shift — recommended $2/hr retention bonus',
    outcome: 'Estimated $28K saved vs. replacement cost per employee', impact: 'Medium', confidence: 82,
    status: 'pending', category: 'HR', hash: '0x3f7a...b44c', minutesAgo: 420,
  },
  {
    role: 'coo', decision: 'Automated pick-route optimization for Aisle 4–7 — reduced average pick time 18%',
    outcome: '+$12,400 weekly throughput value', impact: 'High', confidence: 94,
    status: 'approved', category: 'Operations', hash: '0x6d2e...c73a', minutesAgo: 480,
  },
]

function buildSeed(): DecisionItem[] {
  return SEED_DECISIONS.map((s, i) => {
    const meta = ROLE_META[s.role]
    const label = meta?.label ?? s.role.toUpperCase()
    const { execColor, execBg } = roleColors(s.role)
    const createdAt = new Date(Date.now() - s.minutesAgo * 60_000).toISOString()
    return {
      id: `decision-seed-${i}`,
      exec: label,
      execColor,
      execBg,
      role: s.role,
      decision: s.decision,
      outcome: s.outcome,
      impact: s.impact,
      confidence: s.confidence,
      status: s.status,
      category: s.category,
      hash: s.hash,
      createdAt,
      time: relativeTime(createdAt),
    }
  })
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

function readStorage(): DecisionItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const items = JSON.parse(raw) as DecisionItem[]
    // Refresh relative time strings on every read
    return items.map((d) => ({ ...d, time: relativeTime(d.createdAt) }))
  } catch {
    return []
  }
}

function writeStorage(items: DecisionItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const decisionStore = {
  /** Return the decision log, seeding from SEED_DECISIONS on first load. */
  list(): DecisionItem[] {
    const stored = readStorage()
    if (stored.length > 0) return stored
    const seed = buildSeed()
    writeStorage(seed)
    return seed
  },

  /** Persist an approve / reject action for a decision. */
  updateStatus(id: string, status: 'approved' | 'rejected'): DecisionItem[] {
    const updated = readStorage().map((d) =>
      d.id === id ? { ...d, status } : d,
    )
    writeStorage(updated)
    return updated
  },

  /** Add a new decision to the top of the log (for future live-stream use). */
  prepend(item: Omit<DecisionItem, 'id' | 'time'>): DecisionItem[] {
    const newItem: DecisionItem = {
      ...item,
      id: `decision-${Date.now()}`,
      time: relativeTime(item.createdAt),
    }
    const updated = [newItem, ...readStorage()]
    writeStorage(updated)
    return updated
  },

  /** Wipe stored decisions so the seed re-runs on next list() call. */
  reset(): void {
    localStorage.removeItem(STORAGE_KEY)
  },
}
