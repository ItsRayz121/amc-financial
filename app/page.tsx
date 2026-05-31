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
import { getActiveLinks, getAllContent, contentMap } from '@/lib/supabase/queries'

export const revalidate = 3600 // revalidate every hour

export default async function HomePage() {
  const [links, contentItems] = await Promise.all([
    getActiveLinks(),
    getAllContent(),
  ])

  const content = contentMap(contentItems)

  // Parse stats from DB content
  const stats = [
    { value: parseInt(content.stat_years ?? '5'), suffix: '+', label: 'Years of Experience' },
    { value: parseInt(content.stat_members ?? '2289'), suffix: '+', label: 'Community Members' },
    { value: parseInt(content.stat_courses ?? '4'), suffix: '+', label: 'Free Courses' },
    { value: parseInt(content.stat_platforms ?? '5'), suffix: '', label: 'Partner Platforms' },
  ]

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Stats stats={stats} />
        <About />
        <Communities links={links} />
        <Courses links={links} />
        <FreeBanner />
        <Support />
        <Partners links={links} />
      </main>
      <Footer />
    </>
  )
}
