import { Link } from 'react-router-dom'
import type { BlogPost } from '@/data/types'
import { ArrowRightIcon, ClockIcon } from './icons'

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-gold">
      <Link to={`/blog/${post.slug}`} className="flex h-full flex-col">
        <div className="flex h-28 items-center bg-gold-gradient px-6">
          <span className="rounded-full bg-background/85 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-widish text-primary-dark backdrop-blur">
            {post.tags[0]}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <time dateTime={post.date}>{post.dateDisplay}</time>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon width={13} height={13} />
              {post.readingTime}
            </span>
          </div>
          <h3 className="mt-3 font-serif text-xl leading-snug text-charcoal">{post.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-dark transition-all group-hover:gap-2">
            Read article
            <ArrowRightIcon width={15} height={15} />
          </span>
        </div>
      </Link>
    </article>
  )
}
