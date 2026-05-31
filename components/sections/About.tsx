import Image from 'next/image'
import { Target, Eye, Award } from 'lucide-react'
import { ScrollReveal } from '@/components/common/ScrollReveal'
import { SectionHeader } from '@/components/common/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import { SITE_CONFIG } from '@/config/site'

const CREDENTIALS = ['5 Years Experience', 'Forex', 'Crypto', 'Gold', 'Stocks', 'Mutual Funds']

export function About() {
  return (
    <section id="about" className="section-padding" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — portrait */}
          <ScrollReveal direction="left" delay={0}>
            <div className="flex flex-col items-center lg:items-start gap-6">
              <div className="relative">
                {/* Decorative ring */}
                <div
                  className="absolute -inset-3 rounded-[2rem] opacity-30"
                  aria-hidden="true"
                  style={{
                    background: 'conic-gradient(from 0deg at 50% 50%, #c9a84c, transparent, #c9a84c, transparent)',
                  }}
                />
                {/* Portrait */}
                <div className="relative w-72 h-80 md:w-80 md:h-[22rem] rounded-[1.5rem] overflow-hidden border border-base-border shadow-card-hover">
                  <Image
                    src="/images/aasim-portrait.jpg"
                    alt="Aasim Majeed AMC — Financial Consultant & Finance Educator"
                    fill
                    sizes="(max-width: 768px) 288px, 320px"
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Floating experience badge */}
                <div className="absolute -bottom-4 -right-4 bg-gold rounded-2xl px-4 py-3 shadow-gold">
                  <p className="text-base font-display font-bold text-base leading-none">5+</p>
                  <p className="text-xs font-sans font-semibold text-base mt-0.5">Years Exp.</p>
                </div>
              </div>

              {/* Credential badges */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {CREDENTIALS.map((cred) => (
                  <Badge key={cred} variant="default">
                    {cred}
                  </Badge>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — content */}
          <ScrollReveal direction="right" delay={0.15}>
            <div>
              <SectionHeader
                eyebrow="About Aasim Majeed AMC"
                title="Leading Finance Educator & Market Analyst"
                className="mb-6"
              />

              <p className="text-base text-text-secondary font-sans leading-relaxed mb-8">
                {SITE_CONFIG.person.name} is a leading finance educator sharing expert insights on
                crypto, stocks, forex, and mutual funds. He delivers daily updates on trading
                setups, market trends, and profitable opportunities — with smart investing
                strategies, SIP planning, and in-depth market analysis.
              </p>

              <p className="text-base text-text-secondary font-sans leading-relaxed mb-8">
                Whether you&apos;re a beginner or advanced trader, Aasim&apos;s mission is to help
                you grow wealth with practical knowledge and build consistent income streams.
              </p>

              {/* Mission & Vision cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="card-dark rounded-xl p-5 flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center">
                    <Target size={18} className="text-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-sans text-text-primary mb-1">Mission</p>
                    <p className="text-xs text-text-secondary font-sans leading-relaxed">
                      Democratize financial education. Make expert trading knowledge accessible to
                      everyone — completely free.
                    </p>
                  </div>
                </div>

                <div className="card-dark rounded-xl p-5 flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-gold-muted flex items-center justify-center">
                    <Eye size={18} className="text-gold" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold font-sans text-text-primary mb-1">Vision</p>
                    <p className="text-xs text-text-secondary font-sans leading-relaxed">
                      A financially literate community where every individual can make informed
                      decisions and achieve financial freedom.
                    </p>
                  </div>
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-emerald/20 bg-emerald-muted">
                <Award size={20} className="text-emerald shrink-0" aria-hidden="true" />
                <p className="text-sm font-sans text-emerald font-medium">
                  2,289+ students and traders trust AMC&apos;s guidance daily
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
