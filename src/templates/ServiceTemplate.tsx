import { Link } from 'react-router-dom'
import type { Service } from '@/data/types'
import { business } from '@/data/business'
import { getRelatedServices } from '@/data/services'
import { photosForSlug } from '@/data/photos'
import { PRICING_NOTE } from '@/data/pricing'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { RichText } from '@/components/RichText'
import { ServiceCard } from '@/components/ServiceCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Photo } from '@/components/Photo'
import { PriceList } from '@/components/PriceTable'
import { CtaBand } from '@/components/CtaBand'
import { Button, LinkButton } from '@/components/Button'
import { CheckIcon, ClockIcon, PhoneIcon, SparkleIcon, HeartIcon } from '@/components/icons'

export function ServiceTemplate({ service }: { service: Service }) {
  const path = `/${service.slug}`
  const related = getRelatedServices(service.related)
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.name, path },
  ]

  return (
    <>
      <Seo title={service.title} description={service.description} path={path} />
      <JsonLd
        data={[
          serviceSchema({
            name: service.name,
            description: service.description,
            path,
            priceFrom: service.priceFrom,
          }),
          breadcrumbSchema(breadcrumbs),
          ...(service.faqs.length ? [faqSchema(service.faqs)] : []),
        ]}
      />

      <PageHero
        eyebrow={service.category}
        title={service.name}
        subtitle={service.tagline}
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
            <SparkleIcon width={16} height={16} className="text-primary-dark" />
            From <strong className="font-semibold text-charcoal">{service.priceFrom}</strong>
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
            <ClockIcon width={16} height={16} className="text-primary-dark" />
            {service.duration}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
            <HeartIcon width={16} height={16} className="text-primary-dark" />
            {service.longevity}
          </span>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button to="/book" size="lg">
            Book This Service
          </Button>
          <LinkButton href={business.phoneHref} variant="outline" size="lg">
            <PhoneIcon width={17} height={17} />
            {business.phoneDisplay}
          </LinkButton>
        </div>
      </PageHero>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div className="max-w-prose">
            <div className="prose-body space-y-4 text-lg leading-relaxed text-foreground/90">
              {service.intro.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
            </div>

            <h2 className="mt-12 font-serif text-2xl text-charcoal sm:text-3xl">Why you will love it</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4">
                  <CheckIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                  <span className="text-sm leading-relaxed text-foreground/90">{b}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-12 font-serif text-2xl text-charcoal sm:text-3xl">Who it is for</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/90">{service.whoFor}</p>

            <h2 className="mt-12 font-serif text-2xl text-charcoal sm:text-3xl">What to expect</h2>
            <ol className="mt-6 space-y-5">
              {service.process.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-serif text-base font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-charcoal">{step.title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-foreground">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 rounded-2xl border border-primary/25 bg-secondary p-6 sm:p-7">
              <h2 className="font-serif text-2xl text-charcoal">
                Longevity and aftercare
                <span className="mt-1 block text-sm font-normal not-italic text-primary-dark">
                  {service.longevity}
                </span>
              </h2>
              <ul className="mt-4 space-y-2.5">
                {service.aftercare.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <SparkleIcon width={18} height={18} className="mt-0.5 shrink-0 text-primary" />
                    <span className="leading-relaxed text-foreground/90">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky booking + price sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-card">
              <h2 className="font-serif text-xl text-charcoal">Pricing</h2>
              <div className="mb-1 mt-2 h-[2px] w-12 rounded-full bg-gold-gradient" aria-hidden="true" />
              <PriceList items={service.prices} className="mt-2" />
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{PRICING_NOTE}</p>
              <div className="mt-5 space-y-2">
                <Button to="/book" className="w-full">
                  Book Now
                </Button>
                <LinkButton href={business.phoneHref} variant="outline" className="w-full">
                  <PhoneIcon width={16} height={16} />
                  Call to Book
                </LinkButton>
              </div>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Walk-ins welcome. See the{' '}
                <Link to="/pricing" className="font-medium text-primary-dark underline underline-offset-2">
                  full price menu
                </Link>
                .
              </p>
            </div>
          </aside>
        </Container>
      </Section>

      <Section variant="cream">
        <Container>
          <SectionHeading
            eyebrow="Our work"
            title="Recent looks from our studio"
            subtitle="A few sets created by our team in Champaign. Bring a photo and we will tailor the perfect look to you."
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {photosForSlug(service.slug, 4).map((photo) => (
              <Photo
                key={photo.name}
                name={photo.name}
                alt={photo.alt}
                aspect="aspect-[3/4]"
                sizes="(min-width: 640px) 24vw, 48vw"
                className="rounded-2xl border border-border shadow-card"
              />
            ))}
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section>
          <Container>
            <SectionHeading eyebrow="Keep exploring" title="Related services" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {service.faqs.length > 0 && (
        <Section variant="cream">
          <Container className="max-w-3xl">
            <SectionHeading eyebrow="Good to know" title={`${service.name} FAQs`} align="center" />
            <div className="mt-8">
              <FAQAccordion faqs={service.faqs} />
            </div>
          </Container>
        </Section>
      )}

      <CtaBand title={`Book your ${service.name.toLowerCase()} in Champaign`} />
    </>
  )
}
