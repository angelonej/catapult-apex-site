/**
 * useAgents.ts
 * React hooks for Agent Studio data.
 *
 * Each hook tries the real API first. If VITE_AGENT_API_URL is not set
 * OR the request fails (e.g. backend not running in dev), it falls back
 * to the local mock data so the UI is always previewable.
 */

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  agentsApi,
  meetingsApi,
  enrichAgent,
  type AgentConfig,
  type AgentRole,
  type AgentStatus,
  type MeetingMetadata,
  type RunMeetingInput,
  type SessionEvent,
} from '../lib/agentApi'
import { localAgentStore, subscribeAgentStore } from '../lib/localAgentStore'

// ─── Mock agents matching the APEX executive team ─────────────────────────────
// These mirror the architecture seed agents (agent.exec.*) from the architecture doc.

export const MOCK_AGENTS: AgentConfig[] = [
  {
    agentId: 'agent.exec.ceo',
    version: '1.0.0',
    name: 'Aria',
    role: 'ceo',
    tier: 'strategic',
    inherits: 'agent.exec.executive',
    systemPrompt: 'You are the Chief Executive Officer AI. You drive strategy, set vision, and make cross-functional calls.',
    tools: ['web-search', 'market-data', 'company-profile'],
    capabilities: ['strategic-planning', 'vision-setting', 'stakeholder-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 10000 },
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
    systemPrompt: 'You are the Chief Financial Officer AI. You manage cash flow, financial forecasting, and risk.',
    tools: ['financial-data', 'accounting-api', 'company-profile'],
    capabilities: ['financial-analysis', 'cash-flow-management', 'risk-assessment'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.4 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 5000 },
    displayName: 'Financial Intelligence AI',
    avatarInitial: 'F',
    colorGradient: 'from-blue-400 to-blue-600',
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
    systemPrompt: 'You are the Chief Operating Officer AI. You own operational efficiency, process optimization, and logistics.',
    tools: ['ops-data', 'logistics-api', 'company-profile'],
    capabilities: ['operations-management', 'process-optimization', 'logistics'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 500, requireApprovalAbove: 2000 },
    displayName: 'Operations Excellence AI',
    avatarInitial: 'O',
    colorGradient: 'from-green-400 to-green-600',
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
    systemPrompt: 'You are the Chief Marketing Officer AI. You drive growth, brand, and customer acquisition.',
    tools: ['web-search', 'ad-platforms', 'analytics-api'],
    capabilities: ['marketing-strategy', 'brand-management', 'growth-hacking'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.8 },
    limits: { maxDecisionsPerHour: 100, requireApprovalAbove: 3000 },
    displayName: 'Growth Marketing AI',
    avatarInitial: 'M',
    colorGradient: 'from-pink-400 to-pink-600',
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
    systemPrompt: 'You are the Chief Technology Officer AI. You oversee technology strategy, automation, and platform.',
    tools: ['code-analysis', 'tech-research', 'company-profile'],
    capabilities: ['tech-strategy', 'automation', 'platform-engineering'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
    limits: { maxDecisionsPerHour: 150, requireApprovalAbove: 5000 },
    displayName: 'Technology AI',
    avatarInitial: 'T',
    colorGradient: 'from-purple-400 to-purple-600',
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
    systemPrompt: 'You are the Chief Legal Officer AI. You manage compliance, legal risk, and regulatory matters.',
    tools: ['legal-research', 'regulatory-db', 'company-profile'],
    capabilities: ['legal-analysis', 'compliance', 'risk-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.3 },
    limits: { maxDecisionsPerHour: 50, requireApprovalAbove: 1000 },
    displayName: 'Legal & Compliance AI',
    avatarInitial: 'L',
    colorGradient: 'from-cyan-400 to-cyan-600',
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
    systemPrompt: 'You are the Chief Human Resources Officer AI. You manage people ops, hiring, and culture.',
    tools: ['hr-platforms', 'company-profile'],
    capabilities: ['people-management', 'hiring', 'culture'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.6 },
    limits: { maxDecisionsPerHour: 80, requireApprovalAbove: 2000 },
    displayName: 'People & Culture AI',
    avatarInitial: 'H',
    colorGradient: 'from-rose-400 to-rose-600',
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
    systemPrompt: 'You are the VP of Sales AI. You drive pipeline, close deals, and protect revenue.',
    tools: ['crm-api', 'web-search', 'company-profile'],
    capabilities: ['sales-strategy', 'pipeline-management', 'account-management'],
    modelPolicy: { model: 'gpt-4o', maxTokens: 1024, temperature: 0.7 },
    limits: { maxDecisionsPerHour: 200, requireApprovalAbove: 10000 },
    displayName: 'Sales Intelligence AI',
    avatarInitial: 'S',
    colorGradient: 'from-orange-400 to-orange-600',
    specialty: 'Sales & Revenue',
    status: 'active',
    performance: 90,
    decisionsToday: 29,
    roiToday: 5240,
    uptime: 99.6,
  },
]

// ─── Helper: is the API configured? ───────────────────────────────────────────
// The Vite proxy exposes the backend at /api in dev (no CORS issues).
// In prod, VITE_AGENT_API_URL points at the full API Gateway URL.
// Either way the API is always reachable — only fall back to mock if it errors.
function isApiConfigured(): boolean {
  return true
}

// ─── useAgents ─────────────────────────────────────────────────────────────────
// Reads from the shared localAgentStore cache — the single source of truth.
// All useAgents() instances in the same tab share the exact same data.
// No mock data. No async seeding. No race conditions.

export interface UseAgentsResult {
  agents: AgentConfig[]
  loading: boolean
  error: string | null
  usingMockData: boolean
  refetch: () => void
  setStatus: (agentId: string, status: AgentStatus) => Promise<void>
}

export function useAgents(): UseAgentsResult {
  // Read synchronously from the shared cache (hydrates + seeds if needed on first call)
  const [agents, setAgents] = useState<AgentConfig[]>(() => localAgentStore.getAll())

  // Subscribe to store changes so any add/remove from any component updates this instance
  useEffect(() => {
    const unsub = subscribeAgentStore(() => setAgents([...localAgentStore.getAll()]))
    return unsub
  }, [])

  const refetch = useCallback(() => {
    setAgents([...localAgentStore.getAll()])
  }, [])

  const setStatus = useCallback(
    async (agentId: string, status: AgentStatus) => {
      // Update the store (which notifies all subscribers including this one)
      const current = localAgentStore.getAll()
      const agent = current.find((a) => a.agentId === agentId)
      if (agent) {
        await localAgentStore.add({ ...agent, status })
      }
    },
    [],
  )

  return { agents, loading: false, error: null, usingMockData: false, refetch, setStatus }

}

// ─── useAgent ─────────────────────────────────────────────────────────────────

export interface UseAgentResult {
  agent: AgentConfig | null
  loading: boolean
  error: string | null
}

export function useAgent(agentId: string | null): UseAgentResult {
  const [agent, setAgent] = useState<AgentConfig | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!agentId) {
      setAgent(null)
      return
    }

    setLoading(true)
    setError(null)

    if (!isApiConfigured()) {
      const mock = MOCK_AGENTS.find((a) => a.agentId === agentId) ?? null
      setAgent(mock)
      setLoading(false)
      return
    }

    agentsApi
      .get(agentId)
      .then((data) => setAgent(data))
      .catch((err) => {
        const mock = MOCK_AGENTS.find((a) => a.agentId === agentId) ?? null
        setAgent(mock)
        setError(err instanceof Error ? err.message : 'API error')
      })
      .finally(() => setLoading(false))
  }, [agentId])

  return { agent, loading, error }
}

