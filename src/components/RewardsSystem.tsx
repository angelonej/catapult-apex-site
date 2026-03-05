import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  TrophyIcon,
  StarIcon,
  ZapIcon,
  ClockIcon,
  DollarSignIcon,
  ShareIcon,
  AwardIcon,
  TrendingUpIcon,
  UsersIcon,
  HeartIcon,
  CheckCircleIcon,
  LinkedinIcon,
  TwitterIcon } from
'lucide-react';
const badges = [
{
  id: 'time-100',
  name: 'Time Saver',
  desc: '100 hours bought back',
  icon: ClockIcon,
  color: 'from-blue-400 to-blue-600',
  earned: true,
  hours: 100
},
{
  id: 'time-500',
  name: 'Time Investor',
  desc: '500 hours bought back',
  icon: TrendingUpIcon,
  color: 'from-gold-400 to-gold-600',
  earned: true,
  hours: 500
},
{
  id: 'time-1000',
  name: 'Time Millionaire',
  desc: '1,000 hours bought back',
  icon: TrophyIcon,
  color: 'from-accent-500 to-accent-700',
  earned: false,
  hours: 1000
},
{
  id: 'revenue-10k',
  name: 'Revenue Catalyst',
  desc: '$10K influenced',
  icon: DollarSignIcon,
  color: 'from-green-400 to-green-600',
  earned: true,
  hours: 0
},
{
  id: 'decisions-1k',
  name: 'Decision Maker',
  desc: '1,000 AI decisions',
  icon: ZapIcon,
  color: 'from-purple-400 to-purple-600',
  earned: true,
  hours: 0
},
{
  id: 'team-full',
  name: 'Full C-Suite',
  desc: 'All 6 executives deployed',
  icon: UsersIcon,
  color: 'from-cyan-400 to-cyan-600',
  earned: false,
  hours: 0
}];

const leaderboard = [
{
  rank: 1,
  name: 'Rivera Landscaping',
  location: 'Austin, TX',
  hours: 2847,
  badge: '🏆',
  change: '+12'
},
{
  rank: 2,
  name: 'Apex HVAC Solutions',
  location: 'Phoenix, AZ',
  hours: 2341,
  badge: '🥈',
  change: '+8'
},
{
  rank: 3,
  name: 'Meridian Law Group',
  location: 'Chicago, IL',
  hours: 1987,
  badge: '🥉',
  change: '+15'
},
{
  rank: 4,
  name: 'Summit Medical',
  location: 'Denver, CO',
  hours: 1654,
  badge: '⭐',
  change: '+6'
},
{
  rank: 5,
  name: 'Your Business',
  location: 'You',
  hours: 127,
  badge: '📈',
  change: '+38',
  isUser: true
}];

const rewardTiers = [
{
  name: 'Bronze',
  hours: 100,
  color: 'from-orange-700 to-orange-900',
  textColor: 'text-orange-400',
  perks: ['Priority support', 'Monthly insights report']
},
{
  name: 'Silver',
  hours: 500,
  color: 'from-slate-400 to-slate-600',
  textColor: 'text-slate-300',
  perks: ['Dedicated success manager', 'Custom agent training', 'API access']
},
{
  name: 'Gold',
  hours: 1000,
  color: 'from-gold-400 to-gold-600',
  textColor: 'text-gold-400',
  perks: [
  'White-glove onboarding',
  'Custom industry frames',
  'Revenue share program']

},
{
  name: 'Platinum',
  hours: 5000,
  color: 'from-purple-400 to-purple-600',
  textColor: 'text-purple-400',
  perks: [
  'Board-level AI strategy',
  'Humanoid beta access',
  'Equity partnership']

}];

