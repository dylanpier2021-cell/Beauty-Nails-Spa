import { useEffect, useMemo, useState } from 'react'
import { booking } from '@/data/booking'
import { priceMenu } from '@/data/pricing'
import { ActionButton } from '@/components/Button'

/**
 * On-brand booking widget backed by Hien Vu's Google Calendar.
 *
 * A booking page can't hold Google credentials safely, so this talks to a
 * Google Apps Script Web App (see the `Code.gs` in the project root and the
 * setup guide). The script reads/writes the salon's Google Calendar and
 * enforces the 3-station limit (3 concurrent appointments per time window).
 *
 * Set `googleAppsScriptUrl` in src/data/booking.ts to the deployed /exec URL.
 * On a successful booking the guest is sent to /thank-you, which is where the
 * Meta "Booking Completed" custom conversion fires.
 */

type Service = { name: string; price: string; durationMin: number }
type Slot = { time: string; start: string; stationsLeft: number }
type Step = 1 | 2 | 3

/** Pull the service list out of the site's existing price menu. */
function useServices(): { group: string; items: Service[] }[] {
  return useMemo(
    () =>
      priceMenu.map((g) => ({
        group: g.title,
        items: g.items.map((it) => ({
          name: it.name,
          price: it.price,
          durationMin: parseInt(String(it.duration).replace(/\D/g, ''), 10) || 30,
        })),
      })),
    [],
  )
}

function todayISO(): string {
  const d = new Date()
  const off = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - off).toISOString().slice(0, 10)
}

