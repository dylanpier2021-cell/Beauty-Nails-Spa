import { Head } from 'vite-react-ssg'
import type { ReactNode } from 'react'
import { absUrl, DEFAULT_OG_IMAGE, SITE_NAME } from '@/lib/seo'

export interface SeoProps {
  title: string
  description: string
  /** Route path for this page, e.g. "/manicure-gel". Used for canonical + og:url. */
  path: string
  image?: string
  type?: 'website' | 'article'
  /** Only the 404 page should set this. */
  noindex?: boolean
  /** Extra <Head> children, e.g. article meta. */
  children?: ReactNode
}

export function Seo({ title, description, path, image, type = 'website', noindex, children }: SeoProps) {
  const canonical = absUrl(path)
  const img = image ?? DEFAULT_OG_IMAGE

  return (
    <Head>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
<meta name="google-site-verification" content="xBBAzszFmSbRPq2OUBLji0MFk286G-QgN6rWuJEF1fo" />
      {children}
    </Head>
  )
}
