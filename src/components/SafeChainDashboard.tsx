import React, { useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSignIcon,
  HeartPulseIcon,
  ShieldCheckIcon,
  LockIcon,
  CheckCircleIcon,
  ZapIcon,
  BrainIcon,
  UserIcon,
  ActivityIcon,
  ArrowRightIcon,
  FileTextIcon,
  KeyIcon,
  ServerIcon,
  AlertTriangleIcon,
  EyeOffIcon } from
'lucide-react';
// ─── On-Chain Data Categories ─────────────────────────────────────────────────
const dataCategories: Array<{ icon: React.ElementType; title: string; badge: string; badgeColor: string; borderColor: string; bgGradient: string; iconGradient: string; items: string[]; footer: string; footerColor: string; dot?: string }> = [
{
  icon: DollarSignIcon,
  title: 'Financial Records',
  badge: 'On-Chain · Immutable',
  badgeColor: 'bg-green-500/20 border-green-500/40 text-green-400',
  borderColor: 'border-green-500/30',
  bgGradient: 'from-green-500/10 to-green-600/5',
  iconGradient: 'from-green-500 to-green-700',
  items: [
  'Invoices & payments',
  'Revenue transactions',
  'Payroll & dividends',
  'Tax records',
  'Smart contract settlements'],

  footer:
  'Every dollar tracked. Every transaction verified. Zero manipulation possible.',
  footerColor: 'text-green-400'
},
{
  icon: HeartPulseIcon,
  title: 'Embodied & Biometric Data',
  badge: 'HIPAA Protected · On-Chain',
  badgeColor: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400',
  borderColor: 'border-cyan-500/30',
  bgGradient: 'from-cyan-500/10 to-blue-600/5',
  iconGradient: 'from-cyan-500 to-blue-600',
  items: [
  'Biometric authentication hashes',
  'Health & wellness metrics',
  'Wearable device data',
  'Medical practice records',
  'Employee physical presence logs'],

  footer:
  'Your body data belongs to you. Encrypted, hashed, and stored on-chain with your private key.',
  footerColor: 'text-cyan-400'
},
{
  icon: EyeOffIcon,
  title: 'Personal Off-Edge Data',
  badge: 'Zero-Knowledge · On-Chain',
  badgeColor: 'bg-purple-500/20 border-purple-500/40 text-purple-400',
  borderColor: 'border-purple-500/30',
  bgGradient: 'from-purple-500/10 to-purple-600/5',
  iconGradient: 'from-purple-500 to-purple-700',
  items: [
  'Identity credentials',
  'Location history (hashed)',
  'Communication metadata',
  'Behavioral patterns',
  'Consent & permission records'],

  footer:
  'Data that leaves your device is hashed before transmission. We never see the raw data.',
  footerColor: 'text-purple-400'
}];

// ─── Compliance Badges ────────────────────────────────────────────────────────
const complianceBadges = [
{
  name: 'HIPAA Aligned',
  desc: 'Healthcare data architecture',
  color: 'border-green-500/40 bg-green-500/10 text-green-400',
  dot: 'bg-green-400'
},
{
  name: 'FedRAMP Ready',
  desc: 'Federal cloud security path',
  color: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  dot: 'bg-blue-400'
},
{
  name: 'NIST 800-53',
  desc: 'Government security controls',
  color: 'border-indigo-500/40 bg-indigo-500/10 text-indigo-400',
  dot: 'bg-indigo-400'
},
{
  name: 'FIPS 140-2',
  desc: 'Cryptographic standards',
  color: 'border-purple-500/40 bg-purple-500/10 text-purple-400',
  dot: 'bg-purple-400'
},
{
  name: 'SOC 2 Type II',
  desc: 'Enterprise audit standard',
  color: 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400',
  dot: 'bg-yellow-400'
},
{
  name: 'GDPR Aligned',
  desc: 'EU data sovereignty design',
  color: 'border-cyan-500/40 bg-cyan-500/10 text-cyan-400',
  dot: 'bg-cyan-400'
}];

