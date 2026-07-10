import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { business } from '@/data/business'
import { cn } from '@/lib/cn'
import { Seo } from '@/components/Seo'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { GoldDivider } from '@/components/GoldDivider'
import { StarIcon } from '@/components/icons'

/**
 * Public Google review link for this star gate only. Intentionally the business's
 * newer review URL; it differs from business.reviews.google (the older ...KEAE
 * link still used in the footer, Contact and other review pages).
 */
const GOOGLE_REVIEW_URL = 'https://g.page/r/CTK8LV-epOqKEBM/review'

/** 4-5 stars go straight to Google; 1-3 stars route to private feedback. */
const HAPPY_THRESHOLD = 4

/**
 * /review: a one-tap star gate. Happy guests (4-5 stars) are sent to the public
 * Google review page; anyone who taps 1-3 stars is routed to a private feedback
 * form so we can make it right before it becomes a public review.
 */
export default function ReviewGate() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(0)

  function choose(rating: number) {
    if (rating >= HAPPY_THRESHOLD) {
      window.location.href = GOOGLE_REVIEW_URL
    } else {
      navigate(`/feedback?rating=${rating}`)
    }
  }

  return (
    <>
      <Seo
        title={`Rate Your Visit | ${business.name}`}
        description={`How was your visit to ${business.name} in ${business.address.city}, ${business.address.state}? Tap a star to share your experience.`}
        path="/review"
        noindex
      />
      <Section className="flex min-h-[70vh] items-center">
        <Container className="max-w-xl text-center">
          <span className="eyebrow">{business.name}</span>
          <GoldDivider align="center" className="mb-6 mt-3" />
          <h1 className="text-balance text-3xl sm:text-4xl lg:text-[2.6rem]">
            How was your visit?
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Tap a star to let us know. Your feedback means the world to our
            family-owned salon.
          </p>

          <div
            role="group"
            aria-label="Rate your visit from 1 to 5 stars"
            className="mt-10 flex items-center justify-center gap-1.5 sm:gap-3"
            onMouseLeave={() => setHovered(0)}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => choose(n)}
                onMouseEnter={() => setHovered(n)}
                onFocus={() => setHovered(n)}
                aria-label={`${n} ${n === 1 ? 'star' : 'stars'}`}
                className="rounded-full p-1.5 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
              >
                <StarIcon
                  width={52}
                  height={52}
                  className={cn(
                    'transition-colors duration-150',
                    hovered === 0 || n <= hovered ? 'text-primary' : 'text-primary/20',
                  )}
                />
              </button>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Prefer Yelp?{' '}
            <a
              href={business.reviews.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-dark underline underline-offset-2 hover:text-primary"
            >
              Review us on Yelp
            </a>
            .
          </p>
        </Container>
      </Section>
    </>
  )
}
