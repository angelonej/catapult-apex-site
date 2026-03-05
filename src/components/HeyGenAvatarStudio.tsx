import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  UploadIcon,
  UserIcon,
  VideoIcon,
  ZapIcon,
  MicIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  QrCodeIcon,
  Volume2Icon,
  SparklesIcon,
  ArrowRightIcon } from
'lucide-react';
// ─── Waveform ─────────────────────────────────────────────────────────────────
function WaveformBars({
  count = 8,
  color = 'bg-teal-400',
  active = true




}: {count?: number;color?: string;active?: boolean;}) {
  const heights = [35, 70, 50, 85, 40, 90, 55, 75, 45, 80, 60, 65];
  return (
    <div className="flex items-center gap-0.5 h-7">
      {Array.from({
        length: count
      }).map((_, i) =>
      <motion.div
        key={i}
        animate={
        active ?
        {
          scaleY: [
          0.2,
          heights[i % heights.length] / 50,
          0.2,
          heights[(i + 2) % heights.length] / 55,
          0.2]

        } :
        {
          scaleY: 0.15
        }
        }
        transition={{
          duration: 1.0 + i * 0.07,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.07
        }}
        style={{
          height: `${heights[i % heights.length]}%`
        }}
        className={`w-1 ${color} rounded-full origin-center`} />

      )}
    </div>);

}
// ─── Executive Data ───────────────────────────────────────────────────────────
const executives = [
{
  id: 'aria',
  initial: 'A',
  name: 'Aria',
  role: 'CEO',
  gradient: 'from-amber-400 to-amber-600',
  border: 'border-amber-500/40',
  bg: 'bg-amber-500/15',
  text: 'text-amber-400',
  quote: 'Your Q3 strategy is on track. Revenue up 23%.'
},
{
  id: 'felix',
  initial: 'F',
  name: 'Felix',
  role: 'CFO',
  gradient: 'from-blue-400 to-blue-600',
  border: 'border-blue-500/40',
  bg: 'bg-blue-500/15',
  text: 'text-blue-400',
  quote: 'Cash flow healthy. 3 invoices flagged for collection.'
},
{
  id: 'orion',
  initial: 'O',
  name: 'Orion',
  role: 'COO',
  gradient: 'from-green-400 to-green-600',
  border: 'border-green-500/40',
  bg: 'bg-green-500/15',
  text: 'text-green-400',
  quote: 'All crews scheduled. Storm reroute saved $3,200.'
},
{
  id: 'maya',
  initial: 'M',
  name: 'Maya',
  role: 'CMO',
  gradient: 'from-pink-400 to-pink-600',
  border: 'border-pink-500/40',
  bg: 'bg-pink-500/15',
  text: 'text-pink-400',
  quote: 'Campaign live. 34% open rate — 2x industry average.'
},
{
  id: 'theo',
  initial: 'T',
  name: 'Theo',
  role: 'CTO',
  gradient: 'from-purple-400 to-purple-600',
  border: 'border-purple-500/40',
  bg: 'bg-purple-500/15',
  text: 'text-purple-400',
  quote: 'Automation stack updated. 3 new integrations live.'
},
{
  id: 'lex',
  initial: 'L',
  name: 'Lex',
  role: 'CLO',
  gradient: 'from-cyan-400 to-cyan-600',
  border: 'border-cyan-500/40',
  bg: 'bg-cyan-500/15',
  text: 'text-cyan-400',
  quote: 'Compliance check complete. Zero audit flags.'
},
{
  id: 'hana',
  initial: 'H',
  name: 'Hana',
  role: 'CHRO',
  gradient: 'from-rose-400 to-rose-600',
  border: 'border-rose-500/40',
  bg: 'bg-rose-500/15',
  text: 'text-rose-400',
  quote: 'Team pulse score: 94%. One conflict flagged.'
},
{
  id: 'sage',
  initial: 'S',
  name: 'Sage',
  role: 'CSO',
  gradient: 'from-orange-400 to-orange-600',
  border: 'border-orange-500/40',
  bg: 'bg-orange-500/15',
  text: 'text-orange-400',
  quote: 'Pipeline at $2.1M. 3 deals closing this week.'
}];

