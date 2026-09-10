# Seattle Black Town Car frontend

React, TypeScript, Vite, and React Router power this customer-facing demonstration. It remains frontend-only: the booking journey does not submit a reservation or process payment.

## Local development

```bash
npm install
npm run dev
```

Validation commands:

```bash
npx tsc -b
npm run lint
npm run build
```

## Site and SEO configuration

Verified identity, public routes, titles, descriptions, service regions, and optional business fields live in `site.config.json`.

Set `VITE_SITE_URL` to the verified production origin, including `https://`, when the custom domain is confirmed. The build then generates absolute URLs in `public/sitemap.xml`, adds its absolute URL to `public/robots.txt`, and uses the same origin for client-rendered canonical and social metadata. Until then, the committed files intentionally avoid claiming an unverified canonical host.

`vercel.json` provides the React Router SPA fallback while Vercel's filesystem handling continues to serve real static assets directly.
