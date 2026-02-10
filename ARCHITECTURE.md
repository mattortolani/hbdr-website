# ARCHITECTURE.md

## System Overview

HBDR Website is a server-rendered marketing site for HBDR, an ad-tech company specializing in header bidding and publisher monetization. It is a 26-page website with a blog CMS, built on the Hono framework (Node.js) with server-side HTML template generation. All pages are rendered as complete HTML strings on the server with no client-side JavaScript framework -- interactivity is handled via Alpine.js and native browser APIs.

## Component Map

```
                           +-----------------------+
                           |    Cloudflare Worker   |  (worker.ts - production)
                           |    or Node.js Server   |  (server/index.ts - dev)
                           +-----------+-----------+
                                       |
                              Hono Router (routes.ts)
                                       |
          +----------------------------+----------------------------+
          |                            |                            |
   Static Pages              Blog CRUD API              Contact Form API
   (GET /, /about,            (GET/POST/PUT/DELETE       (POST /api/contact)
    /solutions/*,              /api/blog/*)
    /publishers,
    /advertisers,
    /partners,
    /trust,
    /dashboard,
    /privacy-policy,
    /terms,
    /gdpr-cookie-policy,
    /support, etc.)
          |                            |                            |
   Template Functions          Storage Layer                Storage Layer
   (template.ts)              (storage.ts)                (storage.ts)
          |                            |                            |
   renderLayout()          MemStorage (in-memory Map)    MemStorage (in-memory Map)
   renderHomePage()               |                            |
   render*Page() (26)      blogPosts Map             contactSubmissions Map
          |
   HTML string with:
   - Tailwind CSS (CDN)
   - Alpine.js (CDN)
   - HTMX (CDN, barely used)
   - Inline SVG icons
   - Google Fonts (Inter)
```

## Tech Stack

### Runtime & Framework
| Component | Version | Purpose |
|-----------|---------|---------|
| Node.js | 20.x (Replit default) | Development runtime |
| Hono | 4.11.9 | HTTP framework (routes, middleware) |
| @hono/node-server | 1.19.9 | Node.js adapter for Hono |
| TypeScript | 5.6.3 | Language |
| tsx | 4.20.5 | TypeScript execution (dev) |

### Frontend (CDN-loaded, no build step)
| Component | Version | Purpose |
|-----------|---------|---------|
| Tailwind CSS | 3.x (CDN) | Utility-first CSS |
| Alpine.js | 3.x (CDN) | Lightweight interactivity (FAQ toggles, mobile menu, form state) |
| HTMX | 2.0.4 (CDN) | Declared in `<head>` but barely used in practice |
| Google Fonts (Inter) | CDN | Typography |

### Build & Deploy
| Component | Version | Purpose |
|-----------|---------|---------|
| esbuild | 0.25.0 | Bundles worker.ts for Cloudflare Workers |
| wrangler | 4.63.0 | Cloudflare Workers deployment CLI |

### Validation
| Component | Version | Purpose |
|-----------|---------|---------|
| Zod | 3.24.2 | Schema validation for blog posts and contact form |

### Unused Dependencies (Installed but not imported anywhere)
These are remnants of a prior React/Express SPA architecture that was abandoned:

**React ecosystem (completely unused):**
react, react-dom, @tanstack/react-query, react-hook-form, @hookform/resolvers, react-day-picker, react-icons, react-resizable-panels, recharts, wouter, framer-motion, next-themes, lucide-react, cmdk, embla-carousel-react, input-otp, vaul

**Radix UI (completely unused):**
@radix-ui/react-accordion, @radix-ui/react-alert-dialog, @radix-ui/react-aspect-ratio, @radix-ui/react-avatar, @radix-ui/react-checkbox, @radix-ui/react-collapsible, @radix-ui/react-context-menu, @radix-ui/react-dialog, @radix-ui/react-dropdown-menu, @radix-ui/react-hover-card, @radix-ui/react-label, @radix-ui/react-menubar, @radix-ui/react-navigation-menu, @radix-ui/react-popover, @radix-ui/react-progress, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, @radix-ui/react-select, @radix-ui/react-separator, @radix-ui/react-slider, @radix-ui/react-slot, @radix-ui/react-switch, @radix-ui/react-tabs, @radix-ui/react-toast, @radix-ui/react-toggle, @radix-ui/react-toggle-group, @radix-ui/react-tooltip

**Styling utilities (unused):**
class-variance-authority, clsx, tailwind-merge, tailwindcss-animate, tw-animate-css

**Database & Auth (unused - in-memory storage used instead):**
drizzle-orm, drizzle-zod, drizzle-kit, pg, connect-pg-simple, passport, passport-local, express-session, memorystore

**Other unused:**
express, ws, @octokit/rest, date-fns, @jridgewell/trace-mapping

**Unused devDependencies:**
@vitejs/plugin-react, vite, @replit/vite-plugin-cartographer, @replit/vite-plugin-dev-banner, @replit/vite-plugin-runtime-error-modal, @tailwindcss/vite, @tailwindcss/typography, autoprefixer, postcss, @types/express, @types/express-session, @types/passport, @types/passport-local, @types/react, @types/react-dom, @types/ws, @types/connect-pg-simple

