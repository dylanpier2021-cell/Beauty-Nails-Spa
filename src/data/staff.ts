/**
 * The nail technicians, kept for an optional "our team" display.
 *
 * Booking no longer depends on this list. One shared GHL Round Robin calendar (see
 * src/data/booking.ts) handles all three technicians as team members, so guests book
 * a time rather than a specific person. This data is safe to edit, reorder or remove
 * without affecting whether booking works.
 */
import { booking } from './booking'

export interface StaffMember {
  id: string
  name: string
  role: string
  blurb: string
}

export const staff: StaffMember[] = [
  {
    id: 'hannah',
    name: 'Hannah',
    role: 'Owner and Lead Nail Artist',
    blurb: 'Founder of Beauty Nails Spa, loved for detailed nail art and a gentle, caring touch.',
  },
  {
    id: 'anna',
    name: 'Anna',
    role: 'Senior Nail Technician',
    blurb: 'A guest favorite for flawless gel, dip and classic sets that truly last.',
  },
  {
    // TODO: replace the name and role with your third technician's details.
    id: 'specialist-three',
    name: 'Team Member',
    role: 'Nail Technician',
    blurb: 'Skilled across manicures, pedicures and enhancements, with a warm, friendly approach.',
  },
]

export function staffById(id: string): StaffMember | undefined {
  return staff.find((s) => s.id === id)
}

/** True once the shared GHL booking URL has been set in booking.ts. */
export function isOnlineBookingEnabled(): boolean {
  return booking.ghlBookingUrl.trim().length > 0
}
