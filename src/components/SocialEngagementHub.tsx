import React, { useEffect, useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ThumbsUpIcon,
  TrophyIcon,
  ShareIcon,
  BrainIcon,
  TrendingUpIcon,
  MessageSquareIcon,
  HeartIcon,
  RepeatIcon,
  ZapIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  UsersIcon,
  BarChart3Icon,
  SparklesIcon } from
'lucide-react';
// ─── Types ──────────────────────────────────────────────────────────────────
type Platform = 'linkedin' | 'twitter';
interface SocialPost {
  id: number;
  initials: string;
  avatarColor: string;
  name: string;
  role: string;
  platform: Platform;
  text: string;
  likes: number;
  comments: number;
  shares: number;
  timeAgo: string;
}
// ─── Data ────────────────────────────────────────────────────────────────────
const socialPosts: SocialPost[] = [
{
  id: 1,
  initials: 'MR',
  avatarColor: 'from-blue-400 to-blue-600',
  name: 'Maria R.',
  role: 'Owner',
  platform: 'linkedin',
  text: 'Our AI CFO recovered $8,100 in overdue invoices this week — automatically. No calls, no awkward emails. Just results. 🚀 #AIExecutive #CatapultCompany',
  likes: 847,
  comments: 23,
  shares: 12,
  timeAgo: '2h ago'
},
{
  id: 2,
  initials: 'JT',
  avatarColor: 'from-green-400 to-green-600',
  name: 'James T.',
  role: 'Field Operator',
  platform: 'twitter',
  text: "Rated my AI COO 5 stars today. It rescheduled 3 crews around a storm I didn't even know was coming. Saved us a $3K no-show. This thing is scary good. @CatapultAI",
  likes: 312,
  comments: 45,
  shares: 89,
  timeAgo: '4h ago'
},
{
  id: 3,
  initials: 'DC',
  avatarColor: 'from-purple-400 to-purple-600',
  name: 'Dr. Chen',
  role: 'Practice Owner',
  platform: 'linkedin',
  text: 'Our AI CLO flagged a HIPAA gap 3 weeks before our audit. Clean pass. The AI paid for itself in one decision. If you run a medical practice, you need this.',
  likes: 1200,
  comments: 67,
  shares: 234,
  timeAgo: '1d ago'
},
{
  id: 4,
  initials: 'SK',
  avatarColor: 'from-pink-400 to-pink-600',
  name: 'Sarah K.',
  role: 'Founder',
  platform: 'twitter',
  text: 'Solo founder. 1 employee (me). But I compete like I have a team of 20. My AI CMO ran 14 A/B tests last month. Email revenue up 34%. @CatapultAI #UBI',
  likes: 2100,
  comments: 89,
  shares: 445,
  timeAgo: '2d ago'
},
{
  id: 5,
  initials: 'RL',
  avatarColor: 'from-yellow-400 to-orange-500',
  name: 'Rivera Landscaping',
  role: 'Team',
  platform: 'linkedin',
  text: '🏆 Just hit #1 on the Catapult leaderboard — 2,847 hours bought back for our team. Our field operators are earning dividend payouts monthly. This is what UHI looks like.',
  likes: 3400,
  comments: 156,
  shares: 678,
  timeAgo: '3d ago'
}];

