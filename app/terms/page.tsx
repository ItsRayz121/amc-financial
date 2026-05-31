import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Aasim Majeed AMC — Free Financial Education Platform',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold font-sans mb-10 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <h1 className="font-display text-4xl font-bold text-text-primary mb-3">Terms of Service</h1>
        <p className="text-text-muted font-sans text-sm mb-10">Last updated: January 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 font-sans text-text-secondary leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. Educational Content Only</h2>
            <p>All content on this platform — including courses, market analysis, trading setups, and community discussions — is provided for <strong className="text-text-secondary">educational purposes only</strong>. Nothing on this platform constitutes financial advice, investment advice, or a recommendation to buy or sell any asset.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3" id="disclaimer">2. Risk Disclaimer</h2>
            <p className="text-warning/80 font-medium">Trading financial instruments including cryptocurrency, forex, gold, and stocks involves significant risk of loss. You may lose some or all of your invested capital. Past performance is not indicative of future results. Only trade with money you can afford to lose.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3" id="affiliates">3. Affiliate Relationships</h2>
            <p>This platform maintains affiliate relationships with trading platforms including Bitget, Binance, OKX, Bybit, and Exness. When you register through our affiliate links, we earn a commission from the respective platform. This does not affect the price you pay or the service you receive.</p>
            <p className="mt-2">We only partner with established, reputable exchanges and brokers. However, we make no guarantees about the services provided by affiliate partners.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Free Services</h2>
            <p>All educational content, community access, and platform features are provided free of charge. We do not charge for courses, community membership, or market analysis.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. No Regulatory Advice</h2>
            <p>Aasim Majeed AMC is not a registered investment advisor, broker, or financial institution. The educational content is not subject to regulatory oversight as financial advice.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Intellectual Property</h2>
            <p>All content on this platform, including courses, analysis, and branding, is the intellectual property of Aasim Majeed AMC. Reproduction without permission is prohibited.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Contact</h2>
            <p>For questions about these terms, contact us via WhatsApp at +92 348 6222404.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
