import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BotIcon,
  UsersIcon,
  MailIcon,
  MessageSquareIcon,
  ZapIcon,
  CheckCircleIcon,
  PlayIcon,
  PauseIcon,
  PlusIcon,
  TargetIcon,
  MegaphoneIcon } from
'lucide-react';
type GrowthTab = 'sales' | 'marketing' | 'onboarding';
const salesBots = [
{
  id: 'outreach',
  name: 'Cold Outreach Bot',
  agent: 'CSO Sage',
  agentColor: 'from-orange-400 to-orange-600',
  agentBg: 'bg-orange-500/20',
  agentText: 'text-orange-400',
  status: 'active',
  stats: {
    sent: 847,
    opened: 312,
    replied: 89,
    meetings: 23
  },
  sequence: [
  'Day 1: Personalized intro email',
  'Day 3: LinkedIn connection',
  'Day 7: Follow-up email',
  'Day 14: Phone call script',
  'Day 21: Final value email']

},
{
  id: 'retention',
  name: 'At-Risk Account Bot',
  agent: 'CSO Sage',
  agentColor: 'from-orange-400 to-orange-600',
  agentBg: 'bg-orange-500/20',
  agentText: 'text-orange-400',
  status: 'active',
  stats: {
    monitored: 156,
    flagged: 12,
    contacted: 9,
    saved: 7
  },
  sequence: [
  'Usage drop detected → alert',
  'Day 1: Check-in email from CSO',
  'Day 3: Value reminder + case study',
  'Day 7: Executive call offer',
  'Day 14: Retention offer']

},
{
  id: 'upsell',
  name: 'Upsell & Expansion Bot',
  agent: 'CSO Sage',
  agentColor: 'from-orange-400 to-orange-600',
  agentBg: 'bg-orange-500/20',
  agentText: 'text-orange-400',
  status: 'paused',
  stats: {
    identified: 34,
    pitched: 18,
    converted: 6,
    revenue: 28400
  },
  sequence: [
  'Identify expansion signals',
  'Personalized upgrade proposal',
  'ROI calculator sent',
  'Demo scheduled',
  'Contract upgrade']

}];

const marketingCampaigns = [
{
  id: 'email',
  name: 'Weekly ROI Newsletter',
  agent: 'CMO Maya',
  agentColor: 'from-pink-400 to-pink-600',
  agentBg: 'bg-pink-500/20',
  agentText: 'text-pink-400',
  channel: 'Email',
  channelIcon: MailIcon,
  status: 'active',
  reach: 4820,
  openRate: '38%',
  clickRate: '12%',
  leads: 47
},
{
  id: 'social',
  name: 'LinkedIn Thought Leadership',
  agent: 'CMO Maya',
  agentColor: 'from-pink-400 to-pink-600',
  agentBg: 'bg-pink-500/20',
  agentText: 'text-pink-400',
  channel: 'Social',
  channelIcon: MegaphoneIcon,
  status: 'active',
  reach: 12400,
  openRate: '4.2%',
  clickRate: '1.8%',
  leads: 31
},
{
  id: 'retargeting',
  name: 'Q2 Retargeting Campaign',
  agent: 'CMO Maya',
  agentColor: 'from-pink-400 to-pink-600',
  agentBg: 'bg-pink-500/20',
  agentText: 'text-pink-400',
  channel: 'Ads',
  channelIcon: TargetIcon,
  status: 'active',
  reach: 8200,
  openRate: '2.1%',
  clickRate: '0.9%',
  leads: 18
},
{
  id: 'sms',
  name: 'SMS Follow-Up Sequences',
  agent: 'CMO Maya',
  agentColor: 'from-pink-400 to-pink-600',
  agentBg: 'bg-pink-500/20',
  agentText: 'text-pink-400',
  channel: 'SMS',
  channelIcon: MessageSquareIcon,
  status: 'paused',
  reach: 1240,
  openRate: '94%',
  clickRate: '18%',
  leads: 12
}];

