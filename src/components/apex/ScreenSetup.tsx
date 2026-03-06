import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicIcon,
  BrainIcon,
  ZapIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  BuildingIcon,
  ActivityIcon,
  TrendingUpIcon,
  UsersIcon,
  DollarSignIcon,
  ShieldIcon,
  PlugIcon,
  RocketIcon,
  SparklesIcon,
  Volume2Icon,
  SkipForwardIcon,
  MonitorIcon } from
'lucide-react';
import { localAgentStore } from '../../lib/localAgentStore';
// ─── Types ─────────────────────────────────────────────────────────────────────
type VoiceState = 'idle' | 'listening' | 'processing' | 'responding';
type SetupStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
interface SetupData {
  companyName: string;
  industry: string;
  teamSize: string;
  executives: string[];
  approvalLimit: string;
  integrations: string[];
}

// ─── Industry → recommended execs ─────────────────────────────────────────────
// ─── Full executive catalog ───────────────────────────────────────────────────
const EXEC_CATALOG: Array<{
  id: string; role: string; name: string; specialty: string;
  color: string; bg: string; border: string; text: string;
  description: string;
}> = [
  { id: 'ceo',  role: 'CEO',  name: 'Aria',  specialty: 'Strategy & Growth',        color: 'from-amber-400 to-amber-600',   bg: 'bg-amber-500/20',   border: 'border-amber-500/40',   text: 'text-amber-400',   description: 'Drives company vision, cross-functional decisions & OKRs' },
  { id: 'cfo',  role: 'CFO',  name: 'Felix', specialty: 'Finance & Cash Flow',       color: 'from-blue-400 to-blue-600',     bg: 'bg-blue-500/20',    border: 'border-blue-500/40',    text: 'text-blue-400',    description: 'Cash flow, forecasting, P&L, payroll & financial risk' },
  { id: 'coo',  role: 'COO',  name: 'Orion', specialty: 'Operations & Logistics',    color: 'from-green-400 to-green-600',   bg: 'bg-green-500/20',   border: 'border-green-500/40',   text: 'text-green-400',   description: 'Day-to-day operations, process optimization & SLAs' },
  { id: 'cmo',  role: 'CMO',  name: 'Maya',  specialty: 'Marketing & Acquisition',   color: 'from-pink-400 to-pink-600',     bg: 'bg-pink-500/20',    border: 'border-pink-500/40',    text: 'text-pink-400',    description: 'Lead gen, brand, content, SEO & paid campaigns' },
  { id: 'cto',  role: 'CTO',  name: 'Theo',  specialty: 'Tech & Automation',         color: 'from-purple-400 to-purple-600', bg: 'bg-purple-500/20',  border: 'border-purple-500/40',  text: 'text-purple-400',  description: 'Tech stack, integrations, automation & data infrastructure' },
  { id: 'clo',  role: 'CLO',  name: 'Lex',   specialty: 'Compliance & Risk',         color: 'from-cyan-400 to-cyan-600',     bg: 'bg-cyan-500/20',    border: 'border-cyan-500/40',    text: 'text-cyan-400',    description: 'Contracts, regulatory compliance, licenses & legal risk' },
  { id: 'chro', role: 'CHRO', name: 'Hana',  specialty: 'HR & People Ops',           color: 'from-rose-400 to-rose-600',     bg: 'bg-rose-500/20',    border: 'border-rose-500/40',    text: 'text-rose-400',    description: 'Hiring, onboarding, performance & culture' },
  { id: 'cso',  role: 'CSO',  name: 'Sage',  specialty: 'Sales & Revenue',           color: 'from-orange-400 to-orange-600', bg: 'bg-orange-500/20',  border: 'border-orange-500/40',  text: 'text-orange-400',  description: 'Sales pipeline, CRM, quotas & revenue growth' },
  { id: 'cro',  role: 'CRO',  name: 'Rex',   specialty: 'Revenue Ops',               color: 'from-red-400 to-rose-600',      bg: 'bg-red-500/20',     border: 'border-red-500/40',     text: 'text-red-400',     description: 'Revenue operations, churn prevention & upsell' },
  { id: 'cpo',  role: 'CPO',  name: 'Nova',  specialty: 'Product Strategy',          color: 'from-indigo-400 to-violet-600', bg: 'bg-indigo-500/20',  border: 'border-indigo-500/40',  text: 'text-indigo-400',  description: 'Product roadmap, feature prioritization & customer feedback' },
  { id: 'cdo',  role: 'CDO',  name: 'Iris',  specialty: 'Data & Analytics',          color: 'from-sky-400 to-cyan-600',      bg: 'bg-sky-500/20',     border: 'border-sky-500/40',     text: 'text-sky-400',     description: 'Business intelligence, dashboards & data strategy' },
  { id: 'ciso', role: 'CISO', name: 'Volt',  specialty: 'Security & Risk',           color: 'from-slate-400 to-gray-600',    bg: 'bg-slate-500/20',   border: 'border-slate-500/40',   text: 'text-slate-400',   description: 'Cybersecurity, access control & incident response' },
  { id: 'cco',  role: 'CCO',  name: 'Cleo',  specialty: 'Customer Experience',       color: 'from-teal-400 to-emerald-600',  bg: 'bg-teal-500/20',    border: 'border-teal-500/40',    text: 'text-teal-400',    description: 'Customer satisfaction, NPS, support & retention' },
]

// ─── Dynamic recommendation engine ────────────────────────────────────────────
// Scores each exec role 0-100 for a given industry + team size combo.
// Score ≥ 70 = recommended, 40-69 = optional, < 40 = advanced.
const ROLE_SCORES: Record<string, Record<string, number>> = {
  //              ceo  cfo  coo  cmo  cto  clo  chro cso  cro  cpo  cdo  ciso cco
  warehousing:  { ceo:100, cfo:90, coo:95, cmo:60, cto:70, clo:55, chro:80, cso:65, cro:45, cpo:30, cdo:50, ciso:40, cco:55 },
  trades:       { ceo:100, cfo:85, coo:90, cmo:70, cto:55, clo:60, chro:75, cso:85, cro:60, cpo:25, cdo:45, ciso:35, cco:70 },
  logistics:    { ceo:100, cfo:90, coo:95, cmo:55, cto:80, clo:65, chro:70, cso:75, cro:50, cpo:35, cdo:70, ciso:45, cco:55 },
  construction: { ceo:100, cfo:90, coo:90, cmo:55, cto:60, clo:90, chro:80, cso:70, cro:45, cpo:25, cdo:50, ciso:40, cco:50 },
  medical:      { ceo:100, cfo:90, coo:70, cmo:75, cto:65, clo:95, chro:85, cso:60, cro:55, cpo:40, cdo:65, ciso:70, cco:80 },
  financial:    { ceo:100, cfo:95, coo:60, cmo:80, cto:80, clo:95, chro:65, cso:70, cro:75, cpo:50, cdo:85, ciso:90, cco:65 },
  technology:   { ceo:100, cfo:75, coo:55, cmo:80, cto:95, clo:50, chro:70, cso:75, cro:65, cpo:90, cdo:85, ciso:80, cco:70 },
  default:      { ceo:100, cfo:85, coo:80, cmo:75, cto:70, clo:60, chro:70, cso:75, cro:55, cpo:45, cdo:55, ciso:50, cco:60 },
}

// Team size multipliers: small teams need fewer roles, enterprises need more
const SIZE_BOOST: Record<string, Record<string, number>> = {
  solo:       { ceo:0, cfo:10, coo:0,  cmo:5,  cto:0,  clo:0,  chro:0,  cso:5,  cro:0,  cpo:0,  cdo:0,  ciso:0,  cco:0  },
  small:      { ceo:0, cfo:10, coo:5,  cmo:10, cto:5,  clo:5,  chro:5,  cso:10, cro:5,  cpo:0,  cdo:5,  ciso:0,  cco:5  },
  medium:     { ceo:0, cfo:5,  coo:10, cmo:10, cto:10, clo:10, chro:15, cso:10, cro:10, cpo:5,  cdo:10, ciso:5,  cco:10 },
  large:      { ceo:0, cfo:0,  coo:5,  cmo:5,  cto:15, clo:15, chro:20, cso:5,  cro:15, cpo:15, cdo:15, ciso:15, cco:10 },
  enterprise: { ceo:0, cfo:0,  coo:0,  cmo:0,  cto:10, clo:10, chro:15, cso:0,  cro:20, cpo:20, cdo:20, ciso:25, cco:15 },
}

type ScoredExec = typeof EXEC_CATALOG[number] & { score: number; tier: 'recommended' | 'optional' | 'advanced'; reason: string }

