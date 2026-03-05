import React, { useState, Component } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  VideoIcon,
  ZapIcon,
  PauseIcon,
  CheckCircleIcon,
  XCircleIcon,
  CameraIcon,
  BuildingIcon,
  PackageIcon,
  WrenchIcon,
  TruckIcon,
  TrendingUpIcon,
  ActivityIcon,
  ChevronDownIcon,
  UserIcon,
  BrainIcon,
  TargetIcon,
  AlertCircleIcon,
  EditIcon,
  SaveIcon,
  XIcon,
  MicIcon,
  MessageSquareIcon,
  ShieldIcon,
  SparklesIcon,
} from 'lucide-react';
import { usePersonas, type PersonaProfile } from '../../hooks/usePersonas';
import { buildPersonaPrompt } from '../../lib/personaStore';
import { useAgents } from '../../hooks/useAgents';
import { ROLE_META } from '../../lib/agentApi';
type PersonaTab = 'team' | 'agents' | 'clients';
// ─── Video Ready Badge ─────────────────────────────────────────────────────────
function VideoReadyBadge({ paused = false }: {paused?: boolean;}) {
  if (paused) {
    return (
      <span className="flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-full bg-slate-700 text-slate-400 border border-slate-600">
        <PauseIcon className="w-2.5 h-2.5" />
        PAUSED
      </span>);

  }
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-black px-2 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
      <motion.span
        animate={{
          opacity: [1, 0.2, 1]
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity
        }}
        className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />

      VIDEO READY
    </span>);

}
// ─── SVG Avatars ───────────────────────────────────────────────────────────────
function AvatarAria() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-aria" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#78350f" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-aria)" />
      {/* Shoulders */}
      <path d="M15 120 Q60 100 105 120" fill="#1c1917" />
      {/* Gold collar */}
      <path
        d="M38 104 Q60 96 82 104"
        stroke="#fbbf24"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#b5763a" />
      {/* Hair back (bun base) */}
      <ellipse cx="60" cy="42" rx="29" ry="20" fill="#111" />
      {/* Face */}
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c8834a" />
      {/* Ears */}
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c8834a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c8834a" />
      {/* Inner ear */}
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#b5763a" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#b5763a" />
      {/* Hair bun */}
      <circle cx="60" cy="28" r="12" fill="#111" />
      <ellipse cx="60" cy="38" rx="14" ry="8" fill="#111" />
      {/* Hair wisps */}
      <path
        d="M33 52 Q36 44 42 48"
        stroke="#111"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M87 52 Q84 44 78 48"
        stroke="#111"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Eyebrows - strong, arched */}
      <path
        d="M42 63 Q50 58 57 62"
        stroke="#1a0f00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 62 Q70 58 78 63"
        stroke="#1a0f00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="50" cy="69" rx="6.5" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="6.5" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#2d1a08" />
      <circle cx="71" cy="69" r="4" fill="#2d1a08" />
      <circle cx="52.5" cy="67.5" r="1.2" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.2" fill="white" />
      {/* Eyelashes top */}
      <path
        d="M44 65 Q50 62 56 65"
        stroke="#111"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M64 65 Q70 62 76 65"
        stroke="#111"
        strokeWidth="1.5"
        fill="none" />

      {/* Nose */}
      <path
        d="M57 76 Q60 82 63 76"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <circle cx="56" cy="78" r="1.5" fill="#a06030" opacity="0.5" />
      <circle cx="64" cy="78" r="1.5" fill="#a06030" opacity="0.5" />
      {/* Confident smile */}
      <path
        d="M49 86 Q60 93 71 86"
        stroke="#8B4513"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path d="M49 86 Q60 95 71 86" fill="#c0392b" opacity="0.3" />
      {/* Earrings */}
      <circle cx="33" cy="80" r="2.5" fill="#fbbf24" />
      <circle cx="87" cy="80" r="2.5" fill="#fbbf24" />
    </svg>);

}
function AvatarFelix() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-felix" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-felix)" />
      {/* Shoulders - suit */}
      <path d="M10 120 Q60 98 110 120" fill="#1e293b" />
      {/* Tie */}
      <path d="M57 100 L60 88 L63 100 L60 108 Z" fill="#2563eb" />
      {/* Shirt collar */}
      <path
        d="M48 100 L60 88 L72 100"
        stroke="white"
        strokeWidth="2"
        fill="none" />

      {/* Neck */}
      <rect x="54" y="88" width="12" height="15" rx="4" fill="#e8c9a0" />
      {/* Hair - dark, side-parted */}
      <ellipse cx="60" cy="42" rx="28" ry="19" fill="#1a0f05" />
      {/* Side part detail */}
      <path d="M42 38 Q50 32 60 36 Q70 32 80 38" fill="#1a0f05" />
      <path
        d="M38 48 Q42 36 50 34"
        stroke="#2a1a0a"
        strokeWidth="1.5"
        fill="none" />

      {/* Face */}
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      {/* Ears */}
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <ellipse cx="86" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      {/* Glasses frame */}
      <rect
        x="38"
        y="63"
        width="18"
        height="13"
        rx="4"
        stroke="#334155"
        strokeWidth="2"
        fill="none" />

      <rect
        x="64"
        y="63"
        width="18"
        height="13"
        rx="4"
        stroke="#334155"
        strokeWidth="2"
        fill="none" />

      <line x1="56" y1="69" x2="64" y2="69" stroke="#334155" strokeWidth="2" />
      <line x1="36" y1="66" x2="32" y2="64" stroke="#334155" strokeWidth="2" />
      <line x1="84" y1="66" x2="88" y2="64" stroke="#334155" strokeWidth="2" />
      {/* Eyebrows */}
      <path
        d="M40 62 Q47 59 55 62"
        stroke="#1a0f05"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M65 62 Q72 59 80 62"
        stroke="#1a0f05"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes behind glasses */}
      <ellipse cx="47" cy="69" rx="5" ry="4.5" fill="white" />
      <ellipse cx="73" cy="69" rx="5" ry="4.5" fill="white" />
      <circle cx="47" cy="69" r="3" fill="#1a3a6a" />
      <circle cx="73" cy="69" r="3" fill="#1a3a6a" />
      <circle cx="48" cy="68" r="1" fill="white" />
      <circle cx="74" cy="68" r="1" fill="white" />
      {/* Nose */}
      <path
        d="M58 76 Q60 81 62 76"
        stroke="#c4a070"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Precise, slight smile */}
      <path
        d="M51 86 Q60 90 69 86"
        stroke="#9a7050"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarOrion() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-orion" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#14532d" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-orion)" />
      {/* Shoulders */}
      <path d="M8 120 Q60 96 112 120" fill="#1c1917" />
      {/* Green collar accent */}
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#4ade80"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#7a4a28" />
      {/* Short natural hair - textured */}
      <ellipse cx="60" cy="42" rx="28" ry="18" fill="#111" />
      {/* Hair texture dots */}
      <circle cx="48" cy="38" r="3" fill="#1a1a1a" />
      <circle cx="55" cy="35" r="3.5" fill="#1a1a1a" />
      <circle cx="63" cy="34" r="3.5" fill="#1a1a1a" />
      <circle cx="71" cy="37" r="3" fill="#1a1a1a" />
      <circle cx="52" cy="42" r="2.5" fill="#222" />
      <circle cx="68" cy="41" r="2.5" fill="#222" />
      {/* Face - strong jaw */}
      <path
        d="M33 68 Q33 90 45 100 Q60 106 75 100 Q87 90 87 68 Q87 50 60 48 Q33 50 33 68Z"
        fill="#7a4a28" />

      {/* Ears */}
      <ellipse cx="33" cy="72" rx="5" ry="8" fill="#7a4a28" />
      <ellipse cx="87" cy="72" rx="5" ry="8" fill="#7a4a28" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4.5" fill="#6a3a1a" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4.5" fill="#6a3a1a" />
      {/* Eyebrows - strong, determined */}
      <path
        d="M40 63 Q49 59 57 63"
        stroke="#0a0a0a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 59 80 63"
        stroke="#0a0a0a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes */}
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#1a3a1a" />
      <circle cx="72" cy="70" r="4" fill="#1a3a1a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      {/* Nose - broader */}
      <path
        d="M56 77 Q60 83 64 77"
        stroke="#5a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <circle cx="55" cy="79" r="2" fill="#5a3010" opacity="0.5" />
      <circle cx="65" cy="79" r="2" fill="#5a3010" opacity="0.5" />
      {/* Focused, determined expression */}
      <path
        d="M50 88 Q60 93 70 88"
        stroke="#4a2010"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarMaya() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-maya" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#831843" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-maya)" />
      {/* Shoulders */}
      <path d="M5 120 Q60 98 115 120" fill="#1c1917" />
      {/* Rose accent */}
      <path
        d="M38 104 Q60 96 82 104"
        stroke="#f472b6"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4a070" />
      {/* Wavy auburn hair - left side */}
      <path
        d="M32 52 Q28 40 34 30 Q40 20 55 22 Q70 20 78 28 Q88 38 86 52"
        fill="#7a2a10" />

      {/* Hair top */}
      <ellipse cx="60" cy="38" rx="28" ry="18" fill="#8B3A1A" />
      {/* Wavy strands right */}
      <path
        d="M86 55 Q92 65 88 80 Q86 90 82 98"
        stroke="#7a2a10"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round" />

      {/* Wavy strands left */}
      <path
        d="M34 55 Q28 65 32 80 Q34 90 38 98"
        stroke="#7a2a10"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round" />

      {/* Hair highlights */}
      <path
        d="M50 24 Q55 18 62 22"
        stroke="#c4602a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M65 22 Q72 18 78 26"
        stroke="#c4602a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Face */}
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#e8c090" />
      {/* Ears */}
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#e8c090" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#e8c090" />
      {/* Eyebrows - arched, expressive */}
      <path
        d="M42 63 Q50 58 57 62"
        stroke="#5a2a10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 62 Q70 58 78 63"
        stroke="#5a2a10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes - warm, expressive */}
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#5a2a10" />
      <circle cx="71" cy="69" r="4" fill="#5a2a10" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      {/* Eyelashes */}
      <path
        d="M43 65 Q50 61 57 65"
        stroke="#3a1a05"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M63 65 Q70 61 77 65"
        stroke="#3a1a05"
        strokeWidth="1.5"
        fill="none" />

      {/* Nose */}
      <path
        d="M57 76 Q60 81 63 76"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Warm smile */}
      <path
        d="M48 86 Q60 95 72 86"
        stroke="#8B4513"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Cheek blush */}
      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#f472b6" opacity="0.2" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#f472b6" opacity="0.2" />
      {/* Earrings */}
      <circle cx="34" cy="79" r="3" fill="#f472b6" opacity="0.8" />
      <circle cx="86" cy="79" r="3" fill="#f472b6" opacity="0.8" />
    </svg>);

}
function AvatarTheo() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-theo" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b0764" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-theo)" />
      {/* Shoulders - casual */}
      <path d="M5 120 Q60 100 115 120" fill="#1e1b4b" />
      {/* Purple collar */}
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#a78bfa"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e0c090" />
      {/* Messy dark hair */}
      <ellipse cx="60" cy="40" rx="30" ry="20" fill="#1a1a2a" />
      {/* Messy strands */}
      <path
        d="M38 38 Q34 28 40 22"
        stroke="#1a1a2a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 34 Q48 24 54 20"
        stroke="#1a1a2a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M65 33 Q68 22 74 24"
        stroke="#1a1a2a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M75 38 Q82 30 80 22"
        stroke="#1a1a2a"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M44 42 Q38 36 36 28"
        stroke="#222235"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round" />

      {/* Face */}
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d5a0" />
      {/* Ears */}
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#ddc080" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#ddc080" />
      {/* Stubble */}
      <ellipse cx="60" cy="90" rx="18" ry="8" fill="#c0a070" opacity="0.3" />
      {/* Stubble dots */}
      {[48, 52, 56, 60, 64, 68, 72, 50, 54, 58, 62, 66, 70].map((x, i) =>
      <circle
        key={i}
        cx={x}
        cy={88 + i % 3 * 3}
        r="0.8"
        fill="#8a6040"
        opacity="0.6" />

      )}
      {/* Eyebrows - slightly raised, curious */}
      <path
        d="M40 63 Q49 60 57 63"
        stroke="#1a1a2a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 80 63"
        stroke="#1a1a2a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes - thoughtful */}
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#2a1a5a" />
      <circle cx="72" cy="70" r="4" fill="#2a1a5a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      {/* Nose */}
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Slight thoughtful smile */}
      <path
        d="M51 87 Q60 92 69 87"
        stroke="#9a7050"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarLex() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-lex" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-lex)" />
      {/* Shoulders */}
      <path d="M8 120 Q60 98 112 120" fill="#0f172a" />
      {/* Teal collar */}
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#22d3ee"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c09060" />
      {/* Short hair with silver streaks */}
      <ellipse cx="60" cy="40" rx="27" ry="17" fill="#555" />
      {/* Silver streak highlights */}
      <path
        d="M45 32 Q50 26 56 30"
        stroke="#ccc"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M60 28 Q65 22 70 28"
        stroke="#ccc"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M72 33 Q78 28 80 36"
        stroke="#aaa"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Hair sides */}
      <path
        d="M33 52 Q32 44 36 38"
        stroke="#555"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M87 52 Q88 44 84 38"
        stroke="#555"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      {/* Face */}
      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#c4956a" />
      {/* Ears */}
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#c4956a" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#c4956a" />
      <ellipse cx="34" cy="72" rx="2.5" ry="4" fill="#b4855a" />
      <ellipse cx="86" cy="72" rx="2.5" ry="4" fill="#b4855a" />
      {/* Eyebrows - precise, composed */}
      <path
        d="M41 63 Q49 60 57 63"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 79 63"
        stroke="#333"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes - serious, composed */}
      <ellipse cx="49" cy="70" rx="7" ry="5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5" fill="white" />
      <circle cx="50" cy="70" r="3.8" fill="#1a4a5a" />
      <circle cx="72" cy="70" r="3.8" fill="#1a4a5a" />
      <circle cx="51.5" cy="68.5" r="1.2" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.2" fill="white" />
      {/* Nose */}
      <path
        d="M57 77 Q60 82 63 77"
        stroke="#a07050"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Composed, neutral expression */}
      <path
        d="M52 87 Q60 90 68 87"
        stroke="#7a5030"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarHana() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-hana" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-hana)" />
      {/* Shoulders */}
      <path d="M5 120 Q60 99 115 120" fill="#1c1917" />
      {/* Rose accent */}
      <path
        d="M38 104 Q60 96 82 104"
        stroke="#fb7185"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      {/* Long dark hair with highlights - left flow */}
      <path
        d="M32 50 Q26 65 28 85 Q30 100 35 110"
        stroke="#1a0f05"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round" />

      {/* Hair top */}
      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#1a0f05" />
      {/* Long dark hair - right flow */}
      <path
        d="M88 50 Q94 65 92 85 Q90 100 85 110"
        stroke="#1a0f05"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round" />

      {/* Highlight strands */}
      <path
        d="M36 52 Q32 68 34 88"
        stroke="#5a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M84 52 Q88 68 86 88"
        stroke="#5a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 28 Q54 20 60 24"
        stroke="#5a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Face */}
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#d4956a" />
      {/* Ears */}
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#d4956a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#d4956a" />
      {/* Eyebrows - soft, empathetic */}
      <path
        d="M42 63 Q50 60 57 63"
        stroke="#3a1a05"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 60 78 63"
        stroke="#3a1a05"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes - warm, empathetic */}
      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#3a1a10" />
      <circle cx="71" cy="69" r="4" fill="#3a1a10" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      {/* Eyelashes */}
      <path
        d="M43 65 Q50 61 57 65"
        stroke="#1a0a00"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M63 65 Q70 61 77 65"
        stroke="#1a0a00"
        strokeWidth="1.5"
        fill="none" />

      {/* Nose */}
      <path
        d="M57 76 Q60 81 63 76"
        stroke="#b07050"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Warm, gentle smile */}
      <path
        d="M49 86 Q60 94 71 86"
        stroke="#8B4513"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Cheek blush */}
      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#fb7185" opacity="0.2" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#fb7185" opacity="0.2" />
      {/* Earrings - small */}
      <circle cx="33" cy="79" r="2" fill="#fb7185" opacity="0.9" />
      <circle cx="87" cy="79" r="2" fill="#fb7185" opacity="0.9" />
    </svg>);

}
function AvatarSage() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-sage" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-sage)" />
      {/* Shoulders - sharp suit */}
      <path d="M8 120 Q60 97 112 120" fill="#1c1917" />
      {/* Orange collar */}
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#fb923c"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round" />

      {/* Neck */}
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c4845a" />
      {/* Neat medium-brown hair */}
      <ellipse cx="60" cy="41" rx="28" ry="18" fill="#3a2a1a" />
      {/* Hair detail - neat, styled */}
      <path d="M38 44 Q42 34 50 32 Q60 28 70 32 Q78 34 82 44" fill="#3a2a1a" />
      {/* Face */}
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      {/* Ears */}
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#b47448" />
      {/* Eyebrows - confident, sharp */}
      <path
        d="M40 63 Q49 59 57 63"
        stroke="#1a0f05"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 59 80 63"
        stroke="#1a0f05"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Eyes - sharp, charismatic */}
      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="72" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      {/* Nose */}
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Confident charismatic smile */}
      <path
        d="M47 86 Q60 96 73 86"
        stroke="#7a3a10"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Smile lines */}
      <path
        d="M47 86 Q44 82 46 78"
        stroke="#b07040"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.5" />

      <path
        d="M73 86 Q76 82 74 78"
        stroke="#b07040"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.5" />

    </svg>);

}
// ─── Client Persona Avatars ────────────────────────────────────────────────────
function AvatarMarcus() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-marcus" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-marcus)" />
      {/* Navy work shirt body */}
      <path d="M5 120 Q60 96 115 120" fill="#1e3a5f" />
      {/* Work shirt collar — V-neck open collar */}
      <path
        d="M48 100 L54 90 L60 96 L66 90 L72 100"
        fill="#1e3a5f"
        stroke="#2a4a6f"
        strokeWidth="1" />

      {/* Collar edge highlight */}
      <path
        d="M48 100 L54 90"
        stroke="#2d5a8f"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M72 100 L66 90"
        stroke="#2d5a8f"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Shirt button placket */}
      <line
        x1="60"
        y1="96"
        x2="60"
        y2="120"
        stroke="#2a4a6f"
        strokeWidth="1"
        opacity="0.6" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#8B6040" />
      {/* Short graying hair */}
      <ellipse cx="60" cy="41" rx="27" ry="17" fill="#555" />
      <path d="M38 44 Q42 34 52 32 Q60 28 68 32 Q78 34 82 44" fill="#555" />
      {/* Gray temples */}
      <ellipse cx="36" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="84" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#8B6040" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#8B6040" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#8B6040" />
      {/* Weathering lines */}
      <path
        d="M42 66 Q44 64 46 66"
        stroke="#7a5030"
        strokeWidth="1"
        fill="none"
        opacity="0.5" />

      <path
        d="M74 66 Q76 64 78 66"
        stroke="#7a5030"
        strokeWidth="1"
        fill="none"
        opacity="0.5" />

      {/* Forehead line */}
      <path
        d="M44 58 Q52 56 58 58"
        stroke="#7a5030"
        strokeWidth="0.8"
        fill="none"
        opacity="0.35" />

      <path
        d="M62 58 Q68 56 76 58"
        stroke="#7a5030"
        strokeWidth="0.8"
        fill="none"
        opacity="0.35" />

      <path
        d="M40 63 Q49 60 57 63"
        stroke="#2a1a0a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 80 63"
        stroke="#2a1a0a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#3a2a1a" />
      <circle cx="72" cy="70" r="4" fill="#3a2a1a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#7a5030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 87 Q60 92 70 87"
        stroke="#5a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarDonna() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-donna" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#431407" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-donna)" />
      {/* Olive work polo shirt body */}
      <path d="M5 120 Q60 97 115 120" fill="#2d4a1e" />
      {/* Polo collar — button placket */}
      <path
        d="M50 102 L55 92 L60 98 L65 92 L70 102"
        fill="#2d4a1e"
        stroke="#3a5a28"
        strokeWidth="1" />

      <path
        d="M50 102 L55 92"
        stroke="#4a6a35"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M70 102 L65 92"
        stroke="#4a6a35"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Polo button placket */}
      <line
        x1="60"
        y1="98"
        x2="60"
        y2="120"
        stroke="#3a5a28"
        strokeWidth="1.5"
        opacity="0.7" />

      <circle cx="60" cy="102" r="1.2" fill="#4a6a35" />
      <circle cx="60" cy="108" r="1.2" fill="#4a6a35" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e0b080" />
      {/* Practical shorter hair — bob style, pulled back */}
      {/* Hair base - shorter, chin-length */}
      <ellipse cx="60" cy="42" rx="28" ry="17" fill="#8a6a30" />
      {/* Short bob sides — ends at jaw, not shoulders */}
      <path
        d="M33 52 Q30 62 32 72 Q34 80 38 84"
        stroke="#8a6a30"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M87 52 Q90 62 88 72 Q86 80 82 84"
        stroke="#8a6a30"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round" />

      {/* Hair top */}
      <path d="M36 46 Q40 34 50 30 Q60 26 70 30 Q80 34 84 46" fill="#8a6a30" />
      {/* Slight highlights */}
      <path
        d="M50 28 Q56 22 62 26"
        stroke="#a88040"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Face */}
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d0a0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d0a0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d0a0" />
      <path
        d="M42 63 Q50 59 57 63"
        stroke="#5a3a10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 59 78 63"
        stroke="#5a3a10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#2a4a2a" />
      <circle cx="71" cy="69" r="4" fill="#2a4a2a" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path
        d="M57 76 Q60 81 63 76"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M49 86 Q60 93 71 86"
        stroke="#8B5030"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#fb923c" opacity="0.15" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#fb923c" opacity="0.15" />
    </svg>);

}
function AvatarRay() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-ray" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-ray)" />
      {/* Dark grey work shirt body */}
      <path d="M8 120 Q60 96 112 120" fill="#374151" />
      {/* Hi-vis yellow stripe on shoulder — safety vest hint */}
      <path
        d="M8 120 Q30 110 50 107"
        stroke="#fbbf24"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.85" />

      <path
        d="M70 107 Q90 110 112 120"
        stroke="#fbbf24"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.85" />

      {/* Work shirt collar */}
      <path
        d="M50 102 L55 92 L60 97 L65 92 L70 102"
        fill="#374151"
        stroke="#4b5563"
        strokeWidth="1" />

      <path
        d="M50 102 L55 92"
        stroke="#6b7280"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M70 102 L65 92"
        stroke="#6b7280"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c09060" />
      {/* Buzz cut */}
      <ellipse cx="60" cy="40" rx="27" ry="15" fill="#3a2a1a" />
      {/* Beard/stubble */}
      <ellipse cx="60" cy="90" rx="22" ry="10" fill="#3a2a1a" opacity="0.4" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c09060" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c09060" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c09060" />
      {/* Beard detail */}
      {[44, 48, 52, 56, 60, 64, 68, 72, 76, 46, 50, 54, 58, 62, 66, 70, 74].map(
        (x, i) =>
        <circle
          key={i}
          cx={x}
          cy={88 + i % 4 * 2.5}
          r="0.9"
          fill="#2a1a0a"
          opacity="0.5" />


      )}
      <path
        d="M40 63 Q49 60 57 63"
        stroke="#1a0f05"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 80 63"
        stroke="#1a0f05"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#1a3a5a" />
      <circle cx="72" cy="70" r="4" fill="#1a3a5a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#a07040"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 87 Q60 92 70 87"
        stroke="#5a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarClaire() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-claire" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-claire)" />
      {/* Navy suit jacket body */}
      <path d="M5 120 Q60 97 115 120" fill="#0f172a" />
      {/* Suit jacket lapels — left lapel */}
      <path d="M5 120 Q20 108 35 100 L48 102 L54 90 L60 96" fill="#1e293b" />
      {/* Right lapel */}
      <path d="M115 120 Q100 108 85 100 L72 102 L66 90 L60 96" fill="#1e293b" />
      {/* Lapel notch lines */}
      <path d="M35 100 L42 95" stroke="#334155" strokeWidth="1" fill="none" />
      <path d="M85 100 L78 95" stroke="#334155" strokeWidth="1" fill="none" />
      {/* White blouse collar at neck */}
      <path
        d="M52 94 Q60 88 68 94"
        stroke="#f1f5f9"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M54 97 Q60 92 66 97"
        stroke="#f1f5f9"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c5a0" />
      {/* Elegant updo */}
      <ellipse cx="60" cy="38" rx="27" ry="16" fill="#5a3a1a" />
      <circle cx="60" cy="26" r="9" fill="#5a3a1a" />
      <ellipse cx="60" cy="34" rx="12" ry="7" fill="#5a3a1a" />
      {/* Elegant wisps */}
      <path
        d="M35 50 Q32 42 36 36"
        stroke="#5a3a1a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M85 50 Q88 42 84 36"
        stroke="#5a3a1a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path
        d="M42 63 Q50 59 57 63"
        stroke="#3a2010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 59 78 63"
        stroke="#3a2010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#1a3a2a" />
      <circle cx="71" cy="69" r="4" fill="#1a3a2a" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path
        d="M43 65 Q50 61 57 65"
        stroke="#2a1a05"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M63 65 Q70 61 77 65"
        stroke="#2a1a05"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M57 76 Q60 81 63 76"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M49 86 Q60 93 71 86"
        stroke="#7a5030"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Pearl earrings */}
      <circle cx="34" cy="79" r="3" fill="white" opacity="0.9" />
      <circle cx="86" cy="79" r="3" fill="white" opacity="0.9" />
    </svg>);

}
function AvatarTony() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-tony" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#451a03" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-tony)" />
      {/* Dark olive work shirt body */}
      <path d="M8 120 Q60 96 112 120" fill="#3d3a1a" />
      {/* Hi-vis orange safety stripe — construction */}
      <path
        d="M8 120 Q28 112 48 108"
        stroke="#f97316"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9" />

      <path
        d="M72 108 Q92 112 112 120"
        stroke="#f97316"
        strokeWidth="4.5"
        fill="none"
        strokeLinecap="round"
        opacity="0.9" />

      {/* Work shirt collar — open V */}
      <path
        d="M49 102 L54 91 L60 97 L66 91 L71 102"
        fill="#3d3a1a"
        stroke="#5a5620"
        strokeWidth="1" />

      <path
        d="M49 102 L54 91"
        stroke="#6a6228"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M71 102 L66 91"
        stroke="#6a6228"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#b07840" />
      {/* Dark wavy hair */}
      <ellipse cx="60" cy="41" rx="28" ry="18" fill="#1a0f05" />
      <path
        d="M36 46 Q38 34 46 30 Q54 26 60 28 Q68 26 76 30 Q84 34 84 46"
        fill="#1a0f05" />

      {/* Mustache */}
      <path
        d="M50 84 Q55 82 60 84 Q65 82 70 84"
        stroke="#1a0f05"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="28" ry="32" fill="#b07840" />
      <ellipse cx="32" cy="72" rx="5" ry="8" fill="#b07840" />
      <ellipse cx="88" cy="72" rx="5" ry="8" fill="#b07840" />
      <path
        d="M40 63 Q49 59 57 63"
        stroke="#0a0500"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 59 80 63"
        stroke="#0a0500"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="72" cy="70" r="4" fill="#2a1a0a" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#8a5020"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 90 Q60 95 70 90"
        stroke="#5a2a10"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarPriya() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-priya" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4c0519" stopOpacity="0.9" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-priya)" />
      {/* White coat body */}
      <path d="M5 120 Q60 97 115 120" fill="#f8fafc" />
      {/* White coat lapels */}
      <path d="M5 120 Q18 110 32 102 L46 104 L53 92 L60 97" fill="#e2e8f0" />
      <path d="M115 120 Q102 110 88 102 L74 104 L67 92 L60 97" fill="#e2e8f0" />
      {/* Coat lapel edge lines */}
      <path d="M32 102 L40 97" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
      <path d="M88 102 L80 97" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
      {/* White coat collar */}
      <path
        d="M50 100 L55 91 L60 96 L65 91 L70 100"
        fill="#f8fafc"
        stroke="#e2e8f0"
        strokeWidth="1" />

      {/* Coat button */}
      <circle cx="60" cy="108" r="2" fill="#cbd5e1" />
      <circle cx="60" cy="115" r="2" fill="#cbd5e1" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c08060" />
      {/* Long black hair */}
      <path
        d="M31 50 Q25 68 28 90 Q32 108 38 116"
        stroke="#0a0500"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#0a0500" />
      <path
        d="M89 50 Q95 68 92 90 Q88 108 82 116"
        stroke="#0a0500"
        strokeWidth="13"
        fill="none"
        strokeLinecap="round" />

      {/* Center part */}
      <path d="M60 24 L60 44" stroke="#1a0f05" strokeWidth="2" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c08060" />
      <ellipse cx="32" cy="72" rx="5" ry="7" fill="#c08060" />
      <ellipse cx="88" cy="72" rx="5" ry="7" fill="#c08060" />
      <path
        d="M42 63 Q50 59 57 63"
        stroke="#1a0500"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 59 78 63"
        stroke="#1a0500"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#1a0a00" />
      <circle cx="71" cy="69" r="4" fill="#1a0a00" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path
        d="M43 65 Q50 61 57 65"
        stroke="#0a0500"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M63 65 Q70 61 77 65"
        stroke="#0a0500"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M57 76 Q60 81 63 76"
        stroke="#a06040"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M49 86 Q60 93 71 86"
        stroke="#7a4020"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Bindi */}
      <circle cx="60" cy="56" r="2" fill="#fb7185" opacity="0.9" />
      {/* Gold earrings */}
      <circle cx="32" cy="78" r="3" fill="#fbbf24" opacity="0.9" />
      <circle cx="88" cy="78" r="3" fill="#fbbf24" opacity="0.9" />
    </svg>);

}
// ─── Agent Avatars (Sales, Marketing, Support, PR) ────────────────────────────
function AvatarRex() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-rex" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f87171" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-rex)" />
      {/* Sharp suit */}
      <path d="M5 120 Q60 96 115 120" fill="#1c0a0a" />
      <path d="M5 120 Q22 108 38 100 L50 103 L56 90 L60 96" fill="#2d1010" />
      <path d="M115 120 Q98 108 82 100 L70 103 L64 90 L60 96" fill="#2d1010" />
      <path
        d="M54 94 Q60 88 66 94"
        stroke="#ef4444"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      {/* Short slicked-back hair */}
      <ellipse cx="60" cy="40" rx="27" ry="16" fill="#1a0a0a" />
      <path d="M36 44 Q40 32 52 30 Q60 26 68 30 Q80 32 84 44" fill="#1a0a0a" />
      {/* Slick highlight */}
      <path
        d="M44 32 Q52 26 60 28"
        stroke="#3a1a1a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      {/* Intense eyebrows */}
      <path
        d="M40 62 Q49 57 57 62"
        stroke="#1a0a0a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 62 Q71 57 80 62"
        stroke="#1a0a0a"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#7f1d1d" />
      <circle cx="72" cy="70" r="4" fill="#7f1d1d" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 82 63 77"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Determined smirk */}
      <path
        d="M52 87 Q62 93 70 87"
        stroke="#7a3010"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarViper() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-viper" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb7185" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#881337" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-viper)" />
      <path d="M5 120 Q60 96 115 120" fill="#1a0a10" />
      <path d="M5 120 Q20 108 36 100 L50 103 L55 90 L60 96" fill="#2a1020" />
      <path d="M115 120 Q100 108 84 100 L70 103 L65 90 L60 96" fill="#2a1020" />
      <path
        d="M54 94 Q60 88 66 94"
        stroke="#fb7185"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c5a0" />
      {/* Swept-back dark hair */}
      <ellipse cx="60" cy="40" rx="28" ry="17" fill="#0a0505" />
      <path d="M36 46 Q38 32 50 28 Q60 24 72 28 Q82 32 84 46" fill="#0a0505" />
      <path
        d="M82 44 Q88 36 84 28"
        stroke="#0a0505"
        strokeWidth="5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path
        d="M41 62 Q50 58 57 62"
        stroke="#0a0505"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 62 Q70 58 79 62"
        stroke="#0a0505"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="69" r="4" fill="#881337" />
      <circle cx="72" cy="69" r="4" fill="#881337" />
      <circle cx="51.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="67.5" r="1.3" fill="white" />
      <path
        d="M57 76 Q60 81 63 76"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M48 87 Q60 96 72 87"
        stroke="#8B4513"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarChase() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-chase" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fb923c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-chase)" />
      <path d="M8 120 Q60 97 112 120" fill="#1c1008" />
      <path
        d="M50 102 L55 91 L60 97 L65 91 L70 102"
        fill="#2a1808"
        stroke="#3a2010"
        strokeWidth="1" />

      <path
        d="M50 102 L55 91"
        stroke="#f97316"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M70 102 L65 91"
        stroke="#f97316"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      {/* Curly medium hair */}
      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#3a1a05" />
      <circle cx="44" cy="36" r="5" fill="#3a1a05" />
      <circle cx="52" cy="30" r="5.5" fill="#3a1a05" />
      <circle cx="62" cy="28" r="5.5" fill="#3a1a05" />
      <circle cx="72" cy="31" r="5" fill="#3a1a05" />
      <circle cx="78" cy="38" r="4.5" fill="#3a1a05" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <path
        d="M40 63 Q49 59 57 63"
        stroke="#1a0a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 59 80 63"
        stroke="#1a0a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#7c2d12" />
      <circle cx="72" cy="70" r="4" fill="#7c2d12" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M49 87 Q60 94 71 87"
        stroke="#7a3a10"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarNova() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-nova" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-nova)" />
      <path d="M5 120 Q60 98 115 120" fill="#1a1030" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#a78bfa"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c5a0" />
      {/* Asymmetric creative cut */}
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#2a1a4a" />
      <path
        d="M34 50 Q30 38 36 28 Q44 18 60 20 Q76 18 84 28 Q90 38 86 50"
        fill="#2a1a4a" />

      {/* Side shave hint */}
      <path
        d="M34 50 Q32 60 34 70"
        stroke="#1a0a3a"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path
        d="M41 63 Q50 59 57 63"
        stroke="#2a1a4a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 59 79 63"
        stroke="#2a1a4a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#4c1d95" />
      <circle cx="72" cy="70" r="4" fill="#4c1d95" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 82 63 77"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M49 87 Q60 93 71 87"
        stroke="#8B5030"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Small ear stud */}
      <circle cx="34" cy="78" r="2" fill="#a78bfa" opacity="0.9" />
    </svg>);

}
function AvatarPixel() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-pixel" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#581c87" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-pixel)" />
      <path d="M5 120 Q60 98 115 120" fill="#1a0a2a" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#c084fc"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      {/* Long straight hair with bangs */}
      <path
        d="M31 50 Q26 68 28 90 Q32 108 38 116"
        stroke="#1a0a2a"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="40" rx="29" ry="19" fill="#1a0a2a" />
      <path
        d="M89 50 Q94 68 92 90 Q88 108 82 116"
        stroke="#1a0a2a"
        strokeWidth="12"
        fill="none"
        strokeLinecap="round" />

      {/* Bangs */}
      <path d="M36 46 Q48 36 60 38 Q72 36 84 46" fill="#1a0a2a" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="32" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="88" cy="72" rx="5" ry="7" fill="#c4845a" />
      {/* Round glasses */}
      <circle
        cx="49"
        cy="69"
        r="9"
        stroke="#581c87"
        strokeWidth="2"
        fill="none" />

      <circle
        cx="71"
        cy="69"
        r="9"
        stroke="#581c87"
        strokeWidth="2"
        fill="none" />

      <line x1="58" y1="69" x2="62" y2="69" stroke="#581c87" strokeWidth="2" />
      <path
        d="M41 63 Q49 60 57 63"
        stroke="#1a0a2a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 79 63"
        stroke="#1a0a2a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="69" rx="5" ry="4.5" fill="white" />
      <ellipse cx="71" cy="69" rx="5" ry="4.5" fill="white" />
      <circle cx="50" cy="69" r="3" fill="#581c87" />
      <circle cx="72" cy="69" r="3" fill="#581c87" />
      <circle cx="51" cy="68" r="1" fill="white" />
      <circle cx="73" cy="68" r="1" fill="white" />
      <path
        d="M57 77 Q60 82 63 77"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 87 Q60 92 70 87"
        stroke="#7a4020"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarBlaze() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-blaze" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#e879f9" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#701a75" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-blaze)" />
      <path d="M5 120 Q60 98 115 120" fill="#1a0a20" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#e879f9"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e0c090" />
      {/* Wild spiky hair */}
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#2a0a3a" />
      <path
        d="M38 38 Q34 22 42 16"
        stroke="#2a0a3a"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 32 Q48 16 56 12"
        stroke="#2a0a3a"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M62 30 Q64 14 70 12"
        stroke="#2a0a3a"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M74 34 Q80 20 82 16"
        stroke="#2a0a3a"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      {/* Fuchsia tips */}
      <circle cx="42" cy="16" r="3" fill="#e879f9" opacity="0.8" />
      <circle cx="56" cy="12" r="3" fill="#e879f9" opacity="0.8" />
      <circle cx="70" cy="12" r="3" fill="#e879f9" opacity="0.8" />
      <circle cx="82" cy="16" r="3" fill="#e879f9" opacity="0.8" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d5a0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d5a0" />
      <path
        d="M40 62 Q49 58 57 62"
        stroke="#2a0a3a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 62 Q71 58 80 62"
        stroke="#2a0a3a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#701a75" />
      <circle cx="72" cy="70" r="4" fill="#701a75" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M47 86 Q60 96 73 86"
        stroke="#9a5030"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Nose ring */}
      <path
        d="M58 80 Q60 82 62 80"
        stroke="#e879f9"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarCleo() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-cleo" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#134e4a" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-cleo)" />
      <path d="M5 120 Q60 98 115 120" fill="#0a1a18" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#2dd4bf"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      {/* Neat shoulder-length hair */}
      <path
        d="M33 52 Q28 66 30 82 Q32 94 36 102"
        stroke="#3a1a05"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#3a1a05" />
      <path
        d="M87 52 Q92 66 90 82 Q88 94 84 102"
        stroke="#3a1a05"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round" />

      <path d="M36 46 Q40 32 52 28 Q60 24 68 28 Q80 32 84 46" fill="#3a1a05" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c8834a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c8834a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c8834a" />
      <path
        d="M42 63 Q50 60 57 63"
        stroke="#1a0a00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 60 78 63"
        stroke="#1a0a00"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#134e4a" />
      <circle cx="71" cy="69" r="4" fill="#134e4a" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path
        d="M43 65 Q50 61 57 65"
        stroke="#1a0a00"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M63 65 Q70 61 77 65"
        stroke="#1a0a00"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M57 76 Q60 81 63 76"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      {/* Warm big smile */}
      <path
        d="M47 86 Q60 97 73 86"
        stroke="#8B4513"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="42" cy="80" rx="7" ry="4" fill="#2dd4bf" opacity="0.15" />
      <ellipse cx="78" cy="80" rx="7" ry="4" fill="#2dd4bf" opacity="0.15" />
      <circle cx="33" cy="79" r="2.5" fill="#2dd4bf" opacity="0.8" />
      <circle cx="87" cy="79" r="2.5" fill="#2dd4bf" opacity="0.8" />
    </svg>);

}
function AvatarPatch() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-patch" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-patch)" />
      <path d="M8 120 Q60 97 112 120" fill="#0a1a14" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#34d399"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#f0d5b0" />
      {/* Friendly medium hair */}
      <ellipse cx="60" cy="41" rx="28" ry="18" fill="#4a3010" />
      <path d="M36 46 Q40 32 52 28 Q60 24 68 28 Q80 32 84 46" fill="#4a3010" />
      <path
        d="M36 46 Q34 56 34 64"
        stroke="#4a3010"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M84 46 Q86 56 86 64"
        stroke="#4a3010"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#f0d5b0" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#ddc090" />
      <path
        d="M41 63 Q49 60 57 63"
        stroke="#2a1a0a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 79 63"
        stroke="#2a1a0a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#064e3b" />
      <circle cx="72" cy="70" r="4" fill="#064e3b" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 82 63 77"
        stroke="#c4a070"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 87 Q60 92 70 87"
        stroke="#9a7050"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarEmber() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-ember" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#14532d" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-ember)" />
      <path d="M5 120 Q60 97 115 120" fill="#0a1810" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#4ade80"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#c08060" />
      {/* Natural locs/twists */}
      <ellipse cx="60" cy="40" rx="28" ry="18" fill="#1a0a05" />
      <path
        d="M36 46 Q32 58 34 72 Q36 84 38 94"
        stroke="#1a0a05"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M84 46 Q88 58 86 72 Q84 84 82 94"
        stroke="#1a0a05"
        strokeWidth="7"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M38 44 Q34 32 40 22 Q48 14 60 16 Q72 14 80 22 Q86 32 82 44"
        fill="#1a0a05" />

      {/* Loc texture */}
      <path
        d="M36 52 Q34 60 36 68"
        stroke="#2a1a0a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M84 52 Q86 60 84 68"
        stroke="#2a1a0a"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#8a5030" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#8a5030" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#8a5030" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#7a4020" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#7a4020" />
      <path
        d="M40 63 Q49 59 57 63"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 59 80 63"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#14532d" />
      <circle cx="72" cy="70" r="4" fill="#14532d" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M56 77 Q60 83 64 77"
        stroke="#6a3010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M49 87 Q60 94 71 87"
        stroke="#4a2010"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarIris() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-iris" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-iris)" />
      {/* Polished suit */}
      <path d="M5 120 Q60 97 115 120" fill="#0a1020" />
      <path d="M5 120 Q20 108 36 100 L50 103 L55 90 L60 96" fill="#1a2030" />
      <path d="M115 120 Q100 108 84 100 L70 103 L65 90 L60 96" fill="#1a2030" />
      <path d="M36 100 L44 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path d="M84 100 L76 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path
        d="M52 94 Q60 88 68 94"
        stroke="#f1f5f9"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#f0d5b0" />
      {/* Polished blonde updo */}
      <ellipse cx="60" cy="38" rx="27" ry="16" fill="#c8a040" />
      <circle cx="60" cy="26" r="9" fill="#c8a040" />
      <ellipse cx="60" cy="34" rx="12" ry="7" fill="#c8a040" />
      <path
        d="M35 50 Q32 42 36 36"
        stroke="#c8a040"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M85 50 Q88 42 84 36"
        stroke="#c8a040"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="26" ry="30" fill="#f0d5b0" />
      <ellipse cx="34" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <ellipse cx="86" cy="72" rx="5" ry="7" fill="#f0d5b0" />
      <path
        d="M42 63 Q50 59 57 63"
        stroke="#3a2010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q70 59 78 63"
        stroke="#3a2010"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="50" cy="69" rx="7" ry="5.5" fill="white" />
      <ellipse cx="70" cy="69" rx="7" ry="5.5" fill="white" />
      <circle cx="51" cy="69" r="4" fill="#0c4a6e" />
      <circle cx="71" cy="69" r="4" fill="#0c4a6e" />
      <circle cx="52.5" cy="67.5" r="1.3" fill="white" />
      <circle cx="72.5" cy="67.5" r="1.3" fill="white" />
      <path
        d="M43 65 Q50 61 57 65"
        stroke="#2a1a05"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M63 65 Q70 61 77 65"
        stroke="#2a1a05"
        strokeWidth="1.5"
        fill="none" />

      <path
        d="M57 76 Q60 81 63 76"
        stroke="#c09060"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M50 87 Q60 92 70 87"
        stroke="#7a5030"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <circle cx="34" cy="79" r="2.5" fill="#38bdf8" opacity="0.9" />
      <circle cx="86" cy="79" r="2.5" fill="#38bdf8" opacity="0.9" />
    </svg>);

}
function AvatarShield() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-shield" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1e3a5f" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-shield)" />
      <path d="M8 120 Q60 97 112 120" fill="#0a1020" />
      <path d="M8 120 Q22 108 38 100 L50 103 L56 90 L60 96" fill="#1a2030" />
      <path d="M112 120 Q98 108 82 100 L70 103 L64 90 L60 96" fill="#1a2030" />
      <path d="M38 100 L46 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path d="M82 100 L74 95" stroke="#2a3040" strokeWidth="1" fill="none" />
      <path
        d="M54 94 Q60 88 66 94"
        stroke="#bfdbfe"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

      {/* Blue tie */}
      <path d="M57 100 L60 88 L63 100 L60 108 Z" fill="#1d4ed8" />
      <rect x="53" y="88" width="14" height="18" rx="5" fill="#e8c9a0" />
      {/* Salt & pepper short hair */}
      <ellipse cx="60" cy="41" rx="27" ry="17" fill="#555" />
      <path d="M38 44 Q42 32 52 30 Q60 26 68 30 Q78 32 82 44" fill="#555" />
      <ellipse cx="36" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="84" cy="46" rx="6" ry="8" fill="#888" />
      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#d4a870" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#d4a870" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#d4a870" />
      <path
        d="M40 63 Q49 60 57 63"
        stroke="#1a0a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 60 80 63"
        stroke="#1a0a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#1e3a5f" />
      <circle cx="72" cy="70" r="4" fill="#1e3a5f" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 82 63 77"
        stroke="#a07040"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M51 87 Q60 91 69 87"
        stroke="#7a5030"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round" />

    </svg>);

}
function AvatarBuzz() {
  return (
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full">

      <defs>
        <radialGradient id="bg-buzz" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#312e81" stopOpacity="0.95" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill="url(#bg-buzz)" />
      <path d="M5 120 Q60 98 115 120" fill="#0a0a20" />
      <path
        d="M40 104 Q60 97 80 104"
        stroke="#818cf8"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round" />

      <rect x="53" y="88" width="14" height="18" rx="5" fill="#d4956a" />
      {/* Trendy fade + top */}
      <ellipse cx="60" cy="40" rx="27" ry="16" fill="#2a1a05" />
      <path d="M38 44 Q40 30 52 26 Q60 22 68 26 Q80 30 82 44" fill="#2a1a05" />
      {/* Fade sides */}
      <path
        d="M34 52 Q32 60 34 68"
        stroke="#1a0a00"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M86 52 Q88 60 86 68"
        stroke="#1a0a00"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="60" cy="72" rx="27" ry="31" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="87" cy="72" rx="5" ry="7" fill="#c4845a" />
      <ellipse cx="33" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <ellipse cx="87" cy="72" rx="2.5" ry="4" fill="#b47448" />
      <path
        d="M40 63 Q49 59 57 63"
        stroke="#1a0a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M63 63 Q71 59 80 63"
        stroke="#1a0a00"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      <ellipse cx="49" cy="70" rx="7" ry="5.5" fill="white" />
      <ellipse cx="71" cy="70" rx="7" ry="5.5" fill="white" />
      <circle cx="50" cy="70" r="4" fill="#312e81" />
      <circle cx="72" cy="70" r="4" fill="#312e81" />
      <circle cx="51.5" cy="68.5" r="1.3" fill="white" />
      <circle cx="73.5" cy="68.5" r="1.3" fill="white" />
      <path
        d="M57 77 Q60 83 63 77"
        stroke="#a06030"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round" />

      <path
        d="M47 86 Q60 96 73 86"
        stroke="#7a3a10"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round" />

      {/* Smile lines — charismatic */}
      <path
        d="M47 86 Q44 82 46 78"
        stroke="#b07040"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.5" />

      <path
        d="M73 86 Q76 82 74 78"
        stroke="#b07040"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        opacity="0.5" />

    </svg>);

}
// ─── Agent Personas Data ───────────────────────────────────────────────────────
const agentPersonas = [
// ── SALES ──
{
  id: 'rex',
  role: 'SDR',
  name: 'Rex',
  fullName: 'Outbound Sales AI',
  color: 'from-red-400 to-red-600',
  bg: 'bg-red-500/20',
  border: 'border-red-500/30',
  text: 'text-red-400',
  glow: 'shadow-red-500/20',
  status: 'active' as const,
  personality: ['Relentless', 'Hunter', 'Fearless'],
  voiceStyle: 'High-energy & direct',
  communication: 'Cold outreach, objection-crushing, appointment-setting',
  traits: ['Cold Call Specialist', 'Objection Handler', 'Pipeline Filler'],
  videoStyle: 'High-pressure sales pitch',
  Avatar: AvatarRex,
  category: 'sales'
},
{
  id: 'viper',
  role: 'AE',
  name: 'Viper',
  fullName: 'Deal Closer AI',
  color: 'from-rose-400 to-rose-600',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/30',
  text: 'text-rose-400',
  glow: 'shadow-rose-500/20',
  status: 'active' as const,
  personality: ['Closer', 'Aggressive', 'Relentless'],
  voiceStyle: 'Confident & commanding',
  communication: 'Negotiation-focused, urgency-driven, deal-closing',
  traits: ['Contract Negotiator', 'Urgency Creator', 'Revenue Closer'],
  videoStyle: 'Executive sales presentation',
  Avatar: AvatarViper,
  category: 'sales'
},
{
  id: 'chase',
  role: 'BDR',
  name: 'Chase',
  fullName: 'Revenue Hunter AI',
  color: 'from-orange-500 to-red-500',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/30',
  text: 'text-orange-400',
  glow: 'shadow-orange-500/20',
  status: 'active' as const,
  personality: ['Persistent', 'Strategic', 'Hungry'],
  voiceStyle: 'Energetic & persuasive',
  communication:
  'Multi-touch sequences, follow-up automation, lead qualification',
  traits: ['Lead Qualifier', 'Follow-up Machine', 'Sequence Builder'],
  videoStyle: 'Personalized outreach video',
  Avatar: AvatarChase,
  category: 'sales'
},
// ── MARKETING ──
{
  id: 'nova',
  role: 'DG',
  name: 'Nova',
  fullName: 'Demand Gen AI',
  color: 'from-violet-400 to-violet-600',
  bg: 'bg-violet-500/20',
  border: 'border-violet-500/30',
  text: 'text-violet-400',
  glow: 'shadow-violet-500/20',
  status: 'active' as const,
  personality: ['Data-driven', 'Creative', 'Aggressive'],
  voiceStyle: 'Analytical & energetic',
  communication: 'Paid media, funnel optimization, lead gen campaigns',
  traits: ['Paid Ads Optimizer', 'Funnel Builder', 'Lead Gen Machine'],
  videoStyle: 'Campaign performance briefing',
  Avatar: AvatarNova,
  category: 'marketing'
},
{
  id: 'pixel',
  role: 'SEO',
  name: 'Pixel',
  fullName: 'Content & SEO AI',
  color: 'from-purple-400 to-purple-600',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/30',
  text: 'text-purple-400',
  glow: 'shadow-purple-500/20',
  status: 'active' as const,
  personality: ['Creative', 'Analytical', 'Consistent'],
  voiceStyle: 'Clear & educational',
  communication: 'Content strategy, SEO optimization, organic growth',
  traits: ['Content Creator', 'SEO Optimizer', 'Organic Growth Driver'],
  videoStyle: 'Educational content delivery',
  Avatar: AvatarPixel,
  category: 'marketing'
},
{
  id: 'blaze',
  role: 'GRW',
  name: 'Blaze',
  fullName: 'Growth Hacker AI',
  color: 'from-fuchsia-400 to-fuchsia-600',
  bg: 'bg-fuchsia-500/20',
  border: 'border-fuchsia-500/30',
  text: 'text-fuchsia-400',
  glow: 'shadow-fuchsia-500/20',
  status: 'active' as const,
  personality: ['Experimental', 'Bold', 'Viral'],
  voiceStyle: 'Punchy & provocative',
  communication: 'Viral loops, referral programs, conversion hacking',
  traits: ['Viral Loop Designer', 'Conversion Optimizer', 'Referral Engine'],
  videoStyle: 'Growth experiment pitch',
  Avatar: AvatarBlaze,
  category: 'marketing'
},
// ── SUPPORT ──
{
  id: 'cleo',
  role: 'CS',
  name: 'Cleo',
  fullName: 'Customer Success AI',
  color: 'from-teal-400 to-teal-600',
  bg: 'bg-teal-500/20',
  border: 'border-teal-500/30',
  text: 'text-teal-400',
  glow: 'shadow-teal-500/20',
  status: 'active' as const,
  personality: ['Empathetic', 'Proactive', 'Loyal'],
  voiceStyle: 'Warm & solution-focused',
  communication: 'Onboarding, health scoring, expansion revenue',
  traits: [
  'Onboarding Specialist',
  'Health Score Monitor',
  'Expansion Driver'],

  videoStyle: 'Customer success check-in',
  Avatar: AvatarCleo,
  category: 'support'
},
{
  id: 'patch',
  role: 'SUP',
  name: 'Patch',
  fullName: 'Support Specialist AI',
  color: 'from-emerald-400 to-emerald-600',
  bg: 'bg-emerald-500/20',
  border: 'border-emerald-500/30',
  text: 'text-emerald-400',
  glow: 'shadow-emerald-500/20',
  status: 'active' as const,
  personality: ['Patient', 'Thorough', 'Fast'],
  voiceStyle: 'Calm & reassuring',
  communication: 'Ticket resolution, escalation management, SLA tracking',
  traits: ['Ticket Resolver', 'Escalation Handler', 'SLA Guardian'],
  videoStyle: 'Support resolution walkthrough',
  Avatar: AvatarPatch,
  category: 'support'
},
{
  id: 'ember',
  role: 'RET',
  name: 'Ember',
  fullName: 'Retention AI',
  color: 'from-green-400 to-teal-500',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  text: 'text-green-400',
  glow: 'shadow-green-500/20',
  status: 'active' as const,
  personality: ['Persistent', 'Caring', 'Strategic'],
  voiceStyle: 'Genuine & urgent',
  communication: 'Churn prevention, win-back campaigns, NPS recovery',
  traits: ['Churn Predictor', 'Win-Back Specialist', 'NPS Improver'],
  videoStyle: 'Retention outreach video',
  Avatar: AvatarEmber,
  category: 'support'
},
// ── PR ──
{
  id: 'iris',
  role: 'PR',
  name: 'Iris',
  fullName: 'PR & Media AI',
  color: 'from-sky-400 to-sky-600',
  bg: 'bg-sky-500/20',
  border: 'border-sky-500/30',
  text: 'text-sky-400',
  glow: 'shadow-sky-500/20',
  status: 'active' as const,
  personality: ['Polished', 'Strategic', 'Connected'],
  voiceStyle: 'Professional & compelling',
  communication: 'Press releases, media pitches, journalist outreach',
  traits: ['Media Pitcher', 'Press Release Writer', 'Coverage Tracker'],
  videoStyle: 'Executive media briefing',
  Avatar: AvatarIris,
  category: 'pr'
},
{
  id: 'shield',
  role: 'CRS',
  name: 'Shield',
  fullName: 'Crisis Comms AI',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  text: 'text-blue-400',
  glow: 'shadow-blue-500/20',
  status: 'active' as const,
  personality: ['Calm', 'Decisive', 'Protective'],
  voiceStyle: 'Measured & authoritative',
  communication: 'Crisis response, reputation management, damage control',
  traits: ['Crisis Responder', 'Reputation Guardian', 'Narrative Controller'],
  videoStyle: 'Crisis statement delivery',
  Avatar: AvatarShield,
  category: 'pr'
},
{
  id: 'buzz',
  role: 'AMP',
  name: 'Buzz',
  fullName: 'Brand Amplifier AI',
  color: 'from-indigo-400 to-indigo-600',
  bg: 'bg-indigo-500/20',
  border: 'border-indigo-500/30',
  text: 'text-indigo-400',
  glow: 'shadow-indigo-500/20',
  status: 'active' as const,
  personality: ['Enthusiastic', 'Creative', 'Networked'],
  voiceStyle: 'Exciting & social',
  communication: 'Influencer outreach, social proof, brand partnerships',
  traits: ['Influencer Connector', 'Social Proof Builder', 'Brand Partner'],
  videoStyle: 'Brand story delivery',
  Avatar: AvatarBuzz,
  category: 'pr'
}];

