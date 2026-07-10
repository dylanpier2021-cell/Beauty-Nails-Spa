import { useEffect } from 'react'

/** Meta (Facebook) Pixel ID for Beauty Nails Spa. */
const PIXEL_ID = '1021639393782840'

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: unknown
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    fbq?: Fbq
    _fbq?: Fbq
  }
}

/**
 * Meta Pixel, scoped to the booking page. Rendered only from <Book>, so a Meta
 * PageView fires whenever a guest reaches /book (the key conversion step),
 * including on client-side navigation into the page. The pixel library is
 * bootstrapped once; each visit sends a fresh PageView. The <noscript> image
 * covers visitors with JavaScript disabled on the pre-rendered page.
 */
export function MetaPixel() {
  useEffect(() => {
    if (!window.fbq) {
      const fbq = function (...args: unknown[]) {
        if (fbq.callMethod) fbq.callMethod.apply(fbq, args)
        else fbq.queue.push(args)
      } as Fbq
      fbq.queue = []
      fbq.push = fbq
      fbq.loaded = true
      fbq.version = '2.0'
      window.fbq = fbq
      window._fbq = window._fbq ?? fbq

      const script = document.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      document.head.appendChild(script)

      window.fbq('init', PIXEL_ID)
    }
    window.fbq('track', 'PageView')
  }, [])

  return (
    <noscript>
      <img
        height="1"
        width="1"
        alt=""
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  )
}
