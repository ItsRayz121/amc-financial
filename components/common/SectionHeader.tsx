import { cn } from '@/utils/cn'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && 'text-center', className)}>
      {eyebrow && (
        <p className="text-xs font-semibold font-sans uppercase tracking-widest text-gold mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-display-md font-bold text-text-primary leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base text-text-secondary font-sans leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