// ─── useCreateAgent ──────────────────────────────────────────────────────────

export interface NewAgentForm {
  name: string
  description: string
  role: AgentRole
  tier: 'strategic' | 'operational' | 'assistant'
  systemPrompt: string
  inherits: string
}

export interface UseCreateAgentResult {
  create: (form: NewAgentForm) => Promise<AgentConfig | null>
  loading: boolean
  error: string | null
  reset: () => void
}

export function useCreateAgent(onSuccess: (agent: AgentConfig) => void): UseCreateAgentResult {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (form: NewAgentForm): Promise<AgentConfig | null> => {
    setLoading(true)
    setError(null)
    try {
      const agentId = `agent.custom.${form.role}.${Date.now()}`
      const config: AgentConfig = {
        agentId,
        version: '1.0.0',
        name: form.name,
        description: form.description || `${form.name} — AI ${form.role.toUpperCase()} executive`,
        role: form.role,
        tier: form.tier,
        inherits: form.inherits || 'agent.exec.executive',
        systemPrompt: form.systemPrompt,
        tools: [],
        capabilities: [],
        modelPolicy: { model: 'gpt-4o', maxTokens: 2048, temperature: 0.5 },
        limits: { maxRoundsPerMeeting: 3, maxConcurrentMeetings: 5, maxMemoWords: 800, callsPerMinute: 10 } as any,
        status: 'active',
      }

      // Persist to local board store (local DynamoDB via /local proxy)
      const created = await localAgentStore.add(config)
      onSuccess(created)
      return created
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create agent')
      return null
    } finally {
      setLoading(false)
    }
  }, [onSuccess])

  const reset = useCallback(() => setError(null), [])

  return { create, loading, error, reset }
}