const socialFeed = [
{
  id: 1,
  name: 'Rivera Landscaping',
  role: 'Owner',
  platform: 'linkedin',
  text: '🏆 Just hit #1 on the Catapult leaderboard — 2,847 hours bought back for our team. Field operators earning monthly dividends. This is UHI in action.',
  likes: 3421,
  time: '3d ago',
  badge: '🏆',
  initials: 'RL',
  avatarColor: 'from-green-400 to-green-600'
},
{
  id: 2,
  name: 'Maria R.',
  role: 'Field Operator',
  platform: 'twitter',
  text: "Rated my AI COO 5 stars today. It rescheduled 3 crews around a storm I didn't even know was coming. Saved us $3K. @CatapultAI #AIManagement",
  likes: 847,
  time: '2h ago',
  badge: '⭐',
  initials: 'MR',
  avatarColor: 'from-blue-400 to-blue-600'
},
{
  id: 3,
  name: 'Apex HVAC',
  role: 'Team',
  platform: 'linkedin',
  text: 'Silver tier achieved! 500 hours bought back. Our AI CFO has been a game-changer for cash flow. Dedicated success manager is worth every penny.',
  likes: 1203,
  time: '1d ago',
  badge: '🥈',
  initials: 'AH',
  avatarColor: 'from-orange-400 to-orange-600'
},
{
  id: 4,
  name: 'Sarah K.',
  role: 'Founder',
  platform: 'twitter',
  text: 'Solo founder competing like a team of 20. AI CMO ran 14 A/B tests last month. Email revenue +34%. Dividend check incoming 💰 @CatapultAI',
  likes: 2109,
  time: '5h ago',
  badge: '📈',
  initials: 'SK',
  avatarColor: 'from-pink-400 to-pink-600'
}];

