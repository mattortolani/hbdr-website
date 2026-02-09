# HBDR - Header Bidding & Ad Monetization Solutions

Professional marketing website for HBDR, featuring a dark glassmorphism design with mint green accents.

## Features

- Multi-page server-rendered site with 16+ pages
- Blog with built-in CMS admin panel (`/admin/blog`)
- 9 dedicated solution pages with SEO optimization
- Contact form with lead capture
- Apple-inspired "liquid glass" aesthetic
- Mobile-responsive design

## Tech Stack

- **Server**: [Hono](https://hono.dev/) (TypeScript)
- **Interactivity**: Alpine.js
- **Progressive Enhancement**: HTMX
- **Styling**: Tailwind CSS + DaisyUI (CDN)
- **Font**: Inter (Google Fonts)

## Local Development

```bash
npm install
npm run dev
```

The site runs on `http://localhost:5000`.

## Deploy to Cloudflare Workers

### Prerequisites

- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

### Steps

1. Install Wrangler globally (if not already):
   ```bash
   npm install -g wrangler
   ```

2. Authenticate with Cloudflare:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   wrangler deploy
   ```

The site will be deployed to `hbdr-website.<your-subdomain>.workers.dev`.

### Custom Domain

To use a custom domain (e.g., hbdr.com):

1. Add your domain to Cloudflare DNS
2. In the Cloudflare dashboard, go to Workers & Pages > your worker > Settings > Domains & Routes
3. Add your custom domain

## Project Structure

```
server/
  index.ts           # Node.js server entry point (local dev)
  routes.ts          # Route handlers
  template.ts        # HTML templates (all pages)
  storage.ts         # In-memory storage
shared/
  schema.ts          # Data schemas (Zod + Drizzle)
worker.ts            # Cloudflare Workers entry point
wrangler.toml        # Workers configuration
public/assets/       # Static assets (logos, favicons)
```

## Pages

| Page | Path |
|------|------|
| Homepage | `/` |
| About | `/about` |
| How It Works | `/how-it-works` |
| Careers | `/careers` |
| Press & News | `/press` |
| Contact | `/contact` |
| Blog | `/blog` |
| Blog Admin | `/admin/blog` |
| Header Bidding | `/solutions/header-bidding` |
| Display Ads | `/solutions/display-ads` |
| CTV & OTT | `/solutions/ctv-ott` |
| In-App Ads | `/solutions/in-app-ads` |
| MCM | `/solutions/mcm` |
| Manage Account | `/solutions/manage-account` |
| Manage Inventory | `/solutions/manage-inventory` |
| Open Bidding | `/solutions/open-bidding` |
| Ad Exchange AdX | `/solutions/ad-exchange-adx` |

## Notes

- Blog posts and contact leads use in-memory storage (reset on worker restart)
- For persistent storage, integrate with Cloudflare D1 or KV
- The admin panel at `/admin/blog` has no authentication (add as needed)
