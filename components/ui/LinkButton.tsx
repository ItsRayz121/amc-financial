import { cn } from '@/utils/cn'
import type { AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'gold' | 'outline' | 'ghost' | 'whatsapp' | 'telegram'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  gold: 'bg-gold text-[#0a0f1e] font-semibold hover:bg-gold-light border border-gold shadow-gold',
  outline: 'border border-base-border text-text-secondary hover:text-text-primary hover:border-gold/40 hover:bg-base-elevated',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-base-elevated',
  whatsapp: 'bg-[#25D366] text-white font-semibold hover:bg-[#20b858] border border-[#25D366]',
  telegram: 'bg-[#2AABEE] text-white font-semibold hover:bg-[#1d96d9] border border-[#2AABEE]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function LinkButton({
  variant = 'outline',
  size = 'md',
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center justify-center font-sans transition-all duration-250 cursor-pointer select-none',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}
