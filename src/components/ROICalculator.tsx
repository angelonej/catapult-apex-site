import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import {
  TrendingUpIcon,
  DollarSignIcon,
  ClockIcon,
  UsersIcon } from
'lucide-react';
export function ROICalculator() {
  const [companySize, setCompanySize] = useState<string>('50');
  const [monthlyCosts, setMonthlyCosts] = useState<string>('50000');
  const [showResults, setShowResults] = useState(false);
  const calculateROI = () => {
    const employees = parseInt(companySize) || 50;
    const costs = parseInt(monthlyCosts) || 50000;
    return {
      timeSaved: Math.round(employees * 15),
      costReduction: Math.round(costs * 0.35),
      revenueIncrease: Math.round(costs * 2.5),
      efficiency: 47
    };
  };
  const results = calculateROI();
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };
  const resultCards = [
  {
    icon: ClockIcon,
    value: `${results.timeSaved} hours`,
    label: 'saved per week across your team',
    color: 'from-blue-500 to-blue-600',
    delay: 0
  },
  {
    icon: DollarSignIcon,
    value: `$${results.costReduction.toLocaleString()}`,
    label: 'monthly cost reduction (35%)',
    color: 'from-accent-500 to-accent-600',
    delay: 0.1
  },
  {
    icon: TrendingUpIcon,
    value: `$${results.revenueIncrease.toLocaleString()}`,
    label: 'potential monthly revenue increase',
    color: 'from-purple-500 to-purple-600',
    delay: 0.2
  },
  {
    icon: UsersIcon,
    value: `${results.efficiency}%`,
    label: 'operational efficiency improvement',
    color: 'from-orange-500 to-orange-600',
    delay: 0.3
  }];

  return (
    <section className="w-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white py-20 lg:py-32 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-3xl" />

        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.15, 0.08]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-400 rounded-full blur-3xl" />

      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Calculate Your AI ROI
          </h2>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            See how much time, money, and efficiency you could gain with
            Catapult's AI agents in just seconds.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Enhanced Calculator Form */}
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
              duration: 0.6
            }}>

            <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
              <form onSubmit={handleCalculate} className="space-y-6">
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.2,
                    duration: 0.4
                  }}>

                  <label className="block text-sm font-medium text-white mb-2">
                    Number of Employees
                  </label>
                  <input
                    type="number"
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 50"
                    min="1" />

                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.4
                  }}>

                  <label className="block text-sm font-medium text-white mb-2">
                    Monthly Operational Costs ($)
                  </label>
                  <input
                    type="number"
                    value={monthlyCosts}
                    onChange={(e) => setMonthlyCosts(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., 50000"
                    min="1" />

                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.4,
                    duration: 0.4
                  }}>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full group">

                    Calculate My ROI
                    <TrendingUpIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>

          {/* Enhanced Results Display */}
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
              delay: 0.2
            }}>

            <AnimatePresence mode="wait">
              {showResults ?
              <motion.div
                key="results"
                initial={{
                  opacity: 0,
                  scale: 0.95
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95
                }}
                transition={{
                  duration: 0.4
                }}
                className="space-y-4">

                  <motion.h3
                  initial={{
                    opacity: 0,
                    y: -10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.1,
                    duration: 0.4
                  }}
                  className="text-2xl font-bold mb-6">

                    Your Projected Impact
                  </motion.h3>

                  {resultCards.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: 20
                      }}
                      animate={{
                        opacity: 1,
                        x: 0
                      }}
                      transition={{
                        delay: 0.2 + item.delay,
                        duration: 0.4
                      }}>

                        <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-accent-400/50 transition-all duration-300 group">
                          <div className="flex items-start gap-4">
                            <motion.div
                            whileHover={{
                              scale: 1.1,
                              rotate: 5
                            }}
                            transition={{
                              type: 'spring',
                              stiffness: 400
                            }}
                            className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg`}>

                              <Icon className="w-6 h-6 text-white" />
                            </motion.div>
                            <div className="flex-1">
                              <motion.p
                              initial={{
                                opacity: 0
                              }}
                              animate={{
                                opacity: 1
                              }}
                              transition={{
                                delay: 0.3 + item.delay,
                                duration: 0.4
                              }}
                              className="text-3xl font-bold text-white mb-1">

                                {item.value}
                              </motion.p>
                              <p className="text-primary-200 text-sm">
                                {item.label}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>);

                })}

                  <motion.div
                  initial={{
                    opacity: 0,
                    y: 10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: 0.6,
                    duration: 0.4
                  }}
                  className="mt-8">

                    <Button
                    variant="primary"
                    size="lg"
                    className="w-full group">

                      Get Detailed ROI Report
                      <TrendingUpIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </motion.div> :

              <motion.div
                key="placeholder"
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                className="h-full flex items-center justify-center min-h-[400px]">

                  <div className="text-center text-primary-200">
                    <motion.div
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}>

                      <TrendingUpIcon className="w-16 h-16 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-lg">
                      Enter your details to see your projected ROI
                    </p>
                  </div>
                </motion.div>
              }
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>);

}