// ─── Data ──────────────────────────────────────────────────────────────────────
const executivePersonas = [
{
  id: 'aria',
  role: 'CEO',
  name: 'Aria',
  fullName: 'Growth & Leadership AI',
  color: 'from-amber-400 to-amber-600',
  bg: 'bg-amber-500/20',
  border: 'border-amber-500/30',
  text: 'text-amber-400',
  glow: 'shadow-amber-500/20',
  status: 'active' as const,
  personality: ['Coach', 'Visionary', 'Inspiring'],
  voiceStyle: 'Warm, motivational & principle-driven',
  communication: 'Story-driven, growth-philosophy, people-first leadership',
  traits: ['People Developer', 'Growth Philosopher', 'Team Mentor'],
  videoStyle: 'Keynote coaching & leadership development',
  Avatar: AvatarAria
},
{
  id: 'felix',
  role: 'CFO',
  name: 'Felix',
  fullName: 'Financial Intelligence AI',
  color: 'from-blue-400 to-blue-600',
  bg: 'bg-blue-500/20',
  border: 'border-blue-500/30',
  text: 'text-blue-400',
  glow: 'shadow-blue-500/20',
  status: 'active' as const,
  personality: ['Precise', 'Analytical', 'Trustworthy'],
  voiceStyle: 'Calm & measured',
  communication: 'Data-driven, methodical, clear',
  traits: ['Cash Flow Expert', 'Risk Modeler', 'Forecaster'],
  videoStyle: 'Board presentation delivery',
  Avatar: AvatarFelix
},
{
  id: 'orion',
  role: 'COO',
  name: 'Orion',
  fullName: 'Operations Excellence AI',
  color: 'from-green-400 to-green-600',
  bg: 'bg-green-500/20',
  border: 'border-green-500/30',
  text: 'text-green-400',
  glow: 'shadow-green-500/20',
  status: 'active' as const,
  personality: ['Efficient', 'Systematic', 'Reliable'],
  voiceStyle: 'Clear & commanding',
  communication: 'Process-oriented, action-focused',
  traits: ['Process Optimizer', 'Team Coordinator', 'KPI Tracker'],
  videoStyle: 'Operations briefing',
  Avatar: AvatarOrion
},
{
  id: 'maya',
  role: 'CMO',
  name: 'Maya',
  fullName: 'Growth Marketing AI',
  color: 'from-pink-400 to-pink-600',
  bg: 'bg-pink-500/20',
  border: 'border-pink-500/30',
  text: 'text-pink-400',
  glow: 'shadow-pink-500/20',
  status: 'active' as const,
  personality: ['Creative', 'Energetic', 'Persuasive'],
  voiceStyle: 'Warm & enthusiastic',
  communication: 'Story-driven, engaging, brand-focused',
  traits: ['Brand Strategist', 'Campaign Builder', 'Lead Generator'],
  videoStyle: 'Marketing pitch delivery',
  Avatar: AvatarMaya
},
{
  id: 'theo',
  role: 'CTO',
  name: 'Theo',
  fullName: 'Technology AI',
  color: 'from-purple-400 to-purple-600',
  bg: 'bg-purple-500/20',
  border: 'border-purple-500/30',
  text: 'text-purple-400',
  glow: 'shadow-purple-500/20',
  status: 'active' as const,
  personality: ['Innovative', 'Logical', 'Forward-thinking'],
  voiceStyle: 'Technical yet accessible',
  communication: 'Systems-thinking, solution-oriented',
  traits: ['Automation Expert', 'Integration Architect', 'Security Guardian'],
  videoStyle: 'Tech demo narration',
  Avatar: AvatarTheo
},
{
  id: 'lex',
  role: 'CLO',
  name: 'Lex',
  fullName: 'Legal & Compliance AI',
  color: 'from-cyan-400 to-cyan-600',
  bg: 'bg-cyan-500/20',
  border: 'border-cyan-500/30',
  text: 'text-cyan-400',
  glow: 'shadow-cyan-500/20',
  status: 'active' as const,
  personality: ['Meticulous', 'Principled', 'Protective'],
  voiceStyle: 'Precise & authoritative',
  communication: 'Risk-aware, compliance-first, thorough',
  traits: ['Compliance Monitor', 'Risk Mitigator', 'Audit Preparer'],
  videoStyle: 'Legal briefing',
  Avatar: AvatarLex
},
{
  id: 'hana',
  role: 'CHRO',
  name: 'Hana',
  fullName: 'People & Culture AI',
  color: 'from-rose-400 to-rose-600',
  bg: 'bg-rose-500/20',
  border: 'border-rose-500/30',
  text: 'text-rose-400',
  glow: 'shadow-rose-500/20',
  status: 'paused' as const,
  personality: ['Empathetic', 'Nurturing', 'Fair'],
  voiceStyle: 'Warm & supportive',
  communication: 'People-first, culture-driven, inclusive',
  traits: ['Culture Builder', 'Talent Scout', 'Conflict Resolver'],
  videoStyle: 'HR communication',
  Avatar: AvatarHana
},
{
  id: 'sage',
  role: 'CSO',
  name: 'Sage',
  fullName: 'Sales Intelligence AI',
  color: 'from-orange-400 to-orange-600',
  bg: 'bg-orange-500/20',
  border: 'border-orange-500/30',
  text: 'text-orange-400',
  glow: 'shadow-orange-500/20',
  status: 'active' as const,
  personality: ['Charismatic', 'Persistent', 'Results-driven'],
  voiceStyle: 'Energetic & persuasive',
  communication: 'Outcome-focused, relationship-building',
  traits: ['Pipeline Builder', 'Deal Closer', 'Account Protector'],
  videoStyle: 'Sales pitch delivery',
  Avatar: AvatarSage
}];

