import { CalendarDays, Clock3, MapPin, Circle, ArrowDownUp } from 'lucide-react'
import { locations } from './data'
import { useBooking } from './booking-state'
export function TripFields() {
  const { trip, update } = useBooking()
  return <>
    <label className="field">Trip type<select value={trip.type} onChange={e => update({ type: e.target.value })}><option value="airport-arrival">Airport arrival</option><option value="airport-departure">Airport departure</option><option value="point-to-point">Point-to-point</option><option value="hourly">Hourly</option></select></label>
    <div className="route-inputs">
      <label className="icon-field"><Circle size={15} /><span className="sr-only">Pickup location</span><input required aria-label="Pickup location" placeholder="Pickup location" list="locations" value={trip.pickup} onChange={e => update({ pickup: e.target.value })} /></label>
      {trip.type !== 'hourly' && <><button className="swap" type="button" aria-label="Swap pickup and drop-off" onClick={() => update({ pickup: trip.dropoff, dropoff: trip.pickup })}><ArrowDownUp size={16} /></button><label className="icon-field"><MapPin size={18} /><span className="sr-only">Drop-off location</span><input required aria-label="Drop-off location" placeholder="Drop-off location" list="locations" value={trip.dropoff} onChange={e => update({ dropoff: e.target.value })} /></label></>}
    </div>
    <datalist id="locations">{locations.map(place => <option key={place} value={place} />)}</datalist>
    <div className="field-pair"><label className="field">Pickup date<div className="icon-field"><CalendarDays size={18} /><input required aria-label="Pickup date" type="date" value={trip.date} onInput={e => update({ date: e.currentTarget.value })} /></div></label><label className="field">Seattle time<div className="icon-field"><Clock3 size={18} /><input required aria-label="Seattle time" type="time" value={trip.time} onInput={e => update({ time: e.currentTarget.value })} /></div></label></div>
    {trip.type === 'hourly' && <label className="field">Duration (hours)<input type="number" min="2" max="12" required value={trip.duration} onChange={e => update({ duration: Number(e.target.value) })} /></label>}
  </>
}
