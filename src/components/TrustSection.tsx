import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './ui/Card';
import {
  QuoteIcon,
  TrendingUpIcon,
  UsersIcon,
  AwardIcon,
  NewspaperIcon } from
'lucide-react';
const stats = [
{
  icon: TrendingUpIcon,
  value: '$847M',
  label: 'Total value created for clients',
  color: 'from-blue-500 to-blue-600'
},
{
  icon: UsersIcon,
  value: '12,000+',
  label: 'AI executives hired and deployed',
  color: 'from-accent-500 to-accent-600'
},
{
  icon: AwardIcon,
  value: '98%',
  label: 'Customer satisfaction rate',
  color: 'from-purple-500 to-purple-600'
}];

const testimonials = [
{
  quote:
  'Hiring an AI COO reduced our operational costs by 42% in the first quarter. Best hire we ever made, and it took less than 10 minutes.',
  author: 'Sarah Chen',
  role: 'Founder, TechFlow Solutions'
},
{
  quote:
  "Our AI CEO and Product Manager work together seamlessly. Revenue grew 2.8x in 6 months. It's like having senior leadership without the overhead.",
  author: 'Marcus Johnson',
  role: 'CEO, Velocity Marketing'
},
{
  quote:
  'The AI CTO transformed our tech strategy. We make better decisions faster, and our infrastructure has never been more optimized.',
  author: 'Emily Rodriguez',
  role: 'VP Engineering, Nexus Corp'
}];

const pressLogos = [
'TechCrunch',
'Forbes',
'WSJ',
'Bloomberg',
'VentureBeat',
'Fast Company'];

export function TrustSection() {
  return (
    <section className="w-full bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured In Section */}
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
          className="mb-20">

          <div className="text-center mb-8">
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
              className="inline-flex items-center gap-2 bg-electric-50 border border-electric-200 rounded-full px-4 py-2 mb-4">

              <NewspaperIcon className="w-4 h-4 text-electric-600" />
              <span className="text-sm font-bold text-electric-700">
                Featured In
              </span>
            </motion.div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {pressLogos.map((logo, index) =>
            <motion.div
              key={logo}
              initial={{
                opacity: 0,
                y: 10
              }}
              whileInView={{
                opacity: 0.5,
                y: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                delay: 0.05 * index,
                duration: 0.4
              }}
              whileHover={{
                opacity: 1,
                scale: 1.1
              }}
              className="text-2xl md:text-3xl font-bold text-primary-400 cursor-default">

                {logo}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
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
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">

          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
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
                  delay: index * 0.1,
                  duration: 0.5
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

                  <Card className="text-center border border-primary-100 hover:border-accent-200 hover:shadow-xl transition-all duration-300">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 5
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 400
                      }}
                      className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>

                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.p
                      initial={{
                        opacity: 0,
                        scale: 0.8
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        delay: 0.2 + index * 0.1,
                        duration: 0.4
                      }}
                      className="text-4xl font-bold text-primary-900 mb-2">

                      {stat.value}
                    </motion.p>
                    <p className="text-primary-600">{stat.label}</p>
                  </Card>
                </motion.div>
              </motion.div>);

          })}
        </motion.div>

        {/* Enhanced CEO Section */}
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
            delay: 0.2
          }}>

          <Card className="bg-gradient-to-br from-white to-primary-50 border border-primary-200 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* CEO Image */}
              <div className="lg:col-span-1">
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
                    delay: 0.3,
                    duration: 0.5
                  }}
                  className="relative">

                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-200 to-accent-200 flex items-center justify-center shadow-lg">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-300 to-primary-400 flex items-center justify-center text-white text-4xl font-bold shadow-inner">
                      JD
                    </div>
                  </div>
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: 20,
                      y: 20
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      y: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: 0.5,
                      duration: 0.4
                    }}
                    className="absolute -bottom-4 -right-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold">

                    Founder & CEO
                  </motion.div>
                </motion.div>
              </div>

              {/* CEO Quote */}
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
                  delay: 0.4,
                  duration: 0.5
                }}
                className="lg:col-span-2">

                <QuoteIcon className="w-10 h-10 text-accent-400 mb-4" />
                <blockquote className="text-xl text-primary-800 leading-relaxed mb-6">
                  "We built Catapult Company because every business deserves
                  world-class leadership—without the hiring process, without the
                  overhead, without the limitations. Our AI executives work
                  24/7, make data-driven decisions instantly, and scale with
                  your business. That's the future of leadership."
                </blockquote>
                <div>
                  <p className="font-bold text-primary-900 text-lg">
                    Jordan Davis
                  </p>
                  <p className="text-primary-600">
                    Founder & CEO, Catapult Company
                  </p>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Enhanced Testimonials */}
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

          <h3 className="text-2xl font-bold text-primary-900 text-center mb-12">
            What Our Customers Say
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) =>
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
                delay: 0.1 * index,
                duration: 0.5
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

                  <Card className="h-full border border-primary-100 hover:border-accent-200 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) =>
                    <motion.span
                      key={i}
                      initial={{
                        opacity: 0,
                        scale: 0
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        delay: 0.2 + index * 0.1 + i * 0.05,
                        duration: 0.2
                      }}
                      className="text-yellow-400 text-xl">

                          ★
                        </motion.span>
                    )}
                    </div>
                    <p className="text-primary-700 mb-4 leading-relaxed">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="font-semibold text-primary-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-primary-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Enhanced Company Logos */}
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
          className="mt-16 text-center">

          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-8">
            Trusted by Leading Companies
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['TechFlow', 'Velocity', 'Nexus', 'Quantum', 'Zenith', 'Apex'].map(
              (company, index) =>
              <motion.div
                key={company}
                initial={{
                  opacity: 0,
                  y: 10
                }}
                whileInView={{
                  opacity: 0.6,
                  y: 0
                }}
                viewport={{
                  once: true
                }}
                transition={{
                  delay: 0.05 * index,
                  duration: 0.4
                }}
                whileHover={{
                  opacity: 1,
                  scale: 1.1
                }}
                className="text-2xl font-bold text-primary-400 cursor-default">

                  {company}
                </motion.div>

            )}
          </div>
        </motion.div>
      </div>
    </section>);

}