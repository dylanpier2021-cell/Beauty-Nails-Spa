import type { Review } from './types'

/**
 * Verbatim guest reviews. Attribution as provided. Only these are marked up
 * with Review structured data, since they are the reviews shown on the page.
 */
export const reviews: Review[] = [
  {
    quote: 'Hannah matched inspo pic. Super talented and gentle.',
    author: 'Cheldyn C.',
    source: 'Google',
    rating: 5,
    context: 'Custom design',
  },
  {
    quote: 'Polish lasts longer than other salons. Highly recommend.',
    author: 'Michele C.',
    source: 'Google',
    rating: 5,
    context: 'Long-lasting polish',
  },
  {
    quote: 'Warm, welcoming, spotless, kind staff, very attentive.',
    author: 'Shilpi S.',
    source: 'Google',
    rating: 5,
    context: 'Atmosphere',
  },
  {
    quote: 'Been coming 4 years. Great experience with Anna and family.',
    author: 'Yamileth D.',
    source: 'Google',
    rating: 5,
    context: 'Loyal guest',
  },
]

export const reviewThemes = [
  'Clean, spotless salon',
  'Gentle, careful service',
  'Designs that match your inspo pics',
  'Long-lasting polish and gel',
  'Family feel and friendly owners',
  'Beautiful Gel X quality',
  'Convenient Sunday hours',
]

export const featuredTechs = [
  { name: 'Hannah', role: 'Owner and lead nail artist' },
  { name: 'Anna', role: 'Senior nail technician' },
]
