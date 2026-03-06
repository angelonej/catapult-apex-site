import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  PlayIcon,
  PauseIcon,
  DownloadIcon,
  SearchIcon,
  UsersIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChevronRightIcon,
  CalendarIcon,
  MicIcon,
  FileTextIcon,
  ShieldIcon,
  ZapIcon,
} from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────────
type SessionStatus = 'completed' | 'in-progress' | 'scheduled'
type SessionTab = 'all' | 'completed' | 'in-progress' | 'scheduled'

interface SessionMessage {
  speaker: string
  role: string
  color: string
  time: string
  text: string
  type: 'statement' | 'question' | 'decision' | 'action'
}

interface BoardSession {
  id: string
  title: string
  date: string
  time: string
  duration: string
  status: SessionStatus
  attendees: string[]
  decisionsCount: number
  actionItems: number
  hash: string
  summary: string
  outcome: string
  messages: SessionMessage[]
}

// ─── Mock Data ─────────────────────────────────────────────────────────────────
const sessions: BoardSession[] = [
  {
    id: 'ses-001',
    title: 'Q1 Revenue & Growth Strategy',
    date: 'Mar 5, 2026',
    time: '9:00 AM',
    duration: '47 min',
    status: 'completed',
    attendees: ['CEO', 'CFO', 'CMO', 'VP Sales'],
    decisionsCount: 6,
    actionItems: 11,
    hash: '0x4f3a…c8e1',
    summary: 'Reviewed Q1 pipeline performance, approved $40K marketing budget expansion, and set aggressive outbound targets for Q2.',
    outcome: 'All 6 decisions approved · $40K budget unlocked · Q2 target: $284K pipeline',
    messages: [
      { speaker: 'Aria', role: 'CEO', color: 'from-amber-400 to-orange-500', time: '9:01', text: 'Opening Q1 review. Pipeline is at $218K — 23% below target. CMO, walk us through the gap.', type: 'statement' },
      { speaker: 'Maya', role: 'CMO', color: 'from-pink-400 to-rose-500', time: '9:03', text: 'Lead gen held but conversion dropped 8pts. Root cause: outbound sequencing was paused during system migration. Recommending $40K in targeted paid outreach to recover.', type: 'statement' },
      { speaker: 'Felix', role: 'CFO', color: 'from-blue-400 to-cyan-500', time: '9:06', text: 'Cash position supports the ask. ROI on last paid campaign was 4.2x. I\'m approving the $40K allocation contingent on weekly reporting.', type: 'decision' },
      { speaker: 'Rex', role: 'VP Sales', color: 'from-green-400 to-emerald-500', time: '9:09', text: 'With the budget unlocked I can commit to $284K pipeline by end of Q2. Outbound sequences go live Monday.', type: 'action' },
      { speaker: 'Aria', role: 'CEO', color: 'from-amber-400 to-orange-500', time: '9:44', text: 'Decisions logged and on-chain. Next session: Apr 1. Adjourned.', type: 'statement' },
    ],
  },
  {
    id: 'ses-002',
    title: 'Hiring Freeze & Operational Efficiency',
    date: 'Mar 3, 2026',
    time: '2:00 PM',
    duration: '31 min',
    status: 'completed',
    attendees: ['CEO', 'CFO', 'COO', 'CHRO'],
    decisionsCount: 4,
    actionItems: 7,
    hash: '0x8b2d…f17c',
    summary: 'Evaluated headcount vs AI agent coverage. Decided to extend hiring freeze 90 days while AI handles 3 open roles.',
    outcome: 'Hiring freeze extended · $127K/yr saved · 3 roles backfilled by AI agents',
    messages: [
      { speaker: 'Aria', role: 'CEO', color: 'from-amber-400 to-orange-500', time: '2:01', text: 'Topic: headcount review. COO, status on the 3 open roles?', type: 'question' },
      { speaker: 'Orion', role: 'COO', color: 'from-green-400 to-teal-500', time: '2:02', text: 'SDR, support lead, and ops coordinator. All three have been effectively covered by Rex, Patch, and Ember for 6 weeks with zero escalations.', type: 'statement' },
      { speaker: 'Lena', role: 'CHRO', color: 'from-violet-400 to-purple-500', time: '2:05', text: 'Culture risk is low. Team morale survey shows 87% satisfaction. I support extending the freeze through June.', type: 'statement' },
      { speaker: 'Felix', role: 'CFO', color: 'from-blue-400 to-cyan-500', time: '2:08', text: 'That\'s $127K in salary savings. Approved. Freeze extended 90 days.', type: 'decision' },
    ],
  },
  {
    id: 'ses-003',
    title: 'Emergency: Supply Chain Risk',
    date: 'Mar 1, 2026',
    time: '11:30 AM',
    duration: '19 min',
    status: 'completed',
    attendees: ['CEO', 'COO', 'CFO'],
    decisionsCount: 2,
    actionItems: 4,
    hash: '0x1c9e…a44b',
    summary: 'Emergency session triggered by inventory anomaly. Approved diversification of vendor base and emergency reorder.',
    outcome: '2 emergency decisions approved · Vendor diversification initiated',
    messages: [
      { speaker: 'Orion', role: 'COO', color: 'from-green-400 to-teal-500', time: '11:31', text: 'ALERT: Primary supplier flagged 30-day delay. Current inventory covers 18 days at run rate. Requesting emergency reorder auth.', type: 'decision' },
      { speaker: 'Felix', role: 'CFO', color: 'from-blue-400 to-cyan-500', time: '11:33', text: 'Approved up to $85K emergency reorder. Simultaneously authorizing secondary vendor onboarding.', type: 'decision' },
      { speaker: 'Aria', role: 'CEO', color: 'from-amber-400 to-orange-500', time: '11:49', text: 'Both decisions on-chain. COO execute immediately. Session closed.', type: 'statement' },
    ],
  },
  {
    id: 'ses-004',
    title: 'Weekly Exec Sync — Week 10',
    date: 'Mar 7, 2026',
    time: '9:00 AM',
    duration: '—',
    status: 'scheduled',
    attendees: ['CEO', 'CFO', 'COO', 'CMO', 'CTO'],
    decisionsCount: 0,
    actionItems: 0,
    hash: '—',
    summary: 'Recurring weekly executive sync. Agenda: Q1 close, product roadmap checkpoint, GTM review.',
    outcome: 'Scheduled',
    messages: [],
  },
  {
    id: 'ses-005',
    title: 'Product Roadmap Q2 Prioritization',
    date: 'Mar 6, 2026',
    time: '3:00 PM',
    duration: '—',
    status: 'in-progress',
    attendees: ['CEO', 'CTO', 'CMO'],
    decisionsCount: 1,
    actionItems: 3,
    hash: '0xd7f1…2b90',
    summary: 'Live session — prioritizing Q2 feature set based on customer feedback and competitive landscape.',
    outcome: 'In progress',
    messages: [
      { speaker: 'Marcus', role: 'CTO', color: 'from-cyan-400 to-blue-500', time: '3:01', text: 'Three candidates for Q2 priority: multi-tenant routing, voice API v2, and the beacon mesh expansion.', type: 'statement' },
      { speaker: 'Maya', role: 'CMO', color: 'from-pink-400 to-rose-500', time: '3:04', text: 'Customer demand data strongly favors voice API v2. 67% of enterprise leads cited it as a key blocker.', type: 'statement' },
    ],
  },
]

