import React, { useState, Fragment, createElement } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldIcon,
  DatabaseIcon,
  NetworkIcon,
  LinkIcon,
  CpuIcon,
  TrendingUpIcon,
  LockIcon,
  UsersIcon,
  RadioIcon,
  BrainIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ZapIcon,
  GlobeIcon } from
'lucide-react';
const moats = [
{
  id: 'hardware',
  number: '01',
  title: 'Physical Hardware Barrier',
  subtitle: 'Guide Beacon Manufacturing Moat',
  icon: RadioIcon,
  color: 'from-accent-500 to-accent-700',
  borderColor: 'border-accent-500/30',
  bgColor: 'bg-accent-500/10',
  textColor: 'text-accent-400',
  description:
  'Competitors can copy software. They cannot copy hardware. Guide Beacons require semiconductor partnerships, manufacturing scale, and 18+ months of supply chain development.',
  barriers: [
  'Custom ASIC chip design (proprietary)',
  'Exclusive sensor array patents (filed)',
  '18-month hardware manufacturing lead time',
  'Offline-first edge AI runtime (unique)',
  'Physical presence in customer facilities'],

  stat: '18 months',
  statLabel: 'minimum to replicate hardware',
  impossible: false
},
{
  id: 'data',
  number: '02',
  title: 'Proprietary Data Flywheel',
  subtitle: 'Behavioral Intelligence Compounding',
  icon: DatabaseIcon,
  color: 'from-blue-500 to-blue-700',
  borderColor: 'border-blue-500/30',
  bgColor: 'bg-blue-500/10',
  textColor: 'text-blue-400',
  description:
  'Every business that joins makes the platform smarter for all others. Our 12 pilot partners generate daily behavioral data — a proprietary dataset that compounds with every new deployment.',
  barriers: [
  '12 pilot partners × daily behavioral data (growing)',
  'Cross-industry pattern recognition (unique)',
  'Skill Transfer Packets (proprietary format)',
  'Compounding advantage: more users = smarter AI',
  'First-mover data advantage — impossible to buy'],

  stat: '12 partners',
  statLabel: 'seeding the model (pilot 2026)',
  impossible: false
},
{
  id: 'network',
  number: '03',
  title: 'Cross-Industry Network Effects',
  subtitle: 'Intelligence That Scales With Users',
  icon: NetworkIcon,
  color: 'from-green-500 to-green-700',
  borderColor: 'border-green-500/30',
  bgColor: 'bg-green-500/10',
  textColor: 'text-green-400',
  description:
  'When a landscaping company solves a scheduling problem, every HVAC company benefits. When a medical practice optimizes billing, every law firm learns. This cross-pollination is impossible to replicate without the network.',
  barriers: [
  'Landscaping insights improve HVAC scheduling',
  'Medical billing patterns reduce legal errors',
  'Restaurant waste reduction teaches retail',
  "Network value grows exponentially (Metcalfe's Law)",
  'First-mover advantage locks in the data loop'],

  stat: '47 industries',
  statLabel: 'pre-trained at launch',
  impossible: false
},
{
  id: 'switching',
  number: '04',
  title: 'Deep Switching Costs',
  subtitle: 'The Deeper You Go, The Harder to Leave',
  icon: LinkIcon,
  color: 'from-gold-500 to-gold-700',
  borderColor: 'border-gold-500/30',
  bgColor: 'bg-gold-500/10',
  textColor: 'text-gold-400',
  description:
  'After 90 days, your AI team has learned your business patterns, integrated with 20+ tools, and built custom Skill Transfer Packets. Switching means starting over — and losing institutional knowledge.',
  barriers: [
  'Custom agent behavioral training (non-transferable)',
  '20+ deep integrations per customer',
  'Skill Transfer Packets (proprietary format)',
  'Blockchain audit history (compliance dependency)',
  'Rewards tier and badge history'],

  stat: '90 days',
  statLabel: 'to full lock-in',
  impossible: false
},
{
  id: 'regulatory',
  number: '05',
  title: 'Compliance Architecture',
  subtitle: 'Built for Regulated Industries from Day One',
  icon: ShieldIcon,
  color: 'from-purple-500 to-purple-700',
  borderColor: 'border-purple-500/30',
  bgColor: 'bg-purple-500/10',
  textColor: 'text-purple-400',
  description:
  'Designed for SOC 2 Type II, HIPAA, and GDPR compliance from the ground up — with blockchain-verified audit trails. New entrants face the same multi-year certification process before they can serve regulated industries.',
  barriers: [
  'SOC 2 Type II architecture (certification in progress)',
  'HIPAA-ready data handling and BAA framework',
  'GDPR Data Processing Agreement templates',
  'Blockchain immutable audit (built-in from day one)',
  'Compliance-first design — not retrofitted'],

  stat: '18+ months',
  statLabel: 'for competitors to certify',
  impossible: false
}];

const flywheelSteps = [
{
  label: 'More Businesses Join',
  icon: UsersIcon,
  color: 'text-accent-400'
},
{
  label: 'More Behavioral Data',
  icon: DatabaseIcon,
  color: 'text-blue-400'
},
{
  label: 'Smarter AI Agents',
  icon: BrainIcon,
  color: 'text-green-400'
},
{
  label: 'Better Outcomes',
  icon: TrendingUpIcon,
  color: 'text-gold-400'
},
{
  label: 'More Businesses Join',
  icon: UsersIcon,
  color: 'text-accent-400'
}];

