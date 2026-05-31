import * as React from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glow?: boolean
}

export function Card({ hover, glow, className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card-dark rounded-2xl p-6',
        hover && 'transition-all duration-350 hover:-translate-y-1 hover:shadow-card-hover hover:border-base-elevated cursor-pointer',
        glow && 'glow-gold-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex items-start justify-between gap-4 mb-4', className)} {...props} />
}

export function CardBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mt-5 pt-5 border-t border-base-border', className)} {...props} />
}
