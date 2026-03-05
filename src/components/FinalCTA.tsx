import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import {
  CheckCircle2Icon,
  ArrowRightIcon,
  ClockIcon,
  QrCodeIcon } from
'lucide-react';
const benefits = ['2-min setup', 'Buy time back', 'Cancel anytime'];
export function FinalCTA() {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
  };
  return (
    <section className="w-full bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 text-white py-20 lg:py-32 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
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
            scale: [1, 1.4, 1],
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

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
          }}>

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
              delay: 0.2,
              duration: 0.4
            }}
            className="inline-flex items-center gap-2 bg-accent-500/20 backdrop-blur-sm border border-accent-400/30 rounded-full px-4 py-2 mb-6">

            <ClockIcon className="w-4 h-4 text-accent-300" />
            <span className="text-sm font-medium text-accent-100">
              Buy Time Back Today
            </span>
          </motion.div>

          <motion.h2
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
              delay: 0.3,
              duration: 0.5
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">

            Start Your Free Trial in 2 Minutes
          </motion.h2>

          <motion.p
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
              delay: 0.4,
              duration: 0.5
            }}
            className="text-xl text-primary-200 mb-12 max-w-3xl mx-auto">

            Join our pilot program and deploy your AI executive team in under 5
            minutes. Scan a QR code on site or click a link from the boardroom —
            your AI team is ready instantly.
          </motion.p>

          {/* Enhanced Benefits Grid */}
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
              delay: 0.5,
              duration: 0.5
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {benefits.map((benefit, index) =>
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
                delay: 0.6 + index * 0.1,
                duration: 0.3
              }}
              className="flex items-center justify-center gap-3 text-left">

                <CheckCircle2Icon className="w-6 h-6 text-accent-400 flex-shrink-0" />
                <span className="text-primary-100">{benefit}</span>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced CTA Options */}
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
              delay: 0.7,
              duration: 0.5
            }}
            className="max-w-2xl mx-auto space-y-6">

            {/* Primary CTA: Email signup */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4">

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all duration-200"
                required />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="group whitespace-nowrap">

                Buy Time Back
                <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900 transition-all duration-200"
                onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                })
                }>

                <QrCodeIcon className="w-5 h-5 mr-2" />
                Scan QR Code
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-900 transition-all duration-200"
                onClick={() => {
                  const el = document.querySelector('footer');
                  if (el)
                  el.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>

                Book Enterprise Call
              </Button>
            </div>
          </motion.div>

          {/* Enhanced trust indicators */}
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
              delay: 0.9,
              duration: 0.6
            }}
            className="mt-12 pt-8 border-t border-white/20">

            <p className="text-sm text-primary-300 mb-4">
              12 design partners · pilot 2026 · avg 23 hrs saved/week (verified)
            </p>
            <div className="flex justify-center items-center gap-2">
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
                  delay: 1.0 + i * 0.05,
                  duration: 0.2
                }}
                className="text-yellow-400 text-2xl">

                  ★
                </motion.span>
              )}
              <span className="ml-2 text-primary-200 font-medium">
                91% decision approval rate · pilot verified
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>);

}