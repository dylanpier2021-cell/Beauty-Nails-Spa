import { business } from '@/data/business'
import { generalFaqs } from '@/data/faqs'
import { salonPhotos } from '@/data/photos'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { MapEmbed } from '@/components/MapEmbed'
import { FAQAccordion } from '@/components/FAQAccordion'
import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/Reveal'
import { Button, LinkButton } from '@/components/Button'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, StarIcon } from '@/components/icons'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact-us' },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Beauty Nails Spa | Champaign, IL Nail Salon"
        description="Call, email or visit Beauty Nails Spa at 706 W Marketview Dr, Champaign, IL. Open 7 days a week. Walk-ins welcome and appointments recommended."
        path="/contact-us"
      />
      <JsonLd data={[breadcrumbSchema(breadcrumbs), faqSchema(generalFaqs)]} />

      <PageHero
        eyebrow="Contact"
        title="Get in touch"
        subtitle="We would love to hear from you. Call us to book, ask a question or just say hello. Walk-ins are always welcome."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading eyebrow="Visit or call" title="Find us in Champaign" />
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <MapPinIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <div>
                  <p className="font-medium text-charcoal">Address</p>
                  <a href={business.maps} target="_blank" rel="noopener noreferrer" className="leading-relaxed text-muted-foreground hover:text-primary-dark">
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <div>
                  <p className="font-medium text-charcoal">Phone</p>
                  <a href={business.phoneHref} className="text-muted-foreground hover:text-primary-dark">
                    {business.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MailIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <div>
                  <p className="font-medium text-charcoal">Email</p>
                  <a href={`mailto:${business.email}`} className="break-all text-muted-foreground hover:text-primary-dark">
                    {business.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <ClockIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <div>
                  <p className="font-medium text-charcoal">Hours</p>
                  <div className="space-y-0.5 text-muted-foreground">
                    {business.hours.map((h) => (
                      <p key={h.days}>
                        {h.days}: {h.open} to {h.close}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/book">Book an Appointment</Button>
              <LinkButton href={business.phoneHref} variant="outline">
                <PhoneIcon width={16} height={16} />
                Call Now
              </LinkButton>
            </div>
            <a
              href={business.reviews.google}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-primary"
            >
              <StarIcon width={15} height={15} /> Leave us a review on Google
            </a>
          </div>

          <Reveal>
            <div className="space-y-4">
              <Photo
                name={salonPhotos.door.name}
                alt={salonPhotos.door.alt}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="rounded-2xl border border-border shadow-card"
              />
              <MapEmbed className="min-h-[22rem]" />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section variant="cream">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Before you visit" title="Common questions" align="center" />
          <div className="mt-8">
            <FAQAccordion faqs={generalFaqs} />
          </div>
        </Container>
      </Section>
    </>
  )
}
