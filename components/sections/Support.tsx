'use client'

import { MessageCircle, Clock, HelpCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Button } from '@/components/ui/Button'
import { SITE_CONFIG } from '@/config/site'

const SUPPORT_ITEMS = [
  'Trading questions & strategy help',
  'Course guidance & learning path',
  'Account setup for partner platforms',
  'Community access help',
  'Market analysis and trade setups',
  'Beginner onboarding support',
]

export function Support() {
  return (
    <section id="support" className="section-padding bg-base-surface" aria-labelledby="support-heading">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Support Center"
            title="Need Help? We're Here For You."
            subtitle="Our support team is ready to answer your questions about trading, courses, or getting started."
            className="mb-12"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — copy */}
          <ScrollReveal delay={0.1}>
            <div>
              <p className="text-base text-text-secondary font-sans leading-relaxed mb-8">
                Whether you&apos;re just starting out or an experienced trader, our support team is
                here to help you every step of the way. No question is too basic or too advanced.
              </p>

              <h3 className="text-sm font-semibold font-sans text-text-primary uppercase tracking-wider mb-4">
                What we can help with:
              </h3>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SUPPORT_ITEMS.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary font-sans">
                    <HelpCircle size={14} className="text-gold shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Right — WhatsApp support card */}
          <ScrollReveal delay={0.2}>
            <div className="card-dark rounded-2xl p-8 border border-[#25D366]/20 glow-gold-hover">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <MessageCircle size={28} className="text-[#25D366]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold text-text-primary">
                    WhatsApp Support
                  </h3>
                  <p className="text-sm text-text-secondary font-sans">Direct human support</p>
                </div>
              </div>

              {/* Agent info */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-base-elevated border border-base-border mb-6">
                <div className="w-10 h-10 rounded-full bg-gold-muted flex items-center justify-center text-gold font-display font-bold shrink-0">
                  {SITE_CONFIG.support.agentName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold font-sans text-text-primary">
                    {SITE_CONFIG.support.agentName}
                  </p>
                  <p className="text-xs text-text-muted font-sans">{SITE_CONFIG.support.phone}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-xs text-emerald font-sans font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" aria-hidden="true" />
                  Online
                </div>
              </div>

              {/* Response time */}
              <div className="flex items-center gap-2 text-sm text-text-muted font-sans mb-6">
                <Clock size={14} className="shrink-0 text-gold" aria-hidden="true" />
                Typically responds within a few hours
              </div>

              <Button
                variant="whatsapp"
                size="lg"
                className="w-full"
                onClick={() =>
                  window.open(SITE_CONFIG.support.whatsappUrl, '_blank', 'noopener,noreferrer')
                }
                aria-label="Chat with Husnain Abass on WhatsApp — opens in new tab"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.49"/>
                </svg>
                Chat on WhatsApp
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
