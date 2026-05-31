export type { SiteLink, SiteContent, AdminRoleRecord, AdminActivity, AdminRole, SiteLinkCategory } from './database'

export interface NavItem {
  label: string
  href: string
}

export interface StatItem {
  value: number
  suffix: string
  label: string
  key: string
}

export interface CourseCard {
  key: string
  title: string
  description: string
  tags: string[]
  url: string
  isPlaceholder: boolean
  icon: string
}

export interface CommunityCard {
  key: string
  label: string
  description: string
  url: string
  isPlaceholder: boolean
  icon: string
  platform: 'whatsapp' | 'telegram' | 'instagram' | 'other'
  memberCount?: string
}

export interface PartnerCard {
  key: string
  label: string
  description: string
  url: string
  isPlaceholder: boolean
  icon: string
}
