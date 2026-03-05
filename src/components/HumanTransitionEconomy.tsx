import React, { useState, Component } from 'react';
import { motion } from 'framer-motion';
import {
  ActivityIcon,
  UsersIcon,
  BookOpenIcon,
  BrainIcon,
  CpuIcon,
  ZapIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BotIcon,
  CoinsIcon,
  HeartPulseIcon,
  ArrowDownIcon,
  TrendingUpIcon,
  KeyIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  DollarSignIcon } from
'lucide-react';
// ─── Role Analogy Cards ────────────────────────────────────────────────────────
const roleAnalogies = [
{
  icon: ActivityIcon,
  humanRole: 'Sports Trainer',
  aiParallel: 'Embodied Motion Trainer',
  howTheyEarn:
  'Train humanoid movement patterns. Earn royalties every time your motion data is deployed in a robot.',
  color: 'blue',
  border: 'border-blue-500/30',
  bg: 'from-blue-500/10 to-blue-600/5',
  iconGradient: 'from-blue-500 to-blue-700',
  badge: 'Royalty Model',
  badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  textColor: 'text-blue-400'
},
{
  icon: UsersIcon,
  humanRole: 'Talent Recruiter',
  aiParallel: 'Agent Curator',
  howTheyEarn:
  'Curate and configure AI agent teams. Earn a placement fee + trailing commission on agent performance.',
  color: 'purple',
  border: 'border-purple-500/30',
  bg: 'from-purple-500/10 to-purple-600/5',
  iconGradient: 'from-purple-500 to-purple-700',
  badge: 'Placement + Trail',
  badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  textColor: 'text-purple-400'
},
{
  icon: BookOpenIcon,
  humanRole: 'Teacher',
  aiParallel: 'Skill Transfer Specialist',
  howTheyEarn:
  'Teach AI systems domain knowledge. Earn licensing royalties every time your curriculum is deployed.',
  color: 'cyan',
  border: 'border-cyan-500/30',
  bg: 'from-cyan-500/10 to-cyan-600/5',
  iconGradient: 'from-cyan-500 to-cyan-700',
  badge: 'IP Licensing',
  badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  textColor: 'text-cyan-400'
},
{
  icon: BrainIcon,
  humanRole: 'Domain Specialist',
  aiParallel: 'Knowledge Architect',
  howTheyEarn:
  'Encode specialized expertise into AI decision models. Earn per-decision micro-royalties at scale.',
  color: 'yellow',
  border: 'border-yellow-500/30',
  bg: 'from-yellow-500/10 to-yellow-600/5',
  iconGradient: 'from-yellow-500 to-yellow-600',
  badge: 'Micro-Royalties',
  badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  textColor: 'text-yellow-400'
},
{
  icon: CpuIcon,
  humanRole: 'Process Engineer',
  aiParallel: 'Workflow Architect',
  howTheyEarn:
  'Design the workflows AI executes. Earn every time your process runs across any business in the network.',
  color: 'orange',
  border: 'border-orange-500/30',
  bg: 'from-orange-500/10 to-orange-600/5',
  iconGradient: 'from-orange-500 to-orange-600',
  badge: 'Network Royalties',
  badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  textColor: 'text-orange-400'
},
{
  icon: ZapIcon,
  humanRole: 'Entrepreneur',
  aiParallel: 'AI Business Operator',
  howTheyEarn:
  'Run a full business with AI executives. Lower barrier to entry. Higher margin. Compete like a Fortune 500 with a team of 3.',
  color: 'green',
  border: 'border-green-500/30',
  bg: 'from-green-500/10 to-green-600/5',
  iconGradient: 'from-green-500 to-green-700',
  badge: 'Equity + Dividends',
  badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  textColor: 'text-green-400'
}];

