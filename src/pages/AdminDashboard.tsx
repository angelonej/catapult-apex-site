import React, { useState, useEffect, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ActivityIcon,
  BarChart3Icon,
  BrainIcon,
  CheckCircle2Icon,
  ClockIcon,
  DollarSignIcon,
  EyeIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  SettingsIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
  AlertTriangleIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ShieldIcon,
  StarIcon } from
'lucide-react';
import { localAgentStore, subscribeAgentStore } from '../lib/localAgentStore';
// ─── Role color metadata (matches ScreenOrgChart ROLE_META) ──────────────────
const ROLE_COLORS: Record<string, { color: string; text: string; bg: string; border: string }> = {
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
const DEFAULT_COLORS = { color: 'from-slate-500 to-slate-700', text: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/40' };

function getLiveExecs() {
  return localAgentStore.getAll().filter(
    (a) => a.agentId.startsWith('agent.exec.') && a.role !== 'moderator'
  );
}

const recentDecisions = [
{
  id: 1,
  executive: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  decision: 'Optimized crew schedule for 3 teams — rerouted to Dock B',
  impact: 'High',
  confidence: 94,
  timestamp: '2 min ago',
  outcome: 'Saved 4.5 hours of labor costs · $1,800 prevented',
  status: 'approved',
  hash: '0x7f3a...c91b'
},
{
  id: 2,
  executive: 'CFO',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  decision: 'Adjusted pricing for Q2 services — net-30 to net-15 conversion',
  impact: 'High',
  confidence: 91,
  timestamp: '15 min ago',
  outcome: 'Projected $8,200 additional revenue this quarter',
  status: 'approved',
  hash: '0x2b9e...f44a'
},
{
  id: 3,
  executive: 'CEO',
  execColor: 'text-amber-400',
  execBg: 'bg-amber-500/20',
  decision: 'Recommend expanding to Phoenix — market analysis complete',
  impact: 'Critical',
  confidence: 87,
  timestamp: '1 hour ago',
  outcome: 'Awaiting your approval — high confidence, Critical impact',
  status: 'pending',
  hash: '0x9c1d...b72f'
},
{
  id: 4,
  executive: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  decision: 'Flagged equipment maintenance — compressor unit showing wear',
  impact: 'Medium',
  confidence: 96,
  timestamp: '2 hours ago',
  outcome: 'Prevented $3,000 breakdown · Maintenance scheduled',
  status: 'approved',
  hash: '0x4e8c...a19d'
}];

const liveMetrics = {
  totalDecisions: 1247,
  avgConfidence: 91,
  approvalRate: 94,
  timeSaved: '127 hrs',
  costSavings: '$18,420',
  revenueImpact: '$42,180'
};
const activityFeed = [
{
  time: 'Just now',
  text: 'COO Orion optimized crew schedule',
  type: 'success'
},
{
  time: '2 min ago',
  text: 'CFO Felix updated pricing model',
  type: 'info'
},
{
  time: '5 min ago',
  text: 'CEO Aria flagged expansion opportunity',
  type: 'warning'
},
{
  time: '12 min ago',
  text: 'COO Orion completed dock routing',
  type: 'success'
},
{
  time: '18 min ago',
  text: 'CFO Felix generated cash flow report',
  type: 'info'
},
{
  time: '24 min ago',
  text: 'CEO Aria reviewed market signals',
  type: 'success'
}];

// ─── Utility Components ────────────────────────────────────────────────────────
function StatusDot({ status }: {status: 'active' | 'paused';}) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === 'active' &&
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
      }
      <span
        className={`relative inline-flex rounded-full h-2.5 w-2.5 ${status === 'active' ? 'bg-green-400' : 'bg-slate-600'}`} />

    </span>);

}
function ImpactBadge({ impact }: {impact: string;}) {
  const styles: Record<string, string> = {
    Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Low: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  };
  return (
    <span
      className={`text-xs font-bold px-2 py-0.5 rounded-full border ${styles[impact] || styles.Low}`}>

      {impact}
    </span>);

}
// ─── Main Component ────────────────────────────────────────────────────────────
export function AdminDashboard() {
  // Live agent roster — stays in sync with org chart toggles
  const [liveAgents, setLiveAgents] = useState(() => getLiveExecs());
  useEffect(() => {
    return subscribeAgentStore(() => setLiveAgents(getLiveExecs()));
  }, []);

  const aiExecutives = liveAgents.map((a) => {
    const c = ROLE_COLORS[a.role] ?? DEFAULT_COLORS;
    return {
      id: a.agentId,
      role: a.role.toUpperCase(),
      name: a.name,
      fullName: a.displayName ?? a.specialty ?? a.role,
      status: a.status ?? 'active',
      performance: a.performance ?? 90,
      decisionsToday: a.decisionsToday ?? 0,
      cost: 499,
      roi: a.roiToday ?? 0,
      uptime: a.uptime != null ? `${a.uptime}%` : '99%',
      ...c,
    };
  });

  const [selectedExec, setSelectedExec] = useState(() => aiExecutives[0]);
  // Keep selectedExec in sync when roster changes
  useEffect(() => {
    setSelectedExec(prev =>
      aiExecutives.find(e => e.id === prev?.id) ?? aiExecutives[0]
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveAgents]);

  const [decisions, setDecisions] = useState(recentDecisions);
  const toggleExec = (id: string) => {
    const agent = localAgentStore.getAll().find(a => a.agentId === id);
    if (agent) {
      const next = agent.status === 'active' ? 'paused' : 'active';
      localAgentStore.updateAgent(id, { status: next });
    }
  };
  const handleDecision = (id: number, action: 'approved' | 'rejected') => {
    setDecisions((prev) =>
    prev.map((d) =>
    d.id === id ? { ...d, status: action } : d
    ));
  };
  const pendingCount = decisions.filter((d) => d.status === 'pending').length;
  const totalROI = aiExecutives.reduce((s, e) => s + e.roi, 0);
  const activeCount = aiExecutives.filter(e => e.status === 'active').length;
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                window.location.hash = '';
              }}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium">

              <ArrowLeftIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            <div className="w-px h-5 bg-slate-700" />
            <div>
              <h1 className="text-xl font-black text-white">
                AI Executive Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Real-time control &amp; transparency
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {pendingCount > 0 &&
            <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-3 py-1.5">
                <AlertTriangleIcon className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs font-bold text-orange-400">
                  {pendingCount} pending
                </span>
              </div>
            }
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5">
              <motion.div
                animate={{
                  opacity: [1, 0.3, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
                className="w-2 h-2 bg-green-400 rounded-full" />

              <span className="text-xs font-bold text-green-400">{activeCount} Active</span>
            </div>
            <button
              onClick={() => {
                window.location.hash = '#/apex';
              }}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">

              <ZapIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Launch APEX</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <BrainIcon className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Decisions Today</p>
              <p className="text-2xl font-black text-orange-400 leading-none">
                {liveMetrics.totalDecisions.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">+23% vs yesterday</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <DollarSignIcon className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">ROI Today</p>
              <p className="text-2xl font-black text-green-400 leading-none">
                ${(totalROI / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-slate-500 mt-0.5">across all agents</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <ClockIcon className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Time Saved</p>
              <p className="text-2xl font-black text-blue-400 leading-none">
                {liveMetrics.timeSaved}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                this week · verified
              </p>
            </div>
          </div>
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 flex items-start gap-3">
            <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle2Icon className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Approval Rate</p>
              <p className="text-2xl font-black text-purple-400 leading-none">
                {liveMetrics.approvalRate}%
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                avg confidence {liveMetrics.avgConfidence}%
              </p>
            </div>
          </div>
        </div>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Executives + Decisions (col-span-2) */}
          <div className="lg:col-span-2 space-y-5">
            {/* Executive Control Panel */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black text-white">
                    AI Executive Team
                  </h2>
                  <p className="text-xs text-slate-500">
                    {activeCount} active · {aiExecutives.length - activeCount} paused · 0 errors
                  </p>
                </div>
                <button className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-400 text-xs font-bold px-3 py-2 rounded-xl transition-colors">
                  <ZapIcon className="w-3.5 h-3.5" /> Auto-Pilot
                </button>
              </div>

              <div className="space-y-3">
                {aiExecutives.map((exec, i) => {
                  const isActive = exec.status === 'active';
                  const isSelected = selectedExec.id === exec.id;
                  return (
                    <motion.div
                      key={exec.id}
                      initial={{
                        opacity: 0,
                        x: -15
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: i * 0.07
                      }}
                      onClick={() => setSelectedExec(exec)}
                      className={`cursor-pointer bg-slate-800/50 border rounded-xl p-4 transition-all ${isSelected ? 'border-orange-500/40 bg-orange-500/5' : 'border-slate-700/50 hover:border-slate-600'} ${!isActive ? 'opacity-60' : ''}`}>

                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div className="relative flex-shrink-0">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${exec.color} rounded-xl flex items-center justify-center shadow-lg`}>

                            <span className="text-white font-black">
                              {exec.name[0]}
                            </span>
                          </div>
                          <div className="absolute -top-0.5 -right-0.5">
                            <StatusDot
                              status={isActive ? 'active' : 'paused'} />

                          </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-black text-white">
                              {exec.role}
                            </span>
                            <span className="text-xs text-slate-500">·</span>
                            <span className="text-xs text-slate-400">
                              {exec.name}
                            </span>
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'}`}>

                              {isActive ? 'Active' : 'Paused'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mb-2">
                            {exec.fullName}
                          </p>
                          <div className="w-full bg-slate-700 rounded-full h-1.5">
                            <motion.div
                              initial={{
                                width: 0
                              }}
                              animate={{
                                width: `${exec.performance}%`
                              }}
                              transition={{
                                duration: 1,
                                delay: i * 0.1
                              }}
                              className="h-1.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />

                          </div>
                        </div>

                        {/* Stats */}
                        <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
                          <div className="text-center">
                            <p className={`text-lg font-black ${exec.text}`}>
                              {exec.performance}%
                            </p>
                            <p className="text-xs text-slate-600">Perf</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-black text-orange-400">
                              {exec.decisionsToday}
                            </p>
                            <p className="text-xs text-slate-600">Decisions</p>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-black text-green-400">
                              {exec.roi > 0 ?
                              `$${exec.roi.toLocaleString()}` :
                              '—'}
                            </p>
                            <p className="text-xs text-slate-600">ROI</p>
                          </div>
                        </div>

                        {/* Toggle */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExec(exec.id);
                          }}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-colors flex-shrink-0 ${isActive ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' : 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30'}`}>

                          {isActive ?
                          <>
                              <PauseCircleIcon className="w-3.5 h-3.5" /> Pause
                            </> :

                          <>
                              <PlayCircleIcon className="w-3.5 h-3.5" /> Resume
                            </>
                          }
                        </button>
                      </div>
                    </motion.div>);

                })}
              </div>
            </div>

            {/* Decision Feed */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-lg font-black text-white">
                    Decision Feed
                  </h2>
                  <p className="text-xs text-slate-500">
                    Blockchain-verified · All decisions on-chain
                  </p>
                </div>
                {pendingCount > 0 &&
                <span className="bg-orange-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
                    {pendingCount} pending
                  </span>
                }
              </div>

              <div className="space-y-3">
                <AnimatePresence>
                  {decisions.map((d, i) =>
                  <motion.div
                    key={d.id}
                    initial={{
                      opacity: 0,
                      y: 8
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97
                    }}
                    transition={{
                      delay: i * 0.05
                    }}
                    className={`rounded-xl p-4 border ${d.status === 'pending' ? 'bg-orange-500/5 border-orange-500/30' : 'bg-slate-800/50 border-slate-700/50'}`}>

                      <div className="flex items-start gap-3 mb-2">
                        <span
                        className={`text-xs font-black px-2.5 py-1.5 rounded-xl flex-shrink-0 ${d.execBg} ${d.execColor}`}>

                          {d.executive}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <ImpactBadge impact={d.impact} />
                            <span className="text-xs text-slate-500">
                              {d.timestamp}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-white leading-snug">
                            {d.decision}
                          </p>
                        </div>
                      </div>

                      <div
                      className={`text-xs rounded-lg px-3 py-2 mb-3 ${d.status === 'approved' ? 'bg-green-500/10 text-green-400' : d.status === 'pending' ? 'bg-orange-500/10 text-orange-300' : 'bg-red-500/10 text-red-400'}`}>

                        {d.outcome}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <ShieldIcon className="w-3 h-3 text-green-400" />
                            {d.confidence}% confidence
                          </span>
                          <span className="font-mono text-slate-700 hidden sm:block">
                            {d.hash}
                          </span>
                        </div>
                        {d.status === 'pending' ?
                      <div className="flex gap-2">
                            <button
                          onClick={() => handleDecision(d.id, 'rejected')}
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-400 rounded-xl transition-colors">

                              <XCircleIcon className="w-3.5 h-3.5" /> Reject
                            </button>
                            <button
                          onClick={() => handleDecision(d.id, 'approved')}
                          className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl transition-colors">

                              <CheckCircleIcon className="w-3.5 h-3.5" />{' '}
                              Approve
                            </button>
                          </div> :

                      <span
                        className={`text-xs font-bold flex items-center gap-1 ${d.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>

                            {d.status === 'approved' ?
                        <>
                                <CheckCircleIcon className="w-3.5 h-3.5" />{' '}
                                Approved
                              </> :

                        <>
                                <XCircleIcon className="w-3.5 h-3.5" /> Rejected
                              </>
                        }
                          </span>
                      }
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-5">
            {/* Selected Executive Detail */}
            <div
              className={`bg-slate-900 border ${selectedExec.border} rounded-2xl p-5`}>

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${selectedExec.color} rounded-2xl flex items-center justify-center shadow-xl relative`}>

                  <span className="text-white font-black text-xl">
                    {selectedExec.name[0]}
                  </span>
                  <div className="absolute -top-0.5 -right-0.5">
                    <StatusDot status={selectedExec?.status ?? 'active'} />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    {selectedExec.role} — {selectedExec.name}
                  </h3>
                  <p className={`text-xs font-semibold ${selectedExec.text}`}>
                    {selectedExec.fullName}
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-slate-500">
                    Performance Score
                  </span>
                  <span className={`text-sm font-black ${selectedExec.text}`}>
                    {selectedExec.performance}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2.5">
                  <motion.div
                    key={selectedExec.id}
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${selectedExec.performance}%`
                    }}
                    transition={{
                      duration: 1,
                      ease: 'easeOut'
                    }}
                    className={`h-2.5 bg-gradient-to-r ${selectedExec.color} rounded-full`} />

                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">
                    Decisions Today
                  </p>
                  <p className="text-xl font-black text-orange-400">
                    {selectedExec.decisionsToday}
                  </p>
                </div>
                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">ROI Today</p>
                  <p className="text-xl font-black text-green-400">
                    {selectedExec.roi > 0 ?
                    `$${selectedExec.roi.toLocaleString()}` :
                    '—'}
                  </p>
                </div>
                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">Uptime</p>
                  <p className="text-xl font-black text-blue-400">
                    {selectedExec.uptime}
                  </p>
                </div>
                <div className="bg-slate-800 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-0.5">Cost/mo</p>
                  <p className="text-xl font-black text-slate-300">
                    {selectedExec.cost > 0 ? `$${selectedExec.cost}` : '—'}
                  </p>
                </div>
              </div>

              {/* Config toggles */}
              <div className="border-t border-slate-800 pt-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Configuration
                </p>
                <div className="space-y-0">
                  {[
                  {
                    label: 'Auto-approve decisions under $1K',
                    checked: true
                  },
                  {
                    label: 'Require approval for Critical impact',
                    checked: true
                  },
                  {
                    label: 'Send daily performance report',
                    checked: true
                  },
                  {
                    label: 'Blockchain-log all decisions',
                    checked: true
                  }].
                  map((item, i) =>
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">

                      <span className="text-xs text-slate-300">
                        {item.label}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={item.checked} />

                        <div className="w-9 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <button className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-bold py-2.5 rounded-xl transition-colors">
                <SettingsIcon className="w-4 h-4" /> Advanced Settings
              </button>
            </div>

            {/* Live Activity Feed */}
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <motion.span
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity
                  }}
                  className="w-2 h-2 rounded-full bg-green-400 inline-block" />

                <p className="text-sm font-bold text-white">Live Activity</p>
              </div>
              <div className="space-y-0">
                {activityFeed.map((item, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    x: 8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.06
                  }}
                  className="flex items-start gap-3 py-2.5 border-b border-slate-800 last:border-0">

                    <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.type === 'success' ? 'bg-green-400' : item.type === 'warning' ? 'bg-orange-400' : 'bg-blue-400'}`} />

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-300 leading-snug">
                        {item.text}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {item.time}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Revenue Impact */}
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-4">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-3">
                Revenue Impact
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Cost Savings</span>
                  <span className="text-sm font-black text-green-400">
                    {liveMetrics.costSavings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Revenue Impact</span>
                  <span className="text-sm font-black text-orange-400">
                    {liveMetrics.revenueImpact}
                  </span>
                </div>
                <div className="pt-2 border-t border-orange-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Total Value
                    </span>
                    <span className="text-base font-black text-white">
                      $60,600
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}