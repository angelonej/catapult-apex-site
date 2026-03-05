import React, { useEffect, useState, useRef, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicIcon,
  PlayIcon,
  PauseIcon,
  Volume2Icon,
  DownloadIcon,
  ShareIcon,
  TrendingUpIcon,
  RadioIcon,
  ZapIcon,
  RssIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  BrainIcon,
  SparklesIcon,
  UsersIcon,
  ClockIcon,
  BarChart3Icon,
  ChevronRightIcon } from
'lucide-react';
// ─── Types ────────────────────────────────────────────────────────────────────
interface Episode {
  num: string;
  title: string;
  guest: string;
  role: string;
  tags: string[];
  duration: string;
  date: string;
  trendScore: number;
  accentColor: string;
  borderColor: string;
  tagBg: string;
}
// ─── Data ─────────────────────────────────────────────────────────────────────
const recentEpisodes: Episode[] = [
{
  num: 'EP 046',
  title:
  'From Foreman to AI Trainer: How I Earn Royalties on My Own Expertise',
  guest: 'Marcus Rivera',
  role: 'Field Supervisor',
  tags: ['Skill Royalties', 'Embodied AI'],
  duration: '38 min',
  date: 'Dec 18',
  trendScore: 91,
  accentColor: 'border-l-blue-500',
  borderColor: 'border-blue-500/20',
  tagBg: 'bg-blue-500/15 text-blue-400'
},
{
  num: 'EP 045',
  title: 'The CFO That Never Sleeps: Cash Flow Automation in Real Businesses',
  guest: 'Sarah K.',
  role: 'Founder',
  tags: ['AI CFO', 'Cash Flow', 'Automation'],
  duration: '44 min',
  date: 'Dec 15',
  trendScore: 88,
  accentColor: 'border-l-green-500',
  borderColor: 'border-green-500/20',
  tagBg: 'bg-green-500/15 text-green-400'
},
{
  num: 'EP 044',
  title: 'HIPAA on the Blockchain: What Healthcare Operators Need to Know',
  guest: 'Dr. Chen',
  role: 'Practice Owner',
  tags: ['HIPAA', 'Blockchain', 'Healthcare'],
  duration: '51 min',
  date: 'Dec 12',
  trendScore: 95,
  accentColor: 'border-l-cyan-500',
  borderColor: 'border-cyan-500/20',
  tagBg: 'bg-cyan-500/15 text-cyan-400'
},
{
  num: 'EP 043',
  title:
  'Quantum-Ready Security: Why Your Business Data Needs Post-Quantum Crypto Now',
  guest: 'James T.',
  role: 'IT Director',
  tags: ['Quantum', 'Security', 'FedRAMP'],
  duration: '35 min',
  date: 'Dec 9',
  trendScore: 87,
  accentColor: 'border-l-purple-500',
  borderColor: 'border-purple-500/20',
  tagBg: 'bg-purple-500/15 text-purple-400'
},
{
  num: 'EP 042',
  title: 'The UBI Path: When AI Savings Become Employee Income',
  guest: 'Rivera Landscaping Team',
  role: 'Field Operations',
  tags: ['UHI', 'Dividends', 'Future of Work'],
  duration: '47 min',
  date: 'Dec 6',
  trendScore: 93,
  accentColor: 'border-l-yellow-500',
  borderColor: 'border-yellow-500/20',
  tagBg: 'bg-yellow-500/15 text-yellow-400'
},
{
  num: 'EP 041',
  title:
  'Humanoid Integration: Training the Robots That Will Work Beside You',
  guest: 'Dr. Patel',
  role: 'Operations Lead',
  tags: ['Humanoid', 'Skill Transfer', '2028'],
  duration: '39 min',
  date: 'Dec 3',
  trendScore: 89,
  accentColor: 'border-l-orange-500',
  borderColor: 'border-orange-500/20',
  tagBg: 'bg-orange-500/15 text-orange-400'
}];

