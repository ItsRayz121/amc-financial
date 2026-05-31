'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'

type Variant = 'gold' | 'outline' | 'ghost' | 'danger' | 'whatsapp' | 'telegram'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  asChild?: boolean
}

const variantClasses: Record<Variant, string> = {
  gold: 'bg-gold text-base font-semibold hover:bg-gold-light active:bg-gold-dark shadow-md hover:shadow-gold transition-all duration-250',
  outline: 'border border-gold text-gold font-semibold hover:bg-gold-muted active:bg-gold-muted-hover transition-all duration-250',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-base-elevated transition-all duration-250',
  danger: 'bg-danger text-white font-semibold hover:bg-danger-light transition-all duration-250',
  whatsapp: 'bg-whatsapp text-white font-semibold hover:brightness-110 transition-all duration-250 shadow-md',
  telegram: 'bg-telegram text-white font-semibold hover:brightness-110 transition-all duration-250 shadow-md',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-7 py-3.5 text-base rounded-xl',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'gold', size = 'md', loading, className, children, disabled, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-sans font-medium cursor-pointer select-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-base',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
