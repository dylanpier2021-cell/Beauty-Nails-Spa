/**
 * The nail specialists guests can book with. Each connects to that person's own
 * GoHighLevel (GHL) calendar.
 *
 * SETUP: when a specialist's GHL calendar is ready, paste its embed URL into
 * `ghlCalendarUrl` (see src/data/booking.ts for where to find it). Until then,
 * choosing that person shows a "call to book" fallback. Each calendar should have
 * the 10% deposit enabled in GHL (Payments tab).
 *
 * To rename, add or remove a specialist, just edit this list.
 */
export interface StaffMember {
  id: string
  name: string
  role: string
  blurb: string
  /** Paste this specialist's GHL calendar embed URL. Empty until connected. */
  ghlCalendarUrl: string
}

export const staff: StaffMember[] = [
  {
    id: 'hannah',
    name: 'Hannah',
    role: 'Owner and Lead Nail Artist',
    blurb: 'Founder of Beauty Nails Spa, loved for detailed nail art and a gentle, caring touch.',
    ghlCalendarUrl: '',
  },
  {
    id: 'anna',
    name: 'Anna',
    role: 'Senior Nail Technician',
    blurb: 'A guest favorite for flawless gel, dip and classic sets that truly last.',
    ghlCalendarUrl: '',
  },
  {
    // TODO: replace the name and role with your third technician's details.
    id: 'specialist-three',
    name: 'Team Member',
    role: 'Nail Technician',
    blurb: 'Skilled across manicures, pedicures and enhancements, with a warm, friendly approach.',
    ghlCalendarUrl: '',
  },
]

export function staffById(id: string): StaffMember | undefined {
  return staff.find((s) => s.id === id)
}

/** True once at least one specialist has a connected GHL calendar. */
export function isOnlineBookingEnabled(): boolean {
  return staff.some((s) => s.ghlCalendarUrl.trim().length > 0)
}
