import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import {
  QrCodeIcon,
  TreesIcon,
  ScaleIcon,
  CalculatorIcon,
  ThermometerIcon,
  HeartPulseIcon,
  FactoryIcon,
  UtensilsIcon,
  WrenchIcon,
  PlusIcon,
  CameraIcon,
  UploadIcon,
  BrainIcon,
  CheckCircleIcon,
  XIcon,
  ArrowRightIcon,
  ZapIcon,
  GripVerticalIcon,
  UserPlusIcon } from
'lucide-react';
interface OnboardingFlowProps {
  onClose: () => void;
}
const professions = [
{
  id: 'landscaper',
  label: 'Landscaper',
  icon: TreesIcon,
  color: 'from-green-500 to-green-600'
},
{
  id: 'attorney',
  label: 'Attorney',
  icon: ScaleIcon,
  color: 'from-purple-500 to-purple-600'
},
{
  id: 'accountant',
  label: 'Accountant',
  icon: CalculatorIcon,
  color: 'from-blue-500 to-blue-600'
},
{
  id: 'hvac',
  label: 'HVAC Contractor',
  icon: ThermometerIcon,
  color: 'from-orange-500 to-orange-600'
},
{
  id: 'medical',
  label: 'Medical Practice',
  icon: HeartPulseIcon,
  color: 'from-red-500 to-red-600'
},
{
  id: 'manufacturer',
  label: 'Manufacturer',
  icon: FactoryIcon,
  color: 'from-slate-500 to-slate-600'
},
{
  id: 'restaurant',
  label: 'Restaurant',
  icon: UtensilsIcon,
  color: 'from-warm-500 to-warm-600'
},
{
  id: 'autoshop',
  label: 'Auto Shop',
  icon: WrenchIcon,
  color: 'from-cyan-500 to-cyan-600'
},
{
  id: 'other',
  label: 'Other',
  icon: PlusIcon,
  color: 'from-gray-500 to-gray-600'
}];

const availableAgents = [
{
  id: 'ceo',
  role: 'CEO',
  desc: 'Strategic vision & decisions',
  color: 'from-gold-400 to-gold-600'
},
{
  id: 'cfo',
  role: 'CFO',
  desc: 'Financial strategy & planning',
  color: 'from-blue-400 to-blue-600'
},
{
  id: 'coo',
  role: 'COO',
  desc: 'Operations & efficiency',
  color: 'from-green-400 to-green-600'
},
{
  id: 'cto',
  role: 'CTO',
  desc: 'Technology & automation',
  color: 'from-cyan-400 to-cyan-600'
},
{
  id: 'cmo',
  role: 'CMO',
  desc: 'Marketing & growth',
  color: 'from-pink-400 to-pink-600'
},
{
  id: 'cxo',
  role: 'CXO',
  desc: 'Customer experience',
  color: 'from-purple-400 to-purple-600'
},
{
  id: 'chro',
  role: 'CHRO',
  desc: 'People & culture',
  color: 'from-indigo-400 to-indigo-600'
},
{
  id: 'compliance',
  role: 'Compliance',
  desc: 'Risk & regulatory',
  color: 'from-red-400 to-red-600'
},
{
  id: 'growth',
  role: 'Growth',
  desc: 'Revenue acceleration',
  color: 'from-emerald-400 to-emerald-600'
},
{
  id: 'pm',
  role: 'PM',
  desc: 'Project delivery',
  color: 'from-orange-400 to-orange-600'
}];

