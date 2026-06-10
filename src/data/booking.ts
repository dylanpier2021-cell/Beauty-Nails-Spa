/**
 * Online booking via GoHighLevel (GHL), connected to Hien's calendar.
 *
 * SETUP (one time, no code):
 * 1. In GHL open Hien's calendar, then the share / embed option, and copy the
 *    iframe `src` from the embed code. It looks like:
 *      https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXXXXXX
 *    (White-label sub-accounts may show a custom domain. Paste whatever the embed code uses.)
 * 2. Paste that URL into `ghlCalendarUrl` below and redeploy.
 * 3. To require the 10% deposit: in that same calendar, open the Payments tab,
 *    connect Stripe, turn on "Accept payments", choose "Deposit", and set it to 10%.
 *    The deposit is collected securely inside the GHL widget. The website never
 *    touches card details.
 *
 * Leave `ghlCalendarUrl` empty to show the "call to book" fallback until it is connected.
 */
export const booking = {
  /** GHL calendar embed URL. Empty until connected. */
  ghlCalendarUrl: '',
  /** GHL auto-resize script. Kept configurable for white-label domains. */
  embedScript: 'https://link.msgsndr.com/js/form_embed.js',
  /** Deposit shown to guests, and the value to set on the GHL calendar. */
  depositPercent: 10,
}

export function isOnlineBookingEnabled(): boolean {
  return booking.ghlCalendarUrl.trim().length > 0
}
