import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import {
  BarChart3Icon,
  ShieldCheckIcon,
  DollarSignIcon,
  MessageSquareIcon,
  ZapIcon,
  LayersIcon,
  LockIcon,
  TrendingUpIcon } from
'lucide-react';
const features = [
{
  icon: BarChart3Icon,
  title: 'Real-Time Reporting & Analytics',
  description:
  'Comprehensive dashboards with live metrics, KPI tracking, and predictive analytics. Every executive generates detailed reports on demand.',
  capabilities: [
  'Live performance dashboards',
  'Custom report generation',
  'Predictive trend analysis',
  'Export to any format'],

  color: 'from-blue-500 to-blue-600'
},
{
  icon: ShieldCheckIcon,
  title: 'Deep Access Controls',
  description:
  'Enterprise-grade permissions system. Control exactly what each AI executive can access, modify, and report on with granular role-based access.',
  capabilities: [
  'Role-based permissions',
  'Audit logs for all actions',
  'Data encryption at rest',
  'Compliance-ready security'],

  color: 'from-purple-500 to-purple-600'
},
{
  icon: DollarSignIcon,
  title: 'Performance-Based Compensation',
  description:
  'Pay only for results delivered. Track ROI per executive, measure impact, and adjust compensation based on actual performance metrics.',
  capabilities: [
  'ROI tracking per executive',
  'Performance scorecards',
  'Flexible pricing models',
  'Cost vs. value analytics'],

  color: 'from-green-500 to-green-600'
},
{
  icon: MessageSquareIcon,
  title: 'Conversational AI Interface',
  description:
  'Chat with any executive in natural language. Ask questions, request reports, delegate tasks, and get instant responses 24/7.',
  capabilities: [
  'Natural language queries',
  'Context-aware responses',
  'Multi-turn conversations',
  'Voice and text input'],

  color: 'from-accent-500 to-accent-600'
},
{
  icon: ZapIcon,
  title: 'Instant Deployment',
  description:
  'Deploy any executive in under 5 minutes. Pre-configured templates, automatic integrations, and zero setup complexity.',
  capabilities: [
  'One-click deployment',
  'Pre-built templates',
  'Auto-integration setup',
  'Instant onboarding'],

  color: 'from-orange-500 to-orange-600'
},
{
  icon: LayersIcon,
  title: 'Deep Integration Ecosystem',
  description:
  'Connect to 500+ tools and platforms. Salesforce, HubSpot, Slack, Google Workspace, Microsoft 365, and custom APIs.',
  capabilities: [
  '500+ native integrations',
  'Custom API connections',
  'Real-time data sync',
  'Webhook support'],

  color: 'from-cyan-500 to-cyan-600'
},
{
  icon: LockIcon,
  title: 'Enterprise Security & Compliance',
  description:
  'SOC 2 Type II, GDPR, HIPAA compliant. Your data never leaves your control. On-premise deployment options available.',
  capabilities: [
  'SOC 2 Type II certified',
  'GDPR & HIPAA compliant',
  'On-premise deployment',
  'Data residency options'],

  color: 'from-gray-600 to-gray-700'
},
{
  icon: TrendingUpIcon,
  title: 'Continuous Learning & Improvement',
  description:
  'AI executives learn from your business patterns, improve over time, and adapt to your unique workflows automatically.',
  capabilities: [
  'Adaptive learning algorithms',
  'Pattern recognition',
  'Workflow optimization',
  'Personalized insights'],

  color: 'from-pink-500 to-pink-600'
}];

export function PlatformFeatures() {
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

            <ZapIcon className="w-4 h-4 text-electric-600" />
            <span className="text-sm font-bold text-electric-700">
              Enterprise-Grade Platform
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Everything You Need to Run Your AI Team
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            A complete platform with reporting, access controls, performance
            tracking, and deep integrations. Built for businesses that demand
            results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
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

                  <Card className="h-full border border-primary-100 hover:border-accent-200 hover:shadow-depth-lg transition-all duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        whileHover={{
                          scale: 1.1,
                          rotate: 5
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 15
                        }}
                        className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>

                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-primary-900 mb-2">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-primary-600 mb-4 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="space-y-2">
                      {feature.capabilities.map((capability, capIndex) =>
                      <motion.div
                        key={capIndex}
                        initial={{
                          opacity: 0,
                          x: -10
                        }}
                        whileInView={{
                          opacity: 1,
                          x: 0
                        }}
                        viewport={{
                          once: true
                        }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + capIndex * 0.05
                        }}
                        className="flex items-center gap-2 text-sm text-primary-700">

                          <div className="w-1.5 h-1.5 bg-accent-500 rounded-full" />
                          <span>{capability}</span>
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>);

          })}
        </div>

        {/* Value Proposition */}
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
          className="mt-16">

          <Card className="bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-200 shadow-depth-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                Buy Time, Not Headcount
              </h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed">
                Traditional executives cost $200K-$500K+ per year in salary,
                benefits, and overhead. Our AI executives deliver the same
                strategic value for a fraction of the cost, with{' '}
                <span className="font-bold text-accent-700">
                  performance-based compensation
                </span>{' '}
                that scales with results. Deploy instantly, scale infinitely,
                and pay only for the value delivered.
              </p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    $0
                  </div>
                  <div className="text-sm text-primary-600">Hiring Costs</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    24/7
                  </div>
                  <div className="text-sm text-primary-600">
                    Always Available
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    5min
                  </div>
                  <div className="text-sm text-primary-600">Time to Deploy</div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}