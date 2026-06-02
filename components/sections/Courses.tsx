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

  if (!completeCourse) return null

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
          <ScrollReveal>
            <div className={cn(
              'card-dark rounded-2xl overflow-hidden flex flex-col',
              'transition-all duration-350',
              'hover:-translate-y-1 hover:shadow-card-hover glow-gold-hover',
              'ring-1 ring-gold/20',
            )}>
              {/* Thumbnail */}
              <div className="relative w-full border-b border-base-border bg-base-elevated overflow-hidden">
                <Image
                  src="/images/course-thumbnail.jpg"
                  alt="Trading Complete Course 2026 — Zero to Pro Trader"
                  width={1280}
                  height={720}
                  sizes="(max-width: 640px) 100vw, 672px"
                  className="w-full h-auto block"
                  priority
                />
                {/* overlay */}
                <div className="absolute inset-0 bg-base/30 flex items-center justify-center">
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
        </div>
      </div>
    </section>
  )
}
