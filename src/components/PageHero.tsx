import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '@/lib/seo'
import { cn } from '@/lib/cn'
import { Breadcrumbs } from './Breadcrumbs'
import { GoldDivider } from './GoldDivider'

export function HeroDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-primary-light/20 blur-3xl" />
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  children,
  variant = 'cream',
}: {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  breadcrumbs?: BreadcrumbItem[]
  children?: ReactNode
  variant?: 'cream' | 'default' | 'warm'
}) {
  const bg = variant === 'cream' ? 'bg-secondary' : variant === 'warm' ? 'bg-accent' : 'bg-background'
  return (
    <section className={cn('relative overflow-hidden border-b border-border', bg)}>
      <HeroDecor />
      <div className="container relative py-12 sm:py-16 lg:py-20">
        {breadcrumbs && (
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <GoldDivider className="mb-5 mt-3" />
        <h1 className="max-w-3xl text-balance text-4xl leading-[1.08] sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  )
}
