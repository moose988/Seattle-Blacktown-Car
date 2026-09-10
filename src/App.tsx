import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CarFront, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, Phone, Plane, Sparkles, Users, X } from 'lucide-react'
import { BookingProvider, useBooking } from './booking-state'
import { faqs, services, vehicles } from './data'
import type { Vehicle } from './data'
import { BookingPage } from './BookingPage'
import { RatesPage } from './RatesPage'
import { CapacityControl } from './CapacityControl'
import { brand } from './site-config'
import { Seo } from './Seo'

const icons = { plane: Plane, car: CarFront, briefcase: BriefcaseBusiness, clock: Clock3, sparkles: Sparkles, users: Users }
const logoAsset = '/assets/seattle-town-car-logo.png'
function ServiceIcon({ name }: { name: string }) { const Icon = icons[name as keyof typeof icons] || CarFront; return <Icon size={26} strokeWidth={1.5} aria-hidden="true" /> }
export function ButtonLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) { return <Link className={`button ${light ? 'gold' : ''}`} to={to}>{children}<ArrowUpRight size={18} /></Link> }
function BrandLogo({ priority = false }: { priority?: boolean }) {
  return <img src={logoAsset} width="300" height="112" alt="Seattle Town Car Service" loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} />
}
function Header() {
  const location = useLocation()
  const [menu, setMenu] = useState({ open: false, pathname: location.pathname })
  const open = menu.open && menu.pathname === location.pathname
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  useEffect(() => { if (!open) return; const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu({ open: false, pathname: location.pathname }); menuButton.current?.focus() } }; document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape) }, [location.pathname, open])
  return <header className={`header ${location.pathname === '/' ? 'header-overlay' : ''}`}><div className="container nav-wrap"><Link to="/" className="logo" aria-label="Seattle Black Town Car home"><BrandLogo priority /></Link><nav id="main-nav" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}>{[['/services', 'Services'], ['/fleet', 'Our Fleet'], ['/rates', 'Rates'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav><div className="nav-actions">{brand.phoneHref && brand.phone && <a className="nav-phone" href={brand.phoneHref}><Phone size={15} />{brand.phone}</a>}<ButtonLink to="/book" light>Book a ride</ButtonLink><button ref={menuButton} className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setMenu({ open: !open, pathname: location.pathname })}>{open ? <X /> : <Menu />}</button></div></div></header>
}
function Footer() { return <footer><div className="container footer-main"><div><Link to="/" className="logo footer-logo" aria-label="Seattle Black Town Car home"><BrandLogo /></Link><p>Seattle-area black car and chauffeur service for airport, corporate, event, and private transportation.</p></div><div><h3>Explore</h3><Link to="/services">Our services</Link><Link to="/fleet">Our fleet</Link><Link to="/rates">Rates</Link><Link to="/about">About us</Link><Link to="/book">Book a ride</Link></div><div><h3>Get in touch</h3>{brand.phoneHref && brand.phone && <a href={brand.phoneHref}>{brand.phone}</a>}{brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}{brand.location && <span>{brand.location}</span>}<Link to="/contact">Contact us <ArrowUpRight size={14} /></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name}</span><a className="agency-credit" href="https://www.qdsystems.ae" target="_blank" rel="noopener noreferrer">Powered by <strong>QD Systems</strong><span className="sr-only"> (opens in a new tab)</span></a></div></footer> }
function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', updatePreference)
    return () => preference.removeEventListener('change', updatePreference)
  }, [])
  useEffect(() => {
    const element = video.current
    if (!element || reducedMotion) return
    const restart = () => {
      if (document.hidden) return
      if (element.currentTime >= 10) element.currentTime = 0
      void element.play().catch(() => undefined)
    }
    const keepWithinRange = () => { if (element.currentTime >= 9.9) restart() }
    const handleVisibility = () => { if (document.hidden) element.pause(); else restart() }
    element.addEventListener('loadedmetadata', restart)
    element.addEventListener('timeupdate', keepWithinRange)
    element.addEventListener('ended', restart)
    document.addEventListener('visibilitychange', handleVisibility)
    if (element.readyState >= 1) restart()
    return () => {
      element.pause()
      element.removeEventListener('loadedmetadata', restart)
      element.removeEventListener('timeupdate', keepWithinRange)
      element.removeEventListener('ended', restart)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [reducedMotion])
  if (reducedMotion) return null
  return <video ref={video} className="hero-video" autoPlay muted playsInline preload="metadata" poster="/assets/sedan.jpg" aria-hidden="true" tabIndex={-1}><source src="/assets/hero-chauffeur.mp4" type="video/mp4" /></video>
}
function SectionHead({ eyebrow, title, to, link }: { eyebrow: string; title: string; to?: string; link?: string }) { return <header className="section-head"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{to && <Link className="text-link" to={to}>{link}<ArrowUpRight size={18} /></Link>}</header> }
function ServiceCardImage({ service }: { service: typeof services[number] }) { return <div className="service-card-media"><img src={`/assets/images/${service.cardImage}`} alt={service.imageAlt} loading="lazy" decoding="async" width="960" height="600" onError={event => { event.currentTarget.hidden = true }} /></div> }
function ServiceCard({ service }: { service: typeof services[number] }) { return <article><Link to={`/services?service=${service.id}`} className="service-card"><ServiceCardImage service={service} /><div className="service-card-content"><ServiceIcon name={service.icon} /><h3>{service.name}</h3><p>{service.short}</p><span className="circle-arrow"><ArrowUpRight size={20} /></span></div></Link></article> }
const vehicleImageDimensions: Record<string, { width: number; height: number }> = { sedan: { width: 1800, height: 1125 }, suv: { width: 1600, height: 2400 }, interior: { width: 1600, height: 900 } }
export function VehicleCard({ vehicle, onChoose, selected = false, showPhotoLabel = true, disabled = false, requirement }: { vehicle: Vehicle; onChoose?: () => void; selected?: boolean; showPhotoLabel?: boolean; disabled?: boolean; requirement?: { passengers: number; bags: number } }) { const dimensions = vehicleImageDimensions[vehicle.image]; return <article className={`vehicle-card ${selected ? 'chosen' : ''} ${disabled ? 'unsuitable' : ''}`}><div className={`vehicle-photo ${vehicle.image}`}><img src={`/assets/${vehicle.image}.jpg`} alt={`Representative ${vehicle.image === 'interior' ? 'premium cabin' : 'black vehicle'} photography`} loading="lazy" decoding="async" width={dimensions?.width} height={dimensions?.height} />{showPhotoLabel && <span className="photo-label">Representative image</span>}</div><div className="vehicle-body"><h3>{vehicle.name}</h3><p>{vehicle.subtitle}</p><div className="vehicle-meta"><span><Users size={16} />Up to {vehicle.passengers} passengers</span><span><BriefcaseBusiness size={16} />Up to {vehicle.bags} luggage</span></div>{disabled && requirement && <p className="vehicle-fit-note">Doesn’t fit {requirement.passengers} passengers and {requirement.bags} luggage. Choose a larger class.</p>}{onChoose ? <button type="button" className="text-link" onClick={onChoose} disabled={disabled}>{disabled ? 'Not suitable' : selected ? 'Selected' : 'Select this class'}{selected ? <Check size={18} /> : !disabled && <ArrowUpRight size={18} />}</button> : <Link className="text-link" to={`/fleet?vehicle=${vehicle.id}`}>View vehicle<ArrowUpRight size={18} /></Link>}</div></article> }

function ServiceRailCard({ service }: { service: typeof services[number] }) { return <Link to={`/services?service=${service.id}`} className="service-card rail-service-card"><ServiceCardImage service={service} /><div className="service-card-content"><ServiceIcon name={service.icon} /><h3>{service.name}</h3><p>{service.short}</p><span className="circle-arrow"><ArrowUpRight size={20} /></span></div></Link> }

function ServicesRail() {
  const rail = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ atStart: true, atEnd: false })
  useEffect(() => {
    const element = rail.current
    if (!element) return
    const updatePosition = () => setPosition({
      atStart: element.scrollLeft <= 2,
      atEnd: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2,
    })
    updatePosition()
    element.addEventListener('scroll', updatePosition, { passive: true })
    const resizeObserver = new ResizeObserver(updatePosition)
    resizeObserver.observe(element)
    return () => {
      element.removeEventListener('scroll', updatePosition)
      resizeObserver.disconnect()
    }
  }, [])
  const move = (direction: -1 | 1) => {
    const element = rail.current
    const card = element?.querySelector<HTMLElement>('.rail-service-card')
    if (!element || !card) return
    const gap = Number.parseFloat(getComputedStyle(element.querySelector('.services-set')!).columnGap) || 18
    element.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }
  return <div className="rail-mask services-rail-mask services-carousel">
    <div id="services-rail" ref={rail} className="services-rail" role="region" aria-label="All services" tabIndex={0}>
      <div className="services-track">
      <div className="services-set">{services.map(service => <ServiceRailCard key={service.id} service={service} />)}</div>
      </div>
    </div>
    <button type="button" className={`rail-arrow rail-arrow-left ${position.atStart ? 'is-hidden' : ''}`} aria-label="Show previous services" aria-controls="services-rail" disabled={position.atStart} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
    <button type="button" className={`rail-arrow rail-arrow-right ${position.atEnd ? 'is-hidden' : ''}`} aria-label="Show more services" aria-controls="services-rail" disabled={position.atEnd} onClick={() => move(1)}><ChevronRight size={20} /></button>
  </div>
}

