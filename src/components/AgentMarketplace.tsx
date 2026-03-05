import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  BriefcaseIcon,
  CodeIcon,
  DollarSignIcon,
  SettingsIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  UsersIcon,
  SmileIcon,
  ClipboardListIcon,
  PackageIcon,
  StarIcon,
  ZapIcon,
  CheckIcon,
  ArrowRightIcon,
  ActivityIcon,
  PlayIcon,
  PauseIcon } from
'lucide-react';
const agents = [
{
  id: 'ceo',
  role: 'CEO',
  name: 'Strategic Vision AI',
  tagline: 'Sets direction. Drives growth. Never sleeps.',
  icon: BriefcaseIcon,
  color: 'from-gold-400 to-gold-600',
  borderColor: 'border-gold-500/50',
  glowColor: 'shadow-glow-gold',
  tier: 'Executive',
  rating: 4.9,
  deployments: 2847,
  skills: [
  'Market analysis',
  'Strategic planning',
  'Competitive intelligence',
  'Board reporting'],

  currentTask: 'Analyzing Q3 growth opportunities...',
  roi: '$42K avg/month',
  badge: 'Most Deployed'
},
{
  id: 'cfo',
  role: 'CFO',
  name: 'Financial Strategy AI',
  tagline: 'Optimizes every dollar. Forecasts the future.',
  icon: DollarSignIcon,
  color: 'from-blue-400 to-blue-600',
  borderColor: 'border-blue-500/30',
  glowColor: '',
  tier: 'Executive',
  rating: 4.8,
  deployments: 2341,
  skills: [
  'Cash flow management',
  'Revenue forecasting',
  'Budget optimization',
  'Tax strategy'],

  currentTask: 'Updating Q4 cash flow model...',
  roi: '$28K avg/month',
  badge: null
},
{
  id: 'coo',
  role: 'COO',
  name: 'Operations Excellence AI',
  tagline: 'Streamlines everything. Eliminates waste.',
  icon: SettingsIcon,
  color: 'from-green-400 to-green-600',
  borderColor: 'border-green-500/30',
  glowColor: '',
  tier: 'Executive',
  rating: 4.9,
  deployments: 3102,
  skills: [
  'Process automation',
  'Schedule optimization',
  'Vendor management',
  'KPI tracking'],

  currentTask: 'Optimizing crew schedules for tomorrow...',
  roi: '$35K avg/month',
  badge: 'Top Rated'
},
{
  id: 'cto',
  role: 'CTO',
  name: 'Technology Leadership AI',
  tagline: 'Automates the automatable. Future-proofs your stack.',
  icon: CodeIcon,
  color: 'from-cyan-400 to-cyan-600',
  borderColor: 'border-cyan-500/30',
  glowColor: '',
  tier: 'Executive',
  rating: 4.7,
  deployments: 1892,
  skills: [
  'Tech stack evaluation',
  'Automation identification',
  'Security oversight',
  'Integration planning'],

  currentTask: 'Evaluating new automation tools...',
  roi: '$22K avg/month',
  badge: null
},
{
  id: 'cmo',
  role: 'CMO',
  name: 'Growth Marketing AI',
  tagline: 'Acquires customers. Maximizes LTV.',
  icon: TrendingUpIcon,
  color: 'from-pink-400 to-pink-600',
  borderColor: 'border-pink-500/30',
  glowColor: '',
  tier: 'Executive',
  rating: 4.8,
  deployments: 2156,
  skills: [
  'Campaign management',
  'SEO/SEM',
  'Email automation',
  'Customer segmentation'],

  currentTask: 'Launching spring campaign sequence...',
  roi: '$31K avg/month',
  badge: null
},
{
  id: 'compliance',
  role: 'Compliance',
  name: 'Risk & Regulatory AI',
  tagline: 'Keeps you protected. Monitors every risk.',
  icon: ShieldCheckIcon,
  color: 'from-red-400 to-red-600',
  borderColor: 'border-red-500/30',
  glowColor: '',
  tier: 'Specialist',
  rating: 4.9,
  deployments: 1247,
  skills: [
  'Regulatory monitoring',
  'Risk assessment',
  'Audit preparation',
  'Policy management'],

  currentTask: 'Reviewing new OSHA requirements...',
  roi: '$18K avg/month',
  badge: 'New'
}];

