import { business } from '@/data/business'
import { CheckIcon, ClockIcon, StarIcon, SparkleIcon } from './icons'
import type { ComponentType, SVGProps } from 'react'

const items: { icon: ComponentType<SVGProps<SVGSVGElement>>; stat: string; label: string }[] = [
  { icon: CheckIcon, stat: '100%', label: 'Tools sterilized between every client' },
  { icon: ClockIcon, stat: `${business.yearsInBusiness} years`, label: 'Caring for Champaign County' },
  { icon: StarIcon, stat: `${business.reviewCount}+`, label: 'Five-star guest reviews' },
  { icon: SparkleIcon, stat: 'Premium', label: 'Long-lasting products and finishes' },
]

export function TrustBar() {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border shadow-card lg:grid-cols-4">
      {items.map((item) => (
        <li key={item.label} className="flex flex-col items-center gap-2 bg-background px-4 py-7 text-center">
          <item.icon width={26} height={26} className="text-primary-dark" />
          <p className="font-serif text-2xl text-charcoal">{item.stat}</p>
          <p className="text-sm leading-snug text-muted-foreground">{item.label}</p>
        </li>
      ))}
    </ul>
  )
}
