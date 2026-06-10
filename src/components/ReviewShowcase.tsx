import { business } from '@/data/business'
import { reviews, reviewThemes } from '@/data/reviews'
import { Section, SectionHeading } from './Section'
import { Container } from './Container'
import { ReviewCard } from './ReviewCard'
import { Stars } from './Stars'
import { CheckIcon, StarIcon } from './icons'

export function ReviewGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {reviews.map((r) => (
        <ReviewCard key={r.author} review={r} />
      ))}
    </div>
  )
}

export function ReviewThemes() {
  return (
    <ul className="flex flex-wrap justify-center gap-3">
      {reviewThemes.map((theme) => (
        <li
          key={theme}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-charcoal/85"
        >
          <CheckIcon width={15} height={15} className="text-primary-dark" />
          {theme}
        </li>
      ))}
    </ul>
  )
}

/** Prominent Google and Yelp review buttons. */
export function ReviewCtas() {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-primary/25 bg-secondary p-8 text-center sm:p-10">
      <Stars size={22} />
      <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">
        Loved your visit? Tell the world
      </h2>
      <p className="max-w-xl text-pretty text-muted-foreground">
        Your kind words help other families in {business.address.county} find us, and they mean the world
        to our small team. It only takes a minute.
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <a href={business.reviews.google} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-12 px-7">
          <StarIcon width={16} height={16} />
          Review us on Google
        </a>
        <a
          href={business.reviews.yelp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-charcoal/25 px-7 text-sm font-semibold uppercase tracking-widish text-charcoal transition-colors hover:border-primary hover:text-primary-dark"
        >
          <StarIcon width={16} height={16} />
          Review us on Yelp
        </a>
      </div>
    </div>
  )
}

export function ReviewSection() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="In their words" title="What our guests are saying" align="center" />
        <div className="mt-10">
          <ReviewGrid />
        </div>
      </Container>
    </Section>
  )
}
