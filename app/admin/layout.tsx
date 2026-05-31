import { redirect } from 'next/navigation'
import { getCurrentUserWithRole } from '@/lib/clerk/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminLayoutClient } from './AdminLayoutClient'

export const metadata = {
  title: { default: 'Admin', template: '%s | AMC Admin' },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserWithRole()

  if (!user) {
    redirect('/admin/login')
  }

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
