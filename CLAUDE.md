# CLAUDE.md

## Project Purpose

HBDR Website is a server-rendered marketing site for HBDR, an ad-tech company specializing in header bidding and publisher monetization. It includes 26 pages, a blog with CMS admin panel, and a contact form with lead capture.

## Tech Stack

- **Server**: Hono (TypeScript) on Node.js, deployable to Cloudflare Workers
- **Interactivity**: Alpine.js (CDN) for form state, toggles, accordions
- **Styling**: Tailwind CSS + DaisyUI (CDN), dark glassmorphism theme
- **Validation**: Zod schemas for blog posts and contact leads
- **Storage**: In-memory Maps (no database -- data lost on restart)
- **Build**: tsx for dev, esbuild for Workers bundle

## Key Commands

```bash
npm run dev      # Start dev server on port 5000 (tsx server/index.ts)
npm run check    # TypeScript type checking (tsc --noEmit)
npm run build    # Bundle for production (script/build.ts)
npm run start    # Start production server (node dist/index.cjs)
npx wrangler deploy  # Deploy to Cloudflare Workers
```

There are no tests (`npm test` does not exist).

## File Structure

```
server/
  index.ts          # Node.js dev server entry (Hono + @hono/node-server, port 5000)
  routes.ts         # All HTTP routes (page renders + REST API)
  storage.ts        # IStorage interface + MemStorage (in-memory Maps)
  template.ts       # ALL page templates (5212 lines, monolithic)
shared/
  schema.ts         # Zod validation schemas (blogPosts, contactLeads, users)
worker.ts           # Cloudflare Workers entry (DUPLICATES routes from routes.ts)
script/
  build.ts          # esbuild bundler for Workers
public/assets/      # Static files served by Workers
attached_assets/    # Source branding files (logos, content specs)
```

## Architecture Patterns

- **Server-side rendering**: All HTML generated as template literal strings in TypeScript functions. No React, no JSX, no client-side rendering.
- **Template composition**: `renderLayout()` wraps page content with shared head/nav/footer/scripts. Individual pages export `render*Page()` functions.
- **Storage interface**: `IStorage` interface in `storage.ts` allows swapping implementations. Currently only `MemStorage` exists.
- **Dual entry points**: `server/index.ts` for Node.js dev, `worker.ts` for Cloudflare Workers. Routes are **duplicated** in both (this is a known issue). **worker.ts is currently 10 pages behind routes.ts.**
- **CDN dependencies**: Tailwind, Alpine.js, HTMX, DaisyUI, and Inter font are all loaded from CDNs. No frontend build step.

## Common Gotchas

1. **worker.ts is OUT OF SYNC with routes.ts** -- worker.ts is missing 10 new page routes (legal pages, audience pages, partners, dashboard, trust, support, video-player). Deploying to Workers will 404 on these pages. Any route change MUST be made in both files.
2. **template.ts is 5212 lines** -- All 26 page templates live in one file. Use search, not scrolling.
3. **Data is ephemeral** -- In-memory storage. All blog posts reset to seed data on restart. Contact leads disappear.
4. **Blog category filters are broken** -- Alpine.js state changes but posts are never actually filtered in the DOM.
5. **No auth on admin panel** -- `/admin/blog` is publicly accessible. Do not deploy without adding auth.
6. **~60 unused npm dependencies** -- React, Radix UI, Express, Drizzle, Passport, etc. are installed but never imported. The actual stack uses only ~10 packages.
7. **`published` is a string** -- Blog post `published` field is `"true"`/`"false"` string, not boolean. Use string comparison.
8. **sanitizeHtml is regex-based and duplicated** -- Exists in both `routes.ts` and `worker.ts`. Regex approach is bypassable.
9. **Support form schema mismatch** -- `/support` form sends `website` and `monthlyPageviews` fields to `/api/contact`, but the Zod schema expects `impressions` and has no `website` field. Will fail validation.
10. **Social icon links still go to `#`** -- LinkedIn and Twitter/X icons in footer are placeholder `href="#"`. (Resources and Legal footer links are now fixed.)
11. **OG image URLs are relative** -- Social media previews won't show images because `og:image` uses `/assets/...` instead of absolute URL.

## Design System

- **Brand colors**: Mint green `#2BDE73`, dark green `#1AAF5C`, light green `#6CF5A0`
- **Surfaces**: Dark `#0a0a0c`, elevated `#141416`
- **Glass effects**: `backdrop-filter: blur(40px) saturate(180%)` with `rgba(255,255,255,0.06)` background
- **Buttons**: Pill-shaped (`border-radius: 980px`), gradient fill for primary, outline for secondary
- **Typography**: Inter font, `text-gradient` and `text-gradient-accent` classes for headings
- **CSS custom properties**: `--accent`, `--accent-glow`, `--accent-dark`, `--surface`, `--surface-elevated`, `--glass-bg`, `--glass-border`
- **Utility classes**: `glass-card`, `glass-btn`, `glass-btn-outline`, `glass-input`, `glass-select`, `glass-tag`, `glass-nav`

## Environment Setup

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5000`

No environment variables are required. No database setup needed.

## Current Project Status

### Done
- 26 page templates: Homepage, About, How It Works, Careers, Press, Contact, 10 Solution pages (incl. Video Player), Blog listing/post/admin, Privacy Policy, Terms, GDPR & Cookie Policy, FAQ & Support, Dashboard, Partners, Publishers, Advertisers, Trust & Compliance
- Navigation with Solutions dropdown (10 items) + Company dropdown (9 items) + standalone Publisher/Advertiser/Partners links (desktop + mobile)
- Footer with Resources column (7 real links) and Legal column (3 real links)
- Contact form with client-side state and server-side validation
- Blog CRUD API with Zod validation
- Responsive design across all pages
- Glassmorphism design system
- Cloudflare Workers deployment config
- Legal pages (Privacy Policy, Terms & Conditions, GDPR & Cookie Policy)
- data-testid attributes on key elements (for future E2E testing)

### In Progress / Broken
- Blog category filters (buttons exist but don't filter)
- Blog admin has no authentication
- Data persistence (in-memory only)
- worker.ts route duplication -- **now 10 pages behind routes.ts**
- HTML sanitization (regex-based, bypassable)
- Support form sends wrong fields to /api/contact (schema mismatch)

### Not Started
- Authentication
- Persistent storage (database)
- Testing
- CI/CD
- Rate limiting
- CSRF protection
- SEO files (sitemap.xml, robots.txt)
- Error pages (404, 500)
