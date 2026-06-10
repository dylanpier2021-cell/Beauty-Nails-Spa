import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { galleryPhotos, salonPhotos } from '@/data/photos'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { Photo } from '@/components/Photo'
import { CtaBand } from '@/components/CtaBand'
import { SparkleIcon } from '@/components/icons'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
]

const salonShots = [salonPhotos.sign, salonPhotos.wall, salonPhotos.pedicure, salonPhotos.stations]

export default function Gallery() {
  return (
    <>
      <Seo
        title="Nail Art Gallery in Champaign, IL | Beauty Nails Spa"
        description="Browse real nail designs from Beauty Nails Spa in Champaign, IL. Manicures, spa pedicures, nail art and enhancements. Bring a photo and we will recreate it."
        path="/gallery"
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Gallery"
        title="Real work from our Champaign studio"
        subtitle="Every set below was created by our team. Save a favorite or bring your own inspiration photo, and we will tailor the perfect look for you."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {galleryPhotos.map((photo) => (
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

      <Section variant="cream">
        <Container>
          <SectionHeading
            eyebrow="Step inside"
            title="A warm, spotless space"
            subtitle="Relax in a clean, welcoming salon designed to feel like a true escape."
          />
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {salonShots.map((photo) => (
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

      <Section variant="warm">
        <Container className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <SparkleIcon width={32} height={32} className="text-primary-dark" />
          <h2 className="font-serif text-2xl text-charcoal sm:text-3xl">Have a design in mind?</h2>
          <p className="text-pretty text-muted-foreground">
            Screenshots and inspiration photos are always welcome. Share what you love and we will help
            you choose colors, shapes and finishes that suit you.
          </p>
        </Container>
      </Section>

      <CtaBand title="Ready to create your look?" />
    </>
  )
}
