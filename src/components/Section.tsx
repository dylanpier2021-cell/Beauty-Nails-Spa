import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { GoldDivider } from './GoldDivider'

type SectionVariant = 'default' | 'cream' | 'warm' | 'charcoal'

const variantBg: Record<SectionVariant, string> = {
  default: 'bg-background',
  cream: 'bg-secondary',
  warm: 'bg-accent',
  charcoal: 'bg-charcoal text-background',
}

export function Section({
  children,
  variant = 'default',
  className,
  id,
  ariaLabel,
}: {
  children: ReactNode
  variant?: SectionVariant
  className?: string
  id?: string
  ariaLabel?: string
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={cn('py-16 sm:py-20 lg:py-24', variantBg[variant], className)}
    >
      {children}
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  as: Heading = 'h2',
  className,
  light = false,
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  align?: 'left' | 'center'
  as?: ElementType
  className?: string
  /** Use on dark (charcoal) backgrounds. */
  light?: boolean
}) {
  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {eyebrow && (
        <span className={cn('eyebrow', light && 'text-primary-light')}>{eyebrow}</span>
      )}
      <GoldDivider align={align} className="mb-5 mt-3" />
      <Heading
        className={cn(
          'text-balance text-3xl sm:text-4xl lg:text-[2.6rem]',
          light && 'text-background',
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={cn('mt-4 text-pretty text-lg', light ? 'text-background/80' : 'text-muted-foreground')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
