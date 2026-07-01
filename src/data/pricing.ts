import type { PricePoint } from './types'

export const PRICING_NOTE =
  'Prices may vary based on nail length, shape, and design complexity. Nail art available on request.'

export interface PriceGroup {
  title: string
  items: PricePoint[]
}

export const priceMenu: PriceGroup[] = [
  {
    title: 'Manicures',
    items: [
      { name: 'Basic Manicure', price: '$20', duration: '~30 min' },
      { name: 'Deluxe Manicure', price: '$30', duration: '~30 min' },
      { name: 'Shellac (Gel) Manicure', price: '$40', duration: '~30 min' },
      { name: 'Dipping Powder Manicure', price: '$45', duration: '~30 min' },
      { name: 'Manicure and Pedicure Combo', price: '$55', duration: '~50 min' },
    ],
  },
  {
    title: 'Pedicures',
    items: [
      { name: 'Basic Pedicure', price: '$35', duration: '~30 min' },
      { name: 'Herbal Pedicure', price: '$47', duration: '~50 min' },
      { name: 'Hydration Pedicure', price: '$50', duration: '~50 min' },
      { name: 'Jelly Spa Pedicure', price: '$55', duration: '~55 min' },
      { name: 'Deluxe Volcano Spa Pedicure', price: '$60', duration: '~60 min' },
      { name: 'Organic Detox Pedicure', price: '$65', duration: '~60 min' },
      { name: 'Luxury Pedicure', price: '$75', duration: '~60 min' },
    ],
  },
  {
    title: 'Artificial and Enhancement',
    items: [
      { name: 'Full Set Gel or Shellac', price: '$50+', duration: '~45 min' },
      { name: 'Full Set Regular Acrylic', price: '$40+', duration: '~30 min' },
      { name: 'Fill In', price: '$40+', duration: '~30 min' },
      { name: 'Fill In Regular', price: '$30+', duration: '~30 min' },
      { name: 'Nail Repair', price: '$10+', duration: '~15 min' },
      { name: 'Take Off or Removal', price: '$10+', duration: '~15 min' },
    ],
  },
  {
    title: 'Polish',
    items: [
      { name: 'Polish Change Hands', price: '$10', duration: '~30 min' },
      { name: 'Polish Change Feet', price: '$15', duration: '~30 min' },
    ],
  },
]
