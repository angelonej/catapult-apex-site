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
  SkipForwardIcon } from
'lucide-react';
// ─── Types ─────────────────────────────────────────────────────────────────────
type VoiceState = 'idle' | 'listening' | 'processing' | 'responding';
type SetupStep = 1 | 2 | 3 | 4 | 5 | 6 | 7;
interface SetupData {
  industry: string;
  teamSize: string;
  executives: string[];
  approvalLimit: string;
  integrations: string[];
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

const execOptions = [
{
  id: 'ceo',
  role: 'CEO',
  name: 'Aria',
  specialty: 'Strategy & Growth',
  color: 'from-amber-400 to-amber-600',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/40',
  text: 'text-amber-400',
  defaultOn: true
},
{
  id: 'cfo',
  role: 'CFO',
  name: 'Felix',
  specialty: 'Finance & Cash Flow',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/40',
  text: 'text-blue-400',
  defaultOn: true
},
{
  id: 'coo',
  role: 'COO',
  name: 'Orion',
  specialty: 'Operations & Logistics',
  color: 'from-green-400 to-green-600',
  bg: 'bg-green-500/20',
  border: 'border-green-500/40',
  text: 'text-green-400',
  defaultOn: true
},
{
  id: 'cmo',
  role: 'CMO',
  name: 'Maya',
  specialty: 'Marketing & Acquisition',
  color: 'from-pink-400 to-pink-600',
  bg: 'bg-pink-500/20',
  border: 'border-pink-500/40',
  text: 'text-pink-400',
  defaultOn: true
},
{
  id: 'cto',
  role: 'CTO',
  name: 'Theo',
  specialty: 'Tech & Automation',
  color: 'from-purple-400 to-purple-600',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/40',
  text: 'text-purple-400',
  defaultOn: false
},
{
  id: 'clo',
  role: 'CLO',
  name: 'Lex',
  specialty: 'Compliance & Risk',
  color: 'from-cyan-400 to-cyan-600',
  bg: 'bg-cyan-500/20',
  border: 'border-cyan-500/40',
  text: 'text-cyan-400',
  defaultOn: false
},
{
  id: 'chro',
  role: 'CHRO',
  name: 'Hana',
  specialty: 'HR & People Ops',
  color: 'from-rose-400 to-rose-600',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/40',
  text: 'text-rose-400',
  defaultOn: false
},
{
  id: 'cso',
  role: 'CSO',
  name: 'Sage',
  specialty: 'Sales & Revenue',
  color: 'from-orange-400 to-orange-600',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/40',
  text: 'text-orange-400',
  defaultOn: false
}];

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
function StepWelcome({ onNext }: {onNext: () => void;}) {
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">

          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value &&
        <motion.button
          initial={{
            opacity: 0,
            x: 10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          onClick={onNext}
          className="flex items-center gap-1.5 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">

            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
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

      <div className="grid grid-cols-1 gap-2">
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

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">

          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value &&
        <motion.button
          initial={{
            opacity: 0,
            x: 10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          onClick={onNext}
          className="flex items-center gap-1.5 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">

            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
      </div>
    </div>);

}
// ─── Step 4: Executives ────────────────────────────────────────────────────────
function StepExecutives({
  value,
  onChange,
  onNext,
  onBack





}: {value: string[];onChange: (v: string[]) => void;onNext: () => void;onBack: () => void;}) {
  const { voiceState, transcript, startListening, stopListening } =
  useVoiceSimulator((text) => {
    const lower = text.toLowerCase();
    if (lower.includes('all')) {
      onChange(execOptions.map((e) => e.id));
    } else {
      const matched = execOptions.filter(
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
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id]
    );
  };
  const selectAll = () => onChange(execOptions.map((e) => e.id));
  const handleMic = () => {
    if (voiceState === 'idle') startListening();else
    if (voiceState === 'listening') stopListening('add the CLO and CTO');
  };
  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
          Question 3 of 6
        </p>
        <h2 className="text-2xl font-black text-white mb-2">
          Build your AI executive team
        </h2>
        <p className="text-sm text-slate-400">
          Select the executives you want. You can always add more later.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3">
        <MicButton voiceState={voiceState} onClick={handleMic} size="sm" />
        <VoiceStatusLabel state={voiceState} transcript={transcript} />
        {voiceState === 'listening' &&
        <p className="text-xs text-slate-500">
            Say <span className="text-orange-400">"add the CLO"</span> or{' '}
            <span className="text-orange-400">"I want all of them"</span>
          </p>
        }
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          {value.length} of {execOptions.length} selected
        </p>
        <button
          onClick={selectAll}
          className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors">

          Select all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {execOptions.map((exec, i) => {
          const isSelected = value.includes(exec.id);
          return (
            <motion.button
              key={exec.id}
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: i * 0.05
              }}
              whileTap={{
                scale: 0.96
              }}
              onClick={() => toggle(exec.id)}
              className={`relative flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${isSelected ? `${exec.bg} ${exec.border}` : 'bg-slate-900 border-slate-700/50 hover:border-slate-600 opacity-60'}`}>

              {isSelected &&
              <motion.div
                initial={{
                  scale: 0
                }}
                animate={{
                  scale: 1
                }}
                className="absolute top-1.5 right-1.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">

                  <CheckCircleIcon className="w-3 h-3 text-white" />
                </motion.div>
              }
              <div
                className={`w-10 h-10 bg-gradient-to-br ${exec.color} rounded-xl flex items-center justify-center shadow-md`}>

                <span className="text-white font-black text-sm">
                  {exec.name[0]}
                </span>
              </div>
              <div className="text-center">
                <p
                  className={`text-xs font-black ${isSelected ? exec.text : 'text-slate-500'}`}>

                  {exec.role}
                </p>
                <p
                  className={`text-[10px] ${isSelected ? 'text-slate-300' : 'text-slate-600'} leading-tight`}>

                  {exec.name}
                </p>
              </div>
            </motion.button>);

        })}
      </div>

      {value.length > 0 &&
      <motion.div
        initial={{
          opacity: 0,
          y: 6
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className="bg-slate-900 border border-slate-700/50 rounded-xl p-3 text-center">

          <p className="text-xs text-slate-400">
            <span className="text-white font-bold">
              {value.length} executives
            </span>{' '}
            selected ·{' '}
            <span className="text-green-400 font-bold">
              ${(value.length * 499).toLocaleString()}/mo
            </span>{' '}
            <span className="text-slate-600">(or $1,999/mo Growth plan)</span>
          </p>
        </motion.div>
      }

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">

          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value.length > 0 &&
        <motion.button
          initial={{
            opacity: 0,
            x: 10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          onClick={onNext}
          className="flex items-center gap-1.5 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">

            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
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

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
        <p className="text-xs text-slate-400 leading-relaxed">
          <span className="text-blue-400 font-bold">Tip:</span> You can always
          override any decision. Critical decisions (above your limit) will
          always require your approval.
        </p>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">

          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        {value &&
        <motion.button
          initial={{
            opacity: 0,
            x: 10
          }}
          animate={{
            opacity: 1,
            x: 0
          }}
          onClick={onNext}
          className="flex items-center gap-1.5 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">

            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-white transition-colors">

          <ChevronLeftIcon className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors">

            <SkipForwardIcon className="w-3.5 h-3.5" /> Skip
          </button>
          <motion.button
            initial={{
              opacity: 0,
              x: 10
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            onClick={onNext}
            className="flex items-center gap-1.5 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors">

            Continue <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        </div>
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
  const handleLaunch = () => {
    setLaunched(true);
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
  const [data, setData] = useState<SetupData>({
    industry: '',
    teamSize: '',
    executives: execOptions.filter((e) => e.defaultOn).map((e) => e.id),
    approvalLimit: '',
    integrations: []
  });
  const goNext = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, 7) as SetupStep);
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1) as SetupStep);
  };
  const TOTAL_STEPS = 7;
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '60%' : '-60%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-60%' : '60%',
      opacity: 0
    })
  };
  return (
    <div className="max-w-lg mx-auto w-full space-y-6">
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
      <ProgressBar step={step} total={TOTAL_STEPS} />

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
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}>

            {step === 1 && <StepWelcome onNext={goNext} />}
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
              value={data.executives}
              onChange={(v) =>
              setData((d) => ({
                ...d,
                executives: v
              }))
              }
              onNext={goNext}
              onBack={goBack} />

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