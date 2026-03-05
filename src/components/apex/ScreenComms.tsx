import React, { useEffect, useState, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MicIcon,
  PlayIcon,
  PauseIcon,
  RadioIcon,
  ZapIcon,
  RssIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  TrendingUpIcon,
  BarChart3Icon,
  ClockIcon,
  ShareIcon,
  HeartIcon,
  MessageSquareIcon,
  RepeatIcon,
  SearchIcon,
  CalendarIcon,
  SendIcon,
  EditIcon,
  ExternalLinkIcon,
  SparklesIcon,
  PlusIcon,
  BrainIcon,
  UsersIcon,
  DollarSignIcon,
  MailIcon,
  GlobeIcon,
  VideoIcon,
  NewspaperIcon,
  AlertCircleIcon } from
'lucide-react';
// ─── Types ────────────────────────────────────────────────────────────────────
type CommsTab = 'podcast' | 'social' | 'pr' | 'marketing' | 'calendar';
// ─── Waveform ─────────────────────────────────────────────────────────────────
function WaveformBars({
  active,
  count = 13,
  color = 'bg-orange-400'




}: {active: boolean;count?: number;color?: string;}) {
  const heights = [40, 70, 55, 85, 45, 90, 60, 80, 50, 75, 45, 65, 55];
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
          duration: 1.1 + i * 0.07,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.06
        }}
        style={{
          height: `${heights[i % heights.length]}%`
        }}
        className={`w-1 ${color} rounded-full origin-center`} />

      )}
    </div>);

}
// ─── Status Dot ───────────────────────────────────────────────────────────────
function LiveDot() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
    </span>);

}
// ─── TAB 1: PODCAST ──────────────────────────────────────────────────────────
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
  text: 'ElevenLabs: Voice synthesis complete · Broadcast quality',
  color: 'text-orange-400'
},
{
  text: 'Publishing to Spotify... Apple Podcasts... YouTube...',
  color: 'text-green-400'
}];

