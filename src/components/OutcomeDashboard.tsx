import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  TrendingUpIcon,
  DollarSignIcon,
  ClockIcon,
  ActivityIcon,
  BarChart3Icon,
  CheckCircleIcon,
  ZapIcon,
  ArrowUpIcon } from
'lucide-react';
function useAnimatedValue(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return value;
}
const weeklyData = [42, 58, 71, 65, 89, 94, 87];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export function OutcomeDashboard() {
  const [isVisible, setIsVisible] = useState(false);
  const revenue = useAnimatedValue(isVisible ? 42180 : 0);
  const hours = useAnimatedValue(isVisible ? 127 : 0);
  const decisions = useAnimatedValue(isVisible ? 1247 : 0);
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
            className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/40 rounded-full px-5 py-2 mb-6">

            <BarChart3Icon className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-300 uppercase tracking-wide">
              Outcome Tracking
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Every Result. <span className="text-green-400">Measured.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Real-time ROI visualization. See exactly what your AI team delivers,
            down to the dollar and minute.
          </p>
        </motion.div>

        {/* Dashboard */}
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
            duration: 0.8,
            delay: 0.3
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

          {/* Dashboard header bar */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-sm font-semibold text-slate-300">
                Catapult Command Center
              </span>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  opacity: [1, 0.4, 1]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }}
                className="w-2 h-2 bg-green-400 rounded-full" />

              <span className="text-xs text-green-400 font-semibold">Live</span>
            </div>
          </div>

          <div className="p-6">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                  duration: 0.5,
                  delay: 0.4
                }}
                className="bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <DollarSignIcon className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-400 font-semibold">
                    <ArrowUpIcon className="w-3 h-3" />
                    +127%
                  </div>
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  ${revenue.toLocaleString()}
                </p>
                <p className="text-sm text-slate-400">
                  Revenue Impact This Week
                </p>
              </motion.div>

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
                  duration: 0.5,
                  delay: 0.5
                }}
                className="bg-gradient-to-br from-gold-500/20 to-gold-600/10 border border-gold-500/30 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gold-400 font-semibold">
                    <ArrowUpIcon className="w-3 h-3" />
                    +38 hrs
                  </div>
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  {hours} hrs
                </p>
                <p className="text-sm text-slate-400">
                  Time Bought Back This Week
                </p>
              </motion.div>

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
                  duration: 0.5,
                  delay: 0.6
                }}
                className="bg-gradient-to-br from-accent-500/20 to-accent-600/10 border border-accent-500/30 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
                    <ActivityIcon className="w-5 h-5 text-accent-400" />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-accent-400 font-semibold">
                    <ArrowUpIcon className="w-3 h-3" />
                    +23%
                  </div>
                </div>
                <p className="text-3xl font-black text-white mb-1">
                  {decisions.toLocaleString()}
                </p>
                <p className="text-sm text-slate-400">AI Decisions Executed</p>
              </motion.div>
            </div>

            {/* Chart + Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bar Chart */}
              <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-white">
                    Weekly ROI Performance
                  </h3>
                  <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">
                    This Week
                  </span>
                </div>
                <div className="flex items-end justify-between gap-2 h-32">
                  {weeklyData.map((val, i) =>
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-2">

                      <motion.div
                      initial={{
                        height: 0
                      }}
                      whileInView={{
                        height: `${val}%`
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        duration: 0.8,
                        delay: 0.5 + i * 0.08,
                        ease: 'easeOut'
                      }}
                      className={`w-full rounded-t-lg ${i === 5 ? 'bg-gradient-to-t from-gold-600 to-gold-400' : 'bg-gradient-to-t from-accent-700 to-accent-500'}`}
                      style={{
                        minHeight: 4
                      }} />

                      <span className="text-xs text-slate-500">{days[i]}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Live Feed */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
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

                  <h3 className="font-bold text-white text-sm">
                    Live Outcomes
                  </h3>
                </div>
                <div className="space-y-3">
                  {[
                  {
                    text: 'COO saved 4.5 labor hrs',
                    time: '2m ago',
                    color: 'green'
                  },
                  {
                    text: 'CFO recovered $2,100',
                    time: '8m ago',
                    color: 'blue'
                  },
                  {
                    text: 'CMO booked 3 new jobs',
                    time: '15m ago',
                    color: 'pink'
                  },
                  {
                    text: 'CEO flagged opportunity',
                    time: '1h ago',
                    color: 'gold'
                  },
                  {
                    text: 'COO prevented breakdown',
                    time: '2h ago',
                    color: 'green'
                  }].
                  map((item, i) =>
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
                      delay: 0.7 + i * 0.1
                    }}
                    className="flex items-center gap-2">

                      <CheckCircleIcon
                      className={`w-4 h-4 text-${item.color}-400 flex-shrink-0`} />

                      <span className="text-xs text-slate-300 flex-1">
                        {item.text}
                      </span>
                      <span className="text-xs text-slate-500">
                        {item.time}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
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
            delay: 0.5
          }}
          className="mt-12 text-center">

          <p className="text-slate-400 mb-6 text-lg">
            Outcome-based pricing:{' '}
            <span className="text-white font-semibold">
              pay only for results delivered.
            </span>
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              const el = document.getElementById('pricing');
              if (el)
              el.scrollIntoView({
                behavior: 'smooth'
              });
            }}>

            <TrendingUpIcon className="mr-2 w-5 h-5" />
            Calculate My ROI
          </Button>
        </motion.div>
      </div>
    </section>);

}