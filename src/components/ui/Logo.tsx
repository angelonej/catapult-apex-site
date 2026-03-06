import React from 'react';
import { motion } from 'framer-motion';
interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  variant?: 'light' | 'dark';
}
export function Logo({
  className = '',
  size = 'md',
  animated = true,
  variant = 'light'
}: LogoProps) {
  const sizes = {
    sm: {
      container: 'w-8 h-8',
      text: 'text-base'
    },
    md: {
      container: 'w-10 h-10',
      text: 'text-xl'
    },
    lg: {
      container: 'w-12 h-12',
      text: 'text-2xl'
    }
  };
  const sizeClasses = sizes[size];
  const isLight = variant === 'light';
  return (
    <motion.div
      className={`${sizeClasses.container} relative ${className}`}
      whileHover={
      animated ?
      {
        scale: 1.05,
        rotate: 5
      } :
      undefined
      }
      transition={
      animated ?
      {
        type: 'spring',
        stiffness: 400,
        damping: 15
      } :
      undefined
      }>

      {/* SVG Logo - Catapult Symbol */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full">

        {/* Background Circle with Gradient */}
        <defs>
          <linearGradient
            id="catapult-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">

            <stop offset="0%" stopColor="#E63946" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
          <linearGradient
            id="catapult-light"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%">

            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#E63946" />
          </linearGradient>
        </defs>

        {/* Rounded Square Background */}
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          rx="20"
          fill="url(#catapult-gradient)"
          className="drop-shadow-lg" />


        {/* Catapult Arm - Dynamic Launch Symbol */}
        <motion.g
          style={{ transformOrigin: '30px 70px' }}
          initial={
          animated ?
          {
            rotate: -15,
          } :
          undefined
          }
          animate={
          animated ?
          {
            rotate: [-15, 0, -15]
          } :
          undefined
          }
          transition={
          animated ?
          {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          } :
          undefined
          }>

          {/* Base/Pivot */}
          <circle cx="30" cy="70" r="6" fill="white" opacity="0.9" />

          {/* Arm */}
          <path
            d="M 30 70 L 70 30"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.9" />

        </motion.g>

        {/* Projectile - The "C" for Catapult */}
        <motion.g
          initial={
          animated ?
          {
            x: 0,
            y: 0,
            opacity: 1
          } :
          undefined
          }
          animate={
          animated ?
          {
            x: [0, 15, 0],
            y: [0, -15, 0],
            opacity: [1, 0.7, 1]
          } :
          undefined
          }
          transition={
          animated ?
          {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          } :
          undefined
          }>

          <text
            x="70"
            y="35"
            fill="white"
            fontSize="28"
            fontWeight="bold"
            fontFamily="Inter, sans-serif"
            textAnchor="middle"
            dominantBaseline="middle">

            C
          </text>
        </motion.g>

        {/* Launch Trail Effect */}
        <motion.path
          d="M 65 35 Q 60 40, 55 45"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
          strokeDasharray="4 4"
          initial={
          animated ?
          {
            pathLength: 0
          } :
          undefined
          }
          animate={
          animated ?
          {
            pathLength: [0, 1, 0]
          } :
          undefined
          }
          transition={
          animated ?
          {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          } :
          undefined
          } />

      </svg>
    </motion.div>);

}
// Simplified logo for small spaces (just the icon)
export function LogoIcon({
  className = '',
  size = 'md'
}: Pick<LogoProps, 'className' | 'size'>) {
  return <Logo className={className} size={size} animated={false} />;
}
// Logo with text for headers
interface LogoWithTextProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  variant?: 'light' | 'dark';
  showCompany?: boolean;
}
export function LogoWithText({
  className = '',
  size = 'md',
  animated = true,
  variant = 'light',
  showCompany = false
}: LogoWithTextProps) {
  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };
  const textColor = variant === 'light' ? 'text-white' : 'text-primary-900';
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Logo size={size} animated={animated} variant={variant} />
      <span className={`${textSizes[size]} font-bold ${textColor}`}>
        Catapult{showCompany && ' Company'}
      </span>
    </div>);

}