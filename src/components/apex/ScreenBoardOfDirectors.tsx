import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UsersIcon,
  ZapIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  BrainIcon,
  GavelIcon,
  LockIcon,
  PlusIcon,
  AlertTriangleIcon } from
'lucide-react';
import { useAgents, useCreateMeeting, useMeetingEvents } from '../../hooks/useAgents';
import { usePersonas } from '../../hooks/usePersonas';
import { localAgentStore } from '../../lib/localAgentStore';
import { ROLE_META } from '../../lib/agentApi';
import type { SessionType, SessionEvent } from '../../lib/agentApi';
// ─── Types ─────────────────────────────────────────────────────────────────────
type BoardContext = 'catapult' | 'customer';
type LLMOption = {
  id: string;
  name: string;
  provider: string;
  color: string;
  badge?: string;
};
type BoardMember = {
  id: string;
  name: string;
  role: string;
  title: string;
  seat: string;
  gradient: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  expertise: string[];
  decisions: number;
  votingWeight: number;
  status: 'active' | 'deliberating' | 'recused';
  llm: string;
};
// ─── LLM Options ───────────────────────────────────────────────────────────────
const llmOptions: LLMOption[] = [
{
  id: 'apex-native',
  name: 'APEX Native',
  provider: 'Catapult',
  color: 'text-orange-400',
  badge: 'RECOMMENDED'
},
{
  id: 'gpt-4o',
  name: 'GPT-4o',
  provider: 'OpenAI',
  color: 'text-emerald-400'
},
{
  id: 'gpt-4-turbo',
  name: 'GPT-4 Turbo',
  provider: 'OpenAI',
  color: 'text-emerald-400'
},
{
  id: 'claude-35-sonnet',
  name: 'Claude 3.5 Sonnet',
  provider: 'Anthropic',
  color: 'text-amber-400'
},
{
  id: 'claude-3-opus',
  name: 'Claude 3 Opus',
  provider: 'Anthropic',
  color: 'text-amber-400'
},
{
  id: 'gemini-15-pro',
  name: 'Gemini 1.5 Pro',
  provider: 'Google',
  color: 'text-blue-400'
},
{
  id: 'gemini-ultra',
  name: 'Gemini Ultra',
  provider: 'Google',
  color: 'text-blue-400'
},
{
  id: 'llama-31-70b',
  name: 'Llama 3.1 70B',
  provider: 'Meta',
  color: 'text-indigo-400'
},
{
  id: 'mistral-large',
  name: 'Mistral Large',
  provider: 'Mistral',
  color: 'text-purple-400'
},
{
  id: 'grok-2',
  name: 'Grok-2',
  provider: 'xAI',
  color: 'text-slate-300'
},
{
  id: 'command-r-plus',
  name: 'Command R+',
  provider: 'Cohere',
  color: 'text-teal-400'
}];

// ─── Agent-id → BoardMember seat label map ────────────────────────────────────
const SEAT_LABELS: Record<string, string> = {
  'agent.exec.ceo':        'Executive Chair',
  'agent.exec.cfo':        'Finance Board',
  'agent.exec.coo':        'Operations Board',
  'agent.exec.cmo':        'Growth Board',
  'agent.exec.cto':        'Technology Board',
  'agent.advisor.legal':   'Legal Board',
  'agent.exec.chro':       'People Board',
  'agent.exec.vpsales':    'Revenue Board',
  'agent.exec.moderator':  'Moderator',
  'agent.exec.cro':        'Revenue Board',
  'agent.exec.cpo':        'Product Board',
  'agent.exec.cdo':        'Data Board',
  'agent.exec.ciso':       'Security Board',
  'agent.exec.cso':        'Strategy Board',
  'agent.exec.cco':        'Customer Board',
  'agent.board.chair':     'Board Chair',
  'agent.board.audit':     'Audit Committee',
  'agent.board.risk':      'Risk Committee',
  'agent.board.comp':      'Compensation Committee',
  'agent.board.gov':       'Governance Committee',
  'agent.advisor.counsel': 'General Counsel',
  'agent.exec.cos':        'Chief of Staff',
  'agent.exec.vpe':        'Engineering Board',
  'agent.exec.growth':     'Growth Board',
  // ── Independent Board Directors ──
  'agent.board.ethics':      'Ethics Board',
  'agent.board.independent': 'Independent Seat',
  'agent.board.tech':        'Technology Advisory',
  'agent.board.strategy':    'Strategy Advisory',
  'agent.board.investor':    'Investor Seat',
  'agent.board.customer':    'Customer Advisory',
};

// ─── Default board rosters ───────────────────────────────────────────────────
// The CEO is management — they *report to* the Board and are NOT a director.
// Catapult board: independent chair + 4 committee chairs + CISO + General Counsel
const DEFAULT_CATAPULT_IDS = [
  'agent.board.chair', 'agent.board.audit', 'agent.board.risk',
  'agent.board.comp',  'agent.board.gov',   'agent.exec.ciso',
  'agent.advisor.counsel',
];

