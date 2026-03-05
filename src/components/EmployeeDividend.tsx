import React, {
  useEffect,
  useState,
  useRef,
  createElement,
  Component } from
'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  UsersIcon,
  RadioIcon,
  TrendingUpIcon,
  DollarSignIcon,
  ZapIcon,
  BrainIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  CoinsIcon,
  HeartHandshakeIcon,
  GlobeIcon,
  SparklesIcon,
  ChevronRightIcon,
  ActivityIcon,
  LayersIcon,
  RepeatIcon } from
'lucide-react';
// ─── Types ─────────────────────────────────────────────────────────────────────
type ContributorType = 'field' | 'trainer' | 'process' | 'shareholder';
// ─── Data ──────────────────────────────────────────────────────────────────────
const loopSteps = [
{
  id: 0,
  label: 'Humans Contribute',
  shortLabel: 'Contribute',
  desc: 'Field operators, trainers, and process contributors feed skills, feedback, and workflow data into the system via Guide Beacons and the APEX platform.',
  icon: UsersIcon,
  color: 'text-blue-400',
  bg: 'bg-blue-500/15',
  border: 'border-blue-500/40',
  glow: 'shadow-blue-500/20',
  accent: '#60a5fa'
},
{
  id: 1,
  label: 'AI Executes',
  shortLabel: 'AI Executes',
  desc: 'AI executives deploy that knowledge to run operations, optimize workflows, reduce waste, and drive measurable business outcomes — 24/7, without fatigue.',
  icon: BrainIcon,
  color: 'text-orange-400',
  bg: 'bg-orange-500/15',
  border: 'border-orange-500/40',
  glow: 'shadow-orange-500/20',
  accent: '#fb923c'
},
{
  id: 2,
  label: 'Savings Generated',
  shortLabel: 'Savings Pool',
  desc: 'Every AI decision that saves time or money flows into a transparent, blockchain-verified Dividend Pool. The more the AI performs, the larger the pool grows.',
  icon: CoinsIcon,
  color: 'text-green-400',
  bg: 'bg-green-500/15',
  border: 'border-green-500/40',
  glow: 'shadow-green-500/20',
  accent: '#4ade80'
},
{
  id: 3,
  label: 'Dividends Distributed',
  shortLabel: 'Distributed',
  desc: 'A significant portion of savings flows back to the humans who made it possible — as direct compensation, trailing royalties, and skill licensing revenue.',
  icon: HeartHandshakeIcon,
  color: 'text-yellow-400',
  bg: 'bg-yellow-500/15',
  border: 'border-yellow-500/40',
  glow: 'shadow-yellow-500/20',
  accent: '#facc15'
}];

