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
  Trash2Icon } from
'lucide-react';
import { useAgents } from '../../hooks/useAgents';
import { usePersonas } from '../../hooks/usePersonas';
import { localAgentStore, syncBodRosterToCloud } from '../../lib/localAgentStore';
import { ROLE_META } from '../../lib/agentApi';
import { EXEC_STATIC } from './agentStatics';

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

// Customer advisory board: independent directors + client-facing execs
// Focused on customer outcomes, market strategy, and investor perspective
const DEFAULT_CUSTOMER_IDS = [
  'agent.board.chair',       // Independent Chair
  'agent.board.customer',    // Customer Advisory Director
  'agent.board.investor',    // Investor Director
  'agent.board.strategy',    // Strategy Advisor
  'agent.exec.cco',          // Chief Customer Officer
  'agent.exec.cso',          // Chief Strategy Officer
  'agent.exec.cro',          // Chief Revenue Officer
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
  onLLMChange,
  onRemove,
}: {
  member: BoardMember;
  index: number;
  onLLMChange: (id: string, llm: string) => void;
  onRemove: () => void;
}) {
  const llm = llmOptions.find((o) => o.id === member.llm) || llmOptions[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`group bg-slate-900 border ${member.borderColor} rounded-2xl overflow-hidden`}
      style={{ boxShadow: `0 0 20px ${member.glowColor}` }}
    >
      {/* Colored header band */}
      <div
        className="relative px-4 pt-4 pb-5 flex flex-col items-center"
        style={{ background: `radial-gradient(ellipse 120% 80% at 50% 0%, ${member.glowColor} 0%, transparent 70%)` }}
      >
        {/* Role pill top-left + status top-right */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-900/60 ${member.textColor} border ${member.borderColor}`}>
            {member.seat}
          </span>
          <span className={`flex items-center gap-1 text-[10px] font-bold ${member.status === 'active' ? 'text-green-400' : member.status === 'deliberating' ? 'text-amber-400' : 'text-slate-500'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${member.status === 'active' ? 'bg-green-400' : member.status === 'deliberating' ? 'bg-amber-400' : 'bg-slate-600'}`} />
            {member.status === 'active' ? 'Active' : member.status === 'deliberating' ? 'Deliberating' : 'Recused'}
          </span>
        </div>

        {/* Chair badge */}
        {member.votingWeight > 1 && (
          <div className="absolute top-8 right-3">
            <span className="text-[9px] font-black text-amber-400 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Chair
            </span>
          </div>
        )}

        {/* Avatar */}
        {(() => {
          const staticData = EXEC_STATIC[member.id];
          const AvatarComp = staticData?.Avatar;
          return (
            <div className={`w-20 h-20 rounded-2xl overflow-hidden mt-7 shadow-xl shadow-black/40 border-2 ${member.borderColor}`}>
              {AvatarComp
                ? <AvatarComp />
                : <div className={`w-full h-full flex items-center justify-center bg-slate-800`}>
                    <span className={`text-2xl font-black ${member.textColor}`}>{member.name[0]}</span>
                  </div>
              }
            </div>
          );
        })()}

        {/* Name + role */}
        <div className="mt-2.5 text-center">
          <p className="text-sm font-black text-white leading-tight">{member.name}</p>
          <p className={`text-[11px] font-semibold ${member.textColor} mt-0.5 leading-tight`}>{member.role}</p>
          <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{member.title}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-3 pb-4 space-y-3">
        {/* Expertise tags */}
        <div className="flex flex-wrap gap-1">
          {member.expertise.map((e) => (
            <span key={e} className="text-[10px] font-semibold text-slate-400 bg-white/5 border border-white/8 px-2 py-0.5 rounded-full">
              {e}
            </span>
          ))}
        </div>

        {/* Performance bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 font-semibold">Performance</span>
            <span className={`font-black ${member.textColor}`}>95%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5">
            <div
              className={`h-1.5 bg-gradient-to-r ${member.gradient} rounded-full transition-all duration-700`}
              style={{ width: '95%' }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Decisions today</span>
          <span className={`font-black ${member.textColor}`}>{member.decisions}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">Vote weight</span>
          <span className="font-black text-cyan-400">{member.votingWeight}x</span>
        </div>

        {/* LLM badge + remove button */}
        <div className="flex items-center gap-1.5 pt-1">
          <BrainIcon className="w-3 h-3 text-slate-600" />
          <span className={`text-[11px] font-bold ${llm.color}`}>{llm.name}</span>
          <span className="text-[10px] text-slate-600">{llm.provider}</span>
          <button
            onClick={onRemove}
            title="Remove from board"
            className="ml-auto w-7 h-7 rounded-xl bg-red-500/10 hover:bg-red-500/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border border-red-500/20"
          >
            <Trash2Icon className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
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

// ─── Main Component ────────────────────────────────────────────────────────────
export function ScreenBoardOfDirectors() {
  const [context, setContext] = useState<BoardContext>('catapult');
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
      borderColor: EXEC_STATIC[agent.agentId]?.border ?? gradientToBorder(gradient),
      textColor: EXEC_STATIC[agent.agentId]?.text ?? gradientToText(gradient),
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
    const newCatapult = context === 'catapult' ? next : catapultIds;
    const newCustomer = context === 'customer' ? next : customerIds;
    syncBodRosterToCloud(newCatapult, newCustomer);
  };

  /** Remove a director from the current context roster (future use) */
  const handleRemoveDirector = (agentId: string) => {
    const next = contextIds.filter((id) => id !== agentId);
    setContextIds(next);
    saveRoster(rosterKey, next);
    const newCatapult = context === 'catapult' ? next : catapultIds;
    const newCustomer = context === 'customer' ? next : customerIds;
    syncBodRosterToCloud(newCatapult, newCustomer);
  };

  /** Persist the LLM choice back to localAgentStore so it survives navigation */
  const handleLLMChange = (agentId: string, llmId: string) => {
    localAgentStore.updateAgent(agentId, { llmKey: llmId } as any);
  };


  const totalVotes = members.reduce((s, m) => s + m.votingWeight, 0);
  const quorumMet = members.filter((m) => m.status !== 'recused').length >= Math.ceil(members.length * 0.6);
  const totalDecisions = members.reduce((s, m) => s + m.decisions, 0);

  return (
    <div className="space-y-5">
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
          style={{ background: 'linear-gradient(135deg, #071428, #0a1a35)' }}>
          <p className="text-2xl font-black text-cyan-400">{members.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Board Seats</p>
        </div>
        <div
          className={`rounded-2xl p-4 border text-center ${quorumMet ? 'border-green-500/20' : 'border-red-500/20'}`}
          style={{ background: 'linear-gradient(135deg, #071428, #0a1a35)' }}>
          <p className={`text-2xl font-black ${quorumMet ? 'text-green-400' : 'text-red-400'}`}>
            {quorumMet ? '✓' : '✗'}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">Quorum</p>
        </div>
        <div
          className="rounded-2xl p-4 border border-cyan-500/15 text-center"
          style={{ background: 'linear-gradient(135deg, #071428, #0a1a35)' }}>
          <p className="text-2xl font-black text-amber-400">{totalDecisions.toLocaleString()}</p>
          <p className="text-xs text-slate-500 mt-0.5">Resolutions</p>
        </div>
        <div
          className="rounded-2xl p-4 border border-cyan-500/15 text-center"
          style={{ background: 'linear-gradient(135deg, #071428, #0a1a35)' }}>
          <p className="text-2xl font-black text-violet-400">{totalVotes}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Votes</p>
        </div>
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
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
            >
              <PlusIcon className="w-4 h-4" /> Add Director
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {members.map((member, i) =>
              <BoardMemberCard
                key={member.id}
                member={member}
                index={i}
                onLLMChange={handleLLMChange}
                onRemove={() => handleRemoveDirector(member.id)}
              />
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