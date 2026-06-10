import type { Service, ServiceCategory } from '../types'
import { manicureServices } from './manicures'
import { pedicureServices } from './pedicures'
import { enhancementServices } from './enhancements'

export const services: Service[] = [
  ...manicureServices,
  ...pedicureServices,
  ...enhancementServices,
]

export const serviceCategories: ServiceCategory[] = [
  'Manicures',
  'Pedicures',
  'Nails & Enhancements',
]

const serviceBySlug = new Map(services.map((s) => [s.slug, s]))

export function getService(slug: string): Service | undefined {
  return serviceBySlug.get(slug)
}

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((s) => s.category === category)
}

/** Resolve a list of related slugs to Service objects, dropping any unknown slug. */
export function getRelatedServices(slugs: string[]): Service[] {
  return slugs.map((slug) => serviceBySlug.get(slug)).filter((s): s is Service => Boolean(s))
}

export const serviceSlugs = services.map((s) => s.slug)

/** Grouped for nav menus and the services index. */
export const groupedServices = serviceCategories.map((category) => ({
  category,
  items: getServicesByCategory(category),
}))