const ROLE_REASONS: Record<string, Record<string, string>> = {
  warehousing:  { ceo:'Vision & strategy', cfo:'Inventory finance & cash flow', coo:'Warehouse & logistics ops', cto:'WMS & automation', chro:'Workforce & shift management', cmo:'B2B marketing', clo:'OSHA & contracts', cso:'Customer accounts', cdo:'Inventory analytics', cro:'Retention & upsell', ciso:'Facility security', cco:'Client satisfaction', cpo:'Service roadmap' },
  trades:       { ceo:'Vision & growth', cfo:'Job costing & billing', coo:'Scheduling & field ops', cso:'Estimates & new accounts', chro:'Crew hiring & compliance', cmo:'Local marketing & reviews', clo:'Licensing & liability', cdo:'Job analytics', cro:'Recurring revenue', cto:'Field tech & apps', cco:'Customer experience', ciso:'Data security', cpo:'Service offerings' },
  logistics:    { ceo:'Network strategy', cfo:'Fleet finance & fuel cost', coo:'Route & dispatch ops', cto:'TMS & route AI', cdo:'Freight analytics', cso:'Shipper relationships', chro:'Driver hiring', clo:'DOT & compliance', cro:'Contract renewals', cmo:'Carrier marketing', cco:'On-time experience', ciso:'Cargo security', cpo:'Service expansion' },
  construction: { ceo:'Project strategy', cfo:'Bid finance & job costing', coo:'Site & subcontractor ops', clo:'OSHA, bonds & contracts', chro:'Labor & subcontractor HR', cso:'New project pipeline', cmo:'RFP & reputation', cto:'BIM & project tech', cdo:'Cost analytics', cro:'Change order revenue', cco:'Owner satisfaction', ciso:'Site data security', cpo:'Service offerings' },
  medical:      { ceo:'Practice strategy', cfo:'Billing & revenue cycle', clo:'HIPAA & licensing', chro:'Clinical staff & credentialing', cmo:'Patient acquisition', cco:'Patient experience', cdo:'Clinical analytics', ciso:'EHR security', cto:'Health IT & telehealth', cso:'Referral growth', cro:'Patient retention', coo:'Clinic operations', cpo:'Care programs' },
  financial:    { ceo:'Firm strategy', cfo:'P&L & regulatory capital', clo:'SEC/FINRA compliance', cdo:'Risk & market analytics', ciso:'Client data security', cto:'Fintech & trading systems', cmo:'Client acquisition', cso:'AUM growth', cro:'Fee revenue & retention', chro:'Advisor hiring', coo:'Back-office ops', cco:'Client experience', cpo:'Product offerings' },
  technology:   { ceo:'Product vision & growth', cto:'Tech stack & engineering', cpo:'Product roadmap & OKRs', cdo:'Data & growth analytics', ciso:'InfoSec & SOC2', cmo:'PLG & demand gen', cso:'Enterprise sales', cro:'ARR & churn ops', chro:'Eng hiring & culture', cfo:'SaaS metrics & runway', cco:'Customer success & NPS', coo:'GTM & scale ops', clo:'IP, contracts & privacy' },
  default:      { ceo:'Leadership', cfo:'Finance', coo:'Operations', cmo:'Marketing', cto:'Technology', clo:'Compliance', chro:'People', cso:'Sales', cro:'Revenue', cpo:'Product', cdo:'Data', ciso:'Security', cco:'Customer experience' },
}

