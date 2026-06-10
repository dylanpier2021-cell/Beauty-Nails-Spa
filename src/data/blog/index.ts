import type { BlogPost } from '../types'
import { blogPosts as rawPosts } from './posts'

/** Newest first. */
export const blogPosts: BlogPost[] = [...rawPosts].sort((a, b) =>
  a.date < b.date ? 1 : a.date > b.date ? -1 : 0,
)

const postBySlug = new Map(blogPosts.map((p) => [p.slug, p]))

export function getPost(slug: string): BlogPost | undefined {
  return postBySlug.get(slug)
}

export function getRelatedPosts(slugs: string[], excludeSlug?: string): BlogPost[] {
  const picked = slugs
    .map((slug) => postBySlug.get(slug))
    .filter((p): p is BlogPost => Boolean(p) && p!.slug !== excludeSlug)
  if (picked.length > 0) return picked.slice(0, 3)
  // Fallback: most recent other posts.
  return blogPosts.filter((p) => p.slug !== excludeSlug).slice(0, 3)
}

export const blogSlugs = blogPosts.map((p) => p.slug)
