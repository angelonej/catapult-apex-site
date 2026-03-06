/**
 * Agent Studio API Client
 * Matches the backend API defined in AGENT-STUDIO-ARCHITECTURE.md
 *
 * Base URL is controlled by VITE_AGENT_API_URL env var.
 * Falls back to the local Express dev server on port 3001.
 */

// ─── Base URL ──────────────────────────────────────────────────────────────────
// In dev, Vite proxies /api/* → localhost:3001 (no CORS preflight).
// In prod, set VITE_AGENT_API_URL to the full API Gateway URL.
const BASE_URL =
  ((import.meta as any).env?.VITE_AGENT_API_URL as string | undefined) ?? '/api'

// ─── Types (mirrors agent-core package) ───────────────────────────────────────

export type AgentRole =
  | 'ceo'
  | 'cfo'
  | 'coo'
  | 'cto'
  | 'cmo'
  | 'chro'
  | 'clo'
  | 'cro'
  | 'cpo'
  | 'cdo'
  | 'ciso'
  | 'cso'
  | 'cco'
  | 'vpsales'
  | 'moderator'
  | 'legal'
  | 'tax'
  | 'controller'
  | 'strategy'
  | 'bookkeeper'
  | 'fpa'
  | 'hr'
  | 'sdr'
  | 'marketing'
  | 'ops-analyst'
  | 'board-chair'
  | 'audit-chair'
  | 'risk-chair'
  | 'comp-chair'
  | 'gov-chair'
  | 'general-counsel'
  | 'chief-of-staff'
  | 'vp-engineering'
  | 'head-of-growth'
  | 'ethics-chair'
  | 'independent-director'
  | 'tech-advisor'
  | 'strategy-advisor'
  | 'investor-director'
  | 'customer-director'
  // ── Worker Agent roles ──
  | 'closer'
  | 'bdr'
  | 'demand-gen'
  | 'content-seo'
  | 'growth-hacker'
  | 'customer-success'
  | 'support-specialist'
  | 'retention'
  | 'pr-media'
  | 'crisis-comms'
  | 'brand-amplifier'
  | string

export type AgentTier = 'strategic' | 'operational' | 'assistant'
export type AgentStatus = 'active' | 'paused'

export interface ModelPolicy {
  model: string
  maxTokens: number
  temperature: number
  topP?: number
  frequencyPenalty?: number
  presencePenalty?: number
}

export interface AgentLimits {
  maxDecisionsPerHour?: number
  maxSpendPerDecision?: number
  requireApprovalAbove?: number
}

export interface AgentConfig {
  agentId: string
  version: string
  name: string
  description?: string
  role: AgentRole
  tier: AgentTier
  inherits?: string
  systemPrompt: string
  tools: string[]
  capabilities: string[]
  modelPolicy: ModelPolicy
  limits?: AgentLimits
  /** Runtime display fields (not in core, added by registry) */
  displayName?: string
  avatarInitial?: string
  colorGradient?: string
  specialty?: string
  status: AgentStatus
  /** Stats — computed from meeting history */
  performance?: number
  decisionsToday?: number
  roiToday?: number
  uptime?: number
  /**
   * Persona profile — loaded from personaStore and injected into the
   * agent's system prompt when it participates in a board session.
   * Stored separately in DynamoDB under COMPANY#<id>/PERSONA#<agentId>.
   */
  personaProfile?: import('./personaStore').PersonaProfile
}

// ─── Canonical role display metadata ──────────────────────────────────────────
// Single source of truth: role value (as stored in DynamoDB) → display data.
// Merges onto any AgentConfig at fetch time so cards always render correctly
// regardless of which DynamoDB table or seed populated the record.

export interface RoleMeta {
  label: string          // e.g. "CEO"
  title: string          // e.g. "Chief Executive Officer"
  defaultName: string    // fallback persona name if API doesn't provide one
  avatarInitial: string
  specialty: string
  colorGradient: string  // Tailwind from-*/to-* classes
  tier: 'strategic' | 'operational' | 'assistant'
  defaultPerformance: number
}

