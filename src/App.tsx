import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ChatWidget } from '@/components/ChatWidget'
import { JsonLd } from '@/components/JsonLd'
import { localBusinessSchema, websiteSchema } from '@/lib/schema'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      {/* Site-wide structured data describing the real business. */}
      <JsonLd data={[localBusinessSchema(), websiteSchema()]} />
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
