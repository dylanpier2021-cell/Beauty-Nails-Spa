/**
 * Online booking via a single GoHighLevel (GHL) calendar embed.
 *
 * The salon needs 3 simultaneous bookings (one per technician) and bookings must
 * land on the salon's Google Calendar. A free Google appointment schedule only
 * allows 1 booking per slot, so we use one GHL Round Robin calendar instead: the 3
 * technicians are team members on it, which makes each open slot bookable up to 3
 * times (once per available tech), and GHL two-way syncs to Google Calendar.
 *
 * HUMAN SETUP (done by the owner in GHL, cannot be done in code):
 * 1. In GHL, create ONE calendar of type "Round Robin" (for example, name it
 *    "Book at Beauty Nails Spa").
 * 2. Add the 3 technicians as team members on that calendar with equal /
 *    round-robin distribution. This makes each open time slot bookable up to 3
 *    times, once per available tech, which gives the 3 concurrent bookings.
 * 3. Under the calendar's Connections, connect each technician's Google Calendar to
 *    the shared calendar
 *    90fd6b904986570d1af205006efe318b9a66a9571dc059cea3d2616563ae6e77@group.calendar.google.com
 *    so confirmed bookings write to Google Calendar and existing Google busy times
 *    block GHL.
 * 4. Optional deposit: open the calendar's Payments tab, connect Stripe, enable
 *    Accept payments, choose Deposit, set 10 percent. Then set depositEnabled: true
 *    below.
 * 5. Copy the calendar's Embed code and paste only the iframe `src` value into
 *    ghlBookingUrl below, then run `npm run build` and redeploy.
 *
 * Until ghlBookingUrl is set, the flow shows a graceful "call to book" fallback, so
 * nothing on the page looks broken.
 */
export const booking = {
  /**
   * Google Calendar booking (Hien Vu's salon calendar).
   *
   * Paste the deployed Google Apps Script Web App URL here (ends in /exec) — see
   * Code.gs and SETUP-INSTRUCTIONS.md in the project root. The `/book` page uses the
   * on-brand <GoogleCalendarBooking /> widget, which reads open times from and
   * writes appointments to the salon's Google Calendar, enforcing the 3-station
   * limit. While empty, the page shows a "call to book" fallback.
   */
  googleAppsScriptUrl: 'https://script.google.com/macros/s/AKfycbxOgxexbmHniNohEctZ_DCGSG8RzsNhYjCF9sPNoGCsrAlF-pdcBZNYIV0IPrIoBz35/exec',
  /** Shared secret — must match TOKEN in Code.gs. */
  googleAppsScriptToken: 'beautynails-2026',

  /**
   * The GHL calendar embed `src`. Paste only the iframe `src` value from the
   * calendar's Embed code (it looks like
   * https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXX). While empty, the
   * booking flow shows a "call to book" fallback.
   */
  ghlBookingUrl: 'https://api.leadconnectorhq.com/widget/service-menu/688b12ec01ebf656c618f3bd',
  /** GHL auto-resize script. It resizes the embedded iframe to fit its content. */
  embedScript: 'https://link.msgsndr.com/js/form_embed.js',
  /**
   * Whether a deposit is collected at booking. Keep false until Stripe is connected
   * in GHL and the deposit is set up there, so the page never promises a deposit
   * that is not actually being collected. Set true once the deposit is live.
   */
  depositEnabled: false,
  /** Deposit percentage shown to guests. Used only when `depositEnabled` is true. */
  depositPercent: 10,
}