// ─── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: SessionStatus }) {
  if (status === 'completed')
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/15 border border-green-500/30 px-2 py-0.5 rounded-full">
        <CheckCircleIcon className="w-3 h-3" /> Completed
      </span>
    )
  if (status === 'in-progress')
    return (
      <span className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 rounded-full">
        <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
        Live
      </span>
    )
  return (
    <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-700/50 border border-slate-600/50 px-2 py-0.5 rounded-full">
      <CalendarIcon className="w-3 h-3" /> Scheduled
    </span>
  )
}

// ─── Message type indicator ────────────────────────────────────────────────────
function MsgTypeDot({ type }: { type: SessionMessage['type'] }) {
  const map = {
    decision: 'bg-orange-400',
    action:   'bg-green-400',
    question: 'bg-blue-400',
    statement:'bg-slate-600',
  }
  return <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${map[type]}`} />
}

// ─── Session Detail Panel ──────────────────────────────────────────────────────
function SessionDetail({ session, onClose }: { session: BoardSession; onClose: () => void }) {
  const [playing, setPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.2 }}
      className="bg-slate-900 border border-slate-700/50 rounded-2xl flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <StatusBadge status={session.status} />
            <span className="text-xs text-slate-500">{session.date} · {session.time}</span>
          </div>
          <h3 className="text-base font-black text-white leading-tight">{session.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5">{session.summary}</p>
        </div>
        <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 flex-shrink-0">
          <XCircleIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 divide-x divide-slate-800 border-b border-slate-800">
        {[
          { label: 'Duration', value: session.duration, icon: ClockIcon, color: 'text-slate-300' },
          { label: 'Attendees', value: session.attendees.length, icon: UsersIcon, color: 'text-blue-400' },
          { label: 'Decisions', value: session.decisionsCount, icon: ZapIcon, color: 'text-orange-400' },
          { label: 'Actions', value: session.actionItems, icon: CheckCircleIcon, color: 'text-green-400' },
        ].map((s) => (
          <div key={s.label} className="p-3 text-center">
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Outcome pill */}
      <div className="px-4 py-3 border-b border-slate-800">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Outcome</p>
        <p className="text-sm text-slate-300">{session.outcome}</p>
      </div>

      {/* Attendees */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2 flex-wrap">
        <p className="text-xs text-slate-500">Attendees:</p>
        {session.attendees.map((a) => (
          <span key={a} className="text-xs font-bold bg-slate-800 text-slate-300 px-2 py-0.5 rounded-lg">{a}</span>
        ))}
      </div>

      {/* Transcript */}
      {session.messages.length > 0 ? (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-3.5 h-3.5 text-slate-500" />
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transcript</p>
            </div>
            <div className="flex items-center gap-2">
              {session.status === 'completed' && (
                <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-2.5 py-1 rounded-lg transition-colors">
                  <DownloadIcon className="w-3 h-3" /> Export
                </button>
              )}
              <button
                onClick={() => setPlaying(!playing)}
                className="flex items-center gap-1 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-2.5 py-1 rounded-lg transition-colors"
              >
                {playing ? <PauseIcon className="w-3 h-3" /> : <PlayIcon className="w-3 h-3" />}
                {playing ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {session.messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-2.5"
              >
                <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${msg.color} flex items-center justify-center flex-shrink-0 text-white text-xs font-black`}>
                  {msg.speaker[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-black text-white">{msg.speaker}</span>
                    <span className="text-xs text-slate-600">{msg.role}</span>
                    <span className="text-xs text-slate-600">{msg.time}</span>
                    {msg.type === 'decision' && (
                      <span className="text-xs font-bold text-orange-400 bg-orange-500/15 px-1.5 py-0.5 rounded-full">Decision</span>
                    )}
                    {msg.type === 'action' && (
                      <span className="text-xs font-bold text-green-400 bg-green-500/15 px-1.5 py-0.5 rounded-full">Action</span>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 leading-snug">{msg.text}</p>
                </div>
                <MsgTypeDot type={msg.type} />
              </motion.div>
            ))}
          </div>

          {/* Blockchain stamp */}
          {session.status === 'completed' && (
            <div className="mt-4 flex items-center gap-2 bg-green-500/5 border border-green-500/20 rounded-xl px-3 py-2">
              <ShieldIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
              <span className="text-xs text-green-400 font-mono">{session.hash}</span>
              <span className="text-xs text-slate-500 ml-auto">On-chain verified</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <CalendarIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
            <p className="text-sm text-slate-500">Session hasn't started yet</p>
            <p className="text-xs text-slate-600 mt-1">{session.date} at {session.time}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Session Card ──────────────────────────────────────────────────────────────
function SessionCard({ session, selected, onClick }: { session: BoardSession; selected: boolean; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.005 }}
      className={`w-full text-left p-4 rounded-2xl border transition-all ${selected ? 'bg-slate-800 border-orange-500/50' : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black text-white leading-tight truncate">{session.title}</p>
          <p className="text-xs text-slate-500 mt-0.5">{session.date} · {session.time} · {session.duration}</p>
        </div>
        <StatusBadge status={session.status} />
      </div>

      <p className="text-xs text-slate-400 line-clamp-2 mb-3">{session.summary}</p>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1 text-xs text-slate-500">
          <UsersIcon className="w-3 h-3" /> {session.attendees.join(', ')}
        </span>
        {session.decisionsCount > 0 && (
          <span className="flex items-center gap-1 text-xs text-orange-400 font-bold">
            <ZapIcon className="w-3 h-3" /> {session.decisionsCount} decisions
          </span>
        )}
        <ChevronRightIcon className="w-3.5 h-3.5 text-slate-600 ml-auto" />
      </div>
    </motion.button>
  )
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
export function ScreenSessions() {
  const [tab, setTab] = useState<SessionTab>('all')
  const [selected, setSelected] = useState<string | null>(sessions[0].id)
  const [search, setSearch] = useState('')

  const filtered = sessions.filter((s) => {
    const matchTab = tab === 'all' || s.status === tab
    const matchSearch = search === '' || s.title.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  const selectedSession = sessions.find((s) => s.id === selected) ?? null

  const counts = {
    all: sessions.length,
    completed: sessions.filter((s) => s.status === 'completed').length,
    'in-progress': sessions.filter((s) => s.status === 'in-progress').length,
    scheduled: sessions.filter((s) => s.status === 'scheduled').length,
  }

  const completedCount = counts.completed
  const liveCount      = counts['in-progress']
  const totalDecisions = sessions.reduce((s, ses) => s + ses.decisionsCount, 0)
  const totalActions   = sessions.reduce((s, ses) => s + ses.actionItems, 0)

  return (
    <div className="space-y-4">
      {/* Subtitle + schedule button */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {completedCount} completed · {liveCount > 0 ? `${liveCount} live · ` : ''}{counts.scheduled} upcoming
        </p>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
          <CalendarIcon className="w-4 h-4" /> Schedule Session
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl p-4 border border-slate-700/50 bg-slate-900 text-center">
          <p className="text-2xl font-black text-orange-400">{sessions.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Sessions</p>
        </div>
        <div className="rounded-2xl p-4 border border-slate-700/50 bg-slate-900 text-center">
          <p className={`text-2xl font-black ${liveCount > 0 ? 'text-green-400' : 'text-slate-500'}`}>
            {liveCount > 0 ? liveCount : '—'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Live Now</p>
        </div>
        <div className="rounded-2xl p-4 border border-slate-700/50 bg-slate-900 text-center">
          <p className="text-2xl font-black text-amber-400">{totalDecisions}</p>
          <p className="text-xs text-slate-500 mt-0.5">Decisions Made</p>
        </div>
        <div className="rounded-2xl p-4 border border-slate-700/50 bg-slate-900 text-center">
          <p className="text-2xl font-black text-violet-400">{totalActions}</p>
          <p className="text-xs text-slate-500 mt-0.5">Action Items</p>
        </div>
      </div>

      {/* Search + filter tabs */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sessions…"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50"
          />
        </div>
        <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
          {(['all', 'in-progress', 'completed', 'scheduled'] as SessionTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all capitalize ${tab === t ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              {t === 'in-progress' ? 'Live' : t.charAt(0).toUpperCase() + t.slice(1)}
              {counts[t] > 0 && tab !== t && (
                <span className="ml-1 text-xs bg-slate-700 px-1 rounded-full">{counts[t]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Session list */}
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-8 text-center">
                <MicIcon className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No sessions found</p>
              </div>
            ) : (
              filtered.map((s) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                >
                  <SessionCard
                    session={s}
                    selected={selected === s.id}
                    onClick={() => setSelected(s.id === selected ? null : s.id)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-0">
          <AnimatePresence mode="wait">
            {selectedSession ? (
              <SessionDetail
                key={selectedSession.id}
                session={selectedSession}
                onClose={() => setSelected(null)}
              />
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-slate-900 border border-slate-700/50 rounded-2xl p-12 flex flex-col items-center justify-center text-center"
              >
                <FileTextIcon className="w-10 h-10 text-slate-700 mb-3" />
                <p className="text-sm font-bold text-slate-500">Select a session</p>
                <p className="text-xs text-slate-600 mt-1">Transcript, decisions & action items</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