const contributors = [
{
  id: 'field' as ContributorType,
  title: 'Field Operators',
  subtitle: 'The humans AI works for',
  icon: RadioIcon,
  color: 'from-blue-400 to-blue-600',
  textColor: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/30',
  share: 35,
  shareLabel: '35% of dividend pool',
  description:
  'Frontline workers whose daily actions, decisions, and expertise are captured and amplified by AI. They receive the largest share — because they are the source.',
  streams: [
  'Direct savings share — weekly payouts',
  'Productivity bonus when AI exceeds targets',
  'Skill premium for high-value process capture'],

  example: '~$340 blended avg monthly dividend (field class)',
  exampleColor: 'text-blue-400'
},
{
  id: 'trainer' as ContributorType,
  title: 'Embodied Trainers',
  subtitle: 'Human knowledge → machine skill',
  icon: BrainIcon,
  color: 'from-purple-400 to-purple-600',
  textColor: 'text-purple-400',
  bg: 'bg-purple-500/10',
  border: 'border-purple-500/30',
  share: 25,
  shareLabel: '25% of dividend pool',
  description:
  "Specialists who deliberately train AI systems through structured skill transfer sessions. Their expertise becomes IP — and they earn royalties for as long as it's deployed.",
  streams: [
  'Skill licensing royalties — trailing revenue while deployed',
  'Training session compensation',
  'IP ownership stake in trained models'],

  example: 'Top trainers: ~$1,200/mo · Pool avg varies by deployment volume',
  exampleColor: 'text-purple-400'
},
{
  id: 'process' as ContributorType,
  title: 'Process Contributors',
  subtitle: 'Workflow architects',
  icon: LayersIcon,
  color: 'from-cyan-400 to-cyan-600',
  textColor: 'text-cyan-400',
  bg: 'bg-cyan-500/10',
  border: 'border-cyan-500/30',
  share: 20,
  shareLabel: '20% of dividend pool',
  description:
  'Team members who document, refine, and contribute business processes that AI executes at scale. Every optimized workflow they contribute earns ongoing compensation.',
  streams: [
  'Process IP royalties per deployment',
  'Optimization bonus when AI improves on their process',
  'Cross-company licensing when process is adopted industry-wide'],

  example: '~$580 avg monthly process royalty (active contributors)',
  exampleColor: 'text-cyan-400'
},
{
  id: 'shareholder' as ContributorType,
  title: 'Shareholders',
  subtitle: 'Capital + mission alignment',
  icon: TrendingUpIcon,
  color: 'from-green-400 to-green-600',
  textColor: 'text-green-400',
  bg: 'bg-green-500/10',
  border: 'border-green-500/30',
  share: 20,
  shareLabel: '20% of dividend pool',
  description:
  'Investors and equity holders who fund the infrastructure. Their returns are directly tied to AI performance — aligning capital with the mission of human flourishing.',
  streams: [
  'Performance-linked equity dividends',
  'Trailing revenue from skill licensing at scale',
  'Upside from humanoid skill packet licensing (2028+ roadmap)'],

  example: 'Returns scale with AI performance, not headcount',
  exampleColor: 'text-green-400'
}];

