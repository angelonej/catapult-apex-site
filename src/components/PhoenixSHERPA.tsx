import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import {
  BrainIcon,
  ZapIcon,
  EyeIcon,
  MessageSquareIcon,
  StarIcon,
  ActivityIcon,
  QuoteIcon,
  ArrowRightIcon,
  SparklesIcon,
  HeartIcon,
  ClockIcon,
  ShieldIcon } from
'lucide-react';
const capabilities = [
{
  id: 'exec-function',
  name: 'Executive Function Bridge',
  description:
  'Breaks complex tasks into sensory-friendly micro-steps. Manages transitions, time blindness, and task initiation.',
  Icon: BrainIcon,
  color: 'from-amber-500 to-orange-600',
  bg: 'bg-amber-50',
  border: 'border-amber-200',
  text: 'text-amber-700',
  iconBg: 'bg-amber-100'
},
{
  id: 'hyperfocus',
  name: 'Hyperfocus Navigator',
  description:
  'Channels deep focus sessions productively. Sets gentle boundaries, tracks time, and captures insights during flow states.',
  Icon: ZapIcon,
  color: 'from-orange-500 to-red-500',
  bg: 'bg-orange-50',
  border: 'border-orange-200',
  text: 'text-orange-700',
  iconBg: 'bg-orange-100'
},
{
  id: 'sensory',
  name: 'Sensory Load Manager',
  description:
  'Monitors cognitive and sensory overload signals. Suggests breaks, environment adjustments, and pacing strategies.',
  Icon: ShieldIcon,
  color: 'from-rose-400 to-pink-600',
  bg: 'bg-rose-50',
  border: 'border-rose-200',
  text: 'text-rose-700',
  iconBg: 'bg-rose-100'
},
{
  id: 'communication',
  name: 'Communication Translator',
  description:
  "Converts complex instructions into clear, direct formats. Adapts communication style to the user's processing preference.",
  Icon: MessageSquareIcon,
  color: 'from-blue-500 to-indigo-600',
  bg: 'bg-blue-50',
  border: 'border-blue-200',
  text: 'text-blue-700',
  iconBg: 'bg-blue-100'
},
{
  id: 'strength',
  name: 'Strength Amplifier',
  description:
  "Identifies and routes tasks to the user's peak performance windows. Protects genius time from administrative drain.",
  Icon: StarIcon,
  color: 'from-amber-400 to-yellow-500',
  bg: 'bg-yellow-50',
  border: 'border-yellow-200',
  text: 'text-yellow-700',
  iconBg: 'bg-yellow-100'
},
{
  id: 'regulation',
  name: 'Regulation & Rhythm',
  description:
  'Tracks energy patterns, emotional regulation needs, and builds sustainable daily rhythms that work WITH the 2E brain, not against it.',
  Icon: ActivityIcon,
  color: 'from-emerald-500 to-teal-600',
  bg: 'bg-emerald-50',
  border: 'border-emerald-200',
  text: 'text-emerald-700',
  iconBg: 'bg-emerald-100'
}];

const userStories = [
{
  id: 'jordan',
  name: 'Jordan M.',
  role: 'Electrician & Business Owner',
  profile2E: 'ADHD + Dyslexia',
  profileColor: 'bg-amber-100 text-amber-700 border-amber-200',
  initials: 'JM',
  avatarGradient: 'from-amber-400 to-orange-500',
  toolsUsed: [
  'Executive Function Bridge',
  'Hyperfocus Navigator',
  'Communication Translator'],

  quote:
  "I've started 4 businesses and failed at the paperwork every time. Not the work — I'm brilliant at the work. Phoenix figured out I do my best thinking between 6–9 AM and blocked that time for creative/technical work. Everything administrative gets batched and simplified into voice-first tasks I can do while driving. First time in my life I'm not drowning in my own business.",
  outcome: 'Business survived year 2 for the first time.',
  metrics: [
  {
    label: 'Revenue +67%',
    highlight: true
  },
  {
    label: 'Year 2 survival',
    highlight: false
  }]

},
{
  id: 'samira',
  name: 'Samira K.',
  role: 'HVAC Service Manager',
  profile2E: 'Autism Spectrum + Sensory Processing',
  profileColor: 'bg-blue-100 text-blue-700 border-blue-200',
  initials: 'SK',
  avatarGradient: 'from-blue-400 to-indigo-500',
  toolsUsed: [
  'Sensory Load Manager',
  'Communication Translator',
  'Regulation & Rhythm'],

  quote:
  "Dispatch calls used to wreck my whole day — the noise, the context switching, the unclear instructions. Phoenix now pre-processes all incoming work orders into structured visual summaries before they reach me. It learned that I need 10 minutes between major context switches. My team thinks I've become a different person. I haven't — I just finally have the right support.",
  outcome: 'Managed 40% more service calls. Zero burnout days in 6 months.',
  metrics: [
  {
    label: '+40% service calls',
    highlight: true
  },
  {
    label: '0 burnout days',
    highlight: false
  }]

},
{
  id: 'devon',
  name: 'Devon T.',
  role: 'Warehouse Operations Lead',
  profile2E: 'Dyscalculia + ADHD',
  profileColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  initials: 'DT',
  avatarGradient: 'from-emerald-400 to-teal-500',
  toolsUsed: [
  'Strength Amplifier',
  'Executive Function Bridge',
  'Regulation & Rhythm'],

  quote:
  "Numbers have always been my enemy. I'd avoid financial reports until it was a crisis. Phoenix translates every financial metric into plain language and visual patterns I actually understand. It also learned that I need movement breaks every 90 minutes or my focus collapses. Now I'm the one presenting the numbers to ownership. That's never happened before.",
  outcome: 'First promotion in 8 years. Financial accuracy improved 100%.',
  metrics: [
  {
    label: 'First promotion in 8 years',
    highlight: true
  },
  {
    label: 'Financial accuracy +100%',
    highlight: false
  }]

}];

