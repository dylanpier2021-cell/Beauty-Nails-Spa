import type { Location } from '../types'
import { locationsA } from './group-a'
import { locationsB } from './group-b'

export const locations: Location[] = [...locationsA, ...locationsB]

const locationBySlug = new Map(locations.map((l) => [l.slug, l]))

export function getLocation(slug: string): Location | undefined {
  return locationBySlug.get(slug)
}

export function getNearbyLocations(slugs: string[]): Location[] {
  return slugs.map((slug) => locationBySlug.get(slug)).filter((l): l is Location => Boolean(l))
}

export const locationSlugs = locations.map((l) => l.slug)