const loopSteps = [
{
  id: 1,
  icon: ThumbsUpIcon,
  label: 'Employee Rates',
  desc: 'Thumbs up or star rating on AI action',
  color: 'text-yellow-400',
  bg: 'bg-yellow-500/15',
  border: 'border-yellow-500/30'
},
{
  id: 2,
  icon: TrophyIcon,
  label: 'Badge Earned',
  desc: 'Achievement unlocked, recognition triggered',
  color: 'text-orange-400',
  bg: 'bg-orange-500/15',
  border: 'border-orange-500/30'
},
{
  id: 3,
  icon: ShareIcon,
  label: 'Shared Publicly',
  desc: 'One-click post to LinkedIn or X',
  color: 'text-blue-400',
  bg: 'bg-blue-500/15',
  border: 'border-blue-500/30'
},
{
  id: 4,
  icon: BrainIcon,
  label: 'AI Confidence ↑',
  desc: 'Social proof boosts decision confidence score',
  color: 'text-purple-400',
  bg: 'bg-purple-500/15',
  border: 'border-purple-500/30'
},
{
  id: 5,
  icon: TrendingUpIcon,
  label: 'Better Decisions',
  desc: 'More wins → more sharing → loop repeats',
  color: 'text-green-400',
  bg: 'bg-green-500/15',
  border: 'border-green-500/30'
}];

