import { redirect } from 'next/navigation'
import { getCurrentAdminRole } from '@/lib/clerk/auth'
import { getRecentActivity } from '@/lib/supabase/queries'
import { SettingsClient } from './SettingsClient'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const role = await getCurrentAdminRole()

  if (role !== 'super_admin') {
    redirect('/admin/dashboard')
  }

  const activity = await getRecentActivity(50)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-display-sm font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-muted font-sans mt-1">
          Site settings, cache revalidation, and full audit log.
        </p>
      </div>
      <SettingsClient activity={activity} />
    </div>
  )
}
