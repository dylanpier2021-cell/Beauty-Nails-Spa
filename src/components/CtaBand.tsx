import { Link } from 'react-router-dom'
import { business } from '@/data/business'
import { PhoneIcon } from './icons'
import { GoldDivider } from './GoldDivider'

export function CtaBand({
  title = 'Ready to treat yourself?',
  text = 'Book your appointment or call us today. Walk-ins are always welcome, and our friendly team is ready to pamper you.',
}: {
  title?: string
  text?: string
}) {
  return (
    <section className="bg-charcoal">
      <div className="container py-16 text-center sm:py-20">
        <GoldDivider align="center" className="mb-6" />
        <h2 className="mx-auto max-w-2xl text-balance text-3xl text-background sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-background/75">{text}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link to="/book" className="btn btn-primary h-12 px-8">
            Book an Appointment
          </Link>
          <a
            href={business.phoneHref}
            className="inline-flex h-12 items-center gap-2 rounded-md border border-background/30 px-7 text-sm font-semibold uppercase tracking-widish text-background transition-colors hover:border-primary-light hover:text-primary-light"
          >
            <PhoneIcon width={17} height={17} />
            {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  )
}
