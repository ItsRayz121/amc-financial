'use client'

import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2200,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useAnimatedCounter(value, isInView, { duration })

  return (
    <span ref={ref} className={className} aria-label={`${prefix}${value}${suffix}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}
