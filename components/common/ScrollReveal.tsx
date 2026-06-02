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

  // Reduce travel distance so animations feel snappy on mobile
  const travel = 16

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === 'up' ? travel : 0,
        x: direction === 'left' ? -travel : direction === 'right' ? travel : 0,
      }

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.5,
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
