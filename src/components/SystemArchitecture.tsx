import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  CloudIcon,
  ShieldCheckIcon,
  CpuIcon,
  RadioIcon,
  UsersIcon,
  WifiOffIcon,
  LockIcon,
  AtomIcon } from
'lucide-react';
const architectureLayers = [
{
  num: 1,
  name: 'Quantum Augmentation Layer',
  desc: 'Optimization, simulation, and probabilistic forecasting',
  icon: SparklesIcon,
  gradient: 'from-purple-600 to-purple-800',
  leftBorder: 'border-l-purple-500',
  bg: 'bg-purple-500/10',
  border: 'border-purple-500/30',
  active: false,
  badge: 'Roadmap'
},
{
  num: 2,
  name: 'Global Intelligence Cloud',
  desc: 'Orchestration, learning network, and cross-industry intelligence',
  icon: CloudIcon,
  gradient: 'from-blue-600 to-blue-800',
  leftBorder: 'border-l-blue-500',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/30',
  active: false,
  badge: 'Active'
},
{
  num: 3,
  name: 'Blockchain Trust Layer / Agent Verification',
  desc: 'Immutable audit trails, zero-trust verification, smart contracts',
  icon: ShieldCheckIcon,
  gradient: 'from-green-600 to-green-800',
  leftBorder: 'border-l-green-500',
  bg: 'bg-green-500/10',
  border: 'border-green-500/30',
  active: true,
  badge: 'Active'
},
{
  num: 4,
  name: 'CatapultOS Control Layer',
  desc: 'Agent orchestration, workflow engine, and decision governance',
  icon: CpuIcon,
  gradient: 'from-gold-500 to-gold-700',
  leftBorder: 'border-l-gold-500',
  bg: 'bg-gold-500/10',
  border: 'border-gold-500/30',
  active: true,
  badge: 'Active'
},
{
  num: 5,
  name: 'Edge AI Runtime (Guide Beacon Devices)',
  desc: 'Local cognition, private data, continuous sensing, offline execution',
  icon: RadioIcon,
  gradient: 'from-accent-500 to-accent-700',
  leftBorder: 'border-l-accent-500',
  bg: 'bg-accent-500/10',
  border: 'border-accent-500/30',
  active: true,
  badge: 'Active'
},
{
  num: 6,
  name: 'Human Behavior + Environment',
  desc: 'Speech, habits, decisions, routines, and environmental context',
  icon: UsersIcon,
  gradient: 'from-slate-500 to-slate-700',
  leftBorder: 'border-l-slate-400',
  bg: 'bg-slate-500/10',
  border: 'border-slate-500/30',
  active: false,
  badge: 'Input'
}];

const agentHierarchy = [
{
  label: 'Meta Governor Agent',
  level: 0,
  color: 'text-gold-400'
},
{
  label: 'CEO  |  COO  |  CFO  |  CTO  |  Growth  |  Compliance',
  level: 1,
  color: 'text-accent-400'
},
{
  label: 'Department Agents',
  level: 2,
  color: 'text-blue-400'
},
{
  label: 'Task Agents',
  level: 3,
  color: 'text-green-400'
},
{
  label: 'Edge Execution Agents (Beacon-triggered)',
  level: 4,
  color: 'text-slate-300'
}];

const benefits = [
{
  title: 'Offline Capable',
  desc: 'Operates during cloud disconnection via edge runtime',
  icon: WifiOffIcon,
  color: 'text-accent-400'
},
{
  title: 'Zero-Trust Security',
  desc: 'Every component continuously verified and validated',
  icon: LockIcon,
  color: 'text-green-400'
},
{
  title: 'Quantum-Ready',
  desc: 'Post-quantum cryptography active, QAI modules ready',
  icon: AtomIcon,
  color: 'text-purple-400'
}];

export function SystemArchitecture() {
  return (
    <section id="architecture" className="w-full bg-slate-950 py-20 lg:py-32">
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
            className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-5 py-2 mb-6">

            <CpuIcon className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-300 uppercase tracking-wide">
              System Architecture
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Hybrid Edge + Cloud
            <br />
            <span className="text-gold-400">Intelligence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Architecture Stack */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              Platform Stack (Top → Bottom)
            </h3>
            <div className="space-y-2">
              {architectureLayers.map((layer, index) => {
                const Icon = layer.icon;
                return (
                  <motion.div
                    key={layer.num}
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
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    className={`relative ${layer.bg} border ${layer.border} border-l-4 ${layer.leftBorder} rounded-r-2xl rounded-l-sm p-4`}>

                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${layer.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-white text-sm">
                            {layer.name}
                          </p>
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${layer.badge === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : layer.badge === 'Roadmap' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'}`}>

                            {layer.active &&
                            <motion.span
                              animate={{
                                opacity: [1, 0.3, 1]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity
                              }}
                              className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1 align-middle" />

                            }
                            {layer.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {layer.desc}
                        </p>
                      </div>
                    </div>
                    {/* Connector */}
                    {index < architectureLayers.length - 1 &&
                    <motion.div
                      animate={{
                        opacity: [0.3, 0.8, 0.3]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className="absolute -bottom-1.5 left-6 w-0.5 h-3 bg-white/20" />

                    }
                  </motion.div>);

              })}
            </div>
          </div>

          {/* Agent Hierarchy */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              Agent Hierarchy
            </h3>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div className="space-y-1">
                {agentHierarchy.map((node, i) =>
                <motion.div
                  key={i}
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
                    delay: i * 0.1
                  }}
                  className="relative"
                  style={{
                    paddingLeft: `${node.level * 16}px`
                  }}>

                    {node.level > 0 &&
                  <div
                    className="absolute left-0 top-3 w-px bg-white/10"
                    style={{
                      left: `${(node.level - 1) * 16 + 6}px`,
                      height: '100%'
                    }} />

                  }
                    <div className="flex items-center gap-2 py-2">
                      {node.level > 0 &&
                    <div
                      className="w-3 h-px bg-white/20 flex-shrink-0"
                      style={{
                        marginLeft: node.level > 0 ? '0' : undefined
                      }} />

                    }
                      <motion.div
                      animate={
                      node.level <= 1 ?
                      {
                        opacity: [1, 0.5, 1]
                      } :
                      {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                      className={`text-xs font-semibold ${node.color} leading-tight`}>

                        {node.label}
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-xs text-slate-500 mb-3">Agent Negotiation</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="w-2 h-2 bg-gold-400 rounded-full" />

                  Agents negotiate internally and present decisions to human
                  operators
                </div>
              </div>
            </div>

            {/* Network effect */}
            <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                Network Effect
              </p>
              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  Cross-industry learning
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  Optimization intelligence
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                  Behavioral modeling scale
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
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
                  delay: i * 0.1
                }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4">

                <Icon
                  className={`w-6 h-6 ${benefit.color} flex-shrink-0 mt-0.5`} />

                <div>
                  <h4 className="font-bold text-white mb-1">{benefit.title}</h4>
                  <p className="text-sm text-slate-400">{benefit.desc}</p>
                </div>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

}