const onboardingSteps = [
{
  step: 1,
  title: 'Welcome & Account Setup',
  agent: 'COO Orion',
  agentColor: 'from-green-400 to-green-600',
  agentBg: 'bg-green-500/20',
  agentText: 'text-green-400',
  duration: 'Day 1',
  tasks: [
  'Send welcome email with login credentials',
  'Schedule kickoff call',
  'Configure industry frame',
  'Set approval thresholds'],

  status: 'complete'
},
{
  step: 2,
  title: 'AI Team Deployment',
  agent: 'CTO Theo',
  agentColor: 'from-purple-400 to-purple-600',
  agentBg: 'bg-purple-500/20',
  agentText: 'text-purple-400',
  duration: 'Day 1–2',
  tasks: [
  'Deploy selected AI executives',
  'Connect integrations (QuickBooks, Salesforce)',
  'Run first decision cycle',
  'Validate data connections'],

  status: 'complete'
},
{
  step: 3,
  title: 'First Week Check-In',
  agent: 'CEO Aria',
  agentColor: 'from-amber-400 to-amber-600',
  agentBg: 'bg-amber-500/20',
  agentText: 'text-amber-400',
  duration: 'Day 7',
  tasks: [
  'Review first week ROI report',
  'Adjust auto-approval thresholds',
  'Add additional executives if needed',
  'Collect initial feedback'],

  status: 'active'
},
{
  step: 4,
  title: '30-Day Performance Review',
  agent: 'CFO Felix',
  agentColor: 'from-blue-400 to-blue-600',
  agentBg: 'bg-blue-500/20',
  agentText: 'text-blue-400',
  duration: 'Day 30',
  tasks: [
  'Full ROI analysis & benchmarking',
  'Upgrade recommendation (if applicable)',
  'Industry benchmark comparison',
  'Success story documentation'],

  status: 'upcoming'
},
{
  step: 5,
  title: 'Expansion & Optimization',
  agent: 'CEO Aria',
  agentColor: 'from-amber-400 to-amber-600',
  agentBg: 'bg-amber-500/20',
  agentText: 'text-amber-400',
  duration: 'Day 60+',
  tasks: [
  'Add AI employee tier agents',
  'Enable advanced automation',
  'Referral program activation',
  'Case study creation'],

  status: 'upcoming'
}];

