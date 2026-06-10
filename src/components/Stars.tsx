import { StarIcon } from './icons'
import { cn } from '@/lib/cn'

export function Stars({ count = 5, className, size = 16 }: { count?: number; className?: string; size?: number }) {
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-primary', className)} aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <StarIcon key={i} width={size} height={size} />
      ))}
    </span>
  )
}
