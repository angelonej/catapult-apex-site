import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  ActivityIcon,
  BarChart3Icon,
  CheckCircle2Icon,
  EyeIcon,
  LayoutDashboardIcon,
  SettingsIcon,
  TrendingUpIcon,
  ZapIcon } from
'lucide-react';
export function DashboardPreview() {
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

            <LayoutDashboardIcon className="w-4 h-4 text-electric-600" />
            <span className="text-sm font-bold text-electric-700">
              Full Decision Transparency
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Complete Control & Visibility
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Every AI decision is visible, auditable, and controllable. See what
            each executive decided, why, and with what confidence — in real
            time.
          </p>
        </motion.div>

        {/* Dashboard Preview */}
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
            duration: 0.8,
            delay: 0.3
          }}
          className="relative">

          <Card className="border-2 border-accent-200 shadow-depth-lg overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-primary-900 to-primary-800 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    AI Executive Dashboard
                  </h3>
                  <p className="text-primary-200 text-sm">
                    Real-time control center for your AI team
                  </p>
                </div>
                <Button variant="primary" size="sm">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
              </div>
            </div>

            {/* Mock Dashboard Content */}
            <div className="p-6 bg-gradient-to-b from-primary-50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                {
                  label: 'Decisions Today',
                  value: '1,247',
                  icon: BarChart3Icon,
                  color: 'accent'
                },
                {
                  label: 'Approval Rate',
                  value: '94%',
                  icon: CheckCircle2Icon,
                  color: 'green'
                },
                {
                  label: 'Time Saved',
                  value: '127 hrs',
                  icon: TrendingUpIcon,
                  color: 'blue'
                }].
                map((metric, index) =>
                <motion.div
                  key={index}
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
                    delay: 0.4 + index * 0.1
                  }}>

                    <div
                    className={`bg-${metric.color}-50 border border-${metric.color}-200 rounded-xl p-4`}>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-primary-600">
                          {metric.label}
                        </span>
                        <metric.icon
                        className={`w-5 h-5 text-${metric.color}-600`} />

                      </div>
                      <p className="text-3xl font-bold text-primary-900">
                        {metric.value}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Mock Executive Cards */}
              <div className="space-y-3">
                {['CEO', 'CFO', 'COO'].map((role, index) =>
                <motion.div
                  key={role}
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
                    delay: 0.6 + index * 0.1
                  }}
                  className="bg-white border border-primary-200 rounded-xl p-4 hover:shadow-lg transition-shadow">

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <ActivityIcon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary-900">
                              {role}
                            </span>
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                              Active
                            </span>
                          </div>
                          <p className="text-xs text-primary-600">
                            Performance: {94 - index * 3}%
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-lg font-bold text-accent-600">
                            {23 + index * 12}
                          </p>
                          <p className="text-xs text-primary-600">Decisions</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <SettingsIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>

          {/* Floating Feature Badges */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 20
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              duration: 0.5,
              delay: 0.9
            }}
            className="absolute -bottom-6 -right-6 bg-gradient-to-br from-accent-500 to-accent-700 text-white px-6 py-3 rounded-xl shadow-depth-lg">

            <div className="flex items-center gap-2">
              <ZapIcon className="w-5 h-5" />
              <span className="font-semibold">
                Live Updates Every 2 Seconds
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Feature Grid */}
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
            delay: 1.0
          }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
          {
            title: 'Every Decision Visible',
            description:
            'See what, when, why, and confidence level for every AI decision',
            icon: EyeIcon
          },
          {
            title: 'Granular Controls',
            description:
            'Toggle auto-approval, set spending limits, configure permissions',
            icon: SettingsIcon
          },
          {
            title: 'Real-Time Metrics',
            description:
            'Live performance, ROI, and impact tracking updated every 2 seconds',
            icon: BarChart3Icon
          },
          {
            title: 'Audit Trail',
            description:
            'Complete history of all decisions, changes, and outcomes',
            icon: ActivityIcon
          }].
          map((feature, index) =>
          <motion.div
            key={index}
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
              delay: 1.1 + index * 0.1
            }}>

              <Card className="h-full text-center border border-primary-100 hover:border-accent-200 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-accent-600" />
                </div>
                <h4 className="font-bold text-primary-900 mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-primary-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
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
            delay: 1.5
          }}
          className="mt-12">

          <Card className="bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-200 shadow-depth-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                Radical Transparency by Design
              </h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed mb-6">
                Every AI executive decision is logged, explained, and auditable.
                Toggle auto-approval thresholds, set spending limits, and review
                the full decision trail — giving you genuine oversight of your
                AI team.
              </p>
              <Button variant="primary" size="lg">
                <LayoutDashboardIcon className="w-5 h-5 mr-2" />
                Explore Live Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}