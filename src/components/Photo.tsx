import { cn } from '@/lib/cn'

interface PhotoProps {
  /** Base name, files are /images/<name>-<w>.webp. */
  name: string
  alt: string
  /** Tailwind aspect class for the framed container. */
  aspect?: string
  sizes?: string
  widths?: [number, number]
  eager?: boolean
  className?: string
  imgClassName?: string
}

/**
 * Responsive WebP image with a fixed aspect container (no layout shift).
 * Lazy by default; pass `eager` for the LCP hero image.
 */
export function Photo({
  name,
  alt,
  aspect = 'aspect-[3/4]',
  sizes = '(min-width: 1024px) 25vw, 50vw',
  widths = [400, 800],
  eager = false,
  className,
  imgClassName,
}: PhotoProps) {
  const [small, large] = widths
  return (
    <div className={cn('relative overflow-hidden bg-secondary', aspect, className)}>
      <img
        src={`/images/${name}-${large}.webp`}
        srcSet={`/images/${name}-${small}.webp ${small}w, /images/${name}-${large}.webp ${large}w`}
        sizes={sizes}
        alt={alt}
        width={large}
        height={Math.round(large * 1.25)}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={cn('absolute inset-0 h-full w-full object-cover', imgClassName)}
      />
    </div>
  )
}
