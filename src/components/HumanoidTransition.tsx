import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  RadioIcon,
  BotIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  BrainIcon,
  ZapIcon } from
'lucide-react';
const humanCaptures = [
'Workflows',
'Gestures',
'Decisions',
'Process sequencing',
'Environmental interaction'];

const milestones = [
{
  year: '2024',
  label: 'AI Agents',
  desc: 'Cloud + edge AI management teams deployed',
  color: 'bg-accent-500',
  active: true
},
{
  year: '2026',
  label: 'Embodied AI',
  desc: 'Behavioral datasets capture human expertise at scale',
  color: 'bg-gold-500',
  active: false
},
{
  year: '2028',
  label: 'Humanoid Integration',
  desc: 'Skill Transfer Packets consumed by humanoid systems',
  color: 'bg-blue-500',
  active: false
},
{
  year: '2030',
  label: 'Autonomous Enterprise',
  desc: 'Fully autonomous business operations',
  color: 'bg-purple-500',
  active: false
}];

function useCounter(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const step = target / 60;
    const timer = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [active, target]);
  return Math.floor(count);
}
export function HumanoidTransition() {
  const [isVisible, setIsVisible] = useState(false);
  const skillCount = useCounter(47, isVisible);
  const [hashIndex, setHashIndex] = useState(0);
  const hashes = [
  '0x4f7a2b9c1d3e8f0a',
  '0x9b3c7d1e5f2a8b4c',
  '0x2e8f4a7b1c9d3e5f'];

  useEffect(() => {
    const timer = setInterval(
      () => setHashIndex((prev) => (prev + 1) % hashes.length),
      2000
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32">
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
            className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/40 rounded-full px-5 py-2 mb-6">

            <BotIcon className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300 uppercase tracking-wide">
              Human Continuity Infrastructure
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Capture Human Expertise.
            <br />
            <span className="text-purple-400">Transfer to Machines.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Guide Beacons act as Human→Machine Knowledge Transfer Nodes. Your
            workflows become Skill Transfer Packets — blockchain verified and
            ready for humanoid consumption.
          </p>
        </motion.div>

        {/* 3-Column Flow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16 items-start">
          {/* Human Expert */}
          <motion.div
            initial={{
              opacity: 0,
              x: -30
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
            className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Human Expert</h3>
              <p className="text-sm text-slate-400">Source of knowledge</p>
            </div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
              Captures:
            </p>
            <div className="space-y-2">
              {humanCaptures.map((item, i) =>
              <motion.div
                key={item}
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
                  delay: 0.2 + i * 0.1
                }}
                className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-3 py-2">

                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                  <span className="text-sm text-blue-200">{item}</span>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Guide Beacon */}
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
              delay: 0.2
            }}
            className="bg-gradient-to-br from-gold-500/10 to-accent-500/10 border border-gold-500/30 rounded-3xl p-6">

            <div className="text-center mb-6">
              <div className="relative w-20 h-20 mx-auto mb-3">
                {[1, 2].map((i) =>
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5 + i * 0.3, 1],
                    opacity: [0.4, 0, 0.4]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.6
                  }}
                  className="absolute inset-0 border border-gold-500/40 rounded-full" />

                )}
                <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-700 rounded-full flex items-center justify-center shadow-glow-md">
                  <RadioIcon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">Guide Beacon</h3>
              <p className="text-sm text-gold-400">Transfer node</p>
            </div>

            <div className="space-y-3">
              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear'
                    }}>

                    <BrainIcon className="w-4 h-4 text-gold-400" />
                  </motion.div>
                  <span className="text-xs font-semibold text-gold-300">
                    Processing...
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Creating Skill Transfer Packets
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-xl p-3">
                <p className="text-xs text-slate-500 mb-1">Blockchain Hash</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={hashIndex}
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
                    className="text-xs font-mono text-green-400 truncate">

                    {hashes[hashIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3">
                <ShieldCheckIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-green-300">
                  Verified on Ledger
                </span>
              </div>
            </div>
          </motion.div>

          {/* Humanoid */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
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
              delay: 0.4
            }}
            className="bg-white/5 border border-white/10 rounded-3xl p-6">

            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <BotIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">Humanoid System</h3>
              <p className="text-sm text-slate-400">Knowledge consumer</p>
            </div>

            <div className="space-y-3">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-400">
                    Skills Transferred
                  </span>
                  <span className="text-xl font-black text-purple-400">
                    {skillCount}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                    style={{
                      width: `${skillCount / 47 * 100}%`
                    }}
                    className="h-2 bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-100" />

                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}>

                  <ZapIcon className="w-4 h-4 text-purple-400" />
                </motion.div>
                Replicating human expertise
              </div>
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
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
          className="mb-12">

          <div className="relative">
            {/* Line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/10" />
            <motion.div
              initial={{
                width: 0
              }}
              whileInView={{
                width: '100%'
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: 1.5,
                delay: 0.5,
                ease: 'easeOut'
              }}
              className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-accent-500 via-gold-500 to-purple-500" />

            <div className="grid grid-cols-4 gap-4 relative">
              {milestones.map((milestone, i) =>
              <motion.div
                key={milestone.year}
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
                  delay: 0.5 + i * 0.15
                }}
                className="text-center">

                  <div
                  className={`w-12 h-12 ${milestone.color} rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg relative z-10 ${milestone.active ? 'shadow-glow-sm' : ''}`}>

                    <span className="text-xs font-black text-white">
                      {milestone.year.slice(2)}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white mb-1">
                    {milestone.label}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {milestone.desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom callout */}
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
          className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-3xl p-8 text-center">

          <p className="text-xl font-bold text-white mb-2">
            Catapult becomes{' '}
            <span className="text-purple-400">
              Human Continuity Infrastructure
            </span>
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The bridge between human expertise and the autonomous workforce.
            Every skill captured today becomes a competitive advantage in the
            humanoid era.
          </p>
        </motion.div>
      </div>
    </section>);

}