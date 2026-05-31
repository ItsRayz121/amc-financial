import { redirect } from 'next/navigation'
import { getAllAdmins } from '@/lib/supabase/queries'
import { getCurrentAdminRole as getRole } from '@/lib/clerk/auth'
import { TeamClient } from './TeamClient'

export const metadata = { title: 'Team' }

export default async function TeamPage() {
  const role = await getRole()

  if (role !== 'super_admin') {
    redirect('/admin/dashboard')
  }

  const admins = await getAllAdmins()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-display-sm font-bold text-text-primary">Team</h1>
        <p className="text-sm text-text-muted font-sans mt-1">
          Manage admin access. Invite team members, change roles, or revoke access.
        </p>
      </div>
      <TeamClient admins={admins} />
    </div>
  )
}