// ─── useDeleteAgent ───────────────────────────────────────────────────────────

export interface UseDeleteAgentResult {
  remove: (agentId: string) => Promise<boolean>
  loading: boolean
  error: string | null
}

export function useDeleteAgent(onSuccess: (agentId: string) => void): UseDeleteAgentResult {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const remove = useCallback(async (agentId: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      // Remove from local board store (local DynamoDB via /local proxy)
      await localAgentStore.remove(agentId)
      onSuccess(agentId)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete agent')
      return false
    } finally {
      setLoading(false)
    }
  }, [onSuccess])

  return { remove, loading, error }
}

// ─── useCreateMeeting ─────────────────────────────────────────────────────────

export interface UseCreateMeetingResult {
  run: (input: RunMeetingInput) => Promise<string | null>
  meetingId: string | null
  loading: boolean
  error: string | null
  reset: () => void
}

export function useCreateMeeting(): UseCreateMeetingResult {
  const [meetingId, setMeetingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = useCallback(async (input: RunMeetingInput): Promise<string | null> => {
    setLoading(true)
    setError(null)

    if (!isApiConfigured()) {
      // Simulate a meeting ID in dev/mock mode
      const mockId = `mock-meeting-${Date.now()}`
      setMeetingId(mockId)
      setLoading(false)
      return mockId
    }

    try {
      const { meetingId: id } = await meetingsApi.run(input)
      setMeetingId(id)
      return id
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to start meeting'
      setError(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setMeetingId(null)
    setError(null)
    setLoading(false)
  }, [])

  return { run, meetingId, loading, error, reset }
}

// ─── useMeetingEvents — polls GET /meetings/:id/events every 2s ──────────────

export interface UseMeetingEventsResult {
  meeting: MeetingMetadata | null
  events: SessionEvent[]
  polling: boolean
  complete: boolean
  error: string | null
}

const POLL_INTERVAL_MS = 2000

export function useMeetingEvents(meetingId: string | null): UseMeetingEventsResult {
  const [meeting, setMeeting] = useState<MeetingMetadata | null>(null)
  const [events, setEvents] = useState<SessionEvent[]>([])
  const [polling, setPolling] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!meetingId) {
      setMeeting(null)
      setEvents([])
      setPolling(false)
      setComplete(false)
      return
    }

    // Mock mode — simulate phased events
    if (!isApiConfigured() || meetingId.startsWith('mock-')) {
      simulateMockMeeting(meetingId, setEvents, setComplete, setMeeting)
      return
    }

    setPolling(true)

    const poll = async () => {
      try {
        const [meta, evts] = await Promise.all([
          meetingsApi.get(meetingId),
          meetingsApi.getEvents(meetingId),
        ])
        setMeeting(meta)
        setEvents(evts)

        if (meta.status === 'completed' || meta.status === 'failed') {
          setComplete(true)
          setPolling(false)
          if (intervalRef.current) clearInterval(intervalRef.current)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Polling error')
      }
    }

    void poll()
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setPolling(false)
    }
  }, [meetingId])

  return { meeting, events, polling, complete, error }
}

// ─── Mock meeting simulation ───────────────────────────────────────────────────

