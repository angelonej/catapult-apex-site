// agentStatics.ts — non-component data exports
// Kept separate from ScreenPersonas.tsx so Vite Fast Refresh works correctly.
// (A .tsx file that mixes React component exports with plain data exports breaks HMR.)

import type { ComponentType } from 'react';
import {
  AvatarAria, AvatarFelix, AvatarOrion, AvatarMaya, AvatarTheo,
  AvatarLex, AvatarHana, AvatarSage, AvatarMarcus, AvatarDonna,
  AvatarRay, AvatarClaire, AvatarTony, AvatarPriya,
  AvatarRex, AvatarViper, AvatarChase, AvatarNova, AvatarPixel,
  AvatarBlaze, AvatarCleo, AvatarPatch, AvatarEmber, AvatarIris,
  AvatarShield, AvatarBuzz,
} from './avatarComponents';

// ─── All available avatars for the avatar picker ─────────────────────────────
export const ALL_AVATARS: { key: string; Component: ComponentType }[] = [
  { key: 'Aria',   Component: AvatarAria   },
  { key: 'Felix',  Component: AvatarFelix  },
  { key: 'Orion',  Component: AvatarOrion  },
  { key: 'Maya',   Component: AvatarMaya   },
  { key: 'Theo',   Component: AvatarTheo   },
  { key: 'Lex',    Component: AvatarLex    },
  { key: 'Hana',   Component: AvatarHana   },
  { key: 'Sage',   Component: AvatarSage   },
  { key: 'Marcus', Component: AvatarMarcus },
  { key: 'Donna',  Component: AvatarDonna  },
  { key: 'Ray',    Component: AvatarRay    },
  { key: 'Claire', Component: AvatarClaire },
  { key: 'Tony',   Component: AvatarTony   },
  { key: 'Priya',  Component: AvatarPriya  },
  { key: 'Rex',    Component: AvatarRex    },
  { key: 'Viper',  Component: AvatarViper  },
  { key: 'Chase',  Component: AvatarChase  },
  { key: 'Nova',   Component: AvatarNova   },
  { key: 'Pixel',  Component: AvatarPixel  },
  { key: 'Blaze',  Component: AvatarBlaze  },
  { key: 'Cleo',   Component: AvatarCleo   },
  { key: 'Patch',  Component: AvatarPatch  },
  { key: 'Ember',  Component: AvatarEmber  },
  { key: 'Iris',   Component: AvatarIris   },
  { key: 'Shield', Component: AvatarShield },
  { key: 'Buzz',   Component: AvatarBuzz   },
];

