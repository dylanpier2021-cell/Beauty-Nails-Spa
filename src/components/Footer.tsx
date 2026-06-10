import { Link } from 'react-router-dom'
import { business } from '@/data/business'
import { groupedServices } from '@/data/services'
import { locations } from '@/data/locations'
import { Logo } from './Logo'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, StarIcon } from './icons'

const companyLinks = [
  { label: 'About Us', to: '/beauty-nails-spa-in-champaign-country' },
  { label: 'All Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/review-us-online' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact-us' },
  { label: 'Book an Appointment', to: '/book' },
]

const linkClass = 'text-sm text-background/70 transition-colors hover:text-primary-light'

export function Footer() {
  const year = 2026

  return (
    <footer className="bg-charcoal text-background">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand + NAP */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-background/70">
              {business.tagline}. Family owned and detail oriented for over {business.yearsInBusiness} years
              in {business.address.city}.
            </p>
            <ul className="mt-5 space-y-2.5 text-sm text-background/80">
              <li>
                <a href={business.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 hover:text-primary-light">
                  <MapPinIcon width={17} height={17} className="mt-0.5 shrink-0 text-primary-light" />
                  <span>
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                  </span>
                </a>
              </li>
              <li>
                <a href={business.phoneHref} className="flex items-center gap-2.5 hover:text-primary-light">
                  <PhoneIcon width={17} height={17} className="shrink-0 text-primary-light" />
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className="flex items-center gap-2.5 break-all hover:text-primary-light">
                  <MailIcon width={17} height={17} className="shrink-0 text-primary-light" />
                  {business.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={business.reviews.google} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-9 px-4 text-xs">
                <StarIcon width={13} height={13} /> Review on Google
              </a>
              <a
                href={business.reviews.yelp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-background/25 px-4 text-xs font-semibold uppercase tracking-widish text-background transition-colors hover:border-primary-light hover:text-primary-light"
              >
                <StarIcon width={13} height={13} /> Yelp
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-widish text-primary-light">Services</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-1">
              {groupedServices.map((group) => (
                <div key={group.category} className="mb-3">
                  <p className="mb-1.5 text-xs font-semibold text-background/55">{group.category}</p>
                  <ul className="space-y-1.5">
                    {group.items.map((s) => (
                      <li key={s.slug}>
                        <Link to={`/${s.slug}`} className={linkClass}>
                          {s.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Areas */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-widish text-primary-light">Areas We Serve</h2>
            <ul className="mt-4 space-y-1.5">
              {locations.map((l) => (
                <li key={l.slug}>
                  <Link to={`/${l.slug}`} className={linkClass}>
                    {l.city}, IL
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + hours */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-semibold uppercase tracking-widish text-primary-light">Company</h2>
            <ul className="mt-4 space-y-1.5">
              {companyLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-widish text-primary-light">
              <ClockIcon width={15} height={15} /> Hours
            </h2>
            <ul className="mt-3 space-y-1 text-sm text-background/70">
              {business.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-3">
                  <span>{h.days}</span>
                  <span className="whitespace-nowrap text-background/90">
                    {h.open} to {h.close}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-xs text-background/60 sm:flex-row">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-primary-light">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary-light">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
