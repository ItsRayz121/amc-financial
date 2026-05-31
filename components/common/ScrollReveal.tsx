'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  delay?: number
  direction?: 'up' | 'left' | 'right' | 'none'
  children: React.ReactNode
}

export function ScrollReveal({
  delay = 0,
  direction = 'up',
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? 28 : 0,
        x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
      }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.6,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
