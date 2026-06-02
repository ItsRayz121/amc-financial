'use client'

import { useState, useEffect } from 'react'
import { Menu, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { ScrollProgress } from '@/components/common/ScrollProgress'
import { NAV_ITEMS, SITE_CONFIG } from '@/config/site'
import { LinkButton } from '@/components/ui/LinkButton'
import { MobileDrawer } from './MobileDrawer'
import { cn } from '@/utils/cn'

const SECTION_IDS = NAV_ITEMS.map((n) => n.href.replace('#', ''))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const activeId = useScrollSpy(SECTION_IDS)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollProgress />
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-350',
          scrolled ? 'glass-nav py-3' : 'py-5 bg-transparent'
        )}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="font-display text-xl sm:text-2xl font-bold tracking-tight"
            aria-label="Aasim Majeed AMC — Home"
          >
            <span className="text-gold">AMC</span>
            <span className="text-text-muted text-base sm:text-lg ml-1">|</span>
            <span className="text-text-primary text-base sm:text-lg ml-1">Financial</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '')
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium font-sans transition-all duration-250',
                    activeId === id
                      ? 'text-gold bg-gold-muted'
                      : 'text-text-secondary hover:text-text-primary hover:bg-base-elevated'
                  )}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Theme toggle — 44px touch target */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-11 h-11 rounded-lg text-text-muted hover:text-text-primary hover:bg-base-elevated transition-all duration-250 flex items-center justify-center"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}

            {/* CTA */}
            <LinkButton
              href={SITE_CONFIG.social.whatsapp}
              variant="gold"
              size="sm"
              className="hidden md:inline-flex"
              aria-label="Join WhatsApp Community — opens in new tab"
            >
              Join Free
            </LinkButton>

            {/* Hamburger — 44px touch target */}
            <button
              className="md:hidden w-11 h-11 rounded-lg text-text-muted hover:text-text-primary hover:bg-base-elevated transition-all duration-250 flex items-center justify-center"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
