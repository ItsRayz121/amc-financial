'use client'

import { ExternalLink, TrendingUp, BarChart2, Activity, BarChart, DollarSign } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
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

function PartnerCard({ link }: { link: SiteLink }) {
  const isPlaceholder = isPlaceholderUrl(link.url)
  const icon = PARTNER_ICONS[link.key] ?? <BarChart2 size={24} aria-hidden="true" />
  const subtitle = PARTNER_SUBTITLES[link.key] ?? 'Trading Platform'
  const isBitget = link.key === 'affiliate_bitget'

  return (
    <div
      className={cn(
        'card-dark rounded-2xl p-6 flex flex-col',
        'transition-all duration-350',
        !isPlaceholder && 'hover:-translate-y-1 hover:shadow-card-hover glow-gold-hover',
        isPlaceholder && 'opacity-55',
        isBitget && 'ring-1 ring-gold/20'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="w-12 h-12 rounded-xl bg-gold-muted border border-gold/20 flex items-center justify-center text-gold shrink-0">
          {icon}
        </div>
        <div className="flex flex-col items-end gap-1.5">
          {isBitget && <Badge variant="gold">Recommended</Badge>}
          {isPlaceholder && <Badge variant="warning">Coming Soon</Badge>}
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-text-primary mb-0.5">{link.label}</h3>
      <p className="text-xs text-text-muted font-sans mb-3">{subtitle}</p>
      <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1 mb-5">
        {link.description}
      </p>

      {!isPlaceholder ? (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          aria-label={`Open free account at ${link.label} — opens in new tab`}
        >
          Open Free Account
          <ExternalLink size={13} aria-hidden="true" />
        </Button>
      ) : (
        <div className="flex items-center justify-center py-2 px-4 rounded-xl border border-dashed border-base-border text-xs text-text-muted font-sans">
          Link coming soon
        </div>
      )}
    </div>
  )
}

export function Partners({ links }: PartnersProps) {
  const affiliateLinks = links.filter((l) => l.category === 'affiliate')

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
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
