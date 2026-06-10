import { Link } from 'react-router-dom'
import type { Location } from '@/data/types'
import { business } from '@/data/business'
import { getRelatedServices } from '@/data/services'
import { getNearbyLocations } from '@/data/locations'
import { salonPhotos } from '@/data/photos'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { Reveal } from '@/components/Reveal'
import { RichText } from '@/components/RichText'
import { ServiceCard } from '@/components/ServiceCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { MapEmbed } from '@/components/MapEmbed'
import { Photo } from '@/components/Photo'
import { CtaBand } from '@/components/CtaBand'
import { Button, LinkButton } from '@/components/Button'
import { ArrowRightIcon, CheckIcon, ClockIcon, MapPinIcon, PhoneIcon } from '@/components/icons'

export function LocationTemplate({ location }: { location: Location }) {
  const path = `/${location.slug}`
  const popular = getRelatedServices(location.popularServices)
  const nearby = getNearbyLocations(location.nearbyAreas)
  const isHome = location.city === 'Champaign'
  const h1 = isHome ? 'Nail Salon in Champaign, IL' : `Nail Salon Near ${location.city}, IL`

  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: `${location.city}, IL`, path },
  ]

  return (
    <>
      <Seo title={location.title} description={location.description} path={path} />
      <JsonLd
        data={[
          breadcrumbSchema(breadcrumbs),
          ...(location.faqs.length ? [faqSchema(location.faqs)] : []),
        ]}
      />

      <PageHero eyebrow="Areas We Serve" title={h1} subtitle={location.tagline} breadcrumbs={breadcrumbs}>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
            <MapPinIcon width={16} height={16} className="text-primary-dark" />
            {location.distance}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm">
            <ClockIcon width={16} height={16} className="text-primary-dark" />
            Open 7 days
          </span>
        </div>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button to="/book" size="lg">
            Book an Appointment
          </Button>
          <LinkButton href={business.phoneHref} variant="outline" size="lg">
            <PhoneIcon width={17} height={17} />
            {business.phoneDisplay}
          </LinkButton>
        </div>
      </PageHero>

      <Section>
        <Container className="max-w-prose">
          <div className="prose-body space-y-4 text-lg leading-relaxed text-foreground/90">
            {location.intro.map((p, i) => (
              <p key={i}>
                <RichText text={p} />
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Getting here */}
      <Section variant="cream">
        <Container className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Getting here" title={`Directions from ${location.city}`} />
            <p className="mt-5 font-medium text-charcoal">{location.distance}</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">{location.landmarks}</p>
            <address className="mt-6 flex items-start gap-3 not-italic">
              <MapPinIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
              <span className="leading-relaxed text-foreground/90">
                {business.address.street}
                <br />
                {business.address.city}, {business.address.state} {business.address.zip}
                <br />
                <a href={business.phoneHref} className="font-medium text-primary-dark underline underline-offset-2">
                  {business.phoneDisplay}
                </a>
              </span>
            </address>
          </div>
          <Reveal>
            <div className="space-y-4">
              <Photo
                name={salonPhotos.sign.name}
                alt={salonPhotos.sign.alt}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="rounded-2xl border border-border shadow-card"
              />
              <MapEmbed title={`Map and directions from ${location.city}, IL to ${business.name}`} />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why locals choose us */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="The local favorite"
            title={`Why ${location.city} chooses Beauty Nails Spa`}
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {location.whyLocals.map((reason) => (
              <div key={reason} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-5">
                <CheckIcon width={22} height={22} className="mt-0.5 shrink-0 text-primary-dark" />
                <p className="leading-relaxed text-foreground/90">{reason}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Popular services */}
      {popular.length > 0 && (
        <Section variant="cream">
          <Container>
            <SectionHeading
              eyebrow="Most requested"
              title={`Popular with our ${location.city} guests`}
              subtitle={location.servicesIntro}
            />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {popular.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 font-semibold text-primary-dark hover:text-primary"
              >
                Browse all services
                <ArrowRightIcon width={16} height={16} />
              </Link>
            </div>
          </Container>
        </Section>
      )}

      {/* Area FAQ */}
      {location.faqs.length > 0 && (
        <Section>
          <Container className="max-w-3xl">
            <SectionHeading eyebrow={`${location.city} questions`} title="Frequently asked" align="center" />
            <div className="mt-8">
              <FAQAccordion faqs={location.faqs} />
            </div>
          </Container>
        </Section>
      )}

      {/* Nearby areas */}
      {nearby.length > 0 && (
        <Section variant="cream">
          <Container>
            <SectionHeading eyebrow="Nearby" title="Other areas we serve" />
            <div className="mt-6 flex flex-wrap gap-3">
              {nearby.map((l) => (
                <Link
                  key={l.slug}
                  to={`/${l.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:border-primary/50 hover:text-primary-dark"
                >
                  <MapPinIcon width={15} height={15} className="text-primary-dark" />
                  {l.city}, IL
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand
        title={`Your nail salon near ${location.city}`}
        text="Call or book online to reserve your time. We cannot wait to pamper you."
      />
    </>
  )
}