// ─── Savings Distribution ─────────────────────────────────────────────────────
const savingsDistribution = [
{
  label: 'Remaining human workers (higher wages)',
  pct: 40,
  color: 'from-green-500 to-green-400',
  textColor: 'text-green-400'
},
{
  label: 'Skill / training royalty pool',
  pct: 25,
  color: 'from-purple-500 to-purple-400',
  textColor: 'text-purple-400'
},
{
  label: 'Business reinvestment',
  pct: 20,
  color: 'from-blue-500 to-blue-400',
  textColor: 'text-blue-400'
},
{
  label: 'Shareholder dividends',
  pct: 15,
  color: 'from-yellow-500 to-yellow-400',
  textColor: 'text-yellow-400'
}];

// ─── Tech Stack Layers ────────────────────────────────────────────────────────
const techLayers = [
{
  icon: BotIcon,
  name: 'Humanoid & Embodied AI',
  desc: 'Physical robots consuming human skill packets. The endpoint of the knowledge transfer pipeline. Target: 2028 roadmap — dependent on humanoid hardware maturity.',
  status: '2028 Roadmap',
  color: 'blue',
  border: 'border-l-blue-500',
  bg: 'bg-blue-500/10',
  iconGradient: 'from-blue-500 to-blue-700',
  statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  textColor: 'text-blue-400'
},
{
  icon: BrainIcon,
  name: 'AI Agent Network',
  desc: 'Autonomous AI executives, specialists, and agents executing business operations. Constrained by smart contracts. Safety enforced by architecture, not just policy.',
  status: 'Active · Constrained AI',
  color: 'orange',
  border: 'border-l-orange-500',
  bg: 'bg-orange-500/10',
  iconGradient: 'from-orange-500 to-orange-600',
  statusColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  textColor: 'text-orange-400'
},
{
  icon: ShieldCheckIcon,
  name: 'Safe Blockchain Infrastructure',
  desc: 'Every action, transaction, and AI decision recorded immutably. Designed for HIPAA alignment and FedRAMP-readiness — formal certifications require independent audit.',
  status: 'Active · Compliance-Aligned',
  color: 'green',
  border: 'border-l-green-500',
  bg: 'bg-green-500/10',
  iconGradient: 'from-green-500 to-green-700',
  statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  textColor: 'text-green-400'
},
{
  icon: SparklesIcon,
  name: 'Quantum-Ready Cryptography',
  desc: 'Post-quantum cryptographic algorithms (CRYSTALS-Kyber, NIST-approved) active today. Quantum-augmented AI optimization on roadmap as quantum hardware matures.',
  status: 'Crypto Active · QAI Roadmap',
  color: 'purple',
  border: 'border-l-purple-500',
  bg: 'bg-purple-500/10',
  iconGradient: 'from-purple-500 to-purple-700',
  statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  textColor: 'text-purple-400'
}];

// ─── Entrepreneurship Cards ───────────────────────────────────────────────────
const entrepreneurCards = [
{
  icon: ArrowDownIcon,
  title: 'Zero Hiring Overhead',
  desc: 'Deploy a full suite of AI executive agents in minutes. No recruiting, no onboarding, no HR overhead. The operational barrier to running a sophisticated business drops dramatically.',
  stat: 'Minutes to deploy · No headcount required',
  color: 'from-orange-500 to-orange-600',
  border: 'border-orange-500/30',
  bg: 'bg-orange-500/10',
  textColor: 'text-orange-400'
},
{
  icon: TrendingUpIcon,
  title: 'Compete at Enterprise Scale',
  desc: 'A lean team with APEX gains operational capabilities that previously required large departments — AI handles scheduling, finance, marketing execution, and operations simultaneously.',
  stat: 'Small team · Enterprise-grade execution',
  color: 'from-green-500 to-green-600',
  border: 'border-green-500/30',
  bg: 'bg-green-500/10',
  textColor: 'text-green-400'
},
{
  icon: KeyIcon,
  title: 'Own Your AI Stack',
  desc: 'Your AI agents, your trained models, your skill IP — all blockchain-verified and owned by you. Build an asset portfolio that grows in value as AI adoption scales.',
  stat: 'Skill IP + Agent config = owned assets',
  color: 'from-purple-500 to-purple-600',
  border: 'border-purple-500/30',
  bg: 'bg-purple-500/10',
  textColor: 'text-purple-400'
}];

