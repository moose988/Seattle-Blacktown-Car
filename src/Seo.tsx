import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { absoluteSiteUrl, getCanonicalBaseUrl, siteConfig } from './site-config'
import { buildStructuredData } from './structured-data'

function setMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    document.head.append(element)
  }
  Object.entries(attributes).forEach(([name, value]) => element!.setAttribute(name, value))
}

function setCanonical(href: string | null) {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!href) { element?.remove(); return }
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.append(element)
  }
  element.href = href
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const page = siteConfig.publicRoutes.find(route => route.path === pathname)
    const title = page?.title || `Page not found | ${siteConfig.siteName}`
    const description = page?.description || siteConfig.defaultDescription
    const baseUrl = getCanonicalBaseUrl()
    const canonicalUrl = page ? absoluteSiteUrl(page.path, baseUrl) : null
    const socialImage = siteConfig.socialImagePath ? absoluteSiteUrl(siteConfig.socialImagePath, baseUrl) : null

    document.title = title
    setMeta('meta[name="description"]', { name: 'description', content: description })
    setMeta('meta[name="robots"]', { name: 'robots', content: page ? 'index, follow, max-image-preview:large' : 'noindex, follow' })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteConfig.siteName })
    setMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: socialImage ? 'summary_large_image' : 'summary' })
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })
    if (canonicalUrl) setMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl })
    else document.head.querySelector('meta[property="og:url"]')?.remove()
    if (socialImage) {
      setMeta('meta[property="og:image"]', { property: 'og:image', content: socialImage })
      setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Representative black sedan used by Seattle Black Town Car' })
      setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImage })
    }
    setCanonical(canonicalUrl)

    const structuredData = document.createElement('script')
    structuredData.id = 'site-structured-data'
    structuredData.type = 'application/ld+json'
    structuredData.text = JSON.stringify(buildStructuredData(pathname, baseUrl))
    document.getElementById(structuredData.id)?.remove()
    document.head.append(structuredData)
    return () => structuredData.remove()
  }, [pathname])

  return null
}
