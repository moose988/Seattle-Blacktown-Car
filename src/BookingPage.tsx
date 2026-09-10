import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowLeft, ArrowRight, Check, Mail, Phone, Printer } from 'lucide-react'
import { useBooking, validateSeattlePickup } from './booking-state'
import { services, vehicles } from './data'
import { TripFields } from './TripFields'
import { VehicleCard } from './App'
import { calculateStaticEstimate } from './rates-data'
import { CapacityControl } from './CapacityControl'
import { brand } from './site-config'

const maxPassengers = Math.max(...vehicles.map(vehicle => vehicle.passengers))
const maxBags = Math.max(...vehicles.map(vehicle => vehicle.bags))

function FareEstimate({ type, pickup, dropoff, time, passengers, vehicle }: { type: string; pickup: string; dropoff: string; time: string; passengers: number; vehicle: string }) {
  const estimate = calculateStaticEstimate({ type, pickup, dropoff, time, passengers, vehicle })
  return <section className="fare-estimate" aria-labelledby="fare-estimate-heading">
    <p className="eyebrow">YOUR ESTIMATE</p>
    <h3 id="fare-estimate-heading">Estimated fare</h3>
    <strong className="estimate-price">{estimate.priceLabel}</strong>
    {estimate.matched ? <>
      <dl className="estimate-breakdown">
        <div><dt>Published rate{estimate.matchLabel ? ` · ${estimate.matchLabel}` : ''}</dt><dd>{estimate.sourceRate || estimate.baseLabel}</dd></div>
        {estimate.adjustments.map(adjustment => <div key={adjustment.label}><dt>{adjustment.label}</dt><dd>+${adjustment.amount}</dd></div>)}
      </dl>
      {estimate.note && <p className="estimate-note">Rate-sheet note: {estimate.note}</p>}
      <p className="estimate-disclosure">20% gratuity not included.</p>
      <p>Estimate only. Final pricing and availability are confirmed with your reservation.</p>
    </> : <p>We’ll confirm pricing for this journey with your request.</p>}
  </section>
}