// ─── Main Component ───────────────────────────────────────────────────────────
export function HumanTransitionEconomy() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-80px'
          }}
          transition={{
            duration: 0.65
          }}
          className="text-center mb-20">

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            whileInView={{
              opacity: 1,
              scale: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.15
            }}
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-5 py-2 mb-6">

            <ActivityIcon className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300 uppercase tracking-widest">
              Human Transition Economy · APEX Architecture
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            The Experts Who Train AI
            <br />
            <span className="text-orange-400">
              Earn Like the Athletes They Coach.
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Sports trainers earn when their athletes win. Recruiters earn when
            their placements succeed. Teachers earn when their students excel.{' '}
            <span className="text-white font-semibold">
              On APEX, the humans who train, embody, and refine AI earn every
              time that AI performs — forever.
            </span>
          </p>
        </motion.div>

        {/* ── Part 1: Compensation Analogies ── */}
        <div className="mb-20">
          <motion.p
            initial={{
              opacity: 0
            }}
            whileInView={{
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5
            }}
            className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-10">

            Six Compensation Models. All Familiar. All Reimagined for AI.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roleAnalogies.map((role, i) => {
              const Icon = role.icon;
              return (
                <motion.div
                  key={role.humanRole}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay: i * 0.09,
                    duration: 0.5
                  }}
                  className={`bg-gradient-to-br ${role.bg} border ${role.border} rounded-3xl p-6 flex flex-col`}>

                  {/* Header row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${role.iconGradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>

                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`text-xs font-bold border rounded-full px-2.5 py-1 ${role.badgeColor}`}>

                      {role.badge}
                    </span>
                  </div>

                  {/* Roles */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-slate-500 uppercase tracking-widest">
                        Human Role
                      </span>
                    </div>
                    <p className="text-lg font-black text-white">
                      {role.humanRole}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <ArrowRightIcon
                        className={`w-3.5 h-3.5 ${role.textColor} flex-shrink-0`} />

                      <span className="text-xs text-slate-400 uppercase tracking-widest">
                        AI Parallel
                      </span>
                    </div>
                    <p className={`text-sm font-bold mt-0.5 ${role.textColor}`}>
                      {role.aiParallel}
                    </p>
                  </div>

                  {/* How they earn */}
                  <div className={`mt-auto pt-4 border-t border-white/10`}>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                      How They Earn
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {role.howTheyEarn}
                    </p>
                  </div>
                </motion.div>);

            })}
          </div>
        </div>

        {/* ── Part 2: Transition Math ── */}
        <div className="mb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="text-center mb-12">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              The Economics
            </p>
            <h3 className="text-3xl lg:text-4xl font-black text-white">
              The New Compensation Equation
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Before / After */}
            <div className="space-y-4">
              {/* Before */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6
                }}
                className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                    Before — Traditional Model
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">
                      10 workers × $50K avg
                    </span>
                    <span className="text-lg font-black text-red-400">
                      = $500K payroll
                    </span>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full" />
                      High overhead, output limited by headcount
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full" />
                      Workers replaceable, no IP ownership
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <div className="w-1.5 h-1.5 bg-red-400/50 rounded-full" />
                      Income stops when employment stops
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                whileInView={{
                  opacity: 1,
                  x: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.15
                }}
                className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6">

                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    animate={{
                      opacity: [1, 0.4, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="w-2 h-2 bg-green-400 rounded-full" />

                  <span className="text-xs font-bold text-green-400 uppercase tracking-widest">
                    After — APEX Model (Projected)
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-sm text-slate-400">
                      3 workers × $120K + AI dividend pool share
                    </span>
                    <span className="text-lg font-black text-green-400 text-right">
                      = $360K + passive income
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 italic">
                    Illustrative example. Actual savings depend on industry,
                    workflow complexity, and AI adoption depth.
                  </p>
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-green-300">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      Lower overhead, significantly higher output per worker
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-300">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      Workers own IP, earn trailing royalties while deployed
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-300">
                      <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                      Income potential grows as AI adoption scales
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Callout */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: 0.3
                }}
                className="bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/20 rounded-xl p-4 text-center">

                <p className="text-sm font-black text-white">
                  Fewer workers.{' '}
                  <span className="text-orange-400">Higher compensation.</span>{' '}
                  <span className="text-yellow-400">Ongoing IP ownership.</span>
                </p>
              </motion.div>
            </div>

            {/* Right: Savings distribution */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6,
                delay: 0.2
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                Where the AI Savings Go (Illustrative Model)
              </p>
              <div className="space-y-5">
                {savingsDistribution.map((item, i) =>
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    x: 10
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay: 0.3 + i * 0.1
                  }}>

                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-300">
                        {item.label}
                      </span>
                      <span className={`text-lg font-black ${item.textColor}`}>
                        {item.pct}%
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-3">
                      <motion.div
                      initial={{
                        width: 0
                      }}
                      whileInView={{
                        width: `${item.pct}%`
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        duration: 1,
                        delay: 0.5 + i * 0.1,
                        ease: 'easeOut'
                      }}
                      className={`h-3 bg-gradient-to-r ${item.color} rounded-full`} />

                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheckIcon className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold text-green-400">
                    Blockchain-Verified Distribution
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Every distribution is recorded on-chain. Smart contracts
                  execute payments automatically when AI performance thresholds
                  are met. Distribution percentages are governance-configurable
                  and subject to platform terms.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Part 3: Technology Stack ── */}
        <div className="mb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="text-center mb-12">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              The Architecture That Makes This Possible
            </p>
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-3">
              Four Layers. One Coherent System.{' '}
              <span className="text-purple-400">
                Built for the Age of Advanced AI.
              </span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Each layer is purpose-built, cryptographically secured, and
              designed to work together as a unified platform for human-AI
              collaboration.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto relative">
            {/* Vertical connector line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/40 via-orange-500/40 via-green-500/40 to-purple-500/40 hidden lg:block" />

            <div className="space-y-3">
              {techLayers.map((layer, i) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.name}
                    initial={{
                      opacity: 0,
                      x: -24
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: i * 0.12,
                      duration: 0.5
                    }}
                    className={`relative flex items-start gap-5 ${layer.bg} border-l-4 ${layer.border} border border-white/10 rounded-2xl p-5 lg:ml-4`}>

                    {/* Layer number */}
                    <div className="hidden lg:flex absolute -left-8 top-1/2 -translate-y-1/2 w-7 h-7 bg-slate-900 border border-white/20 rounded-full items-center justify-center z-10">
                      <span className="text-xs font-black text-slate-400">
                        {techLayers.length - i}
                      </span>
                    </div>

                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${layer.iconGradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
                        <h4 className="font-black text-white">{layer.name}</h4>
                        <span
                          className={`text-xs font-bold border rounded-full px-2.5 py-1 flex-shrink-0 ${layer.statusColor}`}>

                          {layer.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {layer.desc}
                      </p>
                    </div>
                  </motion.div>);

              })}
            </div>

            {/* Bottom label */}
            <motion.div
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.6
              }}
              className="text-center mt-6">

              <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest">
                ↑ Stack builds from Quantum foundation to Humanoid surface
              </span>
            </motion.div>
          </div>
        </div>

        {/* ── Part 4: UBI + UBH Vision ── */}
        <div className="mb-20">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="text-center mb-12">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              The Bigger Vision
            </p>
            <h3 className="text-3xl lg:text-4xl font-black text-white">
              A Path to{' '}
              <span className="text-yellow-400">Universal Human Income</span> &{' '}
              <span className="text-cyan-400">Universal Basic Health.</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* UHI Card */}
            <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6
              }}
              className="bg-gradient-to-br from-yellow-500/10 to-orange-500/5 border border-yellow-500/30 rounded-3xl p-7">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CoinsIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">
                    Universal Human Income
                  </h4>
                  <span className="text-xs font-bold text-yellow-400">
                    UHI · Earned, Not Given
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                As AI scales across millions of businesses, the dividend pool
                scales with it. Every human who contributes skills, processes,
                or training data earns a stake in the AI economy — not as
                charity, but as{' '}
                <span className="text-white font-semibold">
                  earned compensation for the value they created
                </span>
                .
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-slate-400">
                      Pilot pool projection
                    </span>
                  </div>
                  <span className="text-sm font-black text-yellow-400">
                    ~$284,750 / month
                  </span>
                </div>
                <div className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-slate-400">
                      Full-scale model (10K+ businesses)
                    </span>
                  </div>
                  <span className="text-sm font-black text-yellow-400">
                    $2.4B+ / year est.
                  </span>
                </div>
                <p className="text-xs text-slate-500 italic px-1">
                  Scale projection assumes ~10,000 active businesses at
                  pilot-equivalent savings rates. Actual results will vary.
                </p>
              </div>
            </motion.div>

            {/* UBH Card */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 0.6,
                delay: 0.15
              }}
              className="bg-gradient-to-br from-cyan-500/10 to-teal-500/5 border border-cyan-500/30 rounded-3xl p-7">

              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                  <HeartPulseIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white">
                    Universal Basic Health
                  </h4>
                  <span className="text-xs font-bold text-cyan-400">
                    UBH · Your Data, Your Health
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Embodied data from wearables, biometrics, and health devices —
                stored on-chain with your private key — enables personalized
                health AI that works for you. As AI reduces work stress and
                increases income stability, health outcomes improve system-wide.
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-400">
                      Biometric data storage
                    </span>
                  </div>
                  <span className="text-sm font-black text-cyan-400">
                    HIPAA-protected, on-chain
                  </span>
                </div>
                <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <BrainIcon className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-400">
                      Health AI model
                    </span>
                  </div>
                  <span className="text-sm font-black text-cyan-400">
                    Personalized to your data
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Part 5: Entrepreneurship ── */}
        <div className="mb-16">
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.6
            }}
            className="text-center mb-12">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Entrepreneurship
            </p>
            <h3 className="text-3xl lg:text-4xl font-black text-white mb-3">
              AI Doesn't Replace Entrepreneurs.
              <br />
              <span className="text-green-400">
                It Removes Every Barrier That Stopped Them.
              </span>
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              The same platform that transitions workers into the AI economy
              gives entrepreneurs the tools to build at a scale that was
              previously impossible.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {entrepreneurCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay: i * 0.12,
                    duration: 0.5
                  }}
                  className={`${card.bg} border ${card.border} rounded-3xl p-6 flex flex-col`}>

                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>

                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-black text-white mb-3">
                    {card.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">
                    {card.desc}
                  </p>
                  <div
                    className={`pt-4 border-t border-white/10 text-xs font-bold ${card.textColor}`}>

                    {card.stat}
                  </div>
                </motion.div>);

            })}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="relative overflow-hidden bg-gradient-to-br from-orange-500/10 via-yellow-500/5 to-green-500/10 border border-orange-500/20 rounded-3xl p-10 text-center">

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{
              duration: 8,
              repeat: Infinity
            }}
            className="absolute -top-16 -right-16 w-64 h-64 bg-orange-500 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
              Ready to transition into the AI economy?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Whether you train AI, run AI, or build with AI — there's a
              compensation model designed for you.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-base transition-all shadow-lg">
              Find Your Role in the AI Economy
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>);

}