const productionSteps = [
{
  icon: TrendingUpIcon,
  title: 'Trend Detection',
  desc: 'AI CMO scans 10,000+ sources daily — news, social, industry reports — to identify the highest-signal topics for your audience.',
  status: 'Running 24/7',
  statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  iconGradient: 'from-blue-500 to-blue-700',
  border: 'border-blue-500/30',
  bg: 'bg-blue-500/10',
  poweredBy: null
},
{
  icon: MicIcon,
  title: 'AI CEO Scripts & Interviews',
  desc: 'AI CEO generates interview questions, reaches out to employee contributors, and conducts structured conversations via the APEX platform.',
  status: 'In Progress',
  statusColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  iconGradient: 'from-orange-500 to-orange-600',
  border: 'border-orange-500/30',
  bg: 'bg-orange-500/10',
  poweredBy: null
},
{
  icon: RadioIcon,
  title: 'Voice Synthesis & Edit',
  desc: 'ElevenLabs voice AI synthesizes the AI CEO host voice and all guest voices. Broadcast-quality audio produced in minutes — no studio required.',
  status: 'Automated',
  statusColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  iconGradient: 'from-purple-500 to-purple-700',
  border: 'border-purple-500/30',
  bg: 'bg-purple-500/10',
  poweredBy: 'ElevenLabs'
},
{
  icon: ZapIcon,
  title: 'One-Click Publish',
  desc: 'When you approve, the episode publishes simultaneously to Spotify, Apple Podcasts, YouTube, and your RSS feed.',
  status: 'Instant',
  statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  iconGradient: 'from-green-500 to-green-700',
  border: 'border-green-500/30',
  bg: 'bg-green-500/10',
  poweredBy: null
}];

const studioLines = [
{
  text: 'AI CMO: Analyzing trending topics... 847 sources scanned',
  color: 'text-green-400'
},
{
  text: 'AI CEO: Drafting interview questions for EP 048...',
  color: 'text-blue-400'
},
{
  text: 'AI Audio Engineer: Mixing EP 047 final cut...',
  color: 'text-purple-400'
},
{
  text: 'AI CMO: Episode 047 approved for publishing',
  color: 'text-yellow-400'
},
{
  text: 'Publishing to Spotify... Apple Podcasts... YouTube...',
  color: 'text-green-400'
}];