export const ROLE_META: Record<string, RoleMeta> = {
  // ── C-Suite ──
  ceo:        { label: 'CEO',     title: 'Chief Executive Officer',   defaultName: 'Aria',   avatarInitial: 'A', specialty: 'Strategy & Growth',      colorGradient: 'from-amber-400 to-orange-500',   tier: 'strategic',   defaultPerformance: 94 },
  cfo:        { label: 'CFO',     title: 'Chief Financial Officer',   defaultName: 'Felix',  avatarInitial: 'F', specialty: 'Finance & Cash Flow',     colorGradient: 'from-blue-500 to-indigo-600',    tier: 'strategic',   defaultPerformance: 97 },
  coo:        { label: 'COO',     title: 'Chief Operating Officer',   defaultName: 'Orion',  avatarInitial: 'O', specialty: 'Operations & Logistics',  colorGradient: 'from-green-400 to-emerald-600',  tier: 'strategic',   defaultPerformance: 91 },
  cto:        { label: 'CTO',     title: 'Chief Technology Officer',  defaultName: 'Theo',   avatarInitial: 'T', specialty: 'Tech & Automation',       colorGradient: 'from-violet-500 to-purple-700',  tier: 'strategic',   defaultPerformance: 93 },
  cmo:        { label: 'CMO',     title: 'Chief Marketing Officer',   defaultName: 'Maya',   avatarInitial: 'M', specialty: 'Marketing & Acquisition', colorGradient: 'from-pink-400 to-rose-600',      tier: 'strategic',   defaultPerformance: 88 },
  chro:       { label: 'CHRO',    title: 'Chief HR Officer',          defaultName: 'Hana',   avatarInitial: 'H', specialty: 'HR & People Ops',         colorGradient: 'from-red-400 to-rose-600',       tier: 'operational', defaultPerformance: 86 },
  clo:        { label: 'CLO',     title: 'Chief Legal Officer',       defaultName: 'Lex',    avatarInitial: 'L', specialty: 'Compliance & Risk',       colorGradient: 'from-cyan-400 to-teal-600',      tier: 'operational', defaultPerformance: 99 },
  // ── legal role alias (local seed uses 'legal', backend may use 'clo') ──
  legal:      { label: 'LEGAL',   title: 'Chief Legal Officer',       defaultName: 'Lex',    avatarInitial: 'L', specialty: 'Compliance & Risk',       colorGradient: 'from-cyan-400 to-teal-600',      tier: 'operational', defaultPerformance: 99 },
  // ── Director-level ──
  vpsales:    { label: 'VPSALES', title: 'VP of Sales',               defaultName: 'Sage',   avatarInitial: 'S', specialty: 'Sales & Revenue',         colorGradient: 'from-orange-400 to-amber-600',   tier: 'operational', defaultPerformance: 90 },
  tax:        { label: 'TAX',     title: 'Tax Strategist',            defaultName: 'Petra',  avatarInitial: 'P', specialty: 'Tax & Compliance',        colorGradient: 'from-lime-400 to-green-600',     tier: 'operational', defaultPerformance: 96 },
  controller: { label: 'CTRL',    title: 'Financial Controller',      defaultName: 'Grant',  avatarInitial: 'G', specialty: 'Financial Control',       colorGradient: 'from-sky-400 to-blue-600',       tier: 'operational', defaultPerformance: 95 },
  // ── Specialist ──
  strategy:   { label: 'STRAT',   title: 'Strategy Analyst',         defaultName: 'River',  avatarInitial: 'R', specialty: 'Strategic Analysis',      colorGradient: 'from-violet-400 to-purple-600',  tier: 'operational', defaultPerformance: 89 },
  fpa:        { label: 'FP&A',    title: 'FP&A Analyst',             defaultName: 'Quinn',  avatarInitial: 'Q', specialty: 'Financial Planning',      colorGradient: 'from-blue-400 to-blue-700',      tier: 'assistant',   defaultPerformance: 92 },
  hr:         { label: 'HR',      title: 'HR Coordinator',            defaultName: 'Avery',  avatarInitial: 'A', specialty: 'People Operations',       colorGradient: 'from-rose-300 to-red-500',       tier: 'assistant',   defaultPerformance: 87 },
  sdr:        { label: 'SDR',     title: 'Sales Development Rep',     defaultName: 'Chase',  avatarInitial: 'C', specialty: 'Lead Generation',         colorGradient: 'from-amber-300 to-yellow-600',   tier: 'assistant',   defaultPerformance: 84 },
  marketing:  { label: 'MKTG',    title: 'Marketing Coordinator',     defaultName: 'Lena',   avatarInitial: 'L', specialty: 'Content & Campaigns',     colorGradient: 'from-rose-300 to-pink-600',      tier: 'assistant',   defaultPerformance: 85 },
  bookkeeper: { label: 'BKP',     title: 'Bookkeeper',                defaultName: 'Sage',   avatarInitial: 'S', specialty: 'Bookkeeping',             colorGradient: 'from-emerald-400 to-green-600',  tier: 'assistant',   defaultPerformance: 98 },
  'ops-analyst':{ label:'OPS',    title: 'Operations Analyst',        defaultName: 'Drew',   avatarInitial: 'D', specialty: 'Operations Analysis',     colorGradient: 'from-teal-400 to-cyan-600',      tier: 'assistant',   defaultPerformance: 88 },
  moderator:  { label: 'MOD',     title: 'Board Moderator',           defaultName: 'Axiom',  avatarInitial: 'X', specialty: 'Facilitation & Synthesis',colorGradient: 'from-slate-400 to-slate-600',    tier: 'strategic',   defaultPerformance: 98 },
  executive:  { label: 'EXEC',    title: 'Executive Base',            defaultName: 'Exec',   avatarInitial: 'E', specialty: 'Cross-functional Strategy',colorGradient: 'from-amber-400 to-orange-500',  tier: 'strategic',   defaultPerformance: 90 },
  base:       { label: 'BASE',    title: 'Base Agent',                defaultName: 'Base',   avatarInitial: 'B', specialty: 'Ethics & Core Principles',colorGradient: 'from-slate-500 to-slate-700',    tier: 'strategic',   defaultPerformance: 100 },
  // ── Extended C-Suite ──
  cro:              { label: 'CRO',   title: 'Chief Revenue Officer',        defaultName: 'Rex',     avatarInitial: 'R', specialty: 'Revenue & Pipeline Growth',  colorGradient: 'from-red-400 to-rose-600',          tier: 'strategic',   defaultPerformance: 92 },
  cpo:              { label: 'CPO',   title: 'Chief Product Officer',        defaultName: 'Nova',    avatarInitial: 'N', specialty: 'Product Strategy & Roadmap', colorGradient: 'from-indigo-400 to-violet-600',     tier: 'strategic',   defaultPerformance: 91 },
  cdo:              { label: 'CDO',   title: 'Chief Data Officer',           defaultName: 'Iris',    avatarInitial: 'I', specialty: 'Data Strategy & Analytics',  colorGradient: 'from-sky-400 to-cyan-600',          tier: 'strategic',   defaultPerformance: 94 },
  ciso:             { label: 'CISO',  title: 'Chief Information Security Officer', defaultName: 'Shield', avatarInitial: 'S', specialty: 'Security & Cyber Risk',  colorGradient: 'from-slate-500 to-gray-700',        tier: 'strategic',   defaultPerformance: 97 },
  cso:              { label: 'CSO',   title: 'Chief Strategy Officer',       defaultName: 'Ember',   avatarInitial: 'E', specialty: 'Corporate Strategy',         colorGradient: 'from-amber-400 to-yellow-600',      tier: 'strategic',   defaultPerformance: 93 },
  cco:              { label: 'CCO',   title: 'Chief Customer Officer',       defaultName: 'Cleo',    avatarInitial: 'C', specialty: 'Customer Success & NPS',     colorGradient: 'from-teal-400 to-emerald-600',      tier: 'strategic',   defaultPerformance: 89 },
  // ── Board of Directors ──
  'board-chair':    { label: 'CHAIR', title: 'Board Chair',                  defaultName: 'Marcus',  avatarInitial: 'M', specialty: 'Board Governance & Oversight',colorGradient: 'from-amber-500 to-yellow-700',     tier: 'strategic',   defaultPerformance: 98 },
  'audit-chair':    { label: 'AUDIT', title: 'Audit Committee Chair',        defaultName: 'Felix',   avatarInitial: 'A', specialty: 'Financial Audit & Controls',  colorGradient: 'from-blue-600 to-indigo-800',       tier: 'strategic',   defaultPerformance: 99 },
  'risk-chair':     { label: 'RISK',  title: 'Risk Committee Chair',         defaultName: 'Shield',  avatarInitial: 'R', specialty: 'Enterprise Risk Management',  colorGradient: 'from-red-600 to-rose-800',          tier: 'strategic',   defaultPerformance: 97 },
  'comp-chair':     { label: 'COMP',  title: 'Compensation Committee Chair', defaultName: 'Claire',  avatarInitial: 'C', specialty: 'Executive Compensation',      colorGradient: 'from-emerald-500 to-green-700',     tier: 'strategic',   defaultPerformance: 95 },
  'gov-chair':      { label: 'GOV',   title: 'Governance Committee Chair',   defaultName: 'Priya',   avatarInitial: 'G', specialty: 'Corporate Governance & ESG',  colorGradient: 'from-violet-500 to-purple-700',     tier: 'strategic',   defaultPerformance: 96 },
  // ── Senior Advisors / Directors ──
  'general-counsel':{ label: 'GC',    title: 'General Counsel',              defaultName: 'Lex',     avatarInitial: 'G', specialty: 'M&A, Contracts & Litigation', colorGradient: 'from-cyan-500 to-teal-700',         tier: 'operational', defaultPerformance: 98 },
  'chief-of-staff': { label: 'CoS',   title: 'Chief of Staff',               defaultName: 'Donna',   avatarInitial: 'C', specialty: 'Executive Operations & Coordination',colorGradient: 'from-orange-400 to-amber-600', tier: 'operational', defaultPerformance: 91 },
  'vp-engineering': { label: 'VPE',   title: 'VP of Engineering',            defaultName: 'Theo',    avatarInitial: 'V', specialty: 'Engineering & Platform',      colorGradient: 'from-violet-400 to-indigo-600',     tier: 'operational', defaultPerformance: 92 },
  'head-of-growth': { label: 'HoG',   title: 'Head of Growth',               defaultName: 'Blaze',   avatarInitial: 'H', specialty: 'Growth & Experimentation',    colorGradient: 'from-fuchsia-400 to-pink-600',      tier: 'operational', defaultPerformance: 88 },
  // ── Independent Board Directors (non-executive) ──
  'ethics-chair':         { label: 'ETHICS', title: 'Ethics & AI Safety Chair',         defaultName: 'Vera',     avatarInitial: 'V', specialty: 'AI Ethics & Responsible AI',   colorGradient: 'from-fuchsia-500 to-purple-700',    tier: 'strategic',   defaultPerformance: 96 },
  'independent-director': { label: 'IND',    title: 'Independent Director',             defaultName: 'Atlas',    avatarInitial: 'A', specialty: 'Customer & Market Advocacy',   colorGradient: 'from-orange-400 to-amber-600',      tier: 'strategic',   defaultPerformance: 94 },
  'tech-advisor':         { label: 'TECH',   title: 'Independent Technology Advisor',   defaultName: 'Sterling', avatarInitial: 'S', specialty: 'Technology & Innovation',       colorGradient: 'from-violet-400 to-purple-600',     tier: 'strategic',   defaultPerformance: 93 },
  'strategy-advisor':     { label: 'STRAT',  title: 'Independent Strategy Advisor',     defaultName: 'River',    avatarInitial: 'R', specialty: 'Corporate Strategy & M&A',     colorGradient: 'from-emerald-400 to-teal-600',      tier: 'strategic',   defaultPerformance: 95 },
  'investor-director':    { label: 'INV',    title: 'Lead Investor Director',            defaultName: 'Victoria', avatarInitial: 'V', specialty: 'Capital & Investor Relations',  colorGradient: 'from-amber-500 to-yellow-600',      tier: 'strategic',   defaultPerformance: 97 },
  'customer-director':    { label: 'CUST',   title: 'Customer Advisory Director',       defaultName: 'Sage',     avatarInitial: 'S', specialty: 'Customer Voice & Advocacy',     colorGradient: 'from-rose-400 to-pink-600',         tier: 'strategic',   defaultPerformance: 91 },
  // ── Worker Agent roles ──
  'closer':          { label: 'AE',    title: 'Deal Closer AI',          defaultName: 'Viper',  avatarInitial: 'V', specialty: 'Contract Negotiation & Closing', colorGradient: 'from-rose-400 to-rose-600',     tier: 'assistant', defaultPerformance: 91 },
  'bdr':             { label: 'BDR',   title: 'Revenue Hunter AI',       defaultName: 'Chase',  avatarInitial: 'C', specialty: 'Pipeline Building & Sequences',  colorGradient: 'from-orange-500 to-red-500',    tier: 'assistant', defaultPerformance: 85 },
  'demand-gen':      { label: 'DG',    title: 'Demand Gen AI',           defaultName: 'Nova',   avatarInitial: 'N', specialty: 'Paid Media & Lead Gen',          colorGradient: 'from-violet-400 to-violet-600', tier: 'assistant', defaultPerformance: 89 },
  'content-seo':     { label: 'SEO',   title: 'Content & SEO AI',        defaultName: 'Pixel',  avatarInitial: 'P', specialty: 'SEO & Content Strategy',         colorGradient: 'from-purple-400 to-purple-600', tier: 'assistant', defaultPerformance: 88 },
  'growth-hacker':   { label: 'GRW',   title: 'Growth Hacker AI',        defaultName: 'Blaze',  avatarInitial: 'B', specialty: 'Viral Growth & Conversion',      colorGradient: 'from-fuchsia-400 to-fuchsia-600',tier: 'assistant', defaultPerformance: 86 },
  'customer-success':{ label: 'CS',    title: 'Customer Success AI',     defaultName: 'Cleo',   avatarInitial: 'C', specialty: 'Onboarding & Health Scoring',    colorGradient: 'from-teal-400 to-teal-600',     tier: 'assistant', defaultPerformance: 90 },
  'support-specialist':{ label: 'SUP', title: 'Support Specialist AI',   defaultName: 'Patch',  avatarInitial: 'P', specialty: 'Ticket Resolution & SLA',        colorGradient: 'from-emerald-400 to-emerald-600',tier: 'assistant', defaultPerformance: 94 },
  'retention':       { label: 'RET',   title: 'Retention AI',            defaultName: 'Ember',  avatarInitial: 'E', specialty: 'Churn Prevention & Win-Back',    colorGradient: 'from-green-400 to-teal-500',    tier: 'assistant', defaultPerformance: 88 },
  'pr-media':        { label: 'PR',    title: 'PR & Media AI',           defaultName: 'Iris',   avatarInitial: 'I', specialty: 'Media Relations & Press',        colorGradient: 'from-sky-400 to-sky-600',       tier: 'assistant', defaultPerformance: 87 },
  'crisis-comms':    { label: 'CRS',   title: 'Crisis Comms AI',         defaultName: 'Shield', avatarInitial: 'S', specialty: 'Crisis Response & Reputation',   colorGradient: 'from-blue-400 to-blue-600',     tier: 'assistant', defaultPerformance: 96 },
  'brand-amplifier': { label: 'AMP',   title: 'Brand Amplifier AI',      defaultName: 'Buzz',   avatarInitial: 'B', specialty: 'Brand & Influencer Growth',      colorGradient: 'from-indigo-400 to-indigo-600', tier: 'assistant', defaultPerformance: 84 },
}

