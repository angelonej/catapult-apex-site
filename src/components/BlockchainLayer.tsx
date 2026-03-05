import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  UserIcon,
  BrainIcon,
  ActivityIcon,
  FileCheckIcon,
  CheckCircleIcon,
  ZapIcon,
  DollarSignIcon,
  LockIcon,
  HeartPulseIcon } from
'lucide-react';
const trustLayers = [
{
  num: 1,
  name: 'User Permission',
  desc: 'Explicit consent required for every action scope',
  icon: UserIcon,
  color: 'blue',
  gradient: 'from-blue-500/20 to-blue-600/10',
  border: 'border-blue-500/40',
  iconBg: 'from-blue-500 to-blue-700'
},
{
  num: 2,
  name: 'Agent Confidence Model',
  desc: 'AI confidence threshold must exceed 85% to proceed',
  icon: BrainIcon,
  color: 'gold',
  gradient: 'from-gold-500/20 to-gold-600/10',
  border: 'border-gold-500/40',
  iconBg: 'from-gold-400 to-gold-600'
},
{
  num: 3,
  name: 'Blockchain Verification',
  desc: 'Action hashed and recorded on immutable ledger',
  icon: ShieldCheckIcon,
  color: 'green',
  gradient: 'from-green-500/20 to-green-600/10',
  border: 'border-green-500/40',
  iconBg: 'from-green-500 to-green-700'
},
{
  num: 4,
  name: 'Behavioral Consistency',
  desc: 'Pattern matches established behavioral baseline',
  icon: ActivityIcon,
  color: 'purple',
  gradient: 'from-purple-500/20 to-purple-600/10',
  border: 'border-purple-500/40',
  iconBg: 'from-purple-500 to-purple-700'
},
{
  num: 5,
  name: 'Smart Contract Authorization',
  desc: 'Execution rights confirmed via on-chain contract',
  icon: FileCheckIcon,
  color: 'accent',
  gradient: 'from-accent-500/20 to-accent-600/10',
  border: 'border-accent-500/40',
  iconBg: 'from-accent-500 to-accent-700'
}];

const verifiedItems = [
'Agent Identity',
'Agent Actions',
'Workflow Execution',
'Financial Transactions',
'Biometric Auth Hashes',
'Medical Records (HIPAA)',
'Data Ownership',
'Permission Grants',
'AGI Decision Audit Trail',
'Employee Dividend Payments',
'Outcome Verification',
'Model Training Lineage'];

const smartContracts = [
{
  title: 'Outcome-Based Payments',
  desc: 'Revenue improvement triggers automatic payment release',
  icon: DollarSignIcon,
  color: 'from-green-500 to-green-700'
},
{
  title: 'Automation Authorization',
  desc: 'Smart contracts govern which agents can execute which actions',
  icon: ZapIcon,
  color: 'from-gold-400 to-gold-600'
},
{
  title: 'Performance Incentives',
  desc: 'Agent performance bonuses distributed via verified outcomes',
  icon: ActivityIcon,
  color: 'from-blue-500 to-blue-700'
},
{
  title: 'AGI Safety Constraints',
  desc: 'Smart contracts encode behavioral limits that AGI cannot override',
  icon: ShieldCheckIcon,
  color: 'from-purple-500 to-purple-700'
}];

const compliancePills = [
{
  label: 'HIPAA-Aligned Architecture',
  color: 'bg-green-500/20 border-green-500/40 text-green-400'
},
{
  label: 'FedRAMP-Ready Design',
  color: 'bg-blue-500/20 border-blue-500/40 text-blue-400'
},
{
  label: 'Government-Grade Crypto',
  color: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
}];

export function BlockchainLayer() {
  return (
    <section
      id="security"
      className="w-full bg-gradient-to-b from-slate-900 to-slate-950 py-20 lg:py-32">

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
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-5 py-2 mb-6">

            <ShieldCheckIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-300 uppercase tracking-wide">
              Safe Blockchain · HIPAA · FedRAMP
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Every Action. <span className="text-green-400">Verified.</span>
            <br />
            Every Record. On-Chain.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Not cryptocurrency. Trust infrastructure. Every agent action is
            hashed, verified, and permanently recorded — built for HIPAA-aligned
            and government-grade deployments.
          </p>

          {/* Compliance pills */}
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
              delay: 0.4,
              duration: 0.4
            }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6">

            {compliancePills.map((pill, i) =>
            <motion.div
              key={pill.label}
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
                delay: 0.5 + i * 0.08,
                type: 'spring',
                stiffness: 300
              }}
              className={`inline-flex items-center gap-1.5 border rounded-full px-4 py-1.5 text-xs font-bold ${pill.color}`}>

                <CheckCircleIcon className="w-3.5 h-3.5" />
                {pill.label}
              </motion.div>
            )}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Trust Stack */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              5-Layer Verification Stack
            </h3>
            <div className="space-y-3">
              {trustLayers.map((layer, index) => {
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
                    }}>

                    <div
                      className={`relative bg-gradient-to-r ${layer.gradient} border ${layer.border} rounded-2xl p-4`}>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className="text-xs font-black text-slate-500 w-4">
                            {layer.num}
                          </span>
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${layer.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>

                            <Icon className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-white">{layer.name}</p>
                          <p className="text-xs text-slate-400">{layer.desc}</p>
                        </div>
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
                            delay: 0.4 + index * 0.1,
                            type: 'spring',
                            stiffness: 400
                          }}
                          className="flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 flex-shrink-0">

                          <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-xs font-semibold text-green-400">
                            Verified
                          </span>
                        </motion.div>
                      </div>
                      {index < trustLayers.length - 1 &&
                      <div className="absolute -bottom-3 left-8 w-0.5 h-3 bg-gradient-to-b from-white/20 to-transparent z-10" />
                      }
                    </div>
                  </motion.div>);

              })}
            </div>
          </div>

          {/* What Gets Verified */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              What Gets Verified
            </h3>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 mb-6">
              <div className="space-y-2.5">
                {verifiedItems.map((item, i) =>
                <motion.div
                  key={item}
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
                    delay: i * 0.05
                  }}
                  className="flex items-center gap-3">

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
                      delay: 0.3 + i * 0.05,
                      type: 'spring',
                      stiffness: 500
                    }}>

                      <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                    </motion.div>
                    <span className="text-sm text-slate-200">{item}</span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Live hash animation */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-4">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
                Live Block Hash
              </p>
              <motion.p
                animate={{
                  opacity: [1, 0.5, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                className="text-xs font-mono text-green-400 break-all leading-relaxed">

                0x7f3a9b2c1d8e4f6a0b5c9d3e7f1a2b4c8d6e0f3a9b2c1d8e4f6a0b5c9d3e7f1a
              </motion.p>
              <div className="flex items-center gap-2 mt-3">
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity
                  }}
                  className="w-2 h-2 bg-green-400 rounded-full" />

                <span className="text-xs text-green-400">
                  Confirmed on ledger
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Contract Use Cases — now 4 cards */}
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
            Smart Contract Use Cases
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {smartContracts.map((contract, i) => {
              const Icon = contract.icon;
              return (
                <motion.div
                  key={contract.title}
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
                    className={`w-12 h-12 bg-gradient-to-br ${contract.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>

                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-white mb-2">
                    {contract.title}
                  </h4>
                  <p className="text-sm text-slate-400">{contract.desc}</p>
                </motion.div>);

            })}
          </div>
        </motion.div>
      </div>
    </section>);

}