import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  ThumbsUpIcon,
  ThumbsDownIcon,
  MessageSquareIcon,
  StarIcon,
  RefreshCwIcon,
  BrainIcon,
  TrendingUpIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ZapIcon,
  ShareIcon } from
'lucide-react';
const feedItems = [
{
  id: 1,
  agent: 'COO',
  agentColor: 'from-green-400 to-green-600',
  action: 'Rescheduled 3 crews to avoid weather delay',
  outcome: 'Saved $2,400 in labor costs',
  confidence: 94,
  time: '4 min ago',
  thumbsUp: 12,
  thumbsDown: 0,
  comments: 3,
  userRated: null as null | 'up' | 'down'
},
{
  id: 2,
  agent: 'CFO',
  agentColor: 'from-blue-400 to-blue-600',
  action: 'Sent follow-up to 7 overdue invoices',
  outcome: 'Recovered $8,100 in receivables',
  confidence: 91,
  time: '18 min ago',
  thumbsUp: 24,
  thumbsDown: 1,
  comments: 5,
  userRated: null as null | 'up' | 'down'
},
{
  id: 3,
  agent: 'CMO',
  agentColor: 'from-pink-400 to-pink-600',
  action: 'Launched targeted review request campaign',
  outcome: '6 new 5-star reviews received',
  confidence: 88,
  time: '1 hr ago',
  thumbsUp: 31,
  thumbsDown: 2,
  comments: 8,
  userRated: 'up' as null | 'up' | 'down'
}];

const learningCycle = [
{
  step: 1,
  label: 'Agent Acts',
  desc: 'Executes autonomous workflow',
  icon: ZapIcon,
  color: 'text-accent-400',
  bg: 'bg-accent-500/20',
  border: 'border-accent-500/30'
},
{
  step: 2,
  label: 'Human Reviews',
  desc: 'Rates outcome quality',
  icon: ThumbsUpIcon,
  color: 'text-gold-400',
  bg: 'bg-gold-500/20',
  border: 'border-gold-500/30'
},
{
  step: 3,
  label: 'AI Learns',
  desc: 'Updates behavioral model',
  icon: BrainIcon,
  color: 'text-purple-400',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/30'
},
{
  step: 4,
  label: 'Better Outcomes',
  desc: 'Confidence score improves',
  icon: TrendingUpIcon,
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30'
}];

