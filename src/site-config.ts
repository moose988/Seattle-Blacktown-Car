import rawConfig from '../site.config.json'

export type BusinessAddress = {
  streetAddress: string | null
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

export type PageSeo = { path: string; label: string; title: string; description: string }

export type SiteConfig = {
  siteName: string
  canonicalBaseUrl: string | null
  defaultTitle: string
  defaultDescription: string
  logoPath: string
  socialImagePath: string | null
  business: {
    name: string
    phoneDisplay: string | null
    phone: string | null
    email: string | null
    address: BusinessAddress | null
    businessHours: string[] | null
    coordinates: { latitude: number; longitude: number } | null
    license: string | null
    aggregateRating: { ratingValue: number; reviewCount: number } | null
    foundingDate: string | null
    serviceRegion: string[]
    socialProfiles: string[]
  }
  publicRoutes: PageSeo[]
}

export const siteConfig = rawConfig as SiteConfig

function normalizeBaseUrl(value: string | null | undefined) {
  if (!value) return null
  try { return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).origin }
  catch { return null }
}

export function getCanonicalBaseUrl() {
  const configured = normalizeBaseUrl(import.meta.env.VITE_SITE_URL || siteConfig.canonicalBaseUrl)
  if (configured) return configured
  return typeof window !== 'undefined' && /^https?:$/.test(window.location.protocol) ? window.location.origin : null
}

export function absoluteSiteUrl(path: string, baseUrl = getCanonicalBaseUrl()) {
  return baseUrl ? new URL(path, `${baseUrl}/`).toString() : null
}

export const brand = {
  name: siteConfig.business.name,
  phone: siteConfig.business.phoneDisplay,
  phoneHref: siteConfig.business.phone ? `tel:${siteConfig.business.phone}` : null,
  email: siteConfig.business.email,
  location: siteConfig.business.address
    ? `${siteConfig.business.address.addressLocality}, ${siteConfig.business.address.addressRegion} ${siteConfig.business.address.postalCode}`
    : null,
}
