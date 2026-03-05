import React, { useEffect, useState, useRef, Fragment, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  UsersIcon,
  MicIcon,
  RadioIcon,
  SparklesIcon,
  BotIcon,
  ActivityIcon,
  PlayIcon,
  PauseIcon,
  ZapIcon,
  ShieldCheckIcon,
  BrainIcon,
  ArrowDownIcon,
  ExternalLinkIcon,
  Volume2Icon } from
'lucide-react';
// ─── ElevenLabs Logo Badge ────────────────────────────────────────────────────
function ElevenLabsBadge({ size = 'sm' }: {size?: 'sm' | 'md' | 'lg';}) {
  const sizes = {
    sm: {
      box: 'w-5 h-5 text-xs',
      text: 'text-xs',
      gap: 'gap-1.5'
    },
    md: {
      box: 'w-7 h-7 text-sm',
      text: 'text-sm',
      gap: 'gap-2'
    },
    lg: {
      box: 'w-10 h-10 text-base',
      text: 'text-base',
      gap: 'gap-2.5'
    }
  };
  const s = sizes[size];
  return (
    <div className={`inline-flex items-center ${s.gap}`}>
      <div
        className={`${s.box} bg-gradient-to-br from-orange-500 to-amber-500 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm`}>

        <span className={`font-black text-white leading-none ${s.text}`}>
          11
        </span>
      </div>
      <span className={`font-black text-white ${s.text}`}>ElevenLabs</span>
    </div>);

}
// ─── Waveform Bars ────────────────────────────────────────────────────────────
function WaveformBars({
  count = 12,
  color = 'bg-orange-400',
  active = true




}: {count?: number;color?: string;active?: boolean;}) {
  const baseHeights = [
  35, 65, 50, 80, 40, 90, 55, 75, 45, 85, 60, 70, 38, 82, 52, 68, 44, 78, 58,
  72];

  return (
    <div className="flex items-center gap-0.5 h-8">
      {Array.from({
        length: count
      }).map((_, i) =>
      <motion.div
        key={i}
        animate={
        active ?
        {
          scaleY: [
          0.3,
          baseHeights[i % baseHeights.length] / 50,
          0.3,
          baseHeights[(i + 3) % baseHeights.length] / 60,
          0.3]

        } :
        {
          scaleY: 0.2
        }
        }
        transition={{
          duration: 1.1 + i * 0.06,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.06
        }}
        style={{
          height: `${baseHeights[i % baseHeights.length]}%`
        }}
        className={`w-1 ${color} rounded-full origin-center`} />

      )}
    </div>);

}
// ─── Use Case Cards Data ──────────────────────────────────────────────────────
const useCases = [
{
  id: 'executives',
  icon: UsersIcon,
  title: 'AI Executive Voices',
  desc: 'Each AI executive — Aria (CEO), Felix (CFO), Orion (COO), Maya (CMO) — has a unique ElevenLabs cloned voice. They speak decisions, alerts, and reports aloud.',
  tags: ['Voice Cloning', 'Unique per Executive', 'Real-time'],
  badge: 'Core Feature',
  badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  color: 'orange',
  border: 'border-orange-500/30',
  bg: 'bg-orange-500/10',
  iconGradient: 'from-orange-500 to-orange-600',
  tagBg: 'bg-orange-500/15 text-orange-400',
  hasExecDemo: true
},
{
  id: 'podcast',
  icon: MicIcon,
  title: 'Podcast Voice Synthesis',
  desc: 'The AI CEO podcast host voice is synthesized by ElevenLabs. Every interview, every episode, broadcast-quality audio — produced in minutes, not days.',
  tags: ['Broadcast Quality', 'AI Host Voice', 'Episode Synthesis'],
  badge: 'Powers AIPodcastHub',
  badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  color: 'purple',
  border: 'border-purple-500/30',
  bg: 'bg-purple-500/10',
  iconGradient: 'from-purple-500 to-purple-700',
  tagBg: 'bg-purple-500/15 text-purple-400',
  hasExecDemo: false
},
{
  id: 'voice-commands',
  icon: RadioIcon,
  title: 'Voice Command Interface',
  desc: 'When you speak to your AI executives via the APEX Voice screen, ElevenLabs converts their responses to natural speech — so your AI team literally talks back.',
  tags: ['STT + TTS', 'Natural Speech', 'Sub-100ms'],
  badge: 'Powers ScreenVoice',
  badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  color: 'blue',
  border: 'border-blue-500/30',
  bg: 'bg-blue-500/10',
  iconGradient: 'from-blue-500 to-blue-700',
  tagBg: 'bg-blue-500/15 text-blue-400',
  hasExecDemo: false
},
{
  id: 'onboarding',
  icon: SparklesIcon,
  title: 'Voice-Guided Onboarding',
  desc: 'The APEX setup flow is narrated by an ElevenLabs voice guide. Each step is spoken aloud, making setup accessible and human-feeling even when fully automated.',
  tags: ['Narrated Setup', 'Accessibility', 'Guided Flow'],
  badge: 'Powers ScreenSetup',
  badgeColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  color: 'green',
  border: 'border-green-500/30',
  bg: 'bg-green-500/10',
  iconGradient: 'from-green-500 to-green-700',
  tagBg: 'bg-green-500/15 text-green-400',
  hasExecDemo: false
},
{
  id: 'humanoid',
  icon: BotIcon,
  title: 'Humanoid Voice Synthesis',
  desc: 'Skill Transfer Packets include voice data. When humanoid robots deploy human expertise, ElevenLabs synthesizes the communication layer — robots that speak with human nuance.',
  tags: ['Skill Packets', 'Robot Speech', '2028 Roadmap'],
  badge: '2028 Roadmap',
  badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  color: 'cyan',
  border: 'border-cyan-500/30',
  bg: 'bg-cyan-500/10',
  iconGradient: 'from-cyan-500 to-teal-600',
  tagBg: 'bg-cyan-500/15 text-cyan-400',
  hasExecDemo: false
},
{
  id: 'field',
  icon: ActivityIcon,
  title: 'Field Voice Capture',
  desc: 'Guide Beacons capture field worker voice via Zello PTT. ElevenLabs transcribes and routes commands to AI executives in real-time — no app switching required.',
  tags: ['Zello Bridge', 'Real-time STT', 'Edge Capture'],
  badge: 'Powers Guide Beacons',
  badgeColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  color: 'yellow',
  border: 'border-yellow-500/30',
  bg: 'bg-yellow-500/10',
  iconGradient: 'from-yellow-500 to-yellow-600',
  tagBg: 'bg-yellow-500/15 text-yellow-400',
  hasExecDemo: false
}];

