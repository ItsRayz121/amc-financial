'use client'

import { Play, BookOpen, TrendingUp, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { isPlaceholderUrl } from '@/config/site'
import { cn } from '@/utils/cn'
import type { SiteLink } from '@/types/database'

interface CoursesProps {
  links: SiteLink[]
}

const COURSE_DETAILS: Record<string, { tags: string[]; longDesc: string }> = {
  course_live: {
    tags: ['Live', 'All Levels', 'Free'],
    longDesc: 'Watch Aasim trade live — real market, real-time decisions, real learning. No scripts, no theory — just live trading.',
  },
  course_beginner: {
    tags: ['Beginner', 'Foundation', 'Free'],
    longDesc: 'Start your trading journey from absolute zero. Learn charts, candlesticks, risk management, and your first trade.',
  },
  course_forex: {
    tags: ['Intermediate', 'Forex', 'Free'],
    longDesc: 'Master currency markets with proven strategies. Learn technical analysis, entry/exit points, and forex fundamentals.',
  },
  course_crypto: {
    tags: ['All Levels', 'Crypto', 'Free'],
    longDesc: 'Navigate crypto markets confidently — from Bitcoin basics to altcoin strategies, DeFi, and market cycle analysis.',
  },
  course_gold: {
    tags: ['Intermediate', 'Gold', 'Free'],
    longDesc: 'Learn to trade the world\'s most trusted safe-haven asset. Technical analysis, fundamentals, and gold market strategies.',
  },
}

function CourseIcon({ courseKey }: { courseKey: string }) {
  if (courseKey === 'course_live') return <Play size={20} aria-hidden="true" />
  if (courseKey === 'course_beginner') return <BookOpen size={20} aria-hidden="true" />
  return <TrendingUp size={20} aria-hidden="true" />
}

function CourseCard({ link, index }: { link: SiteLink; index: number }) {
  const isPlaceholder = isPlaceholderUrl(link.url)
  const details = COURSE_DETAILS[link.key] ?? { tags: ['Free'], longDesc: link.description ?? '' }
  const isLive = link.key === 'course_live'

  return (
    <div
      className={cn(
        'card-dark rounded-2xl overflow-hidden flex flex-col',
        'transition-all duration-350',
        !isPlaceholder && 'hover:-translate-y-1 hover:shadow-card-hover glow-gold-hover',
        isPlaceholder && 'opacity-60'
      )}
    >
      {/* Thumbnail-style header */}
      <div className="relative bg-base-elevated h-40 flex items-center justify-center border-b border-base-border overflow-hidden">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-30 hero-grid"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gold-muted border border-gold/20 flex items-center justify-center text-gold">
            <CourseIcon courseKey={link.key} />
          </div>
          {isLive && (
            <span className="flex items-center gap-1.5 text-xs font-semibold font-sans text-danger bg-danger-muted border border-danger/20 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-danger animate-pulse" aria-hidden="true" />
              LIVE
            </span>
          )}
        </div>
        {/* Course number */}
        <span
          className="absolute top-3 right-3 text-xs font-mono text-text-muted opacity-40"
          aria-hidden="true"
        >
          0{index + 1}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {details.tags.map((tag) => (
            <Badge key={tag} variant={tag === 'Free' ? 'emerald' : 'default'}>
              {tag}
            </Badge>
          ))}
          {isPlaceholder && <Badge variant="warning">Coming Soon</Badge>}
        </div>

        <h3 className="font-display text-lg font-semibold text-text-primary mb-2 leading-snug">
          {link.label}
        </h3>
        <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1 mb-5">
          {details.longDesc}
        </p>

        {!isPlaceholder ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
            aria-label={`Watch ${link.label} — opens in new tab`}
          >
            Watch Free Course
            <ExternalLink size={13} aria-hidden="true" />
          </Button>
        ) : (
          <div className="flex items-center justify-center py-2 px-4 rounded-xl border border-dashed border-base-border text-xs text-text-muted font-sans">
            Link coming soon — update via Admin Panel
          </div>
        )}
      </div>
    </div>
  )
}

export function Courses({ links }: CoursesProps) {
  const courseLinks = links.filter((l) => l.category === 'course')

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courseLinks.map((link, i) => (
            <ScrollReveal key={link.id} delay={i * 0.07}>
              <CourseCard link={link} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