// ─── AGI Safety Constraints ───────────────────────────────────────────────────
const agiConstraints = [
{
  label: 'Smart Contract Boundaries',
  color: 'border-green-500/50',
  textColor: 'text-green-400',
  size: 'w-72 h-72'
},
{
  label: 'Human Override Layer',
  color: 'border-blue-500/50',
  textColor: 'text-blue-400',
  size: 'w-56 h-56'
},
{
  label: 'Blockchain Audit Trail',
  color: 'border-yellow-500/50',
  textColor: 'text-yellow-400',
  size: 'w-44 h-44'
},
{
  label: 'Confidence Threshold Gate',
  color: 'border-orange-500/50',
  textColor: 'text-orange-400',
  size: 'w-32 h-32'
}];

const agiExplanations = [
{
  icon: ShieldCheckIcon,
  title: 'AGI Cannot Exceed Its Mandate',
  desc: 'Smart contracts define the exact scope of every AI agent. AGI cannot take actions outside its blockchain-encoded authorization.',
  color: 'text-green-400',
  bg: 'bg-green-500/10 border-green-500/20'
},
{
  icon: FileTextIcon,
  title: 'Every AGI Decision is Permanent Record',
  desc: 'No AGI action can be hidden, modified, or deleted. The blockchain creates an unbreakable audit trail for regulators and users.',
  color: 'text-blue-400',
  bg: 'bg-blue-500/10 border-blue-500/20'
},
{
  icon: UserIcon,
  title: 'Human Override is Absolute',
  desc: 'Any user, at any time, can issue a blockchain-signed halt command that immediately stops all AGI activity. No exceptions.',
  color: 'text-yellow-400',
  bg: 'bg-yellow-500/10 border-yellow-500/20'
},
{
  icon: LockIcon,
  title: 'Safe by Architecture, Not Policy',
  desc: "Safety isn't a rule the AI follows. It's a cryptographic constraint it cannot break.",
  color: 'text-purple-400',
  bg: 'bg-purple-500/10 border-purple-500/20'
}];

// ─── Live On-Chain Log Entries ────────────────────────────────────────────────
const logEntries = [
{
  hash: '0x7f3a...1a',
  type: 'Financial',
  action: 'Invoice #4821 settled · $2,400',
  status: 'Verified ✓',
  color: 'text-green-400'
},
{
  hash: '0x9b2c...4f',
  type: 'Biometric',
  action: 'Auth hash stored · SHA-3 · HIPAA compliant',
  status: 'Verified ✓',
  color: 'text-cyan-400'
},
{
  hash: '0x1d8e...0b',
  type: 'AGI Action',
  action: 'COO rescheduled crew · Confidence 94%',
  status: 'Approved ✓',
  color: 'text-yellow-400'
},
{
  hash: '0x4f6a...5c',
  type: 'Personal',
  action: 'Consent record updated · Zero-knowledge proof',
  status: 'Verified ✓',
  color: 'text-purple-400'
},
{
  hash: '0x3e7f...9d',
  type: 'Dividend',
  action: '$847 distributed to 12 employees · Smart contract',
  status: 'Executed ✓',
  color: 'text-green-400'
},
{
  hash: '0x2b4c...3a',
  type: 'Identity',
  action: 'Agent CFO-001 verified · Blockchain hash',
  status: 'Verified ✓',
  color: 'text-blue-400'
},
{
  hash: '0x8d6e...7f',
  type: 'Medical',
  action: 'Record access logged · HIPAA audit trail',
  status: 'Logged ✓',
  color: 'text-cyan-400'
}];