/** Enrich an AgentConfig returned from the API with display metadata from ROLE_META */
export function enrichAgent(agent: AgentConfig): AgentConfig {
  const meta = ROLE_META[agent.role]
  if (!meta) return agent
  return {
    ...agent,
    avatarInitial:  agent.avatarInitial  ?? meta.avatarInitial,
    colorGradient:  agent.colorGradient  ?? meta.colorGradient,
    specialty:      agent.specialty      ?? meta.specialty,
    displayName:    agent.displayName    ?? meta.title,
    // Only fill name if the API returned something generic like the agentId
    name:           (agent.name && agent.name !== agent.agentId) ? agent.name : meta.defaultName,
    performance:    agent.performance    ?? meta.defaultPerformance,
    status:         agent.status         ?? ((agent as any).isActive ? 'active' : 'paused'),
  }
}



export interface ResolvedAgent extends AgentConfig {
  resolvedSystemPrompt: string
  resolvedTools: string[]
  resolvedCapabilities: string[]
  inheritanceChain: string[]
}

// ─── Meeting types ─────────────────────────────────────────────────────────────

export type SessionType =
  | 'board-session'
  | 'status-meeting'
  | 'planning-session'
  | 'one-on-one'
  | 'review-meeting'
  | 'product-session'
  | 'crisis-session'
  | 'hiring-session'