function simulateMockMeeting(
  meetingId: string,
  setEvents: React.Dispatch<React.SetStateAction<SessionEvent[]>>,
  setComplete: React.Dispatch<React.SetStateAction<boolean>>,
  setMeeting: React.Dispatch<React.SetStateAction<MeetingMetadata | null>>,
) {
  const companyId = (import.meta as any).env?.VITE_COMPANY_ID ?? 'dev-company'

  setMeeting({
    meetingId,
    companyId,
    sessionType: 'board-session',
    question: 'Mock strategic question',
    status: 'running',
    agentIds: ['agent.exec.ceo', 'agent.exec.cfo', 'agent.exec.coo'],
    moderatorAgentId: 'agent.exec.moderator',
    createdAt: new Date().toISOString(),
  })

  const phases: Array<{ delay: number; event: SessionEvent }> = [
    {
      delay: 400,
      event: {
        type: 'session_started',
        ts: new Date().toISOString(),
        seq: 1,
        phase: 1,
      },
    },
    {
      delay: 1200,
      event: {
        type: 'agent_thinking',
        ts: new Date().toISOString(),
        seq: 2,
        phase: 2,
        agentId: 'agent.exec.ceo',
        agentName: 'Aria (CEO)',
      },
    },
    {
      delay: 2400,
      event: {
        type: 'memo_posted',
        ts: new Date().toISOString(),
        seq: 3,
        phase: 2,
        agentId: 'agent.exec.ceo',
        agentName: 'Aria (CEO)',
        data: {
          agentId: 'agent.exec.ceo',
          content: 'Strategic analysis complete. This initiative aligns with our Q2 growth targets and presents a strong opportunity. Key recommendation: proceed with phased rollout.',
          keyPoints: ['Strong market fit', 'Manageable capital requirement', 'First-mover advantage available'],
          risks: ['Execution complexity', 'Market timing uncertainty'],
          recommendations: ['Proceed with 90-day pilot', 'Assign COO as program lead'],
          confidence: 87,
        },
      },
    },
    {
      delay: 3200,
      event: {
        type: 'agent_thinking',
        ts: new Date().toISOString(),
        seq: 4,
        phase: 2,
        agentId: 'agent.exec.cfo',
        agentName: 'Felix (CFO)',
      },
    },
    {
      delay: 4600,
      event: {
        type: 'memo_posted',
        ts: new Date().toISOString(),
        seq: 5,
        phase: 2,
        agentId: 'agent.exec.cfo',
        agentName: 'Felix (CFO)',
        data: {
          agentId: 'agent.exec.cfo',
          content: 'Financial modeling shows positive NPV at 18-month horizon. Cash flow impact is manageable with current credit facility. Recommend approval with spend gate at $50K.',
          keyPoints: ['Positive NPV', 'Within credit facility headroom', 'Payback period 14 months'],
          risks: ['Working capital impact in months 2-4', 'Currency exposure if international'],
          recommendations: ['Set $50K approval gate', 'Monthly P&L review'],
          confidence: 91,
        },
      },
    },
    {
      delay: 5800,
      event: {
        type: 'critique_started',
        ts: new Date().toISOString(),
        seq: 6,
        phase: 3,
        agentId: 'agent.exec.moderator',
        agentName: 'Moderator',
      },
    },
    {
      delay: 7200,
      event: {
        type: 'critique_complete',
        ts: new Date().toISOString(),
        seq: 7,
        phase: 3,
        data: {
          summary: 'Board consensus is strong. CEO and CFO align on phased approach with financial guardrails.',
          agreements: ['Phased rollout is optimal', 'Financial risk is manageable'],
          disagreements: ['Timing of pilot vs. full launch'],
          gaps: ['Operations capacity assessment pending from COO'],
          synthesisNotes: 'Recommend proceeding to decision phase with COO input on capacity.',
        },
      },
    },
    {
      delay: 8400,
      event: {
        type: 'session_complete',
        ts: new Date().toISOString(),
        seq: 8,
        phase: 4,
        data: {
          decision: 'APPROVED — Proceed with 90-day phased pilot program.',
          confidence: 89,
          voteSummary: {
            'agent.exec.ceo': { stance: 'approve', rationale: 'Strong strategic fit with Q2 targets.' },
            'agent.exec.cfo': { stance: 'conditional', rationale: 'Approve with $50K spend gate and monthly review.' },
          },
          keyRisks: [
            { risk: 'Execution complexity', severity: 'medium', mitigationStrategy: 'Dedicated program manager, weekly steering committee.' },
          ],
          assumptions: ['Current credit facility remains available', 'Team capacity exists for 90-day sprint'],
          recommendedActions: [
            { action: 'Assign COO as program lead', owner: 'CEO', timeframe: 'This week', priority: 'high' },
            { action: 'Set up $50K spend approval gate', owner: 'CFO', timeframe: '48 hours', priority: 'high' },
            { action: 'Draft 90-day pilot plan', owner: 'COO', timeframe: '1 week', priority: 'medium' },
          ],
          fullReport: 'Full board session report — all members approved proceeding with phased pilot. Financial controls in place. Operations to confirm capacity within 7 days.',
          memos: [],
        },
      },
    },
  ]

  phases.forEach(({ delay, event }) => {
    setTimeout(() => {
      setEvents((prev) => [...prev, { ...event, ts: new Date().toISOString() }])
      if (event.type === 'session_complete') {
        setComplete(true)
        setMeeting((prev) =>
          prev ? { ...prev, status: 'completed', completedAt: new Date().toISOString() } : prev,
        )
      }
    }, delay)
  })
}
