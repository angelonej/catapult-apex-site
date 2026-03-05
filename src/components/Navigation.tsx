import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';
import { LogoWithText } from './ui/Logo';
import { MenuIcon, XIcon } from 'lucide-react';
export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(10, 10, 10, 0)', 'rgba(10, 10, 10, 0.95)']
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navLinks = [
  {
    name: 'Platform',
    href: '#platform'
  },
  {
    name: 'Beacons',
    href: '#beacons'
  },
  {
    name: 'Security',
    href: '#security'
  },
  {
    name: 'Podcast',
    href: '#podcast'
  },
  {
    name: 'Architecture',
    href: '#architecture'
  },
  {
    name: 'Pricing',
    href: '#pricing'
  }];

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter: backdropBlur
      }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="#"
            initial={{
              opacity: 0,
              x: -20
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration: 0.5
            }}>

            <LogoWithText size="md" animated={true} variant="light" />
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) =>
            <motion.a
              key={link.name}
              href={link.href}
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="text-white/80 hover:text-white font-medium transition-colors">

                {link.name}
              </motion.a>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
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
                duration: 0.5,
                delay: 0.4
              }}>

              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary-950"
                onClick={() => {
                  window.location.hash = '#/apex';
                }}>

                Sign In
              </Button>
            </motion.div>
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
                duration: 0.5,
                delay: 0.5
              }}>

              <Button
                variant="primary"
                size="sm"
                className="shadow-glow-sm hover:shadow-glow-md"
                onClick={() => {
                  const el = document.getElementById('pricing');
                  if (el)
                  el.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}>

                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{
              scale: 0.9
            }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2">

            {isMobileMenuOpen ?
            <XIcon className="w-6 h-6" /> :

            <MenuIcon className="w-6 h-6" />
            }
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        className="md:hidden overflow-hidden bg-primary-950/95 backdrop-blur-xl border-t border-white/10">

        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) =>
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-white/80 hover:text-white font-medium py-2">

              {link.name}
            </a>
          )}
          <div className="pt-4 space-y-3">
            <Button
              variant="outline"
              size="md"
              className="w-full bg-white/10 border-white/30 text-white"
              onClick={() => {
                window.location.hash = '#/apex';
                setIsMobileMenuOpen(false);
              }}>

              Sign In
            </Button>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setIsMobileMenuOpen(false);
                const el = document.getElementById('pricing');
                if (el)
                el.scrollIntoView({
                  behavior: 'smooth'
                });
              }}>

              Get Started
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.nav>);

}