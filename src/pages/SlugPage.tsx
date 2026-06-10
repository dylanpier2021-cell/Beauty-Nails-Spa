import { useParams } from 'react-router-dom'
import { getService } from '@/data/services'
import { getLocation } from '@/data/locations'
import { ServiceTemplate } from '@/templates/ServiceTemplate'
import { LocationTemplate } from '@/templates/LocationTemplate'
import NotFound from './NotFound'

/**
 * Resolves a top-level slug to either a service or a location page. Every
 * valid slug is pre-rendered via getStaticPaths in routes.tsx.
 */
export default function SlugPage() {
  const { slug = '' } = useParams()
  const service = getService(slug)
  if (service) return <ServiceTemplate service={service} />
  const location = getLocation(slug)
  if (location) return <LocationTemplate location={location} />
  return <NotFound />
}
