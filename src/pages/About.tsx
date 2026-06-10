import { business } from '@/data/business'
import { featuredTechs } from '@/data/reviews'
import { salonPhotos } from '@/data/photos'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { Photo } from '@/components/Photo'
import { Reveal } from '@/components/Reveal'
import { CtaBand } from '@/components/CtaBand'
import { CheckIcon, HeartIcon, SparkleIcon } from '@/components/icons'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/beauty-nails-spa-in-champaign-country' },
]

const sanitation = [
  'Every tool is sterilized between clients, with no exceptions',
  'Single-use disposable files and buffers wherever possible',
  'Fresh liners and freshly cleaned pedicure bowls for each guest',
  'Clean, organized stations and a spotless, welcoming space',
]

export default function About() {
  return (
    <>
      <Seo
        title="About Beauty Nails Spa | Champaign County Nail Salon"
        description="Meet Hannah and the family behind Beauty Nails Spa in Champaign, IL. Over 10 years of caring, detail-oriented nail care with the highest hygiene standards."
        path="/beauty-nails-spa-in-champaign-country"
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Our Story"
        title="A family welcome in the heart of Champaign County"
        subtitle="For over a decade, Beauty Nails Spa has been a place where neighbors are greeted by name and every detail is done with care."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-prose">
            <SectionHeading eyebrow="Meet Hannah" title="Built on care, run like family" />
            <div className="mt-6 space-y-4 leading-relaxed text-foreground/90">
              <p>
                Beauty Nails Spa began with a simple belief held by our owner, Hannah. She felt that a
                trip to the nail salon should feel less like an errand and more like a moment of genuine
                care. For more than {business.yearsInBusiness} years, she and her family have turned that
                belief into a calm, welcoming studio that Champaign County has come to love.
              </p>
              <p>
                What sets us apart is not just beautiful work, though our guests will happily tell you
                their polish lasts. It is the way we treat people. We learn your name, remember your
                favorite shade and take the time to get every detail right, from the shape of each nail to
                the warmth of the conversation.
              </p>
              <p>
                Today our team, including longtime technician Anna, carries that same spirit into every
                appointment. Whether it is your first visit or your fiftieth, our goal is for you to leave
                feeling pampered, confident and cared for.
              </p>
            </div>
          </div>

          <Reveal>
            <div className="space-y-5">
              <div className="rounded-3xl border border-border bg-gold-gradient p-2 shadow-card">
                <Photo
                  name={salonPhotos.sign.name}
                  alt={salonPhotos.sign.alt}
                  aspect="aspect-[4/5]"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                  className="rounded-[1.4rem]"
                />
              </div>
              <div className="rounded-2xl border border-border bg-secondary p-6">
                <HeartIcon width={26} height={26} className="text-primary-dark" />
                <p className="mt-2 font-serif text-xl leading-snug text-charcoal">
                  "Your nails deserve our full attention, and so do you."
                </p>
                <p className="mt-2 text-sm font-medium text-primary-dark">The Beauty Nails Spa family</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-secondary p-5 text-center">
                  <p className="font-serif text-3xl text-charcoal">{business.yearsInBusiness}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Years caring for guests</p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary p-5 text-center">
                  <p className="font-serif text-3xl text-charcoal">{business.reviewCount}+</p>
                  <p className="mt-1 text-sm text-muted-foreground">Five-star reviews</p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Values */}
      <Section variant="cream">
        <Container>
          <SectionHeading eyebrow="What we value" title="The little things, done right" align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {business.reasonsToChoose.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-background p-6 shadow-card">
                <SparkleIcon width={24} height={24} className="text-primary-dark" />
                <h3 className="mt-3 font-serif text-xl text-charcoal">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sanitation */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Your health first" title="Hygiene we are proud of" />
            <p className="mt-5 leading-relaxed text-foreground/90">
              Cleanliness is never an afterthought here. We hold ourselves to strict sanitation standards
              so you can relax completely, knowing your visit is as safe as it is beautiful.
            </p>
          </div>
          <ul className="space-y-3">
            {sanitation.map((s) => (
              <li key={s} className="flex items-start gap-3 rounded-xl border border-border bg-secondary/60 p-4">
                <CheckIcon width={22} height={22} className="mt-0.5 shrink-0 text-primary-dark" />
                <span className="leading-relaxed text-foreground/90">{s}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Atmosphere */}
      <Section variant="cream">
        <Container>
          <SectionHeading
            eyebrow="Our space"
            title="Step inside our Champaign salon"
            subtitle="Clean, calm and welcoming, from the polish wall to the pedicure chairs."
            align="center"
          />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[salonPhotos.door, salonPhotos.wall, salonPhotos.pedicure, salonPhotos.stations].map((photo) => (
              <Photo
                key={photo.name}
                name={photo.name}
                alt={photo.alt}
                aspect="aspect-[3/4]"
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="rounded-2xl border border-border shadow-card"
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section variant="warm">
        <Container className="text-center">
          <SectionHeading eyebrow="Our team" title="The hands behind your nails" align="center" />
          <div className="mx-auto mt-10 flex max-w-2xl flex-wrap justify-center gap-6">
            {featuredTechs.map((t) => (
              <div key={t.name} className="w-56 rounded-2xl border border-border bg-background p-6 shadow-card">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient font-serif text-2xl text-primary-foreground">
                  {t.name.charAt(0)}
                </div>
                <h3 className="mt-4 font-serif text-xl text-charcoal">{t.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Come experience the difference" />
    </>
  )
}
