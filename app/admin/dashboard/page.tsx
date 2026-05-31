import { Link2, FileText, Users, Clock } from 'lucide-react'
import { getAllLinks, getAllContent, getAllAdmins, getRecentActivity } from '@/lib/supabase/queries'
import { getCurrentUserWithRole } from '@/lib/clerk/auth'
import { Badge } from '@/components/ui/Badge'
import { ROLE_LABELS } from '@/config/roles'
import type { AdminRole } from '@/types/database'

export const metadata = { title: 'Dashboard' }

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType
  label: string
  value: number | string
  color: string
}) {
  return (
    <div className="card-dark rounded-2xl p-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-text-muted font-sans">{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={18} aria-hidden="true" />
        </div>
      </div>
      <p className="font-display text-display-sm font-bold text-text-primary">{value}</p>
    </div>
  )
}

export default async function DashboardPage() {
  const [user, links, contentItems, admins, activity] = await Promise.all([
    getCurrentUserWithRole(),
    getAllLinks(),
    getAllContent(),
    getAllAdmins(),
    getRecentActivity(5),
  ])

  const activeLinks = links.filter((l) => l.is_active).length
  const lastUpdated = links.sort(
    (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  )[0]

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-display-sm font-bold text-text-primary">Dashboard</h1>
          <p className="text-sm text-text-muted font-sans mt-1">
            Welcome back, {user?.firstName ?? 'Admin'}
          </p>
        </div>
        {user?.role && (
          <Badge variant="gold">{ROLE_LABELS[user.role as AdminRole]}</Badge>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={Link2}
          label="Active Links"
          value={activeLinks}
          color="bg-gold-muted text-gold"
        />
        <StatCard
          icon={FileText}
          label="Content Items"
          value={contentItems.length}
          color="bg-emerald-muted text-emerald"
        />
        <StatCard
          icon={Users}
          label="Admin Team"
          value={admins.length}
          color="bg-[#2AABEE]/10 text-[#2AABEE]"
        />
        <StatCard
          icon={Clock}
          label="Links (Total)"
          value={links.length}
          color="bg-base-elevated text-text-muted"
        />
      </div>

      {/* Recent activity */}
      <div className="card-dark rounded-2xl p-6">
        <h2 className="font-display text-lg font-semibold text-text-primary mb-5">
          Recent Activity
        </h2>

        {activity.length === 0 ? (
          <p className="text-sm text-text-muted font-sans text-center py-8">
            No activity yet. Changes made via the admin panel will appear here.
          </p>
        ) : (
          <ul className="flex flex-col divide-y divide-base-border">
            {activity.map((entry) => (
              <li key={entry.id} className="py-3 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-sans text-text-primary">
                    <span className="text-gold font-medium">{entry.action}</span>
                    {' '}
                    <span className="text-text-secondary">{entry.resource}</span>
                    {entry.resource_id && (
                      <span className="text-text-muted"> ({entry.resource_id})</span>
                    )}
                  </p>
                  <p className="text-xs text-text-muted font-sans mt-0.5">{entry.email ?? entry.clerk_user_id}</p>
                </div>
                <time
                  className="text-xs text-text-muted font-sans shrink-0"
                  dateTime={entry.created_at}
                >
                  {new Date(entry.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
