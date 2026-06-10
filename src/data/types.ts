/**
 * Centralized, typed content contracts for Beauty Nails Spa.
 * Editing content means editing the data files in /src/data. The page
 * templates render from these shapes, so adding a service or location is
 * a data change, not a code change.
 *
 * Body-copy strings may contain inline links using the form [label](/path).
 * The <RichText> component renders /internal links as <Link> and external
 * links as <a>. Do not use EM dashes in any copy.
 */

export type ServiceCategory = 'Manicures' | 'Pedicures' | 'Nails & Enhancements'

export interface Faq {
  q: string
  a: string
}

export interface PricePoint {
  name: string
  price: string
  duration: string
  note?: string
}

export interface ProcessStep {
  title: string
  detail: string
}

export interface Service {
  /** Route slug without leading slash, e.g. "manicure-gel". */
  slug: string
  category: ServiceCategory
  /** Display name, e.g. "Gel Manicure". */
  name: string
  /** Short label for nav/cards. */
  shortName: string
  /** <title>, 50-60 chars including city. */
  title: string
  /** <meta description>, 140-160 chars. */
  description: string
  /** Short hero subhead. */
  tagline: string
  /** "What it is": one or two paragraphs. May contain [label](/path) links. */
  intro: string[]
  /** Benefit bullets. */
  benefits: string[]
  /** Who it is for: a short paragraph. */
  whoFor: string
  /** Ordered process steps. */
  process: ProcessStep[]
  /** Longevity and aftercare bullets. */
  aftercare: string[]
  /** One-line longevity summary, e.g. "Lasts 2 to 3 weeks". */
  longevity: string
  /** Detailed price points for this service. */
  prices: PricePoint[]
  /** Headline starting price, e.g. "$45". */
  priceFrom: string
  /** Headline duration, e.g. "~45 min". */
  duration: string
  /** Captioned style tiles shown as an accessible look strip. */
  gallery: string[]
  faqs: Faq[]
  /** Slugs of related services to cross-link. */
  related: string[]
}

export interface Location {
  /** Route slug, e.g. "nail-salon-urbana". */
  slug: string
  city: string
  cityState: string
  title: string
  description: string
  tagline: string
  /** Unique local intro, two or more paragraphs. May contain [label](/path). */
  intro: string[]
  /** Distance and travel summary from this town to the salon. */
  distance: string
  /** Directions and landmark paragraph using real local references. */
  landmarks: string
  /** Why locals from this town choose Beauty Nails Spa. */
  whyLocals: string[]
  /** Optional lead-in above the services list. */
  servicesIntro?: string
  /** Service slugs to feature for this town. */
  popularServices: string[]
  faqs: Faq[]
  /** Other location slugs to cross-link as nearby areas. */
  nearbyAreas: string[]
}

export interface Review {
  quote: string
  author: string
  source?: 'Google' | 'Yelp'
  rating?: number
  /** Optional short context, e.g. "Gel X manicure". */
  context?: string
}

export type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'callout'; title: string; text: string }

export interface BlogPost {
  slug: string
  title: string
  /** <title>, 50-60 chars. */
  metaTitle: string
  /** <meta description>, 140-160 chars. */
  description: string
  excerpt: string
  /** ISO date, e.g. "2026-05-12". */
  date: string
  /** Friendly date, e.g. "May 12, 2026". */
  dateDisplay: string
  author: string
  readingTime: string
  tags: string[]
  body: ContentBlock[]
  /** Related blog slugs. */
  related: string[]
}
