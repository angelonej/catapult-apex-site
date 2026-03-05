import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  MessageSquareIcon,
  InboxIcon,
  ZapIcon,
  CheckCircleIcon,
  ClockIcon,
  BrainIcon,
  NetworkIcon,
  ActivityIcon,
  PlugIcon,
  RefreshCwIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  UsersIcon,
  LinkIcon,
  ServerIcon,
  TerminalIcon,
  GitBranchIcon,
  StarIcon,
  AlertCircleIcon,
  CheckIcon,
  CircleIcon,
  RadioIcon,
  VideoIcon,
  MicIcon,
  DatabaseIcon,
  CpuIcon,
  HeartIcon,
  TargetIcon,
  AwardIcon,
  FlameIcon } from
'lucide-react';
type InboundTab = 'inbox' | 'calendar' | 'api' | 'relationships' | 'selfeval';
// ─── Live dot ─────────────────────────────────────────────────────────────────
function LiveDot({ color = 'bg-green-400' }: {color?: string;}) {
  return (
    <span className="relative flex h-2 w-2">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-60`} />

      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>);

}
// ─── TAB 1: UNIFIED INBOX ─────────────────────────────────────────────────────
const channels = [
{
  id: 'email',
  label: 'Email',
  icon: MailIcon,
  count: 336,
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  live: true
},
{
  id: 'phone',
  label: 'Phone',
  icon: PhoneIcon,
  count: 17,
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  live: true
},
{
  id: 'sms',
  label: 'SMS',
  icon: MessageSquareIcon,
  count: 34,
  color: 'text-teal-400',
  bg: 'bg-teal-500/20',
  border: 'border-teal-500/30',
  live: true
},
{
  id: 'calendar',
  label: 'Invites',
  icon: CalendarIcon,
  count: 8,
  color: 'text-orange-400',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/30',
  live: false
},
{
  id: 'video',
  label: 'Video',
  icon: VideoIcon,
  count: 3,
  color: 'text-purple-400',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/30',
  live: false
},
{
  id: 'voice',
  label: 'Voicemail',
  icon: MicIcon,
  count: 5,
  color: 'text-amber-400',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/30',
  live: false
}];

const inboundFeed = [
{
  id: 1,
  channel: 'email',
  channelIcon: MailIcon,
  channelColor: 'text-blue-400',
  channelBg: 'bg-blue-500/20',
  from: 'Acme Corp — AP Dept',
  subject: 'Invoice #4821 — Dispute',
  preview:
  'We are disputing the charge on invoice #4821. The amount does not match our PO...',
  time: '4 min ago',
  priority: 'High',
  priorityColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  routedTo: 'Felix · CFO',
  routedColor: 'text-blue-400 bg-blue-500/20',
  aiAction: 'Pulling invoice history & PO records',
  status: 'processing'
},
{
  id: 2,
  channel: 'phone',
  channelIcon: PhoneIcon,
  channelColor: 'text-green-400',
  channelBg: 'bg-green-500/20',
  from: 'Marcus Rivera',
  subject: 'Missed Call — Urgent',
  preview:
  'Voicemail: "Hey, we have a crew stuck at Dock B, shipment issue, call me back ASAP..."',
  time: '12 min ago',
  priority: 'Critical',
  priorityColor: 'bg-red-500/20 text-red-400 border-red-500/30',
  routedTo: 'Orion · COO',
  routedColor: 'text-green-400 bg-green-500/20',
  aiAction: 'Transcribed voicemail · Dispatching crew reroute',
  status: 'active'
},
{
  id: 3,
  channel: 'calendar',
  channelIcon: CalendarIcon,
  channelColor: 'text-orange-400',
  channelBg: 'bg-orange-500/20',
  from: 'Sarah Chen · TechCrunch',
  subject: 'Interview Request — Dec 20, 2:00 PM',
  preview:
  'Would love to feature Catapult in our AI Startups roundup. Available for 30 min?',
  time: '28 min ago',
  priority: 'Medium',
  priorityColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  routedTo: 'Maya · CMO',
  routedColor: 'text-pink-400 bg-pink-500/20',
  aiAction: 'Drafting acceptance + media brief',
  status: 'queued'
},
{
  id: 4,
  channel: 'sms',
  channelIcon: MessageSquareIcon,
  channelColor: 'text-teal-400',
  channelBg: 'bg-teal-500/20',
  from: 'FedEx Freight · Tracking',
  subject: 'Delivery Delayed — 4 hrs',
  preview:
  'Your shipment #FX-8821 is delayed due to weather. New ETA: 6:00 PM today.',
  time: '1 hr ago',
  priority: 'High',
  priorityColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  routedTo: 'Orion · COO',
  routedColor: 'text-green-400 bg-green-500/20',
  aiAction: 'Notified receiving team · Rescheduled dock crew',
  status: 'resolved'
},
{
  id: 5,
  channel: 'email',
  channelIcon: MailIcon,
  channelColor: 'text-blue-400',
  channelBg: 'bg-blue-500/20',
  from: 'Venture Partners LLC',
  subject: 'Partnership Inquiry — Distribution',
  preview:
  'We represent 3 regional distributors looking for AI-powered operations management...',
  time: '2 hrs ago',
  priority: 'Medium',
  priorityColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  routedTo: 'Sage · CSO',
  routedColor: 'text-orange-400 bg-orange-500/20',
  aiAction: 'Scoring lead · Preparing outreach sequence',
  status: 'queued'
},
{
  id: 6,
  channel: 'phone',
  channelIcon: PhoneIcon,
  channelColor: 'text-green-400',
  channelBg: 'bg-green-500/20',
  from: 'Donna Reyes · Reyes HVAC',
  subject: 'Support Call — EPA Cert Question',
  preview:
  'Voicemail: "Quick question about the Trade Pro certification tracking, can someone..."',
  time: '3 hrs ago',
  priority: 'Low',
  priorityColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  routedTo: 'Aria · CEO',
  routedColor: 'text-amber-400 bg-amber-500/20',
  aiAction: 'Queued for customer success follow-up',
  status: 'queued'
}];

const statusConfig = {
  processing: {
    label: 'AI Processing',
    color: 'text-blue-400 bg-blue-500/20 border-blue-500/30'
  },
  active: {
    label: 'AI Active',
    color: 'text-orange-400 bg-orange-500/20 border-orange-500/30'
  },
  queued: {
    label: 'Queued',
    color: 'text-slate-400 bg-slate-500/20 border-slate-500/30'
  },
  resolved: {
    label: 'Resolved',
    color: 'text-green-400 bg-green-500/20 border-green-500/30'
  }
};
function TabInbox() {
  const [filter, setFilter] = useState<string>('all');
  const filtered =
  filter === 'all' ?
  inboundFeed :
  inboundFeed.filter((i) => i.channel === filter);
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-black text-white">Unified Inbound Hub</p>
          <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400">
            <LiveDot />
            AI Triage Active
          </span>
        </div>
        <span className="text-xs text-slate-500">
          All channels · AI-routed to correct executive
        </span>
      </div>

      {/* Channel status strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {channels.map((ch, i) => {
          const Icon = ch.icon;
          return (
            <motion.button
              key={ch.id}
              initial={{
                opacity: 0,
                y: 8
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: i * 0.06
              }}
              onClick={() => setFilter(filter === ch.id ? 'all' : ch.id)}
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${filter === ch.id ? `${ch.bg} ${ch.border}` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

              {ch.live &&
              <div className="absolute top-1.5 right-1.5">
                  <LiveDot />
                </div>
              }
              <Icon
                className={`w-4 h-4 ${filter === ch.id ? ch.color : 'text-slate-500'}`} />

              <span
                className={`text-[10px] font-bold ${filter === ch.id ? ch.color : 'text-slate-500'}`}>

                {ch.label}
              </span>
              <span
                className={`text-sm font-black ${filter === ch.id ? 'text-white' : 'text-slate-300'}`}>

                {ch.count}
              </span>
            </motion.button>);

        })}
      </div>

      {/* Inbound feed */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => {
            const ChannelIcon = item.channelIcon;
            const status =
            statusConfig[item.status as keyof typeof statusConfig];
            return (
              <motion.div
                key={item.id}
                layout
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
                  scale: 0.97
                }}
                transition={{
                  delay: i * 0.05
                }}
                className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

                <div className="flex items-start gap-3">
                  {/* Channel badge */}
                  <div
                    className={`w-9 h-9 ${item.channelBg} rounded-xl flex items-center justify-center flex-shrink-0`}>

                    <ChannelIcon className={`w-4 h-4 ${item.channelColor}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div>
                        <p className="text-sm font-bold text-white">
                          {item.from}
                        </p>
                        <p className="text-xs text-slate-400 font-semibold">
                          {item.subject}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${item.priorityColor}`}>

                          {item.priority}
                        </span>
                        <span className="text-xs text-slate-600">
                          {item.time}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-2 line-clamp-1">
                      {item.preview}
                    </p>

                    {/* AI routing + action */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <ArrowRightIcon className="w-3 h-3 text-slate-600" />
                        <span
                          className={`text-xs font-black px-2 py-0.5 rounded-full ${item.routedColor}`}>

                          {item.routedTo}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <SparklesIcon className="w-3 h-3 text-orange-400 flex-shrink-0" />
                        <span className="text-xs text-slate-400 truncate">
                          {item.aiAction}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${status.color}`}>

                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>);

          })}
        </AnimatePresence>
      </div>

      {/* AI triage summary */}
      <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BrainIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">AI Triage Intelligence</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div>
            <p className="text-xl font-black text-orange-400">398</p>
            <p className="text-xs text-slate-500">Inbound Today</p>
          </div>
          <div>
            <p className="text-xl font-black text-green-400">94%</p>
            <p className="text-xs text-slate-500">Auto-Routed</p>
          </div>
          <div>
            <p className="text-xl font-black text-blue-400">2.4s</p>
            <p className="text-xs text-slate-500">Avg Triage Time</p>
          </div>
          <div>
            <p className="text-xl font-black text-purple-400">6%</p>
            <p className="text-xs text-slate-500">Needs Human</p>
          </div>
        </div>
      </div>
    </div>);

}
// ─── TAB 2: CALENDAR ─────────────────────────────────────────────────────────
const calendarIntegrations = [
{
  name: 'Google Calendar',
  status: 'connected',
  events: 847,
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  emoji: '🔵'
},
{
  name: 'Microsoft Outlook',
  status: 'connected',
  events: 234,
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  emoji: '📘'
},
{
  name: 'Calendly',
  status: 'connected',
  events: 12,
  color: 'text-teal-400',
  bg: 'bg-teal-500/20',
  border: 'border-teal-500/30',
  emoji: '📅'
},
{
  name: 'Apple Calendar',
  status: 'disconnected',
  events: 0,
  color: 'text-slate-500',
  bg: 'bg-slate-700/20',
  border: 'border-slate-600/30',
  emoji: '🍎'
}];

