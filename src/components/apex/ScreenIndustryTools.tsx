import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulseIcon,
  GraduationCapIcon,
  TrophyIcon,
  BotIcon,
  CheckCircleIcon,
  QuoteIcon,
  ZapIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  StarIcon,
  WrenchIcon,
  PackageIcon,
  TruckIcon } from
'lucide-react';
const industryTools = [
{
  id: 'trade-wellness',
  name: 'Trade Wellness',
  tagline: 'Worker health & wellness integrated into daily workflows',
  color: 'from-emerald-400 to-teal-600',
  bg: 'bg-emerald-500/10',
  border: 'border-emerald-500/30',
  text: 'text-emerald-400',
  Icon: HeartPulseIcon,
  capabilities: [
  'Fatigue, hydration & heat stress monitoring',
  'Mental health check-ins via wearable integrations',
  'Real-time wellness alerts to supervisors']

},
{
  id: 'trade-pro',
  name: 'Trade Pro',
  tagline: 'Professional development & certification tracking',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/30',
  text: 'text-blue-400',
  Icon: GraduationCapIcon,
  capabilities: [
  'Auto-tracks license renewals & CEU credits',
  'Skills progression & career pathway milestones',
  'Automated renewal reminders & compliance alerts']

},
{
  id: 'trade-hero',
  name: 'Trade Hero',
  tagline: 'Recognition & gamification engine for field workers',
  color: 'from-amber-400 to-orange-600',
  bg: 'bg-amber-500/10',
  border: 'border-amber-500/30',
  text: 'text-amber-400',
  Icon: TrophyIcon,
  capabilities: [
  'Points, badges & performance leaderboards',
  'Peer recognition tied to real outcomes',
  'Rewards redeemable for tangible benefits']

},
{
  id: 'field-service',
  name: 'Field Service Embodied',
  tagline: 'AI-embodied digital twin for every field technician',
  color: 'from-violet-400 to-purple-600',
  bg: 'bg-violet-500/10',
  border: 'border-violet-500/30',
  text: 'text-violet-400',
  Icon: BotIcon,
  capabilities: [
  'Digital twin of technician workflow & knowledge base',
  'Full customer history loaded before every job',
  'Always-on AI co-pilot for first-time fix rates']

}];

const userStories = [
{
  id: 'marcus',
  name: 'Marcus Webb',
  title: 'Owner & Operations Director',
  company: 'Webb Distribution LLC',
  industry: 'Warehousing',
  IndustryIcon: PackageIcon,
  industryColor: 'text-indigo-400',
  initials: 'MW',
  avatarGradient: 'from-indigo-500 to-indigo-700',
  toolsUsed: ['Trade Hero', 'Trade Wellness'],
  toolColors: [
  'text-amber-400 bg-amber-500/20 border-amber-500/30',
  'text-emerald-400 bg-emerald-500/20 border-emerald-500/30'],

  quote:
  "My crew of 45 had zero visibility into who was burning out. Trade Wellness flagged 3 workers showing fatigue patterns before we had an incident. Trade Hero's leaderboard turned our slowest shift into a competition — pick accuracy went up 22% in 2 weeks. These aren't add-ons. They're baked in.",
  metrics: [
  {
    label: '+22% pick accuracy',
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  },
  {
    label: '3 safety incidents prevented',
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
  }]

},
{
  id: 'donna',
  name: 'Donna Reyes',
  title: 'Owner & Service Manager',
  company: 'Reyes Comfort Systems',
  industry: 'HVAC Trades',
  IndustryIcon: WrenchIcon,
  industryColor: 'text-orange-400',
  initials: 'DR',
  avatarGradient: 'from-orange-500 to-orange-700',
  toolsUsed: ['Trade Pro', 'Field Service Embodied'],
  toolColors: [
  'text-blue-400 bg-blue-500/20 border-blue-500/30',
  'text-violet-400 bg-violet-500/20 border-violet-500/30'],

  quote:
  "I had 2 techs whose EPA certifications lapsed — I didn't even know until Trade Pro flagged it. Now every renewal is automated. And Field Service Embodied? It's like each tech has a senior advisor in their ear. First-time fix rate went from 71% to 94% in 60 days.",
  metrics: [
  {
    label: '94% first-time fix rate',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    label: '0 lapsed certifications',
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  }]

},
{
  id: 'ray',
  name: 'Ray Kowalski',
  title: 'Owner & Fleet Manager',
  company: 'Kowalski Freight Inc.',
  industry: 'Logistics',
  IndustryIcon: TruckIcon,
  industryColor: 'text-blue-400',
  initials: 'RK',
  avatarGradient: 'from-blue-500 to-blue-700',
  toolsUsed: ['Trade Hero', 'Field Service Embodied'],
  toolColors: [
  'text-amber-400 bg-amber-500/20 border-amber-500/30',
  'text-violet-400 bg-violet-500/20 border-violet-500/30'],

  quote:
  'Driver retention was killing us — 60% annual turnover. Trade Hero gave drivers something to work toward: points, rankings, real rewards. Turnover dropped to 28% in 6 months. Field Service Embodied means every driver has the full route history and customer preferences loaded before they even start the truck.',
  metrics: [
  {
    label: 'Turnover 60% → 28%',
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
  },
  {
    label: 'Customer satisfaction +41%',
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  }]

}];

