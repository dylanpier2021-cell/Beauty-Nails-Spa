import { useEffect } from 'react'
import { booking, isOnlineBookingEnabled } from '@/data/booking'
import { business } from '@/data/business'
import { PhoneIcon } from './icons'

/**
 * Embeds Hien's GoHighLevel calendar. The GHL `form_embed.js` script auto-resizes
 * the iframe to fit its content. The 10% deposit is configured on the GHL calendar
 * itself, so it is collected securely inside this widget. Until the calendar URL is
 * set in src/data/booking.ts, a phone fallback is shown instead.
 */
export function BookingWidget() {
  if (!isOnlineBookingEnabled()) return <BookingFallback />
  return <BookingEmbed />
}

function BookingEmbed() {
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
        id="ghl-booking-widget"
        src={booking.ghlCalendarUrl}
        title={`Book an appointment at ${business.name}`}
        scrolling="no"
        loading="lazy"
        style={{ width: '100%', minHeight: 720, border: 'none' }}
      />
    </div>
  )
}

function BookingFallback() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-secondary p-8 text-center shadow-card">
      <h3 className="font-serif text-2xl text-charcoal">Reserve by phone</h3>
      <p className="mx-auto mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Online booking is being set up. For now, the fastest way to lock in your appointment is a
        quick call, and we will happily help you choose the right service and time.
      </p>
      <a href={business.phoneHref} className="btn btn-primary mx-auto mt-5">
        <PhoneIcon width={16} height={16} />
        Call {business.phoneDisplay}
      </a>
    </div>
  )
}
