import { Link } from 'react-router-dom'
import type { Service } from '@/data/types'
import { photoForSlug } from '@/data/photos'
import { Photo } from './Photo'
import { ArrowRightIcon } from './icons'

export function ServiceCard({ service }: { service: Service }) {
  const photo = photoForSlug(service.slug)
  return (
    <Link
      to={`/${service.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-gold"
    >
      <div className="relative">
        <Photo
          name={photo.name}
          alt={photo.alt}
          aspect="aspect-[16/10]"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          imgClassName="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-4 rounded-full bg-background/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widish text-primary-dark backdrop-blur">
          {service.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-xl text-charcoal">{service.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{service.tagline}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-sm font-semibold text-primary-dark">
            From {service.priceFrom}
            <span className="ml-1.5 font-normal text-muted-foreground">{service.duration}</span>
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-charcoal transition-all group-hover:gap-2">
            Details
            <ArrowRightIcon width={15} height={15} className="text-primary-dark" />
          </span>
        </div>
      </div>
    </Link>
  )
}
