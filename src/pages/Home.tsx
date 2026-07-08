import { Link } from 'react-router-dom'
import { business } from '@/data/business'
import { getService } from '@/data/services'
import { locations } from '@/data/locations'
import { reviews } from '@/data/reviews'
import { generalFaqs } from '@/data/faqs'
import { galleryPhotos, heroPhoto } from '@/data/photos'
import type { Service } from '@/data/types'
import { faqSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { HeroDecor } from '@/components/PageHero'
import { ContactBar } from '@/components/ContactBar'
import { TrustBar } from '@/components/TrustBar'
import { ServiceCard } from '@/components/ServiceCard'
import { ReviewCard } from '@/components/ReviewCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { MapEmbed } from '@/components/MapEmbed'
import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/Reveal'
import { Button, LinkButton } from '@/components/Button'
import { GoldDivider } from '@/components/GoldDivider'
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  SparkleIcon,
} from '@/components/icons'

const featuredSlugs = [
  'manicure-gel',
  'pedicure-deluxe',
  'gel-x-nails',
  'dip-powder-nails',
  'acrylic-nails',
  'nail-art',
]

const priceHighlights = [
  { name: 'Shellac (Gel) Manicure', price: '$40' },
  { name: 'Deluxe Volcano Spa Pedicure', price: '$60' },
  { name: 'Full Set Gel or Shellac', price: '$50+' },
  { name: 'Dipping Powder Manicure', price: '$45' },
]