const TOTAL_STEPS = 6;
export function OnboardingFlow({ onClose }: {onClose: () => void;}) {
  const [step, setStep] = useState(1);
  const [selectedProfession, setSelectedProfession] = useState<string | null>(
    null
  );
  const [captureState, setCaptureState] = useState<
    'idle' | 'analyzing' | 'detected'>(
    'idle');
  const [avatarsReady, setAvatarsReady] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState(0);
  const [hiredAgents, setHiredAgents] = useState<string[]>([]);
  const profession = professions.find((p) => p.id === selectedProfession);
  const handleCapture = () => {
    setCaptureState('analyzing');
    setTimeout(() => setCaptureState('detected'), 2500);
  };
  const handleGenerateAvatars = () => {
    setStep(5);
    let progress = 0;
    const timer = setInterval(() => {
      progress += 2;
      setAvatarProgress(progress);
      if (progress >= 100) {
        clearInterval(timer);
        setAvatarsReady(true);
      }
    }, 60);
  };
  const toggleHireAgent = (agentId: string) => {
    setHiredAgents((prev) =>
    prev.includes(agentId) ?
    prev.filter((id) => id !== agentId) :
    [...prev, agentId]
    );
  };
  const stepLabels = [
  'Entry',
  'Profession',
  'Workplace',
  'Detection',
  'Avatars',
  'Hire Team'];

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">

      <motion.div
        initial={{
          scale: 0.9,
          y: 40
        }}
        animate={{
          scale: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          y: 40
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        className="relative w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10 flex-shrink-0">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">
              Catapult Company
            </p>
            <h2 className="text-xl font-bold text-white">
              {stepLabels[step - 1]}
            </h2>
          </div>
          {/* Step dots */}
          <div className="flex items-center gap-2">
            {Array.from({
              length: TOTAL_STEPS
            }).map((_, i) =>
            <motion.div
              key={i}
              animate={{
                width: i + 1 === step ? 24 : 8,
                backgroundColor:
                i + 1 < step ?
                '#E63946' :
                i + 1 === step ?
                '#F59E0B' :
                'rgba(255,255,255,0.2)'
              }}
              transition={{
                duration: 0.3
              }}
              className="h-2 rounded-full" />

            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white">

            <XIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {/* STEP 1: QR Entry */}
            {step === 1 &&
            <motion.div
              key="step1"
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.3
              }}
              className="p-6 text-center">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Start Your AI Team
                </h3>
                <p className="text-slate-400 mb-8">
                  Scan on mobile or start here
                </p>

                {/* QR Code */}
                <div className="relative w-56 h-56 mx-auto mb-8 bg-white rounded-2xl p-4 overflow-hidden">
                  <QrCodeIcon className="w-full h-full text-slate-900" />
                  {/* Animated scan line */}
                  <motion.div
                  animate={{
                    y: [0, 192, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute left-0 right-0 h-0.5 bg-accent-500 shadow-glow-sm opacity-80" />

                </div>

                <p className="text-sm text-slate-400 mb-6">
                  catapult.company/start
                </p>
                <Button
                variant="primary"
                size="lg"
                onClick={() => setStep(2)}
                className="w-full">

                  Or Start Here
                  <ArrowRightIcon className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            }

            {/* STEP 2: Profession */}
            {step === 2 &&
            <motion.div
              key="step2"
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.3
              }}
              className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  What do you do?
                </h3>
                <p className="text-slate-400 mb-6">
                  Select your profession to load your industry frame
                </p>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {professions.map((prof) => {
                  const Icon = prof.icon;
                  const isSelected = selectedProfession === prof.id;
                  return (
                    <motion.button
                      key={prof.id}
                      whileTap={{
                        scale: 0.95
                      }}
                      onClick={() => setSelectedProfession(prof.id)}
                      className={`relative p-4 rounded-2xl border-2 transition-all duration-200 text-center ${isSelected ? 'border-gold-500 bg-gold-500/20' : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'}`}>

                        {isSelected &&
                      <motion.div
                        initial={{
                          scale: 0
                        }}
                        animate={{
                          scale: 1
                        }}
                        className="absolute top-2 right-2 w-5 h-5 bg-gold-500 rounded-full flex items-center justify-center">

                            <CheckCircleIcon className="w-3 h-3 text-slate-900" />
                          </motion.div>
                      }
                        <div
                        className={`w-10 h-10 bg-gradient-to-br ${prof.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>

                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="text-xs font-semibold text-white leading-tight">
                          {prof.label}
                        </p>
                      </motion.button>);

                })}
                </div>

                <AnimatePresence>
                  {selectedProfession &&
                <motion.div
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
                    y: 10
                  }}>

                      <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setStep(3)}
                    className="w-full">

                        Continue with {profession?.label}
                        <ArrowRightIcon className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                }
                </AnimatePresence>
              </motion.div>
            }

            {/* STEP 3: Workplace Capture */}
            {step === 3 &&
            <motion.div
              key="step3"
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.3
              }}
              className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Show us your workplace
                </h3>
                <p className="text-slate-400 mb-6">
                  We'll auto-detect your industry and configure your team
                </p>

                {captureState === 'idle' &&
              <>
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center mb-6 bg-white/5">
                      <CameraIcon className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-300 font-medium mb-2">
                        Capture your workspace
                      </p>
                      <p className="text-sm text-slate-500">
                        Truck, office, shop floor, or clinic
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <Button
                    variant="primary"
                    size="md"
                    onClick={handleCapture}
                    className="w-full">

                        <CameraIcon className="mr-2 w-4 h-4" />
                        Take Photo
                      </Button>
                      <Button
                    variant="outline"
                    size="md"
                    onClick={handleCapture}
                    className="w-full border-white/20 text-white hover:bg-white/10">

                        <UploadIcon className="mr-2 w-4 h-4" />
                        Upload Image
                      </Button>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-slate-500 text-sm">
                          Or describe it:
                        </span>
                      </div>
                      <input
                    type="text"
                    placeholder="e.g. landscaping truck with equipment..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-32 pr-4 text-white placeholder-slate-500 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/30"
                    onKeyDown={(e) => e.key === 'Enter' && handleCapture()} />

                    </div>
                  </>
              }

                {captureState === 'analyzing' &&
              <motion.div
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                className="text-center py-12">

                    <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="w-16 h-16 mx-auto mb-6">

                      <BrainIcon className="w-16 h-16 text-gold-400" />
                    </motion.div>
                    <p className="text-xl font-bold text-white mb-2">
                      AI Analyzing...
                    </p>
                    <p className="text-slate-400">
                      Detecting industry, team size, and key challenges
                    </p>
                    <div className="mt-6 w-48 mx-auto bg-white/10 rounded-full h-2">
                      <motion.div
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: '100%'
                    }}
                    transition={{
                      duration: 2.5,
                      ease: 'easeInOut'
                    }}
                    className="h-2 bg-gradient-to-r from-accent-500 to-gold-500 rounded-full" />

                    </div>
                  </motion.div>
              }

                {captureState === 'detected' &&
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                className="text-center">

                    <motion.div
                  initial={{
                    scale: 0
                  }}
                  animate={{
                    scale: 1
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20
                  }}
                  className="w-16 h-16 bg-green-500/20 border-2 border-green-500/50 rounded-full flex items-center justify-center mx-auto mb-4">

                      <CheckCircleIcon className="w-8 h-8 text-green-400" />
                    </motion.div>
                    <p className="text-lg font-bold text-white mb-1">
                      Industry Detected!
                    </p>
                    <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 rounded-full px-4 py-2 mb-6">
                      <span className="text-gold-300 font-semibold">
                        {profession?.label || 'Landscaping'}
                      </span>
                      <span className="text-slate-400 text-sm">
                        • 94% confidence
                      </span>
                    </div>
                    <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(4)}
                  className="w-full">

                      Continue
                      <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
              }
              </motion.div>
            }

            {/* STEP 4: Detection Result */}
            {step === 4 &&
            <motion.div
              key="step4"
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.3
              }}
              className="p-6">

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
                  delay: 0.1
                }}>

                  <h3 className="text-2xl font-bold text-white mb-2">
                    We detected:
                  </h3>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-black text-gold-400">
                      {profession?.label || 'Landscaping'}
                    </span>
                    <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full border border-green-500/30">
                      94% match
                    </span>
                  </div>
                </motion.div>

                <div className="space-y-3 mb-6">
                  {[
                {
                  label: 'Business Type',
                  value: 'Field Service Operations',
                  icon: '🏢'
                },
                {
                  label: 'Likely Team Size',
                  value: '5–25 employees',
                  icon: '👥'
                },
                {
                  label: 'Key Challenge',
                  value: 'Scheduling & customer retention',
                  icon: '⚡'
                },
                {
                  label: 'Recommended Team',
                  value: 'CEO, COO, CMO, CFO',
                  icon: '🤖'
                }].
                map((item, i) =>
                <motion.div
                  key={item.label}
                  initial={{
                    opacity: 0,
                    x: -20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.2 + i * 0.1
                  }}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">

                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wide">
                          {item.label}
                        </p>
                        <p className="font-semibold text-white">{item.value}</p>
                      </div>
                    </motion.div>
                )}
                </div>

                <Button
                variant="primary"
                size="lg"
                onClick={handleGenerateAvatars}
                className="w-full">

                  <ZapIcon className="mr-2 w-5 h-5" />
                  Confirm & Build My Team
                </Button>
              </motion.div>
            }

            {/* STEP 5: Avatar Generation */}
            {step === 5 &&
            <motion.div
              key="step5"
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.3
              }}
              className="p-6">

                <h3 className="text-2xl font-bold text-white mb-2">
                  Building your AI executive team...
                </h3>
                <p className="text-slate-400 mb-6">
                  Generating personalized profiles for your industry
                </p>

                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">
                      Generating profiles
                    </span>
                    <span className="text-sm font-bold text-gold-400">
                      {avatarProgress}%
                    </span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                    style={{
                      width: `${avatarProgress}%`
                    }}
                    className="h-3 bg-gradient-to-r from-accent-500 to-gold-500 rounded-full transition-all duration-100" />

                  </div>
                </div>

                {/* Agent cards animating in */}
                <div className="space-y-3">
                  {[
                {
                  role: 'CEO',
                  name: 'Strategic Vision AI',
                  color: 'from-gold-400 to-gold-600',
                  skills: [
                  'Market analysis',
                  'Strategic planning',
                  'Growth initiatives'],

                  delay: 0.3
                },
                {
                  role: 'COO',
                  name: 'Operations Excellence AI',
                  color: 'from-green-400 to-green-600',
                  skills: [
                  'Schedule optimization',
                  'Process automation',
                  'Cost reduction'],

                  delay: 0.8
                },
                {
                  role: 'CFO',
                  name: 'Financial Strategy AI',
                  color: 'from-blue-400 to-blue-600',
                  skills: [
                  'Cash flow management',
                  'Revenue forecasting',
                  'Budget optimization'],

                  delay: 1.3
                }].
                map((agent) =>
                <motion.div
                  key={agent.role}
                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.95
                  }}
                  animate={{
                    opacity: avatarProgress > 20 ? 1 : 0,
                    y: avatarProgress > 20 ? 0 : 20,
                    scale: avatarProgress > 20 ? 1 : 0.95
                  }}
                  transition={{
                    delay: agent.delay,
                    duration: 0.5
                  }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4">

                      <div className="flex items-center gap-3 mb-3">
                        <div
                      className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center flex-shrink-0`}>

                          <span className="text-white font-black text-lg">
                            {agent.role[0]}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">
                              {agent.role}
                            </span>
                            {avatarProgress >= 100 ?
                        <CheckCircleIcon className="w-4 h-4 text-green-400" /> :

                        <motion.div
                          animate={{
                            rotate: 360
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                          }}>

                                <BrainIcon className="w-4 h-4 text-gold-400" />
                              </motion.div>
                        }
                          </div>
                          <p className="text-xs text-slate-400">{agent.name}</p>
                        </div>
                      </div>
                      {avatarProgress >= 100 &&
                  <motion.div
                    initial={{
                      opacity: 0
                    }}
                    animate={{
                      opacity: 1
                    }}
                    className="space-y-1">

                          {agent.skills.map((skill, i) =>
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-slate-300">

                              <div className="w-1 h-1 bg-gold-400 rounded-full" />
                              {skill}
                            </div>
                    )}
                        </motion.div>
                  }
                    </motion.div>
                )}
                </div>

                {avatarsReady &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="mt-6">

                    <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setStep(6)}
                  className="w-full">

                      Meet Your Team
                      <ArrowRightIcon className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
              }
              </motion.div>
            }

            {/* STEP 6: Drag-Drop Hiring Board */}
            {step === 6 &&
            <motion.div
              key="step6"
              initial={{
                opacity: 0,
                x: 30
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0,
                x: -30
              }}
              transition={{
                duration: 0.3
              }}
              className="p-6">

                <h3 className="text-2xl font-bold text-white mb-1">
                  Hire your management team
                </h3>
                <p className="text-slate-400 mb-4">
                  Click agents to add them to your team
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Available Agents */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                      Available Agents
                    </p>
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {availableAgents.
                    filter((a) => !hiredAgents.includes(a.id)).
                    map((agent, i) =>
                    <motion.button
                      key={agent.id}
                      initial={{
                        opacity: 0,
                        x: -10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      exit={{
                        opacity: 0,
                        x: -10
                      }}
                      transition={{
                        delay: i * 0.05
                      }}
                      onClick={() => toggleHireAgent(agent.id)}
                      className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-2.5 hover:border-gold-500/40 hover:bg-gold-500/10 transition-all group text-left">

                            <GripVerticalIcon className="w-3 h-3 text-slate-500 group-hover:text-gold-400 flex-shrink-0" />
                            <div
                        className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>

                              <span className="text-white font-bold text-xs">
                                {agent.role.slice(0, 2)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-white">
                                {agent.role}
                              </p>
                              <p className="text-xs text-slate-400 truncate">
                                {agent.desc}
                              </p>
                            </div>
                            <UserPlusIcon className="w-3 h-3 text-slate-500 group-hover:text-gold-400 flex-shrink-0" />
                          </motion.button>
                    )}
                    </div>
                  </div>

                  {/* Your Team (drop zone) */}
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
                      Your Team
                    </p>
                    <div
                    className={`min-h-72 rounded-xl border-2 border-dashed transition-all duration-200 p-2 space-y-2 ${hiredAgents.length > 0 ? 'border-gold-500/40 bg-gold-500/5' : 'border-white/10 bg-white/5'}`}>

                      {hiredAgents.length === 0 &&
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center">
                          <UserPlusIcon className="w-8 h-8 text-slate-600 mb-2" />
                          <p className="text-xs text-slate-500">
                            Click agents to hire them
                          </p>
                        </div>
                    }
                      <AnimatePresence>
                        {hiredAgents.map((agentId) => {
                        const agent = availableAgents.find(
                          (a) => a.id === agentId
                        )!;
                        return (
                          <motion.button
                            key={agentId}
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                              y: -10
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: 0
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.8
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400,
                              damping: 25
                            }}
                            onClick={() => toggleHireAgent(agentId)}
                            className="w-full flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 rounded-xl p-2.5 hover:bg-red-500/10 hover:border-red-500/30 transition-all group text-left">

                              <div
                              className={`w-8 h-8 bg-gradient-to-br ${agent.color} rounded-lg flex items-center justify-center flex-shrink-0`}>

                                <span className="text-white font-bold text-xs">
                                  {agent.role.slice(0, 2)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-bold text-white">
                                  {agent.role}
                                </p>
                                <p className="text-xs text-gold-400">Hired ✓</p>
                              </div>
                              <XIcon className="w-3 h-3 text-slate-500 group-hover:text-red-400 flex-shrink-0" />
                            </motion.button>);

                      })}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Deployment info */}
                {hiredAgents.length >= 2 &&
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-4 flex items-center justify-between">

                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-300 font-medium">
                        {hiredAgents.length} agents ready
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      ~{Math.max(1, 5 - hiredAgents.length)} min remaining
                    </span>
                  </motion.div>
              }

                <Button
                variant="primary"
                size="lg"
                onClick={onClose}
                disabled={hiredAgents.length < 2}
                className="w-full disabled:opacity-40">

                  <ZapIcon className="mr-2 w-5 h-5" />
                  Deploy Team — {hiredAgents.length} Agents
                </Button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>);

}