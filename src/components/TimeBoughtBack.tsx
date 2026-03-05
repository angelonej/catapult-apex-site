import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  ClockIcon,
  HeartIcon,
  DollarSignIcon,
  SunIcon,
  UsersIcon,
  BookOpenIcon,
  PlaneIcon,
  HomeIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  QrCodeIcon } from
'lucide-react';
const lifeActivities = [
{
  icon: HeartIcon,
  label: 'Days with family',
  calc: (hrs: number) => Math.floor(hrs / 8),
  unit: 'days',
  color: 'text-pink-400',
  bg: 'bg-pink-500/10',
  border: 'border-pink-500/20'
},
{
  icon: PlaneIcon,
  label: 'Weekend trips',
  calc: (hrs: number) => Math.floor(hrs / 16),
  unit: 'trips',
  color: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/20'
},
{
  icon: BookOpenIcon,
  label: 'Books you could read',
  calc: (hrs: number) => Math.floor(hrs / 5),
  unit: 'books',
  color: 'text-gold-400',
  bg: 'bg-gold-500/10',
  border: 'border-gold-500/20'
},
{
  icon: SunIcon,
  label: 'Mornings without stress',
  calc: (hrs: number) => Math.floor(hrs / 2),
  unit: 'mornings',
  color: 'text-orange-400',
  bg: 'bg-orange-500/10',
  border: 'border-orange-500/20'
},
{
  icon: UsersIcon,
  label: 'Team meetings eliminated',
  calc: (hrs: number) => Math.floor(hrs / 1.5),
  unit: 'meetings',
  color: 'text-green-400',
  bg: 'bg-green-500/10',
  border: 'border-green-500/20'
},
{
  icon: HomeIcon,
  label: 'Early finishes',
  calc: (hrs: number) => Math.floor(hrs / 3),
  unit: 'days',
  color: 'text-purple-400',
  bg: 'bg-purple-500/10',
  border: 'border-purple-500/20'
}];

const hourlyRates = [
{
  label: '$50/hr',
  value: 50
},
{
  label: '$100/hr',
  value: 100
},
{
  label: '$150/hr',
  value: 150
},
{
  label: '$200/hr',
  value: 200
},
{
  label: '$300/hr',
  value: 300
}];

export function TimeBoughtBack() {
  const [hours, setHours] = useState(127);
  const [rate, setRate] = useState(100);
  const dollarValue = hours * rate;
  const weeksValue = (hours / 40).toFixed(1);
  const yearsValue = (hours / 2080 * 100).toFixed(0);
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

            <ClockIcon className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-300 uppercase tracking-wide">
              Time Is Your Wealth
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            What Would You Do
            <br />
            With <span className="text-green-400">{hours} Extra Hours?</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Time bought back isn't just productivity — it's life. Move the
            slider to see what your AI team actually gives you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
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

            {/* Hours slider */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-bold text-slate-300 uppercase tracking-wide">
                  Hours Saved Per Month
                </label>
                <motion.span
                  key={hours}
                  initial={{
                    scale: 1.2,
                    color: '#4ade80'
                  }}
                  animate={{
                    scale: 1,
                    color: '#ffffff'
                  }}
                  className="text-3xl font-black text-white">

                  {hours}
                </motion.span>
              </div>
              <input
                type="range"
                min={10}
                max={500}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500 mb-4" />

              <div className="flex justify-between text-xs text-slate-500">
                <span>10 hrs</span>
                <span>500 hrs</span>
              </div>
            </div>

            {/* Hourly rate */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
              <label className="text-sm font-bold text-slate-300 uppercase tracking-wide block mb-4">
                Your Time Value
              </label>
              <div className="flex flex-wrap gap-2">
                {hourlyRates.map((r) =>
                <button
                  key={r.value}
                  onClick={() => setRate(r.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${rate === r.value ? 'bg-green-500/20 border-green-500/40 text-green-400' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>

                    {r.label}
                  </button>
                )}
              </div>
            </div>

            {/* Financial summary */}
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-3xl p-6">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                Financial Reality
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="w-5 h-5 text-green-400" />
                    <span className="text-slate-300">
                      Dollar value of time freed
                    </span>
                  </div>
                  <motion.span
                    key={dollarValue}
                    initial={{
                      scale: 1.1
                    }}
                    animate={{
                      scale: 1
                    }}
                    className="text-2xl font-black text-green-400">

                    ${dollarValue.toLocaleString()}
                  </motion.span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ClockIcon className="w-5 h-5 text-gold-400" />
                    <span className="text-slate-300">
                      Equivalent work weeks
                    </span>
                  </div>
                  <span className="text-2xl font-black text-gold-400">
                    {weeksValue} wks
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUpIcon className="w-5 h-5 text-accent-400" />
                    <span className="text-slate-300">
                      % of work year reclaimed
                    </span>
                  </div>
                  <span className="text-2xl font-black text-accent-400">
                    {yearsValue}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Life activities */}
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

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
              What {hours} Hours Means
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {lifeActivities.map((activity, i) => {
                const Icon = activity.icon;
                const value = activity.calc(hours);
                return (
                  <motion.div
                    key={activity.label}
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
                      delay: i * 0.08
                    }}
                    className={`${activity.bg} border ${activity.border} rounded-2xl p-4`}>

                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                      <span className="text-xs text-slate-400">
                        {activity.label}
                      </span>
                    </div>
                    <motion.p
                      key={value}
                      initial={{
                        scale: 1.15
                      }}
                      animate={{
                        scale: 1
                      }}
                      className={`text-3xl font-black ${activity.color}`}>

                      {value}
                    </motion.p>
                    <p className="text-xs text-slate-500">{activity.unit}</p>
                  </motion.div>);

              })}
            </div>

            {/* Emotional callout */}
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-white/10 rounded-3xl p-6 text-center">
              <HeartIcon className="w-8 h-8 text-pink-400 mx-auto mb-3" />
              <p className="text-xl font-bold text-white mb-2">
                That's{' '}
                <span className="text-pink-400">
                  {Math.floor(hours / 8)} extra days
                </span>{' '}
                with the people you love.
              </p>
              <p className="text-slate-400 mb-6 text-sm">
                Your AI team works so you don't have to. Every hour saved is an
                hour lived.
              </p>
              <Button variant="primary" size="lg" className="w-full">
                <QrCodeIcon className="mr-2 w-5 h-5" />
                Start Buying Time Back Today
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}