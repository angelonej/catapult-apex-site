import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import {
  TreesIcon,
  WrenchIcon,
  UtensilsIcon,
  HeartPulseIcon,
  ShoppingBagIcon,
  QuoteIcon,
  TrendingUpIcon,
  ClockIcon,
  DollarSignIcon,
  CheckCircle2Icon,
  ArrowRightIcon } from
'lucide-react';
const stories = {
  landscaping: {
    name: 'GreenScape Landscaping',
    icon: TreesIcon,
    color: 'from-green-500 to-green-600',
    owner: 'Maria Rodriguez',
    role: 'Owner & Founder',
    location: 'Austin, TX',
    employees: '8 crew members',
    challenge: {
      title: 'Drowning in Paperwork, Missing Growth',
      description:
      "Maria spent 40+ hours per week on scheduling, invoicing, and customer follow-ups instead of growing her business. Seasonal demand was unpredictable, crew scheduling was chaotic, and she was turning away customers because she couldn't keep up.",
      painPoints: [
      'Spending 6 hours daily on admin tasks',
      'Missing 30% of follow-up opportunities',
      'Crew scheduling conflicts weekly',
      'No time for strategic planning',
      'Losing $15K/month in potential revenue']

    },
    discovery: {
      title: 'Finding Catapult at 2 AM',
      story:
      "\"It was 2 AM on a Sunday, and I was still doing invoices from the week. I Googled 'AI for small business operations' out of desperation. Catapult's promise of 'hire your AI team in 10 minutes' sounded too good to be true, but I was desperate enough to try the free tier.\"",
      timeline: 'March 2024'
    },
    implementation: {
      title: 'From Skeptical to Sold in 48 Hours',
      steps: [
      {
        phase: 'Day 1 - Setup (8 minutes)',
        actions: [
        'Uploaded customer list and service history',
        'Connected Google Calendar and QuickBooks',
        'Deployed AI COO and AI CMO']

      },
      {
        phase: 'Day 2 - First Results',
        actions: [
        'AI COO optimized crew schedules',
        'AI CMO sent 47 follow-up emails',
        'Booked 3 new jobs worth $8,500']

      },
      {
        phase: 'Week 1 - Momentum',
        actions: [
        'Added AI CFO for cash flow management',
        'Automated invoice reminders',
        'Reduced admin time to 2 hours/day']

      }],

      aiTeam: ['AI COO', 'AI CMO', 'AI CFO']
    },
    results: {
      timeline: '6 Months',
      metrics: [
      {
        label: 'Revenue Growth',
        value: '+127%',
        detail: '$42K → $95K/month'
      },
      {
        label: 'Admin Time Saved',
        value: '38 hrs/week',
        detail: 'Now 2 hrs/day'
      },
      {
        label: 'Customer Retention',
        value: '89%',
        detail: 'Up from 62%'
      },
      {
        label: 'Crew Utilization',
        value: '94%',
        detail: 'Up from 71%'
      }],

      quote:
      '"I went from working IN my business 70 hours a week to working ON it 25 hours a week. My AI team handles operations better than I ever could. I just hired 2 more crews because we can finally handle the demand."',
      roi: 'Paid $1,497/month, generated $53K additional revenue'
    }
  },
  autobody: {
    name: 'Precision Auto Body',
    icon: WrenchIcon,
    color: 'from-blue-500 to-blue-600',
    owner: 'James Chen',
    role: 'Owner',
    location: 'Seattle, WA',
    employees: '12 technicians',
    challenge: {
      title: 'Insurance Chaos & Lost Revenue',
      description:
      "James's shop was constantly behind on insurance claims, customer communication was inconsistent, and parts inventory was a mess. They were turning away work because they couldn't manage the paperwork.",
      painPoints: [
      'Insurance claims taking 3-4 weeks',
      'Parts sitting unused, costing $8K/month',
      'Customer complaints about communication',
      'Bay utilization at 68%',
      'Missing upsell opportunities']

    },
    discovery: {
      title: 'Recommended by Another Shop Owner',
      story:
      '"A competitor (now friend) told me about Catapult at a trade show. He said his AI COO cut his claim processing time by 60%. I thought he was exaggerating, but his numbers were real. I signed up that night."',
      timeline: 'January 2024'
    },
    implementation: {
      title: 'Systematic Transformation',
      steps: [
      {
        phase: 'Week 1 - Foundation',
        actions: [
        'Uploaded 2 years of claim data',
        'Integrated with shop management system',
        'Deployed AI COO and AI CFO']

      },
      {
        phase: 'Week 2-3 - Process Optimization',
        actions: [
        'AI COO automated claim submissions',
        'AI CFO optimized parts ordering',
        'Added AI CXO for customer communication']

      },
      {
        phase: 'Month 2 - Full Deployment',
        actions: [
        'Deployed AI CMO for marketing',
        'Automated customer updates',
        'Implemented performance tracking']

      }],

      aiTeam: ['AI COO', 'AI CFO', 'AI CXO', 'AI CMO']
    },
    results: {
      timeline: '4 Months',
      metrics: [
      {
        label: 'Claim Processing',
        value: '7 days',
        detail: 'Down from 24 days'
      },
      {
        label: 'Bay Utilization',
        value: '91%',
        detail: 'Up from 68%'
      },
      {
        label: 'Parts Waste',
        value: '-$6.2K/mo',
        detail: '78% reduction'
      },
      {
        label: 'Customer Satisfaction',
        value: '4.8/5',
        detail: 'Up from 3.9/5'
      }],

      quote:
      '"The AI team doesn\'t just work faster—it works smarter. Our AI COO caught patterns in insurance denials I never noticed. We\'re now getting approved 40% faster. The ROI was positive in week 3."',
      roi: 'Paid $1,999/month, saved $18K in waste + gained $31K in efficiency'
    }
  },
  restaurant: {
    name: 'Bella Vista Trattoria',
    icon: UtensilsIcon,
    color: 'from-warm-500 to-warm-600',
    owner: 'Sofia Martinez',
    role: 'Owner & Chef',
    location: 'Miami, FL',
    employees: '23 staff members',
    challenge: {
      title: 'Food Costs Killing Margins',
      description:
      "Sofia's restaurant had great reviews but terrible margins. Food waste was 22%, labor scheduling was inefficient, and she had no time to focus on menu innovation or marketing.",
      painPoints: [
      'Food waste costing $4,800/month',
      'Labor costs at 38% of revenue',
      'Inconsistent customer experience',
      'No marketing strategy',
      'Chef working 80 hours/week']

    },
    discovery: {
      title: 'Desperate Google Search',
      story:
      '"I was about to hire a $6K/month consultant when I found Catapult. The idea of AI executives seemed crazy for a restaurant, but the free trial let me test it risk-free. Within 2 days, the AI COO identified $1,200 in weekly food waste I didn\'t know about."',
      timeline: 'February 2024'
    },
    implementation: {
      title: 'Kitchen to Boardroom Transformation',
      steps: [
      {
        phase: 'Week 1 - Data Collection',
        actions: [
        'Connected POS and inventory systems',
        'Uploaded 6 months of sales data',
        'Deployed AI COO and AI CFO']

      },
      {
        phase: 'Week 2-4 - Operations Overhaul',
        actions: [
        'AI COO optimized food ordering',
        'AI CFO rebuilt labor schedules',
        'Reduced waste by 60% in 2 weeks']

      },
      {
        phase: 'Month 2-3 - Growth Phase',
        actions: [
        'Added AI CMO for local marketing',
        'Launched email campaigns',
        'Optimized menu pricing']

      }],

      aiTeam: ['AI COO', 'AI CFO', 'AI CMO', 'AI CHRO']
    },
    results: {
      timeline: '5 Months',
      metrics: [
      {
        label: 'Food Waste',
        value: '-$3.8K/mo',
        detail: '79% reduction'
      },
      {
        label: 'Labor Costs',
        value: '31%',
        detail: 'Down from 38%'
      },
      {
        label: 'Revenue Growth',
        value: '+43%',
        detail: '$78K → $112K/mo'
      },
      {
        label: 'Chef Hours',
        value: '45/week',
        detail: 'Down from 80'
      }],

      quote:
      '"I\'m back to being a chef instead of a spreadsheet warrior. My AI team handles operations, and I focus on creating amazing food. We just got our first Michelin recommendation. That wouldn\'t have happened when I was drowning in admin work."',
      roi: 'Paid $1,999/month, saved $5.2K in waste + gained $34K in revenue'
    }
  },
  medical: {
    name: 'Riverside Family Practice',
    icon: HeartPulseIcon,
    color: 'from-red-500 to-red-600',
    owner: 'Dr. Michael Thompson',
    role: 'Physician & Practice Owner',
    location: 'Portland, OR',
    employees: '3 doctors, 6 staff',
    challenge: {
      title: 'Billing Nightmare & Patient Overload',
      description:
      "Dr. Thompson's practice was losing $22K/month to billing errors and denied claims. No-show rates were 18%, and patient satisfaction was declining due to poor communication.",
      painPoints: [
      'Insurance denials at 23%',
      'No-show rate costing $18K/month',
      'Billing taking 40+ hours/week',
      'Patient complaints about communication',
      'Doctors spending 3 hours/day on admin']

    },
    discovery: {
      title: 'Recommended by Medical Billing Consultant',
      story:
      "\"Our billing consultant said 'You need Catapult or you need to hire 2 more billing specialists.' The AI approach seemed risky for healthcare, but the HIPAA compliance and medical SME training convinced me. Best decision I've made in 15 years of practice.\"",
      timeline: 'December 2023'
    },
    implementation: {
      title: 'Clinical Excellence Through AI',
      steps: [
      {
        phase: 'Week 1 - Secure Setup',
        actions: [
        'HIPAA-compliant data integration',
        'Connected EHR and billing systems',
        'Deployed AI COO and AI CFO']

      },
      {
        phase: 'Week 2-4 - Billing Overhaul',
        actions: [
        'AI CFO audited 6 months of claims',
        'Identified $47K in missed revenue',
        'Automated claim submissions']

      },
      {
        phase: 'Month 2-3 - Patient Experience',
        actions: [
        'Added AI CXO for patient communication',
        'Automated appointment reminders',
        'Implemented patient satisfaction tracking']

      }],

      aiTeam: ['AI COO', 'AI CFO', 'AI CXO', 'AI CHRO']
    },
    results: {
      timeline: '6 Months',
      metrics: [
      {
        label: 'Insurance Denials',
        value: '6%',
        detail: 'Down from 23%'
      },
      {
        label: 'No-Show Rate',
        value: '4%',
        detail: 'Down from 18%'
      },
      {
        label: 'Collections',
        value: '+$28K/mo',
        detail: '31% increase'
      },
      {
        label: 'Patient Satisfaction',
        value: '4.9/5',
        detail: 'Up from 4.1/5'
      }],

      quote:
      '"My AI team handles the business side so I can focus on medicine. We\'re seeing more patients, billing is flawless, and I leave the office at 5 PM now. My family actually sees me. The AI CFO caught billing errors that saved us from a $60K audit penalty."',
      roi: 'Paid $1,999/month, recovered $28K/month + avoided $60K penalty'
    }
  },
  ecommerce: {
    name: 'Coastal Home Goods',
    icon: ShoppingBagIcon,
    color: 'from-cyan-500 to-cyan-600',
    owner: 'Emma Williams',
    role: 'Founder & CEO',
    location: 'San Diego, CA',
    employees: '5 team members',
    challenge: {
      title: 'Scaling Chaos & Inventory Nightmares',
      description:
      "Emma's Shopify store was growing fast but inefficiently. Customer acquisition costs were skyrocketing, inventory was constantly wrong, and she was working 90-hour weeks trying to keep up.",
      painPoints: [
      'CAC at $87 (target: $45)',
      'Inventory stockouts costing $12K/month',
      'Email marketing conversion at 0.8%',
      'No time for product development',
      'Fulfillment errors at 7%']

    },
    discovery: {
      title: 'E-commerce Podcast Recommendation',
      story:
      '"I heard about Catapult on an e-commerce podcast. The host said his AI CMO cut his CAC by 40% in 6 weeks. I was skeptical but desperate. I started with the freemium tier just to test the AI CMO. It paid for itself in 4 days."',
      timeline: 'April 2024'
    },
    implementation: {
      title: 'From Chaos to Systematic Growth',
      steps: [
      {
        phase: 'Week 1 - Marketing Focus',
        actions: [
        'Connected Shopify, Facebook Ads, Google Analytics',
        'Deployed AI CMO',
        'AI identified $4K in wasted ad spend']

      },
      {
        phase: 'Week 2-4 - Full Stack',
        actions: [
        'Added AI COO for operations',
        'AI CFO for inventory forecasting',
        'Automated customer service workflows']

      },
      {
        phase: 'Month 2-4 - Scale Mode',
        actions: [
        'Deployed AI Product Manager',
        'Launched 3 new product lines',
        'Expanded to Amazon & Walmart']

      }],

      aiTeam: ['AI CMO', 'AI COO', 'AI CFO', 'AI Product Manager']
    },
    results: {
      timeline: '4 Months',
      metrics: [
      {
        label: 'CAC Reduction',
        value: '$41',
        detail: 'Down from $87'
      },
      {
        label: 'Revenue Growth',
        value: '+218%',
        detail: '$45K → $143K/mo'
      },
      {
        label: 'Email Conversion',
        value: '3.2%',
        detail: 'Up from 0.8%'
      },
      {
        label: 'Fulfillment Accuracy',
        value: '99.1%',
        detail: 'Up from 93%'
      }],

      quote:
      '"I went from solopreneur chaos to running a real business. My AI team handles marketing, operations, and analytics better than any agency I tried. We\'re on track for $2M this year. I work 35 hours a week now and actually enjoy it."',
      roi: 'Paid $1,999/month, gained $98K/month in revenue + saved 55 hrs/week'
    }
  }
};
type StoryKey = keyof typeof stories;
export function UserStories() {
  const [activeStory, setActiveStory] = useState<StoryKey>('landscaping');
  const story = stories[activeStory];
  const Icon = story.icon;
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

            <QuoteIcon className="w-4 h-4 text-accent-600" />
            <span className="text-sm font-bold text-accent-700">
              Real Stories, Real Results
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            How Businesses Transform with AI Leadership
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Detailed journeys from five business owners who hired AI executives
            and transformed their operations, growth, and lives.
          </p>
        </motion.div>

        {/* Business Type Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(Object.keys(stories) as StoryKey[]).map((key, index) => {
            const storyData = stories[key];
            const StoryIcon = storyData.icon;
            return (
              <motion.button
                key={key}
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
                  duration: 0.3,
                  delay: index * 0.05
                }}
                whileHover={{
                  scale: 1.05
                }}
                whileTap={{
                  scale: 0.95
                }}
                onClick={() => setActiveStory(key)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${activeStory === key ? 'bg-gradient-to-br ' + storyData.color + ' text-white shadow-md' : 'bg-white border border-primary-200 text-primary-700 hover:border-accent-200'}`}>

                <StoryIcon className="w-5 h-5" />
                <span className="text-sm">{storyData.name}</span>
              </motion.button>);

          })}
        </div>

        {/* Story Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStory}
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
              duration: 0.4
            }}>

            {/* Business Header */}
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
              className="mb-8">

              <Card className="border-2 border-accent-200 shadow-depth-lg">
                <div className="flex items-start gap-6">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${story.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>

                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-primary-900 mb-2">
                      {story.name}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-primary-500">Owner:</span>
                        <p className="font-semibold text-primary-900">
                          {story.owner}
                        </p>
                      </div>
                      <div>
                        <span className="text-primary-500">Role:</span>
                        <p className="font-semibold text-primary-900">
                          {story.role}
                        </p>
                      </div>
                      <div>
                        <span className="text-primary-500">Location:</span>
                        <p className="font-semibold text-primary-900">
                          {story.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-primary-500">Team:</span>
                        <p className="font-semibold text-primary-900">
                          {story.employees}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Journey Sections */}
            <div className="space-y-8">
              {/* Challenge */}
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

                <Card className="border border-red-200 bg-gradient-to-br from-white to-red-50/30">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      1
                    </span>
                    <h4 className="text-xl font-bold text-primary-900">
                      {story.challenge.title}
                    </h4>
                  </div>
                  <p className="text-primary-700 mb-4 leading-relaxed">
                    {story.challenge.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {story.challenge.painPoints.map((point, i) =>
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-primary-700">

                        <span className="text-red-500 mt-1">•</span>
                        <span>{point}</span>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Discovery */}
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
                  delay: 0.3,
                  duration: 0.4
                }}>

                <Card className="border border-electric-200 bg-gradient-to-br from-white to-electric-50/30">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-8 h-8 bg-electric-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      2
                    </span>
                    <h4 className="text-xl font-bold text-primary-900">
                      {story.discovery.title}
                    </h4>
                  </div>
                  <div className="flex items-start gap-4">
                    <QuoteIcon className="w-8 h-8 text-electric-500 flex-shrink-0" />
                    <div>
                      <p className="text-primary-700 italic mb-2 leading-relaxed">
                        {story.discovery.story}
                      </p>
                      <p className="text-sm text-primary-500">
                        — {story.discovery.timeline}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Implementation */}
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
                  delay: 0.4,
                  duration: 0.4
                }}>

                <Card className="border-2 border-accent-200 bg-gradient-to-br from-white to-accent-50/30 shadow-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 bg-accent-500 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      3
                    </span>
                    <h4 className="text-xl font-bold text-primary-900">
                      {story.implementation.title}
                    </h4>
                  </div>

                  <div className="space-y-4 mb-6">
                    {story.implementation.steps.map((step, i) =>
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-accent-300">

                        <div className="absolute -left-2 top-0 w-4 h-4 bg-accent-500 rounded-full" />
                        <h5 className="font-bold text-primary-900 mb-2">
                          {step.phase}
                        </h5>
                        <ul className="space-y-1">
                          {step.actions.map((action, j) =>
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-primary-700">

                              <CheckCircle2Icon className="w-4 h-4 text-accent-600 flex-shrink-0 mt-0.5" />
                              <span>{action}</span>
                            </li>
                        )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-accent-200">
                    <p className="text-sm font-semibold text-primary-700 mb-2">
                      AI Team Deployed:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {story.implementation.aiTeam.map((exec, i) =>
                      <span
                        key={i}
                        className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">

                          {exec}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Results */}
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
                  delay: 0.5,
                  duration: 0.4
                }}>

                <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-green-100/50 shadow-depth-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-8 h-8 bg-green-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                      4
                    </span>
                    <div>
                      <h4 className="text-xl font-bold text-primary-900">
                        Results After {story.results.timeline}
                      </h4>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {story.results.metrics.map((metric, i) =>
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 10
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        delay: 0.6 + i * 0.1,
                        duration: 0.3
                      }}>

                        <div className="bg-white rounded-xl p-4 border border-green-200 shadow-sm">
                          <p className="text-2xl font-bold text-green-600 mb-1">
                            {metric.value}
                          </p>
                          <p className="text-sm font-semibold text-primary-900 mb-1">
                            {metric.label}
                          </p>
                          <p className="text-xs text-primary-600">
                            {metric.detail}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-green-200 mb-4">
                    <div className="flex items-start gap-4">
                      <QuoteIcon className="w-8 h-8 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-primary-800 italic mb-2 leading-relaxed text-lg">
                          {story.results.quote}
                        </p>
                        <p className="text-sm font-semibold text-primary-900">
                          — {story.owner}, {story.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-4">
                    <div>
                      <p className="text-sm font-semibold mb-1">
                        Return on Investment
                      </p>
                      <p className="text-lg">{story.results.roi}</p>
                    </div>
                    <TrendingUpIcon className="w-8 h-8" />
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* CTA */}
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
                delay: 0.7,
                duration: 0.4
              }}
              className="mt-8 text-center">

              <Card className="bg-gradient-to-br from-accent-50 to-accent-100/50 border-2 border-accent-200">
                <p className="text-lg text-primary-900 font-semibold mb-4">
                  Ready to write your own success story?
                </p>
                <motion.button
                  whileHover={{
                    scale: 1.05
                  }}
                  whileTap={{
                    scale: 0.95
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-br from-accent-500 to-accent-700 text-white px-8 py-4 rounded-xl font-semibold shadow-depth hover:shadow-depth-lg transition-all duration-200">

                  Start Your Free Trial
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>);

}