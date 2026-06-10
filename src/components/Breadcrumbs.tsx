import { Link } from 'react-router-dom'
import type { BreadcrumbItem } from '@/lib/seo'
import { cn } from '@/lib/cn'

export function Breadcrumbs({ items, light = false }: { items: BreadcrumbItem[]; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-sm', light ? 'text-background/70' : 'text-muted-foreground')}>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className={light ? 'text-background' : 'text-charcoal'}>
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className={cn('transition-colors', light ? 'hover:text-primary-light' : 'hover:text-primary-dark')}>
                  {item.name}
                </Link>
              )}
              {!last && <span aria-hidden="true" className="opacity-50">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
