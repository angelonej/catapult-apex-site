import React, { useCallback, useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ZapIcon,
  DollarSignIcon,
  ClockIcon,
  UsersIcon,
  ShieldIcon,
  BrainIcon,
  RadioIcon,
  DatabaseIcon,
  NetworkIcon,
  BarChart3Icon,
  CheckCircleIcon,
  StarIcon,
  GlobeIcon,
  LockIcon,
  HeartHandshakeIcon,
  SparklesIcon,
  TrendingUpIcon,
  BuildingIcon,
  MailIcon,
  QuoteIcon,
  WrenchIcon,
  StethoscopeIcon,
  ShoppingBagIcon,
  TreesIcon,
  FileTextIcon } from
'lucide-react';
// ─── Slide registry ────────────────────────────────────────────────────────────
const SLIDES = [
'cover',
'problem',
'first-to-market',
'solution',
'market',
'traction',
'user-stories',
'platform',
'business-model',
'moat',
'proof',
'employee-first',
'roadmap',
'ask',
'team',
'tear-sheet'] as
const;
type SlideId = (typeof SLIDES)[number];
const SLIDE_TITLES: Record<SlideId, string> = {
  cover: 'Cover',
  problem: 'Problem',
  'first-to-market': 'First-to-Market',
  solution: 'Solution',
  market: 'Market',
  traction: 'Pilot Results',
  'user-stories': 'Impact Stories',
  platform: 'Platform',
  'business-model': 'Business Model',
  moat: 'Moat',
  proof: 'Proof',
  'employee-first': 'People First',
  roadmap: 'Roadmap',
  ask: 'The Ask',
  team: 'Team',
  'tear-sheet': 'Tear Sheet'
};
// ─── Primitives ────────────────────────────────────────────────────────────────
const Badge = ({
  children,
  color = 'accent'



}: {children: React.ReactNode;color?: string;}) => {
  const colorMap: Record<string, string> = {
    accent: 'bg-orange-500/20 border-orange-500/40 text-orange-300',
    red: 'bg-red-500/20 border-red-500/40 text-red-300',
    green: 'bg-green-500/20 border-green-500/40 text-green-300',
    gold: 'bg-yellow-500/20 border-yellow-500/40 text-yellow-300',
    blue: 'bg-blue-500/20 border-blue-500/40 text-blue-300',
    purple: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    pink: 'bg-pink-500/20 border-pink-500/40 text-pink-300',
    cyan: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
  };
  return (
    <div
      className={`inline-flex items-center gap-2 border rounded-full px-4 py-1.5 mb-5 ${colorMap[color] || colorMap.accent}`}>

      <span className="text-xs font-bold uppercase tracking-widest">
        {children}
      </span>
    </div>);

};
// ─── Slides ────────────────────────────────────────────────────────────────────
function SlideCover() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.14, 0.06]
          }}
          transition={{
            duration: 10,
            repeat: Infinity
          }}
          className="absolute -top-40 -left-40 w-[700px] h-[700px] bg-orange-600 rounded-full blur-[160px]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.1, 0.04]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: 4
          }}
          className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-yellow-600 rounded-full blur-[160px]" />

      </div>
      <motion.div
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.9
        }}
        className="relative z-10">

        <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-5 py-2 mb-8">
          <motion.div
            animate={{
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
            className="w-2 h-2 bg-yellow-400 rounded-full" />

          <span className="text-sm font-bold text-yellow-300 uppercase tracking-widest">
            Strategic Partnership Deck · Founded 2026
          </span>
        </div>
        <h1 className="text-6xl lg:text-8xl font-black text-white mb-4 leading-[0.9] tracking-tight">
          AI Management
          <br />
          <span className="text-orange-400">As a Product.</span>
          <br />
          <span className="text-yellow-400">For Every Business.</span>
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed">
          AI-managed companies are being funded. Catapult is the first to make
          it a{' '}
          <span className="text-white font-semibold">deployable product</span> —
          so any SMB can have an AI executive team in 5 minutes.
          <br />
          <span className="text-slate-400 text-base mt-2 block">
            Built and operated by{' '}
            <span className="text-white font-semibold">Cognitect Labs</span> —
            who run their own company on it.
          </span>
        </p>
        <div className="mt-5 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-2">
          <CheckCircleIcon className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-300 font-semibold">
            No CapEx required from partners — platform is fully built and
            operational
          </span>
        </div>
        <div className="flex items-center justify-center gap-8 mt-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ZapIcon className="w-4 h-4 text-orange-400" />
            <span>Catapult Company</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <BrainIcon className="w-4 h-4 text-yellow-400" />
            <span>Managed by Cognitect Labs AI</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-2">
            <GlobeIcon className="w-4 h-4 text-green-400" />
            <span>Deploying Globally · 2026</span>
          </div>
        </div>
      </motion.div>
    </div>);

}
function SlideProblem() {
  const pains = [
  {
    stat: '60%',
    label:
    'of SMB owner time spent on operations & admin — not growing the business',
    icon: ClockIcon,
    color: 'text-red-400',
    source: 'SBA Office of Advocacy, 2023 Small Business Profile'
  },
  {
    stat: '$5T+',
    label:
    'estimated annual productivity loss from inefficient management in SMBs globally',
    icon: DollarSignIcon,
    color: 'text-orange-400',
    source:
    'McKinsey Global Institute, "The Future of Work" 2023 (global estimate)'
  },
  {
    stat: '82%',
    label:
    'of businesses that fail cite cash flow problems as a contributing factor',
    icon: BarChart3Icon,
    color: 'text-yellow-400',
    source:
    'U.S. Bank Study (Jessie Hagen, cited widely); SCORE 2023 corroborates'
  },
  {
    stat: '$350K+',
    label:
    'annual fully-loaded cost of a single human C-suite executive — unaffordable for SMBs',
    icon: UsersIcon,
    color: 'text-red-300',
    source:
    'BLS Occupational Outlook Handbook, 2023–24; includes salary + benefits + overhead'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="red">The Problem</Badge>
        <h2 className="text-5xl lg:text-7xl font-black text-white mb-4 leading-tight">
          SMBs need executive leadership.
          <br />
          <span className="text-red-400">They can't afford it.</span>
        </h2>
        <p className="text-xl text-slate-400 mb-10 max-w-3xl">
          400 million small businesses globally operate without a CFO, COO, or
          CMO. Owners make $350K/year decisions with $0/year management
          infrastructure. The result is predictable.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {pains.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.stat}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.2 + i * 0.1
                }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5">

                <Icon className={`w-6 h-6 ${p.color} mb-3`} />
                <p className={`text-4xl font-black ${p.color} mb-1`}>
                  {p.stat}
                </p>
                <p className="text-xs text-slate-300 leading-tight mb-2">
                  {p.label}
                </p>
                <p className="text-xs text-slate-600 italic">{p.source}</p>
              </motion.div>);

          })}
        </div>
      </motion.div>
    </div>);

}
function SlideFirstToMarket() {
  const claims = [
  {
    number: '01',
    title: 'First Full AI C-Suite as a Deployable Product',
    desc: "AI-native tools exist (Salesforce Einstein, Microsoft Copilot, Relevance AI, Lindy, Ema). None package a full C-suite — CEO, COO, CFO, CMO, CTO, CLO — as a single deployable product for any SMB in under 5 minutes. The category of 'AI management tools' exists. A unified AI executive team as a product did not. Until now.",
    color: 'text-orange-400',
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/30'
  },
  {
    number: '02',
    title: 'First Edge AI + Management Platform',
    desc: 'The only platform combining proprietary on-site edge AI hardware (Guide Beacons) with cloud-based AI executive agents for business management. Edge AI devices exist (NVIDIA Jetson, Google Coral). AI management tools exist. No competitor integrates both in a single system.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30'
  },
  {
    number: '03',
    title: 'First On-Chain AI Executive Decision Audit',
    desc: 'AI governance tools exist (IBM OpenPages, various compliance platforms). Blockchain audit trails exist. No business management platform immutably records every AI executive decision on-chain as a tamper-proof, independently verifiable audit trail. Scoped to: AI C-suite decisions in business management.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30'
  },
  {
    number: '04',
    title: 'First Outcome-Linked AI C-Suite Subscription',
    desc: 'Outcome-based pricing exists in SaaS broadly (Gong, some sales tools). No AI executive management platform ties subscription pricing directly to measurable business outcomes delivered — not just software access. The model is new within this specific category.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30'
  },
  {
    number: '05',
    title: 'First SMB Workflow → Humanoid-Ready Skill Transfer',
    desc: 'RPA tools (UiPath, Automation Anywhere) capture human workflows commercially. What is new: Guide Beacons encode SMB workflows as structured Skill Transfer Packets designed to be directly consumable by humanoid robot systems. No commercial system targets this specific pipeline from SMB operations to embodied AI.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30'
  },
  {
    number: '06',
    title: 'First Persistent AI Executive Identity with Avatar',
    desc: 'AI avatar technology exists (HeyGen, Synthesia, Tavus, Soul Machines). What is new: each AI executive has a persistent, named, role-specific identity — not a generic chatbot or one-off video. The AI CFO is always the same presence, runs meetings, presents reports, and addresses staff consistently. Identity-as-a-management-layer is the novel claim.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="accent">First-to-Market Advantages</Badge>
        <h2 className="text-4xl lg:text-6xl font-black text-white mb-3 leading-tight">
          Six specific categories.
          <br />
          <span className="text-orange-400">Each precisely scoped.</span>
        </h2>
        <p className="text-base text-slate-400 mb-6">
          We acknowledge what exists. Our claims are scoped to the specific
          combination no competitor has assembled. Each description names the
          nearest competitors so you can verify independently.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {claims.map((c, i) =>
          <motion.div
            key={c.number}
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.1 + i * 0.08
            }}
            className={`${c.bg} border ${c.border} rounded-2xl p-4`}>

              <p className={`text-xs font-black ${c.color} mb-1`}>{c.number}</p>
              <p className="text-sm font-bold text-white mb-1">{c.title}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
            </motion.div>
          )}
        </div>
        <div className="mt-3 bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
          <p className="text-xs text-slate-500">
            "First-to-market" claims are scoped to the specific combination
            described, not the individual components. Nearest competitors are
            named in each claim for independent verification. These are
            category-creation claims, not feature claims.
          </p>
        </div>
      </motion.div>
    </div>);

}
function SlideSolution() {
  const execs = [
  {
    role: 'CEO',
    color: 'from-yellow-400 to-yellow-600',
    action: 'Coaches team, drives personal development & vision',
    avatar: true
  },
  {
    role: 'COO',
    color: 'from-green-400 to-green-600',
    action: 'Runs operations, schedules, logistics',
    avatar: true
  },
  {
    role: 'CFO',
    color: 'from-blue-400 to-blue-600',
    action: 'Cash flow, billing, financial forecasting',
    avatar: true
  },
  {
    role: 'CMO',
    color: 'from-pink-400 to-pink-600',
    action: 'Marketing, campaigns, customer acquisition',
    avatar: true
  },
  {
    role: 'CTO',
    color: 'from-purple-400 to-purple-600',
    action: 'Automates workflows, manages tech stack',
    avatar: false
  },
  {
    role: 'CLO',
    color: 'from-cyan-400 to-cyan-600',
    action: 'Compliance, contracts, regulatory flags',
    avatar: false
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="accent">The Solution</Badge>
        <h2 className="text-5xl lg:text-7xl font-black text-white mb-3 leading-tight">
          Your AI C-suite,
          <br />
          <span className="text-orange-400">deployed in 5 minutes.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6 max-w-3xl">
          Each AI executive has a photorealistic talking head avatar, autonomous
          decision authority, blockchain-verified actions, and outcome-based
          pricing. They hold meetings, present reports, and address your team —
          just like a human executive.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {execs.map((e, i) =>
          <motion.div
            key={e.role}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.15 + i * 0.08
            }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">

              <div
              className={`w-10 h-10 bg-gradient-to-br ${e.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg relative`}>

                <span className="text-white font-black text-sm">
                  {e.role[0]}
                </span>
                {e.avatar &&
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <span className="text-slate-900 text-[6px] font-black">
                      ▶
                    </span>
                  </div>
              }
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-white">{e.role}</p>
                  {e.avatar &&
                <span className="text-xs text-green-400 font-semibold">
                      + Avatar
                    </span>
                }
                </div>
                <p className="text-xs text-slate-400">{e.action}</p>
              </div>
            </motion.div>
          )}
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-3 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-green-300">
            <CheckCircleIcon className="w-4 h-4" />
            <span>AI/AGI talking head for every executive role</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-300">
            <CheckCircleIcon className="w-4 h-4" />
            <span>Holds video meetings with your team</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-yellow-300">
            <CheckCircleIcon className="w-4 h-4" />
            <span>Presents reports in natural language</span>
          </div>
        </div>
      </motion.div>
    </div>);

}
function SlideMarket() {
  const topVerticals = [
  {
    name: 'Financial Advisory & RIAs',
    tam: '$28B',
    color: 'text-emerald-400',
    icon: '📈'
  },
  {
    name: 'Accounting & CPA Firms',
    tam: '$18B',
    color: 'text-blue-400',
    icon: '🧾'
  },
  {
    name: 'Investment Banking (Boutique)',
    tam: '$12B',
    color: 'text-slate-300',
    icon: '🏦'
  },
  {
    name: 'Medical & Dental Practices',
    tam: '$31B',
    color: 'text-rose-400',
    icon: '🏥'
  },
  {
    name: 'Law Firms & Legal Services',
    tam: '$22B',
    color: 'text-purple-400',
    icon: '⚖️'
  },
  {
    name: 'Real Estate Brokerages',
    tam: '$15B',
    color: 'text-amber-400',
    icon: '🏠'
  },
  {
    name: 'Construction & Contracting',
    tam: '$19B',
    color: 'text-orange-400',
    icon: '🏗️'
  },
  {
    name: 'Logistics & Freight',
    tam: '$14B',
    color: 'text-indigo-400',
    icon: '🚛'
  },
  {
    name: 'Restaurants & Hospitality',
    tam: '$11B',
    color: 'text-red-400',
    icon: '🍽️'
  },
  {
    name: 'E-commerce & Retail',
    tam: '$16B',
    color: 'text-cyan-400',
    icon: '🛍️'
  },
  {
    name: 'Staffing & HR Services',
    tam: '$9B',
    color: 'text-violet-400',
    icon: '👥'
  },
  {
    name: 'Trades (HVAC, Auto, etc.)',
    tam: '$5B',
    color: 'text-green-400',
    icon: '🔧'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="green">Market Opportunity</Badge>
        <h2 className="text-4xl lg:text-6xl font-black text-white mb-4 leading-tight">
          A <span className="text-green-400">$200B+</span> market
          <br />
          forming across 12 verticals.
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
          {[
          {
            label: 'TAM',
            value: '$200B+',
            desc: 'Global AI-in-business market by 2030 — McKinsey, Goldman Sachs, IDC convergent estimates',
            color: 'from-green-500/20 to-green-600/10',
            border: 'border-green-500/30',
            text: 'text-green-400'
          },
          {
            label: 'SAM',
            value: '$34B',
            desc: 'SMBs with 5–500 employees in English-speaking markets actively adopting AI operations tools',
            color: 'from-blue-500/20 to-blue-600/10',
            border: 'border-blue-500/30',
            text: 'text-blue-400'
          },
          {
            label: 'SOM',
            value: '$4.2B',
            desc: 'Reachable by 2028 via partner deployment channels at current conversion rates',
            color: 'from-orange-500/20 to-orange-600/10',
            border: 'border-orange-500/30',
            text: 'text-orange-400'
          }].
          map((m, i) =>
          <motion.div
            key={m.label}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2 + i * 0.1
            }}
            className={`bg-gradient-to-br ${m.color} border ${m.border} rounded-2xl p-5`}>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                {m.label}
              </p>
              <p className={`text-4xl font-black ${m.text} mb-1`}>{m.value}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
            </motion.div>
          )}
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Top TAM Categories
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {topVerticals.map((v, i) =>
          <motion.div
            key={v.name}
            initial={{
              opacity: 0,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.3 + i * 0.04
            }}
            className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 flex items-center justify-between gap-2">

              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm flex-shrink-0">{v.icon}</span>
                <span className="text-xs text-slate-300 truncate">
                  {v.name}
                </span>
              </div>
              <span className={`text-xs font-black ${v.color} flex-shrink-0`}>
                {v.tam}
              </span>
            </motion.div>
          )}
        </div>
        <div className="mt-3 bg-white/5 border border-white/10 rounded-xl p-2.5 text-center">
          <p className="text-xs text-slate-500">
            Market sizing based on convergent estimates from McKinsey Global
            Institute, Goldman Sachs AI Report 2024, IDC AI Spending Guide 2025.
            TAM represents total global AI-in-business-management software
            opportunity by 2030. SAM represents English-speaking SMBs (5–500
            employees) actively adopting AI ops tools. Vertical TAMs represent
            AI management software addressable opportunity within each category.
            All figures are forward-looking estimates; actual market may differ
            materially.
          </p>
        </div>
      </motion.div>
    </div>);

}
function SlideTraction() {
  const metrics = [
  {
    value: '12',
    label: 'Design Partners (Pilot)',
    color: 'text-orange-400',
    sub: 'across 6 industries · verified',
    tag: 'VERIFIED'
  },
  {
    value: '$38K',
    label: 'Avg Projected Weekly ROI',
    color: 'text-green-400',
    sub: 'based on pilot partner data',
    tag: 'PILOT DATA'
  },
  {
    value: '91%',
    label: 'Decision Approval Rate',
    color: 'text-yellow-400',
    sub: 'in pilot program · human-validated',
    tag: 'VERIFIED'
  },
  {
    value: '23 hrs',
    label: 'Avg Time Saved/Week',
    color: 'text-blue-400',
    sub: 'per pilot partner business',
    tag: 'VERIFIED'
  },
  {
    value: '99.8%',
    label: 'Target Agent Uptime SLA',
    color: 'text-purple-400',
    sub: 'contractual SLA commitment',
    tag: 'COMMITTED'
  },
  {
    value: '< 5 min',
    label: 'Deployment Time',
    color: 'text-pink-400',
    sub: 'verified in all pilot deployments',
    tag: 'VERIFIED'
  }];

  const tagColors: Record<string, string> = {
    VERIFIED: 'bg-green-500/20 text-green-400',
    'PILOT DATA': 'bg-blue-500/20 text-blue-400',
    COMMITTED: 'bg-yellow-500/20 text-yellow-400',
    PROJECTED: 'bg-orange-500/20 text-orange-400'
  };
  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="gold">Pilot Program Results · 2026</Badge>
        <h2 className="text-5xl lg:text-7xl font-black text-white mb-3 leading-tight">
          Early data.
          <br />
          <span className="text-yellow-400">Exceptional signal.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6">
          All metrics are labeled by source type. We believe in radical
          transparency — every claim is tagged as verified pilot data, committed
          SLA, or projected based on pilot.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, i) =>
          <motion.div
            key={m.label}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.1 + i * 0.08
            }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <div className="flex items-start justify-between mb-2">
                <p className={`text-4xl font-black ${m.color}`}>{m.value}</p>
                <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${tagColors[m.tag]}`}>

                  {m.tag}
                </span>
              </div>
              <p className="text-sm font-semibold text-white">{m.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{m.sub}</p>
            </motion.div>
          )}
        </div>
        <div className="mt-4 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
          <p className="text-sm text-slate-300">
            <span className="text-white font-bold">
              Transparency commitment:
            </span>{' '}
            All metrics in this deck are labeled. We don't inflate projections
            as facts. Our blockchain audit trail makes every claim independently
            verifiable.
          </p>
        </div>
      </motion.div>
    </div>);

}
function SlideUserStories() {
  const stories = [
  {
    icon: WrenchIcon,
    industry: 'HVAC · 18 employees',
    name: 'Maria R., Owner',
    quote:
    'Before Catapult, I spent every Sunday doing invoices and chasing late payments. My AI CFO now handles billing, collections, and cash flow forecasting automatically. I got my Sundays back — and my stress went from a 9 to a 3.',
    impact: [
    {
      label: 'Time reclaimed',
      value: '14 hrs/wk'
    },
    {
      label: 'AR recovery',
      value: '+$6,200/mo'
    },
    {
      label: 'Late payments',
      value: '↓ 78%'
    }],

    color: 'from-blue-500/20 to-blue-600/10',
    border: 'border-blue-500/30',
    accent: 'text-blue-400'
  },
  {
    icon: TreesIcon,
    industry: 'Landscaping · 32 employees',
    name: 'James T., Owner',
    quote:
    "My AI COO schedules 12 crews across 3 counties. It saved us $4,200 last week alone by optimizing routes and flagging a scheduling conflict before it became a $3K no-show. I haven't touched a schedule in 3 months.",
    impact: [
    {
      label: 'Weekly savings',
      value: '$4,200'
    },
    {
      label: 'Scheduling time',
      value: '↓ 100%'
    },
    {
      label: 'Crew efficiency',
      value: '+31%'
    }],

    color: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/30',
    accent: 'text-green-400'
  },
  {
    icon: StethoscopeIcon,
    industry: 'Medical Practice · 8 staff',
    name: 'Dr. Chen, Practice Owner',
    quote:
    'Our AI CLO flagged a HIPAA compliance gap three weeks before our audit. It would have cost us $50K in fines and potentially our license. The AI paid for itself in a single decision. Now it monitors compliance 24/7.',
    impact: [
    {
      label: 'Fines avoided',
      value: '$50K'
    },
    {
      label: 'Compliance checks',
      value: '24/7'
    },
    {
      label: 'Audit result',
      value: 'Clean pass'
    }],

    color: 'from-purple-500/20 to-purple-600/10',
    border: 'border-purple-500/30',
    accent: 'text-purple-400'
  },
  {
    icon: ShoppingBagIcon,
    industry: 'E-commerce Brand · 1 employee',
    name: 'Sarah K., Founder',
    quote:
    "My AI CMO ran 14 A/B tests last month and grew our email revenue 34%. I have one employee — me. But I compete like I have a marketing team of 20. My competitors have no idea how I'm outpacing them.",
    impact: [
    {
      label: 'Email revenue',
      value: '+34%'
    },
    {
      label: 'A/B tests run',
      value: '14/mo'
    },
    {
      label: 'Team size',
      value: '1 person'
    }],

    color: 'from-pink-500/20 to-pink-600/10',
    border: 'border-pink-500/30',
    accent: 'text-pink-400'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="gold">Real Impact · Pilot Partner Stories</Badge>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-2 leading-tight">
          The numbers are real.
          <br />
          <span className="text-yellow-400">
            So are the people behind them.
          </span>
        </h2>
        <p className="text-base text-slate-400 mb-5">
          Four pilot partners. Four industries. One consistent outcome: AI
          management gives small business owners their lives back.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {stories.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{
                  opacity: 0,
                  y: 15
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.1 + i * 0.1
                }}
                className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-4`}>

                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={`w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0`}>

                    <Icon className={`w-4 h-4 ${s.accent}`} />
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold ${s.accent} uppercase tracking-wide`}>

                      {s.industry}
                    </p>
                    <p className="text-sm font-bold text-white">{s.name}</p>
                  </div>
                  <QuoteIcon className="w-5 h-5 text-white/10 ml-auto flex-shrink-0" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3 italic">
                  "{s.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                  {s.impact.map((imp) =>
                  <div key={imp.label} className="text-center flex-1">
                      <p className={`text-sm font-black ${s.accent}`}>
                        {imp.value}
                      </p>
                      <p className="text-xs text-slate-500">{imp.label}</p>
                    </div>
                  )}
                </div>
              </motion.div>);

          })}
        </div>
      </motion.div>
    </div>);

}
function SlidePlatform() {
  const layers = [
  {
    name: 'Quantum Augmentation Layer',
    desc: 'Optimization + probabilistic forecasting',
    color: 'bg-purple-500',
    badge: 'Roadmap 2028'
  },
  {
    name: 'Global Intelligence Cloud',
    desc: 'Cross-industry learning network — more users = smarter agents',
    color: 'bg-blue-500',
    badge: 'Active'
  },
  {
    name: 'Blockchain Trust Layer',
    desc: 'Immutable audit trail + zero-trust agent verification',
    color: 'bg-green-500',
    badge: 'Active'
  },
  {
    name: 'CatapultOS Control Layer',
    desc: 'Agent orchestration, workflow engine, decision governance',
    color: 'bg-yellow-500',
    badge: 'Active'
  },
  {
    name: 'Zello PTT Bridge',
    desc: 'Push-to-talk voice → Guide Beacon capture → APEX Engine routing',
    color: 'bg-emerald-500',
    badge: 'Active'
  },
  {
    name: 'Guide Beacon Edge Devices',
    desc: 'On-site AI hardware — local cognition, offline execution, sensing',
    color: 'bg-orange-500',
    badge: 'Active'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="accent">Technology Platform</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
          5-layer architecture.
          <br />
          <span className="text-orange-400">No partner CapEx required.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6">
          The platform is fully built and operational. Partners deploy to their
          customer base — no software development, no Guide Beacon manufacturing
          investment, no AI/AGI infrastructure buildout required.
        </p>
        <div className="space-y-2 mb-5">
          {layers.map((l, i) =>
          <motion.div
            key={l.name}
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: 0.15 + i * 0.1
            }}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-4 py-3">

              <div
              className={`w-3 h-3 ${l.color} rounded-full flex-shrink-0`} />

              <div className="flex-1">
                <span className="font-bold text-white text-sm">{l.name}</span>
                <span className="text-slate-400 text-sm ml-2">— {l.desc}</span>
              </div>
              <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${l.badge === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>

                {l.badge}
              </span>
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[
          {
            label: 'Zero Partner CapEx',
            icon: '💰',
            desc: 'No dev, hardware, or AI investment'
          },
          {
            label: 'Zello PTT Bridge',
            icon: '📻',
            desc: 'Field voice becomes AI action instantly'
          },
          {
            label: 'AI Talking Heads',
            icon: '🎭',
            desc: 'Photorealistic exec avatars included'
          },
          {
            label: 'Humanoid-Ready',
            icon: '🤖',
            desc: 'Skill Transfer Packets for robots'
          }].
          map((f) =>
          <div
            key={f.label}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">

              <div className="text-2xl mb-1">{f.icon}</div>
              <p className="text-xs font-bold text-white">{f.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{f.desc}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>);

}
function SlideBusinessModel() {
  const tiers = [
  {
    name: 'Freemium',
    price: '$0',
    unit: 'forever',
    color: 'border-slate-500/30',
    desc: '1 AI exec, basic features, community access',
    highlight: false
  },
  {
    name: 'Starter',
    price: '$499',
    unit: '/exec/month',
    color: 'border-blue-500/30',
    desc: 'Up to 3 execs, full features, priority support',
    highlight: false
  },
  {
    name: 'Growth',
    price: '$1,999',
    unit: '/month',
    color: 'border-orange-500/50',
    desc: 'Up to 9 execs, all features, AI avatars',
    highlight: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    unit: 'contact sales',
    color: 'border-purple-500/30',
    desc: 'Unlimited, white-label, SLA, on-premise',
    highlight: false
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="green">Business Model</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
          Value-based SaaS.
          <br />
          <span className="text-green-400">Priced on outcomes, not seats.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6">
          Subscription tiers based on team size and features. Performance
          bonuses reduce effective cost when agents exceed targets — aligning
          our incentives with customer success.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {tiers.map((t, i) =>
          <motion.div
            key={t.name}
            initial={{
              opacity: 0,
              y: 15
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.1 + i * 0.08
            }}
            className={`bg-white/5 border-2 ${t.color} rounded-2xl p-4 ${t.highlight ? 'ring-2 ring-orange-500/50' : ''}`}>

              {t.highlight &&
            <div className="text-xs font-bold text-orange-400 mb-2">
                  ★ Most Popular
                </div>
            }
              <p className="text-xs text-slate-400 mb-1">{t.name}</p>
              <p className="text-3xl font-black text-white">{t.price}</p>
              <p className="text-xs text-slate-500">{t.unit}</p>
              <p className="text-xs text-slate-300 mt-2">{t.desc}</p>
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
          {
            label: 'Target LTV:CAC',
            value: '18:1',
            color: 'text-green-400',
            sub: 'based on pilot unit economics',
            tag: 'PROJECTED'
          },
          {
            label: 'Target NRR',
            value: '140%+',
            color: 'text-orange-400',
            sub: 'customers expand agent usage over time',
            tag: 'PROJECTED'
          },
          {
            label: 'Avg Payback Period',
            value: '< 3 mo',
            color: 'text-yellow-400',
            sub: 'based on pilot partner data',
            tag: 'PILOT DATA'
          }].
          map((s) =>
          <div
            key={s.label}
            className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">

              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs font-semibold text-white mt-1">{s.label}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
              <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1 inline-block ${s.tag === 'PROJECTED' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>

                {s.tag}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>);

}
function SlideMoat() {
  const moats = [
  {
    icon: RadioIcon,
    title: 'Hardware Moat',
    desc: 'Guide Beacon devices: custom silicon, 18+ months to replicate, exclusive sensor arrays',
    color: 'text-orange-400',
    bg: 'bg-orange-500/10'
  },
  {
    icon: DatabaseIcon,
    title: 'Data Flywheel',
    desc: 'Behavioral data from design partners compounds daily — a dataset no competitor can buy',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10'
  },
  {
    icon: NetworkIcon,
    title: 'Network Effects',
    desc: 'Cross-industry learning: landscaping insights improve HVAC, medical patterns help legal',
    color: 'text-green-400',
    bg: 'bg-green-500/10'
  },
  {
    icon: LockIcon,
    title: 'Switching Costs',
    desc: 'Custom agent training + 20+ integrations + Skill Transfer Packets = deep lock-in at 90 days',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10'
  },
  {
    icon: ShieldIcon,
    title: 'Regulatory Fortress',
    desc: 'SOC2 Type II + HIPAA + blockchain audit = 3-year compliance moat for regulated industries',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="red">Competitive Moat</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
          5 structural barriers.
          <br />
          <span className="text-red-400">Each one compounds the others.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-8">
          Hardware + data flywheel + network effects + switching costs +
          regulatory compliance = a winner-take-most dynamic. Replication cost:
          $50M+ and 3–5 years.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-5">
          {moats.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.1 + i * 0.1
                }}
                className={`${m.bg} border border-white/10 rounded-2xl p-4`}>

                <Icon className={`w-6 h-6 ${m.color} mb-3`} />
                <p className="text-sm font-bold text-white mb-1">{m.title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </motion.div>);

          })}
        </div>
        <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-4 grid grid-cols-3 gap-4 text-center">
          {[
          {
            label: 'To replicate hardware',
            value: '18 months',
            color: 'text-red-400'
          },
          {
            label: 'Capital required',
            value: '$50M+',
            color: 'text-orange-400'
          },
          {
            label: 'Data gap',
            value: 'Unbridgeable',
            color: 'text-yellow-400'
          }].
          map((s) =>
          <div key={s.label}>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>);

}
function SlideProof() {
  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="gold">Proof of Concept</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          We don't just sell it.
          <br />
          <span className="text-yellow-400">We are the product.</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-2xl p-6">
            <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">
              The Cognitect Labs Model — Live Since 2026
            </p>
            <p className="text-slate-200 leading-relaxed mb-4">
              Cognitect Labs built Catapult and immediately deployed it to run{' '}
              <strong className="text-white">Catapult Company itself</strong>.
              Every strategic decision, financial operation, marketing campaign,
              and operational workflow is managed by AI executives — with
              Cognitect's human team as the strategic oversight layer only.
            </p>
            <div className="space-y-2">
              {[
              'CEO Agent: sets quarterly strategy and identifies opportunities',
              'CFO Agent: manages all financial operations and forecasting',
              'COO Agent: runs platform operations 24/7 with AI talking head',
              'CMO Agent: drives all customer acquisition and campaigns',
              'Human team: vision, partnerships, and strategic oversight only'].
              map((item, i) =>
              <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircleIcon className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                  <span className="text-slate-200">{item}</span>
                </div>
              )}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                Why This Matters to Partners
              </p>
              <div className="space-y-3">
                {[
                {
                  title: 'Skin in the game',
                  desc: "Our company's survival depends on the platform performing"
                },
                {
                  title: 'Living demonstration',
                  desc: "Every partner can observe Catapult Company's AI team in real-time"
                },
                {
                  title: 'Aligned incentives',
                  desc: "Cognitect's success = Catapult's success = partner's success"
                },
                {
                  title: 'Fastest feedback loop',
                  desc: 'We find and fix issues before any customer encounters them'
                }].
                map((item, i) =>
                <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-black text-yellow-400">
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
              <p className="text-3xl font-black text-green-400 mb-1">$0</p>
              <p className="text-sm text-slate-300 font-semibold">
                Management overhead at Catapult Company
              </p>
              <p className="text-xs text-slate-500 mt-1">
                AI executive team handles 100% of operational decisions
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>);

}
function SlideEmployeeFirst() {
  const principles = [
  {
    icon: HeartHandshakeIcon,
    title: 'AI Manages. Humans Lead People.',
    desc: 'When AI handles scheduling, compliance, billing, and reporting — human managers are freed to do what only humans can: mentor, develop, and genuinely serve their teams.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/30'
  },
  {
    icon: SparklesIcon,
    title: 'Extreme Service to Employees',
    desc: "Catapult's management philosophy: AI executives exist to serve employees, not surveil them. Every agent decision is optimized for employee wellbeing and growth, not just efficiency.",
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30'
  },
  {
    icon: ClockIcon,
    title: 'Time Bought Back for Everyone',
    desc: 'The "time bought back" metric applies to employees too. When AI handles admin, employees reclaim hours for creative work, skill development, and personal growth.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30'
  },
  {
    icon: TrendingUpIcon,
    title: 'Human Potential Amplified',
    desc: 'AI executives identify employee strengths, recommend training, flag burnout risk, and ensure equitable workload distribution — creating the most supportive workplace in history.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="pink">People-First Philosophy</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
          AI manages the business.
          <br />
          <span className="text-pink-400">Humans serve the people.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-8 max-w-3xl">
          The most radical thing about Catapult isn't the technology — it's the
          management philosophy. AI executives exist to create the conditions
          for human flourishing, not to replace human connection.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{
                  opacity: 0,
                  x: i % 2 === 0 ? -15 : 15
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.15 + i * 0.1
                }}
                className={`${p.bg} border ${p.border} rounded-2xl p-5 flex items-start gap-4`}>

                <Icon className={`w-6 h-6 ${p.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <p className="font-bold text-white mb-1">{p.title}</p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>);

          })}
        </div>
        <div className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-2xl p-4 text-center">
          <p className="text-white font-bold text-lg">
            "The best manager is one who makes themselves unnecessary — so they
            can focus entirely on the people."
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Catapult Company Management Philosophy · Founded 2026
          </p>
        </div>
      </motion.div>
    </div>);

}
function SlideRoadmap() {
  const milestones = [
  {
    year: '2026',
    label: 'Platform Launch',
    desc: 'Catapult Company goes live. First AI-managed company. 12 design partners. Guide Beacon v1 deployed.',
    color: 'bg-orange-500',
    status: 'NOW',
    active: true
  },
  {
    year: '2026',
    label: 'Partner Deployment',
    desc: '3–5 strategic partners deploy to their customer bases. First 1,000 businesses on platform.',
    color: 'bg-yellow-500',
    status: 'Q3 2026',
    active: false
  },
  {
    year: '2027',
    label: 'Global Scale',
    desc: 'Partner network in 20+ countries. 50,000 businesses. Guide Beacon v2 with enhanced sensing.',
    color: 'bg-green-500',
    status: 'PLANNED',
    active: false
  },
  {
    year: '2028',
    label: 'Embodied AI',
    desc: 'Behavioral datasets at scale. Skill Transfer Packets. First humanoid robot partnerships announced.',
    color: 'bg-blue-500',
    status: 'PLANNED',
    active: false
  },
  {
    year: '2030',
    label: 'Humanoid Integration',
    desc: 'Physical AI workers consuming Catapult Skill Transfer Packets. Human-robot hybrid teams.',
    color: 'bg-purple-500',
    status: 'VISION',
    active: false
  },
  {
    year: '2032',
    label: 'Autonomous Enterprise',
    desc: 'Fully autonomous business operations. The post-management company becomes the standard.',
    color: 'bg-pink-500',
    status: 'VISION',
    active: false
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="purple">Roadmap · Founded 2026</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
          From launch to
          <br />
          <span className="text-purple-400">autonomous enterprise.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6">
          We're not building a feature. We're building the infrastructure for
          how every company will be run by 2032.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {milestones.map((m, i) =>
          <motion.div
            key={`${m.year}-${m.label}`}
            initial={{
              opacity: 0,
              y: 15
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.1 + i * 0.08
            }}
            className={`flex items-start gap-3 rounded-2xl p-4 border ${m.active ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/5 border-white/10'}`}>

              <div
              className={`w-10 h-10 ${m.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                <span className="text-white font-black text-xs">
                  {m.year.slice(2)}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  <p className="font-bold text-white text-sm">{m.label}</p>
                  <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded-full ${m.active ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-slate-400'}`}>

                    {m.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>);

}
function SlideAsk() {
  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="accent">The Partnership Ask</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          Zero CapEx. Zero development.
          <br />
          <span className="text-orange-400">Pure deployment partnership.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6 max-w-3xl">
          The platform is built. The AI team is running. The proof is live. We
          need partners who bring distribution — not capital for development,
          software, hardware, or AI infrastructure.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
          {[
          {
            title: 'What Partners Receive',
            color: 'border-orange-500/30',
            bg: 'bg-orange-500/10',
            items: [
            'Revenue share on all deployed customers',
            'Equity stake in Catapult Company',
            'White-label deployment rights',
            'Co-branding in target markets',
            'Board observer seat option']

          },
          {
            title: 'What Partners Bring',
            color: 'border-yellow-500/30',
            bg: 'bg-yellow-500/10',
            items: [
            'Existing customer base / distribution',
            'Industry domain expertise',
            'Regional or vertical market access',
            'Enterprise relationships',
            'Capital for market expansion only']

          },
          {
            title: 'What Partners Never Pay For',
            color: 'border-green-500/30',
            bg: 'bg-green-500/10',
            items: [
            'Software development (built)',
            'Guide Beacon manufacturing (built)',
            'AI/AGI infrastructure (built)',
            'Talking head avatar system (built)',
            'Blockchain audit layer (built)']

          }].
          map((col, i) =>
          <motion.div
            key={col.title}
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.2 + i * 0.1
            }}
            className={`${col.bg} border ${col.color} rounded-2xl p-5`}>

              <p className="text-sm font-bold text-white mb-3">{col.title}</p>
              <div className="space-y-2">
                {col.items.map((item) =>
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-200">

                    <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    {item}
                  </div>
              )}
              </div>
            </motion.div>
          )}
        </div>
        <div className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-4 text-center">
          <p className="text-white font-bold text-lg mb-1">
            Seeking 3–5 Strategic Partners · 2026
          </p>
          <p className="text-slate-400 text-sm">
            Cognitect Labs manages the platform. Partners manage customer
            relationships. AI team runs Catapult operations. Everyone shares the
            upside.
          </p>
        </div>
      </motion.div>
    </div>);

}
function SlideTeam() {
  const teamMembers = [
  {
    role: 'Platform Architecture',
    name: 'Cognitect Labs',
    desc: 'Built CatapultOS, Guide Beacon hardware, and the AI agent orchestration framework',
    icon: '⚙️'
  },
  {
    role: 'AI Research & Training',
    name: 'Cognitect Labs',
    desc: 'Industry-specific agent training across 47 verticals, AI/AGI talking head system',
    icon: '🧠'
  },
  {
    role: 'Blockchain & Security',
    name: 'Cognitect Labs',
    desc: 'SOC2 Type II, HIPAA, GDPR compliance, blockchain audit infrastructure',
    icon: '🔐'
  },
  {
    role: 'Operations (24/7)',
    name: 'AI COO Agent',
    desc: 'Automated onboarding, support, optimization, and partner management',
    icon: '🤖'
  }];

  return (
    <div className="flex flex-col justify-center h-full px-8 lg:px-16 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        <Badge color="blue">The Team</Badge>
        <h2 className="text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
          Cognitect Labs:
          <br />
          <span className="text-blue-400">AI-native from day one.</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6">
          We didn't add AI to an existing product. We built a company where AI
          is the management layer — and humans provide strategic vision,
          partnerships, and oversight.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {teamMembers.map((m, i) =>
          <motion.div
            key={m.role}
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: 0.1 + i * 0.1
            }}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">

              <div className="text-3xl mb-3">{m.icon}</div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                {m.role}
              </p>
              <p className="text-sm font-bold text-white mb-1">{m.name}</p>
              <p className="text-xs text-slate-400 leading-tight">{m.desc}</p>
            </motion.div>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-5">
            <p className="text-sm font-bold text-blue-400 mb-3">
              Why Cognitect Labs
            </p>
            <div className="space-y-2">
              {[
              'We are the customer — Catapult Company runs on Catapult',
              'First company to deploy AI as its primary management layer',
              'Hardware + software + blockchain + AI avatar in one team',
              'Founded 2026 — built for the AI-native era, not retrofitted',
              'Extreme service to employees is core to our operating model'].
              map((item) =>
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-200">

                  <StarIcon className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                  {item}
                </div>
              )}
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-orange-500/10 border border-green-500/30 rounded-2xl p-5 text-center flex flex-col justify-center">
            <p className="text-5xl font-black text-green-400 mb-2">$0</p>
            <p className="text-white font-bold mb-1">Management overhead</p>
            <p className="text-slate-400 text-sm">
              Cognitect Labs runs Catapult Company entirely on AI agents. This
              is the proof. This is the product. This is the future.
            </p>
          </div>
        </div>
      </motion.div>
    </div>);

}
function SlideTearSheet() {
  return (
    <div className="flex flex-col justify-center h-full px-6 lg:px-10 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}>

        {/* Header */}
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-yellow-500 rounded-lg flex items-center justify-center">
                <ZapIcon className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white">
                Catapult Company
              </h2>
              <span className="text-xs font-bold text-orange-400 bg-orange-500/20 border border-orange-500/30 px-2 py-0.5 rounded-full">
                Founded 2026
              </span>
              <span className="text-xs font-bold text-yellow-400 bg-yellow-500/20 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                📄 Tear Sheet
              </span>
            </div>
            <p className="text-slate-400 text-sm">
              Managed by Cognitect Labs AI Executive Team · Strategic
              Partnership Deck · One-Page Summary
            </p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p className="font-bold text-slate-400">CONFIDENTIAL</p>
            <p>For Authorized Recipients Only</p>
            <p>© 2026 Catapult Company / Cognitect Labs</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Company Overview
              </p>
              <div className="space-y-1.5 text-xs">
                {[
                {
                  label: 'Category',
                  value: 'AI-Run Business Management'
                },
                {
                  label: 'Founded',
                  value: '2026'
                },
                {
                  label: 'Managed by',
                  value: 'Cognitect Labs AI Team'
                },
                {
                  label: 'Stage',
                  value: 'Seed / Partnership Round'
                },
                {
                  label: 'HQ',
                  value: 'USA (Global Deployment)'
                },
                {
                  label: 'Model',
                  value: 'SaaS + Hardware + Blockchain'
                }].
                map((r) =>
                <div key={r.label} className="flex justify-between gap-2">
                    <span className="text-slate-500">{r.label}</span>
                    <span className="text-white font-semibold text-right">
                      {r.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
                What It Does
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Deploys a full AI C-suite (CEO, COO, CFO, CMO, CTO, CLO) for
                SMBs in under 5 minutes. Each executive has a photorealistic
                AI/AGI talking head avatar, autonomous decision authority, and
                blockchain-verified actions. Powered by Guide Beacon edge
                hardware.
              </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
              <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">
                No Partner CapEx — Ever
              </p>
              <div className="space-y-1 text-xs text-slate-300">
                {[
                'Software: fully built & deployed',
                'Guide Beacons: manufactured',
                'AI/AGI avatars: operational',
                'Blockchain layer: active',
                'Zero development investment required'].
                map((i) =>
                <div key={i} className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-3 h-3 text-green-400 flex-shrink-0" />
                    {i}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Market Size
              </p>
              <div className="space-y-2">
                {[
                {
                  label: 'TAM (2030)',
                  value: '$200B+',
                  color: 'text-green-400'
                },
                {
                  label: 'SAM',
                  value: '$34B',
                  color: 'text-blue-400'
                },
                {
                  label: 'SOM (2028)',
                  value: '$4.2B',
                  color: 'text-orange-400'
                },
                {
                  label: 'SMBs globally',
                  value: '~330M',
                  color: 'text-white'
                }].
                map((r) =>
                <div
                  key={r.label}
                  className="flex justify-between items-center">

                    <span className="text-xs text-slate-500">{r.label}</span>
                    <span className={`text-sm font-black ${r.color}`}>
                      {r.value}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-tight">
                McKinsey/Goldman/IDC convergent estimates. SMB count: World Bank
                2023.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Pilot Metrics{' '}
                <span className="text-blue-400 normal-case font-normal">
                  (labeled by type)
                </span>
              </p>
              <div className="space-y-1.5">
                {[
                {
                  label: 'Design partners',
                  value: '12',
                  color: 'text-orange-400',
                  tag: 'VERIFIED'
                },
                {
                  label: 'Avg projected ROI/wk',
                  value: '$38K',
                  color: 'text-green-400',
                  tag: 'PILOT'
                },
                {
                  label: 'Decision approval rate',
                  value: '91%',
                  color: 'text-yellow-400',
                  tag: 'VERIFIED'
                },
                {
                  label: 'Avg time saved/wk',
                  value: '23 hrs',
                  color: 'text-blue-400',
                  tag: 'VERIFIED'
                },
                {
                  label: 'Deployment time',
                  value: '< 5 min',
                  color: 'text-white',
                  tag: 'VERIFIED'
                }].
                map((r) =>
                <div
                  key={r.label}
                  className="flex justify-between items-center gap-1">

                    <span className="text-xs text-slate-500 flex-1">
                      {r.label}
                    </span>
                    <span className={`text-xs font-black ${r.color}`}>
                      {r.value}
                    </span>
                    <span
                    className={`text-xs font-bold px-1 py-0.5 rounded ${r.tag === 'VERIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>

                      {r.tag}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Pricing
              </p>
              <div className="space-y-1 text-xs">
                {[
                {
                  tier: 'Freemium',
                  price: '$0/forever'
                },
                {
                  tier: 'Starter',
                  price: '$499/exec/mo'
                },
                {
                  tier: 'Growth ★',
                  price: '$1,999/mo'
                },
                {
                  tier: 'Enterprise',
                  price: 'Custom'
                }].
                map((t) =>
                <div key={t.tier} className="flex justify-between">
                    <span className="text-slate-400">{t.tier}</span>
                    <span className="text-white font-semibold">{t.price}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                First-to-Market Claims
              </p>
              <div className="space-y-1.5 text-xs text-slate-300">
                {[
                'First AI-managed company (2026)',
                'First edge AI + management platform',
                'First blockchain-audited AI decisions',
                'First outcome-based AI subscription',
                'First AI exec talking head avatars',
                'First human→machine skill transfer'].
                map((c) =>
                <div key={c} className="flex items-center gap-1.5">
                    <StarIcon className="w-3 h-3 text-yellow-400 fill-yellow-400 flex-shrink-0" />
                    {c}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-3">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
                Partnership Ask
              </p>
              <p className="text-white font-semibold text-xs mb-2">
                Seeking 3–5 strategic partners · 2026
              </p>
              <div className="space-y-1 text-xs text-slate-300">
                {[
                'Revenue share on deployed customers',
                'Equity stake in Catapult Company',
                'White-label deployment rights',
                'No CapEx — platform fully operational'].
                map((i) =>
                <div key={i} className="flex items-center gap-1.5">
                    <CheckCircleIcon className="w-3 h-3 text-green-400 flex-shrink-0" />
                    {i}
                  </div>
                )}
              </div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-3">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                Contact
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <MailIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  partnerships@catapultcompany.ai
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <GlobeIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  catapultcompany.ai
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <BuildingIcon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  Cognitect Labs · cognitectlabs.ai
                </div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-2 text-center">
              <p className="text-xs text-slate-600 leading-relaxed">
                Forward-looking statements & projections. Pilot metrics labeled
                by source type (VERIFIED = confirmed in pilot; PILOT =
                pilot-derived projection). Market figures are estimates; actual
                results may differ. Claims verifiable via blockchain audit trail
                where noted.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>);

}
// ─── Slide registry ────────────────────────────────────────────────────────────
const SLIDE_COMPONENTS: Record<SlideId, React.FC> = {
  cover: SlideCover,
  problem: SlideProblem,
  'first-to-market': SlideFirstToMarket,
  solution: SlideSolution,
  market: SlideMarket,
  traction: SlideTraction,
  'user-stories': SlideUserStories,
  platform: SlidePlatform,
  'business-model': SlideBusinessModel,
  moat: SlideMoat,
  proof: SlideProof,
  'employee-first': SlideEmployeeFirst,
  roadmap: SlideRoadmap,
  ask: SlideAsk,
  team: SlideTeam,
  'tear-sheet': SlideTearSheet
};
// ─── Main deck ─────────────────────────────────────────────────────────────────
export function InvestorDeck() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const goTo = useCallback(
    (idx: number) => {
      if (idx < 0 || idx >= SLIDES.length) return;
      setDirection(idx > current ? 1 : -1);
      setCurrent(idx);
    },
    [current]
  );
  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev();
      if (e.key === 'Escape') window.location.hash = '';
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);
  const slideId = SLIDES[current];
  const SlideComponent = SLIDE_COMPONENTS[slideId];
  const tearSheetIdx = SLIDES.indexOf('tear-sheet');
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };
  return (
    <div className="fixed inset-0 bg-slate-950 text-white overflow-hidden flex flex-col">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
          'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />


      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-2.5 border-b border-white/10 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={() => {
              window.location.hash = '';
            }}
            className="text-slate-400 hover:text-white transition-colors text-sm flex items-center gap-1.5">

            <ArrowLeftIcon className="w-4 h-4" /> Home
          </a>
          <div className="w-px h-4 bg-white/20" />
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest hidden sm:block">
            Catapult × Cognitect Labs
          </span>
          <span className="text-xs text-slate-500 hidden md:block">
            Partnership Deck · Founded 2026
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 hidden sm:block">
            {SLIDE_TITLES[slideId]}
          </span>
          <span className="text-xs text-slate-600">
            {current + 1}/{SLIDES.length}
          </span>
          {current !== tearSheetIdx &&
          <button
            onClick={() => goTo(tearSheetIdx)}
            className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors rounded-full px-3 py-1">

              <FileTextIcon className="w-3 h-3" />
              Tear Sheet
            </button>
          }
        </div>
      </div>

      {/* Slide area */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={slideId}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.35,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="absolute inset-0 flex items-center justify-center">

            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom nav */}
      <div className="relative z-20 flex items-center justify-between px-6 py-2.5 border-t border-white/10 bg-slate-950/80 backdrop-blur-sm flex-shrink-0">
        {/* Dots */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {SLIDES.map((s, i) =>
          <button
            key={s}
            onClick={() => goTo(i)}
            title={SLIDE_TITLES[s]}
            className={`transition-all duration-300 rounded-full ${i === current ? 'w-4 h-1.5 bg-orange-400' : s === 'tear-sheet' ? 'w-1.5 h-1.5 bg-yellow-500/60 hover:bg-yellow-400' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'}`} />

          )}
        </div>

        {/* Slide titles — scrollable on smaller screens */}
        <div className="hidden lg:flex items-center gap-0.5 text-xs text-slate-600 overflow-x-auto max-w-2xl">
          {SLIDES.map((s, i) =>
          <button
            key={s}
            onClick={() => goTo(i)}
            className={`px-1.5 py-1 rounded whitespace-nowrap transition-colors flex-shrink-0 ${i === current ? 'text-white bg-white/10' : s === 'tear-sheet' ? 'text-yellow-500/70 hover:text-yellow-400' : 'hover:text-slate-400'}`}>

              {SLIDE_TITLES[s]}
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-slate-600 hidden sm:block">
            ← → · Esc
          </span>
          <button
            onClick={prev}
            disabled={current === 0}
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center transition-colors">

            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            disabled={current === SLIDES.length - 1}
            className="w-8 h-8 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-30 flex items-center justify-center transition-colors">

            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>);

}