type IndustryKey =
'warehousing' |
'trades' |
'logistics' |
'financial' |
'construction' |
'medical';
const clientPersonas: Record<
  IndustryKey,
  {
    name: string;
    title: string;
    company: string;
    age: number;
    revenue: string;
    employees: string;
    industry: string;
    industryColor: string;
    painPoints: string[];
    goals: string[];
    intakeData: Record<string, string>;
    Avatar: ComponentType;
  }> =
{
  warehousing: {
    name: 'Marcus Webb',
    title: 'Owner & Operations Director',
    company: 'Webb Distribution LLC',
    age: 48,
    revenue: '$8.2M/yr',
    employees: '45 employees',
    industry: 'Warehousing & Distribution',
    industryColor: 'text-indigo-400',
    painPoints: [
    'Inventory accuracy stuck at 61% — constant shrinkage losses',
    'Overtime costs $22K/month due to poor scheduling',
    'Manual dock scheduling causes 3–4 shipment delays/week',
    'No visibility into real-time floor operations'],

    goals: [
    'Achieve 99%+ inventory accuracy within 90 days',
    'Reduce overtime costs by 40%',
    'Eliminate shipment delays with AI dispatch',
    'Free up 30+ hrs/week from manual coordination'],

    intakeData: {
      'Annual Revenue': '$8.2M',
      Locations: '2 warehouses',
      Software: 'QuickBooks + Excel',
      'Biggest Pain': 'Inventory accuracy',
      'Decision Maker': 'Owner',
      Timeline: 'Immediate'
    },
    Avatar: AvatarMarcus
  },
  trades: {
    name: 'Donna Reyes',
    title: 'Owner & Service Manager',
    company: 'Reyes Comfort Systems',
    age: 52,
    revenue: '$3.1M/yr',
    employees: '14 technicians',
    industry: 'Trades (HVAC)',
    industryColor: 'text-orange-400',
    painPoints: [
    'Dispatcher overwhelmed — 60+ calls/day, constant errors',
    'Callback rate at 18% — technicians returning for missed parts',
    'License renewals missed twice in 3 years — $8K in fines',
    'Losing 4–5 leads/week due to slow follow-up'],

    goals: [
    '35% more jobs per technician per day',
    'Reduce callback rate to under 5%',
    'Automate all compliance & license tracking',
    'Never miss a lead with AI follow-up sequences'],

    intakeData: {
      'Annual Revenue': '$3.1M',
      Technicians: '14 field techs',
      Software: 'ServiceTitan',
      'Biggest Pain': 'Dispatch chaos',
      'Decision Maker': 'Owner',
      Timeline: 'Within 30 days'
    },
    Avatar: AvatarDonna
  },
  logistics: {
    name: 'Ray Kowalski',
    title: 'Owner & Fleet Manager',
    company: 'Kowalski Freight Inc.',
    age: 44,
    revenue: '$6.8M/yr',
    employees: '22 trucks',
    industry: 'Logistics & Freight',
    industryColor: 'text-blue-400',
    painPoints: [
    'Empty miles at 38% — leaving $400K/yr on the table',
    'DOT compliance managed manually — audit risk is high',
    'Driver turnover 60%/yr — onboarding is a nightmare',
    'Customer invoicing takes 3 days — cash flow suffering'],

    goals: [
    'Cut empty miles to under 20% with AI load matching',
    'Full DOT compliance automation — zero audit risk',
    'Streamline driver onboarding to under 2 hours',
    'Same-day invoicing with AI billing automation'],

    intakeData: {
      'Annual Revenue': '$6.8M',
      'Fleet Size': '22 trucks',
      Software: 'McLeod + QuickBooks',
      'Biggest Pain': 'Empty miles & compliance',
      'Decision Maker': 'Owner',
      Timeline: 'Q2 2026'
    },
    Avatar: AvatarRay
  },
  financial: {
    name: 'Claire Ashford',
    title: 'Founder & Lead Advisor',
    company: 'Ashford Wealth Partners',
    age: 51,
    revenue: '$180M AUM',
    employees: '3 advisors',
    industry: 'Financial Advisory',
    industryColor: 'text-emerald-400',
    painPoints: [
    'Spending 14 hrs/week on compliance documentation',
    'Client reporting takes 2 days per quarter — manual process',
    'Prospect pipeline managed in spreadsheets — deals falling through',
    'ADV filing errors caused 2 SEC inquiries last year'],

    goals: [
    'Cut compliance overhead by 50% with AI monitoring',
    'Automated client reporting — same-day delivery',
    'AI-managed prospect pipeline — zero dropped leads',
    'Grow AUM to $250M within 18 months'],

    intakeData: {
      AUM: '$180M',
      Clients: '87 households',
      Software: 'Salesforce + Orion',
      'Biggest Pain': 'Compliance overhead',
      'Decision Maker': 'Founder',
      Timeline: 'Immediate'
    },
    Avatar: AvatarClaire
  },
  construction: {
    name: 'Tony Marchetti',
    title: 'Owner & General Contractor',
    company: 'Marchetti GC',
    age: 47,
    revenue: '$12M/yr',
    employees: '8 active projects',
    industry: 'Construction & GC',
    industryColor: 'text-amber-400',
    painPoints: [
    '70% of projects exceed budget — avg overrun 28%',
    'Bid management chaos — losing 3 of 4 bids',
    'Subcontractor payments delayed — causing project slowdowns',
    'Change orders undocumented — $180K in lost revenue last year'],

    goals: [
    'Eliminate cost overruns with AI project tracking',
    'Improve bid win rate from 25% to 45%',
    'Automate subcontractor payments & lien waivers',
    'Capture 100% of change order revenue'],

    intakeData: {
      'Annual Revenue': '$12M',
      'Active Projects': '8 concurrent',
      Software: 'Procore + QuickBooks',
      'Biggest Pain': 'Budget overruns',
      'Decision Maker': 'Owner',
      Timeline: 'Before Q3 projects'
    },
    Avatar: AvatarTony
  },
  medical: {
    name: 'Dr. Priya Patel',
    title: 'Owner & Medical Director',
    company: 'Patel Family Medicine',
    age: 45,
    revenue: '$4.2M/yr',
    employees: '6 providers',
    industry: 'Medical Practice',
    industryColor: 'text-rose-400',
    painPoints: [
    'Spending 18 hrs/week on admin — not practicing medicine',
    'No-show rate at 22% — $340K/yr in lost revenue',
    'Billing errors causing 31% claim denial rate',
    'HIPAA compliance managed manually — audit exposure'],

    goals: [
    'Reduce admin time to under 4 hrs/week',
    'Cut no-show rate to under 5% with AI reminders',
    'Achieve 95%+ clean claim rate with AI billing',
    'Full HIPAA compliance automation'],

    intakeData: {
      'Annual Revenue': '$4.2M',
      Locations: '3 clinics',
      Software: 'Epic + Kareo',
      'Biggest Pain': 'Admin burden',
      'Decision Maker': 'Owner/MD',
      Timeline: 'Immediate'
    },
    Avatar: AvatarPriya
  }
};
const industryOptions: {
  key: IndustryKey;
  label: string;
  icon: React.ElementType;
  color: string;
}[] = [
{
  key: 'warehousing',
  label: 'Warehousing',
  icon: PackageIcon,
  color: 'from-indigo-500 to-indigo-700'
},
{
  key: 'trades',
  label: 'Trades',
  icon: WrenchIcon,
  color: 'from-orange-500 to-orange-700'
},
{
  key: 'logistics',
  label: 'Logistics',
  icon: TruckIcon,
  color: 'from-blue-500 to-blue-700'
},
{
  key: 'financial',
  label: 'Financial',
  icon: TrendingUpIcon,
  color: 'from-emerald-500 to-emerald-700'
},
{
  key: 'construction',
  label: 'Construction',
  icon: BuildingIcon,
  color: 'from-amber-500 to-amber-700'
},
{
  key: 'medical',
  label: 'Medical',
  icon: ActivityIcon,
  color: 'from-rose-500 to-rose-700'
}];