export function ScreenIndustryTools() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white">
            Industry Performance Tools
          </h2>
          <p className="text-sm text-slate-400">
            Pre-integrated suite · Zero setup · Immediate value
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 flex-shrink-0">
          <motion.span
            animate={{
              opacity: [1, 0.2, 1]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity
            }}
            className="w-2 h-2 rounded-full bg-green-400 inline-block" />

          <span className="text-xs font-bold text-green-400">
            All Systems Active
          </span>
        </div>
      </div>

      {/* PRE-INTEGRATED SUITE CALLOUT */}
      <motion.div
        initial={{
          opacity: 0,
          y: 16
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.4
        }}
        className="relative rounded-2xl border border-orange-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 overflow-hidden">

        {/* Subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

        <div className="relative p-5">
          {/* Suite badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-black px-3 py-1.5 rounded-full">
              <ZapIcon className="w-3 h-3" />
              PRE-INTEGRATED SUITE
            </span>
            <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold px-3 py-1 rounded-full">
              <ShieldCheckIcon className="w-3 h-3" />
              Built In, Not Bolted On
            </span>
          </div>

          <h3 className="text-lg font-black text-white mb-1">
            Industry Performance Tools
          </h3>
          <p className="text-sm text-slate-400 mb-5">
            Four specialized platforms pre-wired into every Catapult APEX
            deployment. Zero setup. Immediate value.
          </p>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {industryTools.map((tool, i) => {
              const { Icon } = tool;
              return (
                <motion.div
                  key={tool.id}
                  initial={{
                    opacity: 0,
                    y: 12
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.35
                  }}
                  className={`${tool.bg} border ${tool.border} rounded-xl p-4`}>

                  {/* Tool header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>

                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-white">
                          {tool.name}
                        </p>
                        <p className="text-xs text-slate-400 leading-tight mt-0.5">
                          {tool.tagline}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Capabilities */}
                  <div className="space-y-1.5 mb-3">
                    {tool.capabilities.map((cap, ci) =>
                    <div
                      key={ci}
                      className="flex items-start gap-2 text-xs text-slate-300">

                        <CheckCircleIcon
                        className={`w-3.5 h-3.5 ${tool.text} flex-shrink-0 mt-0.5`} />

                        <span>{cap}</span>
                      </div>
                    )}
                  </div>

                  {/* Status badges */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                    <span className="inline-flex items-center gap-1.5 bg-green-500/20 border border-green-500/30 text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full">
                      <motion.span
                        animate={{
                          opacity: [1, 0.3, 1]
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          delay: i * 0.3
                        }}
                        className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />

                      PRE-INTEGRATED
                    </span>
                    <span className={`text-[10px] font-bold ${tool.text}`}>
                      Active
                    </span>
                  </div>
                </motion.div>);

            })}
          </div>
        </div>
      </motion.div>

      {/* User Stories Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <QuoteIcon className="w-4 h-4 text-orange-400" />
            <h3 className="text-base font-black text-white">
              APEX User Stories
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Real results from trades & field service operators
          </span>
        </div>

        <div className="space-y-3">
          {userStories.map((story, i) => {
            const { IndustryIcon } = story;
            return (
              <motion.div
                key={story.id}
                initial={{
                  opacity: 0,
                  x: -12
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.3 + i * 0.1,
                  duration: 0.35
                }}
                className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

                {/* Story header */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Avatar */}
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${story.avatarGradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                    <span className="text-white font-black text-sm">
                      {story.initials}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-black text-white">
                          {story.name}
                        </p>
                        <p className="text-xs text-slate-400">{story.title}</p>
                        <p className="text-xs font-bold text-slate-300">
                          {story.company}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 ${story.industryColor} flex-shrink-0`}>

                        <IndustryIcon className="w-2.5 h-2.5" />
                        {story.industry}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <div className="flex items-start gap-2 mb-3">
                  <QuoteIcon className="w-4 h-4 text-orange-500/60 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>

                {/* Metrics + Tools */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                  {story.metrics.map((metric, mi) =>
                  <span
                    key={mi}
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${metric.color}`}>

                      {metric.label}
                    </span>
                  )}
                  {story.toolsUsed.map((tool, ti) =>
                  <span
                    key={ti}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${story.toolColors[ti]}`}>

                      {tool}
                    </span>
                  )}
                </div>
              </motion.div>);

          })}
        </div>
      </div>

      {/* Bottom integration summary */}
      <motion.div
        initial={{
          opacity: 0,
          y: 12
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.7,
          duration: 0.4
        }}
        className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 rounded-2xl p-4">

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-black text-white">
              All 4 Tools. Zero Extra Cost.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Pre-integrated into every APEX deployment. No implementation fees.
              No data silos.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="text-center">
              <p className="text-xl font-black text-orange-400">4</p>
              <p className="text-[10px] text-slate-500">Platforms</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-green-400">0</p>
              <p className="text-[10px] text-slate-500">Setup Days</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-blue-400">∞</p>
              <p className="text-[10px] text-slate-500">Value</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>);

}