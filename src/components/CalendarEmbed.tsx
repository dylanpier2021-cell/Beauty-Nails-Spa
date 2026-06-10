import { useEffect } from 'react'
import { booking } from '@/data/booking'

/**
 * Embeds a single GHL calendar. GHL's form_embed.js auto-resizes the iframe to fit
 * its content (date and time picker, contact form, and the deposit checkout).
 */
export function CalendarEmbed({ url, title }: { url: string; title: string }) {
  useEffect(() => {
    const src = booking.embedScript
    if (document.querySelector(`script[src="${src}"]`)) return
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-card">
      <iframe
        key={url}
        src={url}
        title={title}
        scrolling="no"
        loading="lazy"
        style={{ width: '100%', minHeight: 720, border: 'none' }}
      />
    </div>
  )
}