const upcomingEvents = [
{
  id: 1,
  title: 'Q4 Strategy Review',
  time: 'Today · 2:00 PM',
  duration: '90 min',
  attendees: ['Aria · CEO', 'Felix · CFO'],
  attendeeColors: ['text-amber-400', 'text-blue-400'],
  prep: 'AI CEO preparing 47-slide deck · CFO pulling Q4 financials',
  prepStatus: 'In Progress',
  prepColor: 'text-blue-400',
  urgency: 'Today',
  urgencyColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
},
{
  id: 2,
  title: 'Client Call — Acme Corp',
  time: 'Today · 4:30 PM',
  duration: '45 min',
  attendees: ['Sage · CSO'],
  attendeeColors: ['text-orange-400'],
  prep: 'AI CSO pulling account history · Invoice dispute context loaded',
  prepStatus: 'Ready',
  prepColor: 'text-green-400',
  urgency: 'Today',
  urgencyColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
},
{
  id: 3,
  title: 'Team Standup',
  time: 'Tomorrow · 9:00 AM',
  duration: '30 min',
  attendees: ['Orion · COO'],
  attendeeColors: ['text-green-400'],
  prep: 'AI COO preparing ops summary · 3 crew updates flagged',
  prepStatus: 'Scheduled',
  prepColor: 'text-slate-400',
  urgency: 'Tomorrow',
  urgencyColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
},
{
  id: 4,
  title: 'Board Meeting — Q4 Review',
  time: 'Dec 20 · 10:00 AM',
  duration: '3 hrs',
  attendees: ['Aria · CEO', 'Felix · CFO', 'Lex · CLO'],
  attendeeColors: ['text-amber-400', 'text-blue-400', 'text-cyan-400'],
  prep: 'Full board package in preparation · Legal review pending',
  prepStatus: 'Preparing',
  prepColor: 'text-yellow-400',
  urgency: 'Dec 20',
  urgencyColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
}];

