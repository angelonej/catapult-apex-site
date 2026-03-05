import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { LogoWithText } from './ui/Logo';
import {
  QrCodeIcon,
  PlayIcon,
  ZapIcon,
  ClockIcon,
  UsersIcon,
  BrainIcon,
  TrendingUpIcon,
  CheckCircleIcon,
  ActivityIcon,
  SparklesIcon } from
'lucide-react';
interface HeroProps {
  onStartOnboarding?: () => void;
}
const agentActivities = [
{
  agent: 'CEO',
  action: 'Coaching team on growth philosophy...',
  color: 'gold'
},
{
  agent: 'CFO',
  action: 'Optimizing cash flow model...',
  color: 'blue'
},
{
  agent: 'COO',
  action: 'Scheduling crew rotations...',
  color: 'green'
},
{
  agent: 'CMO',
  action: 'Launching email campaign...',
  color: 'purple'
}];

function AnimatedCounter({
  target,
  duration = 2000



}: {target: number;duration?: number;}) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{Math.floor(count).toLocaleString()}</>;
}
export function Hero({ onStartOnboarding }: HeroProps) {
  const [activeAgent, setActiveAgent] = useState(0);
  const [decisions, setDecisions] = useState(1247);
  useEffect(() => {
    const agentTimer = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % agentActivities.length);
    }, 2500);
    const decisionTimer = setInterval(() => {
      setDecisions((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 1800);
    return () => {
      clearInterval(agentTimer);
      clearInterval(decisionTimer);
    };
  }, []);
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden flex flex-col">
      {/* Ambient glow orbs — subtle, not decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.18, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-accent-600 rounded-full blur-[140px]" />

        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.07, 0.13, 0.07]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4
          }}
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gold-600 rounded-full blur-[140px]" />

      </div>

      {/* Live status badge — top right */}
      <motion.div
        initial={{
          opacity: 0,
          y: -20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 1.5,
          duration: 0.6
        }}
        className="absolute top-24 right-8 z-20 hidden lg:flex items-center gap-2 bg-white/8 backdrop-blur-md border border-white/15 rounded-full px-4 py-2">

        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [1, 0.6, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity
          }}
          className="w-2.5 h-2.5 bg-green-400 rounded-full" />

        <span className="text-sm font-semibold text-white">AI Team Active</span>
        <span className="text-xs text-white/50">
          {decisions.toLocaleString()} decisions today
        </span>
      </motion.div>

      <div className="relative flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* LEFT: Content */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut'
            }}>

            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.3,
                duration: 0.5
              }}
              className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-5 py-2 mb-8">

              <SparklesIcon className="w-4 h-4 text-gold-400" />
              <span className="text-sm font-bold text-gold-300 tracking-wide uppercase">
                Activate. Delegate. Evolve.
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.4,
                duration: 0.7
              }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[0.95] tracking-tight">

              Deploy Your
              <br />
              <span className="text-accent-400">AI Management</span>
              <br />
              Team
              <span className="text-gold-400"> In 5 Minutes</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5,
                duration: 0.6
              }}
              className="text-lg text-slate-300 mb-10 leading-relaxed max-w-xl">

              The first platform where SMBs instantly deploy an AI executive
              team — CEO, CFO, COO, CMO — with blockchain-verified decisions and
              Guide Beacon edge hardware.{' '}
              <span className="text-gold-400 font-semibold">
                Buy time back.
              </span>
            </motion.p>

            {/* CTAs */}
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
                delay: 0.6,
                duration: 0.6
              }}
              className="flex flex-col sm:flex-row gap-4 mb-12">

              <Button
                variant="primary"
                size="lg"
                onClick={onStartOnboarding}
                className="group bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 shadow-glow-md text-lg">

                <ZapIcon className="mr-2 w-5 h-5" />
                Deploy Free — Start Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-white/5 backdrop-blur-sm text-lg"
                onClick={() => {
                  const el = document.getElementById('platform');
                  if (el)
                  el.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>

                <PlayIcon className="mr-2 w-5 h-5" />
                See How It Works
              </Button>
            </motion.div>

            {/* Trust bar — honest numbers */}
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 0.9,
                duration: 0.6
              }}
              className="flex flex-wrap items-center gap-6 text-sm text-slate-400">

              <div className="flex items-center gap-2">
                <UsersIcon className="w-4 h-4 text-gold-400" />
                <span>12 design partners · pilot 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="w-4 h-4 text-gold-400" />
                <span>5-min deployment</span>
              </div>
              <div className="flex items-center gap-2">
                <BrainIcon className="w-4 h-4 text-gold-400" />
                <span>AGI-ready</span>
              </div>
            </motion.div>

            {/* Beacon link */}
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                delay: 1.0,
                duration: 0.5
              }}
              className="mt-5">

              <a
                href="#beacons"
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-gold-400 transition-colors">

                Explore Guide Beacons →
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Live Dashboard */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              x: 40
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0
            }}
            transition={{
              delay: 0.5,
              duration: 0.9,
              ease: 'easeOut'
            }}
            className="relative">

            {/* Main dashboard panel */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                    Live Command Center
                  </p>
                  <h3 className="text-lg font-bold text-white">Your AI Team</h3>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity
                    }}
                    className="w-2 h-2 bg-green-400 rounded-full" />

                  <span className="text-xs font-semibold text-green-400">
                    All Systems Active
                  </span>
                </div>
              </div>

              {/* CEO Agent */}
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
                  delay: 0.8,
                  duration: 0.5
                }}
                className="relative bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-2 border-gold-500/50 rounded-2xl p-4 mb-4 shadow-glow-gold">

                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold text-gold-400 bg-gold-500/20 px-2 py-0.5 rounded-full">
                    CEO
                  </span>
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-glow-gold">
                    <span className="text-slate-900 font-black text-lg">C</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">
                      Aria — Growth & Leadership AI
                    </p>
                    <p className="text-xs text-gold-300">
                      Chief Executive Officer
                    </p>
                  </div>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeAgent}
                    initial={{
                      opacity: 0,
                      y: 5
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -5
                    }}
                    transition={{
                      duration: 0.3
                    }}
                    className="flex items-center gap-2 text-sm text-slate-300">

                    <ActivityIcon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span>{agentActivities[activeAgent].action}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Decisions today</span>
                  <span className="text-gold-400 font-bold tabular-nums">
                    {decisions.toLocaleString()}
                  </span>
                </div>
              </motion.div>

              {/* Other agents */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                {
                  role: 'CFO',
                  color: 'from-blue-500/20 to-blue-600/10',
                  border: 'border-blue-500/30',
                  text: 'blue',
                  decisions: 47,
                  status: 'Optimizing'
                },
                {
                  role: 'COO',
                  color: 'from-green-500/20 to-green-600/10',
                  border: 'border-green-500/30',
                  text: 'green',
                  decisions: 156,
                  status: 'Scheduling'
                },
                {
                  role: 'CMO',
                  color: 'from-purple-500/20 to-purple-600/10',
                  border: 'border-purple-500/30',
                  text: 'purple',
                  decisions: 31,
                  status: 'Launching'
                }].
                map((agent, i) =>
                <motion.div
                  key={agent.role}
                  initial={{
                    opacity: 0,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: 1.0 + i * 0.1,
                    duration: 0.4
                  }}
                  className={`bg-gradient-to-br ${agent.color} border ${agent.border} rounded-xl p-3`}>

                    <div className="flex items-center justify-between mb-2">
                      <span
                      className={`text-xs font-bold text-${agent.text}-400`}>

                        {agent.role}
                      </span>
                      <motion.div
                      animate={{
                        opacity: [1, 0.4, 1]
                      }}
                      transition={{
                        duration: 1.5 + i * 0.3,
                        repeat: Infinity
                      }}
                      className={`w-1.5 h-1.5 bg-${agent.text}-400 rounded-full`} />

                    </div>
                    <p className="text-lg font-bold text-white tabular-nums">
                      {agent.decisions}
                    </p>
                    <p className="text-xs text-slate-400">{agent.status}...</p>
                  </motion.div>
                )}
              </div>

              {/* ROI bar */}
              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">ROI This Week</span>
                  <span className="text-sm font-bold text-green-400">
                    +$42,180
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: '78%'
                    }}
                    transition={{
                      delay: 1.5,
                      duration: 1.5,
                      ease: 'easeOut'
                    }}
                    className="h-2 bg-gradient-to-r from-accent-500 to-gold-500 rounded-full" />

                </div>
              </div>
            </div>

            {/* Single floating metric — one is enough */}
            <motion.div
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 1.8,
                duration: 0.5
              }}
              className="absolute -right-6 top-1/3 bg-accent-500 text-white px-4 py-2 rounded-xl shadow-glow-md text-sm font-bold">

              <TrendingUpIcon className="w-4 h-4 inline mr-1" />
              23 hrs saved/wk
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>);

}