export function RewardsSystem() {
  const [activeTab, setActiveTab] = useState<
    'badges' | 'leaderboard' | 'tiers' | 'social'>(
    'badges');
  const userHours = 127;
  const nextTierHours = 500;
  const progress = userHours / nextTierHours * 100;
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

            <TrophyIcon className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-300 uppercase tracking-wide">
              Rewards & Recognition
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Earn Your <span className="text-gold-400">Time Back.</span>
            <br />
            Get Recognized.
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Every hour your AI team saves earns you badges, unlocks perks, and
            moves you up the global leaderboard.
          </p>
        </motion.div>

        {/* User Progress Card */}
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
          className="bg-gradient-to-br from-gold-500/10 to-accent-500/10 border border-gold-500/30 rounded-3xl p-6 mb-10">

          <div className="flex flex-col lg:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-glow-gold">
                <AwardIcon className="w-10 h-10 text-slate-900" />
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                  Your Status
                </p>
                <p className="text-2xl font-black text-gold-400">
                  Bronze Member
                </p>
                <p className="text-sm text-slate-400">
                  {userHours} hours bought back
                </p>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">
                  Progress to Silver
                </span>
                <span className="text-sm font-bold text-gold-400">
                  {userHours} / {nextTierHours} hrs
                </span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 mb-2">
                <motion.div
                  initial={{
                    width: 0
                  }}
                  whileInView={{
                    width: `${progress}%`
                  }}
                  viewport={{
                    once: true
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut',
                    delay: 0.5
                  }}
                  className="h-3 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full" />

              </div>
              <p className="text-xs text-slate-500">
                {nextTierHours - userHours} more hours until Silver — your AI
                team will get you there
              </p>
            </div>

            {/* Updated share buttons — LinkedIn + X side by side */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-blue-600/20 border border-blue-600/40 text-blue-400 hover:bg-blue-600/30 transition-all">
                <LinkedinIcon className="w-4 h-4" />
                LinkedIn
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold bg-white/10 border border-white/20 text-white hover:bg-white/15 transition-all">
                <TwitterIcon className="w-4 h-4" />
                Share on X
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit">
          {(['badges', 'leaderboard', 'tiers', 'social'] as const).map(
            (tab) =>
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2 rounded-xl text-sm font-semibold transition-colors capitalize ${activeTab === tab ? 'text-white' : 'text-slate-400 hover:text-white'}`}>

                {activeTab === tab &&
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white/10 rounded-xl"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30
                }} />

              }
                <span className="relative">{tab}</span>
              </motion.button>

          )}
        </div>

        <AnimatePresence mode="wait">
          {/* Badges */}
          {activeTab === 'badges' &&
          <motion.div
            key="badges"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.3
            }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

              {badges.map((badge, i) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.id}
                  initial={{
                    opacity: 0,
                    scale: 0.8
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: i * 0.07,
                    type: 'spring',
                    stiffness: 300
                  }}
                  className={`relative bg-white/5 border rounded-2xl p-4 text-center ${badge.earned ? 'border-white/20' : 'border-white/5 opacity-50'}`}>

                    {badge.earned &&
                  <div className="absolute top-2 right-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                      </div>
                  }
                    <div
                    className={`w-14 h-14 bg-gradient-to-br ${badge.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg ${!badge.earned ? 'grayscale' : ''}`}>

                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">
                      {badge.name}
                    </p>
                    <p className="text-xs text-slate-400 mb-2">{badge.desc}</p>
                    {!badge.earned &&
                  <p className="text-xs text-slate-600">Locked</p>
                  }
                    {/* Social share icons for earned badges */}
                    {badge.earned &&
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                        <button
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                      aria-label="Share on LinkedIn">

                          <LinkedinIcon className="w-3 h-3" />
                        </button>
                        <button
                      className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                      aria-label="Share on X">

                          <TwitterIcon className="w-3 h-3" />
                        </button>
                      </div>
                  }
                  </motion.div>);

            })}
            </motion.div>
          }

          {/* Leaderboard */}
          {activeTab === 'leaderboard' &&
          <motion.div
            key="leaderboard"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.3
            }}
            className="space-y-3">

              {leaderboard.map((entry, i) =>
            <motion.div
              key={entry.rank}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.08
              }}
              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${entry.isUser ? 'bg-gold-500/10 border-gold-500/30' : 'bg-white/5 border-white/10'}`}>

                  <span className="text-2xl w-8 text-center">
                    {entry.badge}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p
                    className={`font-bold ${entry.isUser ? 'text-gold-400' : 'text-white'}`}>

                        {entry.name}
                      </p>
                      {entry.isUser &&
                  <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full">
                          You
                        </span>
                  }
                    </div>
                    <p className="text-xs text-slate-400">{entry.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-white">
                      {entry.hours.toLocaleString()} hrs
                    </p>
                    <p className="text-xs text-green-400">
                      +{entry.change} this week
                    </p>
                  </div>
                  {/* Share buttons for top 3 */}
                  {entry.rank <= 3 &&
              <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button className="p-1.5 rounded-lg text-blue-400 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 rounded-lg text-slate-300 bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                        <TwitterIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
              }
                </motion.div>
            )}
            </motion.div>
          }

          {/* Tiers */}
          {activeTab === 'tiers' &&
          <motion.div
            key="tiers"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.3
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

              {rewardTiers.map((tier, i) =>
            <motion.div
              key={tier.name}
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.1
              }}
              className={`bg-white/5 border border-white/10 rounded-2xl p-5 ${i === 0 ? 'ring-2 ring-gold-500/40' : ''}`}>

                  <div
                className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>

                    <TrophyIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`text-lg font-black ${tier.textColor}`}>
                      {tier.name}
                    </h3>
                    {i === 0 &&
                <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full">
                        Current
                      </span>
                }
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    {tier.hours.toLocaleString()}+ hours saved
                  </p>
                  <div className="space-y-2">
                    {tier.perks.map((perk) =>
                <div
                  key={perk}
                  className="flex items-center gap-2 text-xs text-slate-300">

                        <CheckCircleIcon className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                        {perk}
                      </div>
                )}
                  </div>
                </motion.div>
            )}
            </motion.div>
          }

          {/* Social Feed */}
          {activeTab === 'social' &&
          <motion.div
            key="social"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -10
            }}
            transition={{
              duration: 0.3
            }}
            className="space-y-4">

              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  Community Recognition Feed
                </p>
                <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                  <motion.span
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.4,
                    repeat: Infinity
                  }}
                  className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />

                  Live
                </span>
              </div>

              {socialFeed.map((post, i) =>
            <motion.div
              key={post.id}
              initial={{
                opacity: 0,
                y: 16
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.1
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-4">

                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    <div
                  className={`w-10 h-10 bg-gradient-to-br ${post.avatarColor} rounded-full flex items-center justify-center flex-shrink-0 text-white font-black text-xs`}>

                      {post.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-sm">
                          {post.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          {post.role}
                        </span>
                        {post.platform === 'linkedin' ?
                    <span className="flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-full">
                            <LinkedinIcon className="w-3 h-3" /> LinkedIn
                          </span> :

                    <span className="flex items-center gap-1 text-xs font-bold text-slate-300 bg-white/10 border border-white/20 px-2 py-0.5 rounded-full">
                            <TwitterIcon className="w-3 h-3" /> X
                          </span>
                    }
                        <span className="text-xs text-slate-600 ml-auto">
                          {post.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Post text */}
                  <p className="text-sm text-slate-200 italic leading-relaxed mb-3">
                    "{post.text}"
                  </p>

                  {/* Footer */}
                  <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-pink-400">
                      <HeartIcon className="w-4 h-4 fill-pink-400" />
                      <span className="text-xs font-semibold">
                        {post.likes.toLocaleString()}
                      </span>
                    </div>
                    <span className="text-lg">{post.badge}</span>
                    <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-orange-400 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 transition-all">
                      <ShareIcon className="w-3.5 h-3.5" />
                      Share Similar
                    </button>
                  </div>
                </motion.div>
            )}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </section>);

}