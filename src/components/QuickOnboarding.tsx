import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { QrCodeIcon, BriefcaseIcon, ClockIcon, ZapIcon } from 'lucide-react';
export function QuickOnboarding() {
  return (
    <section className="w-full bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
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
            className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-full px-4 py-2 mb-6">

            <ClockIcon className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-bold text-accent-700">
              Buy Time Back
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Get Started in Under 2 Minutes
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Whether you're on a job site or in a boardroom, onboarding is
            instant. Scan a QR code or click a link—your AI team is ready.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tradesperson / Field Worker Path */}
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
              duration: 0.6,
              delay: 0.2
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

              <Card className="h-full border-2 border-accent-200 bg-gradient-to-br from-white to-accent-50/30 shadow-depth-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-700 rounded-xl flex items-center justify-center shadow-lg">
                    <QrCodeIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">
                      For Tradespersons & Field Teams
                    </h3>
                    <p className="text-sm text-accent-600 font-semibold">
                      Scan. Setup. Start saving time.
                    </p>
                  </div>
                </div>

                <p className="text-primary-700 mb-6 leading-relaxed">
                  Running a landscaping crew, auto shop, or construction
                  business? You're too busy for complicated software. Scan the
                  QR code, answer 3 questions, and your AI COO starts optimizing
                  schedules immediately.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-700 font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        Scan QR Code
                      </p>
                      <p className="text-sm text-primary-600">
                        From your phone, right on the job site
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-700 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        Answer 3 Questions
                      </p>
                      <p className="text-sm text-primary-600">
                        Business type, team size, biggest pain point
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent-700 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        AI Team Deploys
                      </p>
                      <p className="text-sm text-primary-600">
                        Start getting time back in under 2 minutes
                      </p>
                    </div>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-white rounded-xl p-6 border-2 border-accent-200 text-center">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-accent-100 to-accent-200 rounded-lg flex items-center justify-center mb-4">
                    <QrCodeIcon className="w-32 h-32 text-accent-600" />
                  </div>
                  <p className="text-sm font-semibold text-primary-900 mb-2">
                    Scan to Start Free Trial
                  </p>
                  <p className="text-xs text-primary-600">
                    catapult.company/start
                  </p>
                </div>

                <div className="mt-6 p-4 bg-accent-50 rounded-lg border border-accent-200">
                  <p className="text-sm text-primary-700 font-medium">
                    <span className="text-accent-700 font-bold">
                      Perfect for:
                    </span>{' '}
                    Landscapers, Auto Shops, Contractors, Restaurants, Medical
                    Practices
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>

          {/* VC Board Member / Executive Path */}
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
              delay: 0.3
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

              <Card className="h-full border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/30 shadow-depth-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                    <BriefcaseIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">
                      For Board Members & Executives
                    </h3>
                    <p className="text-sm text-purple-600 font-semibold">
                      White-glove onboarding for turnarounds.
                    </p>
                  </div>
                </div>

                <p className="text-primary-700 mb-6 leading-relaxed">
                  Leading a VC-funded turnaround or portfolio company? You need
                  results yesterday. Get a dedicated success manager, custom AI
                  team configuration, and enterprise deployment in one call.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        Book 15-Min Call
                      </p>
                      <p className="text-sm text-primary-600">
                        Same-day availability, no sales pitch
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        Custom AI Team Config
                      </p>
                      <p className="text-sm text-primary-600">
                        CEO, CFO, COO tailored to your turnaround plan
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-purple-700 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-primary-900">
                        Deploy & Monitor
                      </p>
                      <p className="text-sm text-primary-600">
                        Live dashboards, weekly reports, dedicated support
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{
                    scale: 1.02
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 mb-6">

                  Schedule Enterprise Onboarding →
                </motion.button>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-primary-700">
                    <ZapIcon className="w-4 h-4 text-purple-600" />
                    <span>Dedicated success manager</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-700">
                    <ZapIcon className="w-4 h-4 text-purple-600" />
                    <span>Custom SLA & performance guarantees</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-700">
                    <ZapIcon className="w-4 h-4 text-purple-600" />
                    <span>On-premise deployment available</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary-700">
                    <ZapIcon className="w-4 h-4 text-purple-600" />
                    <span>Board-ready reporting & analytics</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-primary-700 font-medium">
                    <span className="text-purple-700 font-bold">
                      Perfect for:
                    </span>{' '}
                    VC Portfolio Companies, PE-Backed Firms, Turnaround
                    Situations, Growth-Stage Startups
                  </p>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Value Prop */}
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
            delay: 0.5
          }}
          className="mt-12">

          <Card className="bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-200 shadow-depth-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                Buy Time Back. Start Today.
              </h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed">
                No matter your industry or role, Catapult Company gives you time
                back. Tradespersons save 15+ hours per week on admin. Executives
                get real-time insights for faster decisions. Both paths start in
                under 2 minutes.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    2min
                  </div>
                  <div className="text-sm text-primary-600">Setup Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    15+ hrs
                  </div>
                  <div className="text-sm text-primary-600">Saved Per Week</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    $0
                  </div>
                  <div className="text-sm text-primary-600">To Start</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}