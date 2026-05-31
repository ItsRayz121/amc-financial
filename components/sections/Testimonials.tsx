import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ahmed K.',
    location: 'Lahore, Pakistan',
    platform: 'WhatsApp',
    content: 'Aasim\'s daily setups have completely changed how I approach the markets. Started with zero knowledge — now I understand technical analysis and make informed decisions.',
    initials: 'AK',
  },
  {
    id: 2,
    name: 'Fatima S.',
    location: 'Karachi, Pakistan',
    platform: 'Telegram',
    content: 'The gold trading community is incredible. Real-time analysis, clear entry/exit points, and always honest about risk. This is the best free resource I\'ve found.',
    initials: 'FS',
  },
  {
    id: 3,
    name: 'Muhammad R.',
    location: 'Islamabad, Pakistan',
    platform: 'WhatsApp',
    content: 'I\'ve tried many trading groups but AMC is different — no fake signals, no paid upsells. Just genuine education. The beginner course made everything click.',
    initials: 'MR',
  },
  {
    id: 4,
    name: 'Zara H.',
    location: 'Rawalpindi, Pakistan',
    platform: 'Telegram',
    content: 'Been following for 8 months. My crypto portfolio is up significantly thanks to Aasim\'s market cycle education. The community is supportive and knowledgeable.',
    initials: 'ZH',
  },
  {
    id: 5,
    name: 'Bilal T.',
    location: 'Faisalabad, Pakistan',
    platform: 'WhatsApp',
    content: 'The live trading sessions are priceless. Watching Aasim trade in real-time with real money teaches you more than any paid course ever could.',
    initials: 'BT',
  },
  {
    id: 6,
    name: 'Sara M.',
    location: 'Multan, Pakistan',
    platform: 'Telegram',
    content: 'Finally, financial education in a language I understand. The forex strategies are practical and the risk management lessons have saved me from many bad trades.',
    initials: 'SM',
  },
]

const PLATFORM_COLORS: Record<string, string> = {
  WhatsApp: 'text-[#25D366] bg-[#25D366]/10 border-[#25D366]/20',
  Telegram: 'text-[#2AABEE] bg-[#2AABEE]/10 border-[#2AABEE]/20',
}

export function Testimonials() {
  return (
    <section className="section-padding" aria-labelledby="testimonials-heading">
      <div className="section-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow="What Traders Say"
            title="Trusted by 2,289+ Traders"
            subtitle="Real feedback from our WhatsApp and Telegram community members."
            centered
            className="mb-12"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.id} delay={i * 0.07}>
              <div className="card-dark rounded-2xl p-6 flex flex-col h-full">
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-text-secondary font-sans leading-relaxed flex-1 mb-5">
                  &ldquo;{t.content}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-muted border border-gold/20 flex items-center justify-center text-gold font-display font-bold text-sm shrink-0">
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold font-sans text-text-primary">{t.name}</p>
                    <p className="text-xs text-text-muted font-sans">{t.location}</p>
                  </div>
                  <span className={`ml-auto text-xs font-sans font-medium px-2.5 py-1 rounded-full border shrink-0 ${PLATFORM_COLORS[t.platform]}`}>
                    {t.platform}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
