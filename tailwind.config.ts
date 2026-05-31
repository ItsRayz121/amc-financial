import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base backgrounds
        base: {
          DEFAULT: '#0a0f1e',
          surface: '#111827',
          elevated: '#1a2234',
          border: '#1f2d47',
          'border-subtle': '#162033',
        },
        // Light mode
        light: {
          DEFAULT: '#f8f9fb',
          surface: '#ffffff',
          elevated: '#f1f3f7',
          border: '#e2e8f0',
          'border-subtle': '#edf2f7',
        },
        // Text
        text: {
          primary: '#f1f5f9',
          secondary: '#94a3b8',
          muted: '#64748b',
          inverse: '#0f172a',
          'light-primary': '#0f172a',
          'light-secondary': '#475569',
          'light-muted': '#94a3b8',
        },
        // Accent — refined gold
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e2c56e',
          dark: '#a8873a',
          muted: 'rgba(201,168,76,0.15)',
          'muted-hover': 'rgba(201,168,76,0.25)',
        },
        // Status
        emerald: {
          DEFAULT: '#10b981',
          light: '#34d399',
          muted: 'rgba(16,185,129,0.15)',
        },
        danger: {
          DEFAULT: '#ef4444',
          light: '#f87171',
          muted: 'rgba(239,68,68,0.15)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          muted: 'rgba(245,158,11,0.15)',
        },
        // Platform brand colors
        whatsapp: '#25D366',
        telegram: '#2AABEE',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderRadius: {
        '2xs': '0.125rem',
        xs: '0.25rem',
        sm: '0.375rem',
        DEFAULT: '0.5rem',
        md: '0.625rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.4), 0 1px 2px -1px rgba(0,0,0,0.4)',
        'card-hover': '0 10px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.4)',
        'gold': '0 0 20px rgba(201,168,76,0.2)',
        'gold-strong': '0 0 30px rgba(201,168,76,0.35)',
        'inner-subtle': 'inset 0 1px 0 rgba(255,255,255,0.05)',
        'glow-emerald': '0 0 20px rgba(16,185,129,0.2)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'counter': 'counter 2s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a84c 0%, #e2c56e 50%, #c9a84c 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0a0f1e 0%, #111827 100%)',
        'hero-grid': 'radial-gradient(circle at 1px 1px, rgba(201,168,76,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
}

export default config