// ─── Platform Icon ────────────────────────────────────────────────────────────
function PlatformBadge({ platform }: {platform: Platform;}) {
  if (platform === 'linkedin') {
    return (
      <span className="inline-flex items-center gap-1 bg-blue-600/20 border border-blue-600/30 text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full">
        in LinkedIn
      </span>);

  }
  return (
    <span className="inline-flex items-center gap-1 bg-white/10 border border-white/20 text-slate-300 text-xs font-bold px-2 py-0.5 rounded-full">
      𝕏 Twitter
    </span>);

}
// ─── Animated Like Counter ────────────────────────────────────────────────────
function AnimatedCount({ value }: {value: number;}) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setDisplay((v) => v + Math.floor(Math.random() * 3));
      },
      3000 + Math.random() * 4000
    );
    return () => clearTimeout(timer);
  }, [display]);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={display}
        initial={{
          opacity: 0,
          y: -4
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        exit={{
          opacity: 0,
          y: 4
        }}
        transition={{
          duration: 0.2
        }}>

        {display >= 1000 ? `${(display / 1000).toFixed(1)}K` : display}
      </motion.span>
    </AnimatePresence>);

}
// ─── Social Post Card ─────────────────────────────────────────────────────────
function SocialPostCard({ post, index }: {post: SocialPost;index: number;}) {
  const [liked, setLiked] = useState(false);
  return (
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
        delay: index * 0.1,
        duration: 0.5
      }}
      className="bg-white/5 border border-white/10 rounded-2xl p-4">

      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 bg-gradient-to-br ${post.avatarColor} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>

          <span className="text-white font-black text-xs">{post.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-white text-sm">{post.name}</span>
            <span className="text-xs text-slate-500">{post.role}</span>
            <PlatformBadge platform={post.platform} />
            <span className="text-xs text-slate-600 ml-auto">
              {post.timeAgo}
            </span>
          </div>
        </div>
      </div>

      {/* Post text */}
      <p className="text-sm text-slate-300 leading-relaxed mb-3">{post.text}</p>

      {/* Engagement row */}
      <div className="flex items-center gap-4 pt-3 border-t border-white/10">
        <button
          onClick={() => setLiked((v) => !v)}
          className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${liked ? 'text-pink-400' : 'text-slate-500 hover:text-pink-400'}`}>

          <HeartIcon
            className={`w-3.5 h-3.5 ${liked ? 'fill-pink-400' : ''}`} />

          <AnimatedCount value={post.likes + (liked ? 1 : 0)} />
        </button>
        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors font-semibold">
          <MessageSquareIcon className="w-3.5 h-3.5" />
          {post.comments}
        </button>
        <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors font-semibold">
          <RepeatIcon className="w-3.5 h-3.5" />
          {post.shares}
        </button>
        <button className="ml-auto flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-orange-300 bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 px-2.5 py-1 rounded-lg transition-all">
          <ShareIcon className="w-3 h-3" />
          Share Win
        </button>
      </div>
    </motion.div>);

}
// ─── Main Component ───────────────────────────────────────────────────────────
export function SocialEngagementHub() {
  const [activeStep, setActiveStep] = useState(0);
  const [copiedTemplate, setCopiedTemplate] = useState<
    'linkedin' | 'twitter' | null>(
    null);
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % loopSteps.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);
  const handleCopy = (platform: 'linkedin' | 'twitter') => {
    const text =
    platform === 'linkedin' ?
    'Our AI [ROLE] just [ACTION], saving us [AMOUNT]. [X] months with @CatapultCompany and the ROI is undeniable. #AIManagement #SmallBusiness' :
    'AI management is real. Our @CatapultAI [ROLE] just [ACTION]. [RESULT]. #CatapultCompany #AIExecutive';
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedTemplate(platform);
    setTimeout(() => setCopiedTemplate(null), 2000);
  };
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
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
            margin: '-80px'
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
              delay: 0.15
            }}
            className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/40 rounded-full px-5 py-2 mb-6">

            <ShareIcon className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-blue-300 uppercase tracking-widest">
              Social Recognition Engine
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Recognition Goes Viral.
            <br />
            <span className="text-blue-400">Your Wins Become Your Brand.</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            When employees share AI-driven wins on LinkedIn and X, it creates
            social proof that feeds back into AI decision confidence scores —
            making every shared win smarter than the last.
          </p>
        </motion.div>

        {/* ── Main Grid: Feed + Loop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left: Live Social Feed */}
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

            <div className="flex items-center gap-3 mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Live Recognition Feed
              </p>
              <div className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 rounded-full px-2.5 py-1">
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity
                  }}
                  className="w-1.5 h-1.5 bg-green-400 rounded-full" />

                <span className="text-xs font-bold text-green-400">Live</span>
              </div>
            </div>

            <div className="space-y-3">
              {socialPosts.map((post, i) =>
              <SocialPostCard key={post.id} post={post} index={i} />
              )}
            </div>
          </motion.div>

          {/* Right: Social Feedback Loop */}
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
              delay: 0.15
            }}>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
              The Social Feedback Loop
            </p>

            <div className="relative">
              {/* Vertical connector line */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-white/10" />
              <motion.div
                className="absolute left-6 top-6 w-0.5 bg-gradient-to-b from-yellow-500 via-blue-500 to-green-500"
                animate={{
                  height: `${(activeStep + 1) / loopSteps.length * 100}%`
                }}
                transition={{
                  duration: 0.5
                }} />


              <div className="space-y-4">
                {loopSteps.map((step, i) => {
                  const Icon = step.icon;
                  const isActive = i === activeStep;
                  const isPast = i < activeStep;
                  return (
                    <motion.div
                      key={step.id}
                      animate={{
                        opacity: isActive ? 1 : isPast ? 0.65 : 0.35
                      }}
                      className="flex items-center gap-4">

                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 20
                        }}
                        className={`relative z-10 w-12 h-12 ${step.bg} border ${step.border} rounded-full flex items-center justify-center flex-shrink-0`}>

                        <Icon className={`w-5 h-5 ${step.color}`} />
                        {isActive &&
                        <motion.div
                          animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.4, 0, 0.4]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity
                          }}
                          className={`absolute inset-0 ${step.bg} rounded-full`} />

                        }
                      </motion.div>

                      <div
                        className={`flex-1 p-4 rounded-2xl border transition-all duration-300 ${isActive ? `${step.bg} ${step.border}` : 'bg-white/5 border-white/10'}`}>

                        <p
                          className={`font-bold text-sm mb-0.5 ${isActive ? step.color : 'text-white'}`}>

                          Step {step.id}: {step.label}
                        </p>
                        <p className="text-xs text-slate-400">{step.desc}</p>
                      </div>
                    </motion.div>);

                })}
              </div>

              {/* Loop back arrow */}
              <motion.div
                initial={{
                  opacity: 0
                }}
                whileInView={{
                  opacity: 1
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: 0.8
                }}
                className="flex items-center gap-3 mt-4 ml-16">

                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-2">
                  <RepeatIcon className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-bold text-green-400">
                    Loop repeats → AI gets smarter every cycle
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Social proof → AI confidence callout */}
            <motion.div
              initial={{
                opacity: 0,
                y: 12
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.4
              }}
              className="mt-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-5">

              <div className="flex items-start gap-3">
                <BrainIcon className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-white mb-1">
                    Social Proof → AI Confidence
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Every public share of an AI win is ingested as a positive
                    signal. When 847 people like "AI CFO recovered $8,100," that
                    outcome's confidence score increases — and the AI applies
                    the same strategy more aggressively across the network.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Stats Bar ── */}
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-blue-400 mb-1">47,832</p>
            <p className="text-xs text-slate-400">Social shares this month</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-green-400 mb-1">2.3M</p>
            <p className="text-xs text-slate-400">Impressions generated</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-purple-400 mb-1">+18%</p>
            <p className="text-xs text-slate-400">
              AI confidence boost from social validation
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
            <p className="text-3xl font-black text-yellow-400 mb-1">892</p>
            <p className="text-xs text-slate-400">
              Employees recognized publicly
            </p>
          </div>
        </motion.div>

        {/* ── Share Your Win CTA ── */}
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
          className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-white/10 rounded-3xl p-8 lg:p-10">

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-orange-500/15 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">
              <SparklesIcon className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-bold text-orange-300 uppercase tracking-widest">
                Share Your Win
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
              One Click. Instant Recognition.
            </h3>
            <p className="text-slate-400">
              Use these templates to share your AI wins. Sharing earns you{' '}
              <span className="text-yellow-400 font-bold">
                50 recognition points
              </span>{' '}
              toward your next reward tier.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* LinkedIn template */}
            <div className="bg-blue-600/10 border border-blue-600/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-black text-blue-400">in</span>
                <span className="text-sm font-bold text-blue-400">
                  LinkedIn Template
                </span>
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed mb-4 bg-white/5 rounded-xl p-3">
                "Our AI [ROLE] just [ACTION], saving us [AMOUNT]. [X] months
                with @CatapultCompany and the ROI is undeniable. #AIManagement
                #SmallBusiness"
              </p>
              <button
                onClick={() => handleCopy('linkedin')}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors text-sm">

                {copiedTemplate === 'linkedin' ?
                <>
                    <CheckCircleIcon className="w-4 h-4" />
                    Copied!
                  </> :

                <>
                    <ShareIcon className="w-4 h-4" />
                    Share on LinkedIn
                  </>
                }
              </button>
            </div>

            {/* Twitter/X template */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-black text-white">𝕏</span>
                <span className="text-sm font-bold text-slate-300">
                  X / Twitter Template
                </span>
              </div>
              <p className="text-sm text-slate-300 italic leading-relaxed mb-4 bg-white/5 rounded-xl p-3">
                "AI management is real. Our @CatapultAI [ROLE] just [ACTION].
                [RESULT]. #CatapultCompany #AIExecutive"
              </p>
              <button
                onClick={() => handleCopy('twitter')}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-white/20 text-white font-bold py-3 rounded-xl transition-colors text-sm">

                {copiedTemplate === 'twitter' ?
                <>
                    <CheckCircleIcon className="w-4 h-4 text-green-400" />
                    Copied!
                  </> :

                <>
                    <ShareIcon className="w-4 h-4" />
                    Share on X
                  </>
                }
              </button>
            </div>
          </div>

          {/* Recognition points note */}
          <div className="flex items-center justify-center gap-3 text-center">
            <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
            <p className="text-xs text-slate-500">
              Sharing earns you{' '}
              <span className="text-yellow-400 font-bold">
                50 recognition points
              </span>{' '}
              toward your next reward tier · Blockchain-verified · Paid monthly
            </p>
            <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400 flex-shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>);

}