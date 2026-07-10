import type { ComponentType } from 'react'
import type { RouteRecord } from 'vite-react-ssg'
import App from './App'
import { serviceSlugs } from './data/services'
import { locationSlugs } from './data/locations'
import { blogSlugs } from './data/blog'

type Importer = () => Promise<Record<string, unknown>>

/** Lazy route helper that maps a module export to a router Component + SSG entry. */
function page(importer: Importer, entry: string, pick = 'default') {
  return {
    lazy: () => importer().then((m) => ({ Component: m[pick] as ComponentType })),
    entry,
  }
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, ...page(() => import('./pages/Home'), 'src/pages/Home.tsx') },
      { path: 'home', ...page(() => import('./pages/Home'), 'src/pages/Home.tsx') },

      { path: 'services', ...page(() => import('./pages/Services'), 'src/pages/Services.tsx') },
      { path: 'pricing', ...page(() => import('./pages/Pricing'), 'src/pages/Pricing.tsx') },
      { path: 'gallery', ...page(() => import('./pages/Gallery'), 'src/pages/Gallery.tsx') },

      {
        path: 'beauty-nails-spa-in-champaign-country',
        ...page(() => import('./pages/About'), 'src/pages/About.tsx'),
      },
      { path: 'contact-us', ...page(() => import('./pages/Contact'), 'src/pages/Contact.tsx') },
      { path: 'book', ...page(() => import('./pages/Book'), 'src/pages/Book.tsx') },

      { path: 'review-us-online', ...page(() => import('./pages/Reviews'), 'src/pages/Reviews.tsx', 'ReviewUsOnline') },
      { path: 'review', ...page(() => import('./pages/ReviewGate'), 'src/pages/ReviewGate.tsx') },
      { path: 'feedback', ...page(() => import('./pages/Feedback'), 'src/pages/Feedback.tsx') },
      { path: 'leave-a-review', ...page(() => import('./pages/Reviews'), 'src/pages/Reviews.tsx', 'LeaveAReview') },

      { path: 'blog', ...page(() => import('./pages/Blog'), 'src/pages/Blog.tsx') },
      {
        path: 'blog/:slug',
        ...page(() => import('./pages/BlogPostPage'), 'src/pages/BlogPostPage.tsx'),
        getStaticPaths: () => blogSlugs.map((s) => `/blog/${s}`),
      },

      { path: 'terms', ...page(() => import('./pages/Terms'), 'src/pages/Terms.tsx') },
      { path: 'privacy', ...page(() => import('./pages/Privacy'), 'src/pages/Privacy.tsx') },

      { path: 'thank-you', ...page(() => import('./pages/ThankYou'), 'src/pages/ThankYou.tsx') },

      // Pre-rendered custom 404 (the only noindex page).
      { path: '404', ...page(() => import('./pages/NotFound'), 'src/pages/NotFound.tsx') },

      // All service and location pages share one lazy chunk, enumerated for SSG.
      {
        path: ':slug',
        ...page(() => import('./pages/SlugPage'), 'src/pages/SlugPage.tsx'),
        getStaticPaths: () => [...serviceSlugs, ...locationSlugs].map((s) => `/${s}`),
      },

      // Client-side fallback for unknown routes (not pre-rendered).
      { path: '*', ...page(() => import('./pages/NotFound'), 'src/pages/NotFound.tsx') },
    ],
  },
]