function TabPodcast() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [studioLine, setStudioLine] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    if (isPlaying) {
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return p + 0.06;
        });
      }, 50);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying]);
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Left: Episode + Pipeline */}
      <div className="lg:col-span-2 space-y-4">
        {/* Episode card */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400">
              EP 047 · LATEST
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400">
              Trend Score: 94/100
            </span>
            <span className="text-xs text-slate-500 ml-auto">
              Today, 9:14 AM
            </span>
          </div>

          <h3 className="text-base font-black text-white mb-1 leading-snug">
            The Human-AI Dividend: How Field Workers Earn From AI Performance
          </h3>
          <p className="text-xs text-orange-400 font-semibold mb-1">
            AI CEO interviews: Marcus Rivera + Sarah K.
          </p>
          <p className="text-xs text-slate-500 mb-3">
            42:00 · Published Today 9:14 AM
          </p>

          {/* Platform badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400">
              ♫ Spotify
            </span>
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400">
              🎵 Apple
            </span>
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400">
              ▶ YouTube
            </span>
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400">
              <RssIcon className="w-3 h-3" /> RSS
            </span>
          </div>

          {/* Player */}
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={() => setIsPlaying((v) => !v)}
              className="w-11 h-11 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center shadow-lg transition-all flex-shrink-0">

              {isPlaying ?
              <PauseIcon className="w-5 h-5 text-white" /> :

              <PlayIcon className="w-5 h-5 text-white ml-0.5" />
              }
            </button>
            {isPlaying && <WaveformBars active={isPlaying} />}
          </div>

          {/* Progress bar */}
          <div
            className="w-full bg-white/10 rounded-full h-2 cursor-pointer mb-1"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setProgress(
                Math.max(
                  0,
                  Math.min(100, (e.clientX - rect.left) / rect.width * 100)
                )
              );
            }}>

            <motion.div
              style={{
                width: `${progress}%`
              }}
              className="h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full relative">

              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg" />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs font-mono text-slate-500 mb-4">
            <span>
              {mins}:{secs}
            </span>
            <span>42:00</span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-3 border-t border-white/10 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <PlayIcon className="w-3 h-3 text-orange-400" />
              2,847 plays
            </span>
            <span className="flex items-center gap-1">
              <BarChart3Icon className="w-3 h-3 text-blue-400" />
              94% completion
            </span>
            <span className="flex items-center gap-1">⭐ 4.9 rating</span>
          </div>
        </div>

        {/* Production pipeline */}
        <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Production Pipeline
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {[
            {
              icon: TrendingUpIcon,
              label: 'Trend Detection',
              status: 'Done',
              statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
              iconGradient: 'from-blue-500 to-blue-700'
            },
            {
              icon: MicIcon,
              label: 'AI CEO Scripts',
              status: 'Done',
              statusColor:
              'bg-orange-500/20 text-orange-400 border-orange-500/30',
              iconGradient: 'from-orange-500 to-orange-600'
            },
            {
              icon: RadioIcon,
              label: 'Voice Synthesis',
              status: 'Done',
              statusColor:
              'bg-purple-500/20 text-purple-400 border-purple-500/30',
              iconGradient: 'from-purple-500 to-purple-700',
              badge: 'ElevenLabs'
            },
            {
              icon: ZapIcon,
              label: 'Published',
              status: 'Live',
              statusColor:
              'bg-green-500/20 text-green-400 border-green-500/30',
              iconGradient: 'from-green-500 to-green-700'
            }].
            map((step, i, arr) => {
              const Icon = step.icon;
              return (
                <Fragment key={step.label}>
                  <div className="flex flex-col items-center gap-1.5 flex-shrink-0 min-w-[80px]">
                    <div
                      className={`w-9 h-9 bg-gradient-to-br ${step.iconGradient} rounded-xl flex items-center justify-center shadow-md`}>

                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-[10px] font-bold text-white text-center leading-tight">
                      {step.label}
                    </p>
                    <span
                      className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${step.statusColor}`}>

                      {step.status}
                    </span>
                    {step.badge &&
                    <div className="flex items-center gap-0.5 bg-orange-500/15 border border-orange-500/30 rounded-full px-1.5 py-0.5">
                        <span className="text-[8px] font-black text-orange-400">
                          11
                        </span>
                      </div>
                    }
                  </div>
                  {i < arr.length - 1 &&
                  <ChevronRightIcon className="w-4 h-4 text-slate-600 flex-shrink-0 mt-2" />
                  }
                </Fragment>);

            })}
          </div>
        </div>
      </div>

      {/* Right: Studio Terminal */}
      <div className="space-y-4">
        <div className="bg-slate-900/80 border border-green-500/20 rounded-2xl overflow-hidden">
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
          <div className="p-4 space-y-2 min-h-[160px]">
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
                      opacity: isActive ? 1 : 0.35,
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

        {/* Next episode */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              In Production
            </p>
            <span className="text-xs font-bold text-orange-400">EP 048</span>
          </div>
          <p className="text-sm font-bold text-white mb-1 leading-snug">
            AI Workforce Transition: What Happens When Your Job Gets Automated?
          </p>
          <p className="text-xs text-slate-500 mb-3">
            AI CEO + Dr. Patel · Est. 45 min
          </p>
          <div className="mb-1 flex justify-between text-xs text-slate-500">
            <span>Production progress</span>
            <span className="text-orange-400 font-bold">67%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2 mb-4">
            <motion.div
              initial={{
                width: 0
              }}
              animate={{
                width: '67%'
              }}
              transition={{
                duration: 1.2,
                ease: 'easeOut'
              }}
              className="h-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full" />

          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-2.5 rounded-xl transition-all text-sm">
            <ZapIcon className="w-4 h-4" /> Approve & Publish
          </button>
        </div>
      </div>
    </div>);

}
// ─── TAB 2: SOCIAL ───────────────────────────────────────────────────────────
const platforms = [
{
  id: 'linkedin',
  name: 'LinkedIn',
  initial: 'in',
  color: 'bg-blue-600',
  textColor: 'text-blue-400',
  borderColor: 'border-blue-500/30',
  bgColor: 'bg-blue-500/10',
  followers: '12,847 followers',
  post: 'Our AI CFO recovered $8,100 in overdue invoices this week — automatically. No calls, no awkward emails. Just results. 🚀',
  likes: 847,
  comments: 23,
  shares: 12,
  status: 'Live'
},
{
  id: 'twitter',
  name: 'X / Twitter',
  initial: '𝕏',
  color: 'bg-slate-700',
  textColor: 'text-slate-300',
  borderColor: 'border-slate-500/30',
  bgColor: 'bg-slate-500/10',
  followers: '8,234 followers',
  post: 'AI management is real. Our @CatapultAI COO just rescheduled 3 crews around a storm. Saved $3K. This thing is scary good.',
  likes: 312,
  comments: 45,
  shares: 89,
  status: 'Scheduled'
},
{
  id: 'instagram',
  name: 'Instagram',
  initial: '◉',
  color: 'bg-gradient-to-br from-pink-500 to-purple-600',
  textColor: 'text-pink-400',
  borderColor: 'border-pink-500/30',
  bgColor: 'bg-pink-500/10',
  followers: '5,621 followers',
  post: "Behind the scenes: AI executives working 24/7 so our team doesn't have to. This is what the future of work looks like ✨",
  likes: 1204,
  comments: 67,
  shares: 234,
  status: 'Live'
},
{
  id: 'youtube',
  name: 'YouTube',
  initial: '▶',
  color: 'bg-red-600',
  textColor: 'text-red-400',
  borderColor: 'border-red-500/30',
  bgColor: 'bg-red-500/10',
  followers: '3,892 subscribers',
  post: 'EP 047: The Human-AI Dividend [Full Episode] — How field workers earn monthly dividends from AI performance',
  likes: 2847,
  comments: 156,
  shares: 89,
  status: 'Live'
},
{
  id: 'tiktok',
  name: 'TikTok',
  initial: '♪',
  color: 'bg-teal-600',
  textColor: 'text-teal-400',
  borderColor: 'border-teal-500/30',
  bgColor: 'bg-teal-500/10',
  followers: '14,203 followers',
  post: '60-second AI CEO briefing: Your Q3 strategy is on track. Revenue up 23%. Watch the full breakdown 👇',
  likes: 8421,
  comments: 234,
  shares: 1203,
  status: 'Live'
},
{
  id: 'facebook',
  name: 'Facebook',
  initial: 'f',
  color: 'bg-blue-700',
  textColor: 'text-blue-400',
  borderColor: 'border-blue-600/30',
  bgColor: 'bg-blue-600/10',
  followers: '6,847 followers',
  post: 'Catapult Company: AI executive team update — 7 AI executives made 1,847 decisions this week, saving our clients $39,790.',
  likes: 423,
  comments: 34,
  shares: 67,
  status: 'Scheduled'
}];

function TabSocial() {
  const [tone, setTone] = useState('Professional');
  const [postText, setPostText] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
  'linkedin',
  'twitter',
  'instagram',
  'youtube',
  'tiktok',
  'facebook']
  );
  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
    prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 flex-wrap">
        <p className="text-sm font-black text-white">AI Social Media Manager</p>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400">
          Maya · AI CMO
        </span>
        <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/15 border border-green-500/30 text-green-400">
          <LiveDot />6 platforms active
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platforms.map((p, i) =>
        <motion.div
          key={p.id}
          initial={{
            opacity: 0,
            y: 12
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.07
          }}
          className={`${p.bgColor} border ${p.borderColor} rounded-2xl p-4`}>

            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div
                className={`w-9 h-9 ${p.color} rounded-xl flex items-center justify-center shadow-md`}>

                  <span className="text-white font-black text-sm">
                    {p.initial}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{p.name}</p>
                  <p className="text-xs text-slate-500">{p.followers}</p>
                </div>
              </div>
              <span
              className={`text-[10px] font-black px-2 py-0.5 rounded-full ${p.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>

                {p.status}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
              {p.post}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1">
                <HeartIcon className="w-3 h-3" />
                {p.likes >= 1000 ? `${(p.likes / 1000).toFixed(1)}K` : p.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquareIcon className="w-3 h-3" />
                {p.comments}
              </span>
              <span className="flex items-center gap-1">
                <RepeatIcon className="w-3 h-3" />
                {p.shares}
              </span>
            </div>
            <button
            className={`w-full text-xs font-bold py-2 rounded-xl border ${p.borderColor} ${p.textColor} ${p.bgColor} hover:opacity-80 transition-all`}>

              Post Now
            </button>
          </motion.div>
        )}
      </div>

      {/* AI Post Composer */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">AI Post Composer</p>
          <span className="text-xs font-bold text-pink-400 bg-pink-500/15 border border-pink-500/30 px-2 py-0.5 rounded-full">
            Maya (AI CMO)
          </span>
        </div>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Describe what you want to post about..."
          rows={3}
          className="w-full bg-slate-900 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50 resize-none mb-4" />

        <div className="flex flex-wrap gap-2 mb-4">
          {platforms.map((p) =>
          <button
            key={p.id}
            onClick={() => togglePlatform(p.id)}
            className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border transition-all ${selectedPlatforms.includes(p.id) ? `${p.bgColor} ${p.borderColor} ${p.textColor}` : 'bg-slate-800 border-slate-700 text-slate-500'}`}>

              <span>{p.initial}</span> {p.name}
            </button>
          )}
        </div>
        <div className="flex gap-2 mb-4">
          {['Professional', 'Engaging', 'Bold', 'Educational'].map((t) =>
          <button
            key={t}
            onClick={() => setTone(t)}
            className={`flex-1 text-xs font-bold py-2 rounded-xl border transition-all ${tone === t ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'}`}>

              {t}
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all text-sm">
            <SparklesIcon className="w-4 h-4" /> Generate Post
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-3 px-5 rounded-xl transition-all text-sm">
            <CalendarIcon className="w-4 h-4" /> Schedule
          </button>
        </div>
        <p className="text-xs text-slate-500 text-center mt-3">
          AI will optimize copy for each platform's character limits and
          audience
        </p>
      </div>
    </div>);

}
// ─── TAB 3: PR ────────────────────────────────────────────────────────────────
const pressReleases = [
{
  title: 'Catapult Company Raises $12M Series A',
  status: 'DRAFT',
  statusColor: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  date: 'Dec 18',
  agent: 'Iris · AI PR',
  action: 'Edit',
  actionColor: 'bg-slate-700 text-slate-300'
},
{
  title: 'APEX Platform Launches HeyGen Integration',
  status: 'REVIEW',
  statusColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  date: 'Dec 17',
  agent: 'Iris · AI PR',
  action: 'Approve',
  actionColor: 'bg-yellow-500/20 text-yellow-400'
},
{
  title: 'Catapult Reaches 500 SMB Customers',
  status: 'APPROVED',
  statusColor: 'bg-green-500/20 text-green-400 border-green-500/30',
  date: 'Dec 16',
  agent: 'Iris · AI PR',
  action: 'Distribute',
  actionColor: 'bg-green-500/20 text-green-400'
},
{
  title: 'AI Executive Platform Wins SMB Innovation Award',
  status: 'DISTRIBUTED',
  statusColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  date: 'Dec 14',
  agent: 'Iris · AI PR',
  action: '47 pickups',
  actionColor: 'bg-blue-500/20 text-blue-400'
}];

const mediaCoverage = [
{
  pub: 'TechCrunch',
  headline: 'AI Startup Catapult Brings C-Suite to Small Business',
  da: 94,
  date: '2 days ago',
  color: 'text-green-400'
},
{
  pub: 'Forbes',
  headline: 'The Future of SMB Management Is AI',
  da: 97,
  date: '5 days ago',
  color: 'text-blue-400'
},
{
  pub: 'Inc. Magazine',
  headline: '10 AI Tools Transforming Small Business',
  da: 89,
  date: '1 week ago',
  color: 'text-purple-400'
}];

const journalists = [
{
  name: 'Sarah Chen',
  pub: 'TechCrunch',
  beat: 'AI/Startups',
  status: 'Pitched 3 days ago',
  statusColor: 'text-yellow-400',
  extra: 'Open rate: 67%',
  action: 'Follow Up',
  actionColor: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
},
{
  name: 'Marcus Webb',
  pub: 'Forbes',
  beat: 'SMB/Business',
  status: 'Responded',
  statusColor: 'text-green-400',
  extra: 'Feature in progress',
  action: 'View Thread',
  actionColor: 'bg-green-500/20 text-green-400 border-green-500/30'
},
{
  name: 'Priya Patel',
  pub: 'Inc. Magazine',
  beat: 'Technology',
  status: 'Not yet pitched',
  statusColor: 'text-slate-500',
  extra: '',
  action: 'Pitch Now',
  actionColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
},
{
  name: 'James Torres',
  pub: 'WSJ',
  beat: 'Finance/Tech',
  status: 'Pitched 1 week ago',
  statusColor: 'text-slate-400',
  extra: '',
  action: 'Follow Up',
  actionColor: 'bg-slate-700 text-slate-300 border-slate-600'
},
{
  name: 'Claire Ashford',
  pub: 'Bloomberg',
  beat: 'Business',
  status: 'Not yet pitched',
  statusColor: 'text-slate-500',
  extra: '',
  action: 'Pitch Now',
  actionColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
}];

function TabPR() {
  const [search, setSearch] = useState('');
  const filtered = journalists.filter(
    (j) =>
    j.name.toLowerCase().includes(search.toLowerCase()) ||
    j.pub.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* Left */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-black text-white">
            Press Release Pipeline
          </p>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-400">
            Iris · AI PR Agent
          </span>
        </div>

        <div className="space-y-2">
          {pressReleases.map((pr, i) =>
          <motion.div
            key={i}
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
            className="bg-slate-900 border border-slate-700/50 rounded-xl p-4 flex items-start gap-3">

              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white leading-snug mb-1 truncate">
                  {pr.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{pr.date}</span>
                  <span>·</span>
                  <span>{pr.agent}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${pr.statusColor}`}>

                  {pr.status}
                </span>
                <button
                className={`text-xs font-bold px-2.5 py-1 rounded-lg ${pr.actionColor} border border-white/10`}>

                  {pr.action}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Media coverage */}
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
            Recent Coverage
          </p>
          <div className="space-y-2">
            {mediaCoverage.map((c, i) =>
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-start gap-3">

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-black ${c.color}`}>
                      {c.pub}
                    </span>
                    <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-700 ${c.color}`}>

                      DA {c.da}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-snug">
                    {c.headline}
                  </p>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">
                  {c.date}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right: Journalist outreach */}
      <div className="space-y-4">
        <p className="text-sm font-black text-white">AI Journalist Database</p>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search journalists..."
            className="w-full bg-slate-900 border border-slate-700/50 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-orange-500/50" />

        </div>

        <div className="space-y-2">
          {filtered.map((j, i) =>
          <motion.div
            key={j.name}
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
            className="bg-slate-900 border border-slate-700/50 rounded-xl p-3 flex items-center gap-3">

              <div className="w-9 h-9 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-black text-xs">
                  {j.name[0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">{j.name}</p>
                <p className="text-xs text-slate-500">
                  {j.pub} · {j.beat}
                </p>
                <p className={`text-xs ${j.statusColor}`}>
                  {j.status}
                  {j.extra ? ` · ${j.extra}` : ''}
                </p>
              </div>
              <button
              className={`text-xs font-bold px-2.5 py-1.5 rounded-xl border flex-shrink-0 ${j.actionColor}`}>

                {j.action}
              </button>
            </motion.div>
          )}
        </div>

        <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all text-sm">
          <SparklesIcon className="w-4 h-4" /> Generate AI Pitch
        </button>
      </div>
    </div>);

}
// ─── TAB 4: MARKETING ────────────────────────────────────────────────────────
const campaigns = [
{
  type: 'Email Sequence',
  name: 'New Customer Onboarding',
  color: 'text-green-400',
  bg: 'bg-green-500/10',
  border: 'border-green-500/30',
  stats: '14 emails · 67% open rate · 34% click rate',
  status: 'RUNNING',
  sub: '847 subscribers',
  progress: 67
},
{
  type: 'Google Ads',
  name: 'APEX Platform — SMB Keywords',
  color: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/30',
  stats: '$4,200/mo budget · 4.8x ROAS · 234 conversions',
  status: 'RUNNING',
  sub: 'CPC: $2.14',
  progress: 82
},
{
  type: 'LinkedIn Ads',
  name: 'AI Executive Platform for SMBs',
  color: 'text-blue-400',
  bg: 'bg-blue-500/10',
  border: 'border-blue-500/30',
  stats: '$2,800/mo budget · 3.2x ROAS · 89 leads',
  status: 'RUNNING',
  sub: 'CPL: $31.46',
  progress: 58
},
{
  type: 'SEO Content',
  name: '"AI Management Software" cluster',
  color: 'text-purple-400',
  bg: 'bg-purple-500/10',
  border: 'border-purple-500/30',
  stats: '47 articles published · Position 3 avg · 28,400 organic visits',
  status: 'RUNNING',
  sub: '14 new articles this month',
  progress: 74
}];

function TabMarketing() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm font-black text-white">
          AI Marketing Command Center
        </p>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400">
          Maya · AI CMO
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-400">
          Nova · Demand Gen
        </span>
        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400">
          Pixel · SEO
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
          <p className="text-2xl font-black text-green-400">$48,200</p>
          <p className="text-xs text-slate-400 mt-0.5">Email Revenue</p>
          <p className="text-xs text-green-400 font-bold mt-1">
            +34% vs last month
          </p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-4">
          <p className="text-2xl font-black text-orange-400">4.2x</p>
          <p className="text-xs text-slate-400 mt-0.5">Ad Spend ROI</p>
          <p className="text-xs text-orange-400 font-bold mt-1">
            $12,400 → $52,080
          </p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4">
          <p className="text-2xl font-black text-blue-400">28,400</p>
          <p className="text-xs text-slate-400 mt-0.5">Organic Traffic/mo</p>
          <p className="text-xs text-blue-400 font-bold mt-1">+67% YoY</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-4">
          <p className="text-2xl font-black text-purple-400">847</p>
          <p className="text-xs text-slate-400 mt-0.5">Leads This Month</p>
          <p className="text-xs text-purple-400 font-bold mt-1">
            23% conversion rate
          </p>
        </div>
      </div>

      {/* Active campaigns */}
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Active Campaigns
        </p>
        <div className="space-y-3">
          {campaigns.map((c, i) =>
          <motion.div
            key={c.name}
            initial={{
              opacity: 0,
              y: 8
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: i * 0.08
            }}
            className={`${c.bg} border ${c.border} rounded-2xl p-4`}>

              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-800 ${c.color}`}>

                      {c.type}
                    </span>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                      RUNNING
                    </span>
                  </div>
                  <p className="text-sm font-bold text-white">{c.name}</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-2">{c.stats}</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-white/10 rounded-full h-1.5">
                  <motion.div
                  initial={{
                    width: 0
                  }}
                  animate={{
                    width: `${c.progress}%`
                  }}
                  transition={{
                    duration: 1,
                    ease: 'easeOut',
                    delay: i * 0.1
                  }}
                  className={`h-1.5 rounded-full bg-gradient-to-r ${c.color === 'text-green-400' ? 'from-green-500 to-green-400' : c.color === 'text-purple-400' ? 'from-purple-500 to-purple-400' : 'from-blue-500 to-blue-400'}`} />

                </div>
                <span className={`text-xs font-bold ${c.color}`}>
                  {c.progress}%
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{c.sub}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 rounded-2xl p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
              Newsletter
            </p>
            <p className="text-base font-black text-white">
              The Catapult AI Management Newsletter
            </p>
          </div>
          <MailIcon className="w-5 h-5 text-orange-400 flex-shrink-0" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="text-center">
            <p className="text-lg font-black text-orange-400">12,847</p>
            <p className="text-xs text-slate-500">Subscribers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-green-400">67%</p>
            <p className="text-xs text-slate-500">Open Rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-blue-400">34%</p>
            <p className="text-xs text-slate-500">Click Rate</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-black text-purple-400">Weekly</p>
            <p className="text-xs text-slate-500">Cadence</p>
          </div>
        </div>
        <div className="bg-white/5 rounded-xl p-3 mb-4">
          <p className="text-xs text-slate-500 mb-0.5">Last issue</p>
          <p className="text-sm font-bold text-white">
            'How AI Executives Are Replacing $350K C-Suite Costs'
          </p>
          <p className="text-xs text-orange-400 mt-0.5">
            8,421 opens · 2,847 clicks
          </p>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-3 rounded-xl transition-all text-sm">
          <EditIcon className="w-4 h-4" /> Compose Next Issue
        </button>
      </div>
    </div>);

}
// ─── TAB 5: CALENDAR ─────────────────────────────────────────────────────────
const weekDays = [
{
  day: 'Mon',
  date: 'Dec 16',
  items: [
  {
    label: 'AI CFO case study',
    type: 'linkedin',
    color: 'bg-blue-500/80 text-white'
  },
  {
    label: 'Weekly digest',
    type: 'email',
    color: 'bg-green-500/80 text-white'
  }]

},
{
  day: 'Tue',
  date: 'Dec 17',
  items: [
  {
    label: '60-sec AI briefing',
    type: 'tiktok',
    color: 'bg-teal-500/80 text-white'
  },
  {
    label: 'Behind the scenes',
    type: 'instagram',
    color: 'bg-pink-500/80 text-white'
  }]

},
{
  day: 'Wed',
  date: 'Dec 18',
  items: [
  {
    label: 'EP 047 publish',
    type: 'podcast',
    color: 'bg-orange-500/80 text-white'
  },
  {
    label: 'TechCrunch pitch',
    type: 'pr',
    color: 'bg-purple-500/80 text-white'
  }]

},
{
  day: 'Thu',
  date: 'Dec 19',
  items: [
  {
    label: 'Product update',
    type: 'linkedin',
    color: 'bg-blue-500/80 text-white'
  },
  {
    label: 'Engagement thread',
    type: 'twitter',
    color: 'bg-slate-500/80 text-white'
  }]

},
{
  day: 'Fri',
  date: 'Dec 20',
  items: [
  {
    label: 'EP 047 video',
    type: 'youtube',
    color: 'bg-red-500/80 text-white'
  },
  {
    label: 'Friday wins digest',
    type: 'email',
    color: 'bg-green-500/80 text-white'
  }]

},
{
  day: 'Sat',
  date: 'Dec 21',
  items: [
  {
    label: 'Weekend tip',
    type: 'instagram',
    color: 'bg-pink-500/80 text-white'
  },
  {
    label: 'AI CEO clip',
    type: 'tiktok',
    color: 'bg-teal-500/80 text-white'
  }]

},
{
  day: 'Sun',
  date: 'Dec 22',
  items: [
  {
    label: 'EP 048 research',
    type: 'podcast',
    color: 'bg-orange-500/80 text-white'
  }]

}];

const aiSuggestions = [
{
  text: 'LinkedIn: Share the EP 047 key insight about AI dividends',
  color: 'bg-blue-500/10 border-blue-500/30 text-blue-400'
},
{
  text: 'X/Twitter: Thread on 5 ways AI CFO saves SMBs money',
  color: 'bg-slate-500/10 border-slate-500/30 text-slate-300'
},
{
  text: 'Instagram: Carousel — AI executive team behind the scenes',
  color: 'bg-pink-500/10 border-pink-500/30 text-pink-400'
},
{
  text: 'Email: Case study — Marcus Rivera earns $847/month in AI dividends',
  color: 'bg-green-500/10 border-green-500/30 text-green-400'
}];

function TabCalendar() {
  const [period, setPeriod] = useState<'Today' | 'Week' | 'Month'>('Week');
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm font-black text-white">Content Calendar</p>
        <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
          {(['Today', 'Week', 'Month'] as const).map((p) =>
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${period === p ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

              {p}
            </button>
          )}
        </div>
      </div>

      {/* Week grid */}
      <div className="grid grid-cols-7 gap-2 overflow-x-auto">
        {weekDays.map((d, i) =>
        <motion.div
          key={d.day}
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: i * 0.05
          }}
          className="min-w-[90px]">

            <div className="text-center mb-2">
              <p className="text-xs font-black text-white">{d.day}</p>
              <p className="text-[10px] text-slate-500">{d.date}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700/50 rounded-xl p-2 min-h-[80px] space-y-1.5">
              {d.items.map((item, j) =>
            <div
              key={j}
              className={`${item.color} rounded-lg px-2 py-1 text-[10px] font-bold leading-tight`}>

                  {item.label}
                </div>
            )}
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-black py-2.5 px-5 rounded-xl transition-all text-sm">
          <PlusIcon className="w-4 h-4" /> Schedule New Content
        </button>
        <button className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold py-2.5 px-5 rounded-xl transition-all text-sm">
          <SparklesIcon className="w-4 h-4" /> AI Content Suggestions
        </button>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <SparklesIcon className="w-4 h-4 text-orange-400" />
          <p className="text-sm font-bold text-white">AI Content Suggestions</p>
          <span className="text-xs font-bold text-pink-400 bg-pink-500/15 border border-pink-500/30 px-2 py-0.5 rounded-full">
            Maya (AI CMO)
          </span>
        </div>
        <div className="space-y-2">
          {aiSuggestions.map((s, i) =>
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: -8
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              delay: i * 0.08
            }}
            className={`flex items-center justify-between gap-3 p-3 rounded-xl border ${s.color}`}>

              <p className="text-xs font-semibold leading-snug flex-1">
                {s.text}
              </p>
              <button className="text-xs font-bold px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all flex-shrink-0">
                Add
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}
// ─── Main Screen ──────────────────────────────────────────────────────────────
export function ScreenComms() {
  const [tab, setTab] = useState<CommsTab>('podcast');
  const tabs: {
    id: CommsTab;
    label: string;
    emoji: string;
  }[] = [
  {
    id: 'podcast',
    label: 'Podcast',
    emoji: '🎙'
  },
  {
    id: 'social',
    label: 'Social',
    emoji: '📱'
  },
  {
    id: 'pr',
    label: 'PR',
    emoji: '📰'
  },
  {
    id: 'marketing',
    label: 'Marketing',
    emoji: '📣'
  },
  {
    id: 'calendar',
    label: 'Calendar',
    emoji: '📅'
  }];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-xl font-black text-white">Communications Hub</h2>
          <p className="text-sm text-slate-400">
            AI-powered podcast · social · PR · marketing
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 flex-shrink-0">
          <LiveDot />
          <span className="text-xs font-bold text-green-400">
            AI CMO Active
          </span>
        </div>
      </div>

      {/* Tab nav */}
      <div className="bg-slate-800 rounded-xl p-1 flex gap-1 overflow-x-auto">
        {tabs.map((t) =>
        <button
          key={t.id}
          onClick={() => setTab(t.id)}
          className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === t.id ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}>

            <span>{t.emoji}</span>
            {t.label}
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

          {tab === 'podcast' && <TabPodcast />}
          {tab === 'social' && <TabSocial />}
          {tab === 'pr' && <TabPR />}
          {tab === 'marketing' && <TabMarketing />}
          {tab === 'calendar' && <TabCalendar />}
        </motion.div>
      </AnimatePresence>
    </div>);

}