export type MeetingStatus = 'running' | 'completed' | 'failed'

export interface CompanyProfile {
  companyId: string
  name: string
  industry?: string
  verticalId?: string
  size?: string
  description?: string
  promptAppend?: string // company overlay
}

export interface RunMeetingInput {
  companyProfile: CompanyProfile
  agentIds: string[]
  moderatorAgentId: string
  question: string
  verticalId?: string
  sessionType: SessionType
  enableRebuttals?: boolean
  openaiApiKey?: string // per-company billing
}

export interface AgentMemo {
  agentId: string
  content: string
  keyPoints: string[]
  risks: string[]
  recommendations: string[]
  confidence: number
}

export interface AgentRebuttal {
  agentId: string
  content: string
  agreements: string[]
  challenges: string[]
  newInsights: string[]
  positionChanged: boolean
}

export interface ModeratorCritique {
  summary: string
  agreements: string[]
  disagreements: string[]
  gaps: string[]
  synthesisNotes: string
}

export interface VoteSummary {
  stance: 'approve' | 'reject' | 'abstain' | 'conditional'
  rationale: string
}

export interface KeyRisk {
  risk: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  mitigationStrategy: string
}

export interface RecommendedAction {
  action: string
  owner: string
  timeframe: string
  priority: 'low' | 'medium' | 'high' | 'critical'
}