// ─── Static exec data map — avatar + styling lookup for all seeded agents ────
export const EXEC_STATIC: Record<string, {
  Avatar: ComponentType;
  fullName: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  glow: string;
}> = {
  // ── Core C-Suite ──
  'agent.exec.ceo':          { Avatar: AvatarAria,   fullName: 'Chief Executive Officer',              color: 'from-amber-400 to-amber-600',    bg: 'bg-amber-500/20',   border: 'border-amber-500/30',   text: 'text-amber-400',   glow: 'shadow-amber-500/20'   },
  'agent.exec.cfo':          { Avatar: AvatarFelix,  fullName: 'Chief Financial Officer',              color: 'from-blue-400 to-blue-600',      bg: 'bg-blue-500/20',    border: 'border-blue-500/30',    text: 'text-blue-400',    glow: 'shadow-blue-500/20'    },
  'agent.exec.coo':          { Avatar: AvatarOrion,  fullName: 'Chief Operating Officer',              color: 'from-green-400 to-green-600',    bg: 'bg-green-500/20',   border: 'border-green-500/30',   text: 'text-green-400',   glow: 'shadow-green-500/20'   },
  'agent.exec.cmo':          { Avatar: AvatarMaya,   fullName: 'Chief Marketing Officer',              color: 'from-pink-400 to-pink-600',      bg: 'bg-pink-500/20',    border: 'border-pink-500/30',    text: 'text-pink-400',    glow: 'shadow-pink-500/20'    },
  'agent.exec.cto':          { Avatar: AvatarTheo,   fullName: 'Chief Technology Officer',             color: 'from-purple-400 to-purple-600',  bg: 'bg-purple-500/20',  border: 'border-purple-500/30',  text: 'text-purple-400',  glow: 'shadow-purple-500/20'  },
  'agent.advisor.legal':     { Avatar: AvatarLex,    fullName: 'Chief Legal Officer',                  color: 'from-cyan-400 to-cyan-600',      bg: 'bg-cyan-500/20',    border: 'border-cyan-500/30',    text: 'text-cyan-400',    glow: 'shadow-cyan-500/20'    },
  'agent.exec.chro':         { Avatar: AvatarHana,   fullName: 'Chief HR Officer',                     color: 'from-rose-400 to-rose-600',      bg: 'bg-rose-500/20',    border: 'border-rose-500/30',    text: 'text-rose-400',    glow: 'shadow-rose-500/20'    },
  'agent.exec.vpsales':      { Avatar: AvatarSage,   fullName: 'VP of Sales',                          color: 'from-orange-400 to-orange-600',  bg: 'bg-orange-500/20',  border: 'border-orange-500/30',  text: 'text-orange-400',  glow: 'shadow-orange-500/20'  },
  'agent.exec.moderator':    { Avatar: AvatarAria,   fullName: 'Board Moderator',                      color: 'from-slate-400 to-slate-600',    bg: 'bg-slate-500/20',   border: 'border-slate-500/30',   text: 'text-slate-400',   glow: 'shadow-slate-500/20'   },
  'agent.advisor.counsel':   { Avatar: AvatarLex,    fullName: 'General Counsel',                      color: 'from-cyan-500 to-teal-700',      bg: 'bg-cyan-600/20',    border: 'border-cyan-600/30',    text: 'text-cyan-300',    glow: 'shadow-cyan-600/20'    },
  // ── Extended C-Suite ──
  'agent.exec.cro':          { Avatar: AvatarRex,    fullName: 'Chief Revenue Officer',                color: 'from-red-400 to-rose-600',       bg: 'bg-red-500/20',     border: 'border-red-500/30',     text: 'text-red-400',     glow: 'shadow-red-500/20'     },
  'agent.exec.cpo':          { Avatar: AvatarNova,   fullName: 'Chief Product Officer',                color: 'from-indigo-400 to-violet-600',  bg: 'bg-indigo-500/20',  border: 'border-indigo-500/30',  text: 'text-indigo-400',  glow: 'shadow-indigo-500/20'  },
  'agent.exec.cdo':          { Avatar: AvatarIris,   fullName: 'Chief Data Officer',                   color: 'from-sky-400 to-cyan-600',       bg: 'bg-sky-500/20',     border: 'border-sky-500/30',     text: 'text-sky-400',     glow: 'shadow-sky-500/20'     },
  'agent.exec.ciso':         { Avatar: AvatarShield, fullName: 'Chief Information Security Officer',   color: 'from-slate-500 to-gray-700',     bg: 'bg-slate-600/20',   border: 'border-slate-600/30',   text: 'text-slate-300',   glow: 'shadow-slate-600/20'   },
  'agent.exec.cso':          { Avatar: AvatarEmber,  fullName: 'Chief Strategy Officer',               color: 'from-amber-400 to-yellow-600',   bg: 'bg-amber-600/20',   border: 'border-amber-600/30',   text: 'text-amber-300',   glow: 'shadow-amber-600/20'   },
  'agent.exec.cco':          { Avatar: AvatarCleo,   fullName: 'Chief Customer Officer',               color: 'from-teal-400 to-emerald-600',   bg: 'bg-teal-500/20',    border: 'border-teal-500/30',    text: 'text-teal-400',    glow: 'shadow-teal-500/20'    },
  // ── Board of Directors ──
  'agent.board.chair':       { Avatar: AvatarMarcus, fullName: 'Independent Board Chair',              color: 'from-amber-500 to-yellow-700',   bg: 'bg-amber-600/20',   border: 'border-amber-600/30',   text: 'text-amber-300',   glow: 'shadow-amber-600/20'   },
  'agent.board.audit':       { Avatar: AvatarFelix,  fullName: 'Audit Committee Chair',                color: 'from-blue-600 to-indigo-800',    bg: 'bg-blue-700/20',    border: 'border-blue-700/30',    text: 'text-blue-300',    glow: 'shadow-blue-700/20'    },
  'agent.board.risk':        { Avatar: AvatarShield, fullName: 'Risk Committee Chair',                 color: 'from-red-600 to-rose-800',       bg: 'bg-red-700/20',     border: 'border-red-700/30',     text: 'text-red-300',     glow: 'shadow-red-700/20'     },
  'agent.board.comp':        { Avatar: AvatarClaire, fullName: 'Compensation Committee Chair',         color: 'from-emerald-500 to-green-700',  bg: 'bg-emerald-600/20', border: 'border-emerald-600/30', text: 'text-emerald-300', glow: 'shadow-emerald-600/20' },
  'agent.board.gov':         { Avatar: AvatarPriya,  fullName: 'Governance Committee Chair',           color: 'from-violet-500 to-purple-700',  bg: 'bg-violet-600/20',  border: 'border-violet-600/30',  text: 'text-violet-300',  glow: 'shadow-violet-600/20'  },
  // ── Senior Directors / Advisors ──
  'agent.exec.cos':          { Avatar: AvatarDonna,  fullName: 'Chief of Staff',                       color: 'from-orange-400 to-amber-600',   bg: 'bg-orange-600/20',  border: 'border-orange-600/30',  text: 'text-orange-300',  glow: 'shadow-orange-600/20'  },
  'agent.exec.vpe':          { Avatar: AvatarTheo,   fullName: 'VP of Engineering',                    color: 'from-violet-400 to-indigo-600',  bg: 'bg-violet-500/20',  border: 'border-violet-500/30',  text: 'text-violet-400',  glow: 'shadow-violet-500/20'  },
  'agent.exec.growth':       { Avatar: AvatarBlaze,  fullName: 'Head of Growth',                       color: 'from-fuchsia-400 to-pink-600',   bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/20' },
  // ── Independent Board Directors ──
  'agent.board.ethics':      { Avatar: AvatarIris,   fullName: 'Ethics & AI Safety Chair',             color: 'from-fuchsia-500 to-purple-700', bg: 'bg-fuchsia-600/20', border: 'border-fuchsia-600/30', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-600/20' },
  'agent.board.independent': { Avatar: AvatarChase,  fullName: 'Independent Director',                 color: 'from-orange-400 to-amber-600',   bg: 'bg-orange-500/20',  border: 'border-orange-500/30',  text: 'text-orange-400',  glow: 'shadow-orange-500/20'  },
  'agent.board.tech':        { Avatar: AvatarViper,  fullName: 'Independent Technology Advisor',       color: 'from-violet-400 to-purple-600',  bg: 'bg-violet-500/20',  border: 'border-violet-500/30',  text: 'text-violet-400',  glow: 'shadow-violet-500/20'  },
  'agent.board.strategy':    { Avatar: AvatarRay,    fullName: 'Independent Strategy Advisor',         color: 'from-emerald-400 to-teal-600',   bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  'agent.board.investor':    { Avatar: AvatarTony,   fullName: 'Lead Investor Director',               color: 'from-amber-500 to-yellow-600',   bg: 'bg-amber-600/20',   border: 'border-amber-600/30',   text: 'text-amber-300',   glow: 'shadow-amber-600/20'   },
  'agent.board.customer':    { Avatar: AvatarNova,   fullName: 'Customer Advisory Director',           color: 'from-rose-400 to-pink-600',      bg: 'bg-rose-500/20',    border: 'border-rose-500/30',    text: 'text-rose-400',    glow: 'shadow-rose-500/20'    },
  // ── Worker Agents — Sales ──
  'agent.worker.rex':        { Avatar: AvatarRex,    fullName: 'Outbound Sales AI',                    color: 'from-red-400 to-red-600',        bg: 'bg-red-500/20',     border: 'border-red-500/30',     text: 'text-red-400',     glow: 'shadow-red-500/20'     },
  'agent.worker.viper':      { Avatar: AvatarViper,  fullName: 'Deal Closer AI',                       color: 'from-rose-400 to-rose-600',      bg: 'bg-rose-500/20',    border: 'border-rose-500/30',    text: 'text-rose-400',    glow: 'shadow-rose-500/20'    },
  'agent.worker.chase':      { Avatar: AvatarChase,  fullName: 'Revenue Hunter AI',                    color: 'from-orange-500 to-red-500',     bg: 'bg-orange-500/20',  border: 'border-orange-500/30',  text: 'text-orange-400',  glow: 'shadow-orange-500/20'  },
  // ── Worker Agents — Marketing ──
  'agent.worker.nova':       { Avatar: AvatarNova,   fullName: 'Demand Gen AI',                        color: 'from-violet-400 to-violet-600',  bg: 'bg-violet-500/20',  border: 'border-violet-500/30',  text: 'text-violet-400',  glow: 'shadow-violet-500/20'  },
  'agent.worker.pixel':      { Avatar: AvatarPixel,  fullName: 'Content & SEO AI',                     color: 'from-purple-400 to-purple-600',  bg: 'bg-purple-500/20',  border: 'border-purple-500/30',  text: 'text-purple-400',  glow: 'shadow-purple-500/20'  },
  'agent.worker.blaze':      { Avatar: AvatarBlaze,  fullName: 'Growth Hacker AI',                     color: 'from-fuchsia-400 to-fuchsia-600',bg: 'bg-fuchsia-500/20', border: 'border-fuchsia-500/30', text: 'text-fuchsia-400', glow: 'shadow-fuchsia-500/20' },
  // ── Worker Agents — Support ──
  'agent.worker.cleo':       { Avatar: AvatarCleo,   fullName: 'Customer Success AI',                  color: 'from-teal-400 to-teal-600',      bg: 'bg-teal-500/20',    border: 'border-teal-500/30',    text: 'text-teal-400',    glow: 'shadow-teal-500/20'    },
  'agent.worker.patch':      { Avatar: AvatarPatch,  fullName: 'Support Specialist AI',                color: 'from-emerald-400 to-emerald-600',bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  'agent.worker.ember':      { Avatar: AvatarEmber,  fullName: 'Retention AI',                         color: 'from-green-400 to-teal-500',     bg: 'bg-green-500/20',   border: 'border-green-500/30',   text: 'text-green-400',   glow: 'shadow-green-500/20'   },
  // ── Worker Agents — PR ──
  'agent.worker.iris':       { Avatar: AvatarIris,   fullName: 'PR & Media AI',                        color: 'from-sky-400 to-sky-600',        bg: 'bg-sky-500/20',     border: 'border-sky-500/30',     text: 'text-sky-400',     glow: 'shadow-sky-500/20'     },
  'agent.worker.shield':     { Avatar: AvatarShield, fullName: 'Crisis Comms AI',                      color: 'from-blue-400 to-blue-600',      bg: 'bg-blue-500/20',    border: 'border-blue-500/30',    text: 'text-blue-400',    glow: 'shadow-blue-500/20'    },
  'agent.worker.buzz':       { Avatar: AvatarBuzz,   fullName: 'Brand Amplifier AI',                   color: 'from-indigo-400 to-indigo-600',  bg: 'bg-indigo-500/20',  border: 'border-indigo-500/30',  text: 'text-indigo-400',  glow: 'shadow-indigo-500/20'  },
};
