import type { Faq } from '@/data/types'
import { RichText } from './RichText'
import { ChevronDownIcon } from './icons'

/**
 * Uses native <details> so every answer is present in the static HTML and
 * accessible without JavaScript. Content stays crawlable, which keeps the
 * FAQPage structured data consistent with what users can read.
 */
export function FAQAccordion({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
      {faqs.map((faq, i) => (
        <details key={i} className="group px-5 sm:px-6" name="faq">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-serif text-lg text-charcoal">{faq.q}</span>
            <ChevronDownIcon
              width={20}
              height={20}
              className="shrink-0 text-primary-dark transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="-mt-1 pb-5 pr-6 leading-relaxed text-muted-foreground">
            <RichText text={faq.a} />
          </div>
        </details>
      ))}
    </div>
  )
}
