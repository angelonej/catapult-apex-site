import React, { useState, Children } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import {
  ZapIcon,
  GlobeIcon,
  TrendingUpIcon,
  BarChart3Icon,
  ArrowRightIcon,
  ActivityIcon,
  RadioIcon } from
'lucide-react';
import { Logo } from '../components/ui/Logo';
import { PersonaInteractionModal } from '../components/PersonaInteractionModal';
const navigate = (hash: string) => {
  window.location.hash = hash;
};
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
const fadeUp = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
      delay
    }
  }
});
const fadeScale = (delay = 0) => ({
  hidden: {
    opacity: 0,
    scale: 0.85
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay
    }
  }
});
export function EntryPoint() {
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  return (
    <div
      className="fixed inset-0 bg-slate-950 text-white flex flex-col overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '64px 64px'
      }}>

      {/* Radial orange glow — behind the APEX text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 60% 40% at 50% 42%, rgba(249,115,22,0.07) 0%, transparent 70%)'
        }} />


      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center justify-center px-4 py-12 relative z-10">

        {/* Logo + brand */}
        <motion.div
          variants={fadeScale(0)}
          className="flex flex-col items-center mb-6">

          <Logo size="lg" animated={true} variant="light" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mt-3">
            Catapult Company
          </p>
        </motion.div>

        {/* APEX wordmark */}
        <motion.h1
          variants={fadeUp(0.15)}
          className="text-7xl sm:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none mb-3 select-none">

          APEX
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp(0.25)}
          className="text-slate-400 text-base sm:text-lg mb-10 tracking-wide">

          Your AI C-Suite. <span className="text-slate-500">Running 24/7.</span>
        </motion.p>

        {/* Destination cards */}
        <div className="w-full max-w-2xl space-y-3">
          {/* NEW PRIMARY — Talk to Aria */}
          <motion.button
            variants={fadeUp(0.3)}
            whileHover={{
              scale: 1.015,
              y: -2
            }}
            whileTap={{
              scale: 0.99
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            onClick={() => setShowPersonaModal(true)}
            className="w-full group bg-gradient-to-r from-amber-500/15 to-orange-500/10 border border-amber-500/40 hover:border-amber-500/70 hover:from-amber-500/20 hover:to-orange-500/15 rounded-2xl p-5 flex items-center gap-4 text-left transition-colors duration-200 min-h-[100px]">

            <div className="relative flex items-center gap-3 flex-shrink-0">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30">
                <span className="text-white font-black text-2xl">A</span>
              </div>
              {/* Mini waveform */}
              <div className="flex items-center gap-0.5 h-8">
                {[4, 7, 5, 8, 4, 7, 5, 6].map((h, i) =>
                <motion.div
                  key={i}
                  animate={{
                    scaleY: [0.3, h / 5, 0.3]
                  }}
                  transition={{
                    duration: 0.8 + i * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.08
                  }}
                  style={{
                    height: `${h * 3}px`
                  }}
                  className="w-1 bg-amber-400/70 rounded-full origin-center" />

                )}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-base font-black text-white">
                  Talk to Aria — AI CEO
                </span>
                <span className="flex items-center gap-1 bg-teal-500/20 border border-teal-500/30 rounded-full px-2 py-0.5">
                  <span className="text-[9px] font-black text-teal-400">
                    HG
                  </span>
                  <span className="text-slate-600 text-[9px]">×</span>
                  <span className="text-[9px] font-black text-orange-400">
                    11
                  </span>
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Scan QR → AI CEO greets you → Configures your team in 2 minutes
              </p>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-amber-400/60 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </motion.button>

          {/* PRIMARY — Launch APEX */}
          <motion.button
            variants={fadeUp(0.33)}
            whileHover={{
              scale: 1.015,
              y: -2
            }}
            whileTap={{
              scale: 0.99
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 25
            }}
            onClick={() => navigate('#/apex')}
            className="w-full group bg-orange-500/10 border border-orange-500/30 hover:border-orange-500/60 hover:bg-orange-500/15 rounded-2xl p-5 flex items-center gap-4 text-left transition-colors duration-200 min-h-[100px]">

            <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <ZapIcon className="w-6 h-6 text-orange-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-base font-black text-white">
                  Launch APEX Platform
                </span>
                <span className="flex items-center gap-1.5 bg-green-500/15 border border-green-500/30 rounded-full px-2 py-0.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                  </span>
                  <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                    Live
                  </span>
                </span>
              </div>
              <p className="text-sm text-slate-400">
                Your AI executive team · Voice · Beacons · Zello Bridge
              </p>
            </div>
            <ArrowRightIcon className="w-5 h-5 text-orange-400/60 group-hover:text-orange-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
          </motion.button>

          {/* Secondary cards row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Marketing Site */}
            <motion.button
              variants={fadeUp(0.41)}
              whileHover={{
                scale: 1.015,
                y: -2
              }}
              whileTap={{
                scale: 0.99
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              onClick={() => navigate('#/landing')}
              className="group bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-2xl p-4 flex flex-col gap-3 text-left transition-colors duration-200 min-h-[100px]">

              <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center">
                <GlobeIcon className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">
                  Marketing Site
                </p>
                <p className="text-xs text-slate-500 leading-snug">
                  Features & pricing
                </p>
              </div>
            </motion.button>

            {/* Agent Work Feed */}
            <motion.button
              variants={fadeUp(0.47)}
              whileHover={{
                scale: 1.015,
                y: -2
              }}
              whileTap={{
                scale: 0.99
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              onClick={() => navigate('#/feed')}
              className="group bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-2xl p-4 flex flex-col gap-3 text-left transition-colors duration-200 min-h-[100px]">

              <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center">
                <ActivityIcon className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">Work Feed</p>
                <p className="text-xs text-slate-500 leading-snug">
                  Live AI actions
                </p>
              </div>
            </motion.button>

            {/* Investor Deck */}
            <motion.button
              variants={fadeUp(0.53)}
              whileHover={{
                scale: 1.015,
                y: -2
              }}
              whileTap={{
                scale: 0.99
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              onClick={() => navigate('#/deck')}
              className="group bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-2xl p-4 flex flex-col gap-3 text-left transition-colors duration-200 min-h-[100px]">

              <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center">
                <TrendingUpIcon className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">
                  Investor Deck
                </p>
                <p className="text-xs text-slate-500 leading-snug">
                  Market & opportunity
                </p>
              </div>
            </motion.button>

            {/* Admin Dashboard */}
            <motion.button
              variants={fadeUp(0.59)}
              whileHover={{
                scale: 1.015,
                y: -2
              }}
              whileTap={{
                scale: 0.99
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 25
              }}
              onClick={() => navigate('#/dashboard')}
              className="group bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/8 rounded-2xl p-4 flex flex-col gap-3 text-left transition-colors duration-200 min-h-[100px]">

              <div className="w-9 h-9 bg-white/8 border border-white/10 rounded-lg flex items-center justify-center">
                <BarChart3Icon className="w-4 h-4 text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">
                  Admin Panel
                </p>
                <p className="text-xs text-slate-500 leading-snug">
                  Control & analytics
                </p>
              </div>
            </motion.button>
          </div>

          {/* Zello Bridge highlight */}
          <motion.div
            variants={fadeUp(0.65)}
            className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3">

            <div className="w-7 h-7 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <RadioIcon className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-emerald-400">
                Zello PTT Bridge — New
              </p>
              <p className="text-xs text-slate-500">
                Field voice → Guide Beacon → APEX Engine · Available in platform
              </p>
            </div>
            <button
              onClick={() => navigate('#/apex')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex-shrink-0">

              Explore →
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Persona Interaction Modal */}
      <AnimatePresence>
        {showPersonaModal &&
        <PersonaInteractionModal onClose={() => setShowPersonaModal(false)} />
        }
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.5,
          delay: 0.65
        }}
        className="relative z-10 flex items-center justify-center gap-4 pb-6 pt-2">

        <a
          href="https://www.catapultcompany.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors">

          catapultcompany.ai
        </a>
        <span className="text-slate-700 text-xs">·</span>
        <a
          href="mailto:partnerships@catapultcompany.ai"
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors">

          partnerships@catapultcompany.ai
        </a>
      </motion.footer>
    </div>);

}