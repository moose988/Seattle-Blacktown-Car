import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, BadgeDollarSign, BriefcaseBusiness, CarFront, Check, ChevronDown, ChevronLeft, ChevronRight, Clock3, MapPin, Menu, Phone, Plane, Radar, ShieldCheck, Sparkles, UserRoundCheck, Users, X } from 'lucide-react'
import { BookingProvider, useBooking } from './booking-state'
import { brand, faqs, services, vehicles } from './data'
import type { Vehicle } from './data'
import { BookingPage } from './BookingPage'
import { RatesPage } from './RatesPage'

const icons = { plane: Plane, car: CarFront, briefcase: BriefcaseBusiness, clock: Clock3, sparkles: Sparkles, users: Users }
function ServiceIcon({ name }: { name: string }) { const Icon = icons[name as keyof typeof icons] || CarFront; return <Icon size={26} strokeWidth={1.5} aria-hidden="true" /> }
export function ButtonLink({ to, children, light = false }: { to: string; children: ReactNode; light?: boolean }) { return <Link className={`button ${light ? 'gold' : ''}`} to={to}>{children}<ArrowUpRight size={18} /></Link> }
function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuButton = useRef<HTMLButtonElement>(null)
  useEffect(() => { setOpen(false); window.scrollTo(0, 0); document.title = `${location.pathname === '/' ? 'Private chauffeur service' : location.pathname.slice(1).replace(/^./, c => c.toUpperCase())} | ${brand.name}` }, [location.pathname])
  useEffect(() => { if (!open) return; const escape = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuButton.current?.focus() } }; document.addEventListener('keydown', escape); return () => document.removeEventListener('keydown', escape) }, [open])
  return <header className={`header ${location.pathname === '/' ? 'header-overlay' : ''}`}><div className="container nav-wrap"><Link to="/" className="logo" aria-label="Seattle Town Car Service home"><img src="/assets/seattle-town-car-logo.png" width="300" height="112" alt="Seattle Town Car Service" /></Link><nav id="main-nav" aria-label="Main navigation" className={open ? 'nav open' : 'nav'}>{[['/services', 'Services'], ['/fleet', 'Our Fleet'], ['/rates', 'Rates'], ['/about', 'About'], ['/contact', 'Contact']].map(([path, label]) => <NavLink key={path} to={path}>{label}</NavLink>)}</nav><div className="nav-actions"><a className="nav-phone" href="tel:+12067190015"><Phone size={15} />{brand.phone}</a><ButtonLink to="/book" light>Book a ride</ButtonLink><button ref={menuButton} className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div></header>
}
function Footer() { return <footer><div className="container footer-main"><div><Link to="/" className="logo"><img src="/assets/seattle-town-car-logo.png" width="300" height="112" alt="Seattle Town Car Service home" /></Link><p>A better way to move through Seattle.</p></div><div><h3>Explore</h3><Link to="/services">Our services</Link><Link to="/fleet">Our fleet</Link><Link to="/rates">Rates</Link><Link to="/about">About us</Link><Link to="/book">Plan your ride</Link></div><div><h3>Get in touch</h3><a href="tel:+12067190015">{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><span>{brand.location}</span><Link to="/contact">Contact us <ArrowUpRight size={14} /></Link></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} {brand.name}</span><span>Vehicle photography is representative.</span></div></footer> }
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
      if (element.currentTime < 3 || element.currentTime >= 13) element.currentTime = 3
      void element.play().catch(() => undefined)
    }
    const keepWithinRange = () => { if (element.currentTime >= 13) restart() }
    element.addEventListener('loadedmetadata', restart)
    element.addEventListener('timeupdate', keepWithinRange)
    element.addEventListener('ended', restart)
    if (element.readyState >= 1) restart()
    return () => {
      element.removeEventListener('loadedmetadata', restart)
      element.removeEventListener('timeupdate', keepWithinRange)
      element.removeEventListener('ended', restart)
    }
  }, [reducedMotion])
  if (reducedMotion) return null
  return <video ref={video} className="hero-video" autoPlay muted playsInline preload="metadata" poster="/assets/sedan.jpg" aria-hidden="true" tabIndex={-1}><source src="/assets/hero-chauffeur.mp4" type="video/mp4" /></video>
}
function SectionHead({ eyebrow, title, to, link }: { eyebrow: string; title: string; to?: string; link?: string }) { return <div className="section-head"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{to && <Link className="text-link" to={to}>{link}<ArrowUpRight size={18} /></Link>}</div> }
function ServiceCardImage({ service }: { service: typeof services[number] }) { return <div className="service-card-media"><img src={`/assets/images/${service.cardImage}`} alt={service.imageAlt} loading="lazy" decoding="async" width="960" height="600" onError={event => { event.currentTarget.hidden = true }} /></div> }
function ServiceCard({ service }: { service: typeof services[number] }) { return <Link to={`/services?service=${service.id}`} className="service-card"><ServiceCardImage service={service} /><div className="service-card-content"><ServiceIcon name={service.icon} /><h3>{service.name}</h3><p>{service.short}</p><span className="circle-arrow"><ArrowUpRight size={20} /></span></div></Link> }
export function VehicleCard({ vehicle, onChoose, selected = false, showPhotoLabel = true }: { vehicle: Vehicle; onChoose?: () => void; selected?: boolean; showPhotoLabel?: boolean }) { return <article className={`vehicle-card ${selected ? 'chosen' : ''}`}><div className={`vehicle-photo ${vehicle.image}`}><img src={`/assets/${vehicle.image}.jpg`} alt={`Representative ${vehicle.image === 'interior' ? 'premium cabin' : 'black vehicle'} photography`} loading="lazy" />{showPhotoLabel && <span className="photo-label">Representative image</span>}</div><div className="vehicle-body"><h3>{vehicle.name}</h3><p>{vehicle.subtitle}</p><div className="vehicle-meta"><span><Users size={16} />{vehicle.passengers} passengers</span><span><BriefcaseBusiness size={16} />{vehicle.bags} bags</span></div>{onChoose ? <button type="button" className="text-link" onClick={onChoose}>{selected ? 'Selected' : 'Choose this vehicle'}{selected ? <Check size={18} /> : <ArrowUpRight size={18} />}</button> : <Link className="text-link" to={`/fleet?vehicle=${vehicle.id}`}>Explore this class<ArrowUpRight size={18} /></Link>}</div></article> }

