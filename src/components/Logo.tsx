import { cn } from '@/lib/cn'

/** Wordmark: "Beauty" in gold serif italic over "Nails Spa" in tracked caps. */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={cn('inline-flex flex-col leading-none', className)}>
      <span className="bg-gold-text bg-clip-text font-serif text-[1.7rem] italic text-transparent">
        Beauty
      </span>
      <span
        className={cn(
          'mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.4em]',
          light ? 'text-background/80' : 'text-charcoal',
        )}
      >
        Nails&nbsp;Spa
      </span>
    </span>
  )
}
