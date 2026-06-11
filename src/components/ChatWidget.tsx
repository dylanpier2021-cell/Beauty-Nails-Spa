import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * GoHighLevel chat widget. Loaded on every page except those with their own
 * forms (the booking page), so the chat bubble never overlaps a form.
 *
 * The widget injects a <chat-widget> element that persists across client-side
 * navigation, so on form pages we hide it with CSS (see html[data-chat="hidden"]
 * in index.css) rather than tearing it down.
 */
const FORM_PAGES = ['/book']

export function ChatWidget() {
  const { pathname } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'
  const hidden = FORM_PAGES.includes(path)

  // Inject the loader once, the first time we are on a non-form page.
  useEffect(() => {
    if (hidden) return
    if (document.getElementById('ghl-chat-widget')) return
    const script = document.createElement('script')
    script.id = 'ghl-chat-widget'
    script.src = 'https://widgets.leadconnectorhq.com/loader.js'
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js')
    script.setAttribute('data-widget-id', '6a29fa2ca7554820d94cc015')
    script.setAttribute('data-source', 'WEB_USER')
    document.body.appendChild(script)
  }, [hidden])

  // Toggle visibility as the route changes.
  useEffect(() => {
    if (hidden) document.documentElement.setAttribute('data-chat', 'hidden')
    else document.documentElement.removeAttribute('data-chat')
  }, [hidden])

  return null
}
