import { business, SITE_URL } from '@/data/business'
import type { Faq, BlogPost } from '@/data/types'
import { absUrl, DEFAULT_OG_IMAGE, type BreadcrumbItem } from './seo'

const BUSINESS_ID = `${SITE_URL}/#business`

/**
 * Site-wide NailSalon (LocalBusiness) schema. Describes only factual NAP,
 * hours, geo and profiles. We intentionally omit self-serving review markup.
 */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'NailSalon',
    '@id': BUSINESS_ID,
    name: business.name,
    alternateName: 'Beauty Nails Spa Champaign',
    description:
      "Beauty Nails Spa is Champaign County's premier luxury nail salon, offering manicures, pedicures, gel, dip powder, acrylic and custom nail art.",
    url: SITE_URL,
    telephone: business.phoneDisplay,
    email: business.email,
    priceRange: business.priceRange,
    image: DEFAULT_OG_IMAGE,
    logo: absUrl('/apple-touch-icon.png'),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.state,
      postalCode: business.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    hasMap: business.maps,
    openingHoursSpecification: business.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dow.map(
        (d) =>
          ({
            Mo: 'Monday',
            Tu: 'Tuesday',
            We: 'Wednesday',
            Th: 'Thursday',
            Fr: 'Friday',
            Sa: 'Saturday',
            Su: 'Sunday',
          })[d],
      ),
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: business.serviceAreas.map((city) => ({
      '@type': 'City',
      name: `${city}, IL`,
    })),
    sameAs: [business.reviews.google, business.reviews.yelp],
  }
}

export function serviceSchema(opts: {
  name: string
  description: string
  path: string
  priceFrom?: string
}) {
  const numericPrice = opts.priceFrom?.replace(/[^0-9.]/g, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: opts.name,
    name: opts.name,
    description: opts.description,
    url: absUrl(opts.path),
    provider: {
      '@type': 'NailSalon',
      '@id': BUSINESS_ID,
      name: business.name,
    },
    areaServed: business.serviceAreas.map((city) => ({ '@type': 'City', name: `${city}, IL` })),
    ...(numericPrice
      ? {
          offers: {
            '@type': 'Offer',
            price: numericPrice,
            priceCurrency: 'USD',
            url: absUrl(opts.path),
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  }
}

/** Only pass FAQs that are actually rendered on the page. */
export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absUrl(item.path),
    })),
  }
}

export function blogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': post.author.toLowerCase().includes('team') ? 'Organization' : 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: business.name,
      logo: { '@type': 'ImageObject', url: absUrl('/apple-touch-icon.png') },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absUrl(`/blog/${post.slug}`) },
    image: DEFAULT_OG_IMAGE,
    keywords: post.tags.join(', '),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: business.name,
    url: SITE_URL,
  }
}