export function GoogleCalendarBooking() {
  const groups = useServices()
  const url = booking.googleAppsScriptUrl

  const [step, setStep] = useState<Step>(1)
  const [service, setService] = useState<Service | null>(null)
  const [date, setDate] = useState<string>(todayISO())
  const [slots, setSlots] = useState<Slot[]>([])
  const [slot, setSlot] = useState<Slot | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [submitting, setSubmitting] = useState(false)

  // Fetch open times whenever service + date are chosen.
  useEffect(() => {
    if (step !== 2 || !service || !date) return
    let cancelled = false
    setLoading(true)
    setError('')
    setSlot(null)
    const q = `${url}?action=openslots&date=${encodeURIComponent(date)}&durationMin=${service.durationMin}`
    fetch(q)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return
        if (!data.ok) throw new Error(data.error || 'Could not load times')
        if (data.open === false) {
          setSlots([])
          setError('The salon is closed that day. Please pick another date.')
        } else {
          setSlots(data.slots || [])
          if (!data.slots || data.slots.length === 0)
            setError('No open times that day. Please try another date.')
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not reach the calendar. Please try again, or call us.')
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [step, service, date, url])

  async function submit() {
    if (!service || !slot) return
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids CORS preflight
        body: JSON.stringify({
          token: booking.googleAppsScriptToken,
          service: service.name,
          durationMin: service.durationMin,
          price: service.price,
          start: slot.start,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
        }),
      })
      const data = await res.json()
      if (!data.ok) {
        if (data.reason === 'full') {
          setError('That time was just taken. Please choose another.')
          setStep(2)
        } else {
          setError(data.message || 'Something went wrong. Please try again.')
        }
        setSubmitting(false)
        return
      }
      // Success -> confirmation page (Meta conversion fires here).
      const p = new URLSearchParams({ service: service.name, time: slot.time, date })
      window.location.assign(`/thank-you?${p.toString()}`)
    } catch {
      setError('Could not reach the calendar. Please try again, or call us.')
      setSubmitting(false)
    }
  }

  const canSubmit = form.name.trim() && form.phone.trim() && !submitting

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-card sm:p-8">
      {/* Progress */}
      <ol className="mb-6 flex items-center gap-2 text-xs font-medium text-muted-foreground">
        {['Service', 'Date & time', 'Your details'].map((label, i) => {
          const n = (i + 1) as Step
          const active = step === n
          const done = step > n
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={
                  'grid h-6 w-6 place-items-center rounded-full border text-[11px] ' +
                  (active
                    ? 'border-primary bg-primary text-primary-foreground'
                    : done
                      ? 'border-primary bg-primary/10 text-primary-dark'
                      : 'border-border')
                }
              >
                {i + 1}
              </span>
              <span className={active ? 'text-charcoal' : ''}>{label}</span>
              {i < 2 && <span className="mx-1 h-px w-5 bg-border" />}
            </li>
          )
        })}
      </ol>

      {/* STEP 1: service */}
      {step === 1 && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            Choose your service. Our technicians work side by side, so several guests can be seen at once.
          </p>
          <div className="space-y-6">
            {groups.map((g) => (
              <div key={g.group}>
                <h3 className="mb-2 font-serif text-lg text-charcoal">{g.group}</h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {g.items.map((it) => {
                    const sel = service?.name === it.name
                    return (
                      <button
                        key={it.name}
                        type="button"
                        onClick={() => setService(it)}
                        className={
                          'flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition ' +
                          (sel
                            ? 'border-primary bg-secondary ring-2 ring-primary/20'
                            : 'border-border hover:border-primary')
                        }
                      >
                        <span>
                          <span className="block text-sm font-semibold text-charcoal">{it.name}</span>
                          <span className="block text-xs text-muted-foreground">{it.durationMin} min</span>
                        </span>
                        <span className="shrink-0 font-semibold text-primary-dark">{it.price}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <ActionButton disabled={!service} onClick={() => setStep(2)}>
              Continue
            </ActionButton>
          </div>
        </div>
      )}

      {/* STEP 2: date and time */}
      {step === 2 && service && (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">
            Booking <strong className="text-charcoal">{service.name}</strong> ({service.durationMin} min).
            Times shown have an open station.
          </p>
          <label className="mb-1 block text-sm font-medium text-charcoal" htmlFor="bk-date">
            Date
          </label>
          <input
            id="bk-date"
            type="date"
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mb-4 w-full max-w-xs rounded-lg border border-border bg-secondary p-3 text-charcoal"
          />

          {loading && <p className="text-sm text-muted-foreground">Loading open times…</p>}
          {!loading && error && <p className="text-sm text-primary-dark">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {slots.map((s) => {
                const sel = slot?.start === s.start
                return (
                  <button
                    key={s.start}
                    type="button"
                    onClick={() => setSlot(s)}
                    className={
                      'rounded-lg border p-2 text-center transition ' +
                      (sel ? 'border-primary bg-secondary ring-2 ring-primary/20' : 'border-border hover:border-primary')
                    }
                  >
                    <span className="block text-sm font-semibold text-charcoal">{s.time}</span>
                    <span className="block text-[11px] text-muted-foreground">{s.stationsLeft} open</span>
                  </button>
                )
              })}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <ActionButton variant="outline" onClick={() => setStep(1)}>
              Back
            </ActionButton>
            <ActionButton disabled={!slot} onClick={() => setStep(3)}>
              Continue
            </ActionButton>
          </div>
        </div>
      )}

      {/* STEP 3: details */}
      {step === 3 && service && slot && (
        <div>
          <div className="mb-4 rounded-xl bg-secondary p-4 text-sm">
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Service</span>
              <span className="text-charcoal">{service.name}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">When</span>
              <span className="text-charcoal">
                {new Date(slot.start).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })} · {slot.time}
              </span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">Price</span>
              <span className="font-semibold text-primary-dark">{service.price}</span>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              placeholder="Full name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-lg border border-border bg-secondary p-3 text-charcoal"
            />
            <input
              placeholder="Phone *"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="rounded-lg border border-border bg-secondary p-3 text-charcoal"
            />
          </div>
          <input
            placeholder="Email (for your confirmation)"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-3 w-full rounded-lg border border-border bg-secondary p-3 text-charcoal"
          />

          {error && <p className="mt-3 text-sm text-primary-dark">{error}</p>}

          <div className="mt-6 flex justify-between">
            <ActionButton variant="outline" onClick={() => setStep(2)}>
              Back
            </ActionButton>
            <ActionButton disabled={!canSubmit} onClick={submit}>
              {submitting ? 'Booking…' : 'Confirm booking'}
            </ActionButton>
          </div>
        </div>
      )}
    </div>
  )
}
