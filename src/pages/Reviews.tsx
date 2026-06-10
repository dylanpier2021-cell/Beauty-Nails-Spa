import { business } from '@/data/business'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import {
  ReviewCtas,
  ReviewGrid,
  ReviewThemes,
} from '@/components/ReviewShowcase'
import { StarIcon } from '@/components/icons'

function crumbs(name: string, path: string): BreadcrumbItem[] {
  return [
    { name: 'Home', path: '/' },
    { name, path },
  ]
}

/** /review-us-online: the primary reviews hub, showcase plus review CTAs. */
export function ReviewUsOnline() {
  const path = '/review-us-online'
  return (
    <>
      <Seo
        title="Review Beauty Nails Spa | Champaign, IL Nail Salon"
        description="Read reviews of Beauty Nails Spa in Champaign, IL and leave your own on Google or Yelp. Join 175+ five-star guests who love our nail care."
        path={path}
      />
      <JsonLd data={breadcrumbSchema(crumbs('Reviews', path))} />
      <PageHero
        eyebrow="Reviews"
        title="Reviewed and loved by Champaign County"
        subtitle={`Our guests are the heart of everything we do, and more than ${business.reviewCount} of them have left us five-star Google reviews. Read a few of their stories, then share yours.`}
        breadcrumbs={crumbs('Reviews', path)}
      />
      <Section>
        <Container>
          <SectionHeading eyebrow="In their words" title="Recent guest reviews" align="center" />
          <div className="mt-10">
            <ReviewGrid />
          </div>
          <div className="mt-12">
            <ReviewCtas />
          </div>
        </Container>
      </Section>
    </>
  )
}

/** /review: a read-focused testimonial wall. */
export function ReviewsRead() {
  const path = '/review'
  return (
    <>
      <Seo
        title="Beauty Nails Spa Reviews | Champaign, IL Nail Salon"
        description="See what guests say about Beauty Nails Spa in Champaign, IL. Gentle service, long-lasting polish, a spotless salon and a true family welcome."
        path={path}
      />
      <JsonLd data={breadcrumbSchema(crumbs('Guest Reviews', path))} />
      <PageHero
        eyebrow="Guest Reviews"
        title="The reasons our guests keep coming back"
        subtitle="From designs that match your inspiration photo to polish that simply lasts, here is what people love most about Beauty Nails Spa."
        breadcrumbs={crumbs('Guest Reviews', path)}
      />
      <Section>
        <Container>
          <ReviewGrid />
        </Container>
      </Section>
      <Section variant="cream">
        <Container>
          <SectionHeading eyebrow="The highlights" title="What guests mention most" align="center" />
          <div className="mt-10">
            <ReviewThemes />
          </div>
        </Container>
      </Section>
    </>
  )
}

/** /leave-a-review: an action-focused how-to-review page. */
export function LeaveAReview() {
  const path = '/leave-a-review'
  const steps = [
    'Click the Google or Yelp button below.',
    'Choose your star rating, five stars is always appreciated.',
    'Share a sentence or two about your visit and your favorite service.',
    'Submit, and thank you for supporting our family business.',
  ]
  return (
    <>
      <Seo
        title="Leave a Review | Beauty Nails Spa Champaign, IL"
        description="Loved your visit to Beauty Nails Spa in Champaign, IL? Leave a quick review on Google or Yelp. It takes a minute and helps our family-owned salon grow."
        path={path}
      />
      <JsonLd data={breadcrumbSchema(crumbs('Leave a Review', path))} />
      <PageHero
        eyebrow="Leave a Review"
        title="Share your experience"
        subtitle="A few kind words go a long way for a small, family-owned salon. Here is how to leave your review in under a minute."
        breadcrumbs={crumbs('Leave a Review', path)}
      />
      <Section>
        <Container className="max-w-3xl">
          <ol className="space-y-4">
            {steps.map((step, i) => (
              <li key={step} className="flex items-start gap-4 rounded-xl border border-border bg-background p-5 shadow-card">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-serif text-base font-semibold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="pt-1 leading-relaxed text-foreground/90">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a href={business.reviews.google} target="_blank" rel="noopener noreferrer" className="btn btn-primary h-12 px-7">
              <StarIcon width={16} height={16} />
              Review on Google
            </a>
            <a
              href={business.reviews.yelp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-charcoal/25 px-7 text-sm font-semibold uppercase tracking-widish text-charcoal transition-colors hover:border-primary hover:text-primary-dark"
            >
              <StarIcon width={16} height={16} />
              Review on Yelp
            </a>
          </div>
        </Container>
      </Section>
    </>
  )
}
