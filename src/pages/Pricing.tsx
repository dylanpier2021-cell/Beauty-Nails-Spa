import { priceMenu, PRICING_NOTE } from '@/data/pricing'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { PriceCard } from '@/components/PriceTable'
import { CtaBand } from '@/components/CtaBand'
import { SparkleIcon } from '@/components/icons'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
]

export default function Pricing() {
  return (
    <>
      <Seo
        title="Nail Salon Prices in Champaign, IL | Beauty Nails Spa"
        description="See the full price menu at Beauty Nails Spa in Champaign, IL. Manicures from $30, spa pedicures, gel, dip, acrylic full sets and nail art. No hidden fees."
        path="/pricing"
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="Price Menu"
        title="Our full price menu"
        subtitle="Transparent pricing for every treatment. Final pricing can vary with nail length, shape and design, and our team will always confirm before we begin."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {priceMenu.map((group) => (
              <PriceCard key={group.title} title={group.title} items={group.items} />
            ))}
          </div>
          <div className="mx-auto mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-primary/25 bg-secondary p-5 text-sm text-muted-foreground">
            <SparkleIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
            <p>{PRICING_NOTE}</p>
          </div>
        </Container>
      </Section>

      <CtaBand title="Found your treatment?" text="Book online or call us to reserve your time with the team." />
    </>
  )
}
