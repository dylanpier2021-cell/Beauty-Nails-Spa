import { blogPosts } from '@/data/blog'
import type { BreadcrumbItem } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { BlogCard } from '@/components/BlogCard'
import { CtaBand } from '@/components/CtaBand'

const breadcrumbs: BreadcrumbItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
]

export default function Blog() {
  return (
    <>
      <Seo
        title="Nail Care Blog | Tips and Trends | Beauty Nails Spa"
        description="Nail care tips, gel and dip guides, pedicure advice and design inspiration from the team at Beauty Nails Spa in Champaign, IL."
        path="/blog"
      />
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />

      <PageHero
        eyebrow="The Blog"
        title="Nail care tips, trends and inspiration"
        subtitle="Real advice from our team to help you get the most out of every manicure, pedicure and set, between visits and beyond."
        breadcrumbs={breadcrumbs}
      />

      <Section>
        <Container>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title="Questions about your nails?" text="Our team is always happy to help. Call us or book your next visit." />
    </>
  )
}
