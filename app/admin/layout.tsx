import { getCurrentUserWithRole } from '@/lib/clerk/auth'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminLayoutClient } from './AdminLayoutClient'

export const metadata = {
  title: { default: 'Admin', template: '%s | AMC Admin' },
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUserWithRole()

  // Not authenticated — render children only (login page renders itself)
  // Middleware handles redirecting unauthenticated users away from protected routes
  if (!user) {
    return <>{children}</>
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
