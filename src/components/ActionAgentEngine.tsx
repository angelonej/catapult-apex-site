import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  MicIcon,
  ArrowRightIcon,
  ZapIcon,
  RefreshCwIcon,
  CheckCircleIcon,
  ClockIcon,
  PlayIcon,
  BrainIcon,
  ActivityIcon,
  TargetIcon } from
'lucide-react';
const exampleActions = [
{
  input: '"Schedule all crews for next week"',
  agent: 'COO Agent',
  workflow: 'Crew Scheduling Engine',
  steps: [
  'Fetches crew availability',
  'Checks job backlog',
  'Optimizes routes',
  'Sends notifications'],

  outcome: 'Recurring every Monday 6AM',
  color: 'green'
},
{
  input: '"Follow up with all unpaid invoices"',
  agent: 'CFO Agent',
  workflow: 'Collections Automation',
  steps: [
  'Queries accounting system',
  'Identifies overdue invoices',
  'Sends reminder emails',
  'Escalates at 30 days'],

  outcome: 'Runs daily at 9AM',
  color: 'blue'
},
{
  input: '"Get more 5-star reviews"',
  agent: 'CMO Agent',
  workflow: 'Review Generation Campaign',
  steps: [
  'Identifies happy customers',
  'Sends review request SMS',
  'Tracks response rate',
  'Reports weekly'],

  outcome: 'Triggers after job completion',
  color: 'pink'
}];