export function ScreenGrowth() {
  const [tab, setTab] = useState<GrowthTab>('sales');
  const [botStates, setBotStates] = useState<Record<string, boolean>>({
    outreach: true,
    retention: true,
    upsell: false
  });
  const toggleBot = (id: string) => {
    setBotStates((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Growth & Sales</h2>
          <p className="text-sm text-slate-400">
            AI-powered sales bots, marketing automation & client onboarding
          </p>
        </div>
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
          <PlusIcon className="w-4 h-4" /> New Bot
        </button>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Pipeline Value</p>
          <p className="text-2xl font-black text-green-400">$284K</p>
          <p className="text-xs text-slate-500 mt-0.5">+18% this month</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Active Bots</p>
          <p className="text-2xl font-black text-orange-400">5</p>
          <p className="text-xs text-slate-500 mt-0.5">2 paused</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Leads This Month</p>
          <p className="text-2xl font-black text-blue-400">108</p>
          <p className="text-xs text-slate-500 mt-0.5">23 meetings booked</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs text-slate-500 mb-1">Clients Onboarding</p>
          <p className="text-2xl font-black text-purple-400">12</p>
          <p className="text-xs text-slate-500 mt-0.5">3 in week 1</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
        {(['sales', 'marketing', 'onboarding'] as GrowthTab[]).map((t) =>
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all capitalize ${tab === t ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

            {t === 'sales' ?
          '🤖 Sales Bots' :
          t === 'marketing' ?
          '📣 Marketing' :
          '🚀 Onboarding'}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Sales Bots */}
        {tab === 'sales' &&
        <motion.div
          key="sales"
          initial={{
            opacity: 0,
            y: 8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="space-y-3">

            {salesBots.map((bot, i) => {
            const isActive = botStates[bot.id];
            return (
              <motion.div
                key={bot.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i * 0.07
                }}
                className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                      className={`w-10 h-10 bg-gradient-to-br ${bot.agentColor} rounded-xl flex items-center justify-center`}>

                        <BotIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {bot.name}
                        </p>
                        <span className={`text-xs font-bold ${bot.agentText}`}>
                          {bot.agent}
                        </span>
                      </div>
                    </div>
                    <button
                    onClick={() => toggleBot(bot.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-colors ${isActive ? 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-green-500/20 hover:border-green-500/30 hover:text-green-400'}`}>

                      {isActive ?
                    <>
                          <PauseIcon className="w-3 h-3" /> Active
                        </> :

                    <>
                          <PlayIcon className="w-3 h-3" /> Paused
                        </>
                    }
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {Object.entries(bot.stats).map(([key, val]) =>
                  <div
                    key={key}
                    className="text-center bg-slate-800/50 rounded-lg p-2">

                        <p className="text-sm font-black text-white">
                          {typeof val === 'number' && val > 999 ?
                      `$${(val / 1000).toFixed(0)}K` :
                      val}
                        </p>
                        <p className="text-xs text-slate-500 capitalize">
                          {key}
                        </p>
                      </div>
                  )}
                  </div>

                  {/* Sequence */}
                  <div className="space-y-1">
                    {bot.sequence.map((step, si) =>
                  <div
                    key={si}
                    className="flex items-center gap-2 text-xs text-slate-400">

                        <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black ${si < 2 ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-600'}`}>

                          {si < 2 ? '✓' : si + 1}
                        </div>
                        {step}
                      </div>
                  )}
                  </div>
                </motion.div>);

          })}
          </motion.div>
        }

        {/* Marketing */}
        {tab === 'marketing' &&
        <motion.div
          key="marketing"
          initial={{
            opacity: 0,
            y: 8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="space-y-3">

            {marketingCampaigns.map((campaign, i) => {
            const ChannelIcon = campaign.channelIcon;
            return (
              <motion.div
                key={campaign.id}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: i * 0.07
                }}
                className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                      className={`w-10 h-10 bg-gradient-to-br ${campaign.agentColor} rounded-xl flex items-center justify-center`}>

                        <ChannelIcon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {campaign.name}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                          className={`text-xs font-bold ${campaign.agentText}`}>

                            {campaign.agent}
                          </span>
                          <span className="text-xs text-slate-600">·</span>
                          <span className="text-xs text-slate-500">
                            {campaign.channel}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${campaign.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-500'}`}>

                      {campaign.status === 'active' ? '● Active' : '⏸ Paused'}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center bg-slate-800/50 rounded-lg p-2">
                      <p className="text-sm font-black text-white">
                        {campaign.reach.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">Reach</p>
                    </div>
                    <div className="text-center bg-slate-800/50 rounded-lg p-2">
                      <p className="text-sm font-black text-blue-400">
                        {campaign.openRate}
                      </p>
                      <p className="text-xs text-slate-500">Open</p>
                    </div>
                    <div className="text-center bg-slate-800/50 rounded-lg p-2">
                      <p className="text-sm font-black text-orange-400">
                        {campaign.clickRate}
                      </p>
                      <p className="text-xs text-slate-500">Click</p>
                    </div>
                    <div className="text-center bg-slate-800/50 rounded-lg p-2">
                      <p className="text-sm font-black text-green-400">
                        {campaign.leads}
                      </p>
                      <p className="text-xs text-slate-500">Leads</p>
                    </div>
                  </div>
                </motion.div>);

          })}
          </motion.div>
        }

        {/* Onboarding */}
        {tab === 'onboarding' &&
        <motion.div
          key="onboarding"
          initial={{
            opacity: 0,
            y: 8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.2
          }}
          className="space-y-3">

            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 mb-2">
              <p className="text-sm font-bold text-white mb-1">
                New Client Onboarding Workflow
              </p>
              <p className="text-xs text-slate-400">
                Fully automated by your AI team · 12 clients currently in flow
              </p>
            </div>

            {onboardingSteps.map((step, i) =>
          <motion.div
            key={step.step}
            initial={{
              opacity: 0,
              x: -10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.08
            }}
            className={`bg-slate-900 border rounded-2xl p-4 ${step.status === 'active' ? 'border-orange-500/40' : step.status === 'complete' ? 'border-green-500/30' : 'border-slate-700/50'}`}>

                <div className="flex items-start gap-3">
                  <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black ${step.status === 'complete' ? 'bg-green-500/20 text-green-400' : step.status === 'active' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-600'}`}>

                    {step.status === 'complete' ? '✓' : step.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-white">
                        {step.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">
                          {step.duration}
                        </span>
                        <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${step.status === 'complete' ? 'bg-green-500/20 text-green-400' : step.status === 'active' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-500'}`}>

                          {step.status === 'complete' ?
                      'Done' :
                      step.status === 'active' ?
                      'In Progress' :
                      'Upcoming'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div
                    className={`w-5 h-5 bg-gradient-to-br ${step.agentColor} rounded flex items-center justify-center`}>

                        <span className="text-white font-black text-[9px]">
                          {step.agent.split(' ')[0][0]}
                        </span>
                      </div>
                      <span className={`text-xs font-bold ${step.agentText}`}>
                        {step.agent}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {step.tasks.map((task, ti) =>
                  <div
                    key={ti}
                    className="flex items-center gap-2 text-xs text-slate-400">

                          <CheckCircleIcon
                      className={`w-3 h-3 flex-shrink-0 ${step.status === 'complete' ? 'text-green-400' : step.status === 'active' && ti < 2 ? 'text-orange-400' : 'text-slate-700'}`} />

                          {task}
                        </div>
                  )}
                    </div>
                  </div>
                </div>
              </motion.div>
          )}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}