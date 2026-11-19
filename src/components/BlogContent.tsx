import type { ContentBlock } from '@/data/types'
import { RichText } from './RichText'
import { Photo } from './Photo'
import { SparkleIcon } from './icons'

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'p':
      return (
        <p className="text-lg leading-relaxed text-foreground/90">
          <RichText text={block.text} />
        </p>
      )
    case 'h2':
      return <h2 className="mt-12 font-serif text-2xl text-charcoal sm:text-[1.75rem]">{block.text}</h2>
    case 'h3':
      return <h3 className="mt-8 font-serif text-xl text-charcoal">{block.text}</h3>
    case 'ul':
      return (
        <ul className="space-y-2.5 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-foreground/90">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="space-y-2.5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-lg leading-relaxed text-foreground/90">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary font-serif text-sm font-semibold text-primary-dark">
                {i + 1}
              </span>
              <span className="pt-0.5">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      )
    case 'quote':
      return (
        <blockquote className="border-l-2 border-primary pl-5 font-serif text-xl italic text-charcoal">
          {block.text}
          {block.cite && <cite className="mt-2 block text-sm not-italic text-muted-foreground">{block.cite}</cite>}
        </blockquote>
      )
    case 'callout':
      return (
        <div className="rounded-2xl border border-primary/25 bg-secondary p-6">
          <p className="flex items-center gap-2 font-serif text-lg text-charcoal">
            <SparkleIcon width={20} height={20} className="text-primary-dark" />
            {block.title}
          </p>
          <p className="mt-2 leading-relaxed text-foreground/90">
            <RichText text={block.text} />
          </p>
        </div>
      )
    case 'image':
      return (
        <figure className="my-2">
          <Photo
            name={block.name}
            alt={block.alt}
            aspect="aspect-[4/5]"
            sizes="(min-width: 768px) 720px, 100vw"
            className="rounded-2xl border border-border shadow-card"
          />
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              <RichText text={block.caption} />
            </figcaption>
          )}
        </figure>
      )
    case 'gallery':
      return (
        <div className="grid gap-6 sm:grid-cols-2">
          {block.items.map((item, i) => (
            <figure key={i} className="flex flex-col">
              <Photo
                name={item.name}
                alt={item.alt}
                aspect="aspect-[3/4]"
                sizes="(min-width: 768px) 360px, 50vw"
                className="rounded-2xl border border-border shadow-card"
              />
              <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <RichText text={item.caption} />
              </figcaption>
            </figure>
          ))}
        </div>
      )
    default:
      return null
  }
}

export function BlogContent({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="prose-body space-y-5">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
