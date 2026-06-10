import { Link } from 'react-router-dom'
import { Seo } from '@/components/Seo'
import { Container } from '@/components/Container'
import { GoldDivider } from '@/components/GoldDivider'
import { Button } from '@/components/Button'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Book Now', to: '/book' },
  { label: 'Contact', to: '/contact-us' },
]

export default function NotFound() {
  return (
    <>
      {/* The only page that should carry a noindex tag. */}
      <Seo
        title="Page Not Found | Beauty Nails Spa"
        description="The page you are looking for could not be found. Explore our services or book your visit to Beauty Nails Spa in Champaign, IL."
        path="/404"
        noindex
      />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-serif text-7xl text-gold-gradient bg-gold-text bg-clip-text text-transparent">404</p>
        <GoldDivider align="center" className="my-6" />
        <h1 className="text-3xl text-charcoal sm:text-4xl">This page slipped away</h1>
        <p className="mt-4 max-w-md text-pretty text-muted-foreground">
          The page you were looking for may have moved or no longer exists. Let us help you find your way
          back to beautiful nails.
        </p>
        <div className="mt-8">
          <Button to="/">Back to Home</Button>
        </div>
        <nav aria-label="Helpful links" className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
          {quickLinks.map((l) => (
            <Link key={l.to} to={l.to} className="font-medium text-primary-dark hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </>
  )
}
