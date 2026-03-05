import React, { useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LockIcon,
  ShieldCheckIcon,
  UserIcon,
  CpuIcon,
  BotIcon,
  DatabaseIcon,
  ZapIcon,
  CheckCircleIcon,
  AlertCircleIcon } from
'lucide-react';
const verificationMatrix = [
{
  name: 'User Identity',
  status: 'Verified',
  method: 'Biometric + PIN',
  confidence: 99.2,
  lastVerified: '0.3s ago'
},
{
  name: 'Device Identity',
  status: 'Verified',
  method: 'Hardware TPM',
  confidence: 100,
  lastVerified: '1.2s ago'
},
{
  name: 'Agent Identity',
  status: 'Verified',
  method: 'Blockchain Hash',
  confidence: 100,
  lastVerified: '0.8s ago'
},
{
  name: 'Data Access',
  status: 'Verified',
  method: 'Zero-Knowledge Proof',
  confidence: 98.7,
  lastVerified: '2.1s ago'
},
{
  name: 'Execution Rights',
  status: 'Verified',
  method: 'Smart Contract',
  confidence: 99.9,
  lastVerified: '0.5s ago'
}];

const securityRings = [
{
  label: 'Physical',
  sublabel: 'Beacon Hardware',
  size: 'w-64 h-64',
  color: 'border-accent-500/30'
},
{
  label: 'Edge',
  sublabel: 'Device OS',
  size: 'w-52 h-52',
  color: 'border-gold-500/30'
},
{
  label: 'Network',
  sublabel: 'Encrypted Comms',
  size: 'w-40 h-40',
  color: 'border-blue-500/30'
},
{
  label: 'App',
  sublabel: 'Agent Runtime',
  size: 'w-28 h-28',
  color: 'border-green-500/30'
},
{
  label: 'Core',
  sublabel: 'Data Vault',
  size: 'w-16 h-16',
  color: 'border-purple-500/40',
  center: true
}];

const initialEvents = [
{
  text: 'Agent CEO-001 identity verified',
  time: '2s ago',
  type: 'success'
},
{
  text: 'Blockchain hash confirmed',
  time: '5s ago',
  type: 'success'
},
{
  text: 'Behavioral pattern matched',
  time: '12s ago',
  type: 'success'
},
{
  text: 'Smart contract executed',
  time: '1m ago',
  type: 'success'
},
{
  text: 'Zero-knowledge proof validated',
  time: '2m ago',
  type: 'success'
}];

function useAnimatedCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = target / 60;
    const timer = setInterval(() => {
      setVal((prev) => {
        const n = prev + step;
        if (n >= target) {
          clearInterval(timer);
          return target;
        }
        return n;
      });
    }, 20);
    return () => clearInterval(timer);
  }, [active, target]);
  return Math.floor(val);
}
export function SecurityDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  const verifications = useAnimatedCounter(1247, isVisible);
  useEffect(() => {
    if (!isVisible) return;
    const newEventTexts = [
    'Agent CFO-001 permission granted',
    'Data access scope verified',
    'Quantum key rotated',
    'Behavioral baseline updated',
    'Smart contract triggered'];

    let idx = 0;
    const timer = setInterval(() => {
      setEvents((prev) => [
      {
        text: newEventTexts[idx % newEventTexts.length],
        time: 'just now',
        type: 'success'
      },
      ...prev.slice(0, 4)]
      );
      idx++;
    }, 3000);
    return () => clearInterval(timer);
  }, [isVisible]);
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
          onViewportEnter={() => setIsVisible(true)}
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

            <LockIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-300 uppercase tracking-wide">
              Zero-Trust Security
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Never Trust.
            <br />
            <span className="text-green-400">Always Verify.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Every component, every action, every agent continuously validated.
            Enterprise-grade security built into the architecture.
          </p>
        </motion.div>

        {/* Dashboard Panel */}
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
            duration: 0.7,
            delay: 0.2
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden mb-8">

          {/* Dashboard header bar */}
          <div className="bg-slate-900/80 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm font-semibold text-slate-300">
                Security Command Center
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
                All Clear
              </span>
            </div>
          </div>

          <div className="p-6">
            {/* Status Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1">Threat Level</p>
                <p className="text-2xl font-black text-green-400">Minimal</p>
                <div className="flex items-center gap-1 mt-1">
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                    className="w-1.5 h-1.5 bg-green-400 rounded-full" />

                  <span className="text-xs text-green-400">
                    All systems nominal
                  </span>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1">
                  Active Verifications
                </p>
                <p className="text-2xl font-black text-blue-400">
                  {verifications.toLocaleString()}
                </p>
                <p className="text-xs text-slate-400 mt-1">Today</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1">Blocked Attempts</p>
                <p className="text-2xl font-black text-green-400">0</p>
                <p className="text-xs text-green-400 mt-1">Zero breaches</p>
              </div>
              <div className="bg-gold-500/10 border border-gold-500/30 rounded-2xl p-4">
                <p className="text-xs text-slate-400 mb-1">Compliance Score</p>
                <p className="text-2xl font-black text-gold-400">99.8%</p>
                <p className="text-xs text-slate-400 mt-1">SOC 2 Type II</p>
              </div>
            </div>

            {/* Verification Matrix */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Verification Matrix
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-slate-500 uppercase tracking-widest">
                      <th className="text-left pb-3 pr-4">Component</th>
                      <th className="text-left pb-3 pr-4">Status</th>
                      <th className="text-left pb-3 pr-4">Method</th>
                      <th className="text-left pb-3 pr-4">Confidence</th>
                      <th className="text-left pb-3">Last Verified</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-2">
                    {verificationMatrix.map((row, i) =>
                    <motion.tr
                      key={row.name}
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
                      className="border-t border-white/5">

                        <td className="py-3 pr-4 text-sm font-medium text-white">
                          {row.name}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-1.5">
                            <CheckCircleIcon className="w-4 h-4 text-green-400" />
                            <span className="text-xs text-green-400 font-semibold">
                              {row.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-slate-400">
                          {row.method}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-white/10 rounded-full h-1.5">
                              <motion.div
                              initial={{
                                width: 0
                              }}
                              whileInView={{
                                width: `${row.confidence}%`
                              }}
                              viewport={{
                                once: true
                              }}
                              transition={{
                                delay: 0.5 + i * 0.1,
                                duration: 0.8
                              }}
                              className="h-1.5 bg-green-400 rounded-full" />

                            </div>
                            <span className="text-xs text-green-400">
                              {row.confidence}%
                            </span>
                          </div>
                        </td>
                        <td className="py-3 text-xs text-slate-500">
                          {row.lastVerified}
                        </td>
                      </motion.tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom: Rings + Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Concentric Security Rings */}
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                  Security Layers
                </h3>
                <div className="relative flex items-center justify-center h-72">
                  {securityRings.map((ring, i) =>
                  <motion.div
                    key={ring.label}
                    initial={{
                      opacity: 0,
                      scale: 0.5
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
                      stiffness: 200
                    }}
                    className={`absolute ${ring.size} border ${ring.color} rounded-full flex items-center justify-center`}>

                      {i === 0 &&
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <span className="text-xs text-accent-400 font-semibold">
                            {ring.label}
                          </span>
                        </div>
                    }
                    </motion.div>
                  )}
                  {/* Labels */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 text-center">
                    <span className="text-xs text-accent-400 font-semibold">
                      Physical
                    </span>
                  </div>
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
                    <span className="text-xs text-gold-400 font-semibold">
                      Edge
                    </span>
                  </div>
                  <div className="absolute top-16 left-1/2 -translate-x-1/2 text-center">
                    <span className="text-xs text-blue-400 font-semibold">
                      Network
                    </span>
                  </div>
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 text-center">
                    <span className="text-xs text-green-400 font-semibold">
                      App
                    </span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center shadow-lg z-10">
                    <DatabaseIcon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </div>

              {/* Live Events Feed */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity
                    }}
                    className="w-2 h-2 bg-green-400 rounded-full" />

                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                    Live Security Events
                  </h3>
                </div>
                <div className="space-y-2">
                  <AnimatePresence>
                    {events.map((event, i) =>
                    <motion.div
                      key={`${event.text}-${i}`}
                      initial={{
                        opacity: 0,
                        x: 20,
                        height: 0
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        height: 'auto'
                      }}
                      exit={{
                        opacity: 0,
                        height: 0
                      }}
                      transition={{
                        duration: 0.3
                      }}
                      className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">

                        <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm text-slate-300 flex-1">
                          {event.text}
                        </span>
                        <span className="text-xs text-slate-500 flex-shrink-0">
                          {event.time}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}