// ─── Executive Voice Demo Data ────────────────────────────────────────────────
const executives = [
{
  id: 'aria',
  initial: 'A',
  name: 'Aria',
  role: 'CEO',
  voiceDesc: 'Confident, warm, strategic',
  sample:
  'Your Q3 growth strategy is on track. Revenue up 23% from last quarter.',
  gradient: 'from-amber-400 to-amber-600',
  border: 'border-amber-500/40',
  bg: 'bg-amber-500/15',
  text: 'text-amber-400'
},
{
  id: 'felix',
  initial: 'F',
  name: 'Felix',
  role: 'CFO',
  voiceDesc: 'Precise, analytical, calm',
  sample:
  "Cash flow is healthy. I've flagged 3 invoices for collection — $14,400 at risk.",
  gradient: 'from-blue-400 to-blue-600',
  border: 'border-blue-500/40',
  bg: 'bg-blue-500/15',
  text: 'text-blue-400'
},
{
  id: 'orion',
  initial: 'O',
  name: 'Orion',
  role: 'COO',
  voiceDesc: 'Direct, efficient, decisive',
  sample:
  'All 5 crews are scheduled. Storm reroute saved $3,200 in overtime costs.',
  gradient: 'from-green-400 to-green-600',
  border: 'border-green-500/40',
  bg: 'bg-green-500/15',
  text: 'text-green-400'
},
{
  id: 'maya',
  initial: 'M',
  name: 'Maya',
  role: 'CMO',
  voiceDesc: 'Creative, energetic, data-driven',
  sample: 'Email campaign launched. 34% open rate — 2x industry average.',
  gradient: 'from-pink-400 to-pink-600',
  border: 'border-pink-500/40',
  bg: 'bg-pink-500/15',
  text: 'text-pink-400'
}];

