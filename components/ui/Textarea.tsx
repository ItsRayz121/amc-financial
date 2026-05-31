import * as React from 'react'
import { cn } from '@/utils/cn'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  showCount?: boolean
  maxLength?: number
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, showCount, maxLength, className, id, value, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    const charCount = typeof value === 'string' ? value.length : 0

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium font-sans text-text-secondary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          maxLength={maxLength}
          className={cn(
            'w-full bg-base-elevated border border-base-border rounded-xl px-4 py-3',
            'text-sm font-sans text-text-primary placeholder:text-text-muted',
            'transition-colors duration-250 resize-y min-h-[100px]',
            'focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-danger focus:border-danger focus:ring-danger',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        <div className="flex justify-between items-center">
          {error ? (
            <p className="text-xs text-danger font-sans" role="alert">{error}</p>
          ) : hint ? (
            <p className="text-xs text-text-muted font-sans">{hint}</p>
          ) : (
            <span />
          )}
          {showCount && maxLength && (
            <span className={cn(
              'text-xs font-sans tabular-nums',
              charCount > maxLength * 0.9 ? 'text-warning' : 'text-text-muted'
            )}>
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
