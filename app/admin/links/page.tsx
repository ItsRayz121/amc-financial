import { getAllLinks } from '@/lib/supabase/queries'
import { getCurrentAdminRole } from '@/lib/clerk/auth'
import { LinksClient } from './LinksClient'

export const metadata = { title: 'Links' }

export default async function LinksPage() {
  const [links, role] = await Promise.all([getAllLinks(), getCurrentAdminRole()])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-display-sm font-bold text-text-primary">Links</h1>
        <p className="text-sm text-text-muted font-sans mt-1">
          Manage all site links — communities, courses, affiliates, and support.
        </p>
      </div>
      <LinksClient links={links} role={role ?? 'viewer'} />
    </div>
  )
}
