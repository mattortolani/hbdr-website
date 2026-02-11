# CLAUDE.md

## Project Purpose

HBDR Website is a server-rendered marketing site for HBDR, an ad-tech company specializing in header bidding and publisher monetization. It includes 26+ pages, a blog with CMS admin panel, contact form with lead capture, and publisher revenue calculators.

## Tech Stack

- **Server**: Hono (TypeScript) on Node.js, deployable to Cloudflare Workers
- **Interactivity**: Alpine.js (CDN) for form state, toggles, accordions, tool calculators
- **Styling**: Tailwind CSS + DaisyUI (CDN), dark glassmorphism theme
- **Fonts**: Figtree (body) + Instrument Serif (display headings) via Google Fonts CDN
- **Validation**: Zod schemas (pure, no Drizzle dependency)
- **Storage**: D1 (Cloudflare production), MemStorage (local dev — ephemeral)
- **Auth**: Cookie-based session auth for admin panel
- **Build**: Wrangler for Workers deployment. No frontend build step.

## Key Commands

```bash
npm install              # Install all dependencies (5 prod + 4 dev)
npm run dev              # Start dev server on port 5000
npm run check            # TypeScript type checking (tsc --noEmit)
npm run deploy           # Deploy to Cloudflare Workers via wrangler
```

There are no tests (`npm test` does not exist).

## File Structure

```
worker.ts                    # Cloudflare Workers entry (38 lines, uses shared routes)
server/
  index.ts                   # Node.js dev server entry (72 lines, uses shared routes)
  config.ts                  # Site-wide constants (SITE_URL, PAGE_ROUTES)
  d1Storage.ts               # D1 implementation of IStorage (production)
  routes/
    pages.ts                 # All page GET routes (single source of truth)
    api.ts                   # API endpoints (contact, blog CRUD, leads)
    admin.ts                 # Admin routes (login, logout, leads, blog admin)
    seo.ts                   # robots.txt and sitemap.xml
  middleware/
    auth.ts                  # Session management (create, verify, destroy)
    sanitize.ts              # HTML and text sanitization
    rate-limit.ts            # IP-based rate limiting
  services/
    storage.ts               # IStorage interface + type definitions
    mem-storage.ts           # In-memory implementation (dev)
    email.ts                 # Contact notification emails (Resend API)
  templates/
    layout.ts                # renderLayout() — head, nav, footer, scripts
    index.ts                 # Barrel re-export of all templates
    components/
      hero.ts                # Reusable page hero section
      cta.ts                 # Call-to-action section
      stats.ts               # Stats section
      contact-form.ts        # Contact form section
      blog-helpers.ts        # Shared BlogPostData type, formatDate, getCategoryColor
    pages/
      home.ts, about.ts, how-it-works.ts, careers.ts, press.ts, contact.ts
      blog.ts, dashboard.ts, partners.ts, trust.ts, support.ts
      solutions/             # 10 solution pages
      audience/              # publishers.ts, advertisers.ts
      legal/                 # privacy-policy.ts, terms.ts, gdpr-cookie-policy.ts
    admin/
      leads.ts               # Admin login page + leads panel
      blog.ts                # Blog manager + post editor
    tools/
      index.ts               # Publisher revenue calculators (5 tools)
shared/
  schema.ts                  # Zod validation schemas (pure, no Drizzle)
public/assets/               # Static files served by Workers
attached_assets/             # Source branding files (logos, research)
migrations/                  # D1 database schema (0001_init.sql)
```

## Architecture Patterns

- **Server-side rendering**: All HTML generated as template literal strings in TypeScript functions. No React, no JSX, no client-side rendering.
- **Template composition**: `renderLayout()` wraps page content with shared head/nav/footer/scripts. Individual pages export `render*Page()` functions.
- **Shared routes**: Both entry points (`worker.ts` and `server/index.ts`) call the same `register*Routes()` functions from `server/routes/`. Zero route duplication.
- **Storage interface**: `IStorage` interface in `services/storage.ts`. Implementations: `D1Storage` (production), `MemStorage` (dev). Dependency-injected via `getStorage(c)` factory functions.
- **CDN dependencies**: Tailwind, Alpine.js, DaisyUI loaded from CDNs. No frontend build step.

## Common Gotchas

1. **`published` is a string** -- Blog post `published` field is `"true"`/`"false"` string, not boolean. Use string comparison.
2. **Dev data is ephemeral** -- MemStorage resets on restart. D1 persists in production.
3. **Support form schema mismatch** -- `/support` form sends `website` and `monthlyPageviews` fields to `/api/contact`, but the Zod schema expects `impressions` and has no `website` field. Needs fixing.
4. **ADMIN_PASSWORD** -- Must be set via `wrangler secret put ADMIN_PASSWORD`. Fallback is `hbdr2025!` (change in production).
5. **Tailwind via CDN** -- Uses the Play CDN (`cdn.tailwindcss.com`), which is not recommended for production. Consider migrating to a build step.
6. **No tests** -- No test suite exists yet. `data-testid` attributes are on key elements for future E2E testing.

## Design System

- **Brand colors**: Mint green `#2BDE73`, dark green `#1AAF5C`, light green `#6CF5A0`
- **Surfaces**: Dark `#06060a`, elevated `#0e0e14`
- **Glass effects**: `backdrop-filter: blur(48px) saturate(200%)` with `rgba(255,255,255,0.04)` background
- **Buttons**: Pill-shaped (`border-radius: 980px`), gradient fill for primary, outline for secondary
- **Typography**: Figtree (body), Instrument Serif (display headings), `text-gradient` and `text-gradient-accent` classes
- **CSS custom properties**: `--accent`, `--accent-glow`, `--accent-dark`, `--accent-warm`, `--surface`, `--surface-elevated`, `--glass-bg`, `--glass-border`
- **Utility classes**: `glass-card`, `glass-btn`, `glass-btn-outline`, `glass-input`, `glass-select`, `glass-tag`, `glass-nav`

## Environment Setup

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5000`

No environment variables required for dev. For production, set secrets via wrangler:
```bash
wrangler secret put ADMIN_PASSWORD
wrangler secret put RESEND_API_KEY
```

## Adding New Pages

1. Create `server/templates/pages/your-page.ts` with `export function renderYourPage(): string { ... }`
2. Import `renderLayout` from `../layout` and any components from `../components/`
3. Add the route in `server/routes/pages.ts`
4. Add the path to `PAGE_ROUTES` in `server/config.ts` (for sitemap)
5. Add nav/footer links in `server/templates/layout.ts` if needed

## Current Project Status

### Done
- 26 page templates fully decomposed into individual files
- Shared route modules (zero duplication between worker.ts and index.ts)
- Blog category filters (fixed — Alpine.js x-show on articles)
- Admin authentication (cookie-based sessions)
- D1 persistent storage (production)
- Rate limiting on contact form
- Honeypot spam protection
- Email notifications via Resend API
- SEO: robots.txt, sitemap.xml
- Social links (LinkedIn, X, email) in footer
- Absolute OG image URLs
- Publisher revenue calculators (5 tools)
- HTMX removed (was loaded but unused)
- Package.json cleaned (5 prod deps, 4 dev deps)
- Dead code removed (React app, Vite, Express, Drizzle ORM, 60+ unused packages)

### Still Needs Work
- Support form schema mismatch (sends wrong fields)
- Tailwind CDN should be replaced with build step for production
- No test suite
- No CI/CD pipeline
- No error pages (404, 500)
- No CSRF protection
- sanitizeHtml is regex-based (consider DOMPurify or similar for production)
