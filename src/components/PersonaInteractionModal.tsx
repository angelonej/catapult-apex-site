import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XIcon,
  ZapIcon,
  PlayIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  TrendingUpIcon,
  BuildingIcon,
  ActivityIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon } from
'lucide-react';
// ─── Types ────────────────────────────────────────────────────────────────────
interface PersonaInteractionModalProps {
  onClose: () => void;
}
type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;
// ─── Waveform ─────────────────────────────────────────────────────────────────
function AriaWaveform({ active }: {active: boolean;}) {
  const heights = [30, 60, 45, 80, 35, 90, 55, 75, 40, 85, 50, 65];
  return (
    <div className="flex items-center justify-center gap-0.5 h-10">
      {heights.map((h, i) =>
      <motion.div
        key={i}
        animate={
        active ?
        {
          scaleY: [0.2, h / 50, 0.2, h / 60, 0.2]
        } :
        {
          scaleY: 0.15
        }
        }
        transition={{
          duration: 0.9 + i * 0.07,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.06
        }}
        style={{
          height: `${h}%`
        }}
        className="w-1 bg-amber-400 rounded-full origin-center" />

      )}
    </div>);

}
// ─── Progress Dots ────────────────────────────────────────────────────────────
function ProgressDots({ step, total = 6 }: {step: Step;total?: number;}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({
        length: total
      }).map((_, i) => {
        const isDone = i < step;
        const isCurrent = i === step - 1 || step === 0 && i === 0;
        return (
          <motion.div
            key={i}
            animate={{
              width: isCurrent ? 20 : 8,
              opacity: isDone || isCurrent ? 1 : 0.3
            }}
            transition={{
              duration: 0.3
            }}
            className={`h-2 rounded-full ${isDone ? 'bg-green-400' : isCurrent ? 'bg-amber-400' : 'bg-slate-600'}`} />);


      })}
    </div>);

}
// ─── Executive Mini Avatar ────────────────────────────────────────────────────
const execMinis = [
{
  initial: 'A',
  gradient: 'from-amber-400 to-amber-600',
  name: 'Aria',
  role: 'CEO'
},
{
  initial: 'F',
  gradient: 'from-blue-400 to-blue-600',
  name: 'Felix',
  role: 'CFO'
},
{
  initial: 'O',
  gradient: 'from-green-400 to-green-600',
  name: 'Orion',
  role: 'COO'
},
{
  initial: 'M',
  gradient: 'from-pink-400 to-pink-600',
  name: 'Maya',
  role: 'CMO'
}];

// ─── Industry Options ─────────────────────────────────────────────────────────
const industries = [
{
  key: 'warehousing',
  label: 'Warehousing',
  icon: PackageIcon,
  color: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400'
},
{
  key: 'trades',
  label: 'Trades',
  icon: WrenchIcon,
  color: 'bg-orange-500/20 border-orange-500/40 text-orange-400'
},
{
  key: 'logistics',
  label: 'Logistics',
  icon: TruckIcon,
  color: 'bg-blue-500/20 border-blue-500/40 text-blue-400'
},
{
  key: 'financial',
  label: 'Financial',
  icon: TrendingUpIcon,
  color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
},
{
  key: 'construction',
  label: 'Construction',
  icon: BuildingIcon,
  color: 'bg-amber-500/20 border-amber-500/40 text-amber-400'
},
{
  key: 'medical',
  label: 'Medical',
  icon: ActivityIcon,
  color: 'bg-rose-500/20 border-rose-500/40 text-rose-400'
}];

const teamSizes = ['Just me', '2–10', '11–50', '51–200', '200+'];
const painPoints = [
{
  label: 'Too much admin work',
  color: 'bg-orange-500/20 border-orange-500/40 text-orange-400'
},
{
  label: 'Cash flow & invoicing',
  color: 'bg-blue-500/20 border-blue-500/40 text-blue-400'
},
{
  label: 'Scheduling & operations',
  color: 'bg-green-500/20 border-green-500/40 text-green-400'
},
{
  label: 'Sales & growth',
  color: 'bg-purple-500/20 border-purple-500/40 text-purple-400'
}];

