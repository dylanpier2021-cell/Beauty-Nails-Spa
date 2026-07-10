import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { business } from '@/data/business'
import { Seo } from '@/components/Seo'
import { PageHero } from '@/components/PageHero'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { ActionButton, LinkButton } from '@/components/Button'
import { CheckIcon, PhoneIcon } from '@/components/icons'

const inputClass =
  'w-full rounded-md border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30'

/**
 * /feedback: the private path for guests who tapped 1-3 stars on /review. Their
 * comments go straight to the salon owner instead of a public review site.
 *
 * With no server on this static site, submitting opens the guest's mail app with
 * the message pre-filled to the salon (an honest, zero-setup channel). To send
 * submissions to a CRM/inbox instead, swap the mailto in handleSubmit for a POST
 * to a form endpoint (e.g. a GoHighLevel form) later.
 */
export default function Feedback() {
  const [params] = useSearchParams()
  const rating = params.get('rating')
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const body = [
      rating ? `Rating: ${rating} of 5 stars` : null,
      name ? `Name: ${name}` : null,
      contact ? `Best way to reach me: ${contact}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n')
    const subject = `Website feedback for ${business.name}`
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <>
      <Seo
        title={`Share Your Feedback | ${business.name}`}
        description={`Tell ${business.name} in ${business.address.city}, ${business.address.state} how we can do better. Your feedback goes straight to our team.`}
        path="/feedback"
        noindex
      />
      <PageHero
        eyebrow="We're listening"
        title="Help us make it right"
        subtitle="We're sorry your visit wasn't five-star. Tell us what happened and it goes straight to our owner, privately. We read every message and we want the chance to fix it."
      />

      <Section>
        <Container className="max-w-2xl">
          {sent ? (
            <div className="rounded-2xl border border-border bg-secondary/50 p-8 text-center shadow-card">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground">
                <CheckIcon width={26} height={26} />
              </span>
              <h2 className="mt-5 font-serif text-2xl text-charcoal">Thank you</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                Your email app should have opened with your feedback ready to
                send, just hit send and it comes straight to us. If it didn't
                open, please call or email us directly and we'll make it right.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <LinkButton href={business.phoneHref}>
                  <PhoneIcon width={16} height={16} />
                  Call {business.phoneDisplay}
                </LinkButton>
                <LinkButton href={`mailto:${business.email}`} variant="outline">
                  Email us
                </LinkButton>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {rating && (
                <p className="rounded-md border border-border bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
                  You rated your visit{' '}
                  <span className="font-semibold text-charcoal">{rating} of 5 stars</span>. Thank
                  you for the honesty, tell us more below.
                </p>
              )}

              <div>
                <label htmlFor="fb-name" className="mb-1.5 block text-sm font-medium text-charcoal">
                  Name <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="fb-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="fb-contact" className="mb-1.5 block text-sm font-medium text-charcoal">
                  Phone or email{' '}
                  <span className="font-normal text-muted-foreground">
                    (optional, so we can follow up)
                  </span>
                </label>
                <input
                  id="fb-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={inputClass}
                  placeholder="How can we reach you?"
                />
              </div>

              <div>
                <label htmlFor="fb-message" className="mb-1.5 block text-sm font-medium text-charcoal">
                  What could we have done better?
                </label>
                <textarea
                  id="fb-message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={inputClass}
                  placeholder="Tell us about your visit..."
                />
              </div>

              <ActionButton type="submit" size="lg" className="w-full sm:w-auto">
                Send feedback privately
              </ActionButton>
              <p className="text-xs text-muted-foreground">
                Your feedback goes directly to {business.owner} and our team, it is not
                posted publicly.
              </p>
            </form>
          )}
        </Container>
      </Section>
    </>
  )
}
