import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import {
  HeartIcon,
  ActivityIcon,
  ZapIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ShieldCheckIcon,
  WifiIcon,
  CpuIcon,
  ArrowRightIcon,
  CloudIcon,
  RadioIcon } from
'lucide-react';
const beacons = [
{
  id: 'faith',
  name: 'Faith Beacon',
  tagline: 'Spiritual wellness & community guidance',
  icon: HeartIcon,
  gradient: 'from-purple-500 to-purple-700',
  border: 'border-purple-500/30',
  glow: 'shadow-purple-500/20',
  ringColor: 'bg-purple-500/20',
  capabilities: [
  'Mindfulness routines',
  'Community scheduling',
  'Reflection journaling'],

  featured: false
},
{
  id: 'health',
  name: 'Health Beacon',
  tagline: 'Biometric monitoring & wellness AI',
  icon: ActivityIcon,
  gradient: 'from-green-500 to-green-700',
  border: 'border-green-500/30',
  glow: 'shadow-green-500/20',
  ringColor: 'bg-green-500/20',
  capabilities: [
  'Biometric sensing',
  'Health pattern analysis',
  'Wellness agent activation'],

  featured: false
},
{
  id: 'performance',
  name: 'Performance Beacon',
  tagline: 'Athletic & cognitive optimization',
  icon: ZapIcon,
  gradient: 'from-gold-400 to-gold-600',
  border: 'border-gold-500/30',
  glow: 'shadow-gold-500/20',
  ringColor: 'bg-gold-500/20',
  capabilities: [
  'Performance tracking',
  'Recovery optimization',
  'Focus state detection'],

  featured: false
},
{
  id: 'learning',
  name: 'Learning Beacon',
  tagline: 'Adaptive education & skill transfer',
  icon: BookOpenIcon,
  gradient: 'from-blue-500 to-blue-700',
  border: 'border-blue-500/30',
  glow: 'shadow-blue-500/20',
  ringColor: 'bg-blue-500/20',
  capabilities: [
  'Adaptive curriculum',
  'Skill gap detection',
  'Knowledge transfer packets'],

  featured: false
}];

const onDeviceItems = [
'Speech recognition',
'Intent detection',
'Behavioral modeling',
'Encrypted storage',
'Aroma delivery'];

const cloudItems = [
'Abstracted signals only',
'Agent orchestration',
'Global learning network',
'Blockchain verification',
'Quantum augmentation'];

