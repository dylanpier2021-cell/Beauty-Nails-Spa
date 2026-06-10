/**
 * Online booking via GoHighLevel (GHL). Guests pick a service and a specialist on
 * this site, then that specialist's GHL calendar (see src/data/staff.ts) handles
 * date and time, contact info, and the deposit.
 *
 * SETUP (one time, no code):
 * 1. In GHL open each specialist's calendar, then the share / embed option, and copy
 *    the iframe `src` from the embed code. It looks like:
 *      https://api.leadconnectorhq.com/widget/booking/XXXXXXXXXXXXXXXX
 *    Paste each one into the matching person in src/data/staff.ts.
 * 2. To require the 10% deposit, open each calendar's Payments tab, connect Stripe,
 *    enable "Accept payments", choose "Deposit", and set it to 10%. The deposit is
 *    collected securely inside the GHL widget. The website never touches card details.
 *
 * Until at least one calendar URL is set, the flow shows a "call to book" fallback.
 */
export const booking = {
  /** GHL auto-resize script. Kept configurable for white-label domains. */
  embedScript: 'https://link.msgsndr.com/js/form_embed.js',
  /** Deposit shown to guests, and the value to set on each GHL calendar. */
  depositPercent: 10,
  /**
   * Optional: if a calendar's booking form has a custom field for the requested
   * service, put its "query key" here to prefill it. Leave '' to skip. Unknown
   * params are ignored by GHL, so this is safe to leave blank.
   */
  servicePrefillParam: '',
}
