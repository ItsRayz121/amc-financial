import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Aasim Majeed AMC — Free Financial Education Platform',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-base">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-gold font-sans mb-10 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Home
        </Link>

        <h1 className="font-display text-4xl font-bold text-text-primary mb-3">Privacy Policy</h1>
        <p className="text-text-muted font-sans text-sm mb-10">Last updated: January 2025</p>

        <div className="prose prose-invert max-w-none space-y-8 font-sans text-text-secondary leading-relaxed">

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">1. Who We Are</h2>
            <p>Aasim Majeed AMC (&ldquo;AMC Financial&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) operates a free financial education platform at this website. We provide trading education, market insights, and community resources at no cost to users.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">2. Information We Collect</h2>
            <p>This website does not require user registration. We may collect:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-text-muted">
              <li>Anonymous usage analytics (page views, clicks) via Vercel Analytics</li>
              <li>Email addresses if you voluntarily subscribe to our newsletter</li>
              <li>Technical data (browser type, device type) for performance optimization</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">3. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-text-muted">
              <li><strong className="text-text-secondary">Vercel Analytics</strong> — anonymous performance tracking</li>
              <li><strong className="text-text-secondary">Clerk</strong> — admin authentication (admin users only)</li>
              <li><strong className="text-text-secondary">Supabase</strong> — database hosting</li>
              <li><strong className="text-text-secondary">Affiliate Partners</strong> (Bitget, Binance, OKX, Bybit, Exness) — when you click partner links, you are subject to their privacy policies</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">4. Affiliate Disclosure</h2>
            <p>Some links on this website are affiliate links. When you register on a partner platform through our links, we may receive a commission. This is how we fund the free educational content. The commission comes at no additional cost to you.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">5. Community Platforms</h2>
            <p>Links to WhatsApp, Telegram, and Instagram communities redirect to third-party platforms. Once you join those communities, their respective privacy policies apply.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">6. Data Retention</h2>
            <p>If you subscribe to our newsletter, your email is stored securely and used only for educational content delivery. You may unsubscribe at any time.</p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-text-primary mb-3">7. Contact</h2>
            <p>For privacy-related questions, contact our support team via WhatsApp at +92 348 6222404.</p>
          </section>
        </div>
      </div>
    </div>
  )
}
