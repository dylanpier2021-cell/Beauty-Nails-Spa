import { SITE_URL } from '@/data/business'

/** Build an absolute URL for a route path. */
export function absUrl(path: string): string {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const DEFAULT_OG_IMAGE = absUrl('/og-image.png')
export const SITE_NAME = 'Beauty Nails Spa'

export interface BreadcrumbItem {
  name: string
  path: string
}
