# CLAUDE.md

## Project Purpose

HBDR Website is a server-rendered marketing site for HBDR, an ad-tech company specializing in header bidding and publisher monetization. It includes 26 pages, a blog with CMS admin panel, and a contact form with lead capture.

## Tech Stack

- **Server**: Hono (TypeScript) on Node.js, deployable to Cloudflare Workers
- **Interactivity**: Alpine.js (CDN) for form state, toggles, accordions
- **Styling**: Tailwind CSS + DaisyUI (CDN), dark glassmorphism theme
- **Fonts**: Figtree (body) + Instrument Serif (display headings) via Google Fonts CDN
- **Validation**: Zod schemas for blog posts and contact leads (generated from Drizzle table defs)
- **Storage**: In-memory Maps (no database -- data lost on restart)
- **Build**: Wrangler for Workers deployment. No frontend build step.

## Key Commands

```bash
# IMPORTANT: @hono/node-server and tsx are NOT in package.json.
# You must add them before these commands will work:
#   npm install @hono/node-server tsx

npx tsx server/index.ts  # Start dev server on port 5000
npx tsc --noEmit         # TypeScript type checking
npx wrangler deploy      # Deploy to Cloudflare Workers
```

There are no tests (`npm test` does not exist).

## File Structure

```
server/
  index.ts          # Node.js dev server entry (Hono + @hono/node-server, port 5000)
  routes.ts         # All HTTP routes (26 page renders + 5 API endpoints, 213 lines)
  storage.ts        # IStorage interface + MemStorage (in-memory Maps, 305 lines)
  template.ts       # ALL page templates (5212 lines, monolithic)
shared/
  schema.ts         # Zod validation schemas via Drizzle pgTable defs (73 lines)
worker.ts           # Cloudflare Workers entry (DUPLICATES routes -- missing 10 pages)
public/assets/      # Static files served by Workers
attached_assets/    # Source branding files (logos, competitor research)
```

## Architecture Patterns

- **Server-side rendering**: All HTML generated as template literal strings in TypeScript functions. No React, no JSX, no client-side rendering.
- **Template composition**: `renderLayout()` wraps page content with shared head/nav/footer/scripts. Individual pages export `render*Page()` functions.
- **Storage interface**: `IStorage` interface in `storage.ts` allows swapping implementations. Currently only `MemStorage` exists.
- **Dual entry points**: `server/index.ts` for Node.js dev, `worker.ts` for Cloudflare Workers. Routes are **duplicated** in both (this is a known issue). **worker.ts is currently 10 pages behind routes.ts.**
- **CDN dependencies**: Tailwind, Alpine.js, HTMX (unused), DaisyUI loaded from CDNs. No frontend build step.

## Common Gotchas

1. **@hono/node-server missing from package.json** -- imported in `server/index.ts` but not in dependencies. Must be added before dev server can run.
2. **No lockfile** -- No package-lock.json. Run `npm install` to generate one.
3. **worker.ts is OUT OF SYNC with routes.ts** -- worker.ts is missing 10 page routes (legal, audience, partners, dashboard, trust, support, video-player). Deploying to Workers will 404 on these pages. Any route change MUST be made in both files.
4. **template.ts is 5212 lines** -- All 26 page templates live in one file. Use search, not scrolling.
5. **Data is ephemeral** -- In-memory storage. All blog posts reset to seed data on restart. Contact leads disappear.
6. **Blog category filters are broken** -- Alpine.js state changes but posts are never actually filtered in the DOM.
7. **No auth on admin panel** -- `/admin/blog` is publicly accessible. Do not deploy without adding auth.
8. **`published` is a string** -- Blog post `published` field is `"true"`/`"false"` string, not boolean. Use string comparison.
9. **sanitizeHtml is regex-based and duplicated** -- Exists in both `routes.ts` and `worker.ts`. Regex approach is bypassable.
10. **Support form schema mismatch** -- `/support` form sends `website` and `monthlyPageviews` fields to `/api/contact`, but the Zod schema expects `impressions` and has no `website` field. Will fail validation.
11. **Social icon links still go to `#`** -- LinkedIn and Twitter/X icons in footer are placeholder `href="#"`.
12. **OG image URLs are relative** -- Social media previews won't show images because `og:image` uses `/assets/...` instead of absolute URL.
13. **HTMX loaded but never used** -- HTMX 2.0.4 CDN script in `<head>` of every page, zero `hx-*` attributes anywhere.
14. **script/build.ts is dead code** -- References Vite, Express, Passport, pg, etc. that are no longer installed. No `build` script in package.json.
15. **Fonts are Figtree + Instrument Serif, not Inter** -- Prior docs say Inter but code loads Figtree and Instrument Serif.

## Design System

- **Brand colors**: Mint green `#2BDE73`, dark green `#1AAF5C`, light green `#6CF5A0`
- **Surfaces**: Dark `#06060a`, elevated `#0e0e14`
- **Glass effects**: `backdrop-filter: blur(48px) saturate(200%)` with `rgba(255,255,255,0.04)` background
- **Buttons**: Pill-shaped (`border-radius: 980px`), gradient fill for primary, outline for secondary
- **Typography**: Figtree (body), Instrument Serif (display headings), `text-gradient` and `text-gradient-accent` classes
- **CSS custom properties**: `--accent`, `--accent-glow`, `--accent-dark`, `--accent-warm`, `--surface`, `--surface-elevated`, `--glass-bg`, `--glass-border`
- **Utility classes**: `glass-card`, `glass-btn`, `glass-btn-outline`, `glass-input`, `glass-select`, `glass-tag`, `glass-nav`

## Environment Setup

1. `npm install` (will warn about missing @hono/node-server)
2. Add `@hono/node-server` to dependencies: `npm install @hono/node-server`
3. Add tsx for dev: `npm install -D tsx`
4. `npx tsx server/index.ts`
5. Open `http://localhost:5000`

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
- @hono/node-server missing from package.json (dev server won't start)
- No lockfile

### Not Started
- Authentication
- Persistent storage (database)
- Testing
- CI/CD
- Rate limiting
- CSRF protection
- SEO files (sitemap.xml, robots.txt)
- Error pages (404, 500)