// ─── Waveform Bars ────────────────────────────────────────────────────────────
function WaveformBars() {
  const heights = [40, 70, 55, 85, 45, 75, 50, 90, 60, 40, 80, 55, 70];
  return (
    <div className="flex items-center gap-0.5 h-8">
      {heights.map((h, i) =>
      <motion.div
        key={i}
        animate={{
          scaleY: [1, h / 50, 0.4, h / 60, 1]
        }}
        transition={{
          duration: 1.2 + i * 0.08,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.07
        }}
        style={{
          height: `${h}%`
        }}
        className="w-1 bg-orange-400 rounded-full origin-center" />

      )}
    </div>);

}
// ─── Episode Card ─────────────────────────────────────────────────────────────
function EpisodeCard({ ep, index }: {ep: Episode;index: number;}) {
  const [playing, setPlaying] = useState(false);
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
        delay: index * 0.08,
        duration: 0.5
      }}
      className={`bg-white/5 border ${ep.borderColor} border-l-4 ${ep.accentColor} rounded-2xl p-5 flex gap-4`}>

      {/* Play button */}
      <button
        onClick={() => setPlaying((v) => !v)}
        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 mt-1 hover:border-orange-500/60 hover:bg-orange-500/10 transition-all"
        aria-label={playing ? 'Pause' : 'Play'}>

        {playing ?
        <PauseIcon className="w-4 h-4 text-orange-400" /> :

        <PlayIcon className="w-4 h-4 text-white ml-0.5" />
        }
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="text-xs text-slate-500 font-mono">{ep.num}</span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${ep.trendScore >= 93 ? 'bg-green-500/20 text-green-400' : ep.trendScore >= 89 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-500/20 text-slate-400'}`}>

            {ep.trendScore}/100 trend
          </span>
        </div>
        <p className="text-sm font-bold text-white leading-snug mb-1.5">
          {ep.title}
        </p>
        <p className="text-xs text-slate-400 mb-2">
          AI CEO + <span className="text-slate-300">{ep.guest}</span>, {ep.role}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {ep.tags.map((tag) =>
          <span
            key={tag}
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ep.tagBg}`}>

              {tag}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <ClockIcon className="w-3 h-3" />
            {ep.duration}
          </span>
          <span>{ep.date}</span>
        </div>
      </div>
    </motion.div>);

}
// ─── Main Component ───────────────────────────────────────────────────────────
export function AIPodcastHub() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studioLine, setStudioLine] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Progress bar simulation
  useEffect(() => {
    if (isPlaying) {
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.05;
        });
      }, 50);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying]);
  // Studio lines cycling
  useEffect(() => {
    const t = setInterval(
      () => setStudioLine((l) => (l + 1) % studioLines.length),
      3000
    );
    return () => clearInterval(t);
  }, []);
  const currentTime = Math.floor(progress / 100 * 42 * 60);
  const mins = Math.floor(currentTime / 60).
  toString().
  padStart(2, '0');
  const secs = (currentTime % 60).toString().padStart(2, '0');
  return (
    <section
      id="podcast"
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
            className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/40 rounded-full px-5 py-2 mb-6">

            <MicIcon className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-orange-300 uppercase tracking-widest">
              AI-Produced · Trend-Driven · Published Live
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
            The Catapult AI Management
            <br />
            <span className="text-orange-400">Podcast</span>
          </h2>
          <p className="text-lg text-slate-400 mb-2 font-semibold">
            Produced by the AI Marketing Team. Hosted by the AI CEO.
          </p>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm leading-relaxed">
            Every episode is researched, scripted, recorded, and published by AI
            — based on real-time business trends. When you select 'Publish', the
            episode goes live across all platforms instantly.
          </p>
        </motion.div>

        {/* ── Part 1: Featured Episode Player ── */}
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
          className="bg-slate-900 border border-white/10 rounded-3xl p-6 lg:p-8 mb-12">

          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-8">
            {/* Left: Artwork */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="relative w-48 h-48 bg-gradient-to-br from-orange-500/30 to-purple-500/30 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10 shadow-2xl overflow-hidden">
                {/* Background pattern */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                    'radial-gradient(circle at 30% 30%, rgba(251,146,60,0.5) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(168,85,247,0.5) 0%, transparent 60%)'
                  }} />

                <div className="relative z-10 text-center">
                  <MicIcon className="w-16 h-16 text-white/80 mx-auto mb-2" />
                  <p className="text-xs font-black text-white/60 uppercase tracking-widest">
                    Catapult
                  </p>
                  <p className="text-xs font-black text-orange-400 uppercase tracking-widest">
                    Podcast
                  </p>
                </div>
                {/* Waveform overlay when playing */}
                {isPlaying &&
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                    <WaveformBars />
                  </div>
                }
              </div>

              {/* Platform badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400">
                  ♫ Spotify
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400">
                  🎵 Apple
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400">
                  ▶ YouTube
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400">
                  <RssIcon className="w-3 h-3" /> RSS
                </span>
              </div>
            </div>

            {/* Right: Episode info + controls */}
            <div className="flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400">
                    EP 047
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <BarChart3Icon className="w-3 h-3" />
                    Trend score:{' '}
                    <span className="text-green-400 font-bold">94/100</span>
                  </span>
                  <span className="text-xs text-slate-500">Today, 9:14 AM</span>
                </div>

                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 leading-snug">
                  The Human-AI Dividend: How Field Workers Earn From AI
                  Performance
                </h3>

                <p className="text-sm text-orange-400 font-semibold mb-3">
                  AI CEO interviews: Marcus Rivera (Field Operator) + Sarah K.
                  (Founder)
                </p>

                <p className="text-sm text-slate-400 leading-relaxed">
                  This week, our AI CEO sits down with two contributors earning
                  monthly dividends from AI-generated savings. We explore the
                  mechanics of skill royalties, what it feels like to train a
                  machine that earns for you, and the path to Universal Human
                  Income.
                </p>
              </div>

              {/* Playback controls */}
              <div>
                {/* Progress bar */}
                <div className="mb-3">
                  <div
                    className="w-full bg-white/10 rounded-full h-2 cursor-pointer"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pct = (e.clientX - rect.left) / rect.width * 100;
                      setProgress(Math.max(0, Math.min(100, pct)));
                    }}>

                    <motion.div
                      style={{
                        width: `${progress}%`
                      }}
                      className="h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full relative">

                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-mono text-slate-400">
                      {mins}:{secs}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      42:00
                    </span>
                  </div>
                </div>

                {/* Controls row */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying((v) => !v)}
                    className="w-12 h-12 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition-all flex-shrink-0"
                    aria-label={isPlaying ? 'Pause' : 'Play'}>

                    {isPlaying ?
                    <PauseIcon className="w-5 h-5 text-white" /> :

                    <PlayIcon className="w-5 h-5 text-white ml-0.5" />
                    }
                  </button>

                  {isPlaying &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.8
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0
                    }}>

                      <WaveformBars />
                    </motion.div>
                  }

                  <div className="flex items-center gap-3 ml-auto">
                    <button
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Volume">

                      <Volume2Icon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Download">

                      <DownloadIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-slate-400 hover:text-white transition-colors"
                      aria-label="Share">

                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Part 2: AI Production Pipeline ── */}
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
              How Every Episode is Made
            </p>
            <h3 className="text-2xl lg:text-3xl font-black text-white">
              The AI marketing team handles{' '}
              <span className="text-orange-400">everything.</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {productionSteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
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
                  className="relative">

                  <div
                    className={`${step.bg} border ${step.border} rounded-2xl p-5 h-full`}>

                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-11 h-11 bg-gradient-to-br ${step.iconGradient} rounded-xl flex items-center justify-center shadow-lg`}>

                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className={`text-xs font-bold border rounded-full px-2.5 py-1 ${step.statusColor}`}>

                        {step.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black text-slate-500">
                        0{i + 1}
                      </span>
                      <h4 className="font-black text-white text-sm">
                        {step.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                    {step.poweredBy &&
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5">
                        <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
                          <span
                          className="text-white font-black leading-none"
                          style={{
                            fontSize: '7px'
                          }}>

                            11
                          </span>
                        </div>
                        <span className="text-xs font-bold text-orange-400">
                          Powered by ElevenLabs
                        </span>
                      </div>
                    }
                  </div>
                  {/* Arrow connector */}
                  {i < productionSteps.length - 1 &&
                  <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10">
                      <ChevronRightIcon className="w-5 h-5 text-slate-600" />
                    </div>
                  }
                </motion.div>);

            })}
          </div>
        </div>

        {/* ── Part 3 + 4: Episode Grid + Live Studio ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Episode Grid — takes 2 cols */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Recent Episodes
              </p>
              <button className="text-xs text-orange-400 font-bold flex items-center gap-1 hover:text-orange-300 transition-colors">
                View all <ArrowRightIcon className="w-3 h-3" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {recentEpisodes.map((ep, i) =>
              <EpisodeCard key={ep.num} ep={ep} index={i} />
              )}
            </div>
          </div>

          {/* Live Studio Panel */}
          <div className="space-y-4">
            {/* Live recording indicator */}
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
                duration: 0.6
              }}
              className="bg-slate-900/80 border border-green-500/20 rounded-2xl overflow-hidden">

              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/10 bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    AI Production Studio
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
                    className="w-2 h-2 bg-red-400 rounded-full" />

                  <span className="text-xs font-bold text-red-400">REC</span>
                </div>
              </div>

              <div className="p-4 space-y-2 min-h-[180px]">
                <AnimatePresence>
                  {studioLines.map((line, i) => {
                    const isActive = i === studioLine;
                    const isPast = i < studioLine;
                    if (!isActive && !isPast) return null;
                    return (
                      <motion.div
                        key={`${i}-${studioLine}`}
                        initial={{
                          opacity: 0,
                          x: -8
                        }}
                        animate={{
                          opacity: isActive ? 1 : 0.4,
                          x: 0
                        }}
                        transition={{
                          duration: 0.3
                        }}
                        className="flex items-start gap-2">

                        {isActive &&
                        <motion.div
                          animate={{
                            opacity: [1, 0, 1]
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity
                          }}
                          className="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />

                        }
                        {!isActive &&
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
            </motion.div>

            {/* AI Team producing this episode */}
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
                delay: 0.15
              }}
              className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                AI Production Team
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                    <TrendingUpIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">AI CMO</p>
                    <p className="text-xs text-slate-500">
                      Topic research & trend analysis
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="ml-auto w-2 h-2 bg-blue-400 rounded-full" />

                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                    <BrainIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">AI CEO</p>
                    <p className="text-xs text-slate-500">Host & interviewer</p>
                  </div>
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                    className="ml-auto w-2 h-2 bg-orange-400 rounded-full" />

                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
                    <RadioIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      AI Audio Engineer
                    </p>
                    <p className="text-xs text-slate-500">
                      Voice synthesis & production
                    </p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1 bg-orange-500/15 border border-orange-500/30 rounded-full px-2 py-0.5">
                      <div className="w-3 h-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
                        <span
                          className="text-white font-black leading-none"
                          style={{
                            fontSize: '6px'
                          }}>

                          11
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-orange-400">
                        ElevenLabs TTS
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-700 rounded-lg flex items-center justify-center">
                    <ZapIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">
                      AI Distribution Agent
                    </p>
                    <p className="text-xs text-slate-500">
                      Multi-platform publishing
                    </p>
                  </div>
                  <motion.div
                    animate={{
                      opacity: [1, 0.3, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: 1.5
                    }}
                    className="ml-auto w-2 h-2 bg-green-400 rounded-full" />

                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Part 5: Subscribe + Publish CTA ── */}
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

          {/* Subscribe panel */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-7">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
              Subscribe
            </p>
            <h3 className="text-xl font-black text-white mb-5">
              Never Miss an Episode
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 font-bold text-sm hover:bg-green-500/20 transition-all">
                <span className="text-base">♫</span> Spotify
              </button>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-bold text-sm hover:bg-purple-500/20 transition-all">
                <span className="text-base">🎵</span> Apple Podcasts
              </button>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-sm hover:bg-red-500/20 transition-all">
                <span className="text-base">▶</span> YouTube
              </button>
              <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 font-bold text-sm hover:bg-orange-500/20 transition-all">
                <RssIcon className="w-4 h-4" /> RSS Feed
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-4">
              New episodes publish automatically when AI production is complete.
            </p>
          </div>

          {/* Publish panel */}
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-500/15 to-yellow-500/10 border border-orange-500/30 rounded-3xl p-7">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.06, 0.12, 0.06]
              }}
              transition={{
                duration: 6,
                repeat: Infinity
              }}
              className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">
                For Platform Users
              </p>
              <h3 className="text-xl font-black text-white mb-1">
                Your Episode is Ready
              </h3>
              <p className="text-sm text-slate-400 mb-4">
                EP 048 — AI CEO Interview with{' '}
                <span className="text-white font-semibold">[Your Name]</span>
              </p>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <CheckCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  Script approved by AI CMO
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <CheckCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  Voice synthesized · Broadcast quality
                </div>
                <div className="flex items-center gap-2 text-xs text-green-400">
                  <CheckCircleIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  Ready to publish
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all shadow-lg text-base">
                <ZapIcon className="w-5 h-5" />
                Publish Episode Now
              </button>
              <p className="text-xs text-slate-500 text-center mt-3">
                Publishes to all platforms simultaneously · Blockchain-verified
                timestamp
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}