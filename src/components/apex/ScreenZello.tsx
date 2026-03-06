import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadioIcon,
  MicIcon,
  WifiIcon,
  ZapIcon,
  BrainIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  UsersIcon,
  MapPinIcon,
  ClockIcon,
  DollarSignIcon,
  ShieldIcon,
  PackageIcon,
  TruckIcon,
  WrenchIcon,
  BuildingIcon,
  SettingsIcon,
  ToggleLeftIcon,
  ToggleRightIcon,
  ChevronRightIcon,
  ActivityIcon,
  LockIcon,
  PhoneIcon,
  Volume2Icon,
  VolumeXIcon,
  PlayIcon,
  AlertTriangleIcon,
  StarIcon } from
'lucide-react';
// ─── Types ─────────────────────────────────────────────────────────────────────
type ZelloTab = 'overview' | 'channels' | 'stories' | 'settings';
// ─── Data ──────────────────────────────────────────────────────────────────────
const channels = [
{
  id: 'ch-01',
  name: 'Operations Floor',
  beacon: 'GB-001 · Main Warehouse',
  users: 8,
  active: 3,
  monitoring: true,
  exec: 'COO',
  execName: 'Orion',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  status: 'live',
  messagesProcessed: 284,
  actionsTriggered: 47
},
{
  id: 'ch-02',
  name: 'Dispatch & Logistics',
  beacon: 'GB-006 · Dispatch Office',
  users: 12,
  active: 5,
  monitoring: true,
  exec: 'COO',
  execName: 'Orion',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  status: 'live',
  messagesProcessed: 412,
  actionsTriggered: 89
},
{
  id: 'ch-03',
  name: 'Safety & Compliance',
  beacon: 'GB-001 / GB-003',
  users: 6,
  active: 2,
  monitoring: true,
  exec: 'CLO',
  execName: 'Lex',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  status: 'live',
  messagesProcessed: 156,
  actionsTriggered: 34
},
{
  id: 'ch-04',
  name: 'Executive Channel',
  beacon: 'GB-004 · HQ Office',
  users: 3,
  active: 1,
  monitoring: true,
  exec: 'CEO',
  execName: 'Aria',
  execColor: 'text-amber-400',
  execBg: 'bg-amber-500/20',
  status: 'idle',
  messagesProcessed: 67,
  actionsTriggered: 23
},
{
  id: 'ch-05',
  name: 'Field Technicians',
  beacon: 'Mobile Beacons',
  users: 15,
  active: 7,
  monitoring: true,
  exec: 'CSO',
  execName: 'Sage',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  status: 'live',
  messagesProcessed: 631,
  actionsTriggered: 112
},
{
  id: 'ch-06',
  name: 'Finance Approvals',
  beacon: 'GB-004 · HQ Office',
  users: 4,
  active: 0,
  monitoring: false,
  exec: 'CFO',
  execName: 'Felix',
  execColor: 'text-blue-400',
  execBg: 'bg-blue-500/20',
  status: 'idle',
  messagesProcessed: 94,
  actionsTriggered: 28
}];

const liveActivity = [
{
  id: 'la-1',
  channel: 'Operations Floor',
  user: 'Marcus C.',
  snippet: '"Aisle 7 pallet count is off by 14 units, need a recount"',
  exec: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  action: 'Cycle count initiated · WMS flagged · Supervisor notified',
  time: '1 min ago',
  beacon: 'GB-001'
},
{
  id: 'la-2',
  channel: 'Dispatch & Logistics',
  user: 'Diego R.',
  snippet: '"Running 40 minutes late on Route 7, traffic on I-95"',
  exec: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  action: 'Customer notified · ETA updated · Route optimized',
  time: '4 min ago',
  beacon: 'GB-006'
},
{
  id: 'la-3',
  channel: 'Field Technicians',
  user: 'Sarah M.',
  snippet:
  '"Customer at Riverside wants to add a mini-split, she\'s ready to buy"',
  exec: 'CSO',
  execColor: 'text-orange-400',
  execBg: 'bg-orange-500/20',
  action: 'Quote generated $4,200 · Sent to customer · CRM updated',
  time: '9 min ago',
  beacon: 'Mobile'
},
{
  id: 'la-4',
  channel: 'Safety & Compliance',
  user: 'Ray T.',
  snippet: '"Forklift operator near-miss at Dock 2, everyone is okay"',
  exec: 'CLO',
  execColor: 'text-cyan-400',
  execBg: 'bg-cyan-500/20',
  action:
  'Incident report filed · OSHA log updated · Safety review scheduled',
  time: '18 min ago',
  beacon: 'GB-001'
},
{
  id: 'la-5',
  channel: 'Operations Floor',
  user: 'Jess K.',
  snippet: '"Dock 3 truck is 2 hours early, we\'re not ready"',
  exec: 'COO',
  execColor: 'text-green-400',
  execBg: 'bg-green-500/20',
  action: '2 crews rerouted · Dock 3 prepped · Driver notified of new bay',
  time: '32 min ago',
  beacon: 'GB-002'
}];

