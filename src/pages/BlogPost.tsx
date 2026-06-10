import { Link } from 'react-router-dom'
import type { BlogPost as BlogPostType } from '@/data/types'
import { getRelatedPosts } from '@/data/blog'
import type { BreadcrumbItem } from '@/lib/seo'
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schema'
import { Seo } from '@/components/Seo'
import { JsonLd } from '@/components/JsonLd'
import { HeroDecor } from '@/components/PageHero'
import { Section, SectionHeading } from '@/components/Section'
import { Container } from '@/components/Container'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { GoldDivider } from '@/components/GoldDivider'
import { BlogContent } from '@/components/BlogContent'
import { BlogCard } from '@/components/BlogCard'
import { CtaBand } from '@/components/CtaBand'
import { ClockIcon } from '@/components/icons'

export function BlogPost({ post }: { post: BlogPostType }) {
  const path = `/blog/${post.slug}`
  const related = getRelatedPosts(post.related, post.slug)
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path },
  ]

  return (
    <>
      <Seo title={post.metaTitle} description={post.description} path={path} type="article">
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
        {post.tags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}
      </Seo>
      <JsonLd data={[blogPostingSchema(post), breadcrumbSchema(breadcrumbs)]} />

      {/* Article header */}
      <section className="relative overflow-hidden border-b border-border bg-secondary">
        <HeroDecor />
        <Container className="relative max-w-3xl py-12 sm:py-16">
          <div className="mb-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-background px-3 py-1 text-xs font-semibold uppercase tracking-widish text-primary-dark">
                {tag}
              </span>
            ))}
          </div>
          <GoldDivider className="mb-5 mt-4" />
          <h1 className="text-balance text-3xl leading-tight sm:text-4xl lg:text-[2.8rem]">{post.title}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>By {post.author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={post.date}>{post.dateDisplay}</time>
            <span aria-hidden="true">•</span>
            <span className="inline-flex items-center gap-1">
              <ClockIcon width={14} height={14} />
              {post.readingTime}
            </span>
          </div>
        </Container>
      </section>

      <Section>
        <Container className="max-w-3xl">
          <article>
            <BlogContent blocks={post.body} />
          </article>

          <div className="mt-12 rounded-2xl border border-border bg-secondary p-6 sm:flex sm:items-center sm:gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold-gradient font-serif text-2xl text-primary-foreground">
              {post.author.charAt(0)}
            </div>
            <div className="mt-4 sm:mt-0">
              <p className="font-serif text-lg text-charcoal">Written by {post.author}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Sharing nail care tips from the team at Beauty Nails Spa in Champaign, IL.{' '}
                <Link to="/book" className="font-medium text-primary-dark underline underline-offset-2">
                  Book your visit
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {related.length > 0 && (
        <Section variant="cream">
          <Container>
            <SectionHeading eyebrow="Keep reading" title="More from the blog" />
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CtaBand />
    </>
  )
}
