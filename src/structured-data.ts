import { faqs, services } from './data'
import { absoluteSiteUrl, siteConfig } from './site-config'

export function buildStructuredData(pathname: string, baseUrl: string | null) {
  const canonicalUrl = absoluteSiteUrl(pathname, baseUrl)
  const servicesUrl = absoluteSiteUrl('/services', baseUrl)
  const businessId = baseUrl ? `${baseUrl}/#business` : '#business'
  const serviceId = baseUrl ? `${baseUrl}/#chauffeur-service` : '#chauffeur-service'
  const business = siteConfig.business
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'LocalBusiness',
      '@id': businessId,
      name: business.name,
      description: siteConfig.defaultDescription,
      ...(baseUrl ? { url: baseUrl, logo: absoluteSiteUrl(siteConfig.logoPath, baseUrl), image: absoluteSiteUrl(siteConfig.socialImagePath || siteConfig.logoPath, baseUrl) } : {}),
      ...(business.phone ? { telephone: business.phone } : {}),
      ...(business.email ? { email: business.email } : {}),
      ...(business.address ? { address: { '@type': 'PostalAddress', ...(business.address.streetAddress ? { streetAddress: business.address.streetAddress } : {}), addressLocality: business.address.addressLocality, addressRegion: business.address.addressRegion, postalCode: business.address.postalCode, addressCountry: business.address.addressCountry } } : {}),
      ...(business.foundingDate ? { foundingDate: business.foundingDate } : {}),
      areaServed: business.serviceRegion,
      ...(business.socialProfiles.length ? { sameAs: business.socialProfiles } : {}),
    },
    {
      '@type': 'TaxiService',
      '@id': serviceId,
      name: 'Seattle private car and chauffeur service',
      serviceType: ['Airport transfer', 'Private chauffeur service', 'Corporate transportation', 'Hourly chauffeur service', 'Event transportation', 'Group transportation'],
      provider: { '@id': businessId },
      areaServed: business.serviceRegion,
      ...(servicesUrl ? { url: servicesUrl } : {}),
    },
  ]

  if (baseUrl) graph.unshift({ '@type': 'WebSite', '@id': `${baseUrl}/#website`, url: `${baseUrl}/`, name: siteConfig.siteName, publisher: { '@id': businessId } })

  if (pathname === '/') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    })
  }

  if (pathname === '/services') {
    graph.push(...services.map(service => ({
      '@type': 'Service',
      name: service.name,
      description: service.description,
      provider: { '@id': businessId },
      areaServed: business.serviceRegion,
    })))
  }

  const page = siteConfig.publicRoutes.find(route => route.path === pathname)
  if (page && pathname !== '/' && baseUrl) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${baseUrl}/` },
        { '@type': 'ListItem', position: 2, name: page.label, item: canonicalUrl },
      ],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
