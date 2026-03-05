import React from 'react';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  DollarSignIcon,
  BarChart3Icon,
  PackageIcon } from
'lucide-react';
const securityItems = [
{
  label: 'Post-quantum cryptography',
  desc: 'NIST-approved algorithms active'
},
{
  label: 'Lattice-based encryption',
  desc: 'Resistant to quantum attacks'
},
{
  label: 'Quantum-safe key exchange',
  desc: 'CRYSTALS-Kyber protocol'
},
{
  label: 'Distributed key rotation',
  desc: 'Automatic rotation every 24h'
},
{
  label: 'Quantum-resistant identity',
  desc: 'Hash-based signature schemes'
}];

const roadmapItems = [
{
  label: 'Massive optimization problems',
  timeline: 'Q1 2026'
},
{
  label: 'Probabilistic scenario modeling',
  timeline: 'Q3 2026'
},
{
  label: 'Enterprise simulation environments',
  timeline: 'Q1 2027'
},
{
  label: 'Multi-agent strategic forecasting',
  timeline: 'Q3 2027'
}];

const useCases = [
{
  title: 'Logistics Optimization',
  desc: 'Route and delivery optimization across thousands of variables',
  icon: TruckIcon,
  color: 'from-blue-500 to-blue-700'
},
{
  title: 'Pricing Models',
  desc: 'Real-time dynamic pricing across complex market conditions',
  icon: DollarSignIcon,
  color: 'from-green-500 to-green-700'
},
{
  title: 'Portfolio Decisions',
  desc: 'Multi-dimensional portfolio optimization and risk modeling',
  icon: BarChart3Icon,
  color: 'from-gold-400 to-gold-600'
},
{
  title: 'Supply Chain',
  desc: 'End-to-end supply chain coordination and disruption prediction',
  icon: PackageIcon,
  color: 'from-purple-500 to-purple-700'
}];

export function QuantumLayer() {
  return (
    <section className="w-full bg-gradient-to-b from-slate-900 to-slate-950 py-20 lg:py-32">
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
            className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 rounded-full px-5 py-2 mb-6">

            <SparklesIcon className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300 uppercase tracking-wide">
              Quantum Augmentation Layer
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Quantum-Ready.
            <br />
            <span className="text-purple-400">Future-Proof.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Platform built with post-quantum cryptography today.
            Quantum-Augmented AI (QAI) modules ready for activation as quantum
            computing matures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start">
          {/* Quantum Security — Active Now */}
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

            <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircleIcon className="w-4 h-4 text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Quantum Security</h3>
                  <span className="text-xs text-green-400 font-semibold">
                    Active Now
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {securityItems.map((item, i) =>
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    x: -10
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
                  className="flex items-start gap-3">

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
                      delay: 0.3 + i * 0.1,
                      type: 'spring',
                      stiffness: 400
                    }}>

                      <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Quantum AI — Coming */}
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
            }}>

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Quantum-Augmented AI</h3>
                  <span className="text-xs text-purple-400 font-semibold">
                    On Roadmap
                  </span>
                </div>
              </div>

              {/* Animated wave */}
              <div className="relative h-16 mb-6 overflow-hidden rounded-xl bg-purple-500/5 border border-purple-500/20">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 64"
                  preserveAspectRatio="none">

                  <motion.path
                    d="M0,32 C50,10 100,54 150,32 C200,10 250,54 300,32 C350,10 400,54 400,32"
                    fill="none"
                    stroke="rgba(168,85,247,0.6)"
                    strokeWidth="2"
                    animate={{
                      pathLength: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }} />

                  <motion.path
                    d="M0,40 C50,18 100,62 150,40 C200,18 250,62 300,40 C350,18 400,62 400,40"
                    fill="none"
                    stroke="rgba(168,85,247,0.3)"
                    strokeWidth="1.5"
                    animate={{
                      pathLength: [0, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.5
                    }} />

                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-semibold text-purple-300">
                    Quantum Wave Function
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {roadmapItems.map((item, i) =>
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
                    delay: i * 0.1
                  }}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-3">

                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="text-sm text-slate-200">
                        {item.label}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                      {item.timeline}
                    </span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Use Cases */}
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
          }}>

          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest text-center mb-8">
            Quantum Optimization Use Cases
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={uc.title}
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-5">

                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${uc.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>

                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-white text-sm">{uc.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{uc.desc}</p>
                  <span className="text-xs font-semibold text-purple-400 bg-purple-500/20 border border-purple-500/30 px-2 py-0.5 rounded-full">
                    QAI Enhanced
                  </span>
                </motion.div>);

            })}
          </div>
        </motion.div>
      </div>
    </section>);

}