const revenueStreams = [
{
  icon: ActivityIcon,
  title: 'Direct Savings Share',
  desc: 'Real-time split of verified AI-generated cost savings. Paid weekly, blockchain-verified.',
  color: 'text-green-400',
  bg: 'bg-green-500/10',
  border: 'border-green-500/20',
  badge: 'Active',
  badgeColor: 'bg-green-500/20 text-green-400'
},
{
  icon: RepeatIcon,
  title: 'Trailing Skill Royalties',
  desc: 'Every time your captured skill is deployed by AI — anywhere in the network — you earn. Royalties continue for the life of the deployment.',
  color: 'text-purple-400',
  bg: 'bg-purple-500/10',
  border: 'border-purple-500/20',
  badge: 'Recurring',
  badgeColor: 'bg-purple-500/20 text-purple-400'
},
{
  icon: GlobeIcon,
  title: 'Cross-Industry Licensing',
  desc: 'When your process is adopted by businesses in other industries, you earn a licensing royalty on every deployment.',
  color: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/20',
  badge: 'Scaling',
  badgeColor: 'bg-blue-500/20 text-blue-400'
},
{
  icon: ZapIcon,
  title: 'Humanoid Skill Packets',
  desc: 'Your captured workflows become Skill Transfer Packets for humanoid robots. Royalties begin when embodied AI deploys your expertise (2028+ roadmap).',
  color: 'text-orange-400',
  bg: 'bg-orange-500/10',
  border: 'border-orange-500/20',
  badge: '2028+',
  badgeColor: 'bg-orange-500/20 text-orange-400'
}];

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2500,
  active






}: {target: number;prefix?: string;suffix?: string;duration?: number;active: boolean;}) {
  const [value, setValue] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return (
    <span>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>);

}
// ─── Main Component ─────────────────────────────────────────────────────────────
export function EmployeeDividend() {
  const [activeStep, setActiveStep] = useState(0);
  const [activeContributor, setActiveContributor] =
  useState<ContributorType>('field');
  const [isVisible, setIsVisible] = useState(false);
  // Auto-cycle through loop steps
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % loopSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);
  const activeContributorData = contributors.find(
    (c) => c.id === activeContributor
  )!;
  const activeStepData = loopSteps[activeStep];
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-32 relative overflow-hidden">
      {/* Background ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(234,179,8,0.04) 0%, transparent 60%)'
        }} />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          onViewportEnter={() => setIsVisible(true)}
          viewport={{
            once: true,
            margin: '-80px'
          }}
          transition={{
            duration: 0.65
          }}
          className="text-center mb-20">

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
              delay: 0.15
            }}
            className="inline-flex items-center gap-2 bg-yellow-500/15 border border-yellow-500/40 rounded-full px-5 py-2 mb-6">

            <CoinsIcon className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-yellow-300 uppercase tracking-widest">
              AI Employee Dividend
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-5 leading-[0.92] tracking-tight">
            AI Works For You.
            <br />
            <span className="text-yellow-400">You Share The Gains.</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            When AI management meets its goals, a significant portion of the
            savings flows back to the humans who made it possible — field
            operators, trainers, process contributors, and shareholders. This is
            the path to{' '}
            <span className="text-white font-semibold">
              Universal Human Income
            </span>
            .
          </p>

          {/* Live dividend pool counter */}
          <motion.div
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
              duration: 0.6,
              delay: 0.3
            }}
            className="inline-flex flex-col items-center mt-10 bg-gradient-to-br from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-3xl px-10 py-6">

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Total Dividend Pool — Pilot Month (Projected)
            </p>
            <p className="text-5xl lg:text-6xl font-black text-yellow-400 tabular-nums">
              $
              <AnimatedCounter
                target={284750}
                active={isVisible}
                duration={2800} />

            </p>
            <div className="flex items-center gap-2 mt-2">
              <motion.div
                animate={{
                  opacity: [1, 0.3, 1]
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity
                }}
                className="w-2 h-2 bg-green-400 rounded-full" />

              <span className="text-sm text-green-400 font-semibold">
                Grows as AI-generated savings accumulate
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              847 contributors · $336 blended avg · pool split 35/25/20/20 by
              class
            </p>
          </motion.div>
        </motion.div>

        {/* ── The Core Loop ── */}
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
            duration: 0.6
          }}
          className="mb-20">

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-10">
            The Dividend Loop
          </p>

          {/* Step indicators */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {loopSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;
              const isPast = i < activeStep;
              return (
                <motion.button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  animate={{
                    opacity: isActive ? 1 : isPast ? 0.65 : 0.4
                  }}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border transition-all duration-300 text-center ${isActive ? `${step.bg} ${step.border} shadow-lg ${step.glow}` : 'bg-white/5 border-white/10'}`}>

                  {/* Step number connector */}
                  {i < loopSteps.length - 1 &&
                  <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRightIcon
                      className={`w-4 h-4 transition-colors ${isActive ? step.color : 'text-slate-700'}`} />

                    </div>
                  }
                  {/* Loop back arrow on last */}
                  {i === loopSteps.length - 1 &&
                  <div className="hidden lg:block absolute -right-1.5 top-1/2 -translate-y-1/2 z-10">
                      <RepeatIcon
                      className={`w-4 h-4 transition-colors ${isActive ? step.color : 'text-slate-700'}`} />

                    </div>
                  }

                  <motion.div
                    animate={{
                      scale: isActive ? 1.1 : 1
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 20
                    }}
                    className={`w-12 h-12 ${step.bg} border ${step.border} rounded-xl flex items-center justify-center relative`}>

                    <Icon className={`w-6 h-6 ${step.color}`} />
                    {isActive &&
                    <motion.div
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.4, 0, 0.4]
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity
                      }}
                      className={`absolute inset-0 ${step.bg} rounded-xl`} />

                    }
                  </motion.div>

                  <div>
                    <p
                      className={`text-xs font-bold uppercase tracking-wide ${isActive ? step.color : 'text-slate-400'}`}>

                      Step {i + 1}
                    </p>
                    <p
                      className={`text-sm font-black mt-0.5 ${isActive ? 'text-white' : 'text-slate-300'}`}>

                      {step.shortLabel}
                    </p>
                  </div>
                </motion.button>);

            })}
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{
                opacity: 0,
                y: 12
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
                duration: 0.3
              }}
              className={`${activeStepData.bg} border ${activeStepData.border} rounded-2xl p-6 text-center max-w-2xl mx-auto`}>

              <p className={`text-base text-slate-200 leading-relaxed`}>
                <span className={`font-bold ${activeStepData.color}`}>
                  {activeStepData.label}:{' '}
                </span>
                {activeStepData.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Contributor Breakdown ── */}
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
            duration: 0.6
          }}
          className="mb-20">

          <div className="text-center mb-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Who Earns The Dividend
            </p>
            <h3 className="text-3xl lg:text-4xl font-black text-white">
              Four Contributor Classes.{' '}
              <span className="text-yellow-400">All Rewarded.</span>
            </h3>
          </div>

          {/* Contributor tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {contributors.map((c) => {
              const Icon = c.icon;
              const isActive = activeContributor === c.id;
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setActiveContributor(c.id)}
                  whileTap={{
                    scale: 0.97
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${isActive ? `${c.bg} ${c.border} ${c.textColor}` : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'}`}>

                  <Icon className="w-4 h-4" />
                  {c.title}
                </motion.button>);

            })}
          </div>

          {/* Active contributor detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeContributor}
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
                y: -16
              }}
              transition={{
                duration: 0.35
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Left: info */}
              <div
                className={`${activeContributorData.bg} border ${activeContributorData.border} rounded-3xl p-7`}>

                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${activeContributorData.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                    {createElement(activeContributorData.icon, {
                      className: 'w-7 h-7 text-white'
                    })}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white">
                      {activeContributorData.title}
                    </h4>
                    <p
                      className={`text-sm font-semibold ${activeContributorData.textColor}`}>

                      {activeContributorData.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-5">
                  {activeContributorData.description}
                </p>

                {/* Share bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">
                      Dividend Share
                    </span>
                    <span
                      className={`text-lg font-black ${activeContributorData.textColor}`}>

                      {activeContributorData.shareLabel}
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      initial={{
                        width: 0
                      }}
                      animate={{
                        width: `${activeContributorData.share}%`
                      }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeOut'
                      }}
                      className={`h-3 bg-gradient-to-r ${activeContributorData.color} rounded-full`} />

                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-2 ${activeContributorData.bg} border ${activeContributorData.border} rounded-xl px-4 py-2`}>

                  <DollarSignIcon
                    className={`w-4 h-4 ${activeContributorData.textColor}`} />

                  <span
                    className={`text-sm font-bold ${activeContributorData.textColor}`}>

                    {activeContributorData.example}
                  </span>
                </div>
              </div>

              {/* Right: revenue streams */}
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  Revenue Streams for {activeContributorData.title}
                </p>
                {activeContributorData.streams.map((stream, i) =>
                <motion.div
                  key={stream}
                  initial={{
                    opacity: 0,
                    x: 16
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.1
                  }}
                  className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">

                    <div
                    className={`w-6 h-6 bg-gradient-to-br ${activeContributorData.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>

                      <span className="text-white text-xs font-black">
                        {i + 1}
                      </span>
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {stream}
                    </p>
                  </motion.div>
                )}

                {/* Blockchain verification note */}
                <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-2">
                  <ShieldCheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <p className="text-xs text-green-300">
                    All dividend distributions are recorded on-chain. Every
                    payout is independently verifiable and tamper-proof.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ── Trailing Revenue Streams ── */}
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
            duration: 0.6
          }}
          className="mb-20">

          <div className="text-center mb-10">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              How You Keep Earning
            </p>
            <h3 className="text-3xl lg:text-4xl font-black text-white">
              Trailing Revenue.{' '}
              <span className="text-orange-400">Not Just a Paycheck.</span>
            </h3>
            <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
              Your contribution doesn't pay once — it pays forever. Every skill,
              process, and workflow you contribute generates a trailing revenue
              stream that compounds over time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {revenueStreams.map((stream, i) => {
              const Icon = stream.icon;
              return (
                <motion.div
                  key={stream.title}
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
                    delay: i * 0.1
                  }}
                  className={`${stream.bg} border ${stream.border} rounded-2xl p-5`}>

                  <div className="flex items-start justify-between mb-4">
                    <Icon className={`w-6 h-6 ${stream.color}`} />
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${stream.badgeColor}`}>

                      {stream.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white mb-2">
                    {stream.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stream.desc}
                  </p>
                </motion.div>);

            })}
          </div>
        </motion.div>

        {/* ── UBI / UHI Vision ── */}
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
            duration: 0.7
          }}
          className="relative overflow-hidden rounded-3xl">

          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-orange-500/8 to-green-500/10" />
          <div className="absolute inset-0 border border-yellow-500/25 rounded-3xl" />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.06, 0.12, 0.06]
            }}
            transition={{
              duration: 8,
              repeat: Infinity
            }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-500 rounded-full blur-[80px] pointer-events-none" />


          <div className="relative z-10 p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Left: vision text */}
              <div>
                <div className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/40 rounded-full px-4 py-1.5 mb-6">
                  <GlobeIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-300 uppercase tracking-widest">
                    The Bigger Vision
                  </span>
                </div>

                <h3 className="text-3xl lg:text-5xl font-black text-white mb-4 leading-tight">
                  A Path to{' '}
                  <span className="text-yellow-400">
                    Universal Human Income.
                  </span>
                </h3>

                <p className="text-slate-300 leading-relaxed mb-6">
                  As AI management scales across millions of businesses, the
                  dividend pool scales with it. Every human who contributes
                  skills, processes, or training data earns a stake in the AI
                  economy — not as charity, but as{' '}
                  <span className="text-white font-semibold">
                    earned compensation for the value they created
                  </span>
                  .
                </p>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  This is UHI — Universal Human Income — where the productivity
                  gains of AI are distributed to the humans whose knowledge made
                  those gains possible. Trade your expertise for trailing
                  revenue. Build a portfolio of skill IP. Earn while AI works.
                </p>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    window.location.hash = '#/signup';
                  }}>

                  <SparklesIcon className="mr-2 w-5 h-5" />
                  Start Earning Your Dividend
                  <ArrowRightIcon className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* Right: key stats */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                    <p className="text-4xl font-black text-yellow-400 mb-1">
                      $
                      <AnimatedCounter
                        target={284750}
                        active={isVisible}
                        duration={3000} />

                    </p>
                    <p className="text-xs text-slate-400">
                      Monthly pool (pilot)
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                    <p className="text-4xl font-black text-green-400 mb-1">
                      <AnimatedCounter
                        target={847}
                        active={isVisible}
                        duration={2200} />

                    </p>
                    <p className="text-xs text-slate-400">
                      Contributors earning
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                    <p className="text-4xl font-black text-orange-400 mb-1">
                      $
                      <AnimatedCounter
                        target={340}
                        active={isVisible}
                        duration={1800} />

                    </p>
                    <p className="text-xs text-slate-400">
                      Avg monthly dividend
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                    <p className="text-4xl font-black text-purple-400 mb-1">
                      ∞
                    </p>
                    <p className="text-xs text-slate-400">
                      Trailing royalty duration
                    </p>
                  </div>
                </div>

                {/* Principle callout */}
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-5">
                  <p className="text-sm font-bold text-white mb-1">
                    "AI management works for employees. Employees work for the
                    mission. Everyone shares the upside."
                  </p>
                  <p className="text-xs text-slate-500">
                    Catapult Company · Employee Dividend Philosophy · 2026 ·
                    Figures are pilot projections
                  </p>
                </div>

                {/* Distribution breakdown */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                    Pool Distribution
                  </p>
                  <div className="space-y-2">
                    {contributors.map((c) =>
                    <div key={c.id} className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 w-32 flex-shrink-0">
                          {c.title}
                        </span>
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <motion.div
                          initial={{
                            width: 0
                          }}
                          whileInView={{
                            width: `${c.share}%`
                          }}
                          viewport={{
                            once: true
                          }}
                          transition={{
                            duration: 1,
                            delay: 0.2
                          }}
                          className={`h-2 bg-gradient-to-r ${c.color} rounded-full`} />

                        </div>
                        <span
                        className={`text-xs font-black ${c.textColor} w-8 text-right flex-shrink-0`}>

                          {c.share}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}