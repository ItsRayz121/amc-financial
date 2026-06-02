import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { Communities } from '@/components/sections/Communities'
import { Courses } from '@/components/sections/Courses'
import { FreeBanner } from '@/components/sections/FreeBanner'
import { Support } from '@/components/sections/Support'
import { Partners } from '@/components/sections/Partners'
import { Testimonials } from '@/components/sections/Testimonials'
import { EmailCapture } from '@/components/sections/EmailCapture'
import { FAQ } from '@/components/sections/FAQ'
import { MobileStickyBar } from '@/components/layout/MobileStickyBar'
import { getActiveLinks, getAllContent, contentMap } from '@/lib/supabase/queries'
import type { SiteLink } from '@/types/database'

export const revalidate = 3600 // revalidate every hour

const DEFAULT_CONTENT: Record<string, string> = {
  hero_headline: 'Master the Markets. Build Your Wealth.',
  hero_subheadline: 'Free trading education, live market insights, and thriving communities — by Aasim Majeed AMC, Financial Consultant with 5 years of experience.',
  about_bio: 'Aasim Majeed AMC is a leading finance educator sharing expert insights on crypto, stocks, forex, and mutual funds.',
  about_mission: 'Democratize financial education. Make expert trading knowledge accessible to everyone — completely free.',
  about_vision: 'A financially literate community where every individual can make informed investment decisions and achieve financial freedom.',
  stat_years: '5',
  stat_members: '10000',
  stat_courses: '4',
  stat_platforms: '5',
}

export default async function HomePage() {
  let links: SiteLink[] = []
  let content: Record<string, string> = DEFAULT_CONTENT

  try {
    const [linkData, contentItems] = await Promise.all([
      getActiveLinks(),
      getAllContent(),
    ])
    links = linkData
    if (contentItems.length > 0) content = { ...DEFAULT_CONTENT, ...contentMap(contentItems) }
  } catch (err) {
    console.error('Failed to fetch page data, using defaults:', err)
  }

  // Parse stats from DB content
  const stats = [
    { value: parseInt(content.stat_years ?? '5'), suffix: '+', label: 'Years of Experience' },
    { value: parseInt(content.stat_members ?? '10000'), suffix: '+', label: 'Community Members' },
    { value: parseInt(content.stat_courses ?? '4'), suffix: '+', label: 'Free Courses' },
    { value: parseInt(content.stat_platforms ?? '5'), suffix: '', label: 'Partner Platforms' },
  ]

  // Formatted member count shared across Hero, Testimonials, and MobileStickyBar
  const memberCount = parseInt(content.stat_members ?? '10000').toLocaleString()

  return (
    <>
      <Header />
      <main id="main">
        <Hero content={content} />
        <Stats stats={stats} />
        <About content={content} />
        <Testimonials />
        <Communities links={links} />
        <Courses links={links} />
        <FreeBanner />
        <EmailCapture />
        <Partners links={links} />
        <FAQ />
        <Support />
        <MobileStickyBar memberCount={memberCount} />
      </main>
      <Footer />
    </>
  )
}