// ─── Main Component ───────────────────────────────────────────────────────────
export function PersonaInteractionModal({
  onClose
}: PersonaInteractionModalProps) {
  const [step, setStep] = useState<Step>(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [name, setName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [industry, setIndustry] = useState('');
  const [loadProgress, setLoadProgress] = useState(0);
  const [loadedExecs, setLoadedExecs] = useState<number[]>([]);
  const speakTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Start speaking on each step change
  useEffect(() => {
    setIsSpeaking(true);
    if (speakTimerRef.current) clearTimeout(speakTimerRef.current);
    speakTimerRef.current = setTimeout(() => setIsSpeaking(false), 2800);
    return () => {
      if (speakTimerRef.current) clearTimeout(speakTimerRef.current);
    };
  }, [step]);
  // Auto-advance step 0 after 4s if no interaction
  useEffect(() => {
    if (step === 0) {
      const t = setTimeout(() => setStep(1), 5000);
      return () => clearTimeout(t);
    }
  }, [step]);
  // Loading animation for step 5
  useEffect(() => {
    if (step === 5) {
      setLoadProgress(0);
      setLoadedExecs([]);
      let prog = 0;
      loadTimerRef.current = setInterval(() => {
        prog += 2;
        setLoadProgress(Math.min(prog, 100));
        if (prog === 25) setLoadedExecs([0]);
        if (prog === 50) setLoadedExecs([0, 1]);
        if (prog === 75) setLoadedExecs([0, 1, 2]);
        if (prog === 95) setLoadedExecs([0, 1, 2, 3]);
        if (prog >= 100) {
          clearInterval(loadTimerRef.current!);
          setTimeout(() => setStep(6), 600);
        }
      }, 60);
      return () => {
        if (loadTimerRef.current) clearInterval(loadTimerRef.current);
      };
    }
  }, [step]);
  const ariaQuotes: Record<Step, string> = {
    0: "Hi there! I'm Aria, your AI CEO at Catapult Company. I'm going to ask you a few quick questions to configure your AI executive team. Ready?",
    1: "Great! First — what's your name?",
    2: `Nice to meet you, ${name}! What type of business do you run?`,
    3: 'Got it. How many people are on your team?',
    4: "What's your biggest operational challenge right now?",
    5: `Perfect, ${name}. I'm configuring your AI executive team right now. This will take just a moment...`,
    6: `Your AI team is ready, ${name}! I've assembled the perfect executives for your ${industry} business. Let's get started.`
  };
  const handleNameSubmit = () => {
    if (nameInput.trim()) {
      setName(nameInput.trim());
      setStep(2);
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      transition={{
        duration: 0.3
      }}
      className="fixed inset-0 z-50 bg-slate-950/98 backdrop-blur-xl flex flex-col items-center justify-center p-4">

      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center transition-all"
        aria-label="Close">

        <XIcon className="w-5 h-5 text-white" />
      </button>

      {/* HeyGen + ElevenLabs badge */}
      <motion.div
        initial={{
          opacity: 0,
          y: -10
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.2
        }}
        className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-teal-500/15 border border-teal-500/30 rounded-full px-4 py-1.5">

        <div className="w-4 h-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded flex items-center justify-center">
          <span
            className="text-white font-black leading-none"
            style={{
              fontSize: '7px'
            }}>

            HG
          </span>
        </div>
        <span className="text-xs font-bold text-teal-300">HeyGen</span>
        <span className="text-slate-600 text-xs">×</span>
        <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
          <span
            className="text-white font-black leading-none"
            style={{
              fontSize: '7px'
            }}>

            11
          </span>
        </div>
        <span className="text-xs font-bold text-orange-300">ElevenLabs</span>
      </motion.div>

      <div className="w-full max-w-md flex flex-col items-center gap-6">
        {/* Progress dots */}
        {step > 0 && step < 6 &&
        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}>

            <ProgressDots step={step} />
          </motion.div>
        }

        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {/* Outer glow ring when speaking */}
            {isSpeaking &&
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 2,
                repeat: Infinity
              }}
              className="absolute inset-0 rounded-full bg-amber-500/30 blur-lg" />

            }
            <div className="relative w-28 h-28 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/30 border-4 border-amber-500/40">
              <span className="text-white font-black text-5xl">A</span>
              {/* Live badge */}
              <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-green-500 rounded-full px-2 py-0.5">
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity
                  }}
                  className="w-1.5 h-1.5 bg-white rounded-full" />

                <span className="text-white text-[9px] font-black">LIVE</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-white font-black text-lg">Aria · AI CEO</p>
            <p className="text-amber-400 text-xs font-semibold">
              Catapult Company
            </p>
          </div>

          {/* Waveform */}
          <AriaWaveform active={isSpeaking} />
        </div>

        {/* Speech bubble */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`quote-${step}`}
            initial={{
              opacity: 0,
              y: 12,
              scale: 0.97
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.97
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative bg-amber-500/10 border border-amber-500/30 rounded-2xl px-5 py-4 text-center max-w-sm">

            {/* Tail */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500/10 border-l border-t border-amber-500/30 rotate-45" />
            <p className="text-sm text-white leading-relaxed font-medium">
              {ariaQuotes[step]}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`step-${step}`}
            initial={{
              opacity: 0,
              y: 20
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
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="w-full">

            {/* Step 0 — Greeting */}
            {step === 0 &&
            <div className="flex gap-3 justify-center">
                <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-3 rounded-xl transition-all shadow-lg shadow-amber-500/25">

                  <ZapIcon className="w-4 h-4" />
                  Let's go!
                </button>
                <button
                onClick={() => setStep(1)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all">

                  Tell me more
                </button>
              </div>
            }

            {/* Step 1 — Name */}
            {step === 1 &&
            <div className="flex flex-col gap-3">
                <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                placeholder="Your first name..."
                autoFocus
                className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30 text-center text-lg font-semibold" />

                <button
                onClick={handleNameSubmit}
                disabled={!nameInput.trim()}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-3.5 rounded-xl transition-all shadow-lg">

                  Continue <ArrowRightIcon className="w-4 h-4" />
                </button>
              </div>
            }

            {/* Step 2 — Industry */}
            {step === 2 &&
            <div className="grid grid-cols-3 gap-2">
                {industries.map((ind) => {
                const Icon = ind.icon;
                return (
                  <button
                    key={ind.key}
                    onClick={() => {
                      setIndustry(ind.label);
                      setStep(3);
                    }}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${ind.color}`}>

                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-bold leading-tight text-center">
                        {ind.label}
                      </span>
                    </button>);

              })}
              </div>
            }

            {/* Step 3 — Team size */}
            {step === 3 &&
            <div className="flex flex-wrap gap-2 justify-center">
                {teamSizes.map((size) =>
              <button
                key={size}
                onClick={() => setStep(4)}
                className="px-4 py-2.5 bg-white/10 hover:bg-amber-500/20 border border-white/20 hover:border-amber-500/40 text-white font-bold text-sm rounded-xl transition-all">

                    {size}
                  </button>
              )}
              </div>
            }

            {/* Step 4 — Pain point */}
            {step === 4 &&
            <div className="grid grid-cols-2 gap-3">
                {painPoints.map((pain) =>
              <button
                key={pain.label}
                onClick={() => setStep(5)}
                className={`p-3 rounded-xl border-2 text-sm font-bold text-left leading-snug transition-all ${pain.color}`}>

                    {pain.label}
                  </button>
              )}
              </div>
            }

            {/* Step 5 — Loading */}
            {step === 5 &&
            <div className="flex flex-col items-center gap-4">
                {/* Executive avatars appearing */}
                <div className="flex items-center gap-3">
                  {execMinis.map((exec, i) =>
                <motion.div
                  key={exec.initial}
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                    y: 10
                  }}
                  animate={
                  loadedExecs.includes(i) ?
                  {
                    opacity: 1,
                    scale: 1,
                    y: 0
                  } :
                  {
                    opacity: 0.2,
                    scale: 0.7,
                    y: 5
                  }
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}
                  className="flex flex-col items-center gap-1">

                      <div
                    className={`relative w-12 h-12 bg-gradient-to-br ${exec.gradient} rounded-full flex items-center justify-center shadow-lg`}>

                        <span className="text-white font-black text-lg">
                          {exec.initial}
                        </span>
                        {loadedExecs.includes(i) &&
                    <motion.div
                      initial={{
                        scale: 0
                      }}
                      animate={{
                        scale: 1
                      }}
                      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-950">

                            <CheckCircleIcon className="w-2.5 h-2.5 text-white" />
                          </motion.div>
                    }
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {exec.role}
                      </span>
                    </motion.div>
                )}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <motion.div
                  style={{
                    width: `${loadProgress}%`
                  }}
                  className="h-2 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full transition-all duration-100" />

                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Configuring AI team... {loadProgress}%
                </p>
              </div>
            }

            {/* Step 6 — Ready */}
            {step === 6 &&
            <div className="flex flex-col gap-3">
                <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="flex items-center justify-center gap-2 bg-green-500/15 border border-green-500/30 rounded-xl p-3">

                  <SparklesIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-bold text-green-400">
                    AI Team Configured & Ready
                  </span>
                </motion.div>
                <button
                onClick={() => {
                  window.location.hash = '#/apex';
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-xl transition-all shadow-xl shadow-amber-500/25 text-base">

                  <ZapIcon className="w-5 h-5" />
                  Launch APEX Platform
                </button>
                <button
                onClick={() => {
                  window.location.hash = '#/landing';
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold py-3 rounded-xl transition-all">

                  Explore Features First
                </button>
              </div>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>);

}