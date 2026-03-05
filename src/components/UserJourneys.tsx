import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { CheckCircle2Icon, BuildingIcon, Building2Icon } from 'lucide-react';
const journeys = {
  smb: {
    title: 'Small & Medium Businesses',
    icon: BuildingIcon,
    challenges: [
    'Limited resources for data analysis',
    'Manual processes eating up time',
    'Difficulty scaling operations',
    'Lack of predictive insights'],

    solutions: [
    'Quick-deploy AI agents with pre-built templates',
    'Automated workflow optimization',
    'Self-serve onboarding in under 10 minutes',
    'Real-time dashboards with actionable insights'],

    outcomes: [
    'Save 15+ hours per week on manual tasks',
    'Reduce operational costs by 30-40%',
    'Scale efficiently without hiring overhead',
    'Make data-driven decisions daily']

  },
  midmarket: {
    title: 'Mid-Market Enterprises',
    icon: Building2Icon,
    challenges: [
    'Complex cross-department workflows',
    'Siloed data across multiple systems',
    'Need for advanced predictive analytics',
    'Scaling challenges with growing teams'],

    solutions: [
    'Enterprise-grade AI agents with custom integrations',
    'Advanced decision intelligence across departments',
    'Multi-team collaboration features',
    'Predictive modeling and scenario planning'],

    outcomes: [
    'Unify operations across 10+ departments',
    'Increase revenue by 2-3x with AI insights',
    'Reduce decision-making time by 70%',
    'Scale to 500+ employees seamlessly']

  }
};
export function UserJourneys() {
  const [activeTab, setActiveTab] = useState<'smb' | 'midmarket'>('smb');
  const journey = journeys[activeTab];
  const Icon = journey.icon;
  return (
    <section className="w-full bg-white py-20 lg:py-32">
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
          className="text-center mb-12">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Built for Your Business Journey
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Whether you're a growing SMB or an established mid-market firm, our
            AI agents adapt to your unique needs and scale with you.
          </p>
        </motion.div>

        {/* Enhanced Tab Navigation with smooth indicator */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-primary-100 rounded-xl p-1.5 relative shadow-inner">
            <motion.div
              className="absolute top-1.5 bottom-1.5 bg-white rounded-lg shadow-md"
              initial={false}
              animate={{
                left: activeTab === 'smb' ? '6px' : '50%',
                right: activeTab === 'smb' ? '50%' : '6px'
              }}
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30
              }} />

            <button
              onClick={() => setActiveTab('smb')}
              className={`relative z-10 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${activeTab === 'smb' ? 'text-primary-900' : 'text-primary-600 hover:text-primary-900'}`}>

              Small & Medium Business
            </button>
            <button
              onClick={() => setActiveTab('midmarket')}
              className={`relative z-10 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${activeTab === 'midmarket' ? 'text-primary-900' : 'text-primary-600 hover:text-primary-900'}`}>

              Mid-Market Enterprise
            </button>
          </div>
        </div>

        {/* Journey Content with enhanced animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
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
              duration: 0.4,
              ease: 'easeInOut'
            }}>

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: 0.1,
                duration: 0.3
              }}
              className="mb-8 flex items-center justify-center gap-3">

              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center">
                <Icon className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-2xl font-bold text-primary-900">
                {journey.title}
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Challenges */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.4
                }}>

                <Card className="h-full border border-red-100 bg-gradient-to-br from-white to-red-50/30">
                  <h4 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    Key Challenges
                  </h4>
                  <ul className="space-y-3">
                    {journey.challenges.map((challenge, index) =>
                    <motion.li
                      key={index}
                      initial={{
                        opacity: 0,
                        x: -10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.3 + index * 0.1,
                        duration: 0.3
                      }}
                      className="flex items-start gap-2 text-primary-700">

                        <span className="text-red-500 mt-1">•</span>
                        <span>{challenge}</span>
                      </motion.li>
                    )}
                  </ul>
                </Card>
              </motion.div>

              {/* Solutions */}
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
                  delay: 0.3,
                  duration: 0.4
                }}>

                <Card className="h-full border-2 border-accent-200 bg-gradient-to-br from-white to-accent-50/30 shadow-lg">
                  <h4 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-500 rounded-full" />
                    AI Solutions
                  </h4>
                  <ul className="space-y-3">
                    {journey.solutions.map((solution, index) =>
                    <motion.li
                      key={index}
                      initial={{
                        opacity: 0,
                        scale: 0.9
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1
                      }}
                      transition={{
                        delay: 0.4 + index * 0.1,
                        duration: 0.3
                      }}
                      className="flex items-start gap-2 text-primary-700">

                        <CheckCircle2Icon className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                        <span>{solution}</span>
                      </motion.li>
                    )}
                  </ul>
                </Card>
              </motion.div>

              {/* Outcomes */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: 20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: 0.4,
                  duration: 0.4
                }}>

                <Card className="h-full bg-gradient-to-br from-accent-50 to-accent-100/50 border border-accent-200">
                  <h4 className="text-lg font-bold text-primary-900 mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent-600 rounded-full" />
                    Expected Outcomes
                  </h4>
                  <ul className="space-y-3">
                    {journey.outcomes.map((outcome, index) =>
                    <motion.li
                      key={index}
                      initial={{
                        opacity: 0,
                        x: 10
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.3
                      }}
                      className="flex items-start gap-2 text-primary-700">

                        <CheckCircle2Icon className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium">{outcome}</span>
                      </motion.li>
                    )}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

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
            delay: 0.4,
            duration: 0.6
          }}
          className="mt-12 text-center">

          <p className="text-lg text-primary-700 font-medium">
            Both paths are 100% self-serve. No consulting required. Start in
            minutes.
          </p>
        </motion.div>
      </div>
    </section>);

}