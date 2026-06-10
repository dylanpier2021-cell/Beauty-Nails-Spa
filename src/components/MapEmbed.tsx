import { business } from '@/data/business'
import { cn } from '@/lib/cn'

const query = encodeURIComponent(
  `${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.zip}`,
)

export function MapEmbed({ className, title }: { className?: string; title?: string }) {
  return (
    <iframe
      title={title ?? `Map to ${business.name} in ${business.address.city}, ${business.address.state}`}
      src={`https://www.google.com/maps?q=${query}&output=embed`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={cn('h-full min-h-[18rem] w-full rounded-2xl border border-border', className)}
    />
  )
}
