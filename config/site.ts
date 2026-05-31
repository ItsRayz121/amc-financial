import type { NavItem } from '@/types/site'

export const SITE_CONFIG = {
  name: 'Aasim Majeed AMC',
  tagline: 'Free Financial Education for Everyone',
  description:
    'Free trading education, live market insights, and thriving communities — by Aasim Majeed AMC, Financial Consultant with 5 years of experience.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aasimmajeedamc.com',
  keywords: [
    'financial education',
    'free trading courses',
    'forex education',
    'crypto trading',
    'Aasim Majeed AMC',
    'free trading community Pakistan',
    'stock market education',
    'mutual funds Pakistan',
    'gold trading',
    'SIP planning',
  ],
  person: {
    name: 'Aasim Majeed AMC',
    title: 'Financial Consultant & Finance Educator',
    experience: 5,
    markets: ['Crypto', 'Stocks', 'Forex', 'Mutual Funds', 'Gold'],
  },
  support: {
    agentName: 'Husnain Abass',
    phone: '+92 348 6222404',
    whatsappUrl: 'https://wa.me/923486222404',
  },
  social: {
    whatsapp: 'https://whatsapp.com/channel/0029Va8axQ6HQbSAok7MRS0O',
    telegram: 'https://t.me/aasimmajeedkhawaja',
    instagram: 'https://www.instagram.com/aasimmajeedamc/',
    youtube: 'https://youtube.com/live/MNsdGMnzGI4?feature=share',
  },
  affiliates: {
    bitget: 'https://partner.bitget.site/bg/xsvyzhvw',
  },
} as const

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Communities', href: '#communities' },
  { label: 'Courses', href: '#courses' },
  { label: 'Platforms', href: '#partners' },
  { label: 'Support', href: '#support' },
]

export const isPlaceholderUrl = (url: string): boolean =>
  url.startsWith('PLACEHOLDER_') || url === ''
