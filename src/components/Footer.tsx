import React from 'react';
import { motion } from 'framer-motion';
import {
  GithubIcon,
  TwitterIcon,
  LinkedinIcon,
  MailIcon,
  ShieldCheckIcon,
  LockIcon,
  CheckCircle2Icon } from
'lucide-react';
import { LogoWithText } from './ui/Logo';
export function Footer() {
  const footerLinks = {
    Product: [
    'Features',
    'Pricing',
    'AI Executives',
    'Integrations',
    'Changelog'],

    Company: ['About', 'Blog', 'Careers', 'Press Kit', 'Contact'],
    Resources: [
    'Documentation',
    'Help Center',
    'Community',
    'Templates',
    'API'],

    Legal: ['Privacy', 'Terms', 'Security', 'Compliance', 'Cookies']
  };
  const socialLinks = [
  {
    icon: TwitterIcon,
    href: '#',
    label: 'Twitter'
  },
  {
    icon: LinkedinIcon,
    href: '#',
    label: 'LinkedIn'
  },
  {
    icon: GithubIcon,
    href: '#',
    label: 'GitHub'
  },
  {
    icon: MailIcon,
    href: 'mailto:partnerships@catapultcompany.ai',
    label: 'Email'
  }];

  const complianceBadges = [
  {
    name: 'SOC 2 Type II',
    icon: ShieldCheckIcon
  },
  {
    name: 'GDPR Compliant',
    icon: CheckCircle2Icon
  },
  {
    name: 'HIPAA Compliant',
    icon: LockIcon
  }];

  return (
    <footer className="w-full bg-gradient-to-b from-primary-950 to-black text-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security & Compliance Badges */}
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
            duration: 0.5
          }}
          className="mb-12 pb-8 border-b border-white/10">

          <p className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-6 text-center">
            Enterprise-Grade Security & Compliance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {complianceBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <motion.div
                  key={badge.name}
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
                    delay: index * 0.1,
                    duration: 0.3
                  }}
                  whileHover={{
                    scale: 1.05
                  }}
                  className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">

                  <Icon className="w-5 h-5 text-accent-400" />
                  <span className="text-sm font-medium text-white/80">
                    {badge.name}
                  </span>
                </motion.div>);

            })}
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
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
                duration: 0.5
              }}>

              <div className="mb-4">
                <LogoWithText
                  size="md"
                  animated={false}
                  variant="light"
                  showCompany={true} />

                <motion.a
                  href="https://www.catapultcompany.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.4
                  }}
                  whileHover={{
                    opacity: 1,
                    x: 2
                  }}
                  className="inline-block mt-2 text-sm text-white/50 hover:text-white/80 transition-colors">

                  a division of{' '}
                  <span className="font-semibold">Cognitect Labs</span>
                </motion.a>
              </div>
              <p className="text-white/60 mb-6 max-w-sm">
                Hire AI-embodied executives and managers. Deploy your leadership
                team instantly—no interviews, no salaries, just results.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
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
                        duration: 0.3,
                        delay: index * 0.1
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -2
                      }}
                      whileTap={{
                        scale: 0.95
                      }}
                      className="w-10 h-10 bg-white/10 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-all duration-200"
                      aria-label={social.label}>

                      <Icon className="w-5 h-5" />
                    </motion.a>);

                })}
              </div>
            </motion.div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(
            ([category, links], categoryIndex) =>
            <motion.div
              key={category}
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
                delay: categoryIndex * 0.1
              }}>

                <h3 className="font-bold text-white mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) =>
                <li key={link}>
                      <motion.a
                    href="#"
                    whileHover={{
                      x: 4
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 20
                    }}
                    className="text-white/60 hover:text-white transition-colors inline-block">

                        {link}
                      </motion.a>
                    </li>
                )}
                </ul>
              </motion.div>

          )}
        </div>

        {/* Bottom Bar */}
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
            duration: 0.5,
            delay: 0.4
          }}
          className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-white/40 text-sm">
              © 2025 Catapult Company. All rights reserved.
            </p>
            <a
              href="https://www.catapultcompany.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/30 hover:text-white/60 text-xs transition-colors">

              catapultcompany.ai
            </a>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors">

              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors">

              Terms of Service
            </a>
            <a
              href="#"
              className="text-white/40 hover:text-white transition-colors">

              Cookie Settings
            </a>
            <a
              href="#/deck"
              onClick={() => {
                window.location.hash = '#/deck';
              }}
              className="text-gold-400/70 hover:text-gold-400 transition-colors font-semibold">

              ⚡ Investor Deck
            </a>
          </div>
        </motion.div>
      </div>
    </footer>);

}