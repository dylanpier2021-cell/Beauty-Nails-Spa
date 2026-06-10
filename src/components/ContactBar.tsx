import { business } from '@/data/business'
import { MailIcon, MapPinIcon, PhoneIcon, StarIcon } from './icons'

/** Gold info strip shown directly under the hero, echoing the template layout. */
export function ContactBar() {
  return (
    <div className="bg-gold-gradient text-charcoal">
      <div className="container flex flex-col gap-3 py-3.5 text-sm font-medium md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5">
          <a href={business.maps} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-opacity hover:opacity-75">
            <MapPinIcon width={16} height={16} />
            {business.address.street}, {business.address.city}, {business.address.state}{' '}
            {business.address.zip}
          </a>
          <a href={business.phoneHref} className="flex items-center gap-2 transition-opacity hover:opacity-75">
            <PhoneIcon width={16} height={16} />
            {business.phoneDisplay}
          </a>
          <a href={`mailto:${business.email}`} className="flex items-center gap-2 transition-opacity hover:opacity-75">
            <MailIcon width={16} height={16} />
            {business.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs uppercase tracking-widish opacity-70 sm:inline">Review us</span>
          <a
            href={business.reviews.google}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Review us on Google"
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-charcoal px-3.5 text-xs font-semibold uppercase tracking-widish text-background transition-transform hover:-translate-y-0.5"
          >
            <StarIcon width={13} height={13} className="text-primary-light" />
            Google
          </a>
          <a
            href={business.reviews.yelp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Review us on Yelp"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-charcoal/40 px-3.5 text-xs font-semibold uppercase tracking-widish text-charcoal transition-transform hover:-translate-y-0.5"
          >
            <StarIcon width={13} height={13} />
            Yelp
          </a>
        </div>
      </div>
    </div>
  )
}
