import { isPlaceholderUrl } from '@/config/site'

export function safeExternalUrl(url: string): string | null {
  if (!url || isPlaceholderUrl(url)) return null
  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) return null
    return url
  } catch {
    return null
  }
}

export function externalLinkProps(url: string | null) {
  if (!url) return { href: '#', target: undefined, rel: undefined, 'aria-disabled': true }
  return {
    href: url,
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
  }
}