// ─── Stack Layers ─────────────────────────────────────────────────────────────
const stackLayers = [
{
  icon: ZapIcon,
  name: 'APEX Platform',
  desc: 'AI executives, podcast, onboarding, field ops',
  color: 'orange',
  border: 'border-l-orange-500',
  bg: 'bg-orange-500/10',
  iconGradient: 'from-orange-500 to-orange-600',
  textColor: 'text-orange-400'
},
{
  icon: Volume2Icon,
  name: 'ElevenLabs API',
  desc: 'TTS · STT · Voice Cloning · Conversational AI',
  color: 'purple',
  border: 'border-l-purple-500',
  bg: 'bg-purple-500/10',
  iconGradient: 'from-purple-500 to-purple-700',
  textColor: 'text-purple-400'
},
{
  icon: RadioIcon,
  name: 'Output Surfaces',
  desc: 'Speakers · Headsets · Humanoid robots · Podcast platforms',
  color: 'blue',
  border: 'border-l-blue-500',
  bg: 'bg-blue-500/10',
  iconGradient: 'from-blue-500 to-blue-700',
  textColor: 'text-blue-400'
}];

// ─── Main Component ───────────────────────────────────────────────────────────
export function ElevenLabsVoiceLayer() {
  const [playingExec, setPlayingExec] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [connected, setConnected] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handlePlayExec = (id: string) => {
    if (playingExec === id) {
      setPlayingExec(null);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    setPlayingExec(id);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPlayingExec(null), 3000);
  };
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );
  const handleConnect = () => {
    if (apiKey.trim()) setConnected(true);
  };
  return (
    <section
      id="voice-layer"
      className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <motion.div
          initial={{
            opacity: 0,
            y: 24
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
            duration: 0.65
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
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-5 py-2 mb-6">

            <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
              <span className="text-white font-black text-[8px] leading-none">
                11
              </span>
            </div>
            <span className="text-sm font-bold text-orange-300 uppercase tracking-widest">
              Voice Infrastructure · Powered by ElevenLabs
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Every Voice on APEX
            <br />
            <span className="text-orange-400">Powered by ElevenLabs.</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            From AI executive commands to podcast production to humanoid skill
            transfer — ElevenLabs voice AI is the acoustic layer of the entire
            APEX platform.
          </p>
        </motion.div>

        {/* ── Part 1: Brand Hero Banner ── */}
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
            duration: 0.7
          }}
          className="bg-slate-900 border border-white/10 rounded-3xl p-8 mb-16">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left: Brand */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-white font-black text-2xl leading-none">
                    11
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">ElevenLabs</p>
                  <p className="text-sm text-orange-400 font-semibold">
                    Voice AI Infrastructure
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center lg:text-left max-w-xs">
                The world's most advanced AI voice platform — powering every
                spoken interaction on APEX.
              </p>
            </div>

            {/* Center: Live waveform */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-1.5 mb-1">
                <motion.div
                  animate={{
                    opacity: [1, 0.3, 1]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity
                  }}
                  className="w-2 h-2 bg-orange-400 rounded-full" />

                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                  Live Voice Engine
                </span>
              </div>
              <WaveformBars count={20} color="bg-orange-400" active={true} />
              <p className="text-xs text-slate-500 font-mono">
                elevenlabs.io · voice synthesis active
              </p>
            </div>

            {/* Right: Stats */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                <UsersIcon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-black text-white">8 AI Voices</p>
                  <p className="text-xs text-slate-500">
                    One per executive + podcast host + onboarding guide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                <ZapIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-black text-white">Real-time TTS</p>
                  <p className="text-xs text-slate-500">Sub-100ms latency</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
                <BrainIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <div>
                  <p className="text-sm font-black text-white">Voice Cloning</p>
                  <p className="text-xs text-slate-500">
                    Each executive has a unique cloned voice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Part 2: Use Case Cards ── */}
        <div className="mb-16">
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
              duration: 0.6
            }}
            className="text-center mb-10">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Integration Map
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white">
              Where ElevenLabs{' '}
              <span className="text-orange-400">Powers APEX</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={uc.id}
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
                    delay: i * 0.08,
                    duration: 0.5
                  }}
                  className={`${uc.bg} border ${uc.border} rounded-2xl p-5 flex flex-col`}>

                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-11 h-11 bg-gradient-to-br ${uc.iconGradient} rounded-xl flex items-center justify-center shadow-lg`}>

                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span
                      className={`text-xs font-bold border rounded-full px-2.5 py-1 flex-shrink-0 ${uc.badgeColor}`}>

                      {uc.badge}
                    </span>
                  </div>

                  <h4 className="font-black text-white mb-2">{uc.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">
                    {uc.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {uc.tags.map((tag) =>
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${uc.tagBg}`}>

                        {tag}
                      </span>
                    )}
                  </div>

                  {/* ElevenLabs attribution */}
                  <div className="pt-3 border-t border-white/10">
                    <ElevenLabsBadge size="sm" />
                  </div>
                </motion.div>);

            })}
          </div>
        </div>

        {/* ── Part 3: Interactive Voice Demo ── */}
        <div className="mb-16">
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
              duration: 0.6
            }}
            className="text-center mb-10">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Voice Preview
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
              Hear Your AI Executive Team
            </h3>
            <p className="text-slate-400 text-sm">
              Each executive has a unique ElevenLabs voice. Click to preview.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {executives.map((exec, i) => {
              const isPlaying = playingExec === exec.id;
              return (
                <motion.div
                  key={exec.id}
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
                    delay: i * 0.1,
                    duration: 0.5
                  }}
                  className={`${exec.bg} border ${exec.border} rounded-2xl p-5 flex flex-col items-center text-center`}>

                  {/* Avatar */}
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${exec.gradient} rounded-full flex items-center justify-center mb-3 shadow-lg`}>

                    <span className="text-white font-black text-2xl">
                      {exec.initial}
                    </span>
                  </div>

                  <p className="font-black text-white text-sm">{exec.name}</p>
                  <p className={`text-xs font-bold mb-1 ${exec.text}`}>
                    {exec.role}
                  </p>
                  <p className="text-xs text-slate-500 mb-4 italic">
                    "{exec.voiceDesc}"
                  </p>

                  {/* Waveform or play button */}
                  <div className="h-10 flex items-center justify-center mb-3 w-full">
                    {isPlaying ?
                    <WaveformBars
                      count={8}
                      color="bg-orange-400"
                      active={true} /> :


                    <div className="h-4 flex items-center gap-0.5">
                        {Array.from({
                        length: 8
                      }).map((_, j) =>
                      <div
                        key={j}
                        className="w-1 bg-white/10 rounded-full"
                        style={{
                          height: `${20 + j * 5}%`
                        }} />

                      )}
                      </div>
                    }
                  </div>

                  {/* Sample text */}
                  <AnimatePresence>
                    {isPlaying &&
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 4
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      exit={{
                        opacity: 0
                      }}
                      className="text-xs text-slate-300 italic leading-relaxed mb-3 text-center">

                        "{exec.sample}"
                      </motion.p>
                    }
                  </AnimatePresence>

                  <button
                    onClick={() => handlePlayExec(exec.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-orange-500 shadow-lg shadow-orange-500/30' : 'bg-white/10 border border-white/20 hover:bg-orange-500/20 hover:border-orange-500/40'}`}
                    aria-label={isPlaying ? 'Stop' : `Play ${exec.name}`}>

                    {isPlaying ?
                    <PauseIcon className="w-4 h-4 text-white" /> :

                    <PlayIcon className="w-4 h-4 text-white ml-0.5" />
                    }
                  </button>
                </motion.div>);

            })}
          </div>

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
              delay: 0.5
            }}
            className="text-center mt-4">

            <p className="text-xs text-slate-500">
              Voice synthesis powered by{' '}
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">

                ElevenLabs
              </a>{' '}
              · Each voice is unique and cloned per executive persona
            </p>
          </motion.div>
        </div>

        {/* ── Part 4: Voice Stack Diagram ── */}
        <div className="mb-16">
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
              duration: 0.6
            }}
            className="text-center mb-10">

            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
              Architecture
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white">
              The Voice Stack
            </h3>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-2">
            {stackLayers.map((layer, i) => {
              const Icon = layer.icon;
              return (
                <Fragment key={layer.name}>
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
                      delay: i * 0.15,
                      duration: 0.5
                    }}
                    className={`flex items-center gap-4 ${layer.bg} border-l-4 ${layer.border} border border-white/10 rounded-2xl p-5`}>

                    <div
                      className={`w-11 h-11 bg-gradient-to-br ${layer.iconGradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className={`font-black text-white`}>{layer.name}</p>
                      <p className="text-xs text-slate-400">{layer.desc}</p>
                    </div>
                    {i === 1 &&
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        <div className="w-5 h-5 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
                          <span className="text-white font-black text-[8px] leading-none">
                            11
                          </span>
                        </div>
                        <span className="text-xs font-bold text-orange-400">
                          ElevenLabs
                        </span>
                      </div>
                    }
                  </motion.div>

                  {i < stackLayers.length - 1 &&
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
                      delay: i * 0.15 + 0.1
                    }}
                    className="flex justify-center">

                      <div className="flex flex-col items-center gap-1">
                        <motion.div
                        animate={{
                          y: [0, 4, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}>

                          <ArrowDownIcon className="w-5 h-5 text-slate-600" />
                        </motion.div>
                      </div>
                    </motion.div>
                  }
                </Fragment>);

            })}
          </div>
        </div>

        {/* ── Part 5: CTA ── */}
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
          className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* API Key panel */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
            <div className="flex items-center gap-2 mb-2">
              <ElevenLabsBadge size="md" />
            </div>
            <h3 className="text-xl font-black text-white mb-2 mt-3">
              Connect ElevenLabs to Your APEX Account
            </h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Your API key unlocks all voice features — executive speech,
              podcast synthesis, voice commands, and field capture.
            </p>

            <AnimatePresence mode="wait">
              {connected ?
              <motion.div
                key="connected"
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="flex items-center gap-3 bg-green-500/15 border border-green-500/30 rounded-xl p-4">

                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <ZapIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-green-400">
                      Voice Layer Connected
                    </p>
                    <p className="text-xs text-slate-400">
                      All 8 AI voices are active and ready
                    </p>
                  </div>
                </motion.div> :

              <motion.div key="form" className="space-y-3">
                  <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your ElevenLabs API key..."
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 font-mono" />

                  <button
                  onClick={handleConnect}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all shadow-lg">

                    <Volume2Icon className="w-4 h-4" />
                    Connect Voice Layer
                  </button>
                  <p className="text-center">
                    <a
                    href="https://elevenlabs.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1">

                      Get your API key at elevenlabs.io
                      <ExternalLinkIcon className="w-3 h-3" />
                    </a>
                  </p>
                </motion.div>
              }
            </AnimatePresence>
          </div>

          {/* Stats panel */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">
              Voice Layer Stats
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-slate-300">
                    Unique AI voices
                  </span>
                </div>
                <span className="text-lg font-black text-orange-400">8</span>
              </div>
              <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <ZapIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">
                    Response latency
                  </span>
                </div>
                <span className="text-lg font-black text-green-400">
                  &lt;100ms
                </span>
              </div>
              <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <MicIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-300">Audio quality</span>
                </div>
                <span className="text-lg font-black text-purple-400">
                  Broadcast
                </span>
              </div>
              <div className="flex items-center justify-between bg-cyan-500/10 border border-cyan-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm text-slate-300">
                    Voice data compliance
                  </span>
                </div>
                <span className="text-lg font-black text-cyan-400">
                  HIPAA-aligned
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}