import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { business } from '@/data/business'
import { groupedServices } from '@/data/services'
import { locations } from '@/data/locations'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'
import { ArrowRightIcon, ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon } from './icons'

const ABOUT_PATH = '/beauty-nails-spa-in-champaign-country'

const simpleLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: ABOUT_PATH },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/review-us-online' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact-us' },
]

const navLinkClass =
  'rounded-full px-3 py-2 text-[0.83rem] font-medium text-charcoal/85 transition-colors hover:bg-secondary hover:text-charcoal'

export function Header() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<'services' | 'areas' | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null)
        setMobileOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const hoverOpen = (menu: 'services' | 'areas') => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenMenu(menu)
  }
  const hoverClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpenMenu(null), 140)
  }

  return (
    <header className="sticky top-0 z-50">
      <div className={cn('transition-colors', scrolled && 'bg-background/70 backdrop-blur-sm')}>
        <div className="container py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-background/95 py-2 pl-5 pr-2 shadow-soft backdrop-blur">
            <Link to="/" aria-label="Beauty Nails Spa home" className="shrink-0">
              <Logo />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:flex">
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
              <Link to={ABOUT_PATH} className={navLinkClass}>
                About
              </Link>

              <DesktopDropdown
                label="Services"
                open={openMenu === 'services'}
                onOpen={() => hoverOpen('services')}
                onClose={hoverClose}
                onToggle={() => setOpenMenu((m) => (m === 'services' ? null : 'services'))}
              >
                <div className="grid w-[44rem] grid-cols-3 gap-x-6 gap-y-1 p-5">
                  {groupedServices.map((group) => (
                    <div key={group.category}>
                      <p className="mb-2 border-b border-border pb-1.5 text-xs font-semibold uppercase tracking-widish text-primary-dark">
                        {group.category}
                      </p>
                      <ul className="space-y-0.5">
                        {group.items.map((s) => (
                          <li key={s.slug}>
                            <Link
                              to={`/${s.slug}`}
                              className="block rounded-lg px-2 py-1.5 text-sm text-charcoal/80 transition-colors hover:bg-secondary hover:text-charcoal"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-3 mt-1 border-t border-border pt-3">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-dark hover:text-primary"
                    >
                      View all services and pricing
                      <ArrowRightIcon width={15} height={15} />
                    </Link>
                  </div>
                </div>
              </DesktopDropdown>

              <Link to="/pricing" className={navLinkClass}>
                Pricing
              </Link>
              <Link to="/gallery" className={navLinkClass}>
                Gallery
              </Link>

              <DesktopDropdown
                label="Areas"
                open={openMenu === 'areas'}
                onOpen={() => hoverOpen('areas')}
                onClose={hoverClose}
                onToggle={() => setOpenMenu((m) => (m === 'areas' ? null : 'areas'))}
              >
                <div className="w-[24rem] p-4">
                  <p className="mb-2 border-b border-border pb-1.5 text-xs font-semibold uppercase tracking-widish text-primary-dark">
                    Nail Salon Serving
                  </p>
                  <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                    {locations.map((l) => (
                      <li key={l.slug}>
                        <Link
                          to={`/${l.slug}`}
                          className="block rounded-lg px-2 py-1.5 text-sm text-charcoal/80 transition-colors hover:bg-secondary hover:text-charcoal"
                        >
                          {l.city}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </DesktopDropdown>

              <Link to="/review-us-online" className={navLinkClass}>
                Reviews
              </Link>
              <Link to="/blog" className={navLinkClass}>
                Blog
              </Link>
              <Link to="/contact-us" className={navLinkClass}>
                Contact
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <a
                href={business.phoneHref}
                aria-label={`Call ${business.phoneDisplay}`}
                className="hidden h-11 w-11 items-center justify-center rounded-full border border-border text-primary-dark transition-colors hover:bg-secondary sm:inline-flex xl:hidden"
              >
                <PhoneIcon width={18} height={18} />
              </a>
              <Link to="/book" className="btn btn-primary hidden h-11 sm:inline-flex">
                Book Now
                <ArrowRightIcon width={16} height={16} />
              </Link>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal hover:bg-secondary xl:hidden"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} reduce={Boolean(reduce)} />
    </header>
  )
}

function DesktopDropdown({
  label,
  open,
  onOpen,
  onClose,
  onToggle,
  children,
}: {
  label: string
  open: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        type="button"
        className={cn(navLinkClass, 'flex items-center gap-1')}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onToggle}
      >
        {label}
        <ChevronDownIcon width={15} height={15} className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-soft">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileMenu({
  open,
  onClose,
  reduce,
}: {
  open: boolean
  onClose: () => void
  reduce: boolean
}) {
  const [section, setSection] = useState<'services' | 'areas' | null>(null)
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-charcoal/40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,90vw)] flex-col overflow-y-auto bg-background shadow-soft xl:hidden"
            initial={reduce ? { opacity: 0 } : { x: '100%' }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            role="dialog"
            aria-label="Site menu"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary"
              >
                <CloseIcon width={22} height={22} />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 px-3 py-4">
              {simpleLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-charcoal hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}

              <MobileAccordion
                label="Services"
                open={section === 'services'}
                onToggle={() => setSection((s) => (s === 'services' ? null : 'services'))}
              >
                <Link to="/services" className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary-dark">
                  All services
                </Link>
                {groupedServices.map((g) => (
                  <div key={g.category} className="mt-1">
                    <p className="px-3 pt-1 text-xs font-semibold uppercase tracking-widish text-muted-foreground">
                      {g.category}
                    </p>
                    {g.items.map((s) => (
                      <Link key={s.slug} to={`/${s.slug}`} className="block rounded-lg px-3 py-2 text-sm text-charcoal/80 hover:bg-secondary">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </MobileAccordion>

              <MobileAccordion
                label="Areas We Serve"
                open={section === 'areas'}
                onToggle={() => setSection((s) => (s === 'areas' ? null : 'areas'))}
              >
                {locations.map((l) => (
                  <Link key={l.slug} to={`/${l.slug}`} className="block rounded-lg px-3 py-2 text-sm text-charcoal/80 hover:bg-secondary">
                    {l.city}
                  </Link>
                ))}
              </MobileAccordion>
            </nav>

            <div className="space-y-2 border-t border-border p-4">
              <Link to="/book" className="btn btn-primary w-full">
                Book Now
              </Link>
              <a href={business.phoneHref} className="btn btn-outline w-full">
                <PhoneIcon width={16} height={16} />
                Call {business.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function MobileAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-base font-medium text-charcoal hover:bg-secondary"
      >
        {label}
        <ChevronDownIcon className={cn('transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="pb-2 pl-1">{children}</div>}
    </div>
  )
}
