import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { services, serviceCategories } from '@/data/services'
import type { Service, ServiceCategory } from '@/data/types'
import { staff, type StaffMember } from '@/data/staff'
import { booking } from '@/data/booking'
import { business } from '@/data/business'
import { cn } from '@/lib/cn'
import { CalendarEmbed } from './CalendarEmbed'
import { ArrowRightIcon, CheckIcon, PhoneIcon, ShieldCheckIcon } from './icons'

type Step = 'service' | 'staff' | 'schedule'

const STEPS: { id: Step; label: string }[] = [
  { id: 'service', label: 'Service' },
  { id: 'staff', label: 'Specialist' },
  { id: 'schedule', label: 'Time and deposit' },
]

function buildUrl(member: StaffMember, service: Service): string {
  if (!member.ghlCalendarUrl) return ''
  if (!booking.servicePrefillParam) return member.ghlCalendarUrl
  const sep = member.ghlCalendarUrl.includes('?') ? '&' : '?'
  return `${member.ghlCalendarUrl}${sep}${booking.servicePrefillParam}=${encodeURIComponent(service.name)}`
}

export function BookingFlow() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState<Step>('service')
  const [category, setCategory] = useState<ServiceCategory>(serviceCategories[0])
  const [service, setService] = useState<Service | null>(null)
  const [specialist, setSpecialist] = useState<StaffMember | null>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const firstRun = useRef(true)

  const stepIndex = STEPS.findIndex((s) => s.id === step)
  const unlocked: Record<Step, boolean> = {
    service: true,
    staff: Boolean(service),
    schedule: Boolean(service && specialist),
  }

  // Move focus to the new step's heading on change (skip the initial mount).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    headingRef.current?.focus()
  }, [step])

  function jump(target: Step) {
    if (unlocked[target]) setStep(target)
  }

  const transition = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
        transition: { duration: 0.22 },
      }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-background shadow-card">
      {/* Step indicator */}
      <ol className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-4 sm:gap-3 sm:px-7">
        {STEPS.map((s, i) => {
          const done = i < stepIndex
          const current = i === stepIndex
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => jump(s.id)}
                disabled={!unlocked[s.id]}
                aria-current={current ? 'step' : undefined}
                className={cn(
                  'flex items-center gap-2 rounded-full',
                  unlocked[s.id] && !current ? 'cursor-pointer' : 'cursor-default',
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors',
                    done && 'bg-gold-gradient text-charcoal',
                    current && 'border-2 border-primary text-primary-dark',
                    !done && !current && 'border border-border text-muted-foreground',
                  )}
                >
                  {done ? <CheckIcon width={16} height={16} /> : i + 1}
                </span>
                <span
                  className={cn(
                    'hidden text-sm font-medium sm:inline',
                    current ? 'text-charcoal' : 'text-muted-foreground',
                  )}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && <span className="h-px flex-1 bg-border" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>

      <div className="p-5 sm:p-7">
        <AnimatePresence mode="wait">
          <motion.div key={step} {...transition}>
            {step === 'service' && (
              <section aria-label="Choose a service">
                <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl text-charcoal outline-none">
                  Choose your service
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick what you would like done. You can fine-tune the details with your specialist at your visit.
                </p>

                <div className="mt-5 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                  {serviceCategories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCategory(c)}
                      className={cn(
                        'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                        c === category
                          ? 'border-primary bg-gold-gradient text-charcoal'
                          : 'border-border text-muted-foreground hover:bg-secondary',
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {services
                    .filter((s) => s.category === category)
                    .map((s) => {
                      const selected = service?.slug === s.slug
                      return (
                        <li key={s.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setService(s)
                              setStep('staff')
                            }}
                            className={cn(
                              'flex w-full items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-colors',
                              selected
                                ? 'border-primary bg-secondary'
                                : 'border-border hover:border-primary/40 hover:bg-secondary/60',
                            )}
                          >
                            <span className="min-w-0">
                              <span className="block font-medium text-charcoal">{s.name}</span>
                              <span className="mt-0.5 block text-xs text-muted-foreground">{s.duration}</span>
                            </span>
                            <span className="flex shrink-0 items-center gap-2">
                              <span className="font-serif text-lg text-primary-dark">{s.priceFrom}</span>
                              <ArrowRightIcon width={16} height={16} className="text-primary-dark" />
                            </span>
                          </button>
                        </li>
                      )
                    })}
                </ul>
              </section>
            )}

            {step === 'staff' && (
              <section aria-label="Choose a specialist">
                <BackButton label="Service" onClick={() => setStep('service')} />
                <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl text-charcoal outline-none">
                  Choose your specialist
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Who would you like for your {service?.name}? Each works their own schedule.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {staff.map((m) => {
                    const selected = specialist?.id === m.id
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          setSpecialist(m)
                          setStep('schedule')
                        }}
                        className={cn(
                          'flex flex-col items-center rounded-2xl border p-5 text-center transition-all',
                          selected
                            ? 'border-primary bg-secondary'
                            : 'border-border hover:border-primary/40 hover:bg-secondary/60',
                        )}
                      >
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient font-serif text-2xl text-charcoal">
                          {m.name.charAt(0)}
                        </span>
                        <span className="mt-3 font-serif text-lg text-charcoal">{m.name}</span>
                        <span className="text-xs font-medium uppercase tracking-widish text-primary-dark">
                          {m.role}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.blurb}</span>
                      </button>
                    )
                  })}
                </div>
              </section>
            )}

            {step === 'schedule' && service && specialist && (
              <section aria-label="Pick a time and confirm">
                <BackButton label="Specialist" onClick={() => setStep('staff')} />
                <h3 ref={headingRef} tabIndex={-1} className="font-serif text-2xl text-charcoal outline-none">
                  Pick a time and confirm
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Chip label="Service" value={service.name} onChange={() => setStep('service')} />
                  <Chip label="With" value={specialist.name} onChange={() => setStep('staff')} />
                </div>

                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-primary/30 bg-secondary p-4">
                  <ShieldCheckIcon width={20} height={20} className="mt-0.5 shrink-0 text-primary-dark" />
                  <p className="text-sm leading-relaxed text-charcoal/90">
                    A <strong className="font-semibold">{booking.depositPercent}% deposit</strong> confirms your
                    appointment after you enter your details, and it goes toward your final total. Payment is
                    handled securely in the booking form below.
                  </p>
                </div>

                <div className="mt-5">
                  {buildUrl(specialist, service) ? (
                    <CalendarEmbed
                      url={buildUrl(specialist, service)}
                      title={`Book ${service.name} with ${specialist.name}`}
                    />
                  ) : (
                    <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-secondary p-6 text-center">
                      <h4 className="font-serif text-xl text-charcoal">Almost there</h4>
                      <p className="mx-auto mt-2 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
                        Online scheduling with {specialist.name} is being connected. To lock in your{' '}
                        {service.name}, give us a quick call and we will find the perfect time, deposit and all.
                      </p>
                      <a href={business.phoneHref} className="btn btn-primary mx-auto mt-4">
                        <PhoneIcon width={16} height={16} />
                        Call {business.phoneDisplay}
                      </a>
                    </div>
                  )}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function BackButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-dark"
    >
      <ArrowRightIcon width={15} height={15} className="rotate-180" />
      {label}
    </button>
  )
}

function Chip({ label, value, onChange }: { label: string; value: string; onChange: () => void }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary py-1.5 pl-3 pr-1.5 text-sm">
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium text-charcoal">{value}</span>
      <button
        type="button"
        onClick={onChange}
        className="rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary-dark hover:bg-background"
      >
        Change
      </button>
    </span>
  )
}
