'use client'

import { ExternalLink, TrendingUp, BarChart2, Activity, BarChart, DollarSign } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { LinkButton } from '@/components/ui/LinkButton'
import { isPlaceholderUrl } from '@/config/site'
import { cn } from '@/utils/cn'
import type { SiteLink } from '@/types/database'

interface PartnersProps {
  links: SiteLink[]
}

const PARTNER_ICONS: Record<string, React.ReactNode> = {
  affiliate_bitget: <BarChart2 size={24} aria-hidden="true" />,
  affiliate_okx: <Activity size={24} aria-hidden="true" />,
  affiliate_binance: <TrendingUp size={24} aria-hidden="true" />,
  affiliate_bybit: <BarChart size={24} aria-hidden="true" />,
  affiliate_exness: <DollarSign size={24} aria-hidden="true" />,
}

const PARTNER_SUBTITLES: Record<string, string> = {
  affiliate_bitget: 'Crypto Derivatives',
  affiliate_okx: 'Crypto Exchange',
  affiliate_binance: 'Crypto Exchange',
  affiliate_bybit: 'Derivatives Platform',
  affiliate_exness: 'Forex Broker',
}

const PARTNER_TRUST: Record<string, { regulation: string; users: string }> = {
  affiliate_bitget: { regulation: 'Licensed Exchange', users: '25M+ Users' },
  affiliate_okx: { regulation: 'Licensed Exchange', users: '50M+ Users' },
  affiliate_binance: { regulation: 'Licensed Exchange', users: '170M+ Users' },
  affiliate_bybit: { regulation: 'Licensed Exchange', users: '30M+ Users' },
  affiliate_exness: { regulation: 'FCA/CySEC Regulated', users: '500K+ Clients' },
}

function PartnerCard({ link }: { link: SiteLink }) {
  const icon = PARTNER_ICONS[link.key] ?? <BarChart2 size={24} aria-hidden="true" />
  const subtitle = PARTNER_SUBTITLES[link.key] ?? 'Trading Platform'
  const isBitget = link.key === 'affiliate_bitget'
  const isExness = link.key === 'affiliate_exness'

  return (
    <div
      className={cn(
        'card-dark rounded-2xl p-6 flex flex-col',
        'transition-all duration-350',
        'hover:-translate-y-1 hover:shadow-card-hover glow-gold-hover',
        (isBitget || isExness) && 'ring-1 ring-gold/20'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gold-muted border border-gold/20 flex items-center justify-center text-gold shrink-0">
          {icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {isBitget && <Badge variant="gold">Recommended</Badge>}
          {isExness && <Badge variant="gold">$10K Demo</Badge>}
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-text-primary mb-0.5">{link.label}</h3>
      <p className="text-xs text-text-muted font-sans mb-3">{subtitle}</p>

      {PARTNER_TRUST[link.key] && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="text-xs font-sans text-emerald bg-emerald-muted border border-emerald/20 px-2 py-0.5 rounded-full">
            {PARTNER_TRUST[link.key].regulation}
          </span>
          <span className="text-xs font-sans text-text-muted bg-base-elevated border border-base-border px-2 py-0.5 rounded-full">
            {PARTNER_TRUST[link.key].users}
          </span>
        </div>
      )}

      <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1 mb-5">
        {link.description}
      </p>

      <LinkButton
        href={link.url}
        variant="outline"
        size="sm"
        className="w-full justify-center"
        aria-label={`Open free account at ${link.label} — opens in new tab`}
      >
        Open Free Account
        <ExternalLink size={13} aria-hidden="true" />
      </LinkButton>
    </div>
  )
}

export function Partners({ links }: PartnersProps) {
  const affiliateLinks = links
    .filter((l) => l.category === 'affiliate')
    .filter((l) => !isPlaceholderUrl(l.url))

  return (
    <section id="partners" className="section-padding" aria-labelledby="partners-heading">
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <SectionHeader
              eyebrow="Partnered With"
              title="Open Your Trading Account"
              subtitle="Trade with our trusted partner platforms. All links are affiliate — we earn a commission at no cost to you."
            />
          </div>
        </ScrollReveal>

        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-warning/5 border border-warning/20 mb-8">
          <svg className="w-4 h-4 text-warning shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
          </svg>
          <p className="text-xs text-text-muted font-sans leading-relaxed">
            The platforms below are affiliate partners — we earn a commission when you register, at no cost to you. This supports free education for everyone.{' '}
            <a href="/terms#affiliates" className="text-gold hover:text-gold-light underline underline-offset-2 transition-colors">
              Learn more
            </a>
          </p>
        </div>

        <div className={cn(
          'grid gap-5',
          affiliateLinks.length <= 3
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'
        )}>
          {affiliateLinks.map((link, i) => (
            <ScrollReveal key={link.id} delay={i * 0.07}>
              <PartnerCard link={link} />
            </ScrollReveal>
          ))}
        </div>

        {/* Disclaimer */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 p-4 rounded-xl border border-base-border bg-base-surface text-center">
            <p className="text-xs text-text-muted font-sans">
              ⚠️ Trading involves significant risk of loss. Educational purposes only. Not financial advice.
              Affiliate links support this free educational platform.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
