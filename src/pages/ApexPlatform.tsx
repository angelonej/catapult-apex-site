import React, { useEffect, useState, Component } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import {
  ZapIcon,
  BrainIcon,
  TrendingUpIcon,
  ClockIcon,
  DollarSignIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertTriangleIcon,
  SettingsIcon,
  BellIcon,
  ChevronRightIcon,
  ActivityIcon,
  ShieldIcon,
  RadioIcon,
  BarChart3Icon,
  UsersIcon,
  HomeIcon,
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  RefreshCwIcon,
  PlusIcon,
  WifiIcon,
  WifiOffIcon,
  PackageIcon,
  TruckIcon,
  WrenchIcon,
  BuildingIcon,
  StarIcon,
  FilterIcon,
  SearchIcon,
  GlobeIcon,
  LockIcon,
  DatabaseIcon,
  MapPinIcon,
  MicIcon,
  GitBranchIcon,
  NetworkIcon,
  RocketIcon,
  SparklesIcon,
  ScrollTextIcon,
  Trash2Icon,
} from 'lucide-react'
import { ScreenVoice } from '../components/apex/ScreenVoice'
import { ScreenWorkflows } from '../components/apex/ScreenWorkflows'
import { ScreenOrgChart } from '../components/apex/ScreenOrgChart'
import { ScreenGrowth } from '../components/apex/ScreenGrowth'
import { ScreenComms } from '../components/apex/ScreenComms'
import { ScreenInboundComms } from '../components/apex/ScreenInboundComms'
import { ScreenRules } from '../components/apex/ScreenRules'
import { ScreenPersonas, EXEC_STATIC, ALL_AVATARS } from '../components/apex/ScreenPersonas'
import { ScreenBeaconHub } from '../components/apex/ScreenBeaconHub'
import { ScreenBoardOfDirectors } from '../components/apex/ScreenBoardOfDirectors'
import { ScreenZello } from '../components/apex/ScreenZello'
import { ScreenSessions } from '../components/apex/ScreenSessions'
import { ScreenSetup } from '../components/apex/ScreenSetup'
import { useAgents, useCreateAgent, useDeleteAgent, type UseAgentsResult, type NewAgentForm } from '../hooks/useAgents'
import { useDecisions, type DecisionItem } from '../hooks/useDecisions'
import { ROLE_META } from '../lib/agentApi'
import { localAgentStore, subscribeAgentStore } from '../lib/localAgentStore'
// ─── Types ─────────────────────────────────────────────────────────────────────
type Screen =
  | 'dashboard'
  | 'team'
  | 'decisions'
  | 'analytics'
  | 'beacons'
  | 'industries'
  | 'settings'
  | 'voice'
  | 'workflows'
  | 'orgchart'
  | 'growth'
  | 'comms'
  | 'personas'
  | 'board'
  | 'zello'
  | 'setup'
  | 'inbound'
  | 'rules'
  | 'sessions'
