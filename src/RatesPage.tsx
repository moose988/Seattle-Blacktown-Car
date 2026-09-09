import { useMemo, useState } from 'react'
import { ArrowUpRight, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { pricingRules, searchRates, specialRates } from './rates-data'

export function RatesPage() {
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchRates(query), [query])

  return <section className="container section rates-page">
    <header className="page-heading rates-heading">
      <p className="eyebrow">RATES &amp; PRICING</p>
      <h1>Know your rate before you ride.</h1>
      <p>View current rates to and from SeaTac, search by city or ZIP code, and review vehicle and pickup surcharges before booking.</p>
    </header>

    <section aria-labelledby="rate-rules-heading">
      <div className="rates-section-heading">
        <div><p className="eyebrow">FARE GUIDANCE</p><h2 id="rate-rules-heading">Simple, transparent pricing.</h2></div>
      </div>
      <div className="rate-rules-grid">
        <article><span>BASE RATE</span><strong>Up to 3</strong><p>passengers</p></article>
        <article><span>SUV · UP TO 5</span><strong>+${pricingRules.suvUpTo5}</strong><p>vehicle adjustment</p></article>
        <article><span>SUV · UP TO 7</span><strong>+${pricingRules.suvUpTo7}</strong><p>vehicle adjustment</p></article>
        <article><span>VAN · UP TO 11</span><strong>+${pricingRules.vanUpTo11SeattleArea}</strong><p>in the Seattle area</p></article>
      </div>
      <div className="rate-details" aria-label="Important pricing details">
        <div><span>Gratuity</span><p>Rates do not include {pricingRules.gratuityPercent}% gratuity.</p></div>
        <div><span>Late-night pickup</span><p>Extra ${pricingRules.lateNightPickup} from 11:00 PM to 5:00 AM.</p></div>
        <div><span>Meet and greet</span><p>No meet-and-greet service.</p></div>
      </div>
    </section>

    <section className="vancouver-section" aria-labelledby="vancouver-heading">
      <div><p className="eyebrow">LONG-DISTANCE TRAVEL</p><h2 id="vancouver-heading">Vancouver, BC.</h2><p>Published one-way rates for select vehicle and passenger arrangements.</p></div>
      <div className="vancouver-rates">{specialRates.map(rate => <article key={rate.vehicle}><span>{rate.vehicle}</span><strong>{rate.displayRate}</strong><p>Up to {rate.passengers} passengers</p></article>)}</div>
    </section>

    <section className="rate-directory" aria-labelledby="find-rate-heading">
      <div className="rate-search-header">
        <div><p className="eyebrow">SEATAC RATE DIRECTORY</p><h2 id="find-rate-heading">Find your rate.</h2></div>
        <Link className="button" to="/book">Book a ride<ArrowUpRight size={18} /></Link>
      </div>
      <label className="rate-search-field">
        <span>Search rates by city or ZIP code</span>
        <span className="rate-search-control"><Search size={19} aria-hidden="true" /><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by city or ZIP code" />{query && <button type="button" onClick={() => setQuery('')} aria-label="Clear rate search"><X size={18} /></button>}</span>
      </label>
      <div className="rate-results-meta" aria-live="polite">{results.length} {results.length === 1 ? 'rate' : 'rates'} found</div>
      {results.length ? <div className="rates-table-wrap"><table className="rates-table">
        <caption className="sr-only">SeaTac rates by ZIP code and destination</caption>
        <thead><tr><th scope="col">ZIP code</th><th scope="col">Destination</th><th scope="col">Rate</th></tr></thead>
        <tbody>{results.map((rate, index) => <tr key={`${rate.zip}-${rate.destination}-${index}`}><td data-label="ZIP code">{rate.zip}</td><td data-label="Destination">{rate.destination}</td><td data-label="Rate">{rate.displayRate}</td></tr>)}</tbody>
      </table></div> : <div className="rate-empty"><h3>No matching rate found.</h3><p>Contact us for a custom quote.</p><Link className="text-link" to="/contact">Contact us<ArrowUpRight size={18} /></Link></div>}
    </section>
  </section>
}