export function FeedbackLoop() {
  const [items, setItems] = useState(feedItems);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setActiveStep((prev) => (prev + 1) % learningCycle.length),
      2000
    );
    return () => clearInterval(timer);
  }, []);
  const handleRate = (id: number, rating: 'up' | 'down') => {
    setItems((prev) =>
    prev.map((item) => {
      if (item.id !== id) return item;
      const wasRated = item.userRated;
      return {
        ...item,
        userRated: wasRated === rating ? null : rating,
        thumbsUp:
        rating === 'up' ?
        wasRated === 'up' ?
        item.thumbsUp - 1 :
        item.thumbsUp + 1 :
        item.thumbsUp,
        thumbsDown:
        rating === 'down' ?
        wasRated === 'down' ?
        item.thumbsDown - 1 :
        item.thumbsDown + 1 :
        item.thumbsDown
      };
    })
    );
  };
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
            className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-5 py-2 mb-6">

            <RefreshCwIcon className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-300 uppercase tracking-wide">
              Feedback Loop
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Your Praise <span className="text-gold-400">Trains</span>
            <br />
            Your AI Team
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Every thumbs up, comment, and rating makes your agents smarter.
            Human feedback is the fuel that drives continuous improvement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Learning Cycle */}
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

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
              The Learning Cycle
            </h3>
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/10" />
              <motion.div
                className="absolute left-6 top-8 w-0.5 bg-gradient-to-b from-accent-500 to-green-500"
                style={{
                  height: `${(activeStep + 1) / learningCycle.length * 100}%`
                }}
                transition={{
                  duration: 0.5
                }} />

              <div className="space-y-6">
                {learningCycle.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <motion.div
                      key={step.step}
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.7 : 0.4
                      }}
                      className="flex items-center gap-4">

                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400
                        }}
                        className={`relative z-10 w-12 h-12 ${step.bg} border ${step.border} rounded-full flex items-center justify-center flex-shrink-0`}>

                        <Icon className={`w-5 h-5 ${step.color}`} />
                        {isActive &&
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity
                          }}
                          className={`absolute inset-0 ${step.bg} rounded-full`} />

                        }
                      </motion.div>
                      <div
                        className={`flex-1 p-4 rounded-2xl border transition-all duration-300 ${isActive ? `${step.bg} ${step.border}` : 'bg-white/5 border-white/10'}`}>

                        <p
                          className={`font-bold mb-0.5 ${isActive ? step.color : 'text-white'}`}>

                          {step.label}
                        </p>
                        <p className="text-sm text-slate-400">{step.desc}</p>
                      </div>
                    </motion.div>);

                })}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[
              {
                label: 'Avg Rating',
                value: '4.8★',
                color: 'text-gold-400'
              },
              {
                label: 'Feedback Given',
                value: '12,847',
                color: 'text-accent-400'
              },
              {
                label: 'Model Accuracy',
                value: '+34%',
                color: 'text-green-400'
              }].
              map((stat) =>
              <div
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">

                  <p className={`text-xl font-black ${stat.color}`}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{stat.label}</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Live Work Product Feed */}
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
              Rate Agent Work — Live
            </h3>
            <div className="space-y-4">
              {items.map((item, i) =>
              <motion.div
                key={item.id}
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
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">

                  <div className="flex items-start gap-3 mb-3">
                    <div
                    className={`w-10 h-10 bg-gradient-to-br ${item.agentColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                      <span className="text-white font-black text-sm">
                        {item.agent[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-white text-sm">
                          {item.agent} Agent
                        </span>
                        <span className="text-xs text-slate-500">
                          {item.time}
                        </span>
                        <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full ml-auto">
                          {item.confidence}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-slate-200 mb-1">
                        {item.action}
                      </p>
                      <p className="text-sm font-semibold text-green-400">
                        {item.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Rating row */}
                  <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                    <button
                    onClick={() => handleRate(item.id, 'up')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${item.userRated === 'up' ? 'bg-green-500/20 border border-green-500/40 text-green-400' : 'bg-white/5 border border-white/10 text-slate-400 hover:border-green-500/30 hover:text-green-400'}`}>

                      <ThumbsUpIcon className="w-4 h-4" />
                      {item.thumbsUp}
                    </button>
                    <button
                    onClick={() => handleRate(item.id, 'down')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${item.userRated === 'down' ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/5 border border-white/10 text-slate-400 hover:border-red-500/30 hover:text-red-400'}`}>

                      <ThumbsDownIcon className="w-4 h-4" />
                      {item.thumbsDown}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <MessageSquareIcon className="w-4 h-4" />
                      {item.comments}
                    </button>
                    <div className="flex items-center gap-1 ml-auto">
                      {[1, 2, 3, 4, 5].map((star) =>
                    <StarIcon
                      key={star}
                      className={`w-3.5 h-3.5 ${star <= 4 ? 'text-gold-400 fill-gold-400' : 'text-slate-600'}`} />

                    )}
                    </div>
                  </div>

                  {/* Social share row — appears after thumbs up */}
                  <AnimatePresence>
                    {item.userRated === 'up' &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      height: 'auto'
                    }}
                    exit={{
                      opacity: 0,
                      y: 8,
                      height: 0
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="overflow-hidden">

                        <div className="pt-3 mt-3 border-t border-white/10">
                          <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                            <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
                            Great rating! Share this win to earn{' '}
                            <span className="text-yellow-400 font-bold">
                              +50 recognition points
                            </span>
                          </p>
                          <div className="flex items-center gap-2">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600/20 border border-blue-600/40 text-blue-400 hover:bg-blue-600/30 transition-all">
                              <ShareIcon className="w-3.5 h-3.5" />
                              LinkedIn
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 border border-white/20 text-slate-300 hover:bg-white/15 transition-all">
                              <ShareIcon className="w-3.5 h-3.5" />X / Twitter
                            </button>
                            <span className="text-xs text-slate-600 ml-auto">
                              Feeds AI confidence score
                            </span>
                          </div>
                        </div>
                      </motion.div>
                  }
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            <div className="mt-6">
              <Button
                variant="outline"
                size="md"
                className="w-full border-white/20 text-white hover:bg-white/10"
                onClick={() => {
                  window.location.hash = '#/feed';
                }}>

                View Full Agent Work Feed
                <ArrowRightIcon className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}