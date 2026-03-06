import React from 'react';
import { motion } from 'framer-motion';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
  'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95';
  const variantStyles = {
    primary:
    'bg-gradient-to-br from-accent-500 to-accent-700 text-white hover:from-accent-600 hover:to-accent-800 focus:ring-accent-500 shadow-depth hover:shadow-depth-lg',
    secondary:
    'bg-gradient-to-br from-primary-800 to-primary-950 text-white hover:from-primary-700 hover:to-primary-900 focus:ring-primary-700 shadow-depth hover:shadow-depth-lg',
    outline:
    'border-2 border-primary-300 text-primary-900 hover:bg-primary-900 hover:text-white hover:border-primary-900 focus:ring-primary-500 bg-white/50 backdrop-blur-sm'
  };
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm',
    md: 'px-7 py-3.5 text-base',
    lg: 'px-9 py-4 text-lg'
  };
  return (
    <motion.button
      whileHover={{
        scale: 1.02
      }}
      whileTap={{
        scale: 0.98
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20
      }}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...(props as any)}>

      {children}
    </motion.button>);

}