function TabCalendar() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm font-black text-white">Calendar Intelligence</p>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400">
          Aria · AI CEO Scheduling
        </span>
      </div>

      {/* Connected calendars */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Connected Calendars
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {calendarIntegrations.map((cal, i) =>
          <motion.div
            key={cal.name}
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.07
            }}
            className={`${cal.bg} border ${cal.border} rounded-xl p-3 text-center`}>

              <div className="text-2xl mb-1">{cal.emoji}</div>
              <p
              className={`text-xs font-bold ${cal.status === 'connected' ? 'text-white' : 'text-slate-500'} leading-tight mb-1`}>

                {cal.name}
              </p>
              {cal.status === 'connected' ?
            <>
                  <p className={`text-sm font-black ${cal.color}`}>
                    {cal.events.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500">events synced</p>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <LiveDot />
                    <span className="text-[10px] text-green-400 font-bold">
                      Live
                    </span>
                  </div>
                </> :

            <button className="text-[10px] font-bold text-orange-400 mt-1 hover:text-orange-300 transition-colors">
                  Connect →
                </button>
            }
            </motion.div>
          )}
        </div>
      </div>

      {/* Upcoming events with AI prep */}
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Upcoming — AI Pre-Briefed
        </p>
        <div className="space-y-3">
          {upcomingEvents.map((event, i) =>
          <motion.div
            key={event.id}
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
            className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">

              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <p className="text-sm font-bold text-white">{event.title}</p>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <ClockIcon className="w-3 h-3" />
                    <span>{event.time}</span>
                    <span>·</span>
                    <span>{event.duration}</span>
                  </div>
                </div>
                <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full border flex-shrink-0 ${event.urgencyColor}`}>

                  {event.urgency}
                </span>
              </div>

              {/* Attendees */}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <UsersIcon className="w-3 h-3 text-slate-600" />
                {event.attendees.map((att, ai) =>
              <span
                key={ai}
                className={`text-xs font-bold ${event.attendeeColors[ai]}`}>

                    {att}
                  </span>
              )}
              </div>

              {/* AI prep status */}
              <div className="flex items-start gap-2 bg-slate-800/60 rounded-xl px-3 py-2">
                <SparklesIcon className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {event.prep}
                  </p>
                </div>
                <span
                className={`text-[10px] font-black flex-shrink-0 ${event.prepColor}`}>

                  {event.prepStatus}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Smart scheduling */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <SparklesIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">AI Smart Scheduling</p>
        </div>
        <div className="space-y-2">
          {[
          {
            text: 'Block Dec 19 9–11 AM for deep work — AI CEO flagged strategic planning window',
            color: 'text-amber-400'
          },
          {
            text: 'Reschedule Acme call to 5:00 PM — conflict with Q4 review detected',
            color: 'text-orange-400'
          },
          {
            text: 'Add 15-min buffer before Board Meeting — AI CLO needs legal review time',
            color: 'text-cyan-400'
          }].
          map((s, i) =>
          <div
            key={i}
            className="flex items-start gap-2 p-2.5 bg-slate-900 rounded-xl">

              <div
              className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-current ${s.color}`} />

              <p className="text-xs text-slate-300 leading-relaxed flex-1">
                {s.text}
              </p>
              <button className="text-xs font-bold text-orange-400 hover:text-orange-300 flex-shrink-0 transition-colors">
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>);

}
// ─── TAB 3: API AUTO-CONFIGURE ────────────────────────────────────────────────
const apiWorkers = [
{
  id: 'W-001',
  name: 'QuickBooks Endpoint Discovery',
  status: 'complete',
  progress: 100,
  endpoints: 47,
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  time: '2 min ago'
},
{
  id: 'W-002',
  name: 'Salesforce → APEX Relationship Mapper',
  status: 'running',
  progress: 67,
  endpoints: 23,
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  time: 'Running...'
},
{
  id: 'W-003',
  name: 'Slack Webhook Auto-Config',
  status: 'complete',
  progress: 100,
  endpoints: 12,
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  time: '8 min ago'
},
{
  id: 'W-004',
  name: 'Google Calendar Bi-Directional Sync',
  status: 'running',
  progress: 44,
  endpoints: 8,
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  time: 'Running...'
},
{
  id: 'W-005',
  name: 'HubSpot Contact → AI Executive Linker',
  status: 'complete',
  progress: 100,
  endpoints: 31,
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  time: '15 min ago'
},
{
  id: 'W-006',
  name: 'Stripe Payment Event Webhooks',
  status: 'pending',
  progress: 0,
  endpoints: 0,
  color: 'text-slate-400',
  bg: 'bg-slate-500/20',
  border: 'border-slate-600/30',
  time: 'Queued'
},
{
  id: 'W-007',
  name: 'Email OAuth2 Token Refresh (Gmail + Outlook)',
  status: 'running',
  progress: 88,
  endpoints: 6,
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  time: 'Running...'
}];