// Customer advisory board: exec directors who serve in an oversight/advisory capacity
// (These are execs acting as board-level advisors for a client company)
const DEFAULT_CUSTOMER_IDS = [
  'agent.board.chair', 'agent.exec.cfo', 'agent.exec.coo',
  'agent.advisor.legal', 'agent.exec.cso', 'agent.exec.cdo',
  'agent.exec.ciso',
];

// Storage keys for persisted custom rosters
const CATAPULT_ROSTER_KEY = 'apex:board-roster-catapult';
const CUSTOMER_ROSTER_KEY = 'apex:board-roster-customer';

function loadRoster(key: string, defaults: string[]): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : defaults;
  } catch { return defaults; }
}

function saveRoster(key: string, ids: string[]): void {
  localStorage.setItem(key, JSON.stringify(ids));
}

// Default LLM per agent role (shown on first render)
const DEFAULT_LLM_BY_ROLE: Record<string, string> = {
  ceo: 'apex-native', cfo: 'claude-35-sonnet', coo: 'apex-native',
  cmo: 'gemini-15-pro', cto: 'gpt-4o', legal: 'apex-native',
  chro: 'apex-native', vpsales: 'gpt-4o', moderator: 'apex-native',
  cro: 'gpt-4o', cpo: 'gpt-4-turbo', cdo: 'claude-35-sonnet',
  ciso: 'apex-native', cso: 'claude-3-opus', cco: 'gemini-15-pro',
  'board-chair': 'apex-native', 'audit-chair': 'claude-35-sonnet',
  'risk-chair': 'apex-native', 'comp-chair': 'gemini-15-pro',
  'gov-chair': 'apex-native', 'general-counsel': 'gpt-4-turbo',
  'chief-of-staff': 'apex-native', 'vp-engineering': 'gpt-4o',
  'head-of-growth': 'gemini-15-pro',
  // Independent board directors
  'ethics-chair': 'claude-3-opus', 'independent-director': 'gpt-4-turbo',
  'tech-advisor': 'gpt-4o', 'strategy-advisor': 'claude-35-sonnet',
  'investor-director': 'apex-native', 'customer-director': 'gemini-15-pro',
};

// Glow colors derived from gradient
function gradientToGlow(gradient: string): string {
  const match = gradient.match(/from-(\w+)-(\d+)/);
  const colorMap: Record<string, string> = {
    amber: 'rgba(251,191,36,0.25)', blue: 'rgba(96,165,250,0.2)',
    cyan: 'rgba(34,211,238,0.2)', pink: 'rgba(244,114,182,0.2)',
    green: 'rgba(74,222,128,0.2)', violet: 'rgba(167,139,250,0.2)',
    fuchsia: 'rgba(232,121,249,0.2)', orange: 'rgba(251,146,60,0.2)',
    red: 'rgba(248,113,113,0.2)', indigo: 'rgba(129,140,248,0.2)',
    sky: 'rgba(56,189,248,0.2)', teal: 'rgba(45,212,191,0.2)',
    emerald: 'rgba(52,211,153,0.2)', slate: 'rgba(148,163,184,0.15)',
    purple: 'rgba(192,132,252,0.2)', rose: 'rgba(251,113,133,0.2)',
  };
  return colorMap[match?.[1] ?? ''] ?? 'rgba(148,163,184,0.15)';
}

function gradientToBorder(gradient: string): string {
  const match = gradient.match(/from-(\w+)-/);
  return `border-${match?.[1] ?? 'slate'}-400/30`;
}

function gradientToText(gradient: string): string {
  const match = gradient.match(/from-(\w+)-/);
  return `text-${match?.[1] ?? 'slate'}-400`;
}
// ─── Static recent resolutions ───────────────────────────────────────────────
const recentResolutions = [
{
  id: 'r1',
  title: 'Approved Q2 Capital Allocation — $2.4M AI Infrastructure',
  votes: '7-0',
  date: '2 days ago',
  category: 'Finance',
  color: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/20'
},
{
  id: 'r2',
  title: 'Ratified AI Ethics Policy v3.2 — Responsible Deployment Standards',
  votes: '8-0',
  date: '5 days ago',
  category: 'Governance',
  color: 'text-fuchsia-400',
  bg: 'bg-fuchsia-500/10',
  border: 'border-fuchsia-500/20'
},
{
  id: 'r3',
  title: 'Authorized Phoenix Market Expansion — Phase 1 Greenlit',
  votes: '6-1',
  date: '1 week ago',
  category: 'Strategy',
  color: 'text-amber-400',
  bg: 'bg-amber-500/10',
  border: 'border-amber-500/20'
},
{
  id: 'r4',
  title: 'Adopted SOC 2 Type II Compliance Framework',
  votes: '8-0',
  date: '2 weeks ago',
  category: 'Compliance',
  color: 'text-cyan-400',
  bg: 'bg-cyan-500/10',
  border: 'border-cyan-500/20'
}];

