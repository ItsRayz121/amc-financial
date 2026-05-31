export type SiteLinkCategory = 'community' | 'course' | 'affiliate' | 'support'
export type ContentType = 'text' | 'textarea' | 'number' | 'url' | 'email'
export type AdminRole = 'super_admin' | 'editor' | 'viewer'

export interface SiteLink {
  id: string
  key: string
  label: string
  url: string
  description: string | null
  category: SiteLinkCategory
  icon: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface SiteContent {
  id: string
  key: string
  label: string
  value: string
  type: ContentType
  group_name: string
  updated_at: string
}

export interface AdminRoleRecord {
  id: string
  clerk_user_id: string
  email: string | null
  role: AdminRole
  created_at: string
}

export interface AdminActivity {
  id: string
  clerk_user_id: string
  email: string | null
  action: string
  resource: string
  resource_id: string | null
  details: Record<string, unknown> | null
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      site_links: {
        Row: SiteLink
        Insert: Omit<SiteLink, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<SiteLink, 'id' | 'created_at'>>
      }
      site_content: {
        Row: SiteContent
        Insert: Omit<SiteContent, 'id' | 'updated_at'>
        Update: Partial<Omit<SiteContent, 'id'>>
      }
      admin_roles: {
        Row: AdminRoleRecord
        Insert: Omit<AdminRoleRecord, 'id' | 'created_at'>
        Update: Partial<Omit<AdminRoleRecord, 'id' | 'created_at'>>
      }
      admin_activity: {
        Row: AdminActivity
        Insert: Omit<AdminActivity, 'id' | 'created_at'>
        Update: never
      }
    }
  }
}