export function MoatSection() {
  const [activeMoat, setActiveMoat] = useState(0);
  const moat = moats[activeMoat];
  return (
    <section className="w-full bg-slate-950 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            margin: '-100px'
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
              delay: 0.2
            }}
            className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/40 rounded-full px-5 py-2 mb-6">

            <LockIcon className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-red-300 uppercase tracking-wide">
              Competitive Barriers
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            5 Reasons We
            <br />
            <span className="text-red-400">Can't Be Copied.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Building a great product isn't enough. We've engineered structural
            advantages that compound over time — hardware, data, network
            effects, switching costs, and regulatory moats.
          </p>
        </motion.div>

        {/* Data Flywheel visualization */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-3xl p-8 mb-16">

          <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            The Data Flywheel — Our Compounding Advantage
          </h3>
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {flywheelSteps.slice(0, 4).map((step, i) => {
              const Icon = step.icon;
              return (
                <Fragment key={i}>
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: i * 0.15
                    }}
                    className="flex flex-col items-center gap-2 px-4">

                    <motion.div
                      animate={{
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5
                      }}
                      className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">

                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </motion.div>
                    <p className="text-xs text-slate-300 text-center max-w-[80px] leading-tight">
                      {step.label}
                    </p>
                  </motion.div>
                  {i < 3 &&
                  <motion.div
                    animate={{
                      x: [0, 4, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}>

                      <ArrowRightIcon className="w-5 h-5 text-white/20 mx-1" />
                    </motion.div>
                  }
                </Fragment>);

            })}
            <motion.div
              animate={{
                x: [0, 4, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.9
              }}>

              <ArrowRightIcon className="w-5 h-5 text-white/20 mx-1" />
            </motion.div>
            <div className="flex flex-col items-center gap-2 px-4">
              <div className="w-14 h-14 bg-accent-500/20 border-2 border-accent-500/50 rounded-2xl flex items-center justify-center">
                <ZapIcon className="w-6 h-6 text-accent-400" />
              </div>
              <p className="text-xs text-accent-400 font-bold text-center max-w-[80px] leading-tight">
                Repeat ∞
              </p>
            </div>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Every new customer makes the platform better for all existing
            customers.{' '}
            <span className="text-white">
              This is a winner-take-most dynamic.
            </span>
          </p>
        </motion.div>

        {/* Moat tabs + detail */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-8">
          {moats.map((m, i) => {
            const Icon = m.icon;
            const isActive = i === activeMoat;
            return (
              <motion.button
                key={m.id}
                initial={{
                  opacity: 0,
                  y: 15
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: i * 0.08
                }}
                onClick={() => setActiveMoat(i)}
                className={`relative p-4 rounded-2xl border text-left transition-all ${isActive ? `${m.bgColor} ${m.borderColor} border-2` : 'bg-white/5 border-white/10 hover:border-white/20'}`}>

                <div
                  className={`w-10 h-10 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center mb-3 shadow-lg`}>

                  <Icon className="w-5 h-5 text-white" />
                </div>
                <p
                  className={`text-xs font-black mb-1 ${isActive ? m.textColor : 'text-slate-500'}`}>

                  {m.number}
                </p>
                <p
                  className={`text-sm font-bold leading-tight ${isActive ? 'text-white' : 'text-slate-300'}`}>

                  {m.title}
                </p>
              </motion.button>);

          })}
        </div>

        {/* Active moat detail */}
        <motion.div
          key={activeMoat}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.3
          }}
          className={`${moat.bgColor} border-2 ${moat.borderColor} rounded-3xl p-8`}>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${moat.color} rounded-2xl flex items-center justify-center shadow-lg`}>

                  {createElement(moat.icon, {
                    className: 'w-6 h-6 text-white'
                  })}
                </div>
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-widest ${moat.textColor}`}>

                    {moat.subtitle}
                  </p>
                  <h3 className="text-2xl font-black text-white">
                    {moat.title}
                  </h3>
                </div>
              </div>
              <p className="text-slate-300 mb-6 leading-relaxed">
                {moat.description}
              </p>
              <div className="space-y-2">
                {moat.barriers.map((barrier, i) =>
                <motion.div
                  key={barrier}
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.07
                  }}
                  className="flex items-center gap-3">

                    <CheckCircleIcon
                    className={`w-4 h-4 ${moat.textColor} flex-shrink-0`} />

                    <span className="text-sm text-slate-200">{barrier}</span>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className={`${moat.bgColor} border ${moat.borderColor} rounded-2xl p-6 text-center`}>

                <p className={`text-5xl font-black ${moat.textColor} mb-2`}>
                  {moat.stat}
                </p>
                <p className="text-sm text-slate-400">{moat.statLabel}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                  Competitor Replication Cost
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Time required</span>
                    <span className="text-red-400 font-bold">2–5 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Capital required</span>
                    <span className="text-red-400 font-bold">$50M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data gap</span>
                    <span className="text-red-400 font-bold">Unbridgeable</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
                <LockIcon className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm font-bold text-green-400">
                  Structural Advantage
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Compounds over time
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom summary */}
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
            duration: 0.6,
            delay: 0.3
          }}
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4">

          {moats.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={m.id} className="text-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${m.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>

                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-xs font-bold text-white">
                  {m.title.split(' ').slice(0, 2).join(' ')}
                </p>
                <p className={`text-xs ${m.textColor} font-black mt-0.5`}>
                  {m.stat}
                </p>
              </div>);

          })}
        </motion.div>
      </div>
    </section>);

}