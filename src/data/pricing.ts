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
      { name: 'Basic Manicure', price: '$30', duration: '~30 min' },
      { name: 'Deluxe Manicure', price: '$38', duration: '~35 min' },
      { name: 'Shellac (Gel) Manicure', price: '$45', duration: '~45 min' },
      { name: 'Dipping Powder Manicure', price: '$45', duration: '~30 min' },
      { name: 'Manicure and Pedicure Combo', price: '$70', duration: '~60 to 75 min' },
    ],
  },
  {
    title: 'Pedicures',
    items: [
      { name: 'Basic Pedicure', price: '$38', duration: '~30 min' },
      { name: 'Herbal Pedicure', price: '$48', duration: '~45 min' },
      { name: 'Hydration Pedicure', price: '$50', duration: '~45 min' },
      { name: 'Jelly Spa Pedicure', price: '$55', duration: '~50 min' },
      { name: 'Deluxe Volcano Spa Pedicure', price: '$60', duration: '~55 min' },
      { name: 'Organic Detox Pedicure', price: '$65', duration: '~60 min' },
      { name: 'Luxury Pedicure', price: '$75', duration: '~60 min' },
    ],
  },
  {
    title: 'Artificial and Enhancement',
    items: [
      { name: 'Full Set Gel or Shellac', price: '$55+', duration: '~45 min' },
      { name: 'Full Set Regular Acrylic', price: '$45+', duration: '~30 to 45 min' },
      { name: 'Fill In Gel or Shellac', price: '$50+', duration: '~45 to 60 min' },
      { name: 'Fill In Regular', price: '$42+', duration: '~45 min' },
      { name: 'Nail Repair', price: '$15+', duration: '~15 min' },
      { name: 'Take Off or Removal', price: '$15+', duration: '~15 min' },
    ],
  },
  {
    title: 'Polish',
    items: [
      { name: 'Polish Change Hands', price: '$18', duration: '~15 to 30 min' },
      { name: 'Polish Change Feet', price: '$18', duration: '~15 to 30 min' },
    ],
  },
]
