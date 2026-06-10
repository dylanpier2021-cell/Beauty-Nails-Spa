/**
 * Single source of truth for the salon's name, address, phone, hours and
 * profiles (NAP). Used across the UI, footer, contact page and JSON-LD.
 */

export const SITE_URL = 'https://beautynailsspacu.com'

export const business = {
  name: 'Beauty Nails Spa',
  legalName: 'Beauty Nails Spa',
  tagline: "Champaign County's Premier Luxury Nail Salon",
  owner: 'Hien Vu',
  ownerNickname: 'Hannah',
  yearsInBusiness: '10+',
  priceRange: '$$',
  url: SITE_URL,

  phoneDisplay: '(217) 398-1898',
  phoneHref: 'tel:+12173981898',
  email: 'hannahvu83@yahoo.com',

  address: {
    street: '706 W Marketview Dr Ste A',
    city: 'Champaign',
    state: 'IL',
    stateLong: 'Illinois',
    zip: '61822',
    county: 'Champaign County',
  },

  /** Approximate coordinates for the Marketview Drive location. Verify before launch. */
  geo: {
    lat: 40.1437,
    lng: -88.2447,
  },

  maps: 'https://www.google.com/maps/place/706+W+Marketview+Dr+Ste+A,+Champaign,+IL+61822',
  reviews: {
    google: 'https://g.page/r/CTK8LV-epOqKEAE/review',
    yelp: 'https://www.yelp.com/writeareview/biz/-BtggbTrtuaPjL5Dc9lv3w',
  },

  /** Display + machine-readable hours. */
  hours: [
    { days: 'Monday to Saturday', open: '9:30 AM', close: '7:00 PM', dow: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], opens: '09:30', closes: '19:00' },
    { days: 'Sunday', open: '11:00 AM', close: '5:00 PM', dow: ['Su'], opens: '11:00', closes: '17:00' },
  ],

  reviewCount: 175,
  ratingValue: 5.0,

  reasonsToChoose: [
    {
      title: 'Sterilized Every Time',
      text: 'Tools are 100% sterilized between every client, with single-use disposables wherever possible.',
    },
    {
      title: 'Premium, Long-Lasting Products',
      text: 'We use high-quality gels, lacquers and powders chosen to hold their shine for weeks, not days.',
    },
    {
      title: 'Detail-Oriented Technicians',
      text: 'Our caring techs take the time to get shapes, cuticles and color exactly right.',
    },
    {
      title: 'Relaxing Atmosphere',
      text: 'A calm, comfortable, spotless space designed to feel like a true escape.',
    },
    {
      title: 'Family-Owned Warmth',
      text: 'Hannah and her family treat every guest like a neighbor, not a number.',
    },
  ],

  /** Towns served, used for local SEO copy and the locations strip. */
  serviceAreas: [
    'Champaign',
    'Urbana',
    'Savoy',
    'Philo',
    'Mahomet',
    'Rantoul',
    'St. Joseph',
    'Tolono',
    'Monticello',
  ],

  social: {
    google: 'https://g.page/r/CTK8LV-epOqKEAE/review',
    yelp: 'https://www.yelp.com/writeareview/biz/-BtggbTrtuaPjL5Dc9lv3w',
  },
}

export type Business = typeof business