// Phoenix flame SVG motif
function PhoenixFlame({ className = '' }: {className?: string;}) {
  return (
    <svg
      viewBox="0 0 80 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>

      <defs>
        <radialGradient id="flame-core" cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
          <stop offset="60%" stopColor="#f97316" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id="flame-outer" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Outer glow */}
      <ellipse cx="40" cy="75" rx="32" ry="20" fill="url(#flame-outer)" />
      {/* Main flame body */}
      <path
        d="M40 8 Q52 30 58 50 Q64 70 40 88 Q16 70 22 50 Q28 30 40 8Z"
        fill="url(#flame-core)" />

      {/* Inner bright core */}
      <path
        d="M40 28 Q47 45 50 60 Q46 72 40 78 Q34 72 30 60 Q33 45 40 28Z"
        fill="#fef3c7"
        opacity="0.7" />

      {/* Wing-like side flames */}
      <path
        d="M22 50 Q10 40 14 28 Q24 38 30 52Z"
        fill="#f97316"
        opacity="0.6" />

      <path
        d="M58 50 Q70 40 66 28 Q56 38 50 52Z"
        fill="#f97316"
        opacity="0.6" />

      {/* Tip spark */}
      <circle cx="40" cy="10" r="3" fill="#fef9c3" opacity="0.9" />
    </svg>);

}
export function PhoenixSHERPA() {
  const [activeStory, setActiveStory] = useState(0);
  return (
    <section className="w-full bg-gradient-to-b from-white to-amber-50/40 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO CALLOUT */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-80px'
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-20">

          {/* Badge */}
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
              delay: 0.1
            }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300 rounded-full px-5 py-2.5 mb-8">

            <PhoenixFlame className="w-6 h-8" />
            <span className="text-sm font-black text-amber-700 tracking-wide">
              PHOENIX · Neuro Divergent 2E SHERPA
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Your AI Guide for the{' '}
            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
              Twice-Exceptional
            </span>{' '}
            Mind
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Phoenix understands how 2E brains work — the hyperfocus, the
            executive function gaps, the sensory needs, the brilliance that gets
            buried under systems that weren't built for you.{' '}
            <span className="font-semibold text-gray-800">
              Phoenix carries the load so your genius can lead.
            </span>
          </p>

          {/* Flame decoration */}
          <div className="flex justify-center gap-3 mb-4">
            {[0, 1, 2].map((i) =>
            <motion.div
              key={i}
              animate={{
                y: [0, -6, 0],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4
              }}>

                <PhoenixFlame className="w-5 h-7 opacity-70" />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* WHAT IS 2E PANEL */}
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
            margin: '-60px'
          }}
          transition={{
            duration: 0.5
          }}
          className="mb-16">

          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 shadow-lg">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                <BrainIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 rounded-full px-3 py-1 mb-3">
                  <span className="text-xs font-black text-amber-700">
                    WHAT IS 2E?
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Twice Exceptional — Gifted & Different
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  <span className="font-semibold">Twice Exceptional (2E)</span>{' '}
                  means gifted in one or more areas while also navigating
                  learning differences. ADHD, dyslexia, autism spectrum,
                  dyscalculia, sensory processing differences — often invisible,
                  always real. 2E individuals represent some of the most
                  innovative thinkers in history.{' '}
                  <span className="font-semibold text-amber-700">
                    Phoenix is built for them.
                  </span>
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-xs font-semibold bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    ADHD
                  </span>
                  <span className="text-xs font-semibold bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    Dyslexia
                  </span>
                  <span className="text-xs font-semibold bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    Autism Spectrum
                  </span>
                  <span className="text-xs font-semibold bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    Dyscalculia
                  </span>
                  <span className="text-xs font-semibold bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    Sensory Processing
                  </span>
                  <span className="text-xs font-semibold bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full">
                    Executive Function
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* SHERPA CAPABILITIES */}
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
            margin: '-60px'
          }}
          transition={{
            duration: 0.5
          }}
          className="mb-20">

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-2 mb-4">
              <ZapIcon className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-bold text-orange-700">
                SHERPA Capabilities
              </span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">
              Six Ways Phoenix Carries the Load
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Not a productivity app. Not a planner. A genuine AI guide that
              learns your brain and works with it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => {
              const { Icon } = cap;
              return (
                <motion.div
                  key={cap.id}
                  initial={{
                    opacity: 0,
                    y: 16
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.4
                  }}>

                  <Card className={`h-full ${cap.bg} border ${cap.border}`}>
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${cap.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>

                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2">
                      {cap.name}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cap.description}
                    </p>
                  </Card>
                </motion.div>);

            })}
          </div>
        </motion.div>

        {/* USER STORIES */}
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
            margin: '-60px'
          }}
          transition={{
            duration: 0.5
          }}>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-2 mb-4">
              <QuoteIcon className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">
                Real Stories
              </span>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">
              The Genius Was Always There
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Three 2E professionals who found their rhythm with Phoenix.
            </p>
          </div>

          {/* Story selector tabs */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {userStories.map((story, i) =>
            <motion.button
              key={story.id}
              whileTap={{
                scale: 0.96
              }}
              onClick={() => setActiveStory(i)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 border ${activeStory === i ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white border-transparent shadow-md' : 'bg-white border-gray-200 text-gray-700 hover:border-amber-300'}`}>

                <div
                className={`w-7 h-7 bg-gradient-to-br ${story.avatarGradient} rounded-lg flex items-center justify-center flex-shrink-0`}>

                  <span className="text-white font-black text-xs">
                    {story.initials}
                  </span>
                </div>
                <span>{story.name}</span>
              </motion.button>
            )}
          </div>

          {/* Active story card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory}
              initial={{
                opacity: 0,
                y: 16
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -12
              }}
              transition={{
                duration: 0.35
              }}>

              {(() => {
                const story = userStories[activeStory];
                return (
                  <Card className="border-2 border-amber-200 bg-gradient-to-br from-white to-amber-50/50 shadow-lg">
                    {/* Story header */}
                    <div className="flex items-start gap-5 mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${story.avatarGradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md`}>

                        <span className="text-white font-black text-lg">
                          {story.initials}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-black text-gray-900 mb-0.5">
                          {story.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {story.role}
                        </p>
                        <span
                          className={`inline-flex items-center text-xs font-bold px-3 py-1 rounded-full border ${story.profileColor}`}>

                          2E Profile: {story.profile2E}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <PhoenixFlame className="w-8 h-10 opacity-60" />
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="relative mb-6">
                      <QuoteIcon className="w-8 h-8 text-amber-300 absolute -top-2 -left-1" />
                      <p className="text-gray-700 italic leading-relaxed text-base pl-8">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Outcome */}
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-5">
                      <div className="flex items-start gap-3">
                        <StarIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-black text-amber-700 uppercase tracking-wide mb-1">
                            Outcome
                          </p>
                          <p className="text-sm font-semibold text-gray-800">
                            {story.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Metrics + Tools */}
                    <div className="flex flex-wrap gap-2 items-center">
                      {story.metrics.map((metric, mi) =>
                      <span
                        key={mi}
                        className={`text-sm font-bold px-3 py-1.5 rounded-full border ${metric.highlight ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-transparent' : 'bg-white border-gray-200 text-gray-700'}`}>

                          {metric.label}
                        </span>
                      )}
                      <div className="w-px h-5 bg-gray-200 mx-1" />
                      {story.toolsUsed.map((tool, ti) =>
                      <span
                        key={ti}
                        className="text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-700 px-2.5 py-1 rounded-full">

                          {tool}
                        </span>
                      )}
                    </div>
                  </Card>);

              })()}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* BOTTOM CTA */}
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
            delay: 0.2
          }}
          className="mt-16 text-center">

          <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 shadow-xl">
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="flex items-center gap-3">
                <PhoenixFlame className="w-10 h-12" />
                <div className="text-left">
                  <h3 className="text-2xl font-black text-white">
                    Your Genius Deserves the Right Support
                  </h3>
                  <p className="text-amber-100 mt-1">
                    Phoenix is ready to learn how your brain works best.
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{
                  scale: 1.04
                }}
                whileTap={{
                  scale: 0.97
                }}
                className="inline-flex items-center gap-2 bg-white text-amber-700 font-black px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base">

                Meet Phoenix
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}