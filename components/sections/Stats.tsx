import { AnimatedCounter } from '@/components/common/AnimatedCounter'
import { ScrollReveal } from '@/components/common/ScrollReveal'

interface StatItem {
  value: number
  suffix: string
  label: string
}

const DEFAULT_STATS: StatItem[] = [
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 2289, suffix: '+', label: 'Community Members' },
  { value: 4, suffix: '+', label: 'Free Courses' },
  { value: 5, suffix: '', label: 'Partner Platforms' },
]

interface StatsProps {
  stats?: StatItem[]
}

export function Stats({ stats = DEFAULT_STATS }: StatsProps) {
  return (
    <section
      className="border-y border-base-border bg-base-surface"
      aria-label="Key statistics"
    >
      <div className="section-container py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-base-border">
          {stats.map((stat, i) => (
            <ScrollReveal
              key={stat.label}
              delay={i * 0.08}
              direction="none"
              className="flex flex-col items-center text-center px-6 py-4 first:pl-0 last:pr-0"
            >
              <span className="font-display text-display-md font-bold text-gold">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2000 + i * 200} />
              </span>
              <span className="text-sm text-text-muted font-sans mt-1">{stat.label}</span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
