import { getAllSubscribers } from '@/lib/supabase/queries'
import { Mail, Phone, Users } from 'lucide-react'

export const metadata = { title: 'Subscribers' }

export default async function SubscribersPage() {
  const subscribers = await getAllSubscribers()

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-display-sm font-bold text-text-primary">Subscribers</h1>
          <p className="text-sm text-text-muted font-sans mt-1">
            Newsletter signups from the website
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-muted border border-gold/20">
          <Users size={15} className="text-gold" />
          <span className="text-sm font-semibold font-sans text-gold">{subscribers.length} total</span>
        </div>
      </div>

      <div className="card-dark rounded-2xl overflow-hidden">
        {subscribers.length === 0 ? (
          <p className="text-sm text-text-muted font-sans text-center py-16">
            No subscribers yet. They will appear here once someone signs up.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Newsletter subscribers">
              <thead>
                <tr className="border-b border-base-border">
                  {['Email', 'Phone', 'Date'].map((h) => (
                    <th
                      key={h}
                      className="text-left py-3 px-5 text-xs font-semibold font-sans text-text-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub.id} className="border-b border-base-border/50 hover:bg-base-elevated/40 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-2">
                        <Mail size={13} className="text-text-muted shrink-0" aria-hidden="true" />
                        <span className="text-sm font-sans text-text-primary">{sub.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-5">
                      {sub.phone ? (
                        <div className="flex items-center gap-2">
                          <Phone size={13} className="text-text-muted shrink-0" aria-hidden="true" />
                          <span className="text-sm font-sans text-text-secondary">{sub.phone}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-text-muted font-sans">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 text-xs font-sans text-text-muted">
                      {new Date(sub.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