// ─── Waveform Bars (inline) ───────────────────────────────────────────────────
function AgentWaveform({ active }: {active: boolean;}) {
  const heights = [40, 70, 55, 85, 45, 75];
  return (
    <div className="flex items-center gap-0.5 h-5">
      {heights.map((h, i) =>
      <motion.div
        key={i}
        animate={
        active ?
        {
          scaleY: [0.3, h / 50, 0.3]
        } :
        {
          scaleY: 0.2
        }
        }
        transition={{
          duration: 0.8 + i * 0.1,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: i * 0.08
        }}
        style={{
          height: `${h}%`
        }}
        className="w-1 bg-orange-400 rounded-full origin-center" />

      )}
    </div>);

}
export function AgentMarketplace() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [hiredAgents, setHiredAgents] = useState<string[]>(['ceo', 'coo']);
  const [voicePlaying, setVoicePlaying] = useState(false);
  const voiceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    setVoicePlaying(false);
    if (voiceTimerRef.current) clearTimeout(voiceTimerRef.current);
  }, [selectedAgent.id]);
  useEffect(() => {
    return () => {
      if (voiceTimerRef.current) clearTimeout(voiceTimerRef.current);
    };
  }, []);
  const handleVoicePlay = () => {
    if (voicePlaying) {
      setVoicePlaying(false);
      if (voiceTimerRef.current) clearTimeout(voiceTimerRef.current);
      return;
    }
    setVoicePlaying(true);
    voiceTimerRef.current = setTimeout(() => setVoicePlaying(false), 3000);
  };
  const toggleHire = (agentId: string) => {
    setHiredAgents((prev) =>
    prev.includes(agentId) ?
    prev.filter((id) => id !== agentId) :
    [...prev, agentId]
    );
  };
  return (
    <section className="w-full bg-gradient-to-b from-slate-950 to-slate-900 py-20 lg:py-32">
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
            className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-5 py-2 mb-6">

            <ZapIcon className="w-4 h-4 text-gold-400" />
            <span className="text-sm font-bold text-gold-300 uppercase tracking-wide">
              Agent Marketplace
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
            Hire Your <span className="text-gold-400">AI Executives</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Resume-style profiles. Proven track records. Deploy any executive in
            under 2 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Agent List */}
          <div className="lg:col-span-2 space-y-3">
            {agents.map((agent, index) => {
              const Icon = agent.icon;
              const isHired = hiredAgents.includes(agent.id);
              const isSelected = selectedAgent.id === agent.id;
              return (
                <motion.div
                  key={agent.id}
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
                    duration: 0.5,
                    delay: index * 0.08
                  }}>

                  <motion.button
                    whileTap={{
                      scale: 0.98
                    }}
                    onClick={() => setSelectedAgent(agent)}
                    className={`w-full text-left transition-all duration-200 rounded-2xl border-2 p-4 ${isSelected ? `${agent.borderColor} bg-white/10` : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8'}`}>

                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-bold text-white">
                            {agent.role}
                          </span>
                          {agent.badge &&
                          <span className="text-xs font-semibold text-gold-400 bg-gold-500/20 px-2 py-0.5 rounded-full">
                              {agent.badge}
                            </span>
                          }
                          {isHired &&
                          <span className="text-xs font-semibold text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full">
                              Hired
                            </span>
                          }
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {agent.tagline}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gold-400 flex-shrink-0">
                        <StarIcon className="w-3 h-3 fill-current" />
                        <span>{agent.rating}</span>
                      </div>
                    </div>
                  </motion.button>
                </motion.div>);

            })}
          </div>

          {/* Agent Detail / Resume */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAgent.id}
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
                  y: -20
                }}
                transition={{
                  duration: 0.35
                }}>

                <div
                  className={`bg-white/5 backdrop-blur-xl border-2 ${selectedAgent.borderColor} rounded-3xl overflow-hidden ${selectedAgent.glowColor}`}>

                  {/* Resume Header */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${selectedAgent.color} rounded-2xl flex items-center justify-center shadow-lg`}>

                          <selectedAgent.icon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-2xl font-black text-white">
                              {selectedAgent.role}
                            </h3>
                            <span className="text-xs font-semibold text-slate-400 bg-white/10 px-2 py-1 rounded-full">
                              {selectedAgent.tier}
                            </span>
                          </div>
                          <p className="text-slate-300 font-medium">
                            {selectedAgent.name}
                          </p>
                          <p className="text-sm text-slate-400 italic mt-1">
                            "{selectedAgent.tagline}"
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <StarIcon className="w-4 h-4 text-gold-400 fill-current" />
                          <span className="text-xl font-bold text-white">
                            {selectedAgent.rating}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">Rating</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-white">
                          {selectedAgent.deployments.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-400">Deployments</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <p className="text-xl font-bold text-green-400">
                          {selectedAgent.roi}
                        </p>
                        <p className="text-xs text-slate-400">Avg ROI</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="p-6 border-b border-white/10">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Core Capabilities
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedAgent.skills.map((skill, i) =>
                      <motion.div
                        key={skill}
                        initial={{
                          opacity: 0,
                          x: -10
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          delay: i * 0.05
                        }}
                        className="flex items-center gap-2 text-sm text-slate-300">

                          <CheckIcon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                          {skill}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Live Activity */}
                  <div className="p-6 border-b border-white/10">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">
                      Live Activity
                    </h4>
                    <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                      <motion.div
                        animate={{
                          rotate: 360
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear'
                        }}>

                        <ActivityIcon className="w-5 h-5 text-gold-400" />
                      </motion.div>
                      <span className="text-sm text-slate-300">
                        {selectedAgent.currentTask}
                      </span>
                      <motion.div
                        animate={{
                          opacity: [1, 0.3, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                        className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0" />

                    </div>
                  </div>

                  {/* ElevenLabs Voice Preview */}
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        Voice Preview
                      </h4>
                      <div className="flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 rounded-full px-2.5 py-1">
                        <div className="w-3.5 h-3.5 bg-gradient-to-br from-orange-500 to-amber-500 rounded flex items-center justify-center">
                          <span
                            className="text-white font-black leading-none"
                            style={{
                              fontSize: '7px'
                            }}>

                            11
                          </span>
                        </div>
                        <span className="text-xs font-bold text-orange-400">
                          ElevenLabs
                        </span>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <button
                          onClick={handleVoicePlay}
                          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${voicePlaying ? 'bg-orange-500 shadow-lg shadow-orange-500/30' : 'bg-white/10 border border-white/20 hover:bg-orange-500/20 hover:border-orange-500/40'}`}
                          aria-label={
                          voicePlaying ?
                          'Stop' :
                          `Play ${selectedAgent.role} voice`
                          }>

                          {voicePlaying ?
                          <PauseIcon className="w-3.5 h-3.5 text-white" /> :

                          <PlayIcon className="w-3.5 h-3.5 text-white ml-0.5" />
                          }
                        </button>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-white">
                            Tap to hear {selectedAgent.role} speak
                          </p>
                          <p className="text-xs text-slate-500">
                            {selectedAgent.name} · Unique ElevenLabs voice
                          </p>
                        </div>
                        {voicePlaying && <AgentWaveform active={true} />}
                      </div>

                      <AnimatePresence>
                        {voicePlaying &&
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
                          className="text-xs text-slate-300 italic leading-relaxed border-t border-white/10 pt-3">

                            "{selectedAgent.currentTask}"
                          </motion.p>
                        }
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-6">
                    <Button
                      variant={
                      hiredAgents.includes(selectedAgent.id) ?
                      'outline' :
                      'primary'
                      }
                      size="lg"
                      onClick={() => toggleHire(selectedAgent.id)}
                      className={`w-full ${hiredAgents.includes(selectedAgent.id) ? 'border-red-500/40 text-red-400 hover:bg-red-500/10' : ''}`}>

                      {hiredAgents.includes(selectedAgent.id) ?
                      <>Remove from Team</> :

                      <>
                          <ZapIcon className="mr-2 w-5 h-5" />
                          Hire {selectedAgent.role} — Deploy Now
                        </>
                      }
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>);

}