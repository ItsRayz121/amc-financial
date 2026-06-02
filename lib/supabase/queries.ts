import { createClient as createSupabaseClient, type SupabaseClient } from '@supabase/supabase-js'
import type { SiteLink, SiteContent, AdminRoleRecord, AdminActivity, SiteLinkCategory, NewsletterSubscriber } from '@/types/database'

type AnySupabaseClient = SupabaseClient<any>

let _public: AnySupabaseClient | null = null
let _admin: AnySupabaseClient | null = null

function publicClient(): AnySupabaseClient {
  if (!_public) {
    _public = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _public
}

function adminClient(): AnySupabaseClient {
  if (!_admin) {
    _admin = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  }
  return _admin
}

// ─── Public queries ───────────────────────────────────────────────────────────

export async function getActiveLinks(category?: SiteLinkCategory): Promise<SiteLink[]> {
  const client = publicClient()
  let query = client
    .from('site_links')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (category) {
    query = query.eq('category', category as string)
  }

  const { data, error } = await query
  if (error) throw error
  return (data as SiteLink[]) ?? []
}

export async function getAllContent(): Promise<SiteContent[]> {
  const { data, error } = await publicClient()
    .from('site_content')
    .select('*')
    .order('group_name')
  if (error) throw error
  return (data as SiteContent[]) ?? []
}

export async function getContentByGroup(group: string): Promise<SiteContent[]> {
  const { data, error } = await publicClient()
    .from('site_content')
    .select('*')
    .eq('group_name', group)
  if (error) throw error
  return (data as SiteContent[]) ?? []
}

export function contentMap(items: SiteContent[]): Record<string, string> {
  return Object.fromEntries(items.map((i) => [i.key, i.value]))
}

// ─── Admin queries (service role) ────────────────────────────────────────────

export async function getAllLinks(category?: SiteLinkCategory): Promise<SiteLink[]> {
  let query = adminClient()
    .from('site_links')
    .select('*')
    .order('sort_order', { ascending: true })

  if (category) query = query.eq('category', category as string)
  const { data, error } = await query
  if (error) throw error
  return (data as SiteLink[]) ?? []
}

export async function updateLink(
  id: string,
  updates: Partial<Omit<SiteLink, 'id' | 'created_at'>>
): Promise<SiteLink> {
  const { data, error } = await adminClient()
    .from('site_links')
    .update(updates as Record<string, unknown>)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as SiteLink
}

export async function updateContent(id: string, value: string): Promise<SiteContent> {
  const { data, error } = await adminClient()
    .from('site_content')
    .update({ value })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data as SiteContent
}

export async function getAdminRole(clerkUserId: string): Promise<AdminRoleRecord | null> {
  const { data, error } = await adminClient()
    .from('admin_roles')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .maybeSingle()
  if (error) return null
  return data as AdminRoleRecord | null
}

export async function getAllAdmins(): Promise<AdminRoleRecord[]> {
  const { data, error } = await adminClient()
    .from('admin_roles')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as AdminRoleRecord[]) ?? []
}

export async function upsertAdminRole(
  record: Omit<AdminRoleRecord, 'id' | 'created_at'>
): Promise<AdminRoleRecord> {
  const { data, error } = await adminClient()
    .from('admin_roles')
    .upsert(record as Record<string, unknown>, { onConflict: 'clerk_user_id' })
    .select()
    .single()
  if (error) throw error
  return data as AdminRoleRecord
}

export async function deleteAdminRole(clerkUserId: string): Promise<void> {
  const { error } = await adminClient()
    .from('admin_roles')
    .delete()
    .eq('clerk_user_id', clerkUserId)
  if (error) throw error
}

export async function logActivity(
  entry: Omit<AdminActivity, 'id' | 'created_at'>
): Promise<void> {
  await adminClient()
    .from('admin_activity')
    .insert(entry as Record<string, unknown>)
}

export async function getRecentActivity(limit = 20): Promise<AdminActivity[]> {
  const { data, error } = await adminClient()
    .from('admin_activity')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return (data as AdminActivity[]) ?? []
}

// ─── Newsletter subscribers ───────────────────────────────────────────────────

export async function saveSubscriber(
  record: Pick<NewsletterSubscriber, 'email' | 'phone'>
): Promise<NewsletterSubscriber> {
  const { data, error } = await adminClient()
    .from('newsletter_subscribers')
    .insert(record as Record<string, unknown>)
    .select()
    .single()
  if (error) throw error
  return data as NewsletterSubscriber
}

export async function getAllSubscribers(): Promise<NewsletterSubscriber[]> {
  const { data, error } = await adminClient()
    .from('newsletter_subscribers')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return (data as NewsletterSubscriber[]) ?? []
}
