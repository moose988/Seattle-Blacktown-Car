import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(await readFile(path.join(projectRoot, 'site.config.json'), 'utf8'))
const outputDirectory = process.env.SEO_OUTPUT_DIRECTORY
  ? path.resolve(projectRoot, process.env.SEO_OUTPUT_DIRECTORY)
  : path.join(projectRoot, 'public')

const configuredUrl = process.env.VITE_SITE_URL || config.canonicalBaseUrl
const baseUrl = configuredUrl
  ? new URL(/^https?:\/\//i.test(configuredUrl) ? configuredUrl : `https://${configuredUrl}`).origin
  : null

await mkdir(outputDirectory, { recursive: true })

const robots = ['User-agent: *', 'Allow: /', ...(baseUrl ? ['', `Sitemap: ${baseUrl}/sitemap.xml`] : []), ''].join('\n')
const urls = baseUrl
  ? config.publicRoutes.map(route => `  <url><loc>${baseUrl}${route.path}</loc></url>`).join('\n')
  : '  <!-- Set the verified production domain in VITE_SITE_URL or site.config.json to emit canonical route URLs. -->'
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

await Promise.all([
  writeFile(path.join(outputDirectory, 'robots.txt'), robots, 'utf8'),
  writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap, 'utf8'),
])

console.log(baseUrl ? `SEO files generated for ${baseUrl}` : 'SEO files generated without an unverified canonical host')
