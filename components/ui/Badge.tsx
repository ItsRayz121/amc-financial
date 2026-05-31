import * as React from 'react'
import { cn } from '@/utils/cn'

type BadgeVariant = 'gold' | 'emerald' | 'danger' | 'default' | 'warning' | 'outline'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-gold-muted text-gold border border-gold/20',
  emerald: 'bg-emerald-muted text-emerald border border-emerald/20',
  danger: 'bg-danger-muted text-danger border border-danger/20',
  warning: 'bg-warning-muted text-warning border border-warning/20',
  default: 'bg-base-elevated text-text-secondary border border-base-border',
  outline: 'border border-base-border text-text-secondary',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-sans font-semibold',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