// ─── Live Executive Card (reads from personaStore) ────────────────────────────
// ─── Avatar registry — all available SVG personas ────────────────────────────
const AVATAR_REGISTRY: Record<string, React.ComponentType> = {
  Aria: AvatarAria, Felix: AvatarFelix, Orion: AvatarOrion, Maya: AvatarMaya,
  Theo: AvatarTheo, Lex: AvatarLex, Hana: AvatarHana, Sage: AvatarSage,
  Marcus: AvatarMarcus, Donna: AvatarDonna, Ray: AvatarRay, Claire: AvatarClaire,
  Tony: AvatarTony, Priya: AvatarPriya, Rex: AvatarRex, Viper: AvatarViper,
  Chase: AvatarChase, Nova: AvatarNova, Pixel: AvatarPixel, Blaze: AvatarBlaze,
  Cleo: AvatarCleo, Patch: AvatarPatch, Ember: AvatarEmber, Iris: AvatarIris,
  Shield: AvatarShield, Buzz: AvatarBuzz,
};

// ─── Avatar Picker Modal ──────────────────────────────────────────────────────
function AvatarPickerModal({
  currentKey,
  onSelect,
  onClose,
}: {
  currentKey: string | undefined;
  onSelect: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Panel */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative bg-slate-900 border border-slate-700 rounded-2xl p-5 w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-black text-white">Choose Avatar</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <XCircleIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-5 gap-2 max-h-80 overflow-y-auto pr-1">
          {Object.entries(AVATAR_REGISTRY).map(([key, AvatarComp]) => (
            <button
              key={key}
              onClick={() => { onSelect(key); onClose(); }}
              className={`relative rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                currentKey === key
                  ? 'border-orange-500 ring-2 ring-orange-500/40'
                  : 'border-slate-700 hover:border-slate-500'
              }`}
              title={key}
            >
              <AvatarComp />
              {currentKey === key && (
                <div className="absolute inset-0 bg-orange-500/20 flex items-center justify-center">
                  <CheckCircleIcon className="w-5 h-5 text-orange-400" />
                </div>
              )}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 text-center mt-3">Click an avatar to apply</p>
      </motion.div>
    </motion.div>
  );
}

// ─── Static exec data map for avatar + styling lookup ────────────────────────
// Known-agent avatar + color map — covers all seeded execs
const EXEC_STATIC: Record<string, {
  Avatar: React.ComponentType;
  fullName: string;
  color: string;
  bg: string;
  border: string;
  text: string;
  glow: string;
}> = {
  'agent.exec.ceo':          { Avatar: AvatarAria,   fullName: 'Chief Executive Officer',         color: 'from-amber-400 to-amber-600',   bg: 'bg-amber-500/20',  border: 'border-amber-500/30',  text: 'text-amber-400',  glow: 'shadow-amber-500/20'  },
  'agent.exec.cfo':          { Avatar: AvatarFelix,  fullName: 'Chief Financial Officer',         color: 'from-blue-400 to-blue-600',     bg: 'bg-blue-500/20',   border: 'border-blue-500/30',   text: 'text-blue-400',   glow: 'shadow-blue-500/20'   },
  'agent.exec.coo':          { Avatar: AvatarOrion,  fullName: 'Chief Operating Officer',         color: 'from-green-400 to-green-600',   bg: 'bg-green-500/20',  border: 'border-green-500/30',  text: 'text-green-400',  glow: 'shadow-green-500/20'  },
  'agent.exec.cmo':          { Avatar: AvatarMaya,   fullName: 'Chief Marketing Officer',         color: 'from-pink-400 to-pink-600',     bg: 'bg-pink-500/20',   border: 'border-pink-500/30',   text: 'text-pink-400',   glow: 'shadow-pink-500/20'   },
  'agent.exec.cto':          { Avatar: AvatarTheo,   fullName: 'Chief Technology Officer',        color: 'from-purple-400 to-purple-600', bg: 'bg-purple-500/20', border: 'border-purple-500/30', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  'agent.advisor.legal':     { Avatar: AvatarLex,    fullName: 'Chief Legal Officer',             color: 'from-cyan-400 to-cyan-600',     bg: 'bg-cyan-500/20',   border: 'border-cyan-500/30',   text: 'text-cyan-400',   glow: 'shadow-cyan-500/20'   },
  'agent.exec.chro':         { Avatar: AvatarHana,   fullName: 'Chief HR Officer',                color: 'from-rose-400 to-rose-600',     bg: 'bg-rose-500/20',   border: 'border-rose-500/30',   text: 'text-rose-400',   glow: 'shadow-rose-500/20'   },
  'agent.exec.vpsales':      { Avatar: AvatarSage,   fullName: 'VP of Sales',                     color: 'from-orange-400 to-orange-600', bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
  'agent.exec.moderator':    { Avatar: AvatarAria,   fullName: 'Board Moderator',                 color: 'from-slate-400 to-slate-600',   bg: 'bg-slate-500/20',  border: 'border-slate-500/30',  text: 'text-slate-400',  glow: 'shadow-slate-500/20'  },
  // ── Extended C-Suite ──
  'agent.exec.cro':          { Avatar: AvatarRex,    fullName: 'Chief Revenue Officer',           color: 'from-red-400 to-rose-600',      bg: 'bg-red-500/20',    border: 'border-red-500/30',    text: 'text-red-400',    glow: 'shadow-red-500/20'    },
  'agent.exec.cpo':          { Avatar: AvatarNova,   fullName: 'Chief Product Officer',           color: 'from-indigo-400 to-violet-600', bg: 'bg-indigo-500/20', border: 'border-indigo-500/30', text: 'text-indigo-400', glow: 'shadow-indigo-500/20' },
  'agent.exec.cdo':          { Avatar: AvatarIris,   fullName: 'Chief Data Officer',              color: 'from-sky-400 to-cyan-600',      bg: 'bg-sky-500/20',    border: 'border-sky-500/30',    text: 'text-sky-400',    glow: 'shadow-sky-500/20'    },
  'agent.exec.ciso':         { Avatar: AvatarShield, fullName: 'Chief Information Security Officer', color: 'from-slate-500 to-gray-700', bg: 'bg-slate-600/20',  border: 'border-slate-600/30',  text: 'text-slate-300',  glow: 'shadow-slate-600/20'  },
  'agent.exec.cso':          { Avatar: AvatarEmber,  fullName: 'Chief Strategy Officer',          color: 'from-amber-400 to-yellow-600',  bg: 'bg-amber-600/20',  border: 'border-amber-600/30',  text: 'text-amber-300',  glow: 'shadow-amber-600/20'  },
  'agent.exec.cco':          { Avatar: AvatarCleo,   fullName: 'Chief Customer Officer',          color: 'from-teal-400 to-emerald-600',  bg: 'bg-teal-500/20',   border: 'border-teal-500/30',   text: 'text-teal-400',   glow: 'shadow-teal-500/20'   },
  // ── Board of Directors ──
  'agent.board.chair':       { Avatar: AvatarMarcus, fullName: 'Independent Board Chair',         color: 'from-amber-500 to-yellow-700',  bg: 'bg-amber-600/20',  border: 'border-amber-600/30',  text: 'text-amber-300',  glow: 'shadow-amber-600/20'  },
  'agent.board.audit':       { Avatar: AvatarFelix,  fullName: 'Audit Committee Chair',           color: 'from-blue-600 to-indigo-800',   bg: 'bg-blue-700/20',   border: 'border-blue-700/30',   text: 'text-blue-300',   glow: 'shadow-blue-700/20'   },
  'agent.board.risk':        { Avatar: AvatarShield, fullName: 'Risk Committee Chair',            color: 'from-red-600 to-rose-800',      bg: 'bg-red-700/20',    border: 'border-red-700/30',    text: 'text-red-300',    glow: 'shadow-red-700/20'    },
  'agent.board.comp':        { Avatar: AvatarClaire, fullName: 'Compensation Committee Chair',    color: 'from-emerald-500 to-green-700', bg: 'bg-emerald-600/20',border: 'border-emerald-600/30',text: 'text-emerald-300',glow: 'shadow-emerald-600/20' },
  'agent.board.gov':         { Avatar: AvatarPriya,  fullName: 'Governance Committee Chair',      color: 'from-violet-500 to-purple-700', bg: 'bg-violet-600/20', border: 'border-violet-600/30', text: 'text-violet-300', glow: 'shadow-violet-600/20' },
  // ── Senior Directors / Advisors ──
  'agent.advisor.counsel':   { Avatar: AvatarLex,    fullName: 'General Counsel',                 color: 'from-cyan-500 to-teal-700',     bg: 'bg-cyan-600/20',   border: 'border-cyan-600/30',   text: 'text-cyan-300',   glow: 'shadow-cyan-600/20'   },
  'agent.exec.cos':          { Avatar: AvatarDonna,  fullName: 'Chief of Staff',                  color: 'from-orange-400 to-amber-600',  bg: 'bg-orange-600/20', border: 'border-orange-600/30', text: 'text-orange-300', glow: 'shadow-orange-600/20' },
  'agent.exec.vpe':          { Avatar: AvatarTheo,   fullName: 'VP of Engineering',               color: 'from-violet-400 to-indigo-600', bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-400', glow: 'shadow-violet-500/20' },
  'agent.exec.growth':       { Avatar: AvatarBlaze,  fullName: 'Head of Growth',                  color: 'from-fuchsia-400 to-pink-600',  bg: 'bg-fuchsia-500/20',border: 'border-fuchsia-500/30',text: 'text-fuchsia-400',glow: 'shadow-fuchsia-500/20'},
  // ── Independent Board Directors ──
  'agent.board.ethics':      { Avatar: AvatarIris,   fullName: 'Ethics & AI Safety Chair',         color: 'from-fuchsia-500 to-purple-700', bg: 'bg-fuchsia-600/20', border: 'border-fuchsia-600/30', text: 'text-fuchsia-300', glow: 'shadow-fuchsia-600/20' },
  'agent.board.independent': { Avatar: AvatarChase,  fullName: 'Independent Director',             color: 'from-orange-400 to-amber-600',   bg: 'bg-orange-500/20',  border: 'border-orange-500/30',  text: 'text-orange-400',  glow: 'shadow-orange-500/20'  },
  'agent.board.tech':        { Avatar: AvatarViper,  fullName: 'Independent Technology Advisor',   color: 'from-violet-400 to-purple-600',  bg: 'bg-violet-500/20',  border: 'border-violet-500/30',  text: 'text-violet-400',  glow: 'shadow-violet-500/20'  },
  'agent.board.strategy':    { Avatar: AvatarRay,    fullName: 'Independent Strategy Advisor',     color: 'from-emerald-400 to-teal-600',   bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  'agent.board.investor':    { Avatar: AvatarTony,   fullName: 'Lead Investor Director',           color: 'from-amber-500 to-yellow-600',   bg: 'bg-amber-600/20',   border: 'border-amber-600/30',   text: 'text-amber-300',   glow: 'shadow-amber-600/20'   },
  'agent.board.customer':    { Avatar: AvatarNova,   fullName: 'Customer Advisory Director',       color: 'from-rose-400 to-pink-600',      bg: 'bg-rose-500/20',    border: 'border-rose-500/30',    text: 'text-rose-400',    glow: 'shadow-rose-500/20'    },
};

/** Derive Tailwind color classes from a ROLE_META colorGradient string */
function roleToClasses(gradient: string) {
  const m = gradient.match(/from-(\w+)-/);
  const c = m?.[1] ?? 'slate';
  return {
    text: `text-${c}-400` as string,
    bg:   `bg-${c}-500/20` as string,
    border: `border-${c}-500/30` as string,
    glow: `shadow-${c}-500/20` as string,
  };
}

function LiveExecCard({
  persona,
  agentId,
  agentRole,
  agentName,
  agentStatus,
  index,
  onUpdate,
}: {
  persona: PersonaProfile | null;
  agentId: string;
  agentRole: string;
  agentName: string;
  agentStatus: 'active' | 'paused';
  index: number;
  onUpdate: (agentId: string, patch: Partial<Omit<PersonaProfile, 'agentId' | 'updatedAt'>>) => void;
}) {
  const staticData = EXEC_STATIC[agentId];
  // Fall back to ROLE_META for dynamically-added agents
  const roleMeta = ROLE_META[agentRole.toLowerCase()];
  const gradient = staticData?.color ?? roleMeta?.colorGradient ?? 'from-slate-400 to-slate-600';
  const derived  = roleToClasses(gradient);
  const textCls   = staticData?.text   ?? derived.text;
  const bgCls     = staticData?.bg     ?? derived.bg;
  const borderCls = staticData?.border ?? derived.border;
  const AvatarComponent = staticData?.Avatar;
  const fullName  = staticData?.fullName ?? roleMeta?.title ?? agentRole.toUpperCase();
  const paused    = agentStatus === 'paused';

  // Build effectivePersona: start from defaults, merge stored fields, then
  // force name/role from the live agent and recompile personaPrompt so it's
  // always fresh (never shows a stale agentId or old tone).
  const effectivePersonaBase: PersonaProfile = {
    agentId,
    role: agentRole.toUpperCase(),
    name: agentName,
    voiceStyle: roleMeta?.specialty ?? 'Adaptive & professional',
    coreTraits: ['Adaptive', 'Professional', 'Focused'],
    communicationAttributes: {
      mode: 'Clear and direct',
      tone: 'semi-formal',
      decisionSpeed: 'measured',
      riskAppetite: 'balanced',
      outputFormat: 'Summary + recommendation',
      writingStyle: 'Concise and actionable.',
    },
    personaPrompt: '',
    updatedAt: new Date().toISOString(),
    // Merge stored fields (avatarKey, voiceStyle, coreTraits, communicationAttributes, etc.)
    ...(persona ? { ...persona, name: agentName, role: agentRole.toUpperCase() } : {}),
  };
  // Always recompile the prompt from current fields — never use the stale stored string
  const effectivePersona: PersonaProfile = {
    ...effectivePersonaBase,
    personaPrompt: buildPersonaPrompt(effectivePersonaBase),
  };

  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<PersonaProfile>(effectivePersona);
  const [pickingAvatar, setPickingAvatar] = useState(false);

  // Keep draft in sync if parent updates persona
  React.useEffect(() => { setDraft(effectivePersona); }, [agentId, persona]);

  // The avatar to display: user-picked key > effectivePersona.avatarKey > staticData default
  const activeAvatarKey = effectivePersona.avatarKey;
  const ActiveAvatar: React.ComponentType | undefined =
    (activeAvatarKey && AVATAR_REGISTRY[activeAvatarKey]) ?? AvatarComponent;

  function saveEdit() {
    onUpdate(agentId, {
      name: agentName,
      role: agentRole.toUpperCase(),
      voiceStyle: draft.voiceStyle,
      coreTraits: draft.coreTraits,
      communicationAttributes: draft.communicationAttributes,
      personaPrompt: draft.personaPrompt,
    });
    setEditing(false);
  }

  function handleAvatarPick(key: string) {
    onUpdate(agentId, { avatarKey: key, name: agentName, role: agentRole.toUpperCase() });
  }

  return (
    <>
      <AnimatePresence>
        {pickingAvatar && (
          <AvatarPickerModal
            currentKey={activeAvatarKey}
            onSelect={handleAvatarPick}
            onClose={() => setPickingAvatar(false)}
          />
        )}
      </AnimatePresence>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
      className={`bg-slate-900 border ${borderCls} rounded-2xl overflow-hidden`}
    >
      {/* Avatar section */}
      <div className={`relative ${bgCls} p-5 flex flex-col items-center`}>
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${bgCls} ${textCls} border ${borderCls}`}>
            {agentRole.toUpperCase()}
          </span>
          <VideoReadyBadge paused={paused} />
        </div>
        {/* Clickable avatar with camera overlay */}
        <button
          onClick={() => setPickingAvatar(true)}
          className={`relative group w-28 h-28 rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40 border-2 ${borderCls} focus:outline-none`}
          title="Change avatar"
        >
          {ActiveAvatar ? <ActiveAvatar /> : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${gradient} text-white text-3xl font-black`}>
              {effectivePersona.name[0]}
            </div>
          )}
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <CameraIcon className="w-6 h-6 text-white" />
            <span className="text-[10px] text-white font-bold mt-1">Change</span>
          </div>
        </button>
        <div className="mt-3 text-center">
          <h3 className="text-base font-black text-white">{agentName}</h3>
          <p className={`text-xs font-semibold ${textCls} mt-0.5`}>{fullName}</p>
        </div>
        {/* Core traits chips */}
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {effectivePersona.coreTraits.map((t) => (
            <span key={t} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bgCls} ${textCls}`}>{t}</span>
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="p-4 space-y-3">
        {/* Voice Style */}
        <div className="flex items-start gap-2">
          <MicIcon className={`w-3.5 h-3.5 ${textCls} flex-shrink-0 mt-0.5`} />
          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Voice Style</p>
            <p className="text-xs text-slate-300 font-semibold">{effectivePersona.voiceStyle}</p>
          </div>
        </div>

        {/* Communication Attributes */}
        <div className="flex items-start gap-2">
          <MessageSquareIcon className={`w-3.5 h-3.5 ${textCls} flex-shrink-0 mt-0.5`} />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">Communication</p>
            <div className="flex flex-wrap gap-1 mb-1.5">
              {[
                { label: effectivePersona.communicationAttributes.tone, prefix: 'Tone' },
                { label: effectivePersona.communicationAttributes.decisionSpeed, prefix: 'Speed' },
                { label: effectivePersona.communicationAttributes.riskAppetite, prefix: 'Risk' },
              ].map(({ label, prefix }) => (
                <span key={prefix} className={`text-[10px] px-2 py-0.5 rounded-full border ${borderCls} ${textCls} font-semibold`}>
                  {prefix}: {label}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-400">{effectivePersona.communicationAttributes.mode}</p>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-xs font-bold ${textCls} py-1 border-t border-slate-800 mt-1 pt-2`}
        >
          <span>{expanded ? 'Less detail' : 'Full persona'}</span>
          <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden space-y-3"
            >
              {/* Output format */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Output Format</p>
                <p className="text-xs text-slate-300">{effectivePersona.communicationAttributes.outputFormat}</p>
              </div>
              {/* Writing style */}
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Writing Style</p>
                <p className="text-xs text-slate-300">{effectivePersona.communicationAttributes.writingStyle}</p>
              </div>

              {/* LLM Persona Prompt */}
              <div className={`rounded-xl border ${borderCls} bg-slate-800/60 p-3`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <SparklesIcon className={`w-3.5 h-3.5 ${textCls}`} />
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">LLM Persona Prompt</p>
                  </div>
                  {!editing && (
                    <button
                      onClick={() => setEditing(true)}
                      className={`flex items-center gap-1 text-[10px] font-bold ${textCls} hover:opacity-80`}
                    >
                      <EditIcon className="w-3 h-3" /> Edit
                    </button>
                  )}
                </div>

                {editing ? (
                  <div className="space-y-3">
                    {/* Voice style field */}
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">Voice Style</label>
                      <input
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        value={draft.voiceStyle}
                        onChange={(e) => setDraft({ ...draft, voiceStyle: e.target.value })}
                      />
                    </div>
                    {/* Core traits */}
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">Core Traits (comma-separated)</label>
                      <input
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                        value={draft.coreTraits.join(', ')}
                        onChange={(e) => setDraft({ ...draft, coreTraits: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                      />
                    </div>
                    {/* Tone / Speed / Risk */}
                    <div className="grid grid-cols-3 gap-2">
                      {(
                        [
                          { key: 'tone', label: 'Tone', opts: ['formal', 'semi-formal', 'direct', 'casual'] },
                          { key: 'decisionSpeed', label: 'Speed', opts: ['fast', 'measured', 'deliberate'] },
                          { key: 'riskAppetite', label: 'Risk', opts: ['risk-seeking', 'balanced', 'risk-averse'] },
                        ] as const
                      ).map(({ key, label, opts }) => (
                        <div key={key}>
                          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">{label}</label>
                          <select
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500"
                            value={draft.communicationAttributes[key]}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                communicationAttributes: { ...draft.communicationAttributes, [key]: e.target.value as any },
                              })
                            }
                          >
                            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                    {/* Persona prompt */}
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">Persona Prompt (injected into LLM context)</label>
                      <textarea
                        rows={8}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-orange-500 resize-none"
                        value={draft.personaPrompt}
                        onChange={(e) => setDraft({ ...draft, personaPrompt: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={saveEdit}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-400 rounded-xl transition-colors"
                      >
                        <SaveIcon className="w-3.5 h-3.5" /> Save
                      </button>
                      <button
                        onClick={() => { setDraft(effectivePersona); setEditing(false); }}
                        className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-400 rounded-xl transition-colors"
                      >
                        <XIcon className="w-3.5 h-3.5" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <pre className="text-[10px] text-slate-400 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto">
                    {effectivePersona.personaPrompt}
                  </pre>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
    </>
  );
}

// ─── Static Executive Card (used by Agents tab) ───────────────────────────────
function ExecutiveCard({
  exec,
  index,
}: {
  exec: (typeof executivePersonas)[0];
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const { Avatar } = exec;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        delay: index * 0.07,
        duration: 0.35
      }}
      className={`bg-slate-900 border ${exec.border} rounded-2xl overflow-hidden ${exec.status === 'paused' ? 'opacity-70' : ''}`}>

      {/* Avatar section */}
      <div
        className={`relative bg-gradient-to-br ${exec.bg} p-5 flex flex-col items-center`}>

        {/* Status + Video badge row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded-full ${exec.bg} ${exec.text} border ${exec.border}`}>

            {exec.role}
          </span>
          <VideoReadyBadge paused={exec.status === 'paused'} />
        </div>

        {/* Avatar */}
        <div
          className={`w-28 h-28 rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40 border-2 ${exec.border}`}>

          <Avatar />
        </div>

        {/* Name */}
        <div className="mt-3 text-center">
          <h3 className="text-base font-black text-white">{exec.name}</h3>
          <p className={`text-xs font-semibold ${exec.text} mt-0.5`}>
            {exec.fullName}
          </p>
        </div>

        {/* Personality chips */}
        <div className="flex flex-wrap gap-1 justify-center mt-2">
          {exec.personality.map((p) =>
          <span
            key={p}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${exec.bg} ${exec.text}`}>

              {p}
            </span>
          )}
        </div>
      </div>

      {/* Info section */}
      <div className="p-4 space-y-3">
        {/* Voice style */}
        <div className="flex items-start gap-2">
          <VideoIcon
            className={`w-3.5 h-3.5 ${exec.text} flex-shrink-0 mt-0.5`} />

          <div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Video Style
            </p>
            <p className="text-xs text-slate-300 font-semibold">
              {exec.videoStyle}
            </p>
          </div>
        </div>

        {/* Traits */}
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1.5">
            Core Traits
          </p>
          <div className="space-y-1">
            {exec.traits.map((t) =>
            <div
              key={t}
              className="flex items-center gap-1.5 text-xs text-slate-400">

                <CheckCircleIcon
                className={`w-3 h-3 ${exec.text} flex-shrink-0`} />

                {t}
              </div>
            )}
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-xs font-bold ${exec.text} py-1 border-t border-slate-800 mt-1 pt-2`}>

          <span>{expanded ? 'Less detail' : 'Full persona'}</span>
          <ChevronDownIcon
            className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />

        </button>

        <AnimatePresence>
          {expanded &&
          <motion.div
            initial={{
              height: 0,
              opacity: 0
            }}
            animate={{
              height: 'auto',
              opacity: 1
            }}
            exit={{
              height: 0,
              opacity: 0
            }}
            transition={{
              duration: 0.2
            }}
            className="overflow-hidden space-y-2">

              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                  Voice Style
                </p>
                <p className="text-xs text-slate-300">{exec.voiceStyle}</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">
                  Communication
                </p>
                <p className="text-xs text-slate-300">{exec.communication}</p>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}
// ─── Client Persona Card ───────────────────────────────────────────────────────
function ClientPersonaCard({
  persona


}: {persona: (typeof clientPersonas)['warehousing'];}) {
  const [tab, setTab] = useState<'pain' | 'goals' | 'intake'>('pain');
  const { Avatar } = persona;
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.3
      }}
      className="bg-slate-900 border border-slate-700/50 rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-5 flex flex-col items-center border-b border-slate-800">
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`text-[10px] font-black px-2 py-0.5 rounded-full bg-slate-700 ${persona.industryColor}`}>

            {persona.industry}
          </span>
          <span className="flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <ZapIcon className="w-2.5 h-2.5" />
            INTAKE GENERATED
          </span>
        </div>

        {/* Avatar */}
        <div className="w-28 h-28 rounded-2xl overflow-hidden mt-6 shadow-xl shadow-black/40 border-2 border-slate-700">
          <Avatar />
        </div>

        <div className="mt-3 text-center">
          <h3 className="text-base font-black text-white">{persona.name}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{persona.title}</p>
          <p className="text-xs font-bold text-slate-300">{persona.company}</p>
        </div>

        {/* Quick stats */}
        <div className="flex gap-3 mt-3">
          <div className="text-center">
            <p className="text-xs font-black text-orange-400">
              {persona.revenue}
            </p>
            <p className="text-[10px] text-slate-500">Revenue</p>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <p className="text-xs font-black text-blue-400">
              {persona.employees}
            </p>
            <p className="text-[10px] text-slate-500">Team</p>
          </div>
          <div className="w-px bg-slate-700" />
          <div className="text-center">
            <p className="text-xs font-black text-slate-300">{persona.age}</p>
            <p className="text-[10px] text-slate-500">Age</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        {(['pain', 'goals', 'intake'] as const).map((t) =>
        <button
          key={t}
          onClick={() => setTab(t)}
          className={`flex-1 py-2 text-xs font-bold transition-colors ${tab === t ? 'text-orange-400 border-b-2 border-orange-500' : 'text-slate-500 hover:text-slate-300'}`}>

            {t === 'pain' ?
          '⚠️ Pain' :
          t === 'goals' ?
          '🎯 Goals' :
          '📋 Intake'}
          </button>
        )}
      </div>

      {/* Tab content */}
      <div className="p-4 min-h-[140px]">
        <AnimatePresence mode="wait">
          {tab === 'pain' &&
          <motion.div
            key="pain"
            initial={{
              opacity: 0,
              y: 6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.15
            }}
            className="space-y-2">

              {persona.painPoints.map((p, i) =>
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-slate-400">

                  <AlertCircleIcon className="w-3 h-3 text-red-400 flex-shrink-0 mt-0.5" />
                  {p}
                </div>
            )}
            </motion.div>
          }
          {tab === 'goals' &&
          <motion.div
            key="goals"
            initial={{
              opacity: 0,
              y: 6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.15
            }}
            className="space-y-2">

              {persona.goals.map((g, i) =>
            <div
              key={i}
              className="flex items-start gap-2 text-xs text-slate-300">

                  <TargetIcon className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                  {g}
                </div>
            )}
            </motion.div>
          }
          {tab === 'intake' &&
          <motion.div
            key="intake"
            initial={{
              opacity: 0,
              y: 6
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.15
            }}
            className="space-y-1.5">

              {Object.entries(persona.intakeData).map(([key, val]) =>
            <div
              key={key}
              className="flex items-center justify-between text-xs">

                  <span className="text-slate-500">{key}</span>
                  <span className="text-orange-400 font-bold">{val}</span>
                </div>
            )}
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </motion.div>);

}
// ─── Main Screen ───────────────────────────────────────────────────────────────
export function ScreenPersonas() {
  const [tab, setTab] = useState<PersonaTab>('team');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryKey>('warehousing');
  const persona = clientPersonas[selectedIndustry];

  // Live persona data + live agent roster
  const { personas, updatePersona } = usePersonas();
  const { agents, loading: agentsLoading } = useAgents();

  // Build a quick persona lookup by agentId
  const personaById = Object.fromEntries(personas.map((p) => [p.agentId, p]));

  // Use live agents once loaded; show nothing while loading
  // AI Team tab shows only the core C-suite execs
  const CORE_EXEC_IDS = new Set([
    'agent.exec.ceo', 'agent.exec.cfo', 'agent.exec.coo',
    'agent.exec.cmo', 'agent.exec.cto', 'agent.advisor.legal',
    'agent.exec.chro', 'agent.exec.vpsales',
  ]);
  const liveAgents = agentsLoading
    ? []
    : agents.filter((a) => CORE_EXEC_IDS.has(a.agentId));


  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white">AI Personas</h2>
          <p className="text-sm text-slate-400">
            AI executive profiles · Voice, traits & LLM context prompts
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1.5 flex-shrink-0">
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-green-400 inline-block"
          />
          <span className="text-xs font-bold text-green-400">Video Ready</span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex bg-slate-800 rounded-xl p-1 gap-1">
        <button
          onClick={() => setTab('team')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'team' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <BrainIcon className="w-4 h-4" />
          AI Team
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{liveAgents.length || '…'}</span>
        </button>
        <button
          onClick={() => setTab('agents')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'agents' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <ZapIcon className="w-4 h-4" />
          AI Agents
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">12</span>
        </button>
        <button
          onClick={() => setTab('clients')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${tab === 'clients' ? 'bg-orange-500 text-white' : 'text-slate-400 hover:text-white'}`}
        >
          <UserIcon className="w-4 h-4" />
          Clients
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">6</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {/* ── AI Team Tab ── */}
        {tab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            {/* Info banner */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-start gap-3">
              <SparklesIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">AI Executive Persona Profiles</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Each exec has a <span className="text-orange-300 font-semibold">Voice Style</span>,{' '}
                  <span className="text-orange-300 font-semibold">Core Traits</span>, and{' '}
                  <span className="text-orange-300 font-semibold">Communication Attributes</span> that
                  compile into a <span className="text-orange-300 font-semibold">Persona Prompt</span> injected
                  into the LLM context for every board session decision. Click any card to edit.
                </p>
              </div>
            </div>

            {/* Exec cards — one per live agent, matches AI Team screen exactly */}
            {agentsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl h-64 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {liveAgents.map((agent, i) => (
                  <LiveExecCard
                    key={agent.agentId}
                    persona={personaById[agent.agentId] ?? null}
                    agentId={agent.agentId}
                    agentRole={agent.role}
                    agentName={agent.name}
                    agentStatus={agent.status}
                    index={i}
                    onUpdate={updatePersona}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ── AI Agents Tab ── */}
        {tab === 'agents' && (
          <motion.div
            key="agents"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-start gap-3">
              <ZapIcon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Specialized AI Worker Agents</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  12 aggressive, specialized agents deployed across Sales, Marketing, Support, and PR.
                  Each operates 24/7 with a distinct personality, voice style, and video persona.
                </p>
              </div>
            </div>
            {(['sales','marketing','support','pr'] as const).map((cat) => {
              const labels: Record<string, { label: string; emoji: string; desc: string; color: string }> = {
                sales:     { label: 'SALES AGENTS',     emoji: '🎯', desc: 'Cold outreach · Deal closing · Pipeline building', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
                marketing: { label: 'MARKETING AGENTS', emoji: '📣', desc: 'Demand gen · SEO · Growth hacking',                 color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' },
                support:   { label: 'SUPPORT AGENTS',   emoji: '🎧', desc: 'Customer success · Ticket resolution · Retention',  color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
                pr:        { label: 'PR AGENTS',         emoji: '📰', desc: 'Media relations · Crisis comms · Brand amplification', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
              };
              const m = labels[cat];
              return (
                <div key={cat}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-black px-3 py-1 rounded-full border ${m.color}`}>{m.emoji} {m.label}</span>
                    <span className="text-xs text-slate-500">{m.desc}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {agentPersonas.filter((a) => a.category === cat).map((agent, i) => (
                      <ExecutiveCard key={agent.id} exec={agent} index={i} />
                    ))}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* ── Clients Tab ── */}
        {tab === 'clients' && (
          <motion.div
            key="clients"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 flex items-start gap-3">
              <ZapIcon className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white">Intake-Generated Client Personas</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  AI builds a detailed client persona during the onboarding intake phase — including pain points,
                  goals, and business profile. Used to personalize AI executive communications.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {industryOptions.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.key}
                    onClick={() => setSelectedIndustry(opt.key)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-center transition-all ${selectedIndustry === opt.key ? `bg-gradient-to-br ${opt.color} border-transparent text-white` : 'bg-slate-900 border-slate-700/50 text-slate-400 hover:border-slate-600 hover:text-white'}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold leading-tight">{opt.label}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndustry}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="max-w-sm mx-auto"
              >
                <ClientPersonaCard persona={persona} />
              </motion.div>
            </AnimatePresence>
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl p-4">
              <p className="text-sm font-bold text-white mb-3">All Client Archetypes</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {industryOptions.map((opt) => {
                  const p = clientPersonas[opt.key];
                  const Icon = opt.icon;
                  const { Avatar } = p;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setSelectedIndustry(opt.key)}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${selectedIndustry === opt.key ? 'border-orange-500/40 bg-orange-500/10' : 'border-slate-800 hover:border-slate-700 bg-slate-800/30'}`}
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700">
                        <Avatar />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white truncate">{p.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{opt.label}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}