// ─── Main Component ───────────────────────────────────────────────────────────
export function SafeChainDashboard() {
  const [visibleLogs, setVisibleLogs] = useState(logEntries.slice(0, 4));
  const [logIndex, setLogIndex] = useState(4);
  useEffect(() => {
    const timer = setInterval(() => {
      setLogIndex((prev) => {
        const next = prev % logEntries.length;
        setVisibleLogs((logs) => [logEntries[next], ...logs.slice(0, 4)]);
        return next + 1;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
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
            once: true,
            margin: '-80px'
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-16">

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
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-5 py-2 mb-6">

            <ShieldCheckIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-300 uppercase tracking-widest">
              Safe Blockchain · AI/AGI Infrastructure
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Your Data Lives On-Chain.
            <br />
            <span className="text-green-400">
              Not in a Database. On the Blockchain.
            </span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Financial records, biometric data, and all personal off-edge data
            are cryptographically secured on an immutable ledger — not stored in
            vulnerable centralized databases.{' '}
            <span className="text-green-400 font-semibold">
              HIPAA-aligned architecture. FedRAMP-ready design.
              Government-grade.
            </span>
          </p>
        </motion.div>

        {/* ── Part 1: On-Chain Data Categories ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {dataCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{
                  opacity: 0,
                  y: 24
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
                className={`bg-gradient-to-br ${cat.bgGradient} border ${cat.borderColor} rounded-3xl p-6 flex flex-col`}>

                {/* Card header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${cat.iconGradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-lg leading-tight mb-1">
                      {cat.title}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-bold border rounded-full px-2.5 py-1 ${cat.badgeColor}`}>

                      <CheckCircleIcon className="w-3 h-3" />
                      {cat.badge}
                    </span>
                  </div>
                </div>

                {/* Items */}
                <ul className="space-y-2.5 flex-1 mb-5">
                  {cat.items.map((item) =>
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm text-slate-300">

                      <div
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cat.dot ?? 'bg-green-400'}`}
                      style={{
                        backgroundColor: cat.footerColor.
                        replace('text-', '').
                        includes('green') ?
                        '#4ade80' :
                        cat.footerColor.includes('cyan') ?
                        '#22d3ee' :
                        '#a78bfa'
                      }} />

                      {item}
                    </li>
                  )}
                </ul>

                {/* Footer */}
                <div
                  className={`pt-4 border-t border-white/10 text-xs font-semibold leading-relaxed ${cat.footerColor}`}>

                  {cat.footer}
                </div>
              </motion.div>);

          })}
        </div>

        {/* ── Part 2: Compliance Grid ── */}
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
          className="mb-16">

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-6">
            Compliance Architecture & Certification Roadmap
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {complianceBadges.map((badge, i) =>
            <motion.div
              key={badge.name}
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
                delay: i * 0.07,
                type: 'spring',
                stiffness: 300
              }}
              className={`border rounded-2xl p-4 text-center ${badge.color}`}>

                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <motion.div
                  animate={{
                    opacity: [1, 0.4, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                  className={`w-2 h-2 rounded-full ${badge.dot}`} />

                  <ShieldCheckIcon className="w-4 h-4" />
                </div>
                <p className="text-xs font-black leading-tight mb-1">
                  {badge.name}
                </p>
                <p className="text-xs opacity-70 leading-tight">{badge.desc}</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── Part 3: AGI Safety Layer ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16 items-center">
          {/* Left: Animated constraint diagram */}
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
            }}>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              AGI Safety Architecture
            </p>
            <div className="relative flex items-center justify-center h-80">
              {/* Constraint rings */}
              {agiConstraints.map((ring, i) =>
              <motion.div
                key={ring.label}
                initial={{
                  opacity: 0,
                  scale: 0.6
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: i * 0.15,
                  type: 'spring',
                  stiffness: 180,
                  damping: 20
                }}
                className={`absolute ${ring.size} border-2 ${ring.color} rounded-full`}>

                  {/* Ring label — positioned at top */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className={`text-xs font-semibold ${ring.textColor}`}>
                      {ring.label}
                    </span>
                  </div>
                  {/* Pulse animation on outermost ring */}
                  {i === 0 &&
                <motion.div
                  animate={{
                    scale: [1, 1.04, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  className={`absolute inset-0 border-2 ${ring.color} rounded-full`} />

                }
                </motion.div>
              )}

              {/* AGI Core */}
              <motion.div
                initial={{
                  scale: 0
                }}
                whileInView={{
                  scale: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: 0.6,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
                className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex flex-col items-center justify-center shadow-2xl">

                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.1, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                  className="absolute inset-0 bg-purple-500/40 rounded-full" />

                <BrainIcon className="w-7 h-7 text-white relative z-10" />
                <span className="text-white text-xs font-black relative z-10 leading-none mt-0.5">
                  AGI
                </span>
              </motion.div>

              {/* Ethical constraint hash label at bottom */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-semibold text-orange-400">
                  Ethical Constraint Hash
                </span>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-xs text-slate-400 text-center">
                AGI core is{' '}
                <span className="text-purple-400 font-bold">contained</span>{' '}
                within cryptographic constraint rings. Each ring is a smart
                contract —{' '}
                <span className="text-green-400 font-bold">
                  immutable and unbreakable
                </span>
                .
              </p>
            </div>
          </motion.div>

          {/* Right: Explanation cards */}
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
            className="space-y-3">

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
              Why AGI is Safe on This Platform
            </p>
            {agiExplanations.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
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
                    delay: 0.2 + i * 0.1
                  }}
                  className={`border rounded-2xl p-4 ${item.bg}`}>

                  <div className="flex items-start gap-3">
                    <Icon
                      className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />

                    <div>
                      <p className={`text-sm font-bold mb-1 ${item.color}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>);

            })}
          </motion.div>
        </div>

        {/* ── Part 4: Live On-Chain Activity Feed ── */}
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
          className="mb-16">

          <div className="bg-slate-900/80 border border-green-500/20 rounded-2xl overflow-hidden">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-green-500/20 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  blockchain://catapult.chain/live
                </span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity
                  }}
                  className="w-2 h-2 bg-green-400 rounded-full" />

                <span className="text-xs text-green-400 font-semibold">
                  Live On-Chain Activity
                </span>
              </div>
            </div>

            {/* Log entries */}
            <div className="p-5 space-y-2 min-h-[220px]">
              <AnimatePresence>
                {visibleLogs.map((entry, i) =>
                <motion.div
                  key={`${entry.hash}-${entry.action}`}
                  initial={{
                    opacity: 0,
                    y: -12,
                    height: 0
                  }}
                  animate={{
                    opacity: 1 - i * 0.15,
                    y: 0,
                    height: 'auto'
                  }}
                  exit={{
                    opacity: 0,
                    height: 0
                  }}
                  transition={{
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="flex items-center gap-3 font-mono text-xs">

                    <span className="text-green-400 flex-shrink-0">
                      {entry.hash}
                    </span>
                    <span className="text-slate-500">→</span>
                    <span className={`font-bold flex-shrink-0 ${entry.color}`}>
                      {entry.type}:
                    </span>
                    <span className="text-slate-300 flex-1 truncate">
                      {entry.action}
                    </span>
                    <span className="text-green-400 flex-shrink-0 font-bold">
                      {entry.status}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer stats */}
            <div className="px-5 py-3 border-t border-green-500/10 bg-slate-900/40 flex items-center gap-6 flex-wrap">
              <span className="text-xs font-mono text-slate-500">
                Block height: <span className="text-green-400">18,847,293</span>
              </span>
              <span className="text-xs font-mono text-slate-500">
                TPS: <span className="text-green-400">4,200</span>
              </span>
              <span className="text-xs font-mono text-slate-500">
                Finality: <span className="text-green-400">0.4s</span>
              </span>
              <span className="text-xs font-mono text-slate-500">
                Encryption:{' '}
                <span className="text-purple-400">CRYSTALS-Kyber</span>
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Part 5: Bottom CTA ── */}
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
          className="text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-3xl p-10">

          <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">
            Your data. Your chain. Your control.
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            No centralized database. No third-party data brokers. No hidden
            copies. Every byte you generate is cryptographically yours.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-green-500/40 text-green-400 font-bold hover:bg-green-500/10 transition-all text-sm">
              <FileTextIcon className="w-4 h-4" />
              View Security Whitepaper
            </button>
            <button className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold transition-all text-sm shadow-lg">
              <ZapIcon className="w-4 h-4" />
              Start Secure Trial
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>);

}