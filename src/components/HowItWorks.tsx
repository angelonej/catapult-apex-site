import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import {
  LinkIcon,
  UploadIcon,
  ShieldCheckIcon,
  UsersIcon,
  VideoIcon,
  BrainIcon,
  SparklesIcon } from
'lucide-react';
const steps = [
{
  icon: LinkIcon,
  title: 'Connect Your Data',
  description:
  'Share links to your tools, upload documents, or connect APIs. Your AI team learns from your existing knowledge base, processes, and data.',
  inputs: [
  'Website URLs',
  'Google Drive',
  'Notion',
  'Confluence',
  'PDFs & Docs'],

  duration: '< 2 minutes'
},
{
  icon: ShieldCheckIcon,
  title: 'Set Permissions',
  description:
  'Configure granular access controls. Decide what each AI executive can see, modify, and report on. Enterprise-grade security built-in.',
  inputs: [
  'Role-based access',
  'Data permissions',
  'Action limits',
  'Audit logs'],

  duration: '3-5 minutes'
},
{
  icon: UsersIcon,
  title: 'Customize Your Team',
  description:
  'Choose AI executives, add SME expert training, enable video personas. Build the perfect leadership team for your business.',
  inputs: [
  'AI Executives',
  'SME Training',
  'Video Personas',
  'Voice Cloning'],

  duration: '5-10 minutes'
},
{
  icon: SparklesIcon,
  title: 'Deploy & Scale',
  description:
  'Your AI team starts working immediately. Track performance, adjust compensation, and scale as needed. AGI-ready architecture for the future.',
  inputs: [
  'Real-time metrics',
  'Performance tracking',
  'Auto-scaling',
  'AGI-ready'],

  duration: 'Ongoing'
}];

const teamCustomization = [
{
  icon: BrainIcon,
  title: 'AI Mode',
  description:
  'Pure AI intelligence trained on your data and industry best practices.',
  badge: 'Available Now',
  color: 'from-blue-500 to-blue-600'
},
{
  icon: UsersIcon,
  title: 'SME Expert Mode',
  description:
  'AI enhanced with subject matter expert knowledge and domain expertise.',
  badge: 'Available Now',
  color: 'from-purple-500 to-purple-600'
},
{
  icon: VideoIcon,
  title: 'Video Persona Mode',
  description:
  'AI with realistic video avatar and voice for presentations and meetings.',
  badge: 'Growth & Enterprise',
  color: 'from-accent-500 to-accent-600'
},
{
  icon: SparklesIcon,
  title: 'AGI Mode',
  description:
  'Future-ready architecture that will seamlessly upgrade to AGI capabilities.',
  badge: 'Coming Soon',
  color: 'from-warm-500 to-warm-600'
}];

export function HowItWorks() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-primary-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-flex items-center gap-2 bg-electric-50 border border-electric-200 rounded-full px-4 py-2 mb-6">

            <SparklesIcon className="w-4 h-4 text-electric-600" />
            <span className="text-sm font-bold text-electric-700">
              Simple Onboarding
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Build Your AI Team in Minutes
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Connect your data, set permissions, customize your team. Deploy
            instantly and reduce your time in the business by 70%.
          </p>
        </motion.div>

        {/* Onboarding Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 30
                }}
                whileInView={{
                  opacity: 1,
                  y: 0
                }}
                viewport={{
                  once: true,
                  margin: '-50px'
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}>

                <motion.div
                  whileHover={{
                    y: -8
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}>

                  <Card className="h-full text-center border border-primary-100 hover:border-accent-200 hover:shadow-depth-lg transition-all duration-300">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-accent-100 to-accent-200 rounded-xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-accent-600" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-primary-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-primary-600 mb-4 leading-relaxed text-sm">
                      {step.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {step.inputs.map((input, i) =>
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs text-primary-600 justify-center">

                          <div className="w-1 h-1 bg-accent-500 rounded-full" />
                          <span>{input}</span>
                        </div>
                      )}
                    </div>

                    <div className="inline-flex items-center gap-2 bg-accent-50 text-accent-700 px-3 py-1 rounded-full text-sm font-medium border border-accent-200">
                      <span className="w-2 h-2 bg-accent-500 rounded-full" />
                      {step.duration}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>);

          })}
        </div>

        {/* Team Customization Options */}
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
            delay: 0.4
          }}
          className="mb-12">

          <h3 className="text-2xl font-bold text-primary-900 text-center mb-4">
            Customize Your AI Team
          </h3>
          <p className="text-lg text-primary-600 text-center max-w-3xl mx-auto mb-12">
            Choose how your AI executives operate. From pure AI to SME-enhanced
            to video personas—and future AGI capabilities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamCustomization.map((mode, index) => {
              const Icon = mode.icon;
              return (
                <motion.div
                  key={index}
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
                    delay: index * 0.1
                  }}>

                  <motion.div
                    whileHover={{
                      y: -8
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }}>

                    <Card className="h-full border border-primary-100 hover:border-accent-200 hover:shadow-depth-lg transition-all duration-300">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${mode.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}>

                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="mb-3">
                        <h4 className="text-lg font-bold text-primary-900 mb-1">
                          {mode.title}
                        </h4>
                        <span className="text-xs font-semibold text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
                          {mode.badge}
                        </span>
                      </div>
                      <p className="text-sm text-primary-600 leading-relaxed">
                        {mode.description}
                      </p>
                    </Card>
                  </motion.div>
                </motion.div>);

            })}
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          whileInView={{
            opacity: 1,
            scale: 1
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: 0.6,
            duration: 0.6
          }}>

          <Card className="bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-200 shadow-depth-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                Reduce Your Time in the Business by 70%
              </h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed">
                Catapult Company builds your custom AI management team based on
                your inputs. Work ON your business, not IN it. Your AI team
                handles operations, strategy, and execution 24/7.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    70%
                  </div>
                  <div className="text-sm text-primary-600">
                    Less Time in Business
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-primary-600">
                    AI Team Working
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    10min
                  </div>
                  <div className="text-sm text-primary-600">Setup Time</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}