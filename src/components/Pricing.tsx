import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import {
  CheckIcon,
  XIcon,
  SparklesIcon,
  TrendingUpIcon,
  ZapIcon,
  CrownIcon } from
'lucide-react';
const pricingTiers = [
{
  name: 'Freemium',
  tagline: 'Try before you commit',
  price: '$0',
  period: 'forever',
  description: 'Perfect for testing AI leadership capabilities',
  icon: SparklesIcon,
  color: 'from-gray-500 to-gray-600',
  features: [
  '1 AI Executive (your choice)',
  'Basic reporting & analytics',
  'Email support',
  '10 queries per day',
  'Standard integrations',
  'Community access'],

  limitations: [
  'No performance tracking',
  'No custom training',
  'No video personas',
  'No priority support'],

  cta: 'Start Free',
  popular: false
},
{
  name: 'Starter',
  tagline: 'Performance-based pricing',
  price: '$499',
  period: 'per executive/month',
  description: 'Pay based on measurable results delivered',
  icon: TrendingUpIcon,
  color: 'from-blue-500 to-blue-600',
  features: [
  'Up to 3 AI Executives',
  'Performance-based compensation',
  'Real-time reporting & analytics',
  'Priority email support',
  'Unlimited queries',
  'All integrations',
  'Custom training on your data',
  'ROI tracking per executive'],

  limitations: [
  'No video personas',
  'No dedicated success manager',
  'No on-premise deployment'],

  cta: 'Start 14-Day Trial',
  popular: true,
  savings: 'Pay only for results: 20-40% discount based on performance'
},
{
  name: 'Growth',
  tagline: 'Scale your AI team',
  price: '$1,999',
  period: 'per month',
  description: 'Complete AI leadership suite with advanced features',
  icon: ZapIcon,
  color: 'from-accent-500 to-accent-600',
  features: [
  'Up to 9 AI Executives',
  'Performance-based compensation',
  'Advanced analytics & forecasting',
  'Priority support + Slack channel',
  'Unlimited everything',
  'Custom integrations',
  'SME expert training mode',
  'Video persona avatars',
  'Deep access controls',
  'Audit logs & compliance'],

  limitations: ['No on-premise deployment', 'No white-label'],
  cta: 'Start 14-Day Trial',
  popular: false,
  savings: 'Save up to 50% with performance bonuses'
},
{
  name: 'Enterprise',
  tagline: 'Unlimited AI leadership',
  price: 'Custom',
  period: 'contact sales',
  description: 'Full platform with AGI-ready architecture',
  icon: CrownIcon,
  color: 'from-purple-500 to-purple-600',
  features: [
  'Unlimited AI Executives',
  'Performance-based + volume discounts',
  'White-glove onboarding',
  'Dedicated success manager',
  '24/7 priority support',
  'On-premise deployment',
  'Custom AI training',
  'Video persona + voice cloning',
  'AGI-ready architecture',
  'White-label options',
  'SLA guarantees',
  'Custom contracts'],

  limitations: [],
  cta: 'Contact Sales',
  popular: false
}];

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>(
    'monthly'
  );
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
            className="inline-flex items-center gap-2 bg-accent-50 border border-accent-200 rounded-full px-4 py-2 mb-6">

            <TrendingUpIcon className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-bold text-accent-700">
              Performance-Based Pricing
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Pay Only for Results Delivered
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto mb-8">
            Start free, scale with performance-based compensation. The more
            value your AI team delivers, the less you pay.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span
              className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-primary-900' : 'text-primary-500'}`}>

              Monthly
            </span>
            <motion.button
              onClick={() =>
              setBillingPeriod(
                billingPeriod === 'monthly' ? 'annual' : 'monthly'
              )
              }
              className="relative w-14 h-7 bg-primary-200 rounded-full transition-colors"
              whileTap={{
                scale: 0.95
              }}>

              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-accent-500 rounded-full shadow-md"
                animate={{
                  x: billingPeriod === 'annual' ? 28 : 0
                }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30
                }} />

            </motion.button>
            <span
              className={`text-sm font-medium ${billingPeriod === 'annual' ? 'text-primary-900' : 'text-primary-500'}`}>

              Annual{' '}
              <span className="text-accent-600 font-bold">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingTiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
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

                  <Card
                    className={`h-full flex flex-col relative ${tier.popular ? 'border-2 border-accent-500 shadow-depth-lg' : 'border border-primary-100 hover:border-accent-200'} transition-all duration-300`}>

                    {tier.popular &&
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                        <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                          Most Popular
                        </div>
                      </div>
                    }

                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${tier.color} rounded-xl flex items-center justify-center shadow-md`}>

                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-primary-900">
                          {tier.name}
                        </h3>
                        <p className="text-xs text-primary-500">
                          {tier.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-primary-900">
                          {tier.price}
                        </span>
                        <span className="text-sm text-primary-500">
                          /{tier.period}
                        </span>
                      </div>
                      <p className="text-sm text-primary-600 mt-2">
                        {tier.description}
                      </p>
                      {tier.savings &&
                      <p className="text-xs text-accent-600 font-semibold mt-2">
                          {tier.savings}
                        </p>
                      }
                    </div>

                    <Button
                      variant={tier.popular ? 'primary' : 'outline'}
                      size="md"
                      className="w-full mb-6">

                      {tier.cta}
                    </Button>

                    <div className="space-y-3 flex-grow">
                      {tier.features.map((feature, i) =>
                      <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckIcon className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
                          <span className="text-primary-700">{feature}</span>
                        </div>
                      )}
                      {tier.limitations.map((limitation, i) =>
                      <div key={i} className="flex items-start gap-2 text-sm">
                          <XIcon className="w-4 h-4 text-primary-300 flex-shrink-0 mt-0.5" />
                          <span className="text-primary-400">{limitation}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </motion.div>);

          })}
        </div>

        {/* Performance-Based Compensation Explainer */}
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
          }}>

          <Card className="bg-gradient-to-br from-electric-50 to-electric-100/50 border-2 border-electric-200 shadow-depth-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary-900 mb-4">
                How Performance-Based Compensation Works
              </h3>
              <p className="text-lg text-primary-700 max-w-3xl mx-auto leading-relaxed mb-8">
                Your AI executives earn their keep by delivering measurable
                results. The better they perform, the more value you get—and the
                less you pay.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric-600 mb-2">
                    20-40%
                  </div>
                  <div className="text-sm text-primary-600">
                    Discount for high performance
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric-600 mb-2">
                    Real-Time
                  </div>
                  <div className="text-sm text-primary-600">
                    ROI tracking per executive
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-electric-600 mb-2">
                    100%
                  </div>
                  <div className="text-sm text-primary-600">
                    Transparent metrics
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>);

}