type AnimState = 'idle' | 'listening' | 'processing' | 'deploying' | 'active';
export function ActionAgentEngine() {
  const [activeExample, setActiveExample] = useState(0);
  const [animState, setAnimState] = useState<AnimState>('idle');
  const [currentStep, setCurrentStep] = useState(0);
  const example = exampleActions[activeExample];
  const runDemo = () => {
    setAnimState('listening');
    setCurrentStep(0);
    setTimeout(() => setAnimState('processing'), 1200);
    setTimeout(() => setAnimState('deploying'), 2800);
    setTimeout(() => {
      setAnimState('active');
      setCurrentStep(example.steps.length);
    }, 4500);
  };
  useEffect(() => {
    if (animState === 'processing') {
      let step = 0;
      const timer = setInterval(() => {
        step++;
        setCurrentStep(step);
        if (step >= example.steps.length) clearInterval(timer);
      }, 400);
      return () => clearInterval(timer);
    }
  }, [animState, example.steps.length]);
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
            className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/40 rounded-full px-5 py-2 mb-6">

            <ZapIcon className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-bold text-accent-300 uppercase tracking-wide">
              Action → Agent Engine
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Speak It. <span className="text-accent-400">It Runs Forever.</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Convert any spoken or observed task into an autonomous agent that
            executes recurring workflows indefinitely.
          </p>
        </motion.div>

        {/* Example selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {exampleActions.map((ex, i) =>
          <motion.button
            key={i}
            whileTap={{
              scale: 0.95
            }}
            onClick={() => {
              setActiveExample(i);
              setAnimState('idle');
              setCurrentStep(0);
            }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 border ${activeExample === i ? 'bg-accent-500/20 border-accent-500/50 text-accent-300' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}>

              {ex.workflow}
            </motion.button>
          )}
        </div>

        {/* Main Engine Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Input */}
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
            }}>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <MicIcon className="w-4 h-4 text-accent-400" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                  Voice / Text Input
                </span>
              </div>

              <div
                className={`relative bg-slate-800/50 border-2 rounded-2xl p-5 mb-6 transition-all duration-300 ${animState === 'listening' ? 'border-accent-500/70 shadow-glow-sm' : 'border-white/10'}`}>

                <p className="text-lg font-semibold text-white">
                  {example.input}
                </p>
                {animState === 'listening' &&
                <motion.div
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  className="absolute bottom-3 right-3 flex items-center gap-1">

                    {[0, 1, 2, 3].map((i) =>
                  <motion.div
                    key={i}
                    animate={{
                      height: [4, 16, 4]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15
                    }}
                    className="w-1 bg-accent-400 rounded-full" />

                  )}
                  </motion.div>
                }
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={runDemo}
                disabled={animState !== 'idle' && animState !== 'active'}
                className="w-full">

                {animState === 'idle' || animState === 'active' ?
                <>
                    <PlayIcon className="mr-2 w-5 h-5" />
                    {animState === 'active' ? 'Run Again' : 'Run Demo'}
                  </> :

                <>
                    <motion.div
                    animate={{
                      rotate: 360
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear'
                    }}>

                      <RefreshCwIcon className="mr-2 w-5 h-5" />
                    </motion.div>
                    Processing...
                  </>
                }
              </Button>
            </div>
          </motion.div>

          {/* Processing */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30
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
            }}>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gold-500/20 rounded-lg flex items-center justify-center">
                  <BrainIcon className="w-4 h-4 text-gold-400" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                  {example.agent}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                {example.steps.map((step, i) =>
                <motion.div
                  key={step}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${i < currentStep ? 'bg-green-500/10 border border-green-500/20' : i === currentStep && animState === 'processing' ? 'bg-gold-500/10 border border-gold-500/20' : 'bg-white/5 border border-white/5'}`}>

                    <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${i < currentStep ? 'bg-green-500' : i === currentStep && animState === 'processing' ? 'bg-gold-500' : 'bg-white/10'}`}>

                      {i < currentStep ?
                    <CheckCircleIcon className="w-4 h-4 text-white" /> :
                    i === currentStep && animState === 'processing' ?
                    <motion.div
                      animate={{
                        rotate: 360
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear'
                      }}>

                          <ActivityIcon className="w-3 h-3 text-white" />
                        </motion.div> :

                    <span className="text-xs text-slate-400">{i + 1}</span>
                    }
                    </div>
                    <span
                    className={`text-sm ${i < currentStep ? 'text-green-300' : i === currentStep && animState === 'processing' ? 'text-gold-300' : 'text-slate-400'}`}>

                      {step}
                    </span>
                  </motion.div>
                )}
              </div>

              {animState === 'active' &&
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-center">

                  <CheckCircleIcon className="w-6 h-6 text-green-400 mx-auto mb-1" />
                  <p className="text-sm font-bold text-green-300">
                    Agent Deployed
                  </p>
                </motion.div>
              }
            </div>
          </motion.div>

          {/* Output */}
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
            }}>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <TargetIcon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">
                  Autonomous Workflow
                </span>
              </div>

              <div
                className={`border-2 rounded-2xl p-5 mb-6 transition-all duration-500 ${animState === 'active' ? 'border-green-500/50 bg-green-500/10' : 'border-white/10 bg-white/5'}`}>

                <div className="flex items-center gap-2 mb-3">
                  {animState === 'active' ?
                  <motion.div
                    animate={{
                      opacity: [1, 0.4, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="w-2.5 h-2.5 bg-green-400 rounded-full" /> :


                  <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
                  }
                  <span
                    className={`text-sm font-bold ${animState === 'active' ? 'text-green-300' : 'text-slate-500'}`}>

                    {animState === 'active' ?
                    'Running Indefinitely' :
                    'Awaiting Deployment'}
                  </span>
                </div>
                <p
                  className={`text-lg font-semibold ${animState === 'active' ? 'text-white' : 'text-slate-500'}`}>

                  {example.outcome}
                </p>
              </div>

              <div className="space-y-3">
                {[
                {
                  label: 'Executions',
                  value: animState === 'active' ? '∞' : '—',
                  icon: RefreshCwIcon
                },
                {
                  label: 'Next Run',
                  value: animState === 'active' ? 'Scheduled' : '—',
                  icon: ClockIcon
                },
                {
                  label: 'Status',
                  value: animState === 'active' ? 'Active' : 'Inactive',
                  icon: ActivityIcon
                }].
                map((stat) =>
                <div
                  key={stat.label}
                  className="flex items-center justify-between bg-white/5 rounded-xl p-3">

                    <div className="flex items-center gap-2">
                      <stat.icon className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">
                        {stat.label}
                      </span>
                    </div>
                    <span
                    className={`text-sm font-bold ${animState === 'active' ? 'text-green-400' : 'text-slate-500'}`}>

                      {stat.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>);

}