import { ExternalLink, Users, Zap } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { isPlaceholderUrl } from '@/config/site'
import { cn } from '@/utils/cn'
import type { SiteLink } from '@/types/database'

interface CommunitiesProps {
  links: SiteLink[]
}

function getPlatformStyles(key: string) {
  if (key.includes('whatsapp'))
    return {
      iconBg: 'bg-[#25D366]/10',
      iconColor: 'text-[#25D366]',
      borderHover: 'hover:border-[#25D366]/30',
      btnVariant: 'whatsapp' as const,
      memberBadge: '2,289+ Members',
    }
  if (key.includes('telegram'))
    return {
      iconBg: 'bg-[#2AABEE]/10',
      iconColor: 'text-[#2AABEE]',
      borderHover: 'hover:border-[#2AABEE]/30',
      btnVariant: 'telegram' as const,
      memberBadge: null,
    }
  if (key.includes('instagram'))
    return {
      iconBg: 'bg-[#E1306C]/10',
      iconColor: 'text-[#E1306C]',
      borderHover: 'hover:border-[#E1306C]/30',
      btnVariant: 'outline' as const,
      memberBadge: null,
    }
  return {
    iconBg: 'bg-gold-muted',
    iconColor: 'text-gold',
    borderHover: 'hover:border-gold/30',
    btnVariant: 'outline' as const,
    memberBadge: null,
  }
}

function PlatformIcon({ communityKey }: { communityKey: string }) {
  if (communityKey.includes('whatsapp'))
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49"/>
      </svg>
    )
  if (communityKey.includes('telegram'))
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    )
  if (communityKey.includes('instagram'))
    return (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  return <Zap className="w-6 h-6" aria-hidden="true" />
}

function CommunityCard({ link }: { link: SiteLink }) {
  const isPlaceholder = isPlaceholderUrl(link.url)
  const styles = getPlatformStyles(link.key)

  const cardContent = (
    <div
      className={cn(
        'card-dark rounded-2xl p-6 flex flex-col h-full',
        'transition-all duration-350',
        !isPlaceholder && 'hover:-translate-y-1 hover:shadow-card-hover glow-gold-hover',
        styles.borderHover,
        isPlaceholder && 'opacity-60'
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center shrink-0', styles.iconBg, styles.iconColor)}>
          <PlatformIcon communityKey={link.key} />
        </div>
        {styles.memberBadge && (
          <Badge variant="emerald">
            <Users size={11} aria-hidden="true" />
            {styles.memberBadge}
          </Badge>
        )}
        {isPlaceholder && <Badge variant="warning">Coming Soon</Badge>}
      </div>

      <h3 className="font-display text-lg font-semibold text-text-primary mb-2">{link.label}</h3>
      <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1 mb-5">
        {link.description}
      </p>

      {!isPlaceholder && (
        <Button
          variant={styles.btnVariant}
          size="sm"
          className="w-full"
          onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')}
          aria-label={`Join ${link.label} — opens in new tab`}
        >
          Join {link.label.split(' ')[0]}
          <ExternalLink size={14} aria-hidden="true" />
        </Button>
      )}
    </div>
  )

  return cardContent
}

export function Communities({ links }: CommunitiesProps) {
  const communityLinks = links.filter((l) => l.category === 'community').slice(0, 4)

  return (
    <section id="communities" className="section-padding bg-base-surface" aria-labelledby="communities-heading">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Free Communities"
            title="Join Our Free Trading Communities"
            subtitle="Real-time insights, signals, and support — completely free. No fees, no registration required."
            centered
            className="mb-12"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {communityLinks.map((link, i) => (
            <ScrollReveal key={link.id} delay={i * 0.08}>
              <CommunityCard link={link} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
