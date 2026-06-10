import type { PricePoint } from '@/data/types'
import { cn } from '@/lib/cn'

export function PriceList({ items, className }: { items: PricePoint[]; className?: string }) {
  return (
    <ul className={cn('divide-y divide-border', className)}>
      {items.map((item) => (
        <li key={item.name} className="flex items-baseline justify-between gap-4 py-3.5">
          <div className="min-w-0">
            <p className="font-medium text-charcoal">{item.name}</p>
            {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
          </div>
          <div className="flex items-center gap-3 whitespace-nowrap text-right">
            <span className="text-xs text-muted-foreground">{item.duration}</span>
            <span className="font-serif text-lg text-primary-dark">{item.price}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function PriceCard({
  title,
  items,
}: {
  title: string
  items: PricePoint[]
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card sm:p-7">
      <h3 className="mb-2 font-serif text-2xl text-charcoal">{title}</h3>
      <div className="mb-3 h-[2px] w-14 rounded-full bg-gold-gradient" aria-hidden="true" />
      <PriceList items={items} />
    </div>
  )
}