export interface MeetingOutput {
  decision: string
  confidence: number
  voteSummary: Record<string, VoteSummary>
  keyRisks: KeyRisk[]
  assumptions: string[]
  recommendedActions: RecommendedAction[]
  fullReport: string
  memos: AgentMemo[]
  rebuttals?: AgentRebuttal[]
  critique?: ModeratorCritique
}

export type SessionEventType =
  | 'session_started'
  | 'agent_thinking'
  | 'memo_posted'
  | 'rebuttal_thinking'
  | 'rebuttal_posted'
  | 'critique_started'
  | 'critique_complete'
  | 'decision_started'
  | 'session_complete'
  | 'error'

export interface SessionEvent {
  type: SessionEventType
  ts: string
  seq: number
  agentId?: string
  agentName?: string
  phase?: 1 | 2 | 2.5 | 3 | 4
  data?: AgentMemo | AgentRebuttal | ModeratorCritique | MeetingOutput | { message: string }
}

export interface MeetingMetadata {
  meetingId: string
  companyId: string
  sessionType: SessionType
  question: string
  status: MeetingStatus
  agentIds: string[]
  moderatorAgentId: string
  createdAt: string
  completedAt?: string
  output?: MeetingOutput
}

// ─── Vertical types ────────────────────────────────────────────────────────────

