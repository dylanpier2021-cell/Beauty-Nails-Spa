import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
 * Meta Pixel base code, installed site-wide (rendered once from <App>). The
 * pixel library is bootstrapped a single time, then a PageView is sent on first
 * load and on every client-side route change, so every page is tracked the way
 * Meta expects. The <noscript> image covers visitors with JavaScript disabled.
 */
export function MetaPixel() {
  const { pathname } = useLocation()

  // Bootstrap the pixel library once for the whole app.
  useEffect(() => {
    if (window.fbq) return
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
  }, [])

  // Track a PageView on first load and on each subsequent navigation.
  useEffect(() => {
    window.fbq?.('track', 'PageView')
  }, [pathname])

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
