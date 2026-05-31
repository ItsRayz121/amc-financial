import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Providers } from './providers'
import { SITE_CONFIG } from '@/config/site'
// Run: npm install @vercel/analytics
import { Analytics } from '@vercel/analytics/react'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — Free Financial Education`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [...SITE_CONFIG.keywords],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    url: SITE_CONFIG.url,
    title: `${SITE_CONFIG.name} — Free Financial Education`,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: `${SITE_CONFIG.name} — Free Financial Education` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — Free Financial Education`,
    description: SITE_CONFIG.description,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: SITE_CONFIG.url },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable}`}
      >
        <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Person',
                    name: SITE_CONFIG.person.name,
                    jobTitle: SITE_CONFIG.person.title,
                    description: SITE_CONFIG.description,
                    url: SITE_CONFIG.url,
                    sameAs: [
                      SITE_CONFIG.social.whatsapp,
                      SITE_CONFIG.social.telegram,
                      SITE_CONFIG.social.instagram,
                    ],
                  },
                  {
                    '@type': 'Organization',
                    name: 'AMC Financial',
                    url: SITE_CONFIG.url,
                    description: SITE_CONFIG.description,
                  },
                ],
              }),
            }}
          />
        </head>
        <body className="antialiased">
          <Providers>{children}</Providers>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
