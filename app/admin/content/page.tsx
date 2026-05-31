import { getAllContent } from '@/lib/supabase/queries'
import { getCurrentAdminRole } from '@/lib/clerk/auth'
import { ContentClient } from './ContentClient'

export const metadata = { title: 'Content' }

export default async function ContentPage() {
  const [contentItems, role] = await Promise.all([getAllContent(), getCurrentAdminRole()])

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-display-sm font-bold text-text-primary">Content</h1>
        <p className="text-sm text-text-muted font-sans mt-1">
          Edit site text, headlines, stats, and other content.
        </p>
      </div>
      <ContentClient items={contentItems} role={role ?? 'viewer'} />
    </div>
  )
}
