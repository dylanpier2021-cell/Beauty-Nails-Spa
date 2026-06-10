import type { Review } from '@/data/types'
import { cn } from '@/lib/cn'
import { Stars } from './Stars'
import { QuoteIcon } from './icons'

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col rounded-2xl border border-border bg-background p-7 shadow-card',
        className,
      )}
    >
      <QuoteIcon width={30} height={30} className="text-primary-light" />
      <blockquote className="mt-3 flex-1 text-pretty text-lg leading-relaxed text-charcoal">
        {review.quote}
      </blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-serif text-base text-charcoal">{review.author}</p>
          {review.context && <p className="text-xs text-muted-foreground">{review.context}</p>}
        </div>
        <div className="text-right">
          <Stars count={review.rating ?? 5} size={15} />
          {review.source && (
            <p className="mt-0.5 text-xs text-muted-foreground">via {review.source}</p>
          )}
        </div>
      </figcaption>
    </figure>
  )
}