export interface VerticalOverlay {
  verticalId: string
  role: AgentRole
  promptAppend: string
  capabilitiesAdd: string[]
  toolsAdd: string[]
}

export interface Vertical {
  verticalId: string
  name: string
  description: string
  overlays: VerticalOverlay[]
}

// ─── API response wrapper ──────────────────────────────────────────────────────

interface ApiOk<T> {
  success: true
  data: T
}

interface ApiFail {
  success: false
  error: { code: string; message: string }
}

type ApiResponse<T> = ApiOk<T> | ApiFail

// ─── HTTP helpers ──────────────────────────────────────────────────────────────

async function request<T>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  path: string,
  body?: unknown,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  })

  const json = (await res.json()) as ApiResponse<T>

  if (!json.success) {
    throw new Error(json.error?.message ?? `API error ${res.status}`)
  }

  return json.data
}

// ─── Agent endpoints ───────────────────────────────────────────────────────────

export const agentsApi = {
  /** GET /agents — list all agents */
  list(): Promise<{ agents: AgentConfig[]; count: number }> {
    return request('GET', '/agents')
  },

  /** GET /agents/:id — get one agent (latest version) */
  get(agentId: string): Promise<AgentConfig> {
    return request('GET', `/agents/${agentId}`)
  },

  /** GET /agents/:id/resolved — get agent with full inheritance + overlays resolved */
  getResolved(agentId: string, companyId?: string): Promise<ResolvedAgent> {
    const q = companyId ? `?companyId=${companyId}` : ''
    return request('GET', `/agents/${agentId}/resolved${q}`)
  },

  /** POST /agents — create a new agent (backend requires version + description) */
  create(config: AgentConfig): Promise<AgentConfig> {
    return request('POST', '/agents', config)
  },

  /** PUT /agents/:id — replace agent config (creates new version) */
  update(agentId: string, config: Partial<AgentConfig>): Promise<AgentConfig> {
    return request('PUT', `/agents/${agentId}`, config)
  },

  /** PATCH /agents/:id/status — toggle active/paused */
  setStatus(agentId: string, status: AgentStatus): Promise<AgentConfig> {
    return request('PATCH', `/agents/${agentId}/status`, { status })
  },

  /** DELETE /agents/:id */
  delete(agentId: string): Promise<void> {
    return request('DELETE', `/agents/${agentId}`)
  },

  /** GET /agents?role=:role — filter by role */
  listByRole(role: AgentRole): Promise<AgentConfig[]> {
    return request('GET', `/agents?role=${role}`)
  },
}