const journeySteps = [
  ['01', 'Tell us your plans', 'Choose your pickup, destination, and the time that works for you.'],
  ['02', 'Find your comfort', 'Compare vehicle classes for your passengers and luggage.'],
  ['03', 'Make it your journey', 'Review the details and prepare your quote request.'],
]

function JourneyTimeline() {
  const timeline = useRef<HTMLOListElement>(null)
  const [revealed, setRevealed] = useState(false)
  useEffect(() => {
    const element = timeline.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setRevealed(true)
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  return <ol ref={timeline} className={`journey-timeline ${revealed ? 'is-revealed' : ''}`} aria-label="Booking journey">
    {journeySteps.map(([number, title, description]) => <li key={number}>
      <div className="timeline-milestone"><span className="timeline-number">{number}</span><span className="timeline-node" aria-hidden="true" /></div>
      <div className="timeline-copy"><h3>{title}</h3><p>{description}</p></div>
    </li>)}
  </ol>
}

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
    <div ref={rail} className="services-rail" role="region" aria-label="All services" tabIndex={0}>
      <div className="services-track">
      <div className="services-set">{services.map(service => <ServiceRailCard key={service.id} service={service} />)}</div>
      </div>
    </div>
    <button type="button" className={`rail-arrow rail-arrow-left ${position.atStart ? 'is-hidden' : ''}`} aria-label="Show previous services" disabled={position.atStart} onClick={() => move(-1)}><ChevronLeft size={20} /></button>
    <button type="button" className={`rail-arrow rail-arrow-right ${position.atEnd ? 'is-hidden' : ''}`} aria-label="Show more services" disabled={position.atEnd} onClick={() => move(1)}><ChevronRight size={20} /></button>
  </div>
}

function FleetRail() {
  const featuredVehicles = [vehicles[1], vehicles[2], vehicles[4]]
  return <div className="rail-mask fleet-rail-mask"><div className="fleet-rail" role="region" aria-label="Featured vehicle classes" tabIndex={0}>
    <div className="fleet-track marquee-track">
      <div className="fleet-set">{featuredVehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} showPhotoLabel={false} />)}</div>
      <div className="fleet-set" aria-hidden="true" inert>{featuredVehicles.map(vehicle => <VehicleCard key={`duplicate-${vehicle.id}`} vehicle={vehicle} showPhotoLabel={false} />)}</div>
    </div>
  </div></div>
}
function FAQs() { return <section className="section container faq-section"><div><p className="eyebrow">A FEW HELPFUL DETAILS</p><h2>Before you go.</h2><p>Good journeys start with clear answers.</p><Link className="text-link" to="/contact">Talk to us<ArrowUpRight size={18} /></Link></div><div>{faqs.map(([q, a]) => <details key={q}><summary>{q}<ChevronDown size={18} /></summary><p>{a}</p></details>)}</div></section> }
function Invitation() { return <section className="invitation"><div className="container"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Let’s get you there.</h2></div><ButtonLink to="/book" light>Plan your ride</ButtonLink></div></section> }
function Home() { return <><section className="hero"><HeroVideo /><div className="container hero-grid"><div className="hero-story"><p className="eyebrow"><span />SEATTLE & THE PACIFIC NORTHWEST</p><h1>Your Seattle journey,<br /><em>exceptionally handled.</em></h1><p className="hero-description">From airport arrivals to evenings worth celebrating.<br className="desktop-only" /> Private chauffeur service, made effortless.</p><Link className="hero-link" to="/fleet">Find your kind of comfort<ArrowUpRight size={18} /></Link></div></div></section><div className="standards"><div className="container"><span><CarFront />Private, considered travel</span><span><Clock3 />Your schedule comes first</span><span><MapPin />Seattle and beyond</span></div></div><section className="section container services-showcase"><SectionHead eyebrow="A RIDE FOR EVERY REASON" title="Where life takes you." to="/services" link="Explore all services" /><ServicesRail /></section><section className="section fleet-section"><div className="container fleet-showcase"><SectionHead eyebrow="COMFORT, IN EVERY CLASS" title="Find your perfect ride." to="/fleet" link="Explore the fleet" /><FleetRail /></div></section><section className="section container steps-section"><SectionHead eyebrow="LESS PLANNING. MORE POSSIBILITY." title="Three steps. One effortless journey." /><JourneyTimeline /></section><section className="about-band"><div className="container about-grid"><img src="/assets/interior.jpg" alt="Representative premium black leather vehicle interior" loading="lazy" /><div><p className="eyebrow">THE JOURNEY MATTERS</p><h2>More than a ride.<br />A moment for yourself.</h2><p>Catch your breath before a meeting. Settle in after a long flight. Make room for the occasion ahead.</p><p>{brand.name} brings a considered approach to private travel around the city and beyond.</p><ButtonLink to="/about" light>Get to know us</ButtonLink></div></div></section><section className="section container coverage"><div><p className="eyebrow">ROOTED IN SEATTLE</p><h2>The city. The airport.<br />And everything between.</h2><p>Explore journeys across the Seattle area. Contact us to confirm arrangements for your destination.</p></div><div className="coverage-list">{['Seattle', 'Bellevue & Redmond', 'Lynnwood & Everett', 'SEA · Boeing Field · Lake Union'].map(place => <Link key={place} to="/book"><MapPin size={18} />{place}<ArrowUpRight size={18} /></Link>)}</div></section><FAQs /><Invitation /></> }
function PageHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <div className="page-heading"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{children}</p></div> }
function ServiceDialog({ service, close }: { service: typeof services[number]; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null); const { update } = useBooking(); const navigate = useNavigate()
  useEffect(() => { const el = dialog.current!; const previous = document.activeElement as HTMLElement; el.showModal(); const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { el.close(); document.body.style.overflow = overflow; previous?.focus() } }, [])
  function book() { update({ service: service.id, type: service.id === 'hourly' ? 'hourly' : service.id.startsWith('airport') ? 'airport-arrival' : 'point-to-point' }); navigate('/book') }
  return <dialog ref={dialog} aria-labelledby="service-title" onCancel={e => { e.preventDefault(); close() }} onClick={e => { if (e.target === e.currentTarget) close() }}><div className="dialog-inner"><button className="dialog-close" aria-label="Close service details" onClick={close}><X /></button><img src={`/assets/${service.image}.jpg`} alt="Representative premium vehicle photography" /><div className="dialog-copy"><p className="eyebrow">A JOURNEY MADE FOR YOU</p><h2 id="service-title">{service.name}</h2><p>{service.description}</p><h3>Before you travel</h3><p>{service.consideration}</p><p className="fineprint">Representative photography. Availability and arrangements require confirmation.</p><button className="button" onClick={book}>Book this service<ArrowRight size={18} /></button></div></div></dialog>
}
function ServicesPage() { const [search, setSearch] = useSearchParams(); const service = services.find(s => s.id === search.get('service')); return <><section className="container section"><PageHeading eyebrow="YOUR PLANS, THOUGHTFULLY HANDLED" title="A ride for every reason.">From everyday connections to once-in-a-lifetime occasions, find the service that fits your journey.</PageHeading><div className="service-grid full-services">{services.map(s => <ServiceCard key={s.id} service={s} />)}</div>{service && <ServiceDialog key={service.id} service={service} close={() => setSearch({})} />}</section><Invitation /></> }
function FleetPage() {
  const [passengers, setPassengers] = useState(1); const [bags, setBags] = useState(0)
  const { trip, update } = useBooking(); const navigate = useNavigate(); const [search] = useSearchParams()
  const matching = vehicles.filter(v => v.passengers >= passengers && v.bags >= bags)
  return <><section className="container section"><PageHeading eyebrow="YOUR SPACE ON THE ROAD" title="Comfort comes in many forms.">Compare representative classes and choose the space that suits your plans.</PageHeading><div className="filters"><label className="field">Passengers<input type="number" min="1" max="20" value={passengers} onChange={e => setPassengers(Number(e.target.value))} /></label><label className="field">Luggage items<input type="number" min="0" max="20" value={bags} onChange={e => setBags(Number(e.target.value))} /></label><p>Representative fleet information.<br />Photos and capacities require confirmation.</p></div><div className="vehicle-grid">{matching.map(v => <VehicleCard key={v.id} vehicle={v} selected={search.get('vehicle') === v.id} onChoose={() => { update({ vehicle: v.id, passengers: Math.max(trip.passengers, passengers), bags: Math.max(trip.bags, bags) }); navigate('/book') }} />)}</div>{!matching.length && <div className="empty-state"><h2>Let’s find a little more room.</h2><p>No listed vehicle fits these requirements. Contact us to discuss group arrangements.</p><ButtonLink to="/contact">Ask about your journey</ButtonLink></div>}</section><Invitation /></>
}
const whyChooseItems = [
  { title: 'Reasonable pricing', copy: 'Premium chauffeur service with competitive pricing and a focus on value.', Icon: BadgeDollarSign },
  { title: 'Professional chauffeurs', copy: 'Experienced, licensed chauffeurs committed to courteous, dependable service.', Icon: UserRoundCheck },
  { title: 'Safety & comfort', copy: 'Comfortable vehicles and careful driving designed around a safe, relaxed journey.', Icon: ShieldCheck },
  { title: '24/7 availability', copy: 'Seattle black car transportation available around the clock.', Icon: Clock3 },
  { title: 'Luxury premium vehicles', copy: 'Premium sedans and SUVs for airport transfers, corporate travel, events, and private transportation.', Icon: CarFront },
  { title: 'Real-time flight tracking', copy: 'Flight arrivals are monitored so airport pickups can adjust when schedules change.', Icon: Radar },
]
function WhyChooseUs() { return <section className="section why-choose"><div className="container"><SectionHead eyebrow="WHY CHOOSE US" title="Designed around what matters most." /><div className="why-choose-grid">{whyChooseItems.map(({ title, copy, Icon }) => <article key={title}><Icon size={24} strokeWidth={1.4} aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section> }
function AboutPage() { return <><section className="container section about-page"><PageHeading eyebrow="SEATTLE BLACK TOWN CAR" title="About Seattle Black Town Car">Dependable transportation. Personal service. Seattle experience.</PageHeading><div className="about-company-story"><p className="eyebrow">SEATTLE EXPERIENCE, SINCE 2005</p><h2>Local knowledge.<br />Professional care.</h2><div><p>Seattle Black Town Car is a Seattle-based transportation company serving the area since 2005. With more than two decades of local experience, we provide private black car and chauffeur service shaped around comfort, reliability, discretion, and convenience.</p><p>Professional chauffeurs bring attentive service and practical knowledge of Seattle and the surrounding region to airport travel, business meetings, corporate transportation, special occasions, and private journeys.</p><p>Private transportation is about more than reaching a destination. It is about respecting your time and privacy while making punctuality, safety, and comfort part of the journey.</p></div></div><div className="about-journey"><p className="eyebrow">BUILT AROUND YOUR JOURNEY</p><h2>Flexible plans. Considered service.</h2><div className="about-journey-grid"><div><h3>Convenience & comfort</h3><p>From pickup to destination, every journey is planned to feel comfortable and straightforward, with flexible booking around your schedule, passengers, luggage, and destination.</p></div><div><h3>Experienced chauffeurs</h3><p>Licensed professional chauffeurs combine years of driving experience with strong knowledge of Seattle-area roads.</p></div><div><h3>Airport & corporate travel</h3><p>Airport and corporate transportation is available in premium sedans and SUVs, with planning focused on dependable service and competitive value.</p></div></div></div><div className="about-grid light-about"><img src="/assets/interior.jpg" alt="Premium black leather vehicle interior" /><div><p className="eyebrow">PRIVATE TRANSPORTATION, CONSIDERED</p><h2>Make space for<br />what matters.</h2><p>Settle in before a meeting, take a breath after a flight, or enjoy the moments leading into a special occasion.</p><p>From a direct airport transfer to a flexible hourly itinerary, the details can be shaped around the journey you have in mind.</p><ButtonLink to="/services">Explore our services</ButtonLink></div></div></section><WhyChooseUs /><FAQs /><Invitation /></> }
function ContactPage() { const [sent, setSent] = useState(false); return <section className="container section"><PageHeading eyebrow="LET’S TALK ABOUT YOUR JOURNEY" title="A little help goes a long way.">Contact the company directly using the details below.</PageHeading><div className="contact-grid"><div className="contact-details"><h2>Get in touch.</h2><a href="tel:+12067190015">{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><p>{brand.location}</p><ButtonLink to="/book">Plan your ride</ButtonLink></div>{sent ? <div className="form-panel" role="status"><Check size={32} /><h2>Your enquiry details are ready.</h2><p>Please call or email us to continue with your enquiry.</p><button className="button" onClick={() => setSent(false)}>Start another enquiry</button></div> : <form className="form-panel" onSubmit={e => { e.preventDefault(); setSent(true) }}><h2>Prepare an enquiry</h2><label className="field">Name<input required autoComplete="name" /></label><label className="field">Email<input type="email" required autoComplete="email" /></label><label className="field">Enquiry type<select><option>General enquiry</option><option>Airport transfer</option><option>Group transportation</option><option>Assistance request</option></select></label><label className="field">Message<textarea required rows={4} /></label><p className="fineprint">We’ll help you confirm the final arrangements.</p><button className="button">Review enquiry<ArrowRight size={18} /></button></form>}</div></section> }
function Site() { return <><a className="skip-link" href="#main">Skip to content</a><Header /><main id="main"><Routes><Route path="/" element={<Home />} /><Route path="/services" element={<ServicesPage />} /><Route path="/fleet" element={<FleetPage />} /><Route path="/rates" element={<RatesPage />} /><Route path="/about" element={<AboutPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/book" element={<BookingPage />} /><Route path="*" element={<section className="container section"><PageHeading eyebrow="LET’S GET YOU BACK ON TRACK" title="This page took a different route.">Use the navigation to find your next journey.</PageHeading><ButtonLink to="/">Back to home</ButtonLink></section>} /></Routes></main><Footer /></> }
export default function App() { return <BrowserRouter><BookingProvider><Site /></BookingProvider></BrowserRouter> }