const useCases = [
{
  icon: VideoIcon,
  title: 'Sales Outreach',
  desc: 'AI executives send personalized video messages to prospects. Your face. Your voice. At scale.',
  color: 'teal',
  border: 'border-teal-500/30',
  bg: 'bg-teal-500/10',
  iconGradient: 'from-teal-500 to-cyan-600',
  tagColor: 'text-teal-400'
},
{
  icon: SparklesIcon,
  title: 'Onboarding Narration',
  desc: 'New customers are greeted by their AI CEO in a personalized welcome video — generated in seconds.',
  color: 'orange',
  border: 'border-orange-500/30',
  bg: 'bg-orange-500/10',
  iconGradient: 'from-orange-500 to-orange-600',
  tagColor: 'text-orange-400'
},
{
  icon: MicIcon,
  title: 'Podcast Hosting',
  desc: 'The AI CEO podcast host appears on screen. ElevenLabs voice + HeyGen face = broadcast-ready host.',
  color: 'purple',
  border: 'border-purple-500/30',
  bg: 'bg-purple-500/10',
  iconGradient: 'from-purple-500 to-purple-700',
  tagColor: 'text-purple-400'
},
{
  icon: QrCodeIcon,
  title: 'QR Code Intake',
  desc: 'Scan a QR code → AI executive appears → conducts live video intake interview. Zero human required.',
  color: 'green',
  border: 'border-green-500/30',
  bg: 'bg-green-500/10',
  iconGradient: 'from-green-500 to-green-700',
  tagColor: 'text-green-400'
}];