// ─── Meeting endpoints ─────────────────────────────────────────────────────────

export const meetingsApi = {
  /** POST /meetings/run — kick off a meeting (async, returns meetingId immediately) */
  run(input: RunMeetingInput): Promise<{ meetingId: string }> {
    return request('POST', '/meetings/run', input)
  },

  /** GET /meetings/:id — get meeting metadata + output when complete */
  get(meetingId: string): Promise<MeetingMetadata> {
    return request('GET', `/meetings/${meetingId}`)
  },

  /** GET /meetings/:id/events — get all session events (for replaying/polling) */
  getEvents(meetingId: string): Promise<SessionEvent[]> {
    return request('GET', `/meetings/${meetingId}/events`)
  },

  /** GET /meetings?companyId=:id — list meetings for a company */
  listByCompany(companyId: string): Promise<MeetingMetadata[]> {
    return request('GET', `/meetings?companyId=${companyId}`)
  },
}

// ─── Vertical endpoints ────────────────────────────────────────────────────────

export const verticalsApi = {
  /** GET /verticals — list all verticals */
  list(): Promise<Vertical[]> {
    return request('GET', '/verticals')
  },

  /** GET /verticals/:id */
  get(verticalId: string): Promise<Vertical> {
    return request('GET', `/verticals/${verticalId}`)
  },

  /**
   * POST /verticals/generate — AI-generate vertical overlays for a given industry.
   * NOTE: This endpoint needs to be added to the backend.
   */
  generate(industry: string): Promise<Vertical> {
    return request('POST', '/verticals/generate', { industry })
  },
}

// ─── Company endpoints ─────────────────────────────────────────────────────────

export const companiesApi = {
  /** GET /companies/:id */
  get(companyId: string): Promise<CompanyProfile> {
    return request('GET', `/companies/${companyId}`)
  },

  /** PUT /companies/:id/overlay — update company-wide prompt overlay */
  updateOverlay(companyId: string, promptAppend: string): Promise<void> {
    return request('PUT', `/companies/${companyId}/overlay`, { promptAppend })
  },
}
