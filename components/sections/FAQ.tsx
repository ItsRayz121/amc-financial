'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { cn } from '@/utils/cn'

const FAQS = [
  {
    q: 'Is everything really free?',
    a: 'Yes — completely free. No paid courses, no membership fees, no hidden charges. We generate revenue through affiliate partnerships with trading platforms, which allows us to keep all educational content free forever.',
  },
  {
    q: 'Do I need to register on this website?',
    a: 'No registration is required on this site. You can browse courses, join communities, and access all content without creating an account. The trading platforms we recommend (Bitget, Binance, etc.) require their own registration with KYC verification.',
  },
  {
    q: 'What markets and assets does Aasim cover?',
    a: 'Aasim covers Forex (currency pairs), Cryptocurrency (Bitcoin, altcoins), Gold (XAU/USD), Stocks, and Mutual Funds. The daily community updates cover all five asset classes.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. All content on this platform is for educational purposes only. Aasim Majeed AMC is a finance educator, not a registered investment advisor. Always conduct your own research and understand the risks before trading.',
  },
  {
    q: 'Are the partner trading platforms safe?',
    a: 'We only partner with established, globally regulated exchanges and brokers — Bitget, Binance, OKX, Bybit, and Exness. All have millions of active users and strong security records. However, all trading involves risk.',
  },
  {
    q: 'I\'m a complete beginner — where do I start?',
    a: 'Start with the Beginner Trading Course, then join the WhatsApp community for daily market updates. The community is welcoming to all levels — many members started with zero knowledge.',
  },
  {
    q: 'How do I contact support?',
    a: 'Contact Husnain Abass on WhatsApp at +92 348 6222404. Support is available Monday to Saturday, 9am–9pm PKT, with an average response time of 2–4 hours.',
  },
  {
    q: 'How often is new content published?',
    a: 'Daily market updates are shared in the WhatsApp and Telegram communities. Live trading sessions are held regularly on YouTube. New course content is added as new modules are completed.',
  },
]

function FAQItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-base-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-semibold font-sans text-text-primary">{q}</span>
        <ChevronDown
          size={16}
          className={cn('text-text-muted shrink-0 transition-transform duration-250', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      {isOpen && (
        <p className="pb-5 text-sm text-text-secondary font-sans leading-relaxed">
          {a}
        </p>
      )}
    </div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-padding bg-base-surface" aria-labelledby="faq-heading">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — header */}
          <ScrollReveal direction="left">
            <SectionHeader
              eyebrow="Got Questions?"
              title="Frequently Asked Questions"
              subtitle="Everything you need to know before joining the community or opening a trading account."
            />
            <div className="mt-8 p-5 rounded-2xl border border-gold/20 bg-gold-muted">
              <p className="text-sm font-sans text-gold font-medium">
                Still have questions?
              </p>
              <p className="text-xs font-sans text-text-secondary mt-1">
                Contact Husnain Abass on WhatsApp — Mon–Sat, 9am–9pm PKT.
              </p>
            </div>
          </ScrollReveal>

          {/* Right — accordion */}
          <ScrollReveal direction="right" delay={0.1}>
            <div className="card-dark rounded-2xl px-6 divide-y-0">
              {FAQS.map((faq, i) => (
                <FAQItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