// ─── Executive Avatar Card ────────────────────────────────────────────────────
function ExecAvatarCard({
  exec,
  index,
  playingId,
  onPlay





}: {exec: (typeof executives)[0];index: number;playingId: string | null;onPlay: (id: string) => void;}) {
  const isPlaying = playingId === exec.id;
  return (
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
        delay: index * 0.07,
        duration: 0.45
      }}
      className={`${exec.bg} border ${exec.border} rounded-2xl p-4 flex flex-col items-center text-center`}>

      {/* Avatar circle */}
      <div className="relative mb-3">
        <div
          className={`w-20 h-20 bg-gradient-to-br ${exec.gradient} rounded-full flex items-center justify-center shadow-lg`}>

          <span className="text-white font-black text-3xl">{exec.initial}</span>
        </div>
        {/* Video ready badge */}
        <div className="absolute -top-1 -right-1 flex items-center gap-1 bg-green-500/20 border border-green-500/40 rounded-full px-1.5 py-0.5">
          <motion.div
            animate={{
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity
            }}
            className="w-1.5 h-1.5 bg-green-400 rounded-full" />

          <span className="text-[8px] font-black text-green-400">VIDEO</span>
        </div>
      </div>

      <p className="font-black text-white text-sm">{exec.name}</p>
      <p className={`text-xs font-bold mb-2 ${exec.text}`}>{exec.role}</p>

      {/* ElevenLabs voice badge */}
      <div className="flex items-center gap-1 bg-orange-500/15 border border-orange-500/30 rounded-full px-2 py-0.5 mb-3">
        <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
          <span
            className="text-white font-black leading-none"
            style={{
              fontSize: '6px'
            }}>

            11
          </span>
        </div>
        <span className="text-[9px] font-bold text-orange-400">
          ElevenLabs Voice
        </span>
      </div>

      {/* Waveform or static bars */}
      <div className="h-7 flex items-center justify-center mb-3 w-full">
        {isPlaying ?
        <WaveformBars count={8} color="bg-teal-400" active={true} /> :

        <div className="flex items-center gap-0.5 h-7">
            {[3, 5, 4, 6, 3, 5, 4, 5].map((h, i) =>
          <div
            key={i}
            className="w-1 bg-white/10 rounded-full"
            style={{
              height: `${h * 4}px`
            }} />

          )}
          </div>
        }
      </div>

      {/* Quote when playing */}
      <AnimatePresence>
        {isPlaying &&
        <motion.p
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
          className={`text-xs italic leading-relaxed mb-3 ${exec.text}`}>

            "{exec.quote}"
          </motion.p>
        }
      </AnimatePresence>

      {/* Play button */}
      <button
        onClick={() => onPlay(exec.id)}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-teal-500 shadow-lg shadow-teal-500/30' : 'bg-white/10 border border-white/20 hover:bg-teal-500/20 hover:border-teal-500/40'}`}
        aria-label={isPlaying ? 'Stop' : `Play ${exec.name}`}>

        {isPlaying ?
        <PauseIcon className="w-3.5 h-3.5 text-white" /> :

        <PlayIcon className="w-3.5 h-3.5 text-white ml-0.5" />
        }
      </button>
    </motion.div>);

}
// ─── Main Component ───────────────────────────────────────────────────────────
export function HeyGenAvatarStudio() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [heygenKey, setHeygenKey] = useState('');
  const [connected, setConnected] = useState(false);
  const [voiceProfile, setVoiceProfile] = useState('Professional');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    setPlayingId(id);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setPlayingId(null), 3000);
  };
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );
  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 2500);
  };
  return (
    <section
      id="avatar-studio"
      className="w-full bg-gradient-to-b from-slate-900 to-slate-950 py-20 lg:py-32">

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
            className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-500/40 rounded-full px-5 py-2 mb-6">

            <div className="w-4 h-4 bg-gradient-to-br from-teal-500 to-cyan-500 rounded flex items-center justify-center">
              <span
                className="text-white font-black leading-none"
                style={{
                  fontSize: '7px'
                }}>

                HG
              </span>
            </div>
            <span className="text-sm font-bold text-teal-300 uppercase tracking-widest">
              Talking Avatar Infrastructure · HeyGen + ElevenLabs
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-5 leading-tight">
            Your AI Team Has a Face.
            <br />
            <span className="text-teal-400">And a Voice.</span>
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            HeyGen video avatars + ElevenLabs voice synthesis = AI executives
            that look you in the eye, speak your name, and conduct real
            interviews. Triggered from a QR code scan.
          </p>
        </motion.div>

        {/* ── Part 1: Stack Banner ── */}
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
            {/* HeyGen */}
            <div className="flex flex-col items-center lg:items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                  <span className="text-white font-black text-xl leading-none">
                    HG
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">HeyGen</p>
                  <p className="text-sm text-teal-400 font-semibold">
                    Video Avatar Platform
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 text-center lg:text-left">
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  Photorealistic lip-sync
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  Custom face upload
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <CheckCircleIcon className="w-3 h-3 text-teal-400 flex-shrink-0" />
                  Real-time generation
                </p>
              </div>
            </div>

            {/* Center */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500/20 border border-teal-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-teal-400 font-black text-sm">HG</span>
                </div>
                <span className="text-2xl font-black text-slate-500">×</span>
                <div className="w-8 h-8 bg-orange-500/20 border border-orange-500/30 rounded-lg flex items-center justify-center">
                  <span className="text-orange-400 font-black text-sm">11</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-white mb-1">
                  Talking Avatar Stack
                </p>
                <WaveformBars count={8} color="bg-teal-400" active={true} />
              </div>
              <p className="text-xs text-slate-500 text-center leading-relaxed">
                ElevenLabs voice → HeyGen lip-sync
                <br />→ Talking AI executive
              </p>
            </div>

            {/* ElevenLabs */}
            <div className="flex flex-col items-center lg:items-end gap-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <span className="text-white font-black text-2xl leading-none">
                    11
                  </span>
                </div>
                <div>
                  <p className="text-2xl font-black text-white">ElevenLabs</p>
                  <p className="text-sm text-orange-400 font-semibold">
                    Voice AI Platform
                  </p>
                </div>
              </div>
              <div className="space-y-1.5 text-center lg:text-right">
                <p className="text-xs text-slate-400 flex items-center gap-1.5 lg:flex-row-reverse">
                  <CheckCircleIcon className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  Voice cloning
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 lg:flex-row-reverse">
                  <CheckCircleIcon className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  Real-time TTS
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 lg:flex-row-reverse">
                  <CheckCircleIcon className="w-3 h-3 text-orange-400 flex-shrink-0" />
                  Broadcast quality
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Part 2: Executive Gallery ── */}
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
              AI Executive Team
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
              Meet Your AI Executive Team
            </h3>
            <p className="text-slate-400 text-sm">
              Each executive has a HeyGen video avatar powered by their unique
              ElevenLabs voice.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {executives.map((exec, i) =>
            <ExecAvatarCard
              key={exec.id}
              exec={exec}
              index={i}
              playingId={playingId}
              onPlay={handlePlay} />

            )}
          </div>
        </div>

        {/* ── Part 3: Customer Face Customizer ── */}
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
              Custom Avatar Builder
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white mb-2">
              Give Your AI a Face Your Customers Know
            </h3>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Upload a photo of yourself or your team. HeyGen generates a custom
              video avatar that speaks with your ElevenLabs voice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload panel */}
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
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Upload Your Photo
              </p>

              {/* Drop zone */}
              <div className="border-dashed border-2 border-white/20 hover:border-teal-500/40 rounded-2xl p-8 flex flex-col items-center gap-3 mb-6 cursor-pointer transition-colors group">
                <div className="w-12 h-12 bg-teal-500/15 border border-teal-500/30 rounded-xl flex items-center justify-center group-hover:bg-teal-500/25 transition-colors">
                  <UploadIcon className="w-6 h-6 text-teal-400" />
                </div>
                <p className="text-sm font-bold text-white">
                  Drop your photo here
                </p>
                <p className="text-xs text-slate-500">or click to browse</p>
                <p className="text-xs text-slate-600">JPG, PNG · Max 10MB</p>
              </div>

              {/* Sample slots */}
              <div className="flex items-center gap-4 justify-center mb-4">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-slate-500 text-lg font-bold">+</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Your face</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-slate-500 text-lg font-bold">+</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Team member
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 bg-white/5 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center">
                    <span className="text-slate-500 text-lg font-bold">+</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Brand mascot
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center leading-relaxed bg-white/5 rounded-xl p-3">
                Your face is cloned by{' '}
                <span className="text-teal-400 font-semibold">HeyGen</span>.
                Your voice is cloned by{' '}
                <span className="text-orange-400 font-semibold">
                  ElevenLabs
                </span>
                . The result: an AI that looks and sounds exactly like you.
              </p>
            </motion.div>

            {/* Preview panel */}
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
                delay: 0.1
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                Avatar Preview
              </p>

              {/* Preview avatar */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <AnimatePresence mode="wait">
                  {generated ?
                  <motion.div
                    key="generated"
                    initial={{
                      scale: 0.8,
                      opacity: 0
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1
                    }}
                    className="relative w-28 h-28 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center shadow-xl shadow-teal-500/30">

                      <UserIcon className="w-14 h-14 text-white/80" />
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    </motion.div> :

                  <motion.div
                    key="preview"
                    className="w-28 h-28 bg-gradient-to-br from-teal-500/30 to-cyan-500/20 border-2 border-dashed border-teal-500/40 rounded-full flex items-center justify-center">

                      <UserIcon className="w-12 h-12 text-teal-400/50" />
                    </motion.div>
                  }
                </AnimatePresence>

                {generated &&
                <motion.div
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  className="text-center">

                    <p className="text-sm font-black text-white">
                      Custom Avatar
                    </p>
                    <p className="text-xs text-teal-400">
                      Ready for deployment
                    </p>
                  </motion.div>
                }
              </div>

              {/* Voice profile selector */}
              <div className="mb-4">
                <p className="text-xs font-bold text-slate-400 mb-2">
                  Voice Profile
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['Professional', 'Warm', 'Authoritative', 'Energetic'].map(
                    (profile) =>
                    <button
                      key={profile}
                      onClick={() => setVoiceProfile(profile)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${voiceProfile === profile ? 'bg-teal-500/20 border-teal-500/50 text-teal-400' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'}`}>

                        {profile}
                      </button>

                  )}
                </div>
              </div>

              {/* Generate button */}
              <AnimatePresence mode="wait">
                {generated ?
                <motion.div
                  key="done"
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  className="space-y-2">

                    <div className="flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-xl p-3">
                      <CheckCircleIcon className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-bold text-green-400">
                        Avatar generated successfully
                      </span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-black py-3 rounded-xl transition-all">
                      <VideoIcon className="w-4 h-4" />
                      Deploy Avatar
                    </button>
                  </motion.div> :

                <motion.div key="generate" className="space-y-2">
                    <button
                    onClick={handleGenerate}
                    disabled={generating}
                    className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-60 text-white font-black py-3.5 rounded-xl transition-all shadow-lg shadow-teal-500/20">

                      {generating ?
                    <>
                          <motion.div
                        animate={{
                          rotate: 360
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear'
                        }}>

                            <ZapIcon className="w-4 h-4" />
                          </motion.div>
                          Generating... ~2 min
                        </> :

                    <>
                          <VideoIcon className="w-4 h-4" />
                          Generate Avatar
                        </>
                    }
                    </button>
                    <p className="text-xs text-slate-500 text-center">
                      Powered by{' '}
                      <a
                      href="https://heygen.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:text-teal-300 transition-colors">

                        HeyGen API
                      </a>{' '}
                      +{' '}
                      <a
                      href="https://elevenlabs.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-400 hover:text-orange-300 transition-colors">

                        ElevenLabs Voice Cloning
                      </a>
                    </p>
                  </motion.div>
                }
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* ── Part 4: Use Cases ── */}
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
              Applications
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white">
              Where Talking Avatars{' '}
              <span className="text-teal-400">Power APEX</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={uc.title}
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
                  className={`${uc.bg} border ${uc.border} rounded-2xl p-5`}>

                  <div
                    className={`w-11 h-11 bg-gradient-to-br ${uc.iconGradient} rounded-xl flex items-center justify-center shadow-lg mb-4`}>

                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-black text-white mb-2">{uc.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {uc.desc}
                  </p>
                </motion.div>);

            })}
          </div>
        </div>

        {/* ── Part 5: API CTA ── */}
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
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">HG</span>
              </div>
              <p className="text-lg font-black text-white">
                Connect HeyGen to APEX
              </p>
            </div>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">
              Your API key unlocks avatar generation, custom face upload, and
              real-time video synthesis for all AI executives.
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
                    <CheckCircleIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-green-400">
                      HeyGen Connected
                    </p>
                    <p className="text-xs text-slate-400">
                      Avatar studio is active and ready
                    </p>
                  </div>
                </motion.div> :

              <motion.div key="form" className="space-y-3">
                  <input
                  type="password"
                  value={heygenKey}
                  onChange={(e) => setHeygenKey(e.target.value)}
                  placeholder="Enter your HeyGen API key..."
                  className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 font-mono" />

                  <button
                  onClick={() => {
                    if (heygenKey.trim()) setConnected(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white font-black py-3 rounded-xl transition-all shadow-lg">

                    <VideoIcon className="w-4 h-4" />
                    Connect Avatar Studio
                  </button>
                  <p className="text-center">
                    <a
                    href="https://heygen.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1">

                      Get API key at heygen.com
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
              Avatar Studio Stats
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-teal-500/10 border border-teal-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <VideoIcon className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-slate-300">Avatar quality</span>
                </div>
                <span className="text-lg font-black text-teal-400">
                  Photorealistic
                </span>
              </div>
              <div className="flex items-center justify-between bg-orange-500/10 border border-orange-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <UserIcon className="w-4 h-4 text-orange-400" />
                  <span className="text-sm text-slate-300">
                    Custom face upload
                  </span>
                </div>
                <span className="text-lg font-black text-orange-400">
                  Supported
                </span>
              </div>
              <div className="flex items-center justify-between bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <ZapIcon className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">
                    Generation time
                  </span>
                </div>
                <span className="text-lg font-black text-green-400">
                  ~2 min
                </span>
              </div>
              <div className="flex items-center justify-between bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <MicIcon className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-slate-300">
                    Lip-sync accuracy
                  </span>
                </div>
                <span className="text-lg font-black text-purple-400">99%</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}