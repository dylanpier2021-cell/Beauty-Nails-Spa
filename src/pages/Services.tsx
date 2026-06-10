import { groupedServices } from '@/data/services'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { ServiceCard } from '@/components/ServiceCard'
import { CtaBand } from '@/components/CtaBand'
import { Button } from '@/components/Button'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Nail Salon Services in Champaign, IL | Beauty Nails Spa"
        description="Explore manicures, pedicures, gel, dip powder, acrylic, Gel X and nail art at Beauty Nails Spa in Champaign, IL. Premium products and sterilized tools."
        path="/services"
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Our Services"
        title="Manicures, pedicures and nail enhancements"
        subtitle="Every treatment is performed with premium products, sterilized tools and a caring, unhurried touch. Tap any service for details, pricing and aftercare."
        breadcrumbs={breadcrumbs}
      >
        <div className="mt-7">
          <Button to="/pricing" variant="outline">
            See full price menu
          </Button>
        </div>
      </PageHero>

      {groupedServices.map((group, i) => (
        <Section key={group.category} variant={i % 2 === 0 ? 'default' : 'cream'}>
          <Container>
            <SectionHeading eyebrow={`${group.items.length} options`} title={group.category} />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((s) => (
                <ServiceCard key={s.slug} service={s} />
              ))}
            </div>
          </Container>
        </Section>
      ))}

      <CtaBand />
    </>
  )
}