function computeRecommended(industry: string, teamSize: string): ScoredExec[] {
  const scores = ROLE_SCORES[industry] ?? ROLE_SCORES.default
  const boost = SIZE_BOOST[teamSize] ?? {}
  const reasons = ROLE_REASONS[industry] ?? ROLE_REASONS.default
  return EXEC_CATALOG
    .map((e) => {
      const score = Math.min(100, (scores[e.id] ?? 50) + (boost[e.id] ?? 0))
      const tier: ScoredExec['tier'] = score >= 70 ? 'recommended' : score >= 45 ? 'optional' : 'advanced'
      return { ...e, score, tier, reason: reasons[e.id] ?? e.specialty }
    })
    .sort((a, b) => b.score - a.score)
}
interface ScreenSetupProps {
  onComplete?: () => void;
}
// ─── Waveform Bars ─────────────────────────────────────────────────────────────
function WaveformBars({
  active,
  color = 'bg-orange-400'



}: {active: boolean;color?: string;}) {
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
        className={`w-0.5 ${color} rounded-full origin-center`}
        style={{
          height: `${h}px`
        }} />

      )}
    </div>);

}
// ─── Mic Button ────────────────────────────────────────────────────────────────
function MicButton({
  voiceState,
  onClick,
  size = 'lg'




}: {voiceState: VoiceState;onClick: () => void;size?: 'sm' | 'lg';}) {
  const isLg = size === 'lg';
  const colorMap = {
    idle: 'bg-slate-800 border-slate-600 text-slate-400',
    listening: 'bg-orange-500/20 border-orange-500 text-orange-400',
    processing: 'bg-blue-500/20 border-blue-500 text-blue-400',
    responding: 'bg-green-500/20 border-green-500 text-green-400'
  };
  const dim = isLg ? 'w-20 h-20' : 'w-14 h-14';
  const iconDim = isLg ? 'w-9 h-9' : 'w-6 h-6';
  return (
    <div className="relative flex items-center justify-center">
      {voiceState === 'listening' &&
      <>
          <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.25, 0, 0.25]
          }}
          transition={{
            duration: 2,
            repeat: Infinity
          }}
          className={`absolute ${isLg ? 'w-24 h-24' : 'w-16 h-16'} rounded-full bg-orange-500/20`} />

          <motion.div
          animate={{
            scale: [1, 2, 1],
            opacity: [0.15, 0, 0.15]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.3
          }}
          className={`absolute ${isLg ? 'w-24 h-24' : 'w-16 h-16'} rounded-full bg-orange-500/10`} />

        </>
      }
      <motion.button
        whileTap={{
          scale: 0.94
        }}
        onClick={onClick}
        className={`relative ${dim} rounded-full border-2 flex items-center justify-center transition-all duration-300 ${colorMap[voiceState]}`}>

        {voiceState === 'processing' ?
        <motion.div
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}>

            <BrainIcon className={iconDim} />
          </motion.div> :

        <MicIcon className={iconDim} />
        }
      </motion.button>
    </div>);

}
// ─── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step, total }: {step: SetupStep;total: number;}) {
  const pct = (step - 1) / (total - 1) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          {step === 1 ?
          'Welcome' :
          step === total ?
          'Launch' :
          `Step ${step - 1} of ${total - 2}`}
        </span>
        <span className="text-xs text-slate-600">{Math.round(pct)}%</span>
      </div>
      <div className="w-full bg-slate-800 rounded-full h-1.5">
        <motion.div
          animate={{
            width: `${pct}%`
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut'
          }}
          className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" />

      </div>
      <div className="flex items-center gap-1.5 mt-2.5">
        {Array.from({
          length: total
        }).map((_, i) => {
          const isPast = i < step - 1;
          const isCurrent = i === step - 1;
          return (
            <motion.div
              key={i}
              animate={{
                width: isCurrent ? 16 : 6,
                opacity: isPast || isCurrent ? 1 : 0.25
              }}
              transition={{
                duration: 0.3
              }}
              className={`h-1.5 rounded-full flex-shrink-0 ${isPast || isCurrent ? 'bg-orange-500' : 'bg-slate-700'}`} />);


        })}
      </div>
    </div>);

}
// ─── Voice Status Label ────────────────────────────────────────────────────────
function VoiceStatusLabel({
  state,
  transcript



}: {state: VoiceState;transcript: string;}) {
  const labels = {
    idle: 'Tap mic or choose below',
    listening: 'Listening...',
    processing: 'Processing...',
    responding: 'Got it!'
  };
  const colors = {
    idle: 'text-slate-500',
    listening: 'text-orange-400',
    processing: 'text-blue-400',
    responding: 'text-green-400'
  };
  return (
    <div className="text-center min-h-[40px]">
      <p className={`text-sm font-bold transition-colors ${colors[state]}`}>
        {labels[state]}
      </p>
      {transcript &&
      <motion.p
        initial={{
          opacity: 0,
          y: 4
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="text-white font-semibold text-sm mt-0.5">

          "{transcript}"
        </motion.p>
      }
    </div>);

}
// ─── Data ──────────────────────────────────────────────────────────────────────
const industries = [
{
  key: 'warehousing',
  label: 'Warehousing',
  icon: PackageIcon,
  color: 'from-indigo-500 to-indigo-700',
  voice: ['warehousing', 'warehouse', 'distribution']
},
{
  key: 'trades',
  label: 'Trades',
  icon: WrenchIcon,
  color: 'from-yellow-500 to-yellow-700',
  voice: ['trades', 'hvac', 'plumbing', 'electrical', 'trade']
},
{
  key: 'logistics',
  label: 'Logistics',
  icon: TruckIcon,
  color: 'from-blue-500 to-blue-700',
  voice: ['logistics', 'freight', 'trucking', 'shipping']
},
{
  key: 'construction',
  label: 'Construction',
  icon: BuildingIcon,
  color: 'from-amber-500 to-amber-700',
  voice: ['construction', 'contracting', 'building']
},
{
  key: 'medical',
  label: 'Medical',
  icon: ActivityIcon,
  color: 'from-rose-500 to-rose-700',
  voice: ['medical', 'healthcare', 'dental', 'clinic', 'practice']
},
{
  key: 'financial',
  label: 'Financial',
  icon: TrendingUpIcon,
  color: 'from-emerald-500 to-emerald-700',
  voice: ['financial', 'finance', 'advisory', 'accounting', 'investment']
},
{
  key: 'technology',
  label: 'Technology',
  icon: MonitorIcon,
  color: 'from-violet-500 to-violet-700',
  voice: ['technology', 'tech', 'saas', 'software', 'startup', 'app']
}];

const teamSizes = [
{
  key: 'solo',
  label: 'Solo',
  sub: 'Just me',
  voice: ['solo', 'just me', 'one', '1']
},
{
  key: 'small',
  label: 'Small',
  sub: '2–10',
  voice: ['small', 'two', 'three', 'five', 'ten', '2', '5', '10']
},
{
  key: 'medium',
  label: 'Medium',
  sub: '11–50',
  voice: ['medium', 'twenty', 'thirty', 'fifty', '20', '30', '50']
},
{
  key: 'large',
  label: 'Large',
  sub: '51–200',
  voice: ['large', 'hundred', '100', '150', '200']
},
{
  key: 'enterprise',
  label: 'Enterprise',
  sub: '200+',
  voice: ['enterprise', 'big', 'large enterprise', '500', '1000']
}];

// execOptions kept for legacy launch-screen reference only
const execOptions = EXEC_CATALOG

const approvalLimits = [
{
  key: '500',
  label: '$500',
  voice: ['five hundred', '500']
},
{
  key: '1000',
  label: '$1,000',
  voice: ['one thousand', 'thousand', '1000', '1k']
},
{
  key: '2500',
  label: '$2,500',
  voice: ['twenty five hundred', '2500', '2.5k']
},
{
  key: '5000',
  label: '$5,000',
  voice: ['five thousand', '5000', '5k']
},
{
  key: '10000',
  label: '$10,000',
  voice: ['ten thousand', '10000', '10k']
},
{
  key: 'custom',
  label: 'Custom',
  voice: ['custom', 'other']
}];

const integrationOptions = [
{
  key: 'quickbooks',
  label: 'QuickBooks',
  sub: 'Accounting & invoicing',
  color: 'text-green-400',
  bg: 'bg-green-500/20',
  border: 'border-green-500/40',
  emoji: '📊'
},
{
  key: 'salesforce',
  label: 'Salesforce',
  sub: 'CRM & pipeline',
  color: 'text-blue-400',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/40',
  emoji: '☁️'
},
{
  key: 'slack',
  label: 'Slack',
  sub: 'Team communication',
  color: 'text-purple-400',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/40',
  emoji: '💬'
},
{
  key: 'google',
  label: 'Google Workspace',
  sub: 'Docs, Calendar, Gmail',
  color: 'text-orange-400',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/40',
  emoji: '🔵'
},
{
  key: 'hubspot',
  label: 'HubSpot',
  sub: 'Marketing & CRM',
  color: 'text-rose-400',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/40',
  emoji: '🧲'
},
{
  key: 'stripe',
  label: 'Stripe',
  sub: 'Payments & billing',
  color: 'text-indigo-400',
  bg: 'bg-indigo-500/20',
  border: 'border-indigo-500/40',
  emoji: '💳'
}];

// ─── Voice simulation helper ───────────────────────────────────────────────────
function useVoiceSimulator(onComplete: (transcript: string) => void) {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });
  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  const startListening = () => {
    if (voiceState !== 'idle') return;
    clearTimers();
    setVoiceState('listening');
    setTranscript('');
  };
  const simulateResponse = (text: string) => {
    clearTimers();
    setTranscript(text);
    setVoiceState('processing');
    const t1 = setTimeout(() => {
      setVoiceState('responding');
      const t2 = setTimeout(() => {
        setVoiceState('idle');
        setTranscript('');
        onCompleteRef.current(text);
      }, 1400);
      timers.current.push(t2);
    }, 1200);
    timers.current.push(t1);
  };
  const stopListening = (text = '') => {
    if (voiceState === 'listening') {
      if (text) simulateResponse(text);else
      {
        setVoiceState('idle');
        setTranscript('');
      }
    }
  };
  useEffect(() => () => clearTimers(), []);
  return {
    voiceState,
    transcript,
    startListening,
    stopListening,
    simulateResponse
  };
}
// ─── Step 1: Welcome ───────────────────────────────────────────────────────────
function StepWelcome({ onNext, companyName, onCompanyName }: {onNext: () => void; companyName: string; onCompanyName: (v: string) => void;}) {
  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator(() => onNext());
  const handleMic = () => {
    if (voiceState === 'idle') startListening();else
    if (voiceState === 'listening') stopListening("Let's go");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center px-4 gap-8">
      {/* Animated logo */}
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.35, 0.15]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0 w-28 h-28 bg-orange-500 rounded-full blur-2xl" />

        <motion.div
          animate={{
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative w-24 h-24 bg-gradient-to-br from-orange-400 to-amber-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-orange-500/30">

          <ZapIcon className="w-12 h-12 text-white" />
        </motion.div>
      </div>

      <div>
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2
          }}
          className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-4 py-1.5 mb-4">

          <SparklesIcon className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-xs font-bold text-orange-300 uppercase tracking-widest">
            APEX Setup
          </span>
        </motion.div>
        <motion.h1
          initial={{
            opacity: 0,
            y: 12
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.3
          }}
          className="text-3xl lg:text-4xl font-black text-white mb-3 leading-tight">

          Set up your AI C-Suite
        </motion.h1>
        <motion.p
          initial={{
            opacity: 0,
            y: 12
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.4
          }}
          className="text-slate-400 text-base max-w-sm mx-auto leading-relaxed">

          Answer 6 questions by voice or tap. Your AI executive team will be
          ready in under 5 minutes.
        </motion.p>
      </div>

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        transition={{
          delay: 0.5
        }}
        className="flex flex-col items-center gap-4">

        <MicButton voiceState={voiceState} onClick={handleMic} size="lg" />
        <VoiceStatusLabel state={voiceState} transcript={transcript} />
        {voiceState === 'listening' &&
        <motion.p
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          className="text-xs text-slate-500">

            Say <span className="text-orange-400 font-bold">"Let's go"</span> to
            begin
          </motion.p>
        }
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-xs">
        <input
          type="text"
          placeholder="Your company name (optional)"
          value={companyName}
          onChange={(e) => onCompanyName(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm font-medium px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500/60 transition-colors text-center"
        />
      </motion.div>

      <motion.button
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 0.7
        }}
        whileTap={{
          scale: 0.97
        }}
        onClick={onNext}
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3.5 rounded-2xl transition-colors text-base shadow-lg shadow-orange-500/20">

        <ZapIcon className="w-5 h-5" />
        Get Started
        <ChevronRightIcon className="w-4 h-4" />
      </motion.button>

      <p className="text-xs text-slate-600">
        No credit card required · Cancel anytime
      </p>
    </div>);

}
// ─── Step 2: Industry ──────────────────────────────────────────────────────────
function StepIndustry({
  value,
  onChange,
  onNext,
  onBack





}: {value: string;onChange: (v: string) => void;onNext: () => void;onBack: () => void;}) {
  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator((text) => {
    const match = industries.find((ind) =>
    ind.voice.some((v) => text.toLowerCase().includes(v))
    );
    if (match) {
      onChange(match.key);
      setTimeout(onNext, 600);
    }
  });
  const handleSelect = (key: string) => {
    onChange(key);
    setTimeout(onNext, 400);
  };
  const handleMic = () => {
    if (voiceState === 'idle') startListening();else
    if (voiceState === 'listening') stopListening('warehousing');
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
          Question 1 of 6
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          What industry are you in?
        </h2>
        <p className="text-sm text-slate-400">
          Your AI executives will be pre-trained for your vertical.
        </p>
      </div>

      {/* Back / Continue row */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 border border-slate-700/50 hover:text-white hover:border-slate-600 transition-all">
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value &&
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-400 hover:to-amber-400 transition-all">
            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
      </div>

      {/* Voice input */}
      <div className="flex flex-col items-center gap-3 py-2">
        <MicButton voiceState={voiceState} onClick={handleMic} size="sm" />
        <VoiceStatusLabel state={voiceState} transcript={transcript} />
        {voiceState === 'listening' &&
        <p className="text-xs text-slate-500">
            Say your industry — e.g.{' '}
            <span className="text-orange-400">"warehousing"</span> or{' '}
            <span className="text-orange-400">"medical"</span>
          </p>
        }
      </div>

      {/* Industry grid */}
      <div className="max-w-2xl mx-auto w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {industries.map((ind, i) => {
          const Icon = ind.icon;
          const isSelected = value === ind.key;
          return (
            <motion.button
              key={ind.key}
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
              whileTap={{
                scale: 0.97
              }}
              onClick={() => handleSelect(ind.key)}
              className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${isSelected ? `bg-gradient-to-br ${ind.color} border-transparent shadow-lg` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

              {isSelected &&
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                className="absolute top-2 right-2 w-5 h-5 bg-white/30 rounded-full flex items-center justify-center">

                  <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                </motion.div>
              }
              <Icon
                className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-slate-400'}`} />

              <span
                className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>

                {ind.label}
              </span>
            </motion.button>);

        })}
      </div>
    </div>);

}
// ─── Step 3: Team Size ─────────────────────────────────────────────────────────
function StepTeamSize({
  value,
  onChange,
  onNext,
  onBack





}: {value: string;onChange: (v: string) => void;onNext: () => void;onBack: () => void;}) {
  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator((text) => {
    const match = teamSizes.find((s) =>
    s.voice.some((v) => text.toLowerCase().includes(v))
    );
    if (match) {
      onChange(match.key);
      setTimeout(onNext, 600);
    }
  });
  const handleSelect = (key: string) => {
    onChange(key);
    setTimeout(onNext, 400);
  };
  const handleMic = () => {
    if (voiceState === 'idle') startListening();else
    if (voiceState === 'listening') stopListening('small');
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
          Question 2 of 6
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          How many people are on your team?
        </h2>
        <p className="text-sm text-slate-400">
          This helps calibrate your AI executives' workload and priorities.
        </p>
      </div>

      {/* Back / Continue row */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 border border-slate-700/50 hover:text-white hover:border-slate-600 transition-all">
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value &&
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-400 hover:to-amber-400 transition-all">
            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
      </div>

      <div className="flex flex-col items-center gap-3 py-2">
        <MicButton voiceState={voiceState} onClick={handleMic} size="sm" />
        <VoiceStatusLabel state={voiceState} transcript={transcript} />
        {voiceState === 'listening' &&
        <p className="text-xs text-slate-500">
            Say a number — e.g.{' '}
            <span className="text-orange-400">"twenty"</span> or{' '}
            <span className="text-orange-400">"just me"</span>
          </p>
        }
      </div>

      <div className="max-w-2xl mx-auto w-full grid grid-cols-1 gap-2">
        {teamSizes.map((size, i) => {
          const isSelected = value === size.key;
          return (
            <motion.button
              key={size.key}
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: i * 0.07
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() => handleSelect(size.key)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${isSelected ? 'bg-orange-500/15 border-orange-500/60 shadow-md' : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? 'bg-orange-500/30' : 'bg-slate-800'}`}>

                  <UsersIcon
                    className={`w-5 h-5 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />

                </div>
                <div className="text-left">
                  <p
                    className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>

                    {size.label}
                  </p>
                  <p className="text-xs text-slate-500">{size.sub} employees</p>
                </div>
              </div>
              {isSelected &&
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}>

                  <CheckCircleIcon className="w-5 h-5 text-orange-400" />
                </motion.div>
              }
            </motion.button>);

        })}
      </div>

    </div>);

}
// ─── Org structure type per industry ──────────────────────────────────────────
const ORG_TYPE: Record<string, { label: string; description: string; color: string }> = {
  warehousing:  { label: 'Operations-Led',       description: 'COO-heavy with strong finance & workforce layer',    color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  trades:       { label: 'Field-Ops Flat',        description: 'Owner-operator structure with sales & field focus',  color: 'text-orange-400 border-orange-500/30 bg-orange-500/10' },
  logistics:    { label: 'Network Matrix',        description: 'Ops + tech + data triangle for route intelligence',  color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
  construction: { label: 'Project Hierarchy',     description: 'Legal-heavy ops with finance & site command chain',  color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  medical:      { label: 'Compliance-First',      description: 'HIPAA & clinical layer over patient ops & billing',  color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' },
  financial:    { label: 'Risk & Data Matrix',    description: 'Regulatory + data intelligence core with AUM ops',   color: 'text-sky-400 border-sky-500/30 bg-sky-500/10' },
  technology:   { label: 'Product-Led Growth',     description: 'CTO + CPO + CDO triad drives the entire org',         color: 'text-violet-400 border-violet-500/30 bg-violet-500/10' },
  default:      { label: 'Functional Hierarchy',  description: 'Balanced structure across all core functions',       color: 'text-slate-400 border-slate-500/30 bg-slate-500/10' },
};

// ─── Inline Org Tree Preview (used in StepExecutives) ─────────────────────────
const PREVIEW_META: Record<string, { label: string; color: string; initial: string }> = {
  ceo:     { label: 'CEO',  color: 'from-amber-400 to-amber-600',   initial: 'A' },
  cfo:     { label: 'CFO',  color: 'from-blue-400 to-blue-600',     initial: 'F' },
  coo:     { label: 'COO',  color: 'from-green-400 to-green-600',   initial: 'O' },
  cmo:     { label: 'CMO',  color: 'from-pink-400 to-pink-600',     initial: 'M' },
  cto:     { label: 'CTO',  color: 'from-purple-400 to-purple-600', initial: 'T' },
  clo:     { label: 'CLO',  color: 'from-cyan-400 to-cyan-600',     initial: 'L' },
  chro:    { label: 'CHRO', color: 'from-rose-400 to-rose-600',     initial: 'H' },
  vpsales: { label: 'VPS',  color: 'from-orange-400 to-orange-600', initial: 'S' },
  cro:     { label: 'CRO',  color: 'from-red-400 to-rose-500',      initial: 'R' },
  cpo:     { label: 'CPO',  color: 'from-indigo-400 to-violet-600', initial: 'N' },
  cdo:     { label: 'CDO',  color: 'from-sky-400 to-cyan-600',      initial: 'I' },
  ciso:    { label: 'CISO', color: 'from-slate-400 to-slate-600',   initial: 'V' },
  cso:     { label: 'CSO',  color: 'from-yellow-400 to-yellow-600', initial: 'E' },
  cco:     { label: 'CCO',  color: 'from-teal-400 to-emerald-600',  initial: 'C' },
};

function OrgNode({
  id, index, active, isRequired, onToggle, scored
}: {
  id: string; index: number; active: boolean; isRequired?: boolean;
  onToggle?: (id: string) => void;
  scored?: ScoredExec[];
}) {
  const m = PREVIEW_META[id];
  const info = scored?.find(e => e.id === id);
  if (!m) return null;
  const clickable = !isRequired && !!onToggle;
  return (
    <div
      className="flex flex-col items-center gap-1 group/node"
      style={{ animation: `apex-node-drop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.1 + index * 0.07}s both` }}
    >
      <button
        onClick={() => clickable && onToggle!(id)}
        disabled={isRequired}
        title={info ? `${info.role} · ${info.name} · ${info.description}` : m.label}
        className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center border-2 shadow-lg transition-all duration-200 ${
          isRequired
            ? `bg-gradient-to-br ${m.color} border-amber-300/40 cursor-default`
            : active
            ? `bg-gradient-to-br ${m.color} border-white/20 hover:scale-110 hover:shadow-xl cursor-pointer`
            : 'bg-slate-800/60 border-slate-700/30 opacity-35 hover:opacity-60 cursor-pointer'
        }`}
      >
        <span className="text-white font-black text-xs sm:text-sm md:text-base lg:text-lg">{m.initial}</span>
        {isRequired && (
          <span className="absolute -top-1 -right-1 w-3 h-3 lg:w-3.5 lg:h-3.5 bg-amber-500 rounded-full border border-slate-900" />
        )}
        {!isRequired && active && (
          <span className="absolute -top-1 -right-1 w-3 h-3 lg:w-3.5 lg:h-3.5 bg-green-500 rounded-full border border-slate-900" />
        )}
      </button>
      <p className={`text-[9px] sm:text-[10px] lg:text-xs font-bold leading-none text-center transition-colors duration-200 ${
        active || isRequired ? 'text-slate-300' : 'text-slate-600'
      }`}>{m.label}</p>
      {info && (
        <p className={`text-[8px] sm:text-[9px] leading-none text-center transition-colors duration-200 max-w-[52px] lg:max-w-[72px] truncate ${
          active || isRequired ? 'text-slate-500' : 'text-slate-700'
        }`}>{info.name}</p>
      )}
    </div>
  );
}

function OrgTreePreview({
  selectedIds, allExecs, mountKey, onToggle, industry
}: {
  selectedIds: string[];
  allExecs: ScoredExec[];
  mountKey: number;
  onToggle: (id: string) => void;
  industry: string;
}) {
  const recommendedExecs = allExecs.filter(e => e.id !== 'ceo' && e.tier === 'recommended');
  const optionalExecs    = allExecs.filter(e => e.id !== 'ceo' && e.tier === 'optional');
  const activeCount = selectedIds.filter(id => id !== 'ceo').length;
  const orgType = ORG_TYPE[industry] ?? ORG_TYPE.default;

  // Shared node renderer for a row of execs
  const NodeRow = ({ execs, rowOffset }: { execs: ScoredExec[]; rowOffset: number }) => (
    <div className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 md:gap-x-8 lg:gap-x-12 gap-y-4">
      {execs.map((e, i) => (
        <OrgNode
          key={`${mountKey}-${e.id}`}
          id={e.id} index={rowOffset + i + 1}
          active={selectedIds.includes(e.id)}
          onToggle={onToggle}
          scored={allExecs}
        />
      ))}
    </div>
  );

  return (
    <div key={mountKey} className="bg-slate-950/80 border border-slate-700/40 rounded-2xl p-5 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Your AI Org Structure</p>
        <p className="text-[10px] text-slate-500">
          <span className="text-white font-bold">{activeCount + 1}</span> active · tap to toggle
        </p>
      </div>
      {/* Org type badge */}
      <div className="flex items-center gap-2 mb-5">
        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold ${orgType.color}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
          {orgType.label}
        </span>
        <span className="text-[9px] text-slate-600">{orgType.description}</span>
      </div>

      {/* Tree */}
      <div className="flex flex-col items-center gap-0">
        {/* CEO */}
        <OrgNode id="ceo" index={0} active={true} isRequired={true} scored={allExecs} />

        {/* Stem → recommended row */}
        {recommendedExecs.length > 0 && (
          <>
            <div className="w-px bg-slate-600" style={{ height: 14, animation: 'apex-stem-grow 0.22s 0.55s ease-out both', opacity: 0 }} />
            <div className="w-full border-t border-slate-700/60" style={{ animation: 'apex-bar-grow 0.3s 0.68s ease-out both', opacity: 0 }} />
            <div className="w-px bg-slate-600" style={{ height: 10, animation: 'apex-stem-grow 0.18s 0.78s ease-out both', opacity: 0 }} />
            {/* Recommended tier label */}
            <p className="text-[8px] font-bold text-orange-400/70 uppercase tracking-widest mb-2"
               style={{ animation: 'apex-fade-up 0.2s 0.85s ease-out both', opacity: 0 }}>
              Core
            </p>
            <NodeRow execs={recommendedExecs} rowOffset={0} />
          </>
        )}

        {/* Stem → optional row */}
        {optionalExecs.length > 0 && (
          <>
            <div className="w-px bg-slate-600 mt-3" style={{ height: 14, animation: `apex-stem-grow 0.18s ${0.9 + recommendedExecs.length * 0.04}s ease-out both`, opacity: 0 }} />
            <div className="w-3/4 border-t border-dashed border-slate-700/40" style={{ animation: `apex-bar-grow 0.3s ${0.95 + recommendedExecs.length * 0.04}s ease-out both`, opacity: 0 }} />
            <div className="w-px bg-slate-600" style={{ height: 10, animation: `apex-stem-grow 0.18s ${1.0 + recommendedExecs.length * 0.04}s ease-out both`, opacity: 0 }} />
            {/* Optional tier label */}
            <p className="text-[8px] font-bold text-slate-500/70 uppercase tracking-widest mb-2"
               style={{ animation: `apex-fade-up 0.2s ${1.05 + recommendedExecs.length * 0.04}s ease-out both`, opacity: 0 }}>
              Optional
            </p>
            <NodeRow execs={optionalExecs} rowOffset={recommendedExecs.length} />
          </>
        )}
      </div>

      <p className="text-[9px] text-slate-600 text-center mt-5">🟡 Required &nbsp;·&nbsp; 🟢 Active &nbsp;·&nbsp; Grey = tap to add</p>
    </div>
  );
}

// ─── Step 4: Executives ────────────────────────────────────────────────────────
// ── Module-scope ExecCardItem so Framer Motion retains component identity ──────
function ExecCardItem({ exec, i, selected, onToggle }: {
  exec: ScoredExec; i: number; selected: boolean; onToggle: (id: string) => void;
}) {
  const isRequired = exec.id === 'ceo';
  return (
    <button
      onClick={() => onToggle(exec.id)}
      title={exec.description}
      style={{animationDelay:`${i * 0.05}s`}}
      className={`apex-pop-in relative flex flex-col items-start gap-1.5 p-3 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.96] text-left w-full ${
        isRequired
          ? `${exec.bg} ${exec.border} ring-1 ring-amber-500/30`
          : selected
          ? `${exec.bg} ${exec.border}`
          : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'
      }`}
    >
      <AnimatePresence>
        {(selected || isRequired) && (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
          >
            <CheckCircleIcon className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className={`w-9 h-9 bg-gradient-to-br ${exec.color} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
        <motion.span
          className="text-white font-black text-xs"
          animate={{ scale: selected || isRequired ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >{exec.name[0]}</motion.span>
      </div>
      <div>
        <p className={`text-xs font-black leading-none ${selected || isRequired ? exec.text : 'text-slate-500'}`}>{exec.role}</p>
        <p className={`text-[10px] leading-tight mt-0.5 ${selected || isRequired ? 'text-slate-300' : 'text-slate-600'}`}>{exec.name}</p>
        <p className={`text-[9px] leading-tight mt-0.5 ${selected || isRequired ? 'text-slate-400' : 'text-slate-700'}`}>{exec.reason}</p>
      </div>
      {isRequired && <span className="text-[8px] font-bold text-amber-500 uppercase tracking-wide">Required</span>}
    </button>
  );
}

function StepExecutives({
  value,
  onChange,
  onNext,
  onBack,
  industry,
  teamSize,
  mountKey,
}: {value: string[];onChange: (v: string[]) => void;onNext: () => void;onBack: () => void; industry: string; teamSize: string; mountKey: number;}) {
  const scored = computeRecommended(industry, teamSize);
  const recommended = scored.filter((e) => e.tier === 'recommended');
  const optional    = scored.filter((e) => e.tier === 'optional');
  const advanced    = scored.filter((e) => e.tier === 'advanced');

  // Seed recommended roles on first render if value is still the bare default
  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current && recommended.length > 0) {
      seeded.current = true;
      const defaultIds = new Set(['ceo', 'cfo', 'coo', 'cmo']);
      const currentIsDefault =
        value.length <= 4 && value.every((id) => defaultIds.has(id));
      if (currentIsDefault) {
        onChange(Array.from(new Set(['ceo', ...recommended.map((e) => e.id)])));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator((text) => {
    const lower = text.toLowerCase();
    if (lower.includes('all')) {
      onChange(scored.map((e) => e.id));
    } else {
      const matched = scored.filter(
        (e) =>
        lower.includes(e.role.toLowerCase()) ||
        lower.includes(e.name.toLowerCase())
      );
      if (matched.length > 0) {
        const newSet = new Set([...value, ...matched.map((e) => e.id)]);
        onChange(Array.from(newSet));
      }
    }
  });
  const toggle = (id: string) => {
    if (id === 'ceo') return; // CEO always required
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
  };
  const selectRecommended = () => onChange(Array.from(new Set(['ceo', ...recommended.map((e) => e.id)])));
  const selectAll = () => onChange(scored.map((e) => e.id));
  const handleMic = () => {
    if (voiceState === 'idle') startListening(); else
    if (voiceState === 'listening') stopListening('add the CLO and CTO');
  };

  // ExecCard is defined at module scope (below) to preserve Framer Motion identity

  return (
    <div className="space-y-5">
      {/* ── Constrained header section ── */}
      <div className="max-w-2xl mx-auto w-full space-y-5">
        <div className="text-center">
          <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
            Question 3 of 6
          </p>
          <h2 className="text-2xl font-black text-white mb-2">
            Build your AI executive team
          </h2>
          <p className="text-sm text-slate-400">
            Tap any role to add or remove it from your org.
          </p>
        </div>

        {/* Insight banner */}
        {industry && (
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 flex items-start gap-2">
            <SparklesIcon className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-orange-300">
                {recommended.length} roles recommended for {industry}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {teamSize && <><span className="text-white font-semibold capitalize">{teamSize}</span> team · </>}
                Grey nodes are excluded · tap to toggle
              </p>
            </div>
          </div>
        )}

        {/* Mic */}
        <div className="flex flex-col items-center gap-2">
          <MicButton voiceState={voiceState} onClick={handleMic} size="sm" />
          <VoiceStatusLabel state={voiceState} transcript={transcript} />
          {voiceState === 'listening' &&
            <p className="text-xs text-slate-500">Say <span className="text-orange-400">&quot;add the CLO&quot;</span> or <span className="text-orange-400">&quot;I want all of them&quot;</span></p>
          }
        </div>

        {/* Back / Continue + quick-select row */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 border border-slate-700/50 hover:text-white hover:border-slate-600 transition-all">
            <ChevronLeftIcon className="w-4 h-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            <p className="text-xs text-slate-500">{value.length} of {scored.length} active</p>
            <button onClick={selectRecommended} className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors">Recommended</button>
            <button onClick={selectAll} className="text-xs text-slate-500 hover:text-white transition-colors">All</button>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-400 hover:to-amber-400 transition-all">
            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* ── Full-width org tree ── */}
      <OrgTreePreview
        selectedIds={value}
        allExecs={scored}
        mountKey={mountKey}
        onToggle={toggle}
        industry={industry}
      />

      {/* Pricing footer */}
      <div className="max-w-2xl mx-auto w-full bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-center">
        <p className="text-xs text-slate-400">
          <span className="text-white font-bold">{value.length} executives</span>{' '}active ·{' '}
          <span className="text-green-400 font-bold">${(value.length * 499).toLocaleString()}/mo</span>{' '}
          <span className="text-slate-600">(or $1,999/mo Growth plan)</span>
        </p>
      </div>
    </div>);

}
// ─── Step 5: Approval Threshold ────────────────────────────────────────────────
function StepApproval({
  value,
  onChange,
  onNext,
  onBack





}: {value: string;onChange: (v: string) => void;onNext: () => void;onBack: () => void;}) {
  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator((text) => {
    const match = approvalLimits.find((a) =>
    a.voice.some((v) => text.toLowerCase().includes(v))
    );
    if (match) {
      onChange(match.key);
      setTimeout(onNext, 600);
    }
  });
  const handleSelect = (key: string) => {
    onChange(key);
    setTimeout(onNext, 400);
  };
  const handleMic = () => {
    if (voiceState === 'idle') startListening();else
    if (voiceState === 'listening') stopListening('one thousand dollars');
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
          Question 4 of 6
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          Set your auto-approval limit
        </h2>
        <p className="text-sm text-slate-400">
          Your AI team can approve decisions up to this amount without asking
          you first.
        </p>
      </div>

      {/* Back / Continue row */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 border border-slate-700/50 hover:text-white hover:border-slate-600 transition-all">
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value &&
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-400 hover:to-amber-400 transition-all">
            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
      </div>

      <div className="flex flex-col items-center gap-3 py-2">
        <MicButton voiceState={voiceState} onClick={handleMic} size="sm" />
        <VoiceStatusLabel state={voiceState} transcript={transcript} />
        {voiceState === 'listening' &&
        <p className="text-xs text-slate-500">
            Say an amount — e.g.{' '}
            <span className="text-orange-400">"one thousand dollars"</span>
          </p>
        }
      </div>

      <div className="max-w-2xl mx-auto w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
        {approvalLimits.map((limit, i) => {
          const isSelected = value === limit.key;
          return (
            <motion.button
              key={limit.key}
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
              whileTap={{
                scale: 0.97
              }}
              onClick={() => handleSelect(limit.key)}
              className={`flex flex-col items-center gap-1 p-4 rounded-2xl border-2 transition-all ${isSelected ? 'bg-orange-500/15 border-orange-500/60 shadow-md' : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

              <DollarSignIcon
                className={`w-5 h-5 ${isSelected ? 'text-orange-400' : 'text-slate-500'}`} />

              <span
                className={`text-lg font-black ${isSelected ? 'text-white' : 'text-slate-300'}`}>

                {limit.label}
              </span>
              {isSelected &&
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}>

                  <CheckCircleIcon className="w-4 h-4 text-orange-400" />
                </motion.div>
              }
            </motion.button>);

        })}
      </div>

      <div className="max-w-2xl mx-auto w-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="text-blue-400 font-bold">Tip:</span> You can always
          override any decision. Critical decisions (above your limit) will
          always require your approval.
        </p>
      </div>
    </div>);

}
// ─── Step 6: Integrations ──────────────────────────────────────────────────────
function StepIntegrations({
  value,
  onChange,
  onNext,
  onBack





}: {value: string[];onChange: (v: string[]) => void;onNext: () => void;onBack: () => void;}) {
  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator((text) => {
    const lower = text.toLowerCase();
    const matched = integrationOptions.filter(
      (int) =>
      lower.includes(int.key) || lower.includes(int.label.toLowerCase())
    );
    if (matched.length > 0) {
      const newSet = new Set([...value, ...matched.map((i) => i.key)]);
      onChange(Array.from(newSet));
    }
  });
  const toggle = (key: string) => {
    onChange(
      value.includes(key) ? value.filter((v) => v !== key) : [...value, key]
    );
  };
  const handleMic = () => {
    if (voiceState === 'idle') startListening();else
    if (voiceState === 'listening')
    stopListening('connect QuickBooks and Slack');
  };
  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
          Question 5 of 6
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          Connect your business tools
        </h2>
        <p className="text-sm text-slate-400">
          Your AI executives will work directly inside these platforms.
        </p>
      </div>

      {/* Back / Continue row */}
      <div className="max-w-2xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-400 bg-slate-800 border border-slate-700/50 hover:text-white hover:border-slate-600 transition-all">
          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-slate-300 bg-slate-800/60 border border-slate-700/40 transition-all">
            <SkipForwardIcon className="w-3.5 h-3.5" /> Skip
          </button>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onNext}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-400 hover:to-amber-400 transition-all">
            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <MicButton voiceState={voiceState} onClick={handleMic} size="sm" />
        <VoiceStatusLabel state={voiceState} transcript={transcript} />
        {voiceState === 'listening' &&
        <p className="text-xs text-slate-500">
            Say <span className="text-orange-400">"connect QuickBooks"</span> or{' '}
            <span className="text-orange-400">
              "connect Slack and Salesforce"
            </span>
          </p>
        }
      </div>

      <div className="max-w-2xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
        {integrationOptions.map((int, i) => {
          const isSelected = value.includes(int.key);
          return (
            <motion.button
              key={int.key}
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
              whileTap={{
                scale: 0.98
              }}
              onClick={() => toggle(int.key)}
              className={`flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${isSelected ? `${int.bg} ${int.border} shadow-md` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600'}`}>

              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${isSelected ? int.bg : 'bg-slate-800'}`}>

                {int.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>

                  {int.label}
                </p>
                <p className="text-xs text-slate-500 truncate">{int.sub}</p>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${isSelected ? 'bg-green-500 border-green-500' : 'border-slate-600'}`}>

                {isSelected &&
                <CheckCircleIcon className="w-3.5 h-3.5 text-white" />
                }
              </div>
            </motion.button>);

        })}
      </div>

    </div>);

}
// ─── Step 7: Launch ────────────────────────────────────────────────────────────
function StepLaunch({
  data,
  onLaunch,
  onBack




}: {data: SetupData;onLaunch: () => void;onBack: () => void;}) {
  const [launched, setLaunched] = useState(false);
  const selectedExecs = execOptions.filter((e) =>
  data.executives.includes(e.id)
  );
  const selectedIndustry = industries.find((i) => i.key === data.industry);
  const selectedSize = teamSizes.find((s) => s.key === data.teamSize);
  const selectedLimit = approvalLimits.find((a) => a.key === data.approvalLimit);
  const selectedIntegrations = integrationOptions.filter((i) =>
  data.integrations.includes(i.key)
  );
  const handleLaunch = async () => {
    setLaunched(true);
    // Persist to DynamoDB via local-api — fire-and-forget with 3s timeout
    const setupPayload = {
      companyName: data.companyName,
      industry: data.industry,
      teamSize: data.teamSize,
      executives: data.executives,
      allRoles: data.executives,   // stable full roster — never shrinks when roles are toggled off
      approvalLimit: data.approvalLimit,
      integrations: data.integrations,
      launchedAt: new Date().toISOString(),
    };
    // Save to localStorage immediately so org chart can use it offline
    try { localStorage.setItem('apex:company-setup', JSON.stringify(setupPayload)); } catch {}
    // Rebuild the agent store to only the selected exec roles
    localAgentStore.applySetup(data.executives);
    // Best-effort DynamoDB save with 3s timeout — never blocks launch
    const apiBase = (import.meta as any).env?.VITE_API_URL ?? '';
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3000);
    fetch(`${apiBase}/local/company-setup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(setupPayload),
      signal: controller.signal,
    }).catch(() => {}).finally(() => clearTimeout(timer));
    setTimeout(onLaunch, 2200);
  };
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs font-bold text-green-400 uppercase tracking-widest mb-2">
          Ready to Launch
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          Your AI C-Suite is configured
        </h2>
        <p className="text-sm text-slate-400">
          Review your setup, then launch your team.
        </p>
      </div>

      {/* Executive reveal */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Your AI Executive Team
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedExecs.map((exec, i) =>
          <motion.div
            key={exec.id}
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 10
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.1,
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            className={`flex items-center gap-2 ${exec.bg} border ${exec.border} rounded-xl px-3 py-2`}>

              <div
              className={`w-7 h-7 bg-gradient-to-br ${exec.color} rounded-lg flex items-center justify-center flex-shrink-0`}>

                <span className="text-white font-black text-xs">
                  {exec.name[0]}
                </span>
              </div>
              <div>
                <p className={`text-xs font-black ${exec.text}`}>{exec.role}</p>
                <p className="text-[10px] text-slate-400">{exec.name}</p>
              </div>
              <motion.div
              initial={{
                scale: 0
              }}
              animate={{
                scale: 1
              }}
              transition={{
                delay: i * 0.1 + 0.3
              }}
              className="w-1.5 h-1.5 bg-green-400 rounded-full" />

            </motion.div>
          )}
        </div>
      </div>

      {/* Mini Org Chart */}
      {(() => {
        const industry = data.industry || 'default';
        const execIds  = data.executives.filter(r => r !== 'ceo');

        const LAUNCH_WORKERS: Record<string, Record<string, {role:string;name:string;title:string;wc:string}[]>> = {
          coo:  {warehousing:[{role:'WM',name:'Atlas',title:'Warehouse Mgr',wc:'from-green-500 to-green-700'},{role:'DSP',name:'Nova',title:'Dispatcher',wc:'from-green-500 to-green-700'}],trades:[{role:'DSP',name:'Nova',title:'Dispatcher',wc:'from-green-500 to-green-700'},{role:'SCH',name:'Atlas',title:'Scheduler',wc:'from-green-500 to-green-700'}],logistics:[{role:'LDP',name:'Atlas',title:'Load Planner',wc:'from-green-500 to-green-700'},{role:'DSP',name:'Nova',title:'Dispatcher',wc:'from-green-500 to-green-700'}],construction:[{role:'PM',name:'Atlas',title:'Project Mgr',wc:'from-green-500 to-green-700'},{role:'SUP',name:'Bolt',title:'Site Super',wc:'from-green-500 to-green-700'}],medical:[{role:'SCH',name:'Atlas',title:'Scheduler',wc:'from-green-500 to-green-700'},{role:'FRD',name:'Nova',title:'Front Desk',wc:'from-green-500 to-green-700'}],financial:[{role:'OPS',name:'Atlas',title:'Operations',wc:'from-green-500 to-green-700'}],default:[{role:'OPS',name:'Atlas',title:'Operations',wc:'from-green-500 to-green-700'}]},
          cfo:  {warehousing:[{role:'INV',name:'Clio',title:'Inventory',wc:'from-blue-500 to-blue-700'},{role:'AP',name:'Finn',title:'Finance',wc:'from-blue-500 to-blue-700'}],trades:[{role:'EST',name:'Clio',title:'Estimator',wc:'from-blue-500 to-blue-700'},{role:'INV',name:'Finn',title:'Invoicing',wc:'from-blue-500 to-blue-700'}],logistics:[{role:'FIN',name:'Clio',title:'Fleet Finance',wc:'from-blue-500 to-blue-700'}],construction:[{role:'EST',name:'Clio',title:'Estimator',wc:'from-blue-500 to-blue-700'},{role:'ACC',name:'Finn',title:'Accountant',wc:'from-blue-500 to-blue-700'}],medical:[{role:'BIL',name:'Clio',title:'Biller',wc:'from-blue-500 to-blue-700'},{role:'RCM',name:'Finn',title:'Revenue Cycle',wc:'from-blue-500 to-blue-700'}],financial:[{role:'ANL',name:'Clio',title:'Analyst',wc:'from-blue-500 to-blue-700'}],default:[{role:'FIN',name:'Clio',title:'Finance',wc:'from-blue-500 to-blue-700'}]},
          clo:  {medical:[{role:'HIP',name:'Lex',title:'HIPAA',wc:'from-cyan-500 to-cyan-700'}],financial:[{role:'CMP',name:'Lex',title:'Compliance',wc:'from-cyan-500 to-cyan-700'}],construction:[{role:'SAF',name:'Lex',title:'Safety Mgr',wc:'from-cyan-500 to-cyan-700'}],default:[{role:'CMP',name:'Lex',title:'Compliance',wc:'from-cyan-500 to-cyan-700'}]},
          cmo:  {default:[{role:'MKT',name:'Luna',title:'Marketing',wc:'from-pink-500 to-pink-700'}],technology:[{role:'PLG',name:'Luna',title:'PLG Marketer',wc:'from-pink-500 to-pink-700'}],trades:[{role:'CX',name:'Luna',title:'Customer Success',wc:'from-pink-500 to-pink-700'}]},
          cso:  {default:[{role:'AM',name:'Sage',title:'Account Mgr',wc:'from-orange-500 to-orange-700'}],technology:[{role:'AE',name:'Sage',title:'Account Exec',wc:'from-orange-500 to-orange-700'},{role:'SDR',name:'Rex',title:'SDR',wc:'from-orange-500 to-orange-700'}]},
          chro: {default:[{role:'HR',name:'Hana',title:'HR Coordinator',wc:'from-rose-500 to-rose-700'}],technology:[{role:'RCR',name:'Hana',title:'Tech Recruiter',wc:'from-rose-500 to-rose-700'}]},
          cto:  {default:[{role:'DEV',name:'Theo',title:'Developer',wc:'from-purple-500 to-purple-700'}],technology:[{role:'ENG',name:'Theo',title:'Eng Lead',wc:'from-purple-500 to-purple-700'},{role:'QA',name:'Bolt',title:'QA Auto',wc:'from-purple-500 to-purple-700'}]},
          cro:  {default:[{role:'REV',name:'Rex',title:'Revenue Ops',wc:'from-red-500 to-red-700'}],technology:[{role:'ROP',name:'Rex',title:'RevOps',wc:'from-red-500 to-red-700'}]},
          cpo:  {default:[{role:'PM',name:'Nova',title:'Product Mgr',wc:'from-violet-500 to-violet-700'}],technology:[{role:'PM',name:'Nova',title:'Product Mgr',wc:'from-violet-500 to-violet-700'},{role:'UX',name:'Iris',title:'UX Designer',wc:'from-violet-500 to-violet-700'}]},
          cdo:  {default:[{role:'DA',name:'Iris',title:'Data Analyst',wc:'from-sky-500 to-sky-700'}],technology:[{role:'DA',name:'Iris',title:'Data Analyst',wc:'from-sky-500 to-sky-700'},{role:'ML',name:'Nova',title:'ML Eng',wc:'from-sky-500 to-sky-700'}]},
          cco:  {default:[{role:'CX',name:'Cleo',title:'CX Specialist',wc:'from-teal-500 to-emerald-700'}],technology:[{role:'CSM',name:'Cleo',title:'CS Manager',wc:'from-teal-500 to-emerald-700'}]},
          ciso: {default:[{role:'SEC',name:'Volt',title:'Security',wc:'from-slate-500 to-slate-700'}],technology:[{role:'SEC',name:'Volt',title:'Security',wc:'from-slate-500 to-slate-700'},{role:'CMP',name:'Lex',title:'Compliance',wc:'from-slate-500 to-slate-700'}]},
        };
        const getW = (role: string) => {
          const map = LAUNCH_WORKERS[role];
          if (!map) return [];
          return (map[industry] ?? map['default'] ?? []).slice(0,2);
        };

        const LMETA: Record<string,{label:string;color:string;initial:string;name:string}> = {
          ceo:{label:'CEO',color:'from-amber-400 to-amber-600',initial:'A',name:'Aria'},
          cfo:{label:'CFO',color:'from-blue-400 to-blue-600',initial:'F',name:'Felix'},
          coo:{label:'COO',color:'from-green-400 to-green-600',initial:'O',name:'Orion'},
          cmo:{label:'CMO',color:'from-pink-400 to-pink-600',initial:'M',name:'Maya'},
          cto:{label:'CTO',color:'from-purple-400 to-purple-600',initial:'T',name:'Theo'},
          clo:{label:'CLO',color:'from-cyan-400 to-cyan-600',initial:'L',name:'Lex'},
          chro:{label:'CHRO',color:'from-rose-400 to-rose-600',initial:'H',name:'Hana'},
          cso:{label:'CSO',color:'from-orange-400 to-orange-600',initial:'S',name:'Sage'},
          cro:{label:'CRO',color:'from-red-400 to-rose-600',initial:'R',name:'Rex'},
          cpo:{label:'CPO',color:'from-indigo-400 to-violet-600',initial:'N',name:'Nova'},
          cdo:{label:'CDO',color:'from-sky-400 to-cyan-600',initial:'I',name:'Iris'},
          ciso:{label:'CISO',color:'from-slate-400 to-gray-600',initial:'V',name:'Volt'},
          cco:{label:'CCO',color:'from-teal-400 to-emerald-600',initial:'C',name:'Cleo'},
        };

        return (
          <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 overflow-x-auto">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Org Chart</p>
            {/* CEO root */}
            <div className="flex flex-col items-center min-w-max mx-auto">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg border-2 border-white/20">
                <span className="text-white font-black text-base">A</span>
              </div>
              <p className="text-xs font-black text-white mt-1">CEO</p>
              <p className="text-[10px] text-slate-400">Aria</p>

              {/* connector to exec row */}
              {execIds.length > 0 && <div className="w-px h-6 bg-slate-600 mt-1" />}
              {execIds.length > 1 && (
                <div className="h-px bg-slate-600" style={{width: Math.max(execIds.length * 80, 80)}} />
              )}

              {/* Exec row */}
              <div className="flex gap-4 items-start justify-center">
                {execIds.map((role, ei) => {
                  const m = LMETA[role];
                  if (!m) return null;
                  const workers = getW(role);
                  return (
                    <div key={role} className="flex flex-col items-center">
                      <div className="w-px h-5 bg-slate-600" />
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${m.color} border-2 border-white/20 shadow flex items-center justify-center`}>
                        <span className="text-white font-black text-sm">{m.initial}</span>
                      </div>
                      <p className="text-[11px] font-black text-white mt-0.5">{m.label}</p>
                      <p className="text-[9px] text-slate-400">{m.name}</p>
                      {/* Workers */}
                      {workers.length > 0 && (
                        <div className="flex flex-col items-center mt-1">
                          <div className="w-px h-4 bg-slate-700" />
                          {workers.length > 1 && <div className="h-px bg-slate-700" style={{width: workers.length * 52}} />}
                          <div className="flex gap-1.5 items-start">
                            {workers.map((w, wi) => (
                              <div key={w.role+wi} className="flex flex-col items-center">
                                <div className="w-px h-3 bg-slate-700" />
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${w.wc} flex items-center justify-center border border-white/10`}>
                                  <span className="text-white text-[9px] font-black">{w.role.slice(0,3)}</span>
                                </div>
                                <p className="text-[8px] font-bold text-white mt-0.5 text-center">{w.role}</p>
                                <p className="text-[7px] text-slate-500 text-center">{w.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Config summary */}
      <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4 space-y-2.5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
          Configuration Summary
        </p>
        {[
        {
          label: 'Industry',
          value: selectedIndustry?.label || '—',
          icon: selectedIndustry?.icon
        },
        {
          label: 'Team Size',
          value: selectedSize ?
          `${selectedSize.label} (${selectedSize.sub})` :
          '—',
          icon: UsersIcon
        },
        {
          label: 'Auto-Approval Limit',
          value: selectedLimit?.label || '—',
          icon: DollarSignIcon
        },
        {
          label: 'Integrations',
          value:
          selectedIntegrations.length > 0 ?
          selectedIntegrations.map((i) => i.label).join(', ') :
          'None selected',
          icon: PlugIcon
        }].
        map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.label}
              className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0">

              {Icon &&
              <Icon className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
              }
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500">{row.label}</p>
                <p className="text-sm font-semibold text-white truncate">
                  {row.value}
                </p>
              </div>
              <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
            </div>);

        })}
      </div>

      {/* Blockchain note */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 flex items-start gap-2">
        <ShieldIcon className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-slate-400 leading-relaxed">
          All AI executive decisions will be{' '}
          <span className="text-green-400 font-bold">blockchain-verified</span>{' '}
          and logged to an immutable audit trail from day one.
        </p>
      </div>

      {/* Launch button */}
      <AnimatePresence mode="wait">
        {launched ?
        <motion.div
          key="launching"
          initial={{
            opacity: 0,
            scale: 0.9
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          className="flex flex-col items-center gap-3 py-4">

            <motion.div
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear'
            }}
            className="w-12 h-12 bg-orange-500/20 border-2 border-orange-500 rounded-full flex items-center justify-center">

              <ZapIcon className="w-6 h-6 text-orange-400" />
            </motion.div>
            <p className="text-white font-bold text-base">
              Launching your AI team...
            </p>
            <div className="flex gap-1">
              {selectedExecs.map((exec, i) =>
            <motion.div
              key={exec.id}
              initial={{
                opacity: 0,
                scale: 0
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: i * 0.15
              }}
              className={`w-2 h-2 rounded-full bg-gradient-to-br ${exec.color}`} />

            )}
            </div>
          </motion.div> :

        <motion.div key="ready" className="space-y-3">
            <motion.button
            whileTap={{
              scale: 0.97
            }}
            onClick={handleLaunch}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-lg py-4 rounded-2xl transition-all shadow-xl shadow-orange-500/25">

              <RocketIcon className="w-6 h-6" />
              Launch My AI Team
              <ZapIcon className="w-5 h-5" />
            </motion.button>
            <div className="flex items-center justify-center gap-2">
              <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">

                <ChevronLeftIcon className="w-4 h-4" /> Back
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
// ─── Main Component ────────────────────────────────────────────────────────────
export function ScreenSetup({ onComplete }: ScreenSetupProps) {
  const [step, setStep] = useState<SetupStep>(1);
  const [direction, setDirection] = useState(1);
  const [mountKey, setMountKey] = useState(0);
  const [data, setData] = useState<SetupData>({
    companyName: '',
    industry: '',
    teamSize: '',
    executives: ['ceo', 'cfo', 'coo', 'cmo'],
    approvalLimit: '',
    integrations: []
  });
  const goNext = () => {
    setDirection(1);
    setStep((s) => {
      const next = Math.min(s + 1, 7) as SetupStep;
      // Auto-populate recommended execs when advancing to step 4
      if (next === 4 && data.industry) {
        const recommended = computeRecommended(data.industry, data.teamSize)
          .filter((e) => e.tier === 'recommended')
          .map((e) => e.id);
        setData((d) => ({ ...d, executives: Array.from(new Set(['ceo', ...recommended])) }));
        setMountKey((k) => k + 1);
      }
      return next;
    });
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1) as SetupStep);
  };
  const TOTAL_STEPS = 7;
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '60%' : '-60%',
    }),
    center: {
      x: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-60%' : '60%',
    })
  };
  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-orange-400 to-amber-600 rounded-lg flex items-center justify-center">
            <ZapIcon className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-black text-white">APEX Setup</span>
        </div>
        {step > 1 && step < 7 &&
        <button
          onClick={() => onComplete?.()}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition-colors">

            <SkipForwardIcon className="w-3.5 h-3.5" /> Skip setup
          </button>
        }
      </div>

      {/* Progress */}
      <div className="max-w-2xl mx-auto w-full">
        <ProgressBar step={step} total={TOTAL_STEPS} />
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[480px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.22,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}>

            {step === 1 && <StepWelcome onNext={goNext} companyName={data.companyName} onCompanyName={(v) => setData((d) => ({ ...d, companyName: v }))} />}
            {step === 2 &&
            <StepIndustry
              value={data.industry}
              onChange={(v) =>
              setData((d) => ({
                ...d,
                industry: v
              }))
              }
              onNext={goNext}
              onBack={goBack} />

            }
            {step === 3 &&
            <StepTeamSize
              value={data.teamSize}
              onChange={(v) =>
              setData((d) => ({
                ...d,
                teamSize: v
              }))
              }
              onNext={goNext}
              onBack={goBack} />

            }
            {step === 4 &&
            <StepExecutives
              mountKey={mountKey}
              value={data.executives}
              onChange={(v) =>
              setData((d) => ({
                ...d,
                executives: v
              }))
              }
              onNext={goNext}
              onBack={goBack}
              industry={data.industry}
              teamSize={data.teamSize} />

            }
            {step === 5 &&
            <StepApproval
              value={data.approvalLimit}
              onChange={(v) =>
              setData((d) => ({
                ...d,
                approvalLimit: v
              }))
              }
              onNext={goNext}
              onBack={goBack} />

            }
            {step === 6 &&
            <StepIntegrations
              value={data.integrations}
              onChange={(v) =>
              setData((d) => ({
                ...d,
                integrations: v
              }))
              }
              onNext={goNext}
              onBack={goBack} />

            }
            {step === 7 &&
            <StepLaunch
              data={data}
              onLaunch={() => onComplete?.()}
              onBack={goBack} />

            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>);

}