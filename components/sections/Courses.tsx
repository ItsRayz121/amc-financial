'use client'

import Image from 'next/image'
import { Play, ExternalLink, TrendingUp, Target, Shield, Trophy } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { isPlaceholderUrl } from '@/config/site'
import { cn } from '@/utils/cn'
import type { SiteLink } from '@/types/database'

interface CoursesProps {
  links: SiteLink[]
}

const HIGHLIGHTS = [
  { icon: <Target size={16} aria-hidden="true" />, label: 'Proven Strategies' },
  { icon: <Shield size={16} aria-hidden="true" />, label: 'Risk Management' },
  { icon: <TrendingUp size={16} aria-hidden="true" />, label: 'Live Trading Examples' },
  { icon: <Trophy size={16} aria-hidden="true" />, label: 'Long Term Success' },
]

export function Courses({ links }: CoursesProps) {
  const completeCourse = links.find(
    (l) => l.key === 'course_beginner' && !isPlaceholderUrl(l.url)
  )
  const liveCourse = links.find(
    (l) => l.key === 'course_live' && !isPlaceholderUrl(l.url)
  )

  if (!completeCourse && !liveCourse) return null

  return (
    <section id="courses" className="section-padding" aria-labelledby="courses-heading">
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <SectionHeader
              eyebrow="Free Trading Education"
              title="Free Trading Courses"
              subtitle="Complete courses. Zero cost. Zero signup. Just learning."
            />
            <span className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-muted border border-emerald/20 text-emerald text-xs font-semibold font-sans uppercase tracking-wide">
              100% FREE
            </span>
          </div>
        </ScrollReveal>

        <div className="max-w-2xl mx-auto">
          {completeCourse && (
            <ScrollReveal>
              <div className={cn(
                'card-dark rounded-2xl overflow-hidden flex flex-col',
                'transition-all duration-350',
                'hover:-translate-y-1 hover:shadow-card-hover glow-gold-hover',
                'ring-1 ring-gold/20',
              )}>
                {/* Thumbnail */}
                <div className="relative h-64 sm:h-72 overflow-hidden border-b border-base-border bg-base-elevated">
                  <Image
                    src="/images/course-thumbnail.jpg"
                    alt="Trading Complete Course 2026 — Zero to Pro Trader"
                    fill
                    sizes="(max-width: 640px) 100vw, 672px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-base/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-gold">
                      <Play size={24} className="text-[#0a0f1e] ml-1" fill="currentColor" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold">Complete Course</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="emerald">FREE</Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col">
                  <h3 className="font-display text-2xl font-bold text-text-primary mb-2 leading-snug">
                    Trading Complete Course 2026
                  </h3>
                  <p className="text-sm text-gold font-sans font-medium mb-4">Zero to Pro Trader — Beginner to Professional</p>
                  <p className="text-sm text-text-secondary font-sans leading-relaxed mb-6">
                    The complete trading masterclass covering Crypto, Forex, Gold, and Stocks.
                    Learn proven strategies, risk management, live trading examples, and everything
                    you need to go from beginner to professional trader — completely free.
                  </p>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {HIGHLIGHTS.map((h) => (
                      <div key={h.label} className="flex items-center gap-2 text-xs text-text-muted font-sans">
                        <span className="text-gold">{h.icon}</span>
                        {h.label}
                      </div>
                    ))}
                  </div>

                  <LinkButton
                    href={completeCourse.url}
                    variant="gold"
                    size="md"
                    className="w-full justify-center"
                    aria-label="Watch Trading Complete Course 2026 — opens in new tab"
                  >
                    Watch Free Course
                    <ExternalLink size={15} aria-hidden="true" />
                  </LinkButton>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Live session card below if available */}
          {liveCourse && (
            <ScrollReveal delay={0.1}>
              <div className={cn(
                'card-dark rounded-2xl p-5 flex items-center gap-4 mt-5',
                'transition-all duration-350 hover:-translate-y-0.5 hover:shadow-card-hover',
              )}>
                <div className="w-12 h-12 rounded-xl bg-danger-muted border border-danger/20 flex items-center justify-center text-danger shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="font-display text-sm font-semibold text-text-primary">{liveCourse.label}</h4>
                    <Badge variant="default">LIVE</Badge>
                  </div>
                  <p className="text-xs text-text-secondary font-sans truncate">{liveCourse.description}</p>
                </div>
                <LinkButton
                  href={liveCourse.url}
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  aria-label="Watch live trading session"
                >
                  Watch
                  <ExternalLink size={12} aria-hidden="true" />
                </LinkButton>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  )
}
