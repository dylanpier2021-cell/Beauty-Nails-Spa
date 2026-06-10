import { business } from '@/data/business'
import { booking } from '@/data/booking'
import { salonPhotos } from '@/data/photos'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { MapEmbed } from '@/components/MapEmbed'
import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/Reveal'
import { BookingFlow } from '@/components/BookingFlow'
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, SparkleIcon } from '@/components/icons'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Book', path: '/book' },
]

const emailSubject = encodeURIComponent('Appointment request')
const emailBody = encodeURIComponent(
  'Hello Beauty Nails Spa,\n\nI would like to request an appointment.\n\nName:\nService:\nPreferred day and time:\nPhone:\n\nThank you!',
)

export default function Book() {
  return (
    <>
      <Seo
        title="Book an Appointment | Beauty Nails Spa Champaign IL"
        description={`Book your visit to Beauty Nails Spa in Champaign, IL online in minutes. A ${booking.depositPercent}% deposit confirms your spot, or call (217) 398-1898. Walk-ins welcome.`}
        path="/book"
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Booking"
        title="Book your visit"
        subtitle={`Reserve online in about a minute. A ${booking.depositPercent}% deposit confirms your spot and goes toward your service total. Prefer to talk? Call us, and walk-ins are always welcome.`}
        breadcrumbs={breadcrumbs}
      />

      {/* Online booking */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              align="center"
              eyebrow="Book online"
              title="Reserve your appointment"
              subtitle={`Choose your service, then your specialist, then a time. A ${booking.depositPercent}% deposit confirms your spot and goes toward your service total.`}
            />
            <div className="mt-8">
              <BookingFlow />
            </div>
          </div>
        </Container>
      </Section>

      {/* Other ways to book */}
      <Section variant="cream">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Other ways to book"
            title="Prefer to reach us directly?"
            subtitle="However you like to plan, we are happy to help you find the perfect time."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Call */}
            <div className="flex flex-col rounded-2xl border-2 border-primary/40 bg-background p-7 shadow-card">
              <PhoneIcon width={28} height={28} className="text-primary-dark" />
              <h3 className="mt-3 font-serif text-2xl text-charcoal">Call to book</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                Speak with our team to choose your service, time and technician. We will find a slot that
                works for you.
              </p>
              <a href={business.phoneHref} className="btn btn-primary mt-5">
                <PhoneIcon width={16} height={16} />
                {business.phoneDisplay}
              </a>
            </div>

            {/* Walk in */}
            <div className="flex flex-col rounded-2xl border border-border bg-background p-7 shadow-card">
              <SparkleIcon width={28} height={28} className="text-primary-dark" />
              <h3 className="mt-3 font-serif text-2xl text-charcoal">Walk in</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                In the area? Stop by during open hours and we will take great care of you. Weekday
                mornings and afternoons tend to be the quietest.
              </p>
              <a
                href={business.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-5"
              >
                <MapPinIcon width={16} height={16} />
                Get directions
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col rounded-2xl border border-border bg-background p-7 shadow-card">
              <MailIcon width={28} height={28} className="text-primary-dark" />
              <h3 className="mt-3 font-serif text-2xl text-charcoal">Request by email</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">
                Prefer to write? Send us your preferred day, time and service, and we will reply to
                confirm your appointment.
              </p>
              <a
                href={`mailto:${business.email}?subject=${emailSubject}&body=${emailBody}`}
                className="btn btn-outline mt-5"
              >
                <MailIcon width={16} height={16} />
                Email us
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Hours and location */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <SectionHeading eyebrow="Plan your visit" title="Hours and location" />
            <ul className="mt-6 space-y-4">
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
              <li className="flex items-start gap-3">
                <MapPinIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                <a href={business.maps} target="_blank" rel="noopener noreferrer" className="leading-relaxed hover:text-primary-dark">
                  {business.address.street}, {business.address.city}, {business.address.state}{' '}
                  {business.address.zip}
                </a>
              </li>
            </ul>
          </div>
          <Reveal>
            <div className="space-y-4">
              <Photo
                name={salonPhotos.pedicure.name}
                alt={salonPhotos.pedicure.alt}
                aspect="aspect-[16/10]"
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="rounded-2xl border border-border shadow-card"
              />
              <MapEmbed className="min-h-[20rem]" />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