export function BookingPage() {
  const { trip, update, reset } = useBooking()
  const [step, setStep] = useState(1); const [error, setError] = useState(''); const [reference, setReference] = useState('')
  const [guest, setGuest] = useState({ name: '', email: '', phone: '' })
  const heading = useRef<HTMLHeadingElement>(null)
  const matching = vehicles.filter(v => v.passengers >= trip.passengers && v.bags >= trip.bags)
  const chosen = matching.find(v => v.id === trip.vehicle)
  const quoteOnly = !matching.length
  useEffect(() => { heading.current?.focus() }, [step, reference])
  function next(e: FormEvent) {
    e.preventDefault()
    const message = validateSeattlePickup(trip.date, trip.time)
    if (message) { setError(message); document.querySelector<HTMLInputElement>('[aria-label="Pickup date"]')?.focus(); return }
    if (step === 2 && !chosen && !quoteOnly) { setError('Choose a vehicle to continue.'); return }
    setError(''); setStep(step + 1)
  }
  function finish(e: FormEvent) { e.preventDefault(); if (reference) return; const message = validateSeattlePickup(trip.date, trip.time); if (message || (!chosen && !quoteOnly)) { setError(message || 'Please choose a compatible vehicle.'); setStep(1); return }; setReference(`SBTC-${crypto.randomUUID().slice(0, 8).toUpperCase()}`) }
  const summary = <><dl className="summary-list"><div><dt>Service</dt><dd>{services.find(s => s.id === trip.service)?.name}</dd></div><div><dt>Journey</dt><dd>{trip.type.replaceAll('-', ' ')}</dd></div><div><dt>Pickup</dt><dd>{trip.pickup || 'Add a pickup location'}</dd></div><div><dt>{trip.type === 'hourly' ? 'Duration' : 'Destination'}</dt><dd>{trip.type === 'hourly' ? `${trip.duration} hours` : trip.dropoff || 'Add a destination'}</dd></div><div><dt>Date</dt><dd>{trip.date || 'Choose date'}</dd></div><div><dt>Time</dt><dd>{trip.time || 'Choose time'}</dd></div><div><dt>Passengers</dt><dd>{trip.passengers}</dd></div><div><dt>Luggage</dt><dd>{trip.bags}</dd></div><div><dt>Vehicle</dt><dd>{chosen?.name || (quoteOnly ? 'Group quote' : 'Choose a vehicle')}</dd></div>{trip.flight && <div><dt>Flight</dt><dd>{trip.flight}</dd></div>}{trip.childSeat && <div><dt>Child seat</dt><dd>Requested; confirmation needed</dd></div>}{trip.assistance && <div><dt>Accessibility assistance</dt><dd>{trip.assistanceNote || 'Requested; details to be confirmed'}</dd></div>}{trip.notes && <div><dt>Instructions</dt><dd>{trip.notes}</dd></div>}</dl><p className="quote-note">Pricing and availability will be confirmed directly.</p></>
  if (reference) return <section className="container section confirmation"><div className="confirmation-mark"><Check size={32} /></div><p className="eyebrow">TRIP SUMMARY · {reference}</p><h1 ref={heading} tabIndex={-1}>Your trip summary is ready.</h1><p>No reservation has been submitted. Call or email us to confirm pricing and availability.</p><div className="form-panel">{summary}<FareEstimate type={trip.type} pickup={trip.pickup} dropoff={trip.dropoff} time={trip.time} passengers={trip.passengers} vehicle={trip.vehicle} /></div><div className="confirmation-actions">{brand.phoneHref && <a className="button" href={brand.phoneHref}><Phone size={18} />Call to confirm</a>}{brand.email && <a className="button secondary" href={`mailto:${brand.email}`}><Mail size={18} />Email to confirm</a>}<button className="text-link" onClick={() => window.print()}><Printer size={18} />Print summary</button><button className="text-link" onClick={() => { reset(); setReference(''); setGuest({ name: '', email: '', phone: '' }); setStep(1) }}>Start a new booking</button></div></section>
  return <section className="container section booking-page"><p className="eyebrow">PRIVATE TRANSPORTATION</p><h1>Book a ride.</h1><p>Add your pickup, timing, passengers, and luggage.</p><ol className="progress">{['Your trip', 'Your vehicle', 'Review'].map((label, i) => <li key={label} className={step === i + 1 ? 'current' : step > i + 1 ? 'complete' : ''} aria-current={step === i + 1 ? 'step' : undefined}><span>{step > i + 1 ? <Check size={15} /> : i + 1}</span>{label}</li>)}</ol><div className="booking-layout"><div className="booking-work"><h2 ref={heading} tabIndex={-1}>{step === 1 ? 'Trip details' : step === 2 ? 'Choose a vehicle' : 'Review your trip'}</h2>{error && <p className="error" role="alert">{error}</p>}
    {step === 1 && <form onSubmit={next} className="form-panel"><label className="field">Service<select value={trip.service} onChange={e => { const service = e.target.value; update({ service, type: service === 'hourly' ? 'hourly' : service.startsWith('airport') ? 'airport-arrival' : 'point-to-point' }) }}>{services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label><TripFields /><div className="capacity-pair"><CapacityControl label="Passengers" value={trip.passengers} min={1} max={maxPassengers} onChange={passengers => update({ passengers })} /><CapacityControl label="Luggage" value={trip.bags} min={0} max={maxBags} onChange={bags => update({ bags })} /></div>{trip.type.startsWith('airport') && <label className="field">Flight number (optional)<input value={trip.flight} onChange={e => update({ flight: e.target.value })} placeholder="e.g. AS 123" /><small>Flight details will be confirmed before travel.</small></label>}<label className="check-field"><input type="checkbox" checked={trip.childSeat} onChange={e => update({ childSeat: e.target.checked })} />Request a child seat (subject to confirmation)</label><div className="assistance-panel"><label className="check-field"><input type="checkbox" aria-describedby="assistance-help" checked={Boolean(trip.assistance)} onChange={e => update({ assistance: e.target.checked ? 'required' : '', assistanceNote: e.target.checked ? trip.assistanceNote : '' })} />Accessibility or mobility assistance required</label><p id="assistance-help">Tell us what assistance you may need. Availability can be confirmed with your booking.</p>{trip.assistance && <label className="field">Assistance notes (optional)<textarea rows={2} value={trip.assistanceNote} onChange={e => update({ assistanceNote: e.target.value })} placeholder="Wheelchair assistance, mobility device, or additional boarding assistance" /></label>}</div><label className="field">Journey notes (optional)<textarea rows={3} value={trip.notes} onChange={e => update({ notes: e.target.value })} /></label><button className="button booking-submit">Continue to vehicles<ArrowRight size={18} /></button></form>}
    {step === 2 && <form onSubmit={next}><p className="fineprint">Representative capacities and photography. Actual inventory and amenities need confirmation.</p>{trip.vehicle && !chosen && <p className="error">Your previous vehicle does not fit the current passenger and luggage requirements. Choose a larger class.</p>}<div className="booking-vehicles">{vehicles.map(v => { const compatible = v.passengers >= trip.passengers && v.bags >= trip.bags; return <VehicleCard key={v.id} vehicle={v} selected={chosen?.id === v.id} disabled={!compatible} requirement={{ passengers: trip.passengers, bags: trip.bags }} onChoose={() => { update({ vehicle: v.id }); setError('') }} /> })}</div>{quoteOnly && <div className="empty-state"><h3>Let’s discuss the right arrangements.</h3><p>No listed vehicle accommodates this passenger and luggage count. Continue to review a group quote request.</p></div>}<div className="button-row"><button type="button" className="button secondary" onClick={() => setStep(1)}><ArrowLeft size={18} />Back</button><button className="button">Review your trip<ArrowRight size={18} /></button></div></form>}
    {step === 3 && <form className="form-panel" onSubmit={finish}><p>Check your trip and add contact details to prepare a summary.</p><FareEstimate type={trip.type} pickup={trip.pickup} dropoff={trip.dropoff} time={trip.time} passengers={trip.passengers} vehicle={trip.vehicle} /><label className="field">Full name<input required autoComplete="name" value={guest.name} onChange={e => setGuest({ ...guest, name: e.target.value })} /></label><label className="field">Email address<input required type="email" autoComplete="email" value={guest.email} onChange={e => setGuest({ ...guest, email: e.target.value })} /></label><label className="field">Phone number<input required type="tel" autoComplete="tel" value={guest.phone} onChange={e => setGuest({ ...guest, phone: e.target.value })} /></label><p className="reservation-notice">This demo does not send a reservation. Call or email us to confirm pricing and availability.</p><div className="button-row"><button type="button" className="button secondary" onClick={() => setStep(2)}><ArrowLeft size={18} />Back</button><button className="button">Prepare trip summary<ArrowRight size={18} /></button></div></form>}
  </div><aside className="trip-summary"><div className="section-head"><h3>Your journey</h3>{step > 1 && <button className="text-link" onClick={() => setStep(1)}>Edit</button>}</div>{summary}</aside></div></section>
}
