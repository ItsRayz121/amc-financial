import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getCurrentUserWithRole } from '@/lib/clerk/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminLayoutClient } from './AdminLayoutClient'

export const metadata = {
  title: { default: 'Admin', template: '%s | AMC Admin' },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth()

  // Not authenticated — show login page as-is
  if (!userId) return <>{children}</>

  const user = await getCurrentUserWithRole()

  // Authenticated but no admin role — redirect to login
  if (!user) redirect('/admin/login')

  return (
    <AdminLayoutClient role={user.role}>
      <div className="flex min-h-screen bg-base">
        <AdminSidebar />
        <main className="flex-1 min-w-0 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </AdminLayoutClient>
  )
}