type DecisionFilter = 'all' | 'pending' | 'approved' | 'flagged'
type TimePeriod = 'today' | 'week' | 'month' | 'quarter'
// ─── Data ──────────────────────────────────────────────────────────────────────
const ANALYTICS_ROLE_COLORS: Record<string, { color: string; text: string; bg: string; border: string }> = {
  ceo:  { color: 'from-amber-400 to-amber-600',   text: 'text-amber-400',   bg: 'bg-amber-500/20',   border: 'border-amber-500/40'   },
  cfo:  { color: 'from-blue-400 to-blue-600',     text: 'text-blue-400',    bg: 'bg-blue-500/20',    border: 'border-blue-500/40'    },
  coo:  { color: 'from-green-400 to-green-600',   text: 'text-green-400',   bg: 'bg-green-500/20',   border: 'border-green-500/40'   },
  cmo:  { color: 'from-pink-400 to-pink-600',     text: 'text-pink-400',    bg: 'bg-pink-500/20',    border: 'border-pink-500/40'    },
  cto:  { color: 'from-purple-400 to-purple-600', text: 'text-purple-400',  bg: 'bg-purple-500/20',  border: 'border-purple-500/40'  },
  clo:  { color: 'from-cyan-400 to-cyan-600',     text: 'text-cyan-400',    bg: 'bg-cyan-500/20',    border: 'border-cyan-500/40'    },
  chro: { color: 'from-rose-400 to-rose-600',     text: 'text-rose-400',    bg: 'bg-rose-500/20',    border: 'border-rose-500/40'    },
  cso:  { color: 'from-orange-400 to-orange-600', text: 'text-orange-400',  bg: 'bg-orange-500/20',  border: 'border-orange-500/40'  },
  cro:  { color: 'from-red-400 to-rose-600',      text: 'text-red-400',     bg: 'bg-red-500/20',     border: 'border-red-500/40'     },
  cpo:  { color: 'from-indigo-400 to-violet-600', text: 'text-indigo-400',  bg: 'bg-indigo-500/20',  border: 'border-indigo-500/40'  },
  cdo:  { color: 'from-sky-400 to-cyan-600',      text: 'text-sky-400',     bg: 'bg-sky-500/20',     border: 'border-sky-500/40'     },
  ciso: { color: 'from-slate-400 to-gray-600',    text: 'text-slate-400',   bg: 'bg-slate-500/20',   border: 'border-slate-500/40'   },
  cco:  { color: 'from-teal-400 to-emerald-600',  text: 'text-teal-400',    bg: 'bg-teal-500/20',    border: 'border-teal-500/40'    },
};
const ANALYTICS_DEFAULT_COLORS = { color: 'from-slate-500 to-slate-700', text: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/40' };
function getLiveAnalyticsExecs() {
  return localAgentStore.getAll()
    .filter((a) => a.agentId.startsWith('agent.exec.') && a.role !== 'moderator')
    .map((a, i) => {
      const c = ANALYTICS_ROLE_COLORS[a.role] ?? ANALYTICS_DEFAULT_COLORS;
      // deterministic-ish seeded numbers so they don't re-randomize on every render
      const seed = a.role.charCodeAt(0) + a.role.charCodeAt(a.role.length - 1);
      return {
        id: a.agentId,
        role: a.role.toUpperCase(),
        name: a.name ?? a.role,
        fullName: a.displayName ?? a.specialty ?? a.role,
        color: c.color,
        bg: c.bg,
        border: c.border,
        text: c.text,
        status: a.status ?? 'active',
        performance: a.performance ?? (85 + (seed % 15)),
        decisions: a.decisionsToday ?? (seed % 40) + 5,
        roi: a.roiToday ?? (seed * 120 + 1200),
        uptime: a.uptime ?? 99.5,
        specialty: a.specialty ?? a.role,
      };
    });
}
const executives = [{
    id: 'ceo',
    role: 'CEO',
    name: 'Aria',
    fullName: 'Strategic Vision AI',
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/40',
    text: 'text-amber-400',
    status: 'active',
    performance: 94,
    decisions: 23,
    roi: 4280,
    uptime: 99.8,
    specialty: 'Strategy & Growth',
  },
  {
    id: 'cfo',
    role: 'CFO',
    name: 'Felix',
    fullName: 'Financial Intelligence AI',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/40',
    text: 'text-blue-400',
    status: 'active',
    performance: 97,
    decisions: 47,
    roi: 6140,
    uptime: 99.9,
    specialty: 'Finance & Cash Flow',
  },
  {
    id: 'coo',
    role: 'COO',
    name: 'Orion',
    fullName: 'Operations Excellence AI',
    color: 'from-green-400 to-green-600',
    bg: 'bg-green-500/20',
    border: 'border-green-500/40',
    text: 'text-green-400',
    status: 'active',
    performance: 91,
    decisions: 156,
    roi: 8320,
    uptime: 99.7,
    specialty: 'Operations & Logistics',
  },
  {
    id: 'cmo',
    role: 'CMO',
    name: 'Maya',
    fullName: 'Growth Marketing AI',
    color: 'from-pink-400 to-pink-600',
    bg: 'bg-pink-500/20',
    border: 'border-pink-500/40',
    text: 'text-pink-400',
    status: 'active',
    performance: 88,
    decisions: 31,
    roi: 3910,
    uptime: 99.5,
    specialty: 'Marketing & Acquisition',
  },
  {
    id: 'cto',
    role: 'CTO',
    name: 'Theo',
    fullName: 'Technology AI',
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/40',
    text: 'text-purple-400',
    status: 'active',
    performance: 93,
    decisions: 18,
    roi: 2100,
    uptime: 99.9,
    specialty: 'Tech & Automation',
  },
  {
    id: 'clo',
    role: 'CLO',
    name: 'Lex',
    fullName: 'Legal & Compliance AI',
    color: 'from-cyan-400 to-cyan-600',
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/40',
    text: 'text-cyan-400',
    status: 'active',
    performance: 99,
    decisions: 12,
    roi: 9800,
    uptime: 100,
    specialty: 'Compliance & Risk',
  },
  {
    id: 'chro',
    role: 'CHRO',
    name: 'Hana',
    fullName: 'People & Culture AI',
    color: 'from-rose-400 to-rose-600',
    bg: 'bg-rose-500/20',
    border: 'border-rose-500/40',
    text: 'text-rose-400',
    status: 'paused',
    performance: 86,
    decisions: 0,
    roi: 0,
    uptime: 0,
    specialty: 'HR & People Ops',
  },
  {
    id: 'cso',
    role: 'CSO',
    name: 'Sage',
    fullName: 'Sales Intelligence AI',
    color: 'from-orange-400 to-orange-600',
    bg: 'bg-orange-500/20',
    border: 'border-orange-500/40',
    text: 'text-orange-400',
    status: 'active',
    performance: 90,
    decisions: 29,
    roi: 5240,
    uptime: 99.6,
    specialty: 'Sales & Revenue',
  },
]
const roiData = [
  {
    day: 'Mon',
    roi: 12400,
    decisions: 180,
    timeSaved: 18,
  },
  {
    day: 'Tue',
    roi: 18200,
    decisions: 210,
    timeSaved: 22,
  },
  {
    day: 'Wed',
    roi: 15800,
    decisions: 195,
    timeSaved: 20,
  },
  {
    day: 'Thu',
    roi: 24100,
    decisions: 248,
    timeSaved: 27,
  },
  {
    day: 'Fri',
    roi: 31400,
    decisions: 290,
    timeSaved: 31,
  },
  {
    day: 'Sat',
    roi: 22800,
    decisions: 220,
    timeSaved: 24,
  },
  {
    day: 'Sun',
    roi: 19600,
    decisions: 198,
    timeSaved: 21,
  },
]
const beacons = [
  {
    id: 'GB-001',
    name: 'Main Warehouse Floor',
    location: 'Building A, Zone 1',
    status: 'online',
    signal: 98,
    lastSync: '12 sec ago',
    packets: 847,
    battery: 94,
  },
  {
    id: 'GB-002',
    name: 'Receiving Dock',
    location: 'Building A, Dock B',
    status: 'online',
    signal: 91,
    lastSync: '28 sec ago',
    packets: 412,
    battery: 87,
  },
  {
    id: 'GB-003',
    name: 'Cold Storage Unit',
    location: 'Building B, Level 1',
    status: 'online',
    signal: 76,
    lastSync: '1 min ago',
    packets: 203,
    battery: 72,
  },
  {
    id: 'GB-004',
    name: 'Executive Office',
    location: 'HQ, Floor 3',
    status: 'online',
    signal: 99,
    lastSync: '8 sec ago',
    packets: 1204,
    battery: 100,
  },
  {
    id: 'GB-005',
    name: 'Loading Bay 2',
    location: 'Building C, Bay 2',
    status: 'offline',
    signal: 0,
    lastSync: '4 hrs ago',
    packets: 89,
    battery: 12,
  },
  {
    id: 'GB-006',
    name: 'Dispatch Office',
    location: 'Building A, Office',
    status: 'online',
    signal: 88,
    lastSync: '45 sec ago',
    packets: 631,
    battery: 81,
  },
]
const industries = [
  {
    key: 'warehousing',
    name: 'Warehousing & Distribution',
    icon: PackageIcon,
    color: 'from-indigo-500 to-indigo-700',
    market: '$1.2T',
    fact: 'IBISWorld 2024',
  },
  {
    key: 'trades',
    name: 'Trades (HVAC/Plumbing/Electrical)',
    icon: WrenchIcon,
    color: 'from-orange-500 to-orange-700',
    market: '$480B',
    fact: 'IBISWorld 2024',
  },
  {
    key: 'logistics',
    name: 'Logistics & Freight',
    icon: TruckIcon,
    color: 'from-blue-500 to-blue-700',
    market: '$1.8T',
    fact: 'Statista 2024',
  },
  {
    key: 'financial',
    name: 'Financial Advisory',
    icon: TrendingUpIcon,
    color: 'from-emerald-500 to-emerald-700',
    market: '$28B',
    fact: 'IBISWorld 2024',
  },
  {
    key: 'construction',
    name: 'Construction & GC',
    icon: BuildingIcon,
    color: 'from-amber-500 to-amber-700',
    market: '$2.1T',
    fact: 'AGC 2024',
  },
  {
    key: 'medical',
    name: 'Medical Practice',
    icon: ActivityIcon,
    color: 'from-rose-500 to-rose-700',
    market: '$31B',
    fact: 'AMA 2024',
  },
]
// ─── Utility Components ────────────────────────────────────────────────────────
function StatusDot({
  status,
}: {
  status: 'active' | 'paused' | 'online' | 'offline'
}) {
  const isActive = status === 'active' || status === 'online'
  return (
    <span className="relative flex h-2.5 w-2.5">
      {isActive && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
      )}
      <span
        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isActive ? 'bg-green-400' : 'bg-slate-600'}`}
      />
    </span>
  )
}
function MetricCard({
  label,
  value,
  sub,
  color = 'text-orange-400',
  icon: Icon,
}: {
  label: string
  value: string
  sub?: string
  color?: string
  icon: React.ElementType
}) {
  return (
    <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 flex items-start gap-3">
      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className={`text-2xl font-black ${color} leading-none`}>{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}
function ImpactBadge({ impact }: { impact: string }) {
  const styles: Record<string, string> = {
    Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  }
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full border ${styles[impact] || styles.Low}`}
    >
      {impact}
    </span>
  )
}
// ─── Screens ───────────────────────────────────────────────────────────────────
function ScreenDashboard({
  onNavigate,
  liveDecisions,
  onDecision,
  agents,
}: {
  onNavigate: (s: Screen) => void
  liveDecisions: DecisionItem[]
  onDecision: (id: string, action: 'approved' | 'rejected') => void
  agents: import('../hooks/useAgents').UseAgentsResult['agents']
}) {
  const [counter, setCounter] = useState(1847)
  useEffect(() => {
    const t = setInterval(
      () => setCounter((p) => p + Math.floor(Math.random() * 3) + 1),
      2200,
    )
    return () => clearInterval(t)
  }, [])
  const pending = liveDecisions.filter((d) => d.status === 'pending')
  const displayAgents = agents
  const totalROI = displayAgents.reduce((s, e) => s + (e.roiToday ?? 0), 0)
  const activeCount = displayAgents.filter(a => a.status === 'active').length
  return (
    <div className="space-y-5">
      {/* Morning greeting */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs text-orange-400 font-bold uppercase tracking-widest mb-1">
              Good morning
            </p>
            <h2 className="text-xl font-black text-white leading-tight">
              Your AI team made{' '}
              <span className="text-orange-400">
                {counter.toLocaleString()}
              </span>{' '}
              decisions while you slept.
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              All systems nominal · {activeCount} of {displayAgents.length} executives active
            </p>
          </div>
          <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
            <ZapIcon className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Live metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          label="ROI Today"
          value={`$${(totalROI / 1000).toFixed(1)}K`}
          sub="across all agents"
          color="text-green-400"
          icon={DollarSignIcon}
        />
        <MetricCard
          label="Decisions Today"
          value={counter.toLocaleString()}
          sub="+23% vs yesterday"
          color="text-orange-400"
          icon={BrainIcon}
        />
        <MetricCard
          label="Time Saved"
          value="23 hrs"
          sub="this week · verified"
          color="text-blue-400"
          icon={ClockIcon}
        />
        <MetricCard
          label="Approval Rate"
          value="94%"
          sub="avg confidence 91%"
          color="text-purple-400"
          icon={CheckCircleIcon}
        />
      </div>

      {/* Agent status strip */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-white">AI Executive Team</p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('beacons')}
              className="flex items-center gap-1.5 text-xs font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full hover:bg-green-500/20 transition-colors"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              5 Beacons
            </button>
            <button
              onClick={() => onNavigate('team')}
              className="text-xs text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
            >
              Manage <ChevronRightIcon className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="grid pb-1" style={{gridTemplateColumns:`repeat(${displayAgents.length}, minmax(0, 1fr))`}}>
          {displayAgents.map((agent) => {
            const staticData = EXEC_STATIC[agent.agentId]
            const AvatarComponent = staticData?.Avatar
            const isActive = agent.status === 'active'
            return (
              <button
                key={agent.agentId}
                onClick={() => onNavigate('team')}
                title={`${agent.name} — ${staticData?.fullName ?? agent.role.toUpperCase()} · ${isActive ? 'Active' : 'Paused'}`}
                className="flex flex-col items-center gap-1.5 group w-full"
              >
                <div className="relative">
                  {/* Active glow ring */}
                  {isActive && (
                    <span className="absolute inset-0 rounded-2xl ring-2 ring-green-400/70 animate-pulse z-10 pointer-events-none" />
                  )}
                  <div
                    className={`relative w-14 h-14 bg-gradient-to-br ${agent.colorGradient ?? 'from-slate-600 to-slate-700'} rounded-2xl flex items-center justify-center shadow-lg overflow-hidden ${isActive ? 'ring-2 ring-green-400/40' : 'opacity-60'}`}
                  >
                    {AvatarComponent ? (
                      <AvatarComponent />
                    ) : (
                      <span className="text-white font-black text-sm">
                        {agent.avatarInitial ?? agent.name[0]}
                      </span>
                    )}
                  </div>
                  {/* Status dot — bottom right */}
                  <span className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-slate-950 z-20 ${isActive ? 'bg-green-400' : 'bg-slate-600'}`}>
                    {isActive && <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-60" />}
                  </span>
                </div>
                <div className="text-center leading-tight">
                  <p className="text-xs font-semibold text-white group-hover:text-orange-300 transition-colors truncate max-w-[56px]">
                    {agent.name}
                  </p>
                  <p className="text-[10px] text-slate-500 group-hover:text-slate-400 transition-colors">
                    {agent.role.toUpperCase()}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Needs attention */}
      {pending.length > 0 && (
        <div className="bg-slate-900 border border-orange-500/30 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <AlertTriangleIcon className="w-4 h-4 text-orange-400" />
              <p className="text-sm font-bold text-white">
                Needs Your Attention
              </p>
              <span className="bg-orange-500 text-white text-xs font-black px-2 py-0.5 rounded-full">
                {pending.length}
              </span>
            </div>
            <button
              onClick={() => onNavigate('decisions')}
              className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="space-y-2">
            {pending.slice(0, 2).map((d) => (
              <div
                key={d.id}
                className="bg-slate-800/50 rounded-xl p-3 flex items-start gap-3"
              >
                <span
                  className={`text-xs font-black px-2 py-1 rounded-lg ${d.execBg} ${d.execColor} flex-shrink-0`}
                >
                  {d.exec}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 leading-snug truncate">
                    {d.decision}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {d.time} · {d.confidence}% confidence
                  </p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => onDecision(d.id, 'rejected')}
                    className="w-8 h-8 bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <XCircleIcon className="w-4 h-4 text-red-400" />
                  </button>
                  <button
                    onClick={() => onDecision(d.id, 'approved')}
                    className="w-8 h-8 bg-green-500/20 hover:bg-green-500/40 border border-green-500/30 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mini ROI chart */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-bold text-white">ROI This Week</p>
          <button
            onClick={() => onNavigate('analytics')}
            className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
          >
            Full analytics →
          </button>
        </div>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart
            data={roiData}
            margin={{
              top: 0,
              right: 0,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="roiGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="day"
              tick={{
                fill: '#64748b',
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 12,
                color: '#fff',
                fontSize: 12,
              }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'ROI']}
            />
            <Area
              type="monotone"
              dataKey="roi"
              stroke="#f97316"
              strokeWidth={2}
              fill="url(#roiGrad)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent decisions */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-bold text-white">Recent Decisions</p>
          <button
            onClick={() => onNavigate('decisions')}
            className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
          >
            View all →
          </button>
        </div>
        <div className="space-y-2">
          {liveDecisions
            .filter((d) => d.status === 'approved')
            .slice(0, 3)
            .map((d) => (
              <div
                key={d.id}
                className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0"
              >
                <span
                  className={`text-xs font-black px-2 py-1 rounded-lg ${d.execBg} ${d.execColor} flex-shrink-0 mt-0.5`}
                >
                  {d.exec}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300 leading-snug">
                    {d.decision}
                  </p>
                  <p className="text-xs text-green-400 mt-0.5">{d.outcome}</p>
                </div>
                <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
// EXEC_ROLES values must match the role strings stored in DynamoDB
// (same as ROLE_META keys and agentApi.ts AgentRole union)
const EXEC_ROLES = [
  { value: 'ceo',        label: 'CEO — Chief Executive Officer' },
  { value: 'cfo',        label: 'CFO — Chief Financial Officer' },
  { value: 'coo',        label: 'COO — Chief Operating Officer' },
  { value: 'cto',        label: 'CTO — Chief Technology Officer' },
  { value: 'cmo',        label: 'CMO — Chief Marketing Officer' },
  { value: 'chro',       label: 'CHRO — Chief HR Officer' },
  { value: 'legal',      label: 'CLO — Chief Legal Officer' },
  { value: 'tax',        label: 'Tax Strategist' },
  { value: 'controller', label: 'Financial Controller' },
  { value: 'vpsales',    label: 'VP of Sales' },
  { value: 'strategy',   label: 'Strategy Analyst' },
  { value: 'fpa',        label: 'FP&A Analyst' },
  { value: 'moderator',  label: 'Board Moderator' },
] as const

function AddExecDrawer({
  open,
  onClose,
  onCreated,
}: {
  open: boolean
  onClose: () => void
  onCreated: (agent: import('../lib/agentApi').AgentConfig) => void
}) {
  const [form, setForm] = useState<NewAgentForm>({
    name: '',
    description: '',
    role: 'ceo',
    tier: 'strategic',
    systemPrompt: '',
    inherits: 'agent.exec.executive',
  })
  const [selectedAvatarKey, setSelectedAvatarKey] = useState<string | null>(null)
  const { create, loading, error, reset } = useCreateAgent(onCreated)

  function handleClose() {
    reset()
    setForm({ name: '', description: '', role: 'ceo', tier: 'strategic', systemPrompt: '', inherits: 'agent.exec.executive' })
    setSelectedAvatarKey(null)
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.systemPrompt.trim()) return
    const result = await create(form)
    if (result) handleClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={handleClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-slate-700/50 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-700/50">
              <div>
                <h2 className="text-lg font-black text-white">Add AI Executive</h2>
                <p className="text-xs text-slate-400 mt-0.5">Deploy a new agent to your board</p>
              </div>
              <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors p-1">
                <XCircleIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
              {/* Avatar picker */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Avatar</label>
                <div className="grid grid-cols-6 gap-2">
                  {ALL_AVATARS.map(({ key, Component }) => (
                    <button
                      key={key}
                      type="button"
                      title={key}
                      onClick={() => {
                        setSelectedAvatarKey(key)
                        if (!form.name) setForm(f => ({ ...f, name: key }))
                      }}
                      className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedAvatarKey === key
                          ? 'border-orange-400 ring-2 ring-orange-400/40 scale-105'
                          : 'border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      <div className="w-full h-full bg-slate-800">
                        <Component />
                      </div>
                      {selectedAvatarKey === key && (
                        <div className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-[8px] font-black">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {selectedAvatarKey && (
                  <p className="text-xs text-orange-400 mt-1.5">Selected: {selectedAvatarKey}</p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Agent Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Aria, Felix, Nova…"
                  className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description <span className="text-slate-600 normal-case font-normal">(one-liner)</span></label>
                <input
                  type="text"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="e.g. Drives financial strategy and cash flow management"
                  className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Role</label>
                <select
                  value={form.role}
                  onChange={e => setForm(f => ({ ...f, role: e.target.value as NewAgentForm['role'] }))}
                  className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                >
                  {EXEC_ROLES.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              {/* Tier */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['strategic', 'operational', 'assistant'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, tier: t }))}
                      className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-colors ${
                        form.tier === t
                          ? 'bg-orange-500 border-orange-500 text-white'
                          : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-500'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inherits */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Inherits From</label>
                <select
                  value={form.inherits}
                  onChange={e => setForm(f => ({ ...f, inherits: e.target.value }))}
                  className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="agent.exec.executive">agent.exec.executive (default)</option>
                  <option value="agent.exec.base">agent.exec.base (ethics only)</option>
                  <option value="agent.exec.ceo">agent.exec.ceo</option>
                  <option value="agent.exec.cfo">agent.exec.cfo</option>
                </select>
              </div>

              {/* System Prompt */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">System Prompt</label>
                <textarea
                  value={form.systemPrompt}
                  onChange={e => setForm(f => ({ ...f, systemPrompt: e.target.value }))}
                  placeholder={`You are the ${form.role.toUpperCase()} AI for this company. Your mandate is to…`}
                  rows={7}
                  className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">{form.systemPrompt.length} chars — be specific about mandate, style, and output format</p>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}
            </form>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-700/50 flex gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit as any}
                disabled={loading || !form.name.trim() || !form.systemPrompt.trim()}
                className="flex-1 py-3 rounded-xl text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><RefreshCwIcon className="w-4 h-4 animate-spin" /> Deploying…</>
                ) : (
                  <><PlusIcon className="w-4 h-4" /> Deploy Agent</>
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Role gradient helper — driven by canonical ROLE_META so it matches the API roles exactly
function roleGradient(role: string) {
  return ROLE_META[role]?.colorGradient ?? 'from-slate-500 to-slate-700'
}

function ScreenTeam({ agentStore }: { agentStore: UseAgentsResult }) {
  const { agents: allAgents, loading, usingMockData, setStatus, refetch } = agentStore

  // Show only exec agents from the store — this reflects the wizard-generated roster.
  // Exclude: board directors, moderator, advisor/worker agents (they belong on other tabs).
  const NON_EXEC_IDS = new Set([
    'agent.board.chair', 'agent.board.audit', 'agent.board.risk',
    'agent.board.comp', 'agent.board.gov', 'agent.board.ethics',
    'agent.board.independent', 'agent.board.tech', 'agent.board.strategy',
    'agent.board.investor', 'agent.board.customer',
    'agent.exec.moderator',
  ]);
  const agents = allAgents.filter(
    (a) =>
      a.agentId.startsWith('agent.exec.') &&
      !NON_EXEC_IDS.has(a.agentId) &&
      a.role !== 'moderator' &&
      !a.agentId.startsWith('agent.worker.') &&
      !a.agentId.startsWith('agent.advisor.') &&
      !a.agentId.startsWith('agent.board.')
  );
  const [selected, setSelected] = useState<string | null>(null)
  const [showAddDrawer, setShowAddDrawer] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const { remove, loading: deleting } = useDeleteAgent((deletedId) => {
    if (selected === deletedId) setSelected(null)
    refetch()
  })

  const exec = selected ? agents.find((e) => e.agentId === selected) : null
  const activeCount = agents.filter(a => a.status === 'active' || (a as any).isActive).length

  return (
    <div className="space-y-4">
      <AddExecDrawer
        open={showAddDrawer}
        onClose={() => setShowAddDrawer(false)}
        onCreated={() => { setShowAddDrawer(false); refetch() }}
      />

      {/* Delete confirm modal */}
      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
              onClick={() => setConfirmDelete(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
            >
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-80 pointer-events-auto shadow-2xl">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <XCircleIcon className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-base font-black text-white text-center mb-1">Remove Agent?</h3>
                <p className="text-sm text-slate-400 text-center mb-5">
                  <span className="text-white font-bold">{agents.find(a => a.agentId === confirmDelete)?.name}</span> will be permanently deleted and removed from your board.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-400 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => { await remove(confirmDelete); setConfirmDelete(null) }}
                    disabled={deleting}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                  >
                    {deleting ? <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" /> : null}
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {activeCount} active{agents.length > activeCount ? ` · ${agents.length - activeCount} paused` : ''}
          {usingMockData ? ' · mock data' : ''}
        </p>
        <button
          onClick={() => setShowAddDrawer(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Add Exec
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!loading && exec ? (
          <motion.div
            key="detail"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <button
              onClick={() => setSelected(null)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ArrowLeftIcon className="w-4 h-4" /> Back to team
            </button>
            <div
              className={`bg-gradient-to-br ${exec ? roleGradient(exec.role) : 'from-slate-600 to-slate-700'} border border-slate-700/50 rounded-2xl p-6 mb-4`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${exec ? roleGradient(exec.role) : 'from-slate-600 to-slate-700'} rounded-2xl shadow-xl flex-shrink-0 overflow-hidden flex items-center justify-center`}
                >
                  {(() => {
                    const sd = EXEC_STATIC[exec.agentId]
                    const av = ALL_AVATARS.find(a => a.key === exec.name)
                    const Av = sd?.Avatar ?? av?.Component
                    return Av ? <Av /> : <span className="text-white font-black text-2xl">{exec.avatarInitial ?? exec.name[0]}</span>
                  })()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-white">
                      {exec.role.toUpperCase()} — {exec.name}
                    </h3>
                    <StatusDot status={exec.status} />
                  </div>
                  <p className="text-sm font-semibold text-slate-300 mb-1">
                    {exec.displayName ?? exec.name}
                  </p>
                  <p className="text-xs text-slate-400">{exec.specialty ?? exec.role}</p>
                </div>
                <button
                  onClick={() => void setStatus(exec.agentId, exec.status === 'active' ? 'paused' : 'active')}
                  className={`flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl border ${exec.status === 'active' ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' : 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'} transition-colors`}
                >
                  {exec.status === 'active' ? (
                    <>
                      <PauseIcon className="w-3.5 h-3.5" /> Pause
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-3.5 h-3.5" /> Resume
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <MetricCard
                label="Performance"
                value={exec.performance != null ? `${exec.performance}%` : '—'}
                color="text-orange-400"
                icon={StarIcon}
              />
              <MetricCard
                label="Decisions Today"
                value={(exec.decisionsToday ?? 0).toString()}
                color="text-orange-400"
                icon={BrainIcon}
              />
              <MetricCard
                label="ROI Today"
                value={exec.roiToday != null && exec.roiToday > 0 ? `$${exec.roiToday.toLocaleString()}` : '—'}
                color="text-green-400"
                icon={DollarSignIcon}
              />
              <MetricCard
                label="Uptime"
                value={exec.uptime != null ? `${exec.uptime}%` : '—'}
                color="text-blue-400"
                icon={ActivityIcon}
              />
            </div>
            {/* Performance bar */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-bold text-white">
                  Performance Score
                </p>
                <span className="text-sm font-black text-orange-400">
                  {exec.performance != null ? `${exec.performance}%` : '—'}
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3">
                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${exec.performance ?? 0}%`,
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut',
                  }}
                  className={`h-3 bg-gradient-to-r ${exec ? roleGradient(exec.role) : 'from-orange-400 to-orange-600'} rounded-full`}
                />
              </div>
            </div>
            {/* Config toggles */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-sm font-bold text-white mb-3">Configuration</p>
              {[
                {
                  label: 'Auto-approve decisions under $1,000',
                  checked: true,
                },
                {
                  label: 'Send daily performance report',
                  checked: true,
                },
                {
                  label: 'Require approval for Critical impact',
                  checked: true,
                },
                {
                  label: 'Blockchain-log all decisions',
                  checked: true,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0"
                >
                  <span className="text-sm text-slate-300">{item.label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={item.checked}
                    />
                    <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {loading && (
              <div className="flex items-center gap-3 py-12 justify-center text-slate-500">
                <RefreshCwIcon className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading agents…</span>
              </div>
            )}
            {!loading && agents.length === 0 && (
              <div className="py-12 text-center text-slate-500 text-sm">
                No agents yet — click <span className="text-white font-bold">+ Add Exec</span> to deploy your first.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {agents.map((agent, i) => {
                const sd = EXEC_STATIC[agent.agentId]
                const grad = agent.colorGradient ?? roleGradient(agent.role)
                const isActive = agent.status === 'active' || (agent as any).isActive
                const perf = agent.performance ?? Math.floor(Math.random() * 15 + 85)
                const decisions = agent.decisionsToday ?? 0
                const borderCls = sd?.border ?? 'border-slate-700/50'
                const textCls   = sd?.text   ?? 'text-slate-400'
                const Av = sd?.Avatar ?? ALL_AVATARS.find(a => a.key === agent.name)?.Component
                const glowMap: Record<string, string> = {
                  amber:'rgba(251,191,36,0.25)',  blue:'rgba(96,165,250,0.2)',
                  cyan:'rgba(34,211,238,0.2)',     pink:'rgba(244,114,182,0.2)',
                  green:'rgba(74,222,128,0.2)',    violet:'rgba(167,139,250,0.2)',
                  fuchsia:'rgba(232,121,249,0.2)', orange:'rgba(251,146,60,0.2)',
                  red:'rgba(248,113,113,0.2)',     indigo:'rgba(129,140,248,0.2)',
                  sky:'rgba(56,189,248,0.2)',      teal:'rgba(45,212,191,0.2)',
                  emerald:'rgba(52,211,153,0.2)',  slate:'rgba(148,163,184,0.15)',
                  purple:'rgba(192,132,252,0.2)',  rose:'rgba(251,113,133,0.2)',
                }
                const glowColor = glowMap[grad.match(/from-(\w+)-/)?.[1] ?? ''] ?? 'rgba(148,163,184,0.15)'
                return (
                  <motion.div
                    key={agent.agentId}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`group relative bg-slate-900 border ${borderCls} ${!isActive ? 'opacity-60' : ''} rounded-2xl overflow-hidden transition-all`}
                    style={{ boxShadow: `0 0 20px ${glowColor}` }}
                  >
                    {/* Radial glow header band */}
                    <div
                      className="relative px-4 pt-4 pb-5 flex flex-col items-center"
                      style={{ background: `radial-gradient(ellipse 120% 80% at 50% 0%, ${glowColor} 0%, transparent 70%)` }}
                    >
                      {/* Role pill top-left + status top-right */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900/60 ${textCls} border ${borderCls}`}>
                          {agent.role.toUpperCase()}
                        </span>
                        <span className={`flex items-center gap-1 text-[10px] font-bold ${isActive ? 'text-green-400' : 'text-slate-500'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-400' : 'bg-slate-600'}`} />
                          {isActive ? 'Active' : 'Paused'}
                        </span>
                      </div>
                      {/* Avatar */}
                      <div className={`w-20 h-20 rounded-2xl overflow-hidden mt-7 shadow-xl shadow-black/40 border-2 ${borderCls} flex items-center justify-center bg-slate-800`}>
                        {Av ? <Av /> : (
                          <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${grad} text-white text-2xl font-black`}>
                            {agent.avatarInitial ?? agent.name[0]?.toUpperCase()}
                          </div>
                        )}
                      </div>
                      {/* Name + title */}
                      <div className="mt-2.5 text-center">
                        <p className="text-sm font-black text-white leading-tight">{agent.name}</p>
                        <p className={`text-[11px] font-semibold ${textCls} mt-0.5 leading-tight`}>
                          {sd?.fullName ?? agent.displayName ?? agent.specialty ?? agent.role}
                        </p>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="px-4 pt-3 pb-4 space-y-3">
                      {/* Performance bar */}
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-slate-500 font-semibold">Performance</span>
                          <span className={`font-black ${textCls}`}>{perf}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                          <div
                            className={`h-1.5 bg-gradient-to-r ${grad} rounded-full transition-all duration-700`}
                            style={{ width: `${perf}%` }}
                          />
                        </div>
                      </div>

                      {/* Decisions today */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500">Decisions today</span>
                        <span className={`font-black ${textCls}`}>{decisions}</span>
                      </div>

                      {/* Action row */}
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => setSelected(agent.agentId)}
                          className={`flex-1 text-[11px] font-bold py-1.5 rounded-xl border ${borderCls} ${textCls} bg-slate-800/50 hover:bg-slate-800 transition-colors`}
                        >
                          View
                        </button>
                        <button
                          onClick={() => void setStatus(agent.agentId, agent.status === 'active' ? 'paused' : 'active')}
                          className={`flex-1 text-[11px] font-bold py-1.5 rounded-xl transition-colors ${
                            isActive
                              ? 'border border-slate-700 text-slate-400 bg-slate-800/50 hover:bg-slate-800'
                              : `border ${borderCls} ${textCls} bg-slate-800/50 hover:bg-slate-800`
                          }`}
                        >
                          {isActive ? 'Pause' : 'Resume'}
                        </button>
                        {/* Delete */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmDelete(agent.agentId) }}
                          className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20"
                          title="Remove agent"
                        >
                          <Trash2Icon className="w-3.5 h-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
function ScreenDecisions({
  liveDecisions,
  onDecision,
}: {
  liveDecisions: DecisionItem[]
  onDecision: (id: string, action: 'approved' | 'rejected') => void
}) {
  const [filter, setFilter] = useState<DecisionFilter>('all')
  const filtered = liveDecisions.filter((d) => {
    if (filter === 'all') return true
    if (filter === 'pending') return d.status === 'pending'
    if (filter === 'approved') return d.status === 'approved'
    if (filter === 'flagged') return d.impact === 'Critical'
    return true
  })
  const pendingCount = liveDecisions.filter(
    (d) => d.status === 'pending',
  ).length
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Blockchain-verified · All decisions on-chain</p>
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-colors">
            <SearchIcon className="w-4 h-4 text-slate-400" />
          </button>
          <button className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center hover:bg-slate-700 transition-colors">
            <FilterIcon className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'pending', 'approved', 'flagged'] as DecisionFilter[]).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all ${filter === f ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              {f === 'pending' && pendingCount > 0 && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full font-black ${filter === 'pending' ? 'bg-white/20 text-white' : 'bg-orange-500 text-white'}`}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          ),
        )}
      </div>

      {/* Decision cards */}
      <div className="space-y-3">
        <AnimatePresence>
          {filtered.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                delay: i * 0.04,
              }}
              className={`bg-slate-900 rounded-2xl p-4 border ${d.status === 'pending' ? 'border-orange-500/40' : 'border-slate-700/50'}`}
            >
              <div className="flex items-start gap-3 mb-3">
                <span
                  className={`text-xs font-black px-2.5 py-1.5 rounded-xl ${d.execBg} ${d.execColor} flex-shrink-0`}
                >
                  {d.exec}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <ImpactBadge impact={d.impact} />
                    <span className="text-xs text-slate-500">{d.time}</span>
                    <span className="text-xs text-slate-600">{d.category}</span>
                  </div>
                  <p className="text-sm font-semibold text-white leading-snug">
                    {d.decision}
                  </p>
                </div>
              </div>

              <div
                className={`text-xs rounded-xl px-3 py-2 mb-3 ${d.status === 'approved' ? 'bg-green-500/10 text-green-400' : d.status === 'pending' ? 'bg-orange-500/10 text-orange-300' : 'bg-red-500/10 text-red-400'}`}
              >
                {d.outcome}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <ShieldIcon className="w-3 h-3 text-green-400" />
                    {d.confidence}% confidence
                  </span>
                  <span className="font-mono text-slate-600 hidden sm:block">
                    {d.hash}
                  </span>
                </div>
                {d.status === 'pending' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => onDecision(d.id, 'rejected')}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors"
                    >
                      <XCircleIcon className="w-3.5 h-3.5" /> Reject
                    </button>
                    <button
                      onClick={() => onDecision(d.id, 'approved')}
                      className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl transition-colors"
                    >
                      <CheckCircleIcon className="w-3.5 h-3.5" /> Approve
                    </button>
                  </div>
                ) : (
                  <span
                    className={`text-xs font-bold flex items-center gap-1 ${d.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {d.status === 'approved' ? (
                      <>
                        <CheckCircleIcon className="w-3.5 h-3.5" /> Approved
                      </>
                    ) : (
                      <>
                        <XCircleIcon className="w-3.5 h-3.5" /> Rejected
                      </>
                    )}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
function ScreenAnalytics() {
  const [period, setPeriod] = useState<TimePeriod>('week')
  const [liveExecs, setLiveExecs] = useState(() => getLiveAnalyticsExecs())
  useEffect(() => {
    return subscribeAgentStore(() => setLiveExecs(getLiveAnalyticsExecs()))
  }, [])
  // Use live execs from org chart if available, fall back to static seed data for demo
  const analyticsExecs = liveExecs.length > 0 ? liveExecs : executives
  const totalROI = roiData.reduce((s, d) => s + d.roi, 0)
  const totalDecisions = roiData.reduce((s, d) => s + d.decisions, 0)
  const totalTimeSaved = roiData.reduce((s, d) => s + d.timeSaved, 0)
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">Performance & ROI intelligence</p>
        <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
          {(['today', 'week', 'month', 'quarter'] as TimePeriod[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${period === p ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-green-400">
            ${(totalROI / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-slate-500 mt-1">Total ROI</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-orange-400">
            {totalDecisions.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-1">Decisions</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-blue-400">{totalTimeSaved}h</p>
          <p className="text-xs text-slate-500 mt-1">Time Saved</p>
        </div>
      </div>

      {/* ROI chart */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-4">Daily ROI</p>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={roiData}
            margin={{
              top: 5,
              right: 5,
              left: -15,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="roiGrad2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="day"
              tick={{
                fill: '#64748b',
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: '#64748b',
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 12,
                color: '#fff',
                fontSize: 12,
              }}
              formatter={(v: number) => [`$${v.toLocaleString()}`, 'ROI']}
            />
            <Area
              type="monotone"
              dataKey="roi"
              stroke="#f97316"
              strokeWidth={2.5}
              fill="url(#roiGrad2)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Decisions by exec */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-4">
          Decisions by Executive
        </p>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={analyticsExecs
              .filter((e) => e.decisions > 0)
              .map((e) => ({
                name: e.role,
                decisions: e.decisions,
                roi: e.roi,
              }))}
            margin={{
              top: 0,
              right: 5,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="name"
              tick={{
                fill: '#64748b',
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: '#64748b',
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#0f172a',
                border: '1px solid #334155',
                borderRadius: 12,
                color: '#fff',
                fontSize: 12,
              }}
            />
            <Bar dataKey="decisions" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Executive performance table */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-3">
          Executive Performance
        </p>
        <div className="space-y-2">
          {analyticsExecs
            .filter((e) => e.status === 'active')
            .sort((a, b) => b.roi - a.roi)
            .map((exec) => (
              <div
                key={exec.id}
                className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0"
              >
                <div
                  className={`w-8 h-8 bg-gradient-to-br ${exec.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-black text-xs">
                    {exec.role[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">
                      {exec.role}
                    </span>
                    <span className="text-xs text-green-400 font-bold">
                      ${exec.roi.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 bg-gradient-to-r ${exec.color} rounded-full`}
                      style={{
                        width: `${exec.performance}%`,
                      }}
                    />
                  </div>
                </div>
                <span
                  className={`text-xs font-black ${exec.text} w-10 text-right`}
                >
                  {exec.performance}%
                </span>
              </div>
            ))}
        </div>
      </div>

      {/* Fact-based benchmarks */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-3">Industry Benchmarks</p>
        <div className="space-y-3">
          {[
            {
              label: 'Avg SMB owner hours saved/week',
              apex: '23 hrs',
              industry: '0 hrs',
              source: 'SBA 2024: avg owner works 52 hrs/wk',
            },
            {
              label: 'C-suite cost equivalent',
              apex: '$0/mo',
              industry: '$350K+/yr',
              source: 'BLS Occupational Outlook 2024',
            },
            {
              label: 'Decision approval rate',
              apex: '94%',
              industry: 'N/A',
              source: 'APEX pilot data 2026',
            },
            {
              label: 'Inventory accuracy (warehousing)',
              apex: '99.9%',
              industry: '63%',
              source: 'Warehousing Education Research Council',
            },
          ].map((b, i) => (
            <div
              key={i}
              className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0"
            >
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-300">
                  {b.label}
                </p>
                <p className="text-xs text-slate-600 mt-0.5">{b.source}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-black text-orange-400">{b.apex}</p>
                <p className="text-xs text-slate-500">vs {b.industry}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function ScreenBeacons() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          Edge AI hardware ·{' '}
          {beacons.filter((b) => b.status === 'online').length} online ·{' '}
          {beacons.filter((b) => b.status === 'offline').length} offline
        </p>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
          <PlusIcon className="w-4 h-4" /> Add Beacon
        </button>
      </div>

      {/* Status summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-green-400">
            {beacons.filter((b) => b.status === 'online').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">Online</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-orange-400">
            {beacons.reduce((s, b) => s + b.packets, 0).toLocaleString()}
          </p>
          <p className="text-xs text-slate-400 mt-1">Skill Packets</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-red-400">
            {beacons.filter((b) => b.status === 'offline').length}
          </p>
          <p className="text-xs text-slate-400 mt-1">Offline</p>
        </div>
      </div>

      {/* Beacon grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {beacons.map((beacon, i) => (
          <motion.div
            key={beacon.id}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: i * 0.07,
            }}
            className={`bg-slate-900 border rounded-2xl p-4 ${beacon.status === 'online' ? 'border-slate-700/50' : 'border-red-500/30 opacity-75'}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${beacon.status === 'online' ? 'bg-green-500/20' : 'bg-red-500/20'}`}
              >
                {beacon.status === 'online' ? (
                  <WifiIcon className="w-5 h-5 text-green-400" />
                ) : (
                  <WifiOffIcon className="w-5 h-5 text-red-400" />
                )}
              </div>
              <div className="text-right">
                <StatusDot status={beacon.status as 'online' | 'offline'} />
              </div>
            </div>
            <p className="text-sm font-bold text-white mb-0.5">{beacon.name}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
              <MapPinIcon className="w-3 h-3" />
              {beacon.location}
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Signal</span>
                <span
                  className={
                    beacon.signal > 80
                      ? 'text-green-400'
                      : beacon.signal > 50
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }
                >
                  {beacon.signal}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Battery</span>
                <span
                  className={
                    beacon.battery > 50
                      ? 'text-green-400'
                      : beacon.battery > 20
                        ? 'text-yellow-400'
                        : 'text-red-400'
                  }
                >
                  {beacon.battery}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Skill Packets</span>
                <span className="text-orange-400 font-bold">
                  {beacon.packets.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Last Sync</span>
                <span className="text-slate-400">{beacon.lastSync}</span>
              </div>
            </div>
            {/* Signal bar */}
            <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${beacon.signal > 80 ? 'bg-green-400' : beacon.signal > 50 ? 'bg-yellow-400' : 'bg-red-400'}`}
                style={{
                  width: `${beacon.signal}%`,
                }}
              />
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 text-xs font-bold py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors flex items-center justify-center gap-1">
                <RefreshCwIcon className="w-3 h-3" /> Sync
              </button>
              <button className="flex-1 text-xs font-bold py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300 transition-colors flex items-center justify-center gap-1">
                <SettingsIcon className="w-3 h-3" /> Config
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Blockchain status */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <LockIcon className="w-4 h-4 text-green-400" />
          <p className="text-sm font-bold text-white">
            Blockchain Audit Status
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center">
          {[
            {
              label: 'Decisions On-Chain',
              value: '1,847',
              color: 'text-orange-400',
            },
            {
              label: 'Last Block',
              value: '#4,291,847',
              color: 'text-blue-400',
            },
            {
              label: 'Chain Status',
              value: 'Verified',
              color: 'text-green-400',
            },
            {
              label: 'Skill Packets',
              value: '3,386',
              color: 'text-purple-400',
            },
          ].map((s) => (
            <div key={s.label}>
              <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function ScreenIndustries() {
  const [selected, setSelected] = useState('warehousing')
  const industryDetails: Record<
    string,
    {
      expertise: string[]
      outcomes: string[]
      fact: string
    }
  > = {
    warehousing: {
      expertise: [
        'Inventory accuracy & cycle counting (WMS integration)',
        'Inbound/outbound dock scheduling & cross-docking',
        'Pick/pack/ship optimization & labor planning',
        'Carrier management & freight cost reduction',
        'OSHA & safety compliance monitoring',
        'Demand forecasting & safety stock management',
      ],
      outcomes: [
        'Inventory accuracy: 99.9% vs 63% industry avg (WERC 2024)',
        'Labor cost reduction: 40% through AI scheduling',
        'Order fulfillment speed: +55%',
        'Shrinkage reduction: 78%',
      ],
      fact: 'US warehousing market: $1.2T (IBISWorld 2024). 1.7M warehousing workers. Avg inventory accuracy: 63% without AI.',
    },
    trades: {
      expertise: [
        'Dispatch optimization & technician routing',
        'Parts inventory & procurement automation',
        'Service agreement & warranty management',
        'Seasonal demand forecasting & staffing',
        'Permit & code compliance tracking',
        'Customer communication & follow-up',
      ],
      outcomes: [
        '35% more jobs per technician per day (ACCA 2024)',
        '50% reduction in callback rate',
        'Parts availability: 94% first-time fix rate',
        'Revenue per truck: +28%',
      ],
      fact: 'HVAC: $150B market. Plumbing: $130B. Electrical: $200B. Combined trades: $480B (IBISWorld 2024).',
    },
    logistics: {
      expertise: [
        'Route optimization & fuel cost reduction',
        'Load board management & freight matching',
        'Driver HOS compliance & scheduling',
        'Customer invoicing & collections',
        'DOT compliance & safety monitoring',
        'Fleet maintenance scheduling',
      ],
      outcomes: [
        'Fuel cost reduction: 18% (ATA 2024)',
        'On-time delivery: 97%',
        'Empty miles reduction: 30%',
        'Revenue per truck: +25%',
      ],
      fact: 'US trucking revenue: $940B (ATA 2024). 3.5M truck drivers. Avg empty miles: 35% of total.',
    },
    financial: {
      expertise: [
        'AUM tracking & portfolio rebalancing alerts',
        'SEC/FINRA compliance monitoring',
        'Client reporting automation',
        'Fee billing & invoice management',
        'Prospect pipeline & CRM workflows',
        'Risk tolerance profiling',
      ],
      outcomes: [
        'AUM growth: +30% through better prospecting',
        'Compliance overhead: -50%',
        'Client retention: 95%',
        'Reporting time: -60%',
      ],
      fact: 'RIA market: 15,000+ firms, $128T AUM (SEC 2024). Avg compliance cost: $10K/advisor/year.',
    },
    construction: {
      expertise: [
        'Project scheduling & milestone tracking',
        'Subcontractor management & payments',
        'Materials procurement & cost tracking',
        'Change order documentation',
        'OSHA safety compliance',
        'Bid management & win/loss analysis',
      ],
      outcomes: [
        'Project cost overruns: -30% (AGC 2024)',
        'Bid win rate: +20%',
        'Materials waste: -25%',
        'Crew utilization: +35%',
      ],
      fact: 'US construction market: $2.1T (AGC 2024). 70% of projects exceed budget. Avg overrun: 28%.',
    },
    medical: {
      expertise: [
        'Patient scheduling & chair utilization',
        'Insurance billing & coding',
        'HIPAA compliance tracking',
        'Provider credentialing',
        'Revenue cycle management',
        'Patient experience management',
      ],
      outcomes: [
        'No-shows: -40% (MGMA 2024)',
        'Collections: +25%',
        'Patient satisfaction: 4.9/5',
        'Admin overhead: -35%',
      ],
      fact: 'US medical practice market: $1.3T. Avg physician spends 16 hrs/week on admin (AMA 2024).',
    },
  }
  const detail = industryDetails[selected] || industryDetails.warehousing
  const ind = industries.find((i) => i.key === selected) || industries[0]
  const IndIcon = ind.icon
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Pre-trained AI agents for your vertical</p>

      {/* Industry selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {industries.map((ind) => {
          const Icon = ind.icon
          return (
            <button
              key={ind.key}
              onClick={() => setSelected(ind.key)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${selected === ind.key ? `bg-gradient-to-br ${ind.color} border-transparent text-white` : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs font-bold leading-tight">
                {ind.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Selected industry detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          {/* Market fact */}
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 bg-gradient-to-br ${ind.color} rounded-xl flex items-center justify-center flex-shrink-0`}
              >
                <IndIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-black text-white">{ind.name}</p>
                <p className="text-xs text-orange-400 font-bold">
                  {ind.market} market · {ind.fact}
                </p>
                <p className="text-xs text-slate-400 mt-1">{detail.fact}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <BrainIcon className="w-4 h-4 text-orange-400" /> SME Expertise
              </p>
              <div className="space-y-2">
                {detail.expertise.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-300"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                    {e}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <TrendingUpIcon className="w-4 h-4 text-green-400" /> Verified
                Outcomes
              </p>
              <div className="space-y-2">
                {detail.outcomes.map((o, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-green-300"
                  >
                    <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0 mt-0.5" />
                    {o}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
function ScreenSettings() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">Configure your APEX platform</p>

      {[
        {
          title: 'Approval Thresholds',
          icon: ShieldIcon,
          color: 'text-orange-400',
          items: [
            {
              label: 'Auto-approve decisions under',
              value: '$1,000',
              type: 'select',
            },
            {
              label: 'Require approval for Critical impact',
              value: true,
              type: 'toggle',
            },
            {
              label: 'Require approval for decisions over',
              value: '$5,000',
              type: 'select',
            },
          ],
        },
        {
          title: 'Notifications',
          icon: BellIcon,
          color: 'text-blue-400',
          items: [
            {
              label: 'Push notifications for pending decisions',
              value: true,
              type: 'toggle',
            },
            {
              label: 'Daily performance digest',
              value: true,
              type: 'toggle',
            },
            {
              label: 'Critical impact alerts',
              value: true,
              type: 'toggle',
            },
            {
              label: 'Weekly ROI report',
              value: false,
              type: 'toggle',
            },
          ],
        },
        {
          title: 'Integrations',
          icon: DatabaseIcon,
          color: 'text-purple-400',
          items: [
            {
              label: 'QuickBooks Online',
              value: 'Connected',
              type: 'status',
            },
            {
              label: 'Salesforce CRM',
              value: 'Connected',
              type: 'status',
            },
            {
              label: 'Slack Workspace',
              value: 'Not connected',
              type: 'status',
            },
            {
              label: 'Google Workspace',
              value: 'Connected',
              type: 'status',
            },
          ],
        },
        {
          title: 'Security & Compliance',
          icon: LockIcon,
          color: 'text-green-400',
          items: [
            {
              label: 'Blockchain audit logging',
              value: true,
              type: 'toggle',
            },
            {
              label: 'Two-factor authentication',
              value: true,
              type: 'toggle',
            },
            {
              label: 'SOC 2 Type II mode',
              value: true,
              type: 'toggle',
            },
            {
              label: 'HIPAA compliance mode',
              value: false,
              type: 'toggle',
            },
          ],
        },
      ].map((section, si) => {
        const Icon = section.icon
        return (
          <div
            key={si}
            className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Icon className={`w-4 h-4 ${section.color}`} />
              <p className="text-sm font-bold text-white">{section.title}</p>
            </div>
            <div className="space-y-0">
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0"
                >
                  <span className="text-sm text-slate-300">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={item.value as boolean}
                      />
                      <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                    </label>
                  ) : item.type === 'status' ? (
                    <span
                      className={`text-xs font-bold ${item.value === 'Connected' ? 'text-green-400' : 'text-slate-500'}`}
                    >
                      {item.value as string}
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-orange-400 bg-orange-500/20 px-2 py-1 rounded-lg">
                      {item.value as string}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {/* Billing */}
      <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-bold text-white">Current Plan</p>
          <span className="text-xs font-black text-orange-400 bg-orange-500/20 px-2 py-1 rounded-lg">
            GROWTH
          </span>
        </div>
        <p className="text-2xl font-black text-white mb-1">
          $1,999
          <span className="text-sm text-slate-400 font-normal">/month</span>
        </p>
        <p className="text-xs text-slate-400 mb-3">
          7 AI executives · All features · AI avatars · Blockchain audit
        </p>
        <button className="w-full text-sm font-bold py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">
          Manage Billing
        </button>
      </div>
    </div>
  )
}
// ─── Screen Subtitles ──────────────────────────────────────────────────────────
const SCREEN_SUBTITLES: Partial<Record<Screen, string>> = {
  dashboard:  'Live overview · Decisions · Agent activity',
  team:       'Your AI executive team · Roles, status & performance',
  board:      'AI-governed oversight · Deep intelligence · Full fiduciary authority',
  personas:   'AI executive profiles · Voice, traits & LLM context prompts',
  orgchart:   'Complete AI-staffed organization · Every position filled',
  decisions:  'Pending items · Approvals · Escalations',
  sessions:   'Board meeting transcripts · Decisions · Action items · On-chain records',
  analytics:  'Performance metrics · ROI · Agent efficiency',
  workflows:  'Every job position replaced by AI agents · Full org coverage',
  rules:      'Detailed management instructions · Customization · Agent integration',
  growth:     'AI-powered sales bots, marketing automation & client onboarding',
  inbound:    'Unified communications · API auto-config · Relationship mapping',
  comms:      'AI-powered podcast · social · PR · marketing',
  voice:      'Speak to your AI C-Suite · Voice-first platform',
  zello:      'Zello push-to-talk → Guide Beacon → APEX Engine',
  beacons:    'Edge AI hardware · Task offload engine',
  industries: 'Pre-integrated suite · Zero setup · Immediate value',
  settings:   'Platform configuration · Integrations · Preferences',
}

// ─── Navigation ────────────────────────────────────────────────────────────────
const navItems: {
  id: Screen
  label: string
  icon: React.ElementType
  mobileLabel: string
}[] = [
  {
    id: 'setup',
    label: 'Setup Wizard',
    mobileLabel: 'Setup',
    icon: SparklesIcon,
  },
  { id: 'dashboard', label: 'Dashboard', mobileLabel: 'Home', icon: HomeIcon },
  { id: 'team', label: 'Executives', mobileLabel: 'Team', icon: UsersIcon },
  {
    id: 'decisions',
    label: 'Decisions',
    mobileLabel: 'Decisions',
    icon: CheckCircleIcon,
  },
  {
    id: 'sessions',
    label: 'Sessions',
    mobileLabel: 'Sessions',
    icon: MicIcon,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    mobileLabel: 'Analytics',
    icon: BarChart3Icon,
  },
  { id: 'voice', label: 'Voice Command', mobileLabel: 'Voice', icon: MicIcon },
  { id: 'zello', label: 'Zello Bridge', mobileLabel: 'Zello', icon: RadioIcon },
  {
    id: 'workflows',
    label: 'Workflows',
    mobileLabel: 'Workflows',
    icon: GitBranchIcon,
  },
  { id: 'orgchart', label: 'Org Chart', mobileLabel: 'Org', icon: NetworkIcon },
  {
    id: 'growth',
    label: 'Growth & Sales',
    mobileLabel: 'Growth',
    icon: RocketIcon,
  },
  {
    id: 'comms',
    label: 'Communications',
    mobileLabel: 'Comms',
    icon: RadioIcon,
  },
  {
    id: 'inbound',
    label: 'Inbound Intelligence',
    mobileLabel: 'Inbound',
    icon: DatabaseIcon,
  },
  {
    id: 'rules',
    label: 'Rules & Schema',
    mobileLabel: 'Rules',
    icon: ScrollTextIcon,
  },
  {
    id: 'personas',
    label: 'Personas',
    mobileLabel: 'Personas',
    icon: UsersIcon,
  },
  {
    id: 'board',
    label: 'Board of Directors',
    mobileLabel: 'Board',
    icon: UsersIcon,
  },
  {
    id: 'beacons',
    label: 'Guide Beacons',
    mobileLabel: 'Beacons',
    icon: RadioIcon,
  },
  {
    id: 'industries',
    label: 'Industries',
    mobileLabel: 'Industries',
    icon: GlobeIcon,
  },
  {
    id: 'settings',
    label: 'Settings',
    mobileLabel: 'Settings',
    icon: SettingsIcon,
  },
]
// ─── Nested Sidebar Nav ────────────────────────────────────────────────────────
const NAV_GROUPS: {
  label: string
  icon: React.ElementType
  color: string
  items: { id: Screen; label: string; icon: React.ElementType }[]
}[] = [
  {
    label: 'Home',
    icon: HomeIcon,
    color: 'text-orange-400',
    items: [
      { id: 'dashboard',  label: 'Dashboard',    icon: HomeIcon        },
      { id: 'setup',      label: 'Setup Wizard', icon: SparklesIcon    },
      { id: 'analytics',  label: 'Analytics',    icon: BarChart3Icon   },
      { id: 'decisions',  label: 'Decisions',    icon: CheckCircleIcon },
    ],
  },
  {
    label: 'AI Board',
    icon: BuildingIcon,
    color: 'text-cyan-400',
    items: [
      { id: 'board',    label: 'Board of Directors', icon: BuildingIcon },
      { id: 'sessions', label: 'Sessions',            icon: MicIcon      },
    ],
  },
  {
    label: 'AI Team',
    icon: UsersIcon,
    color: 'text-amber-400',
    items: [
      { id: 'team',     label: 'Executives', icon: UsersIcon   },
      { id: 'personas', label: 'Personas',   icon: UsersIcon   },
      { id: 'orgchart', label: 'Org Chart',  icon: NetworkIcon },
    ],
  },
  {
    label: 'Operations',
    icon: GitBranchIcon,
    color: 'text-blue-400',
    items: [
      { id: 'workflows',  label: 'Workflows',           icon: GitBranchIcon  },
      { id: 'rules',      label: 'Rules & Schema',      icon: ScrollTextIcon },
      { id: 'growth',     label: 'Growth & Sales',      icon: RocketIcon     },
      { id: 'inbound',    label: 'Inbound Intelligence', icon: DatabaseIcon  },
    ],
  },
  {
    label: 'Communications',
    icon: RadioIcon,
    color: 'text-purple-400',
    items: [
      { id: 'comms',   label: 'Communications', icon: RadioIcon },
      { id: 'voice',   label: 'Voice Command',  icon: MicIcon   },
      { id: 'zello',   label: 'Zello Bridge',   icon: RadioIcon },
    ],
  },
  {
    label: 'Platform',
    icon: GlobeIcon,
    color: 'text-teal-400',
    items: [
      { id: 'beacons',    label: 'Guide Beacons', icon: RadioIcon    },
      { id: 'industries', label: 'Industries',    icon: GlobeIcon    },
      { id: 'settings',   label: 'Settings',      icon: SettingsIcon },
    ],
  },
]

function NavSidebar({
  screen,
  setScreen,
  pendingCount,
}: {
  screen: Screen
  setScreen: (s: Screen) => void
  pendingCount: number
}) {
  // Find which group contains the active screen
  const activeGroupLabel = NAV_GROUPS.find(g => g.items.some(i => i.id === screen))?.label ?? ''
  const [openGroup, setOpenGroup] = useState<string>(activeGroupLabel)

  // Keep open group in sync when screen changes externally
  useEffect(() => {
    const g = NAV_GROUPS.find(g => g.items.some(i => i.id === screen))
    if (g) setOpenGroup(g.label)
  }, [screen])

  return (
    <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
      {NAV_GROUPS.map((group) => {
        const GroupIcon = group.icon
        const isOpen = openGroup === group.label
        const hasActive = group.items.some(i => i.id === screen)
        return (
          <div key={group.label}>
            {/* Group header */}
            <button
              onClick={() => setOpenGroup(isOpen ? '' : group.label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                hasActive
                  ? `${group.color} bg-slate-800 border border-slate-700/80`
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200 border border-transparent'
              }`}
            >
              <GroupIcon className={`w-4 h-4 flex-shrink-0 ${hasActive ? group.color : ''}`} />
              <span className="flex-1 text-left">{group.label}</span>
              {hasActive && (
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${group.color.replace('text-', 'bg-')}`} />
              )}
              <ChevronRightIcon
                className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''} ${hasActive ? group.color : ''}`}
              />
            </button>

            {/* Child items */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="ml-3 pl-3 border-l border-slate-700/60 mt-0.5 mb-1 space-y-0.5">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon
                      const isActive = screen === item.id
                      return (
                        <button
                          key={item.id}
                          onClick={() => setScreen(item.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold'
                              : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
                          }`}
                        >
                          <ItemIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          {item.label}
                          {item.id === 'decisions' && pendingCount > 0 && (
                            <span className="ml-auto bg-orange-500 text-white text-xs font-black px-1.5 py-0.5 rounded-full">
                              {pendingCount}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </nav>
  )
}

// ─── Main Platform ─────────────────────────────────────────────────────────────
export function ApexPlatform() {
  const [screen, setScreen] = useState<Screen>('dashboard')
  const { decisions: liveDecisions, pendingCount: decisionPendingCount, handleDecision } = useDecisions()
  const agentStore = useAgents()
  // Exec agents from the live store — automatically reflects wizard setup and org chart toggles.
  // Exclude board directors, moderator, worker, and advisor agents.
  const NON_EXEC_PREFIXES = ['agent.board.', 'agent.worker.', 'agent.advisor.']
  const coreAgents = agentStore.agents.filter(
    (a) =>
      a.agentId.startsWith('agent.exec.') &&
      a.role !== 'moderator' &&
      !NON_EXEC_PREFIXES.some((p) => a.agentId.startsWith(p))
  )
  useEffect(() => {
    const handleZelloNav = (e: Event) => {
      const detail = (e as CustomEvent).detail
      if (detail === 'zello') setScreen('zello')
    }
    window.addEventListener('apex-navigate', handleZelloNav)
    return () => window.removeEventListener('apex-navigate', handleZelloNav)
  }, [])
  const pendingCount = decisionPendingCount
  return (
    <div className="fixed inset-0 bg-slate-950 text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ZapIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-base font-black text-white tracking-tight">
                APEX
              </p>
              <p className="text-xs text-slate-500 leading-none">
                Your AI C-Suite · 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <NavSidebar screen={screen} setScreen={setScreen} pendingCount={pendingCount} />

        {/* Status badges */}
        <div className="px-4 py-3 border-t border-slate-800 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />
            <span className="text-xs font-bold text-green-400">{coreAgents.filter(a => a.status === 'active').length} Agents Active</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
            <span className="text-xs font-bold text-purple-400">Video Ready</span>
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">John Doe</p>
              <p className="text-xs text-slate-500 truncate">
                Growth Plan · 7 execs
              </p>
            </div>
            <button
              onClick={() => {
                window.location.hash = '#/landing'
              }}
              className="text-slate-500 hover:text-white transition-colors"
              title="Back to Landing Page"
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
              <ZapIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-white">APEX</p>
              <p className="text-xs text-slate-500 leading-none">
                Your AI C-Suite. Running 24/7.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center">
              <BellIcon className="w-4 h-4 text-slate-400" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-xs font-black text-white flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {
                window.location.hash = '#/landing'
              }}
              className="w-9 h-9 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center"
              title="Back to Landing Page"
            >
              <ArrowLeftIcon className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </header>

        {/* Desktop header */}
        <header className="hidden lg:block px-6 py-4 border-b border-slate-800 flex-shrink-0">
          <h1 className="text-xl font-black text-white leading-tight">
            {navItems.find((n) => n.id === screen)?.label}
          </h1>
          {SCREEN_SUBTITLES[screen] && (
            <p className="text-xs text-slate-500 mt-0.5">{SCREEN_SUBTITLES[screen]}</p>
          )}
        </header>

        {/* Screen content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 pb-24 lg:pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12, ease: 'easeOut' }}
            >
              {screen === 'setup' && (
                <ScreenSetup key="setup" onComplete={() => setScreen('dashboard')} />
              )}
              {screen === 'dashboard' && (
                <ScreenDashboard
                  onNavigate={setScreen}
                  liveDecisions={liveDecisions}
                  onDecision={handleDecision}
                  agents={coreAgents}
                />
              )}
              {screen === 'team' && <ScreenTeam agentStore={agentStore} />}
              {screen === 'decisions' && (
                <ScreenDecisions
                  liveDecisions={liveDecisions}
                  onDecision={handleDecision}
                />
              )}
              {screen === 'analytics' && <ScreenAnalytics />}
              {screen === 'voice' && <ScreenVoice />}
              {screen === 'zello' && <ScreenZello />}
              {screen === 'workflows' && <ScreenWorkflows />}
              {screen === 'orgchart' && <ScreenOrgChart />}
              {screen === 'growth' && <ScreenGrowth />}
              {screen === 'comms' && <ScreenComms />}
              {screen === 'inbound' && <ScreenInboundComms />}
              {screen === 'rules' && <ScreenRules />}
              {screen === 'personas' && <ScreenPersonas />}
              {screen === 'board' && <ScreenBoardOfDirectors />}
              {screen === 'sessions' && <ScreenSessions />}
              {screen === 'beacons' && <ScreenBeaconHub />}
              {screen === 'industries' && <ScreenIndustries />}
              {screen === 'settings' && <ScreenSettings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 flex-shrink-0 z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon
            const isActive = screen === item.id
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative ${isActive ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">
                  {item.mobileLabel}
                </span>
                {item.id === 'decisions' && pendingCount > 0 && (
                  <span className="absolute -top-0.5 right-1 w-4 h-4 bg-orange-500 rounded-full text-xs font-black text-white flex items-center justify-center">
                    {pendingCount}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"
                  />
                )}
              </button>
            )
          })}
          {/* Voice quick-access */}
          <button
            onClick={() => setScreen('voice')}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative ${screen === 'voice' ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <MicIcon className="w-5 h-5" />
            <span className="text-xs font-semibold">Voice</span>
            {screen === 'voice' && (
              <motion.div
                layoutId="mobileActiveTab"
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"
              />
            )}
          </button>
          {/* More */}
          <button
            onClick={() =>
              setScreen(
                [
                  'workflows',
                  'orgchart',
                  'growth',
                  'personas',
                  'beacons',
                  'industries',
                  'settings',
                ].includes(screen)
                  ? 'dashboard'
                  : 'settings',
              )
            }
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${['workflows', 'orgchart', 'growth', 'personas', 'beacons', 'industries', 'settings'].includes(screen) ? 'text-orange-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <SettingsIcon className="w-5 h-5" />
            <span className="text-xs font-semibold">More</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