function FleetRail() {
  const rail = useRef<HTMLDivElement>(null)
  const move = (direction: -1 | 1) => rail.current?.scrollBy({ left: direction * Math.min(460, rail.current.clientWidth * .8), behavior: 'smooth' })
  return <div className="fleet-browser"><div id="fleet-rail" ref={rail} className="fleet-rail" role="region" aria-label="Vehicle classes" tabIndex={0}><div className="fleet-set">{vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} showPhotoLabel={false} />)}</div></div><div className="fleet-controls"><button type="button" onClick={() => move(-1)} aria-label="Show previous vehicle" aria-controls="fleet-rail"><ChevronLeft size={20} /></button><span>Five representative classes</span><button type="button" onClick={() => move(1)} aria-label="Show next vehicle" aria-controls="fleet-rail"><ChevronRight size={20} /></button></div></div>
}
function FAQs() { return <section className="section container faq-section" aria-labelledby="faq-heading"><div><p className="eyebrow">A FEW HELPFUL DETAILS</p><h2 id="faq-heading">Before you go.</h2><p>Answers about airport pickups, vehicle capacity, assistance requests, and completing a reservation.</p><Link className="text-link" to="/contact">Contact us<ArrowUpRight size={18} /></Link></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} aria-hidden="true" /></summary><p>{a}</p></details>)}</div></section> }
function Invitation() { return <section className="invitation"><div className="container"><div><p>Private transportation across Seattle and beyond.</p><h2>Ready when you are.</h2></div><ButtonLink to="/book" light>Book a ride</ButtonLink></div></section> }
function Home() { return <><section className="hero"><HeroVideo /><div className="container hero-grid"><div className="hero-story"><p className="eyebrow"><span />SEATTLE & THE PACIFIC NORTHWEST</p><h1>Your Seattle journey,<br /><em>exceptionally handled.</em></h1><p className="hero-description">Private chauffeur service for SEA Airport transfers, downtown Seattle, corporate travel, and the occasions that matter.</p><div className="hero-actions"><ButtonLink to="/book" light>Book a ride</ButtonLink><Link className="hero-secondary" to="/rates">View rates<ArrowUpRight size={18} /></Link></div></div></div></section><div className="standards"><div className="container"><span><CarFront />Private, considered travel</span><span><Clock3 />Your schedule comes first</span><span><MapPin />Seattle and beyond</span></div></div><section className="section container services-showcase"><SectionHead eyebrow="SERVICES" title="Seattle transportation for every plan." to="/services" link="View services" /><ServicesRail /></section><section className="section fleet-section"><div className="container fleet-showcase"><SectionHead eyebrow="OUR FLEET" title="Find your perfect ride." to="/fleet" link="Explore fleet" /><p className="fleet-intro">Compare representative sedan, SUV, first-class, and passenger van options by passenger and luggage capacity.</p><FleetRail /></div></section><section className="about-band"><div className="container about-grid"><img src="/assets/interior.jpg" alt="Representative premium black leather vehicle interior" loading="lazy" decoding="async" width="1600" height="900" /><div><p className="eyebrow">SEATTLE, SINCE 2005</p><h2>Local knowledge.<br />Professional care.</h2><p>Airport arrivals, business meetings, and private journeys each ask for something different.</p><p>{brand.name} has served the Seattle area since 2005, with private transportation across Seattle, SeaTac, Bellevue, Kirkland, and surrounding communities.</p><ButtonLink to="/about" light>About us</ButtonLink></div></div></section><section className="section container coverage"><div><p className="eyebrow">SERVICE AREA</p><h2>Seattle, the airport,<br />and the Eastside.</h2><p>Plan transportation between Seattle, SEA Airport, Bellevue, Kirkland, Lynnwood, Everett, and other supported destinations in the published rate directory.</p></div><div className="coverage-list">{['Downtown Seattle', 'Bellevue & Kirkland', 'Lynnwood & Everett', 'SEA · Boeing Field · Lake Union'].map(place => <Link key={place} to="/book"><MapPin size={18} />{place}<ArrowUpRight size={18} /></Link>)}</div></section><FAQs /><Invitation /></> }
function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <header className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{children}</p></header> }
function ServiceDialog({ service, close }: { service: typeof services[number]; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null); const { update } = useBooking(); const navigate = useNavigate()
  useEffect(() => { const el = dialog.current!; const previous = document.activeElement as HTMLElement; el.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { el.close(); document.body.style.overflow = overflow; previous?.focus() } }, [])
  function book() { update({ service: service.id, type: service.id === 'hourly' ? 'hourly' : service.id.startsWith('airport') ? 'airport-arrival' : 'point-to-point' }); navigate('/book') }
  const dimensions = vehicleImageDimensions[service.image]
  return <dialog ref={dialog} aria-labelledby="service-title" onCancel={e => { e.preventDefault(); close() }} onClick={e => { if (e.target === e.currentTarget) close() }}><div className="dialog-inner"><button className="dialog-close" aria-label="Close service details" onClick={close}><X /></button><img src={`/assets/${service.image}.jpg`} alt="Representative premium vehicle photography" loading="lazy" decoding="async" width={dimensions?.width} height={dimensions?.height} /><div className="dialog-copy"><p className="eyebrow">SERVICE DETAILS</p><h2 id="service-title">{service.name}</h2><p>{service.description}</p><h3>Before you travel</h3><p>{service.consideration}</p><p className="fineprint">Representative photography. Availability and arrangements require confirmation.</p><button className="button" onClick={book}>Book a ride<ArrowRight size={18} /></button></div></div></dialog>
}
function ServicesPage() { const [search, setSearch] = useSearchParams(); const service = services.find(s => s.id === search.get('service')); return <><section className="container section"><PageHeading eyebrow="SEATTLE CHAUFFEUR SERVICES" title="Private transportation for every plan.">Choose airport transfer, corporate, hourly, event, family, wedding, or group transportation across Seattle and supported regional destinations.</PageHeading><section aria-labelledby="services-list-heading"><h2 id="services-list-heading" className="content-heading">Transportation services</h2><div className="service-grid full-services">{services.map(s => <ServiceCard key={s.id} service={s} />)}</div></section>{service && <ServiceDialog key={service.id} service={service} close={() => setSearch({})} />}</section><Invitation /></> }
function FleetPage() {
  const { trip, update } = useBooking(); const navigate = useNavigate(); const [search] = useSearchParams()
  const [passengers, setPassengers] = useState(trip.passengers); const [bags, setBags] = useState(trip.bags)
  const matching = vehicles.filter(v => v.passengers >= passengers && v.bags >= bags)
  return <><section className="container section"><PageHeading eyebrow="SEATTLE TRANSPORTATION OPTIONS" title="Comfort comes in many forms.">Compare representative sedan, SUV, passenger van, business, and first-class options for Seattle-area airport, corporate, and private transportation.</PageHeading><section aria-labelledby="vehicle-list-heading"><h2 id="vehicle-list-heading" className="content-heading">Vehicle classes</h2><div className="filters capacity-filters"><CapacityControl label="Passengers" value={passengers} min={1} max={Math.max(...vehicles.map(v => v.passengers))} onChange={setPassengers} /><CapacityControl label="Luggage" value={bags} min={0} max={Math.max(...vehicles.map(v => v.bags))} onChange={setBags} /><p>{matching.length} of {vehicles.length} classes fit your trip.<br />Capacities and photos are representative.</p></div><div className="vehicle-grid">{vehicles.map(v => { const compatible = matching.includes(v); return <VehicleCard key={v.id} vehicle={v} selected={search.get('vehicle') === v.id} disabled={!compatible} requirement={{ passengers, bags }} onChoose={() => { update({ vehicle: v.id, passengers, bags }); navigate('/book') }} /> })}</div></section>{!matching.length && <div className="empty-state"><h2>Let’s find a little more room.</h2><p>No listed vehicle fits these requirements. Contact us to discuss group arrangements.</p><ButtonLink to="/contact">Contact us</ButtonLink></div>}</section><Invitation /></>
}
const whyChooseItems = [
  { title: 'Since 2005', copy: 'More than two decades serving Seattle-area transportation needs.' },
  { title: 'Local route knowledge', copy: 'Planning for downtown Seattle, SEA Airport, Bellevue, Kirkland, and surrounding communities.' },
  { title: 'Clear trip planning', copy: 'Passenger, luggage, child-seat, and assistance details are considered before a vehicle is selected.' },
  { title: 'Published rate guidance', copy: 'Search the maintained rate directory or request a custom quote when a trip is not listed.' },
]
function WhyChooseUs() { return <section className="section why-choose"><div className="container"><SectionHead eyebrow="WHAT TO EXPECT" title="What you can plan around." /><div className="why-choose-grid">{whyChooseItems.map(({ title, copy }, index) => <article key={title}><span className="why-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section> }
function AboutPage() { return <><section className="container section about-page"><PageHeading eyebrow="SEATTLE BLACK TOWN CAR" title="About Seattle Black Town Car">A Seattle-area professional chauffeur company serving airport, corporate, event, and private transportation needs since 2005.</PageHeading><div className="about-company-story"><p className="eyebrow">SEATTLE EXPERIENCE, SINCE 2005</p><h2>Local knowledge.<br />Professional care.</h2><div><p>Seattle Black Town Car is a Seattle-based transportation company serving the area since 2005. With more than two decades of local experience, we provide private black car and chauffeur service shaped around comfort, reliability, discretion, and convenience.</p><p>Professional chauffeurs bring attentive service and practical knowledge of downtown Seattle, SEA Airport, Bellevue, Kirkland, and the surrounding region to airport travel, business meetings, corporate transportation, special occasions, and private journeys.</p><p>Private transportation is about more than reaching a destination. It is about respecting your time and privacy while making punctuality, safety, and comfort part of the journey.</p></div></div><div className="about-journey"><p className="eyebrow">BUILT AROUND YOUR JOURNEY</p><h2>Flexible plans. Considered service.</h2><div className="about-journey-grid"><div><h3>Convenience & comfort</h3><p>From pickup to destination, every journey is planned to feel comfortable and straightforward, with flexible booking around your schedule, passengers, luggage, and destination.</p></div><div><h3>Experienced chauffeurs</h3><p>Experienced chauffeurs bring practical knowledge of Seattle-area roads to each itinerary.</p></div><div><h3>Airport & corporate travel</h3><p>Airport and corporate transportation is available in representative sedan and SUV classes, with passenger and luggage needs considered before travel.</p></div></div></div><div className="about-grid light-about"><img src="/assets/interior.jpg" alt="Representative premium black leather vehicle interior" loading="lazy" decoding="async" width="1600" height="900" /><div><p className="eyebrow">PRIVATE TRANSPORTATION, CONSIDERED</p><h2>Make space for<br />what matters.</h2><p>Settle in before a meeting, take a breath after a flight, or enjoy the moments leading into a special occasion.</p><p>From a direct airport transfer to a flexible hourly itinerary, the details can be shaped around the journey you have in mind.</p><ButtonLink to="/services">View services</ButtonLink></div></div></section><WhyChooseUs /><FAQs /><Invitation /></> }
function ContactPage() { const [sent, setSent] = useState(false); return <section className="container section"><PageHeading eyebrow="CONTACT SEATTLE BLACK TOWN CAR" title="Let’s discuss your journey.">Contact the company about Seattle-area airport transfers, corporate travel, private chauffeur service, group transportation, or accessibility assistance.</PageHeading><div className="contact-grid"><div className="contact-details"><h2>Get in touch.</h2>{brand.phoneHref && brand.phone && <a href={brand.phoneHref}>{brand.phone}</a>}{brand.email && <a href={`mailto:${brand.email}`}>{brand.email}</a>}{brand.location && <p>{brand.location}</p>}<ButtonLink to="/book">Book a ride</ButtonLink></div>{sent ? <div className="form-panel" role="status"><Check size={32} /><h2>Your enquiry summary is ready.</h2><p>Nothing has been sent. Call or email us to continue with your enquiry.</p><button className="button secondary" onClick={() => setSent(false)}>Start another enquiry</button></div> : <form className="form-panel" onSubmit={e => { e.preventDefault(); setSent(true) }}><h2>Prepare an enquiry</h2><label className="field">Name<input required autoComplete="name" /></label><label className="field">Email<input type="email" required autoComplete="email" /></label><label className="field">Enquiry type<select><option>General enquiry</option><option>Airport transfer</option><option>Group transportation</option><option>Assistance request</option></select></label><label className="field">Message<textarea required rows={4} /></label><p className="fineprint">This demo prepares a summary; it does not send your message.</p><button className="button">Prepare enquiry summary<ArrowRight size={18} /></button></form>}</div></section> }
function Site() { return <><Seo /><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<Home />} /><Route path="/services" element={<ServicesPage />} /><Route path="/fleet" element={<FleetPage />} /><Route path="/rates" element={<RatesPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/book" element={<BookingPage />} /><Route path="*" element={<section className="container section"><PageHeading eyebrow="LET’S GET YOU BACK ON TRACK" title="This page took a different route.">Use the navigation to find your next journey.</PageHeading><ButtonLink to="/">Back to home</ButtonLink></section>} /></Routes></main><Footer /></> }
export default function App() { return <BrowserRouter><BookingProvider><Site /></BookingProvider></BrowserRouter> }