// ─── LLM Dropdown ──────────────────────────────────────────────────────────────
function LLMDropdown({
  value,
  onChange



}: {value: string;onChange: (id: string) => void;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = llmOptions.find((o) => o.id === value) || llmOptions[0];
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 bg-[#071428] border border-cyan-500/20 rounded-lg text-xs transition-all hover:border-cyan-400/40 group">

        <div className="flex items-center gap-1.5 min-w-0">
          <div
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${selected.color.replace('text-', 'bg-')}`} />

          <span className="text-slate-300 font-semibold truncate">
            {selected.name}
          </span>
          <span className="text-slate-600 hidden sm:inline truncate">
            · {selected.provider}
          </span>
        </div>
        <ChevronDownIcon
          className={`w-3 h-3 text-cyan-500/60 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />

      </button>

      <AnimatePresence>
        {open &&
        <motion.div
          initial={{
            opacity: 0,
            y: -4,
            scale: 0.97
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: -4,
            scale: 0.97
          }}
          transition={{
            duration: 0.15
          }}
          className="absolute bottom-full left-0 right-0 mb-1 bg-[#071428] border border-cyan-500/30 rounded-xl overflow-hidden z-50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          style={{
            minWidth: '200px'
          }}>

            <div className="p-1.5 max-h-52 overflow-y-auto">
              {llmOptions.map((opt) =>
            <button
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all ${value === opt.id ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5'}`}>

                  <div
                className={`w-2 h-2 rounded-full flex-shrink-0 ${opt.color.replace('text-', 'bg-')}`} />

                  <div className="flex-1 text-left min-w-0">
                    <span className="text-white font-semibold">{opt.name}</span>
                    <span className="text-slate-500 ml-1">{opt.provider}</span>
                  </div>
                  {opt.badge &&
              <span className="text-[9px] font-black text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded-full flex-shrink-0">
                      {opt.badge}
                    </span>
              }
                  {value === opt.id &&
              <CheckCircleIcon className="w-3 h-3 text-cyan-400 flex-shrink-0" />
              }
                </button>
            )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
// ─── Bioluminescent Avatar ─────────────────────────────────────────────────────
function BioAvatar({
  member,
  size = 'md'



}: {member: BoardMember;size?: 'sm' | 'md' | 'lg';}) {
  const sizes = {
    sm: {
      outer: 'w-12 h-12',
      inner: 'w-9 h-9',
      text: 'text-xs'
    },
    md: {
      outer: 'w-16 h-16',
      inner: 'w-12 h-12',
      text: 'text-sm'
    },
    lg: {
      outer: 'w-20 h-20',
      inner: 'w-16 h-16',
      text: 'text-base'
    }
  };
  const s = sizes[size];
  return (
    <div
      className={`relative ${s.outer} flex items-center justify-center flex-shrink-0`}>

      {/* Sonar rings */}
      {[1, 2, 3].map((i) =>
      <motion.div
        key={i}
        animate={{
          scale: [1, 1 + i * 0.3, 1],
          opacity: [0.4, 0, 0.4]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: i * 0.6
        }}
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: member.glowColor
        }} />

      )}
      {/* Avatar */}
      <div
        className={`relative ${s.inner} bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-lg`}
        style={{
          boxShadow: `0 0 20px ${member.glowColor}`
        }}>

        <span className={`text-white font-black ${s.text}`}>
          {member.name[0]}
        </span>
        {/* Status dot */}
        <div className="absolute -top-0.5 -right-0.5">
          <span className="relative flex h-2.5 w-2.5">
            {member.status === 'active' &&
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
            }
            {member.status === 'deliberating' &&
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
            }
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${member.status === 'active' ? 'bg-cyan-400' : member.status === 'deliberating' ? 'bg-amber-400' : 'bg-slate-600'}`} />

          </span>
        </div>
      </div>
    </div>);

}
// ─── Board Member Card ─────────────────────────────────────────────────────────
function BoardMemberCard({
  member,
  index,
  onLLMChange




}: {member: BoardMember;index: number;onLLMChange: (id: string, llm: string) => void;}) {
  const llm = llmOptions.find((o) => o.id === member.llm) || llmOptions[0];
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: index * 0.07,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`relative bg-gradient-to-br from-[#071428] to-[#0a1a35] border ${member.borderColor} rounded-2xl p-4 overflow-hidden`}
      style={{
        boxShadow: `0 0 25px ${member.glowColor}`
      }}>

      {/* Deep ocean shimmer bg */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${member.glowColor} 0%, transparent 70%)`
        }} />


      {/* Chairman badge */}
      {member.votingWeight > 1 &&
      <div className="absolute top-3 right-3">
          <span className="text-[9px] font-black text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Chair
          </span>
        </div>
      }

      <div className="relative">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <BioAvatar member={member} size="md" />
          <div className="flex-1 min-w-0 pt-0.5">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-0.5">
              {member.seat}
            </p>
            <p className="text-base font-black text-white leading-tight">
              {member.name}
            </p>
            <p
              className={`text-xs font-semibold ${member.textColor} leading-tight`}>

              {member.role}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
              {member.title}
            </p>
          </div>
        </div>

        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {member.expertise.map((e) =>
          <span
            key={e}
            className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">

              {e}
            </span>
          )}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-[#050d1a] rounded-xl p-2 text-center border border-white/5">
            <p className={`text-sm font-black ${member.textColor}`}>
              {member.decisions}
            </p>
            <p className="text-[9px] text-slate-600">Decisions</p>
          </div>
          <div className="bg-[#050d1a] rounded-xl p-2 text-center border border-white/5">
            <p className="text-sm font-black text-cyan-400">
              {member.votingWeight}x
            </p>
            <p className="text-[9px] text-slate-600">Vote Weight</p>
          </div>
          <div className="bg-[#050d1a] rounded-xl p-2 text-center border border-white/5">
            <p
              className={`text-sm font-black ${member.status === 'active' ? 'text-cyan-400' : member.status === 'deliberating' ? 'text-amber-400' : 'text-slate-500'}`}>

              {member.status === 'active' ?
              '●' :
              member.status === 'deliberating' ?
              '◐' :
              '○'}
            </p>
            <p className="text-[9px] text-slate-600 capitalize">
              {member.status}
            </p>
          </div>
        </div>

        {/* LLM Selector */}
        <div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-1">
            <BrainIcon className="w-2.5 h-2.5" />
            LLM Source
          </p>
          <LLMDropdown
            value={member.llm}
            onChange={(llmId) => onLLMChange(member.id, llmId)} />

        </div>
      </div>
    </motion.div>);

}
// ─── Session type options ──────────────────────────────────────────────────────

const SESSION_TYPE_OPTIONS: { id: SessionType; label: string }[] = [
  { id: 'board-session',    label: 'Board Session' },
  { id: 'status-meeting',   label: 'Status Meeting' },
  { id: 'planning-session', label: 'Planning Session' },
  { id: 'crisis-session',   label: 'Crisis Triage' },
  { id: 'hiring-session',   label: 'Hiring Session' },
];

// ─── Add Director Modal ──────────────────────────────────────────────────────
function AddDirectorModal({
  allAgents,
  currentIds,
  onAdd,
  onClose,
}: {
  allAgents: { agentId: string; name: string; role: string; colorGradient?: string }[];
  currentIds: string[];
  onAdd: (agentId: string) => void;
  onClose: () => void;
}) {
  const available = allAgents.filter(
    (a) => !currentIds.includes(a.agentId) && a.role !== 'moderator'
  );

  // Group by category
  const grouped: Record<string, typeof available> = {
    'Board of Directors': available.filter((a) => a.agentId.startsWith('agent.board.')),
    'C-Suite Executives': available.filter(
      (a) => a.agentId.startsWith('agent.exec.') && ['ceo','cfo','coo','cmo','cto','cro','cpo','cdo','ciso','cso','cco','chro'].includes(a.role)
    ),
    'Senior Advisors': available.filter(
      (a) => a.agentId.startsWith('agent.advisor.') ||
        ['general-counsel','chief-of-staff','vp-engineering','head-of-growth'].includes(a.role)
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 8 }}
        transition={{ duration: 0.18 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl border border-cyan-500/25 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #071428, #0a1e3d)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/15">
          <div>
            <p className="text-sm font-black text-white">Add Director</p>
            <p className="text-xs text-slate-500 mt-0.5">Select an agent to seat on this board</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/10 transition-all text-lg leading-none"
          >×</button>
        </div>

        {/* Agent list grouped */}
        <div className="p-3 max-h-[420px] overflow-y-auto space-y-3">
          {available.length === 0 && (
            <p className="text-xs text-slate-500 text-center py-6">
              All available agents are already seated.
            </p>
          )}
          {Object.entries(grouped).map(([group, agents]) =>
            agents.length === 0 ? null : (
              <div key={group}>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest px-2 mb-1.5">
                  {group}
                </p>
                <div className="space-y-1">
                  {agents.map((agent) => {
                    const meta = ROLE_META[agent.role];
                    const gradient = agent.colorGradient ?? meta?.colorGradient ?? 'from-slate-400 to-slate-600';
                    const textCls = gradientToText(gradient);
                    const borderCls = gradientToBorder(gradient);
                    return (
                      <button
                        key={agent.agentId}
                        onClick={() => { onAdd(agent.agentId); onClose(); }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border ${borderCls} bg-white/3 hover:bg-white/8 transition-all text-left group`}
                      >
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                          {agent.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white">{agent.name}</p>
                          <p className={`text-xs ${textCls} font-semibold truncate`}>
                            {meta?.title ?? agent.role.toUpperCase()}
                          </p>
                        </div>
                        <PlusIcon className={`w-4 h-4 ${textCls} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// Phase label mapping
const PHASE_LABELS: Record<string, string> = {
  session_started:   'Phase 1 — Intake & Agent Resolution',
  agent_thinking:    'Phase 2 — Memo Generation',
  memo_posted:       'Phase 2 — Memo Ready',
  rebuttal_thinking: 'Phase 2.5 — Rebuttal Round',
  rebuttal_posted:   'Phase 2.5 — Rebuttal Ready',
  critique_started:  'Phase 3 — Moderator Critique',
  critique_complete: 'Phase 3 — Critique Complete',
  decision_started:  'Phase 4 — Final Decision',
  session_complete:  'Session Complete',
  error:             'Error',
};

// ─── Session Event Feed ────────────────────────────────────────────────────────
function EventFeed({ events }: { events: SessionEvent[] }) {
  return (
    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
      <AnimatePresence initial={false}>
        {events.map((evt, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-start gap-2 text-xs"
          >
            <span
              className={`mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                evt.type === 'session_complete' ? 'bg-green-400' :
                evt.type === 'error'            ? 'bg-red-400' :
                evt.type.includes('thinking')   ? 'bg-amber-400 animate-pulse' :
                                                  'bg-cyan-400'
              }`}
            />
            <div className="min-w-0">
              <span className="font-bold text-slate-300">
                {PHASE_LABELS[evt.type] ?? evt.type}
              </span>
              {evt.agentName && (
                <span className="text-slate-500 ml-1">· {evt.agentName}</span>
              )}
              {evt.type === 'memo_posted' && evt.data && 'confidence' in evt.data && (
                <span className="ml-1 text-cyan-400">
                  {(evt.data as { confidence: number }).confidence}% confidence
                </span>
              )}
              {evt.type === 'session_complete' && evt.data && 'decision' in evt.data && (
                <p className="text-green-400 mt-0.5 font-semibold">
                  {(evt.data as { decision: string }).decision}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function ScreenBoardOfDirectors() {
  const [context, setContext] = useState<BoardContext>('catapult');
  const [sessionType, setSessionType] = useState<SessionType>('board-session');
  const [question, setQuestion] = useState('');
  const [addingDirector, setAddingDirector] = useState(false);

  // ── Persisted custom rosters ───────────────────────────────────────────────
  const [catapultIds, setCatapultIds] = useState<string[]>(() =>
    loadRoster(CATAPULT_ROSTER_KEY, DEFAULT_CATAPULT_IDS)
  );
  const [customerIds, setCustomerIds] = useState<string[]>(() =>
    loadRoster(CUSTOMER_ROSTER_KEY, DEFAULT_CUSTOMER_IDS)
  );

  const contextIds  = context === 'catapult' ? catapultIds  : customerIds;
  const setContextIds = context === 'catapult' ? setCatapultIds : setCustomerIds;
  const rosterKey  = context === 'catapult' ? CATAPULT_ROSTER_KEY : CUSTOMER_ROSTER_KEY;

  // ── Live data from stores ──────────────────────────────────────────────────
  const { agents } = useAgents();
  const { personas } = usePersonas();

  // Meeting API hooks
  const { run: runMeeting, meetingId, loading: starting, error: startError, reset: resetMeeting } = useCreateMeeting();
  const { events, complete, polling } = useMeetingEvents(meetingId);

  const sessionActive = Boolean(meetingId) && !complete;

  /** Map a live BoardAgent to the BoardMember shape used by the card UI */
  function agentToMember(agent: { agentId: string; name: string; role: string; status: 'active' | 'paused'; performance?: number; decisionsToday?: number; colorGradient?: string }): BoardMember {
    const meta = ROLE_META[agent.role] ?? ROLE_META['ceo'];
    const gradient = agent.colorGradient ?? meta.colorGradient ?? 'from-slate-400 to-slate-600';
    const persona = personas.find((p) => p.agentId === agent.agentId);
    const storedLlm = (agents.find((a) => a.agentId === agent.agentId) as any)?.llmKey as string | undefined;
    return {
      id: agent.agentId,
      name: agent.name,
      role: meta.label,
      title: meta.specialty ?? meta.title,
      seat: SEAT_LABELS[agent.agentId] ?? meta.title,
      gradient,
      glowColor: gradientToGlow(gradient),
      borderColor: gradientToBorder(gradient),
      textColor: gradientToText(gradient),
      expertise: persona?.coreTraits ?? [meta.specialty ?? 'Strategy'],
      decisions: agent.decisionsToday ?? Math.floor((agent.performance ?? 80) * 2.3),
      votingWeight: agent.role === 'board-chair' ? 2 : 1,
      status: agent.status === 'paused' ? 'recused' : 'active',
      llm: storedLlm ?? DEFAULT_LLM_BY_ROLE[agent.role] ?? 'apex-native',
    };
  }

  const members: BoardMember[] = contextIds
    .map((id) => agents.find((a) => a.agentId === id))
    .filter(Boolean)
    .map((a) => agentToMember(a!));

  /** Add a director to the current context roster and persist */
  const handleAddDirector = (agentId: string) => {
    const next = [...contextIds, agentId];
    setContextIds(next);
    saveRoster(rosterKey, next);
  };

  /** Remove a director from the current context roster (future use) */
  const handleRemoveDirector = (agentId: string) => {
    const next = contextIds.filter((id) => id !== agentId);
    setContextIds(next);
    saveRoster(rosterKey, next);
  };

  /** Persist the LLM choice back to localAgentStore so it survives navigation */
  const handleLLMChange = (agentId: string, llmId: string) => {
    localAgentStore.updateAgent(agentId, { llmKey: llmId } as any);
  };

  const handleCallToOrder = async () => {
    if (sessionActive || starting) return;
    const companyId = (import.meta as Record<string, Record<string,string>>).env?.VITE_COMPANY_ID ?? 'dev-company';
    const agentIds = members
      .filter((m) => m.status !== 'recused')
      .map((m) => m.id); // m.id IS the agentId now

    await runMeeting({
      companyProfile: {
        companyId,
        name: context === 'catapult' ? 'Catapult Company' : 'Customer Company',
      },
      agentIds,
      moderatorAgentId: 'agent.exec.moderator',
      question: question.trim() || 'Provide a strategic board update and identify the top priority for this quarter.',
      sessionType,
      enableRebuttals: sessionType === 'board-session',
    });
  };

  const handleAdjourn = () => {
    resetMeeting();
  };

  const activeCount = members.filter((m) => m.status === 'active').length;
  const deliberatingCount = members.filter(
    (m) => m.status === 'deliberating'
  ).length;
  const totalVotes = members.reduce((s, m) => s + m.votingWeight, 0);
  const quorumMet =
  activeCount + deliberatingCount >= Math.ceil(members.length * 0.6);
  const totalDecisions = members.reduce((s, m) => s + m.decisions, 0);
  return (
    <div className="space-y-5">
      {/* NEMO Header */}
      <div
        className="relative rounded-2xl overflow-hidden p-5 border border-cyan-500/20"
        style={{
          background:
          'linear-gradient(135deg, #050d1a 0%, #071428 40%, #0a1e3d 100%)',
          boxShadow: '0 0 40px rgba(6,182,212,0.08)'
        }}>

        {/* Bioluminescent background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 70%)'
          }} />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) =>
        <motion.div
          key={i}
          animate={{
            y: [-4, 4, -4],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 3 + i * 0.7,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute w-1 h-1 rounded-full bg-cyan-400/40"
          style={{
            left: `${15 + i * 14}%`,
            top: `${20 + i % 3 * 25}%`
          }} />

        )}

        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <motion.div
                animate={{
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="w-2 h-2 rounded-full bg-cyan-400"
                style={{
                  boxShadow: '0 0 8px rgba(6,182,212,0.8)'
                }} />

              <p className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                NEMO · Board Intelligence
              </p>
            </div>
            <h2 className="text-2xl font-black text-white leading-tight mb-1">
              Board of Directors
            </h2>
            <p className="text-sm text-slate-400">
              AI-governed oversight · Deep intelligence · Full fiduciary
              authority
            </p>
          </div>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 border border-cyan-500/30"
            style={{
              background: 'linear-gradient(135deg, #071428, #0a1e3d)',
              boxShadow: '0 0 20px rgba(6,182,212,0.15)'
            }}>

            <UsersIcon className="w-7 h-7 text-cyan-400" />
          </div>
        </div>
      </div>

      {/* Context Switcher */}
      <div
        className="flex p-1 rounded-xl gap-1 border border-cyan-500/15"
        style={{
          background: '#050d1a'
        }}>

        <button
          onClick={() => setContext('catapult')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${context === 'catapult' ? 'text-white border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
          style={
          context === 'catapult' ?
          {
            background: 'linear-gradient(135deg, #071428, #0d2040)',
            boxShadow: '0 0 15px rgba(6,182,212,0.1)'
          } :
          {}
          }>

          <ZapIcon
            className={`w-4 h-4 ${context === 'catapult' ? 'text-cyan-400' : 'text-slate-600'}`} />

          Catapult Company
        </button>
        <button
          onClick={() => setContext('customer')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${context === 'customer' ? 'text-white border border-cyan-500/30' : 'text-slate-500 hover:text-slate-300'}`}
          style={
          context === 'customer' ?
          {
            background: 'linear-gradient(135deg, #071428, #0d2040)',
            boxShadow: '0 0 15px rgba(6,182,212,0.1)'
          } :
          {}
          }>

          <UsersIcon
            className={`w-4 h-4 ${context === 'customer' ? 'text-cyan-400' : 'text-slate-600'}`} />

          Customer Board
        </button>
      </div>

      {/* Governance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div
          className="rounded-2xl p-4 border border-cyan-500/15 text-center"
          style={{
            background: 'linear-gradient(135deg, #071428, #0a1a35)'
          }}>

          <p className="text-2xl font-black text-cyan-400">{members.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Board Seats</p>
        </div>
        <div
          className={`rounded-2xl p-4 border text-center ${quorumMet ? 'border-green-500/20' : 'border-red-500/20'}`}
          style={{
            background: 'linear-gradient(135deg, #071428, #0a1a35)'
          }}>

          <p
            className={`text-2xl font-black ${quorumMet ? 'text-green-400' : 'text-red-400'}`}>

            {quorumMet ? '✓' : '✗'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Quorum</p>
        </div>
        <div
          className="rounded-2xl p-4 border border-cyan-500/15 text-center"
          style={{
            background: 'linear-gradient(135deg, #071428, #0a1a35)'
          }}>

          <p className="text-2xl font-black text-amber-400">
            {totalDecisions.toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Resolutions</p>
        </div>
        <div
          className="rounded-2xl p-4 border border-cyan-500/15 text-center"
          style={{
            background: 'linear-gradient(135deg, #071428, #0a1a35)'
          }}>

          <p className="text-2xl font-black text-violet-400">{totalVotes}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Votes</p>
        </div>
      </div>

      {/* Board Session Banner */}
      <div
        className={`rounded-2xl p-4 border transition-all ${sessionActive ? 'border-cyan-400/40' : 'border-cyan-500/15'}`}
        style={{
          background: sessionActive ?
          'linear-gradient(135deg, #071e38, #0a2545)' :
          'linear-gradient(135deg, #071428, #0a1a35)',
          boxShadow: sessionActive ? '0 0 30px rgba(6,182,212,0.12)' : 'none'
        }}>

        {/* Header row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-cyan-500/30 flex-shrink-0"
              style={{
                background: '#071428'
              }}>

              <GavelIcon className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-black text-white">
                {sessionActive ? 'Board Session In Progress' : complete ? 'Session Complete' : 'Board Session'}
              </p>
              <p className="text-xs text-slate-400">
                {sessionActive ?
                `${activeCount} directors present · ${deliberatingCount} deliberating · Quorum ${quorumMet ? 'met' : 'not met'}` :
                complete ?
                'Session adjourned · Decision recorded on-chain' :
                `${members.length} directors seated · Click to call to order`}
              </p>
            </div>
          </div>
          <button
            onClick={sessionActive || complete ? handleAdjourn : handleCallToOrder}
            disabled={starting}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl border transition-all flex-shrink-0 disabled:opacity-50 ${
              sessionActive || complete
                ? 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30'
                : 'border-cyan-500/30 text-cyan-400 hover:border-cyan-400/50'
            }`}
            style={
            !sessionActive && !complete ?
            {
              background: 'linear-gradient(135deg, #071428, #0d2040)'
            } :
            {}
            }>

            {starting ? (
              <><span className="w-3.5 h-3.5 border-2 border-cyan-400/40 border-t-cyan-400 rounded-full animate-spin" /> Summoning…</>
            ) : sessionActive ? (
              <><AlertTriangleIcon className="w-3.5 h-3.5" /> Adjourn</>
            ) : complete ? (
              <><AlertTriangleIcon className="w-3.5 h-3.5" /> New Session</>
            ) : (
              <><GavelIcon className="w-3.5 h-3.5" /> Call to Order</>
            )}
          </button>
        </div>

        {/* Question + session type config (shown when idle) */}
        {!sessionActive && !complete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 pt-3 border-t border-cyan-500/15 space-y-2"
          >
            <div className="flex gap-2 flex-wrap">
              {SESSION_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSessionType(opt.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    sessionType === opt.id
                      ? 'border-cyan-400/40 text-cyan-400'
                      : 'border-white/10 text-slate-500 hover:text-white hover:border-white/20'
                  }`}
                  style={{ background: '#050d1a' }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Strategic question for the board… (optional)"
              rows={2}
              className="w-full bg-[#050d1a] border border-cyan-500/20 rounded-xl px-3 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-cyan-400/40 resize-none"
            />
            {startError && (
              <p className="text-xs text-red-400">⚠ {startError}</p>
            )}
          </motion.div>
        )}

        {/* Live event feed (shown during session or when complete) */}
        {(sessionActive || complete) && events.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-3 pt-3 border-t border-cyan-500/15"
          >
            {/* Director roll call */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              {members.map((m) =>
              <div
                key={m.id}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${m.status === 'active' ? 'border-cyan-500/30 text-cyan-400' : m.status === 'deliberating' ? 'border-amber-500/30 text-amber-400' : 'border-slate-700 text-slate-500'}`}
                style={{
                  background: '#050d1a'
                }}>

                  <span
                className={`w-1.5 h-1.5 rounded-full ${m.status === 'active' ? 'bg-cyan-400' : m.status === 'deliberating' ? 'bg-amber-400' : 'bg-slate-600'}`} />

                  {m.name}
                </div>
              )}
            </div>
            {/* Phase feed */}
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">
              {polling ? 'Live · Polling for updates…' : 'Session Log'}
            </p>
            <EventFeed events={events} />
          </motion.div>
        )}
      </div>

      {/* Global LLM Config */}
      <div
        className="rounded-2xl p-4 border border-cyan-500/15"
        style={{
          background: 'linear-gradient(135deg, #071428, #0a1a35)'
        }}>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BrainIcon className="w-4 h-4 text-cyan-400" />
            <p className="text-sm font-bold text-white">Global LLM Override</p>
          </div>
          <span className="text-xs text-slate-500">
            Apply to all board members
          </span>
        </div>
        <div className="flex gap-2 flex-wrap">
          {['apex-native', 'gpt-4o', 'claude-35-sonnet', 'gemini-15-pro'].map(
            (llmId) => {
              const opt = llmOptions.find((o) => o.id === llmId)!;
              const allUsing = members.every((m) => m.llm === llmId);
              return (
                <button
                  key={llmId}
                  onClick={() => {
                    // Apply to all visible context members via the store
                    contextIds.forEach((id) => {
                      localAgentStore.updateAgent(id, { llmKey: llmId } as any);
                    });
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${allUsing ? 'border-cyan-400/40 text-cyan-400' : 'border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                  style={
                  allUsing ?
                  {
                    background:
                    'linear-gradient(135deg, #071e38, #0a2545)'
                  } :
                  {
                    background: '#050d1a'
                  }
                  }>

                  <div
                    className={`w-1.5 h-1.5 rounded-full ${opt.color.replace('text-', 'bg-')}`} />

                  {opt.name}
                </button>);

            }
          )}
        </div>
      </div>

      {/* Board Member Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={context}
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
            y: -8
          }}
          transition={{
            duration: 0.25
          }}>

          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-bold text-white">
                {context === 'catapult' ?
                'Catapult Board of Directors' :
                'Customer Board of Directors'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {members.length} director{members.length !== 1 ? 's' : ''} seated
              </p>
            </div>
            <button
              onClick={() => setAddingDirector(true)}
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border border-cyan-500/20 text-cyan-400 transition-all hover:border-cyan-400/40 hover:bg-cyan-500/5"
              style={{
                background: '#050d1a'
              }}>

              <PlusIcon className="w-3.5 h-3.5" /> Add Director
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {members.map((member, i) =>
            <div key={member.id} className="relative group/card">
              <BoardMemberCard
                member={member}
                index={i}
                onLLMChange={handleLLMChange} />
              {/* Remove director button — hover reveal */}
              <button
                onClick={() => handleRemoveDirector(member.id)}
                title="Remove from board"
                className="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-red-500/80 text-white text-xs font-black leading-none flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity hover:bg-red-500"
              >×</button>
            </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Add Director Modal */}
      <AnimatePresence>
        {addingDirector && (
          <AddDirectorModal
            allAgents={agents}
            currentIds={contextIds}
            onAdd={handleAddDirector}
            onClose={() => setAddingDirector(false)}
          />
        )}
      </AnimatePresence>

      {/* Recent Resolutions */}
      <div
        className="rounded-2xl p-4 border border-cyan-500/15"
        style={{
          background: 'linear-gradient(135deg, #071428, #0a1a35)'
        }}>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GavelIcon className="w-4 h-4 text-cyan-400" />
            <p className="text-sm font-bold text-white">Recent Resolutions</p>
          </div>
          <span className="text-xs text-slate-500">All on-chain verified</span>
        </div>
        <div className="space-y-2">
          {recentResolutions.map((r, i) =>
          <motion.div
            key={r.id}
            initial={{
              opacity: 0,
              x: -8
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.06
            }}
            className={`flex items-start gap-3 p-3 rounded-xl border ${r.bg} ${r.border}`}>

              <CheckCircleIcon
              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${r.color}`} />

              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-semibold leading-snug">
                  {r.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-black ${r.color}`}>
                    {r.category}
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-500">
                    Vote: {r.votes}
                  </span>
                  <span className="text-xs text-slate-500">·</span>
                  <span className="text-xs text-slate-600">{r.date}</span>
                </div>
              </div>
              <LockIcon className="w-3.5 h-3.5 text-green-400/60 flex-shrink-0 mt-0.5" />
            </motion.div>
          )}
        </div>
      </div>

      {/* NEMO Attribution */}
      <div
        className="rounded-2xl p-4 border border-cyan-500/10 text-center"
        style={{
          background: 'linear-gradient(135deg, #050d1a, #071428)'
        }}>

        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity
          }}
          className="flex items-center justify-center gap-2 mb-1">

          <div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: '0 0 6px rgba(6,182,212,0.8)'
            }} />

          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest">
            NEMO Design System
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full bg-cyan-400"
            style={{
              boxShadow: '0 0 6px rgba(6,182,212,0.8)'
            }} />

        </motion.div>
        <p className="text-xs text-slate-600">
          Deep Intelligence · Bioluminescent Governance · Powered by Catapult
          Company
        </p>
      </div>
    </div>);

}