## Data Flow

### Page Request (e.g., GET /about)
1. Request hits Hono router in `routes.ts` (or `worker.ts` in production -- **note: worker.ts is 10 pages behind**)
2. Route handler calls `renderAboutPage()` from `template.ts`
3. `renderAboutPage()` builds HTML content string using template literals
4. Content is wrapped by `renderLayout()` which adds `<html>`, `<head>`, nav, footer
5. Complete HTML string returned as `text/html` response with 200 status

### Blog Post Creation (POST /api/blog)
1. JSON body received by Hono route handler
2. Body parsed and validated against Zod `insertBlogPostSchema`
3. `storage.createBlogPost()` called -- generates UUID, sets timestamps
4. Post stored in in-memory `Map<string, BlogPost>`
5. JSON response with created post returned
6. **Data is lost on server restart** (no persistence)

### Contact Form Submission (POST /api/contact)
1. JSON body received by route handler
2. Validated against Zod `insertContactSubmissionSchema`
3. HTML content sanitized via `sanitizeHtml()` (basic regex-based)
4. `storage.createContactSubmission()` stores in in-memory Map
5. JSON success response returned
6. **Data is lost on server restart** (no persistence)

### Blog Listing (GET /blog)
1. Route handler calls `storage.getBlogPosts()`
2. Returns all posts from in-memory Map, sorted by `publishedAt` descending
3. Posts filtered to `published === "true"` only
4. `renderBlogPage(posts)` generates HTML with post cards
5. HTML returned as response

## File Structure

```
hbdr-website/
+-- server/
|   +-- index.ts          # Dev server entry point (Hono + @hono/node-server, port 5000)
|   +-- routes.ts         # All HTTP route definitions (pages + API endpoints)
|   +-- storage.ts        # In-memory data storage (MemStorage class with Maps)
|   +-- template.ts       # ALL HTML templates (5212 lines, monolithic)
+-- shared/
|   +-- schema.ts         # Zod schemas for blogPosts and contactSubmissions
+-- worker.ts             # Cloudflare Workers entry point (duplicates route setup)
+-- script/
|   +-- build.ts          # esbuild script to bundle worker.ts for CF Workers
+-- public/
|   +-- assets/           # Static files served at /assets/* (favicons, logo images)
+-- attached_assets/      # Source branding files (logos, content specs, branding JSON)
+-- client/
|   +-- public/
|       +-- favicon.png   # Orphaned file from prior React SPA architecture
+-- .local/               # Replit agent state files (not version-controlled content)
+-- .upm/
|   +-- store.json        # Replit package manager state
+-- package.json          # Dependencies (heavily bloated with unused packages)
+-- package-lock.json     # Lock file
+-- tsconfig.json         # TypeScript config (targets ES2022, JSX react-jsx)
+-- tsconfig.worker.json  # TypeScript config for Cloudflare Worker build
+-- wrangler.toml         # Cloudflare Workers config (name: hbdr-website)
+-- components.json       # shadcn/ui config (unused -- no React components exist)
+-- replit.md             # Replit project documentation
+-- README.md             # Basic project README
+-- .gitignore            # Standard Node.js gitignore
```

## External Integrations

| Service | How Authed | What It Does |
|---------|-----------|--------------|
| Tailwind CSS CDN | None (public CDN) | CSS framework loaded via `<script src="https://cdn.tailwindcss.com">` |
| Alpine.js CDN | None (public CDN) | Lightweight JS framework for interactivity |
| HTMX CDN | None (public CDN) | Declared in head but barely used |
| Google Fonts CDN | None (public CDN) | Inter font family |
| Cloudflare Workers | Wrangler CLI (API token) | Production deployment target |

There are **no** third-party API integrations, payment providers, analytics services, email providers, or database connections. The contact form submits data that is stored in memory and never forwarded anywhere.

## State Management

| State | Where It Lives | Persistence |
|-------|---------------|-------------|
| Blog posts | In-memory `Map<string, BlogPost>` in `MemStorage` | **None** -- lost on restart |
| Contact submissions | In-memory `Map<string, ContactSubmission>` in `MemStorage` | **None** -- lost on restart |
| Blog editor form state | Alpine.js `x-data` in browser | Browser session only |
| Contact form state | Alpine.js `x-data` in browser | Browser session only |
| FAQ accordion state | Alpine.js `x-data` in browser | Browser session only |
| Mobile menu state | Alpine.js `x-data` in browser | Browser session only |
| Blog category filter | Alpine.js `x-data` in browser | Browser session only (non-functional -- see Known Issues) |

## Security Model

### Authentication
**There is none.** The blog admin panel at `/admin/blog`, `/admin/blog/new`, and `/admin/blog/edit/:id` is completely open to the public. Anyone can create, edit, and delete blog posts.