// ─── 4 User Stories ────────────────────────────────────────────────────────────
const userStories = [
{
  id: 'us-1',
  persona: 'Marcus Chen',
  role: 'Warehouse Foreman',
  industry: 'Warehousing & Distribution',
  icon: PackageIcon,
  color: 'from-green-500 to-green-700',
  accentColor: 'text-green-400',
  accentBg: 'bg-green-500/20',
  accentBorder: 'border-green-500/30',
  channel: 'Operations Floor',
  beacon: 'GB-002 · Receiving Dock',
  zelloMessage:
  '"Dock 3 is jammed — got a truck pulling in 20 minutes early, need 2 bodies over here now"',
  situation:
  'An unscheduled early truck arrival is about to cause a $2,800 detention fee. Marcus has 20 minutes to clear Dock 3 and redirect crew from Aisle 7.',
  flow: [
  {
    step: '① Zello PTT',
    detail: 'Marcus presses PTT on his Zello radio, speaks the situation',
    color: 'text-green-400',
    bg: 'bg-green-500/20'
  },
  {
    step: '② Beacon Capture',
    detail: 'GB-002 at Receiving Dock captures audio, encrypts locally',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  {
    step: '③ APEX Engine',
    detail:
    'Voice transcribed, classified as Operations/Urgent, routed to COO',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20'
  },
  {
    step: '④ COO Orion Acts',
    detail:
    'Reroutes 2 crew from Aisle 7, opens Dock 3, notifies truck driver of new bay assignment',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20'
  },
  {
    step: '⑤ Zello Response',
    detail:
    'Orion broadcasts back on Operations Floor channel: "Marcus, crew en route, Dock 3 open, driver notified"',
    color: 'text-green-400',
    bg: 'bg-green-500/20'
  }],

  outcome:
  'Crew repositioned in 90 seconds. Detention fee avoided. Dock cleared before truck arrived.',
  metrics: [
  {
    label: 'Time to Action',
    value: '90 sec',
    color: 'text-green-400'
  },
  {
    label: 'Cost Avoided',
    value: '$2,800',
    color: 'text-green-400'
  },
  {
    label: 'Coordination Saved',
    value: '45 min',
    color: 'text-blue-400'
  }],

  quote:
  '"I used to spend 10 minutes on the radio trying to reach the right people. Now I say it once and Orion handles it. The crew was already moving before I finished my sentence."'
},
{
  id: 'us-2',
  persona: 'Sarah Martinez',
  role: 'HVAC Field Technician',
  industry: 'Trades & Field Services',
  icon: WrenchIcon,
  color: 'from-orange-500 to-orange-700',
  accentColor: 'text-orange-400',
  accentBg: 'bg-orange-500/20',
  accentBorder: 'border-orange-500/30',
  channel: 'Field Technicians',
  beacon: 'Mobile Beacon · Service Van',
  zelloMessage:
  '"Finished the Riverside job — Mrs. Johnson wants to talk about adding a mini-split in the garage. She\'s ready to buy today."',
  situation:
  'Sarah is at a completed job site. The customer expressed interest in an upsell. Without APEX, this lead would sit in a voicemail for hours and likely go cold.',
  flow: [
  {
    step: '① Zello PTT',
    detail:
    'Sarah speaks the upsell opportunity into her Zello app while packing up tools',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20'
  },
  {
    step: '② Mobile Beacon',
    detail:
    'Beacon in service van captures audio, processes locally, syncs to APEX',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  {
    step: '③ APEX Engine',
    detail:
    'Classified as Sales Opportunity, routed to CSO Sage + CMO Maya + CFO Felix',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20'
  },
  {
    step: '④ AI Team Acts',
    detail:
    'CSO pulls customer history, CFO checks margin, CMO logs NPS, quote generated at $4,200',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20'
  },
  {
    step: '⑤ Zello Response',
    detail:
    'Sage responds on Field channel: "Sarah, quote sent to Mrs. Johnson — $4,200 for a 12K BTU mini-split. She\'ll get it in 2 minutes."',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20'
  }],

  outcome:
  'Quote sent in 3 minutes. Customer signed same day. Sarah never left the job site.',
  metrics: [
  {
    label: 'Quote Time',
    value: '3 min',
    color: 'text-orange-400'
  },
  {
    label: 'Deal Value',
    value: '$4,200',
    color: 'text-green-400'
  },
  {
    label: 'Back-Office Saved',
    value: '2 hrs',
    color: 'text-blue-400'
  }],

  quote:
  '"I used to call the office, wait for someone to pull the customer file, then wait for a quote. Now I mention it on Zello and the quote is already sent before I\'m back in my van."'
},
{
  id: 'us-3',
  persona: 'Diego Ramirez',
  role: 'Delivery Driver',
  industry: 'Logistics & Freight',
  icon: TruckIcon,
  color: 'from-blue-500 to-blue-700',
  accentColor: 'text-blue-400',
  accentBg: 'bg-blue-500/20',
  accentBorder: 'border-blue-500/30',
  channel: 'Dispatch & Logistics',
  beacon: 'GB-006 · Dispatch Office',
  zelloMessage:
  '"Dispatch, I\'m stuck on I-95 northbound — accident ahead. Gonna be 40 minutes late on the Westfield delivery. Route 7 is a mess."',
  situation:
  'Diego is stuck in traffic. Without APEX, dispatch would manually call the customer, update the TMS, and try to reroute the next pickup — taking 30+ minutes of phone calls.',
  flow: [
  {
    step: '① Zello PTT',
    detail: 'Diego presses PTT while stopped in traffic, reports the delay',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  {
    step: '② Beacon Capture',
    detail:
    "GB-006 at Dispatch captures the transmission, identifies Diego's route context",
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  {
    step: '③ APEX Engine',
    detail:
    'Classified as Logistics Delay, routed to COO Orion + CLO Lex for HOS compliance',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20'
  },
  {
    step: '④ COO + CLO Act',
    detail:
    'Orion updates TMS ETA, notifies Westfield customer, reroutes next pickup. Lex logs HOS compliance note.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20'
  },
  {
    step: '⑤ Zello Response',
    detail:
    'Orion responds: "Diego, Westfield notified, your next pickup moved to 3:45 PM. HOS logged. Drive safe."',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  }],

  outcome:
  'Customer notified in 45 seconds. No detention fee. HOS compliance maintained. Diego never touched his phone.',
  metrics: [
  {
    label: 'Customer Notified',
    value: '45 sec',
    color: 'text-blue-400'
  },
  {
    label: 'Calls Avoided',
    value: '6 calls',
    color: 'text-green-400'
  },
  {
    label: 'Compliance Risk',
    value: 'Eliminated',
    color: 'text-cyan-400'
  }],

  quote:
  '"I used to dread traffic because it meant 20 minutes of phone calls while I\'m trying to drive. Now I say it once on Zello and everything is handled. Dispatch doesn\'t even have to pick up."'
},
{
  id: 'us-4',
  persona: 'Kim Nakamura',
  role: 'Construction Site Superintendent',
  industry: 'Construction & General Contracting',
  icon: BuildingIcon,
  color: 'from-amber-500 to-amber-700',
  accentColor: 'text-amber-400',
  accentBg: 'bg-amber-500/20',
  accentBorder: 'border-amber-500/30',
  channel: 'Site Operations',
  beacon: 'Site Beacon · Building C',
  zelloMessage:
  '"Section B concrete pour is done and cured — we need the inspector out here for sign-off before we can start framing. This is the milestone for the Phase 2 payment."',
  situation:
  'Kim has hit a critical project milestone. Scheduling the inspector, generating compliance docs, and triggering the payment milestone would normally take 4 hours of coordination across 3 departments.',
  flow: [
  {
    step: '① Zello PTT',
    detail:
    'Kim announces milestone completion on the Site Operations channel',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20'
  },
  {
    step: '② Site Beacon',
    detail:
    'Beacon at Building C captures audio, tags location context and project phase',
    color: 'text-blue-400',
    bg: 'bg-blue-500/20'
  },
  {
    step: '③ APEX Engine',
    detail:
    'Classified as Milestone + Compliance + Finance event, routed to CLO + CEO + CFO',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20'
  },
  {
    step: '④ AI Team Acts',
    detail:
    'CLO Lex schedules inspector + generates compliance docs. CEO Aria logs milestone. CFO Felix triggers $85K payment request.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/20'
  },
  {
    step: '⑤ Zello Response',
    detail:
    'Lex responds: "Kim, inspector confirmed for 2 PM tomorrow. Compliance docs ready. Felix triggered the Phase 2 payment — $85K."',
    color: 'text-amber-400',
    bg: 'bg-amber-500/20'
  }],

  outcome:
  'Inspector scheduled same day. $85K payment milestone triggered. Kim stayed on site.',
  metrics: [
  {
    label: 'Coordination Saved',
    value: '4 hrs',
    color: 'text-amber-400'
  },
  {
    label: 'Payment Triggered',
    value: '$85K',
    color: 'text-green-400'
  },
  {
    label: 'Inspector Booked',
    value: 'Same Day',
    color: 'text-blue-400'
  }],

  quote:
  '"That one Zello message used to mean 4 hours of phone calls, emails, and chasing down the inspector. Now I say it and walk away. By the time I\'m back at my trailer, it\'s all done."'
}];

// ─── Utility ───────────────────────────────────────────────────────────────────
function WaveformBars({ active }: {active: boolean;}) {
  return (
    <div className="flex items-center gap-0.5 h-5">
      {[3, 5, 8, 6, 9, 4, 7, 5, 8, 3, 6, 9, 4, 7, 5].map((h, i) =>
      <motion.div
        key={i}
        animate={
        active ?
        {
          scaleY: [0.3, 1, 0.3],
          opacity: [0.4, 1, 0.4]
        } :
        {
          scaleY: 0.2,
          opacity: 0.2
        }
        }
        transition={{
          duration: 0.6 + i * 0.05,
          repeat: Infinity,
          delay: i * 0.04
        }}
        className="w-0.5 bg-green-400 rounded-full origin-center"
        style={{
          height: `${h}px`
        }} />

      )}
    </div>);

}
function PTTButton({ onPress }: {onPress: () => void;}) {
  const [pressed, setPressed] = useState(false);
  const handlePress = () => {
    setPressed(true);
    onPress();
    setTimeout(() => setPressed(false), 2000);
  };
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        {pressed &&
        <>
            <motion.div
            animate={{
              scale: [1, 2.5],
              opacity: [0.4, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity
            }}
            className="absolute inset-0 rounded-full bg-green-500/30" />

            <motion.div
            animate={{
              scale: [1, 2],
              opacity: [0.3, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: 0.3
            }}
            className="absolute inset-0 rounded-full bg-green-500/20" />

          </>
        }
        <motion.button
          whileTap={{
            scale: 0.93
          }}
          onMouseDown={handlePress}
          className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-200 shadow-lg ${pressed ? 'bg-green-500 border-green-400 shadow-green-500/40' : 'bg-slate-800 border-slate-600 hover:border-green-500/60'}`}>

          <MicIcon
            className={`w-8 h-8 ${pressed ? 'text-white' : 'text-slate-400'}`} />

        </motion.button>
      </div>
      <p
        className={`text-xs font-bold transition-colors ${pressed ? 'text-green-400' : 'text-slate-500'}`}>

        {pressed ? 'Transmitting...' : 'Hold to Talk'}
      </p>
    </div>);

}
// ─── Tabs ───────────────────────────────────────────────────────────────────────
function OverviewTab() {
  const [pttActive, setPttActive] = useState(false);
  const [liveCount, setLiveCount] = useState(1550);
  useEffect(() => {
    const t = setInterval(
      () => setLiveCount((p) => p + Math.floor(Math.random() * 3)),
      3200
    );
    return () => clearInterval(t);
  }, []);
  return (
    <div className="space-y-5">
      {/* Zello connection status */}
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/30 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
                <RadioIcon className="w-4 h-4 text-white" />
              </div>
              <p className="text-base font-black text-white">
                Zello PTT Bridge
              </p>
              <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded-full">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Zello channels are being monitored by Guide Beacons · All voice
              content routes to APEX Engine
            </p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-green-400">5</p>
          <p className="text-xs text-slate-500 mt-1">Active Channels</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <motion.p
            key={liveCount}
            initial={{
              scale: 1.15
            }}
            animate={{
              scale: 1
            }}
            className="text-2xl font-black text-orange-400">

            {liveCount.toLocaleString()}
          </motion.p>
          <p className="text-xs text-slate-500 mt-1">Messages Processed</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-blue-400">333</p>
          <p className="text-xs text-slate-500 mt-1">AI Actions Triggered</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-black text-purple-400">1.2s</p>
          <p className="text-xs text-slate-500 mt-1">Avg Response Time</p>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
        <p className="text-sm font-bold text-white mb-4">
          How Zello + APEX Works
        </p>
        <div className="space-y-3">
          {[
          {
            step: '1',
            label: 'Field Worker Speaks',
            detail:
            'Worker presses PTT on Zello app or radio — speaks naturally about any work event, issue, or request',
            icon: MicIcon,
            color: 'text-green-400',
            bg: 'bg-green-500/20'
          },
          {
            step: '2',
            label: 'Guide Beacon Captures',
            detail:
            'Nearest Guide Beacon picks up the Zello transmission, transcribes locally, encrypts, and sends to APEX Engine',
            icon: RadioIcon,
            color: 'text-blue-400',
            bg: 'bg-blue-500/20'
          },
          {
            step: '3',
            label: 'APEX Engine Routes',
            detail:
            'AI classifies the content (Operations, Finance, Compliance, Sales, etc.) and routes to the right AI executive',
            icon: ZapIcon,
            color: 'text-orange-400',
            bg: 'bg-orange-500/20'
          },
          {
            step: '4',
            label: 'AI Executive Acts',
            detail:
            'The assigned AI exec takes action — updates systems, notifies people, generates documents, schedules tasks',
            icon: BrainIcon,
            color: 'text-purple-400',
            bg: 'bg-purple-500/20'
          },
          {
            step: '5',
            label: 'Response on Zello',
            detail:
            'AI broadcasts the outcome back on the Zello channel — worker gets confirmation without leaving the field',
            icon: Volume2Icon,
            color: 'text-green-400',
            bg: 'bg-green-500/20'
          }].
          map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i}>
                <div
                  className={`flex items-start gap-3 p-3 rounded-xl ${item.bg} border border-white/5`}>

                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-900/60`}>

                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white">
                      {item.step}. {item.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </div>
                {i < 4 &&
                <div className="flex justify-center py-1">
                    <ArrowRightIcon className="w-3.5 h-3.5 text-slate-700 rotate-90" />
                  </div>
                }
              </div>);

          })}
        </div>
      </div>

      {/* PTT Demo */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-5">
        <p className="text-sm font-bold text-white mb-1">
          Try the PTT Interface
        </p>
        <p className="text-xs text-slate-500 mb-5">
          Simulate a Zello transmission to APEX Engine
        </p>
        <div className="flex flex-col items-center gap-4">
          <PTTButton onPress={() => setPttActive(true)} />
          <AnimatePresence>
            {pttActive &&
            <motion.div
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
              className="w-full bg-green-500/10 border border-green-500/30 rounded-xl p-4">

                <div className="flex items-center gap-3 mb-2">
                  <WaveformBars active={true} />
                  <span className="text-xs font-bold text-green-400">
                    Transmitting on Operations Floor
                  </span>
                </div>
                <p className="text-xs text-slate-300 italic">
                  "Dock 3 needs 2 more crew, truck arriving early"
                </p>
                <div className="mt-3 pt-3 border-t border-green-500/20">
                  <p className="text-xs text-slate-500 mb-1">
                    APEX Engine processing...
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-green-500/20 text-green-400">
                      COO Orion
                    </span>
                    <span className="text-xs text-slate-300">
                      Rerouting 2 crew to Dock 3 · Dock opening · Driver
                      notified
                    </span>
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>

      {/* Live activity */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <motion.span
            animate={{
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity
            }}
            className="w-2 h-2 rounded-full bg-green-400 inline-block" />

          <p className="text-sm font-bold text-white">Live Zello Activity</p>
        </div>
        <div className="space-y-3">
          {liveActivity.map((item, i) =>
          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              x: 10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.07
            }}
            className="border-b border-slate-800 last:border-0 pb-3 last:pb-0">

              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${item.execBg} ${item.execColor}`}>

                  {item.exec}
                </span>
                <span className="text-xs font-bold text-slate-300">
                  {item.user}
                </span>
                <span className="text-xs text-slate-600">#{item.channel}</span>
                <span className="text-xs text-slate-600 ml-auto">
                  {item.time}
                </span>
              </div>
              <p className="text-xs text-slate-400 italic mb-1">
                {item.snippet}
              </p>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircleIcon className="w-3 h-3 flex-shrink-0" />
                {item.action}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}
function ChannelsTab() {
  const [channelStates, setChannelStates] = useState(
    channels.reduce<Record<string, boolean>>((acc, ch) => {
      acc[ch.id] = ch.monitoring;
      return acc;
    }, {})
  );
  const toggle = (id: string) =>
  setChannelStates((prev) => ({
    ...prev,
    [id]: !prev[id]
  }));
  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-green-400">
            {channels.filter((c) => c.status === 'live').length}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Live Channels</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-orange-400">
            {channels.reduce((s, c) => s + c.active, 0)}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">Active Users</p>
        </div>
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-3 text-center">
          <p className="text-xl font-black text-purple-400">
            {channels.reduce((s, c) => s + c.actionsTriggered, 0)}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">AI Actions</p>
        </div>
      </div>

      {/* Channel list */}
      <div className="space-y-3">
        {channels.map((ch, i) =>
        <motion.div
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
            delay: i * 0.07
          }}
          className={`bg-slate-900 border rounded-2xl p-4 ${channelStates[ch.id] ? 'border-slate-700/50' : 'border-slate-800 opacity-60'}`}>

            <div className="flex items-start gap-3">
              <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ch.status === 'live' ? 'bg-green-500/20' : 'bg-slate-800'}`}>

                <RadioIcon
                className={`w-5 h-5 ${ch.status === 'live' ? 'text-green-400' : 'text-slate-600'}`} />

              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <p className="text-sm font-bold text-white">{ch.name}</p>
                  {ch.status === 'live' &&
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-400">
                      <motion.span
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />

                      LIVE
                    </span>
                }
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-2">
                  <RadioIcon className="w-3 h-3" />
                  {ch.beacon}
                </div>
                <div className="flex items-center gap-3 text-xs flex-wrap">
                  <span className="flex items-center gap-1 text-slate-500">
                    <UsersIcon className="w-3 h-3" />
                    {ch.active}/{ch.users} active
                  </span>
                  <span
                  className={`font-black px-2 py-0.5 rounded-lg ${ch.execBg} ${ch.execColor} text-[10px]`}>

                    {ch.exec} · {ch.execName}
                  </span>
                  <span className="text-slate-600">
                    {ch.messagesProcessed} msgs · {ch.actionsTriggered} actions
                  </span>
                </div>
              </div>
              <button
              onClick={() => toggle(ch.id)}
              className="flex-shrink-0 mt-0.5">

                {channelStates[ch.id] ?
              <ToggleRightIcon className="w-7 h-7 text-green-400" /> :

              <ToggleLeftIcon className="w-7 h-7 text-slate-600" />
              }
              </button>
            </div>
            {channelStates[ch.id] && ch.status === 'live' &&
          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                <WaveformBars active={ch.active > 2} />
                <span className="text-xs text-slate-500">
                  {ch.active} users transmitting
                </span>
              </div>
          }
          </motion.div>
        )}
      </div>

      {/* Add channel */}
      <button className="w-full py-3 border-2 border-dashed border-slate-700 rounded-2xl text-sm font-bold text-slate-500 hover:border-green-500/40 hover:text-green-400 transition-all flex items-center justify-center gap-2">
        <RadioIcon className="w-4 h-4" /> Connect New Zello Channel
      </button>
    </div>);

}
function StoriesTab() {
  const [activeStory, setActiveStory] = useState(0);
  const story = userStories[activeStory];
  const Icon = story.icon;
  return (
    <div className="space-y-4">
      {/* Story selector */}
      <div className="grid grid-cols-2 gap-2">
        {userStories.map((s, i) => {
          const SIcon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActiveStory(i)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-left transition-all ${activeStory === i ? `bg-gradient-to-br ${s.color} border-transparent` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

              <SIcon
                className={`w-4 h-4 flex-shrink-0 ${activeStory === i ? 'text-white' : 'text-slate-400'}`} />

              <div className="min-w-0">
                <p
                  className={`text-xs font-bold truncate ${activeStory === i ? 'text-white' : 'text-slate-300'}`}>

                  {s.persona}
                </p>
                <p
                  className={`text-[10px] truncate ${activeStory === i ? 'text-white/70' : 'text-slate-500'}`}>

                  {s.role}
                </p>
              </div>
            </button>);

        })}
      </div>

      {/* Story detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStory}
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
            y: -8
          }}
          transition={{
            duration: 0.22
          }}
          className="space-y-4">

          {/* Persona header */}
          <div className={`bg-gradient-to-br ${story.color} rounded-2xl p-5`}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-black text-white">{story.persona}</p>
                <p className="text-sm text-white/80 font-semibold">
                  {story.role}
                </p>
                <p className="text-xs text-white/60 mt-0.5">{story.industry}</p>
              </div>
            </div>
          </div>

          {/* Situation */}
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              The Situation
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {story.situation}
            </p>
          </div>

          {/* Zello message */}
          <div
            className={`bg-slate-900 border ${story.accentBorder} rounded-2xl p-4`}>

            <div className="flex items-center gap-2 mb-3">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center ${story.accentBg}`}>

                <MicIcon className={`w-4 h-4 ${story.accentColor}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">
                  Zello PTT Message
                </p>
                <p className="text-[10px] text-slate-500">
                  {story.channel} · {story.beacon}
                </p>
              </div>
              <WaveformBars active={true} />
            </div>
            <p
              className={`text-sm font-semibold ${story.accentColor} italic leading-relaxed`}>

              {story.zelloMessage}
            </p>
          </div>

          {/* Flow */}
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              What Happens Next
            </p>
            <div className="space-y-2">
              {story.flow.map((step, i) =>
              <div key={i}>
                  <motion.div
                  initial={{
                    opacity: 0,
                    x: -8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: i * 0.1
                  }}
                  className={`flex items-start gap-3 p-3 rounded-xl ${step.bg} border border-white/5`}>

                    <div className="flex-1 min-w-0">
                      <p className={`text-xs font-black ${step.color} mb-0.5`}>
                        {step.step}
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </motion.div>
                  {i < story.flow.length - 1 &&
                <div className="flex justify-center py-1">
                      <ArrowRightIcon className="w-3 h-3 text-slate-700 rotate-90" />
                    </div>
                }
                </div>
              )}
            </div>
          </div>

          {/* Outcome metrics */}
          <div className="bg-slate-900 border border-green-500/20 rounded-2xl p-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
              Outcome
            </p>
            <p className="text-sm text-green-300 mb-3 leading-relaxed">
              {story.outcome}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {story.metrics.map((m, i) =>
              <div
                key={i}
                className="bg-slate-800 rounded-xl p-3 text-center">

                  <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{m.label}</p>
                </div>
              )}
            </div>
          </div>

          {/* Quote */}
          <div
            className={`${story.accentBg} border ${story.accentBorder} rounded-2xl p-4`}>

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              In Their Words
            </p>
            <p
              className={`text-sm ${story.accentColor} italic leading-relaxed`}>

              {story.quote}
            </p>
            <p className="text-xs text-slate-500 mt-2">
              — {story.persona}, {story.role}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>);

}
function SettingsTab() {
  const triggerWords = [
  'urgent',
  'emergency',
  'approve',
  'invoice',
  'incident',
  'safety',
  'late',
  'delay',
  'quote',
  'customer'];

  return (
    <div className="space-y-4">
      {/* Connection */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <RadioIcon className="w-4 h-4 text-green-400" />
          <p className="text-sm font-bold text-white">Zello API Connection</p>
        </div>
        <div className="space-y-2.5">
          {[
          {
            label: 'API Status',
            value: 'Connected',
            type: 'status',
            good: true
          },
          {
            label: 'Organization',
            value: 'Apex Warehouse Co.',
            type: 'text'
          },
          {
            label: 'Channels Monitored',
            value: '5 of 6',
            type: 'text'
          },
          {
            label: 'Webhook Endpoint',
            value: 'apex.io/zello/hook',
            type: 'text'
          }].
          map((item, i) =>
          <div
            key={i}
            className="flex items-center justify-between py-2 border-b border-slate-800 last:border-0">

              <span className="text-sm text-slate-400">{item.label}</span>
              <span
              className={`text-xs font-bold ${item.type === 'status' ? item.good ? 'text-green-400' : 'text-red-400' : 'text-slate-300'}`}>

                {item.value}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Response mode */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Volume2Icon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">AI Response Mode</p>
        </div>
        <div className="space-y-2.5">
          {[
          {
            label: 'Broadcast responses on Zello channel',
            checked: true
          },
          {
            label: 'Send push notification to owner',
            checked: true
          },
          {
            label: 'Auto-respond without confirmation',
            checked: false
          },
          {
            label: 'Log all transmissions to blockchain',
            checked: true
          },
          {
            label: 'Transcribe and archive all voice',
            checked: true
          }].
          map((item, i) =>
          <div
            key={i}
            className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">

              <span className="text-sm text-slate-300">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={item.checked} />

                <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Trigger words */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <ZapIcon className="w-4 h-4 text-purple-400" />
          <p className="text-sm font-bold text-white">Priority Trigger Words</p>
        </div>
        <p className="text-xs text-slate-500 mb-3">
          When these words are detected in Zello transmissions, APEX Engine
          escalates immediately
        </p>
        <div className="flex flex-wrap gap-2">
          {triggerWords.map((word) =>
          <span
            key={word}
            className="text-xs font-bold px-2.5 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full">

              {word}
            </span>
          )}
          <button className="text-xs font-bold px-2.5 py-1 border border-dashed border-slate-600 text-slate-500 hover:border-purple-500/40 hover:text-purple-400 rounded-full transition-colors">
            + Add word
          </button>
        </div>
      </div>

      {/* Channel → Exec mapping */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BrainIcon className="w-4 h-4 text-blue-400" />
          <p className="text-sm font-bold text-white">
            Channel → AI Executive Routing
          </p>
        </div>
        <div className="space-y-2">
          {channels.map((ch) =>
          <div
            key={ch.id}
            className="flex items-center gap-3 py-2 border-b border-slate-800 last:border-0">

              <RadioIcon className="w-3.5 h-3.5 text-slate-600 flex-shrink-0" />
              <span className="text-xs text-slate-300 flex-1 min-w-0 truncate">
                {ch.name}
              </span>
              <ArrowRightIcon className="w-3 h-3 text-slate-700 flex-shrink-0" />
              <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${ch.execBg} ${ch.execColor} flex-shrink-0`}>

                {ch.exec} · {ch.execName}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Security */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <LockIcon className="w-4 h-4 text-green-400" />
          <p className="text-sm font-bold text-white">Security & Privacy</p>
        </div>
        <div className="space-y-2.5">
          {[
          {
            label: 'End-to-end encryption on beacon capture',
            checked: true
          },
          {
            label: 'Voice data processed locally on beacon',
            checked: true
          },
          {
            label: 'Only abstracted signals sent to cloud',
            checked: true
          },
          {
            label: 'HIPAA-compliant mode',
            checked: false
          }].
          map((item, i) =>
          <div
            key={i}
            className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">

              <span className="text-sm text-slate-300">{item.label}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={item.checked} />

                <div className="w-10 h-5 bg-slate-700 rounded-full peer peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500" />
              </label>
            </div>
          )}
        </div>
      </div>
    </div>);

}
// ─── Main Export ───────────────────────────────────────────────────────────────
export function ScreenZello() {
  const [tab, setTab] = useState<ZelloTab>('overview');
  const tabs: {
    id: ZelloTab;
    label: string;
    icon: React.ElementType;
  }[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: RadioIcon
  },
  {
    id: 'channels',
    label: 'Channels',
    icon: UsersIcon
  },
  {
    id: 'stories',
    label: 'Stories',
    icon: StarIcon
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: SettingsIcon
  }];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <RadioIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs font-bold text-green-400 bg-green-500/20 border border-green-500/30 px-2 py-0.5 rounded-full">PTT</span>
            <p className="text-sm text-slate-400">Zello push-to-talk → Guide Beacon → APEX Engine · Field voice becomes AI action</p>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${tab === t.id ? 'bg-green-500 text-white' : 'text-slate-400 hover:text-white'}`}>

              <Icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.label}</span>
            </button>);

        })}
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

          {tab === 'overview' && <OverviewTab />}
          {tab === 'channels' && <ChannelsTab />}
          {tab === 'stories' && <StoriesTab />}
          {tab === 'settings' && <SettingsTab />}
        </motion.div>
      </AnimatePresence>
    </div>);

}