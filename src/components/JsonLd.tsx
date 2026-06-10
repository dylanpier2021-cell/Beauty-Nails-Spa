/**
 * Renders JSON-LD structured data into the static HTML. Only ever pass data
 * that describes content actually visible on the page.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