export function GuideBeaconEcosystem() {
  return (
    <section id="beacons" className="w-full bg-slate-950 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            once: true,
            margin: '-100px'
          }}
          transition={{
            duration: 0.6
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
              delay: 0.2
            }}
            className="inline-flex items-center gap-2 bg-accent-500/20 border border-accent-500/40 rounded-full px-5 py-2 mb-6">

            <RadioIcon className="w-4 h-4 text-accent-400" />
            <span className="text-sm font-bold text-accent-300 uppercase tracking-wide">
              Guide Beacon Ecosystem
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Your Beacon Activates
            <br />
            <span className="text-gold-400">Your AI Workforce</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Physical edge AI devices that run CatapultOS locally. Scan, speak,
            sense — your agents activate instantly.
          </p>
        </motion.div>

        {/* Business Beacon — Featured */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.7,
            delay: 0.2
          }}
          className="mb-8">

          <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border-2 border-gold-500/50 rounded-3xl p-8 shadow-2xl shadow-gold-500/10 overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 to-accent-500/5 pointer-events-none" />
            <div className="absolute top-4 right-4">
              <span className="bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Featured
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Pulsing icon */}
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.4, 0, 0.4]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity
                      }}
                      className="absolute inset-0 bg-gold-500/30 rounded-2xl" />

                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 0.4
                      }}
                      className="absolute -inset-2 bg-gold-500/20 rounded-3xl" />

                    <div className="relative w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-700 rounded-2xl flex items-center justify-center shadow-glow-md">
                      <BriefcaseIcon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">
                      Catapult Business Beacon
                    </h3>
                    <p className="text-gold-400 font-medium">
                      The physical activation node for your AI management team
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                  'Voice-activated agents',
                  'Local AI processing',
                  'Aroma feedback engine',
                  'Biometric sensing',
                  'Offline operation'].
                  map((cap, i) =>
                  <motion.div
                    key={cap}
                    initial={{
                      opacity: 0,
                      x: -15
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: 0.3 + i * 0.08
                    }}
                    className="flex items-center gap-3">

                      <div className="w-5 h-5 bg-gold-500/20 border border-gold-500/40 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 bg-gold-400 rounded-full" />
                      </div>
                      <span className="text-slate-200 font-medium">{cap}</span>
                    </motion.div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {['Edge AI', 'Offline Capable', 'Blockchain Secured'].map(
                    (badge) =>
                    <span
                      key={badge}
                      className="text-xs font-semibold text-green-300 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">

                        ✓ {badge}
                      </span>

                  )}
                </div>

                <Button variant="primary" size="lg" className="shadow-glow-md">
                  Pre-Order Business Beacon
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </div>

              {/* Device visual */}
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Outer rings */}
                  {[1, 2, 3].map((i) =>
                  <motion.div
                    key={i}
                    animate={{
                      scale: [1, 1 + i * 0.15, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.6
                    }}
                    className="absolute inset-0 border border-gold-500/30 rounded-full" />

                  )}
                  <div className="absolute inset-8 bg-gradient-to-br from-accent-500/20 to-gold-500/20 border-2 border-gold-500/50 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <div className="w-24 h-24 bg-gradient-to-br from-accent-500 to-accent-700 rounded-full flex items-center justify-center shadow-glow-lg">
                      <BriefcaseIcon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  {/* Status dots */}
                  {[0, 72, 144, 216, 288].map((deg, i) =>
                  <motion.div
                    key={i}
                    animate={{
                      opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                    className="absolute w-3 h-3 bg-gold-400 rounded-full border-2 border-slate-950"
                    style={{
                      top: `${50 - 46 * Math.cos(deg * Math.PI / 180)}%`,
                      left: `${50 + 46 * Math.sin(deg * Math.PI / 180)}%`,
                      transform: 'translate(-50%, -50%)'
                    }} />

                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other 4 Beacons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {beacons.map((beacon, index) => {
            const Icon = beacon.icon;
            return (
              <motion.div
                key={beacon.id}
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
                  duration: 0.5,
                  delay: index * 0.1
                }}>

                <div
                  className={`bg-white/5 backdrop-blur-sm border ${beacon.border} rounded-2xl p-5 h-full`}>

                  <div className="relative mb-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                      className={`absolute inset-0 ${beacon.ringColor} rounded-xl`} />

                    <div
                      className={`relative w-14 h-14 bg-gradient-to-br ${beacon.gradient} rounded-xl flex items-center justify-center shadow-lg`}>

                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {beacon.name}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    {beacon.tagline}
                  </p>
                  <div className="space-y-2 mb-4">
                    {beacon.capabilities.map((cap) =>
                    <div
                      key={cap}
                      className="flex items-center gap-2 text-xs text-slate-300">

                        <div className="w-1 h-1 bg-slate-400 rounded-full flex-shrink-0" />
                        {cap}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {['Edge AI', 'Offline', 'Secured'].map((badge) =>
                    <span
                      key={badge}
                      className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">

                        {badge}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>);

          })}
        </div>

        {/* Edge vs Cloud Architecture */}
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
            duration: 0.6,
            delay: 0.3
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">

          <h3 className="text-xl font-bold text-white text-center mb-8">
            Edge + Cloud Architecture
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* On Device */}
            <div className="bg-accent-500/10 border border-accent-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CpuIcon className="w-5 h-5 text-accent-400" />
                <span className="font-bold text-white">On Device</span>
                <span className="text-xs text-accent-400 bg-accent-500/20 px-2 py-0.5 rounded-full ml-auto">
                  Private
                </span>
              </div>
              <div className="space-y-2">
                {onDeviceItems.map((item) =>
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-300">

                    <div className="w-1.5 h-1.5 bg-accent-400 rounded-full flex-shrink-0" />
                    {item}
                  </div>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                  Data Flow
                </p>
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      x: [0, 8, 0]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity
                    }}
                    className="text-gold-400">

                    <ArrowRightIcon className="w-6 h-6" />
                  </motion.div>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Abstracted signals only
                </p>
                <p className="text-xs text-green-400 mt-1">
                  ✓ Privacy preserved
                </p>
              </div>
            </div>

            {/* Cloud */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <CloudIcon className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white">Cloud Sync</span>
                <span className="text-xs text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full ml-auto">
                  Encrypted
                </span>
              </div>
              <div className="space-y-2">
                {cloudItems.map((item) =>
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-300">

                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full flex-shrink-0" />
                    {item}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

}