export default function Home() {
  const featured = featuredSlugs.map(getService).filter((s): s is Service => Boolean(s))

  return (
    <>
      <Seo
        title="Beauty Nails Spa | Luxury Nail Salon in Champaign, IL"
        description="Beauty Nails Spa is Champaign County's premier luxury nail salon. Gel and dip manicures, spa pedicures, acrylic and nail art with sterilized tools. Book today."
        path="/"
      />
      <JsonLd data={faqSchema(generalFaqs)} />

      {/* Hero */}
      <section
        className="relative overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(120deg, #F4EFE6 0%, #FDFCF8 48%, #ECE4D6 100%)' }}
      >
        <HeroDecor />
        <Container className="relative grid items-center gap-10 py-12 sm:py-14 lg:min-h-[36rem] lg:grid-cols-2 lg:gap-8 lg:py-20">
          <div className="lg:pr-10">
            <span className="eyebrow">{business.tagline}</span>
            <h1 className="mt-5 text-balance font-serif text-[2.6rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
              Beautiful Nails,
              <span className="mt-1 block bg-gold-text bg-clip-text font-normal italic text-transparent">
                Crafted With Confidence
              </span>
              <meta name="google-site-verification" content="xBBAzszFmSbRPq2OUBLji0MFk286G-QgN6rWuJEF1fo" />
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Professional nail care and stunning designs for every occasion, finished with premium
              products, sterilized tools and a warm family welcome here in Champaign.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/book" size="lg">
                Book Now
                <SparkleIcon width={16} height={16} />
              </Button>
              <Button to="/services" variant="outline" size="lg">
                Our Services
                <SparkleIcon width={16} height={16} />
              </Button>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal/80">
              <li className="flex items-center gap-2">
                <CheckIcon width={17} height={17} className="text-primary-dark" /> Sterilized tools
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon width={17} height={17} className="text-primary-dark" /> Walk-ins welcome
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon width={17} height={17} className="text-primary-dark" /> Open 7 days
              </li>
            </ul>
          </div>

          {/* Mobile / tablet hero image */}
          <div className="lg:hidden">
            <Photo
              name={heroPhoto.name}
              alt={heroPhoto.alt}
              eager
              aspect="aspect-[5/4]"
              widths={[560, 1000]}
              sizes="100vw"
              className="rounded-3xl border border-border shadow-card"
            />
          </div>
        </Container>

        {/* Desktop full-bleed hero image */}
        <div className="absolute inset-y-0 right-0 hidden w-[40%] overflow-hidden xl:w-[44%] lg:block">
          <Photo
            name={heroPhoto.name}
            alt={heroPhoto.alt}
            eager
            aspect=""
            widths={[560, 1000]}
            sizes="45vw"
            className="h-full w-full rounded-l-[2.5rem] border border-border shadow-card"
          />
        </div>
      </section>
      <ContactBar />

      {/* Trust strip */}
      <Section className="!py-10">
        <Container>
          <TrustBar />
        </Container>
      </Section>

      {/* Passion for Nails */}
      <Section variant="cream">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Photo
              name={galleryPhotos[6].name}
              alt={galleryPhotos[6].alt}
              aspect="aspect-[4/5]"
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="rounded-[2rem] border border-border shadow-card"
            />
          </Reveal>
          <div>
            <span className="eyebrow">Welcome to Beauty Nails Spa</span>
            <GoldDivider className="mb-5 mt-3" />
            <h2 className="font-serif text-3xl text-charcoal sm:text-4xl lg:text-[2.6rem]">
              A passion for beautiful nails
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/90">
              <p>
                At Beauty Nails Spa, we believe every hand deserves to shine. For more than{' '}
                {business.yearsInBusiness} years, owner Hannah and her family have blended creativity and
                precision to deliver designs that reflect{' '}
                <em className="font-medium italic text-primary-dark">your style and personality</em>. From
                classic manicures to bold, trend-setting art, every visit leaves you feeling confident and
                pampered.
              </p>
              <p>
                We are committed to{' '}
                <em className="font-medium italic text-primary-dark">high-quality products</em>, careful
                hygiene and a relaxing atmosphere, because your nails deserve nothing less.
              </p>
            </div>
            <div className="mt-7 grid grid-cols-3 gap-3">
              {[galleryPhotos[4], galleryPhotos[7], galleryPhotos[11]].map((photo) => (
                <Photo
                  key={photo.name}
                  name={photo.name}
                  alt={photo.alt}
                  aspect="aspect-square"
                  sizes="(min-width: 1024px) 15vw, 30vw"
                  className="rounded-xl border border-border shadow-card"
                />
              ))}
            </div>
            <Link
              to="/beauty-nails-spa-in-champaign-country"
              className="mt-7 inline-flex items-center gap-2 font-semibold text-primary-dark hover:text-primary"
            >
              Read our story
              <ArrowRightIcon width={16} height={16} />
            </Link>
          </div>
        </Container>
      </Section>

      {/* Featured services */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="What we do"
            title="Services made for every occasion"
            subtitle="Explore our most-loved treatments, then browse the full menu of manicures, pedicures and enhancements."
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/services" variant="outline">
              View all services
            </Button>
          </div>
        </Container>
      </Section>

      {/* Recent work */}
      <Section variant="cream">
        <Container>
          <SectionHeading
            eyebrow="Our work"
            title="Freshly done at Beauty Nails Spa"
            subtitle="A peek at recent sets from our Champaign studio. Every design is created in house by our team."
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {galleryPhotos.slice(0, 8).map((photo) => (
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
          <div className="mt-10 text-center">
            <Button to="/gallery" variant="outline">
              View full gallery
            </Button>
          </div>
        </Container>
      </Section>

      {/* Pricing highlights */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <SectionHeading eyebrow="Honest pricing" title="Luxury that stays approachable" />
            <p className="mt-5 leading-relaxed text-foreground/90">
              Beautiful nails should not come with surprises. Here is a taste of our menu. You can always
              see the full list of services and prices, with no hidden fees.
            </p>
            <Button to="/pricing" className="mt-6">
              See full price menu
            </Button>
          </div>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background shadow-card">
            {priceHighlights.map((p) => (
              <li key={p.name} className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="font-medium text-charcoal">{p.name}</span>
                <span className="font-serif text-xl text-primary-dark">{p.price}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Reviews */}
      <Section variant="cream">
        <Container>
          <SectionHeading
            eyebrow="Loved by our guests"
            title="Kind words from Champaign County"
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r) => (
              <ReviewCard key={r.author} review={r} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button to="/review-us-online" variant="outline">
              Read more reviews
            </Button>
          </div>
        </Container>
      </Section>

      {/* Locations strip */}
      <Section variant="charcoal">
        <Container>
          <SectionHeading
            eyebrow="Proudly local"
            title="Serving Champaign County and beyond"
            subtitle="A convenient drive from across the area. Find your town below."
            align="center"
            light
          />
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {locations.map((l) => (
              <Link
                key={l.slug}
                to={`/${l.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-background/25 px-5 py-2.5 text-sm font-medium text-background transition-colors hover:border-primary-light hover:text-primary-light"
              >
                <MapPinIcon width={15} height={15} className="text-primary-light" />
                {l.city}
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section variant="cream">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" align="center" />
          <div className="mt-10">
            <FAQAccordion faqs={generalFaqs} />
          </div>
        </Container>
      </Section>

      {/* Contact / hours / map */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Visit us" title="Come say hello" />
            <ul className="mt-6 space-y-4">
              <li className="flex items-start gap-3">
                <MapPinIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <a href={business.maps} target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-primary-dark">
                  {business.address.street}, {business.address.city}, {business.address.state}{' '}
                  {business.address.zip}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon width={20} height={20} className="shrink-0 text-primary-dark" />
                <a href={business.phoneHref} className="font-medium hover:text-primary-dark">
                  {business.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <div className="space-y-0.5">
                  {business.hours.map((h) => (
                    <p key={h.days} className="leading-relaxed">
                      <span className="font-medium text-charcoal">{h.days}:</span> {h.open} to {h.close}
                    </p>
                  ))}
                </div>
              </li>
            </ul>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button to="/book">Book an Appointment</Button>
              <LinkButton href={business.phoneHref} variant="outline">
                <PhoneIcon width={16} height={16} />
                Call Us
              </LinkButton>
            </div>
          </div>
          <Reveal>
            <MapEmbed className="min-h-[22rem]" />
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
