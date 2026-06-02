'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LinkButton } from '@/components/ui/LinkButton'
import { SITE_CONFIG } from '@/config/site'

function ChartCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0

    const points: number[] = []
    let offset = 0

    function generatePoints() {
      points.length = 0
      let y = height * 0.5
      for (let i = 0; i < width / 8 + 20; i++) {
        y += (Math.random() - 0.48) * 12
        y = Math.max(height * 0.2, Math.min(height * 0.8, y))
        points.push(y)
      }
    }

    function resize() {
      width = canvas!.width = canvas!.offsetWidth
      height = canvas!.height = canvas!.offsetHeight
      generatePoints()
    }

    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)

      ctx.beginPath()
      ctx.moveTo(0, points[0] ?? height * 0.5)

      for (let i = 0; i < points.length; i++) {
        const x = i * 8 - (offset % 8)
        ctx.lineTo(x, points[i])
      }

      ctx.strokeStyle = 'rgba(201, 168, 76, 0.12)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Fill
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()

      const gradient = ctx.createLinearGradient(0, 0, 0, height)
      gradient.addColorStop(0, 'rgba(201, 168, 76, 0.06)')
      gradient.addColorStop(1, 'rgba(201, 168, 76, 0)')
      ctx.fillStyle = gradient
      ctx.fill()

      offset += 0.3
      if (offset >= 8) {
        offset = 0
        points.shift()
        let last = points[points.length - 1] ?? height * 0.5
        last += (Math.random() - 0.48) * 12
        last = Math.max(height * 0.2, Math.min(height * 0.8, last))
        points.push(last)
      }

      animRef.current = requestAnimationFrame(draw)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    draw()

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

interface HeroProps {
  content?: Record<string, string>
}

export function Hero({ content = {} }: HeroProps) {
  const shouldReduceMotion = useReducedMotion()

  const headlineParts = (content.hero_headline ?? 'Master the Markets. Build Your Wealth.').split('. ')
  const headlineMain = headlineParts[0] ? headlineParts[0] + '.' : 'Master the Markets.'
  const headlineAccent = headlineParts[1] ?? 'Build Your Wealth.'

  const subheadline = content.hero_subheadline ?? 'Free trading education, live market insights, and thriving communities — by Aasim Majeed AMC, Financial Consultant with 5 years of experience.'

  // Format member count with locale commas: "2289" → "2,289"
  const memberCount = content.stat_members
    ? parseInt(content.stat_members).toLocaleString()
    : '2,289'

  const trustItems = [
    '100% Free',
    'No Registration Required on This Site',
    'No Hidden Fees',
    `${memberCount}+ Members`,
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-grid"
      aria-label="Introduction"
    >
      {/* Animated chart background — hidden on mobile for performance */}
      {!shouldReduceMotion && (
        <div className="hidden sm:block absolute inset-0 pointer-events-none">
          <ChartCanvas />
        </div>
      )}

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative z-10 flex flex-col items-center text-center pt-24 sm:pt-28 pb-16 sm:pb-20">
        {/* Eyebrow badge */}
        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-muted border border-gold/20 text-gold text-xs font-semibold font-sans uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden="true" />
            Financial Education Platform
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-display text-display-sm sm:text-display-lg md:text-display-xl lg:text-display-2xl font-bold text-text-primary leading-[1.05] max-w-4xl mb-6"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {headlineMain}{' '}
          <span className="text-gold-gradient">{headlineAccent}</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary font-sans leading-relaxed max-w-2xl mb-8 sm:mb-10"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12 w-full sm:w-auto"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <LinkButton
            href={SITE_CONFIG.social.whatsapp}
            variant="gold"
            size="lg"
            aria-label="Join WhatsApp Community — opens in new tab"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49"/>
            </svg>
            Join {memberCount}+ Traders Free
          </LinkButton>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const el = document.getElementById('courses')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Watch Free Courses
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {trustItems.map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-sm text-text-muted font-sans"
            >
              <CheckCircle2 size={14} className="text-emerald shrink-0" aria-hidden="true" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown size={22} className="text-text-muted opacity-70" />
        </motion.div>
      )}
    </section>
  )
}