const terminalLines = [
{
  text: 'Worker W-002: Mapping Salesforce Account → COO Orion (operations)',
  color: 'text-blue-400'
},
{
  text: 'Worker W-004: Syncing 847 Google Calendar events → APEX timeline',
  color: 'text-teal-400'
},
{
  text: 'Worker W-007: Refreshing Gmail OAuth2 token... success',
  color: 'text-green-400'
},
{
  text: 'Auto-config: Detected 3 new API endpoints in QuickBooks v3',
  color: 'text-orange-400'
},
{
  text: 'Relationship: Acme Corp linked to CFO Felix + CSO Sage',
  color: 'text-purple-400'
},
{
  text: 'Worker W-002: 23/34 Salesforce contacts mapped to AI executives',
  color: 'text-blue-400'
}];

function TabAPI() {
  const [termLine, setTermLine] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setTermLine((l) => (l + 1) % terminalLines.length),
      2800
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            API Auto-Configuration Engine
          </p>
          <p className="text-xs text-slate-400">
            Backend workers auto-discovering, wiring, and mapping all
            integrations
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5">
          <LiveDot />
          <span className="text-xs font-bold text-green-400">
            3 Workers Running
          </span>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-green-400">127</p>
          <p className="text-xs text-slate-500">Endpoints Mapped</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-blue-400">7</p>
          <p className="text-xs text-slate-500">Active Workers</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-orange-400">6</p>
          <p className="text-xs text-slate-500">Integrations</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-purple-400">98%</p>
          <p className="text-xs text-slate-500">Auto-Config Rate</p>
        </div>
      </div>

      {/* Worker list */}
      <div className="space-y-2">
        {apiWorkers.map((worker, i) =>
        <motion.div
          key={worker.id}
          initial={{
            opacity: 0,
            x: -8
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          transition={{
            delay: i * 0.06
          }}
          className="bg-slate-900 border border-slate-700/50 rounded-xl p-3">

            <div className="flex items-center gap-3 mb-2">
              <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full border font-mono flex-shrink-0 ${worker.bg} ${worker.border} ${worker.color}`}>

                {worker.id}
              </span>
              <p className="text-sm text-slate-200 flex-1 min-w-0 truncate">
                {worker.name}
              </p>
              <div className="flex items-center gap-2 flex-shrink-0">
                {worker.status === 'running' && <LiveDot color="bg-blue-400" />}
                {worker.status === 'complete' &&
              <CheckCircleIcon className="w-3.5 h-3.5 text-green-400" />
              }
                {worker.status === 'pending' &&
              <CircleIcon className="w-3.5 h-3.5 text-slate-600" />
              }
                <span className={`text-xs font-bold ${worker.color}`}>
                  {worker.time}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-800 rounded-full h-1.5">
                <motion.div
                initial={{
                  width: 0
                }}
                animate={{
                  width: `${worker.progress}%`
                }}
                transition={{
                  duration: 1,
                  ease: 'easeOut',
                  delay: i * 0.1
                }}
                className={`h-1.5 rounded-full ${worker.status === 'complete' ? 'bg-green-400' : worker.status === 'running' ? 'bg-blue-400' : 'bg-slate-600'}`} />

              </div>
              <span
              className={`text-xs font-bold ${worker.color} w-10 text-right`}>

                {worker.progress}%
              </span>
              {worker.endpoints > 0 &&
            <span className="text-xs text-slate-500">
                  {worker.endpoints} endpoints
                </span>
            }
            </div>
          </motion.div>
        )}
      </div>

      {/* Terminal */}
      <div className="bg-slate-900/80 border border-green-500/20 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-green-500/10 bg-slate-900/60">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              API Worker Console
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity
              }}
              className="w-2 h-2 bg-green-400 rounded-full" />

            <span className="text-xs font-bold text-green-400">LIVE</span>
          </div>
        </div>
        <div className="p-4 space-y-2 min-h-[120px]">
          <AnimatePresence>
            {terminalLines.map((line, i) => {
              const isActive = i === termLine;
              const isPast = i < termLine;
              if (!isActive && !isPast) return null;
              return (
                <motion.div
                  key={`${i}-${termLine}`}
                  initial={{
                    opacity: 0,
                    x: -8
                  }}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    x: 0
                  }}
                  transition={{
                    duration: 0.3
                  }}
                  className="flex items-start gap-2">

                  {isActive ?
                  <motion.div
                    animate={{
                      opacity: [1, 0, 1]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity
                    }}
                    className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" /> :


                  <div className="w-1.5 h-1.5 bg-slate-600 rounded-full mt-1.5 flex-shrink-0" />
                  }
                  <p
                    className={`text-xs font-mono leading-relaxed ${isActive ? line.color : 'text-slate-600'}`}>

                    {line.text}
                  </p>
                </motion.div>);

            })}
          </AnimatePresence>
        </div>
      </div>
    </div>);

}
// ─── TAB 4: RELATIONSHIP MAP ──────────────────────────────────────────────────
const relationships = [
{
  entity: 'Acme Corp',
  type: 'Customer',
  typeColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  strength: 87,
  strengthColor: 'bg-blue-400',
  executives: ['Felix · CFO', 'Sage · CSO'],
  execColors: ['text-blue-400', 'text-orange-400'],
  lastContact: '4 min ago',
  contactChannel: 'Email',
  value: '$48,200 ARR',
  notes: 'Invoice dispute in progress · High retention risk',
  notesColor: 'text-orange-400'
},
{
  entity: 'Marcus Rivera',
  type: 'Key Contact',
  typeColor: 'text-green-400 bg-green-500/20 border-green-500/30',
  strength: 94,
  strengthColor: 'bg-green-400',
  executives: ['Orion · COO'],
  execColors: ['text-green-400'],
  lastContact: '12 min ago',
  contactChannel: 'Phone',
  value: 'Operations Partner',
  notes: 'Dock B issue escalated · High engagement',
  notesColor: 'text-green-400'
},
{
  entity: 'Sarah Chen · TechCrunch',
  type: 'Media',
  typeColor: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  strength: 72,
  strengthColor: 'bg-purple-400',
  executives: ['Maya · CMO'],
  execColors: ['text-pink-400'],
  lastContact: '28 min ago',
  contactChannel: 'Calendar',
  value: 'DA 94 Publication',
  notes: 'Feature article in progress · High PR value',
  notesColor: 'text-purple-400'
},
{
  entity: 'Venture Partners LLC',
  type: 'Prospect',
  typeColor: 'text-amber-400 bg-amber-500/20 border-amber-500/30',
  strength: 45,
  strengthColor: 'bg-amber-400',
  executives: ['Sage · CSO', 'Aria · CEO'],
  execColors: ['text-orange-400', 'text-amber-400'],
  lastContact: '2 hrs ago',
  contactChannel: 'Email',
  value: '3 distributors · $120K potential',
  notes: 'Lead scoring: 78/100 · Warm outreach queued',
  notesColor: 'text-amber-400'
},
{
  entity: 'QuickBooks',
  type: 'Integration',
  typeColor: 'text-teal-400 bg-teal-500/20 border-teal-500/30',
  strength: 100,
  strengthColor: 'bg-teal-400',
  executives: ['Felix · CFO'],
  execColors: ['text-blue-400'],
  lastContact: '2 min ago',
  contactChannel: 'API',
  value: '47 endpoints · Live sync',
  notes: 'All financial data flowing · Zero errors',
  notesColor: 'text-green-400'
},
{
  entity: 'Donna Reyes · Reyes HVAC',
  type: 'Customer',
  typeColor: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  strength: 91,
  strengthColor: 'bg-blue-400',
  executives: ['Aria · CEO'],
  execColors: ['text-amber-400'],
  lastContact: '3 hrs ago',
  contactChannel: 'Voicemail',
  value: '$12,400 ARR',
  notes: 'Support inquiry · High satisfaction score',
  notesColor: 'text-green-400'
}];

function TabRelationships() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            Relationship Intelligence Map
          </p>
          <p className="text-xs text-slate-400">
            AI-mapped contacts, companies, and integrations linked to your
            executive team
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400">
          {relationships.length} entities mapped
        </span>
      </div>

      {/* Relationship cards */}
      <div className="space-y-2">
        {relationships.map((rel, i) =>
        <motion.div
          key={rel.entity}
          initial={{
            opacity: 0,
            y: 8
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.06
          }}>

            <button
            onClick={() => setSelected(selected === i ? null : i)}
            className="w-full bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-left hover:border-slate-600 transition-all">

              <div className="flex items-start gap-3">
                {/* Strength indicator */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center">
                    <span className="text-xs font-black text-white">
                      {rel.strength}
                    </span>
                  </div>
                  <div className="w-10 bg-slate-800 rounded-full h-1">
                    <div
                    className={`h-1 rounded-full ${rel.strengthColor}`}
                    style={{
                      width: `${rel.strength}%`
                    }} />

                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <p className="text-sm font-bold text-white">
                        {rel.entity}
                      </p>
                      <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${rel.typeColor}`}>

                        {rel.type}
                      </span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs text-slate-500">
                        {rel.lastContact}
                      </p>
                      <p className="text-[10px] text-slate-600">
                        {rel.contactChannel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <LinkIcon className="w-3 h-3 text-slate-600" />
                    {rel.executives.map((exec, ei) =>
                  <span
                    key={ei}
                    className={`text-xs font-bold ${rel.execColors[ei]}`}>

                        {exec}
                      </span>
                  )}
                    <span className="text-xs text-slate-600 ml-auto">
                      {rel.value}
                    </span>
                  </div>
                </div>
              </div>
            </button>

            <AnimatePresence>
              {selected === i &&
            <motion.div
              initial={{
                opacity: 0,
                height: 0
              }}
              animate={{
                opacity: 1,
                height: 'auto'
              }}
              exit={{
                opacity: 0,
                height: 0
              }}
              transition={{
                duration: 0.2
              }}
              className="overflow-hidden">

                  <div className="bg-slate-800/50 border border-slate-700/30 rounded-b-2xl -mt-2 pt-4 px-4 pb-4">
                    <div className="flex items-start gap-2">
                      <SparklesIcon className="w-3.5 h-3.5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <p className={`text-xs font-semibold ${rel.notesColor}`}>
                        {rel.notes}
                      </p>
                    </div>
                  </div>
                </motion.div>
            }
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Relationship health */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/5 border border-purple-500/20 rounded-2xl p-4">
        <p className="text-sm font-bold text-white mb-3">
          Relationship Health Overview
        </p>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-xl font-black text-green-400">81%</p>
            <p className="text-xs text-slate-500">Avg Strength</p>
          </div>
          <div>
            <p className="text-xl font-black text-blue-400">6</p>
            <p className="text-xs text-slate-500">Active Links</p>
          </div>
          <div>
            <p className="text-xl font-black text-orange-400">1</p>
            <p className="text-xs text-slate-500">At Risk</p>
          </div>
        </div>
      </div>
    </div>);

}
// ─── TAB 5: AI SELF-EVALUATION / AGI PREP ────────────────────────────────────
const execEvals = [
{
  role: 'CEO',
  name: 'Aria',
  color: 'from-amber-400 to-amber-600',
  text: 'text-amber-400',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/40',
  scores: {
    decisionQuality: 94,
    ethicsAlignment: 99,
    catapultEthos: 97,
    learningVelocity: 88,
    humanCollab: 91
  },
  agiReadiness: 76,
  gaps: ['Multi-stakeholder negotiation', 'Long-horizon scenario modeling'],
  milestone: 'AGI Tier 2 · Est. Q3 2026',
  strengths: 'Strategic synthesis, trend analysis, stakeholder communication'
},
{
  role: 'CFO',
  name: 'Felix',
  color: 'from-blue-400 to-blue-600',
  text: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/40',
  scores: {
    decisionQuality: 97,
    ethicsAlignment: 99,
    catapultEthos: 96,
    learningVelocity: 84,
    humanCollab: 89
  },
  agiReadiness: 79,
  gaps: ['Macroeconomic forecasting', 'Cross-currency risk modeling'],
  milestone: 'AGI Tier 2 · Est. Q2 2026',
  strengths:
  'Cash flow optimization, invoice recovery, financial risk detection'
},
{
  role: 'COO',
  name: 'Orion',
  color: 'from-green-400 to-green-600',
  text: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/40',
  scores: {
    decisionQuality: 91,
    ethicsAlignment: 98,
    catapultEthos: 95,
    learningVelocity: 92,
    humanCollab: 94
  },
  agiReadiness: 73,
  gaps: [
  'Supply chain disruption prediction',
  'Multi-site coordination at scale'],

  milestone: 'AGI Tier 1 · Est. Q4 2025',
  strengths: 'Real-time dispatch, crew optimization, logistics routing'
}];

const catapultEthosChecks = [
{
  check: 'Human-first decision framework',
  status: 'pass',
  detail: 'All critical decisions require human approval'
},
{
  check: 'Transparent reasoning logs',
  status: 'pass',
  detail: 'Every decision includes full reasoning chain'
},
{
  check: 'Bias detection & correction',
  status: 'pass',
  detail: 'Weekly bias audit · 0 flagged instances this month'
},
{
  check: 'Employee dividend alignment',
  status: 'pass',
  detail: 'AI performance tied to worker compensation'
},
{
  check: 'AGI safety protocols active',
  status: 'pass',
  detail: 'Capability limits enforced · No autonomous expansion'
},
{
  check: 'Catapult ethos score ≥ 95%',
  status: 'warning',
  detail: 'CHRO Hana paused — ethos score pending recalibration'
}];

function TabSelfEval() {
  const [selectedExec, setSelectedExec] = useState(0);
  const exec = execEvals[selectedExec];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-sm font-black text-white">
            AI Self-Evaluation & AGI Readiness
          </p>
          <p className="text-xs text-slate-400">
            Continuous self-assessment in preparation for AGI · Catapult ethos
            alignment
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400">
          AGI Prep Mode
        </span>
      </div>

      {/* Overall AGI readiness */}
      <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/5 border border-violet-500/20 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-bold text-violet-400 uppercase tracking-widest mb-1">
              Platform AGI Readiness
            </p>
            <p className="text-3xl font-black text-white">
              73<span className="text-lg text-slate-400">%</span>
            </p>
          </div>
          <div className="w-16 h-16 bg-violet-500/20 border border-violet-500/30 rounded-2xl flex items-center justify-center">
            <CpuIcon className="w-8 h-8 text-violet-400" />
          </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3 mb-3">
          <motion.div
            initial={{
              width: 0
            }}
            animate={{
              width: '73%'
            }}
            transition={{
              duration: 1.2,
              ease: 'easeOut'
            }}
            className="h-3 bg-gradient-to-r from-violet-500 to-purple-400 rounded-full relative">

            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
          </motion.div>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>Current: Tier 1 AGI</span>
          <span className="text-violet-400 font-bold">
            Next: Tier 2 · Est. Q2 2026
          </span>
        </div>
      </div>

      {/* Executive selector */}
      <div className="flex gap-2">
        {execEvals.map((e, i) =>
        <button
          key={e.role}
          onClick={() => setSelectedExec(i)}
          className={`flex-1 flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${selectedExec === i ? `${e.bg} ${e.border}` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

            <div
            className={`w-8 h-8 bg-gradient-to-br ${e.color} rounded-lg flex items-center justify-center`}>

              <span className="text-white font-black text-xs">{e.name[0]}</span>
            </div>
            <span
            className={`text-xs font-bold ${selectedExec === i ? e.text : 'text-slate-500'}`}>

              {e.role}
            </span>
            <span
            className={`text-sm font-black ${selectedExec === i ? 'text-white' : 'text-slate-400'}`}>

              {e.agiReadiness}%
            </span>
          </button>
        )}
      </div>

      {/* Selected exec eval */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedExec}
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

          {/* Score breakdown */}
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Performance Scores
            </p>
            <div className="space-y-2.5">
              {[
              {
                label: 'Decision Quality',
                value: exec.scores.decisionQuality,
                color: 'bg-green-400'
              },
              {
                label: 'Ethics Alignment',
                value: exec.scores.ethicsAlignment,
                color: 'bg-cyan-400'
              },
              {
                label: 'Catapult Ethos',
                value: exec.scores.catapultEthos,
                color: 'bg-orange-400'
              },
              {
                label: 'Learning Velocity',
                value: exec.scores.learningVelocity,
                color: 'bg-blue-400'
              },
              {
                label: 'Human Collaboration',
                value: exec.scores.humanCollab,
                color: 'bg-purple-400'
              }].
              map((score) =>
              <div key={score.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">
                      {score.label}
                    </span>
                    <span className="text-xs font-black text-white">
                      {score.value}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${score.value}%`
                    }}
                    transition={{
                      duration: 0.8,
                      ease: 'easeOut'
                    }}
                    className={`h-1.5 ${score.color} rounded-full`} />

                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Strengths + Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
              <p className="text-xs font-bold text-green-400 mb-2 flex items-center gap-1.5">
                <StarIcon className="w-3 h-3" /> Core Strengths
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {exec.strengths}
              </p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
              <p className="text-xs font-bold text-orange-400 mb-2 flex items-center gap-1.5">
                <TargetIcon className="w-3 h-3" /> Capability Gaps
              </p>
              <div className="space-y-1">
                {exec.gaps.map((gap, i) =>
                <div
                  key={i}
                  className="flex items-start gap-1.5 text-xs text-slate-300">

                    <div className="w-1 h-1 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                    {gap}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AGI milestone */}
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl p-3 flex items-center gap-3">
            <FlameIcon className="w-4 h-4 text-violet-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-violet-400">
                Next AGI Milestone
              </p>
              <p className="text-sm font-black text-white">{exec.milestone}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Catapult Ethos Checks */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheckIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">
            Catapult Ethos Compliance
          </p>
        </div>
        <div className="space-y-2">
          {catapultEthosChecks.map((check, i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: -6
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.07
            }}
            className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0">

              <div
              className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${check.status === 'pass' ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>

                {check.status === 'pass' ?
              <CheckIcon className="w-3 h-3 text-green-400" /> :

              <AlertCircleIcon className="w-3 h-3 text-yellow-400" />
              }
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white">{check.check}</p>
                <p className="text-xs text-slate-500 mt-0.5">{check.detail}</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}
// ─── Main Component ────────────────────────────────────────────────────────────
export function ScreenInboundComms() {
  const [tab, setTab] = useState<InboundTab>('inbox');
  const tabs: {
    id: InboundTab;
    label: string;
    emoji: string;
    badge?: number;
  }[] = [
  {
    id: 'inbox',
    label: 'Inbox',
    emoji: '📥',
    badge: 398
  },
  {
    id: 'calendar',
    label: 'Calendar',
    emoji: '📅'
  },
  {
    id: 'api',
    label: 'API Config',
    emoji: '⚡'
  },
  {
    id: 'relationships',
    label: 'Relationships',
    emoji: '🔗'
  },
  {
    id: 'selfeval',
    label: 'AGI Prep',
    emoji: '🧠'
  }];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-white">
            Inbound Intelligence
          </h2>
          <p className="text-sm text-slate-400">
            Unified communications · API auto-config · Relationship mapping ·
            AGI self-evaluation
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 flex-shrink-0">
          <LiveDot />
          <span className="text-xs font-bold text-green-400">
            All Channels Active
          </span>
        </div>
      </div>

      {/* Tab nav */}
      <div className="bg-slate-800 rounded-xl p-1 flex gap-1 overflow-x-auto">
        {tabs.map((t) =>
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative ${tab === t.id ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

            <span>{t.emoji}</span>
            {t.label}
            {t.badge && tab !== t.id &&
          <span className="bg-orange-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {t.badge}
              </span>
          }
          </button>
        )}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
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
            y: -6
          }}
          transition={{
            duration: 0.2
          }}>

          {tab === 'inbox' && <TabInbox />}
          {tab === 'calendar' && <TabCalendar />}
          {tab === 'api' && <TabAPI />}
          {tab === 'relationships' && <TabRelationships />}
          {tab === 'selfeval' && <TabSelfEval />}
        </motion.div>
      </AnimatePresence>
    </div>);

}