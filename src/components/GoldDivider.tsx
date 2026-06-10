import { cn } from '@/lib/cn'

/** 80px x 2px horizontal gold gradient rule used under section eyebrows. */
export function GoldDivider({
  className,
  align = 'left',
}: {
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <span
      aria-hidden="true"
      className={cn('block h-[2px] w-20 rounded-full bg-gold-gradient', align === 'center' && 'mx-auto', className)}
    />
  )
}
