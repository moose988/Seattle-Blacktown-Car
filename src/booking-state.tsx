import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
export type Trip = { type: string; pickup: string; dropoff: string; date: string; time: string; service: string; passengers: number; bags: number; duration: number; vehicle: string; flight: string; childSeat: boolean; assistance: string; notes: string }
export const emptyTrip: Trip = { type: 'airport-arrival', pickup: '', dropoff: '', date: '', time: '', service: 'airport-transfers', passengers: 1, bags: 1, duration: 3, vehicle: '', flight: '', childSeat: false, assistance: '', notes: '' }
const Context = createContext<{ trip: Trip; update: (p: Partial<Trip>) => void; reset: () => void } | null>(null)
export function BookingProvider({ children }: { children: ReactNode }) {
  const [trip, setTrip] = useState<Trip>(emptyTrip)
  return <Context.Provider value={{ trip, update: p => setTrip(t => ({ ...t, ...p })), reset: () => setTrip({ ...emptyTrip }) }}>{children}</Context.Provider>
}
export function useBooking() { const value = useContext(Context); if (!value) throw new Error('Missing BookingProvider'); return value }
// Explicit Seattle wall-time validation: reject DST gaps and ambiguous repeated hours.
export function validateSeattlePickup(date: string, time: string, now = Date.now()): string {
  if (!date || !time) return 'Choose a pickup date and time.'
  const target = `${date}T${time}`
  const wall = Date.parse(`${target}:00Z`)
  if (!Number.isFinite(wall)) return 'Enter a valid pickup date and time.'
  const formatter = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
  const candidates = [7, 8].map(offset => wall + offset * 3600000).filter(stamp => formatter.format(stamp).replace(' ', 'T') === target)
  if (!candidates.length) return 'That Seattle time does not exist during the clock change. Choose another time.'
  if (candidates.length > 1) return 'That Seattle time occurs twice during the clock change. Choose a time outside the repeated hour.'
  return candidates[0] <= now ? 'Choose a future pickup time in Seattle.' : ''
}