### Input Validation
- Blog post creation/update: Zod schema validation on required fields
- Contact form: Zod schema validation on required fields
- HTML sanitization: Basic regex-based `sanitizeHtml()` function strips `<script>`, `<iframe>`, `<object>`, `<embed>`, `<link>`, and event handler attributes (e.g., `onclick`, `onerror`)

### Security Gaps
- **No authentication** on admin routes
- **No CSRF protection** on any forms or API endpoints
- **No rate limiting** on API endpoints (contact form, blog CRUD)
- **No Content Security Policy (CSP) headers**
- **sanitizeHtml is duplicated** in both `routes.ts` and `worker.ts` with identical logic -- changes to one won't propagate to the other
- **sanitizeHtml is regex-based** and likely bypassable with edge cases (e.g., mixed case tags, nested tags, Unicode tricks)
- **No CORS configuration** (Hono default: no CORS headers)
- **Blog content field accepts raw HTML** and renders it directly in templates -- XSS risk despite sanitization
- **Delete endpoint uses GET-style inline onclick** with `fetch()` -- no confirmation token, no CSRF

### Secrets Handling
There are no secrets, API keys, or environment variables in use. The application has no external service integrations.

## Infrastructure

### Development
- **Platform**: Replit (evidenced by `.upm/`, `.local/state/replit/`, `replit.md`)
- **Dev server**: `tsx server/index.ts` on port 5000
- **Hot reload**: None (manual restart required)

### Production
- **Target**: Cloudflare Workers (configured in `wrangler.toml`)
- **Build**: `tsx script/build.ts` -- uses esbuild to bundle `worker.ts` into `dist/worker.js`
- **Worker name**: `hbdr-website`
- **Compatibility date**: `2025-04-01`
- **Domain**: Not configured in wrangler.toml (uses default `*.workers.dev`)

### CI/CD
**There is none.** No GitHub Actions, no automated testing, no staging environment. Deployment is presumably manual via `npx wrangler deploy`.

### Environments
| Environment | Details |
|-------------|---------|
| Development | Replit + tsx, port 5000 |
| Staging | Does not exist |
| Production | Cloudflare Workers (manual deploy) |

## Known Issues

### Critical
1. **No data persistence**: All blog posts and contact submissions are stored in-memory Maps. Every server restart or Cloudflare Worker cold start loses all data.
2. **No authentication on admin panel**: `/admin/blog` is publicly accessible. Anyone can CRUD blog posts.
3. **XSS risk in blog content**: Blog posts accept raw HTML content rendered directly into pages. The `sanitizeHtml()` function is regex-based and likely bypassable.
4. **sanitizeHtml() is duplicated**: Identical function exists in both `routes.ts:9-21` and `worker.ts:19-29`. Any fix must be applied to both files.
5. **worker.ts is 10 pages behind routes.ts**: New pages (Privacy Policy, Terms, GDPR, Support, Dashboard, Video Player, Partners, Publishers, Advertisers, Trust) exist in routes.ts but NOT in worker.ts. Deploying to Cloudflare Workers will 404 on all these pages, including legal pages linked from every page's footer.

### Significant
6. **Massive dependency bloat**: 60+ packages installed, ~10 actually used. `node_modules` is enormous with React, Radix UI, Express, Drizzle, Passport, etc. that are never imported.
7. **template.ts is a 5212-line monolith**: All 26 page templates in a single file. No separation of concerns, extremely hard to maintain. Grew 55% since initial build.
8. **Blog category filters don't work**: The Alpine.js `x-data="{ activeCategory: '' }"` state on the blog listing page is never connected to actual DOM filtering logic. Clicking a category button changes state but posts are not filtered.
9. **`published` field is a string**: `"true"/"false"` instead of a boolean. Fragile string comparisons throughout.
10. **Support form schema mismatch**: The `/support` page form submits to `/api/contact` but sends `website` and `monthlyPageviews` fields that don't exist in the Zod schema (expects `impressions`). Will fail validation.

### Minor
11. **Social icon links are broken**: LinkedIn and Twitter/X icons in footer point to `"#"`. (Resources and Legal footer links are now fixed with real page links.)
12. **OG image URL is relative**: `<meta property="og:image" content="/assets/HBDR_Logo_Pack_all_sizes_-_8_1770577514801.jpeg">` -- social media crawlers need absolute URLs.
13. **Hardcoded stats**: Stats section shows "1T+ Ads Served", "500+ Publishers", "40-60% Revenue Uplift", "$2B+ Revenue Generated" -- hardcoded in template, not configurable.
14. **No 404 page**: Unmatched routes return Hono's default "404 Not Found" text, not a branded error page.
15. **No sitemap.xml or robots.txt**: Missing basic SEO files.
16. **`components.json` is orphaned**: shadcn/ui configuration file with no corresponding React components.
17. **`client/public/favicon.png` is orphaned**: Leftover from prior React SPA architecture.
18. **Package name is `rest-express`**: Does not match the project (HBDR website using Hono, not Express).
19. **`db:push` script references Drizzle**: `"db:push": "drizzle-kit push"` -- no database exists.
20. **External dashboard link unverified**: Dashboard page links to `https://dashboard.hbdr.com` -- not verified if live.
