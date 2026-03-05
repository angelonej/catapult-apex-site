import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import {
  BriefcaseIcon,
  CodeIcon,
  SettingsIcon,
  ClipboardListIcon,
  PackageIcon,
  DollarSignIcon,
  SmileIcon,
  TrendingUpIcon,
  UsersIcon } from
'lucide-react';
const executives = [
{
  icon: BriefcaseIcon,
  name: 'AI Chief Executive Officer',
  role: 'CEO',
  description:
  'Strategic vision and decision-making. Sets company direction, analyzes market opportunities, and drives growth initiatives 24/7.',
  outcome: 'Strategic decisions in real-time',
  color: 'text-accent-600 bg-accent-50'
},
{
  icon: DollarSignIcon,
  name: 'AI Chief Financial Officer',
  role: 'CFO',
  description:
  'Financial strategy and planning. Manages budgets, forecasts revenue, optimizes cash flow, and ensures financial health continuously.',
  outcome: 'Financial clarity and control',
  color: 'text-green-600 bg-green-50'
},
{
  icon: CodeIcon,
  name: 'AI Chief Technology Officer',
  role: 'CTO',
  description:
  'Technical leadership and innovation. Evaluates tech stack, identifies automation opportunities, and optimizes infrastructure continuously.',
  outcome: 'Tech decisions without delays',
  color: 'text-blue-600 bg-blue-50'
},
{
  icon: SettingsIcon,
  name: 'AI Chief Operating Officer',
  role: 'COO',
  description:
  'Operations excellence and efficiency. Streamlines workflows, identifies bottlenecks, and optimizes processes across all departments.',
  outcome: 'Reduce operational costs by 40%',
  color: 'text-purple-600 bg-purple-50'
},
{
  icon: TrendingUpIcon,
  name: 'AI Chief Marketing Officer',
  role: 'CMO',
  description:
  'Marketing strategy and growth. Analyzes campaigns, optimizes channels, tracks ROI, and drives customer acquisition at scale.',
  outcome: 'Marketing ROI maximized',
  color: 'text-pink-600 bg-pink-50'
},
{
  icon: SmileIcon,
  name: 'AI Chief Experience Officer',
  role: 'CXO',
  description:
  'Customer and employee experience. Monitors satisfaction, identifies pain points, and optimizes every touchpoint for delight.',
  outcome: 'Experience scores up 50%',
  color: 'text-cyan-600 bg-cyan-50'
},
{
  icon: UsersIcon,
  name: 'AI Chief HR Officer',
  role: 'CHRO',
  description:
  'People strategy and culture. Manages talent, tracks performance, optimizes hiring, and ensures team health and engagement.',
  outcome: 'Retention up, hiring faster',
  color: 'text-indigo-600 bg-indigo-50'
},
{
  icon: ClipboardListIcon,
  name: 'AI Project Manager',
  role: 'PM',
  description:
  'Project execution and delivery. Tracks progress, manages resources, identifies risks, and ensures on-time delivery of all initiatives.',
  outcome: 'Projects delivered on schedule',
  color: 'text-orange-600 bg-orange-50'
},
{
  icon: PackageIcon,
  name: 'AI Product Manager',
  role: 'Product',
  description:
  'Product strategy and roadmap. Analyzes user data, prioritizes features, defines requirements, and drives product-market fit.',
  outcome: 'Data-driven product decisions',
  color: 'text-teal-600 bg-teal-50'
}];

const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};
export function PlatformOverview() {
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

            <span className="text-sm font-bold text-accent-700">
              Complete Leadership Suite
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-900 mb-4">
            Hire Your Complete AI Leadership Team
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Deploy AI-embodied executives and managers instantly. Each role
            works 24/7, requires no salary, and delivers measurable results from
            day one.{' '}
            <span className="font-semibold text-accent-600">
              Buy time, not headcount.
            </span>
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: '-50px'
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {executives.map((exec, index) => {
            const Icon = exec.icon;
            return (
              <motion.div key={exec.name} variants={cardVariants}>
                <motion.div
                  whileHover={{
                    y: -8
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20
                  }}>

                  <Card className="h-full flex flex-col group cursor-pointer border border-primary-100 hover:border-accent-200 hover:shadow-depth-lg transition-all duration-300">
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
                        className={`w-14 h-14 rounded-xl ${exec.color} flex items-center justify-center flex-shrink-0 shadow-md`}>

                        <Icon className="w-7 h-7" />
                      </motion.div>
                      <div>
                        <div className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-1">
                          {exec.role}
                        </div>
                        <h3 className="text-lg font-bold text-primary-900 group-hover:text-accent-600 transition-colors leading-tight">
                          {exec.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-primary-600 mb-4 flex-grow leading-relaxed text-sm">
                      {exec.description}
                    </p>

                    <div className="pt-4 border-t border-primary-200">
                      <p className="text-sm font-semibold text-accent-600 flex items-center gap-2">
                        <motion.span
                          initial={{
                            width: 0
                          }}
                          whileInView={{
                            width: 24
                          }}
                          viewport={{
                            once: true
                          }}
                          transition={{
                            delay: 0.5 + index * 0.05,
                            duration: 0.4
                          }}
                          className="h-1 bg-accent-500 rounded-full" />

                        {exec.outcome}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>);

          })}
        </motion.div>

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
            delay: 0.6,
            duration: 0.6
          }}
          className="mt-12 text-center">

          <p className="text-primary-700 font-medium text-lg">
            All executives integrate seamlessly with your existing tools and
            scale with your business needs.
          </p>
          <p className="text-accent-600 font-semibold mt-2">
            Performance-based compensation: Pay only for results delivered.
          </p>
        </motion.div>
      </div>
    </section>);

}