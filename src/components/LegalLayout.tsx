import type { ReactNode } from 'react'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from './Seo'
import { JsonLd } from './JsonLd'
import { PageHero } from './PageHero'
import { Section } from './Section'
import { Container } from './Container'

export function LegalLayout({
  title,
  metaTitle,
  description,
  path,
  updated,
  children,
}: {
  title: string
  metaTitle: string
  description: string
  path: string
  updated: string
  children: ReactNode
}) {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ]
  return (
    <>
      <Seo title={metaTitle} description={description} path={path} />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <PageHero eyebrow="Legal" title={title} subtitle={`Last updated ${updated}`} breadcrumbs={breadcrumbs} />
      <Section>
        <Container className="max-w-prose">
          <div className="legal">{children}</div>
        </Container>
      </Section>
    </>
  )
}
