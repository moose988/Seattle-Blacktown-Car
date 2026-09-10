import { useState } from 'react'
import { CalendarDays, Clock3, MapPin, Circle, ArrowDownUp, LocateFixed } from 'lucide-react'
import { locations } from './data'
import { useBooking } from './booking-state'
export function TripFields() {
  const { trip, update } = useBooking()
  const [locationStatus, setLocationStatus] = useState('')
  const [locating, setLocating] = useState(false)

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus('Location is not available in this browser. Enter your pickup manually.')
      return
    }
    setLocating(true)
    setLocationStatus('Finding your location…')
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
        update({ pickup: `Current location · ${coordinates}` })
        setLocating(false)
        setLocationStatus('Current coordinates added. You can replace them with an address.')
      },
      () => {
        setLocating(false)
        setLocationStatus('We couldn’t access your location. Enter your pickup manually.')
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }
  return <>
    <label className="field">Trip type<select value={trip.type} onChange={e => update({ type: e.target.value })}><option value="airport-arrival">Airport arrival</option><option value="airport-departure">Airport departure</option><option value="point-to-point">Point-to-point</option><option value="hourly">Hourly</option></select></label>
    <div className="route-inputs">
      <div className="location-field"><label className="icon-field"><Circle size={15} /><span className="sr-only">Pickup location</span><input required aria-label="Pickup location" placeholder="Pickup location" list="locations" value={trip.pickup} onChange={e => update({ pickup: e.target.value })} /></label><button type="button" className="use-location" onClick={useCurrentLocation} disabled={locating}><LocateFixed size={17} />{locating ? 'Locating…' : 'Use my location'}</button></div>
      {trip.type !== 'hourly' && <><button className="swap" type="button" aria-label="Swap pickup and drop-off" onClick={() => update({ pickup: trip.dropoff, dropoff: trip.pickup })}><ArrowDownUp size={16} /></button><label className="icon-field"><MapPin size={18} /><span className="sr-only">Drop-off location</span><input required aria-label="Drop-off location" placeholder="Drop-off location" list="locations" value={trip.dropoff} onChange={e => update({ dropoff: e.target.value })} /></label></>}
    </div>
    {locationStatus && <p className="location-status" role="status">{locationStatus}</p>}
    <datalist id="locations">{locations.map(place => <option key={place} value={place} />)}</datalist>
    <div className="field-pair"><label className="field">Pickup date<div className="icon-field"><CalendarDays size={18} /><input required aria-label="Pickup date" type="date" value={trip.date} onInput={e => update({ date: e.currentTarget.value })} /></div></label><label className="field">Time<div className="icon-field"><Clock3 size={18} /><input required aria-label="Time" type="time" value={trip.time} onInput={e => update({ time: e.currentTarget.value })} /></div></label></div>
    {trip.type === 'hourly' && <label className="field">Duration (hours)<input type="number" min="2" max="12" required value={trip.duration} onChange={e => update({ duration: Number(e.target.value) })} /></label>}
  </>
}
