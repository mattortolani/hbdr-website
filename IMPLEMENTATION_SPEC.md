# IMPLEMENTATION_SPEC.md

## Section 1: End-State Product Definition

The finished HBDR website is a production-grade marketing site with the following characteristics:

### Complete Feature Set
- **16+ server-rendered pages** with consistent glassmorphism design, SEO metadata, and responsive layouts
- **Blog CMS** with authenticated admin panel, persistent storage, rich text editing, image uploads, draft/publish workflow, pagination, search, and category filtering that actually works
- **Contact form** with server-side validation, persistent lead storage, email notification forwarding, rate limiting, and CAPTCHA/bot protection
- **SEO optimization** with sitemap.xml, robots.txt, absolute OG image URLs, structured data (JSON-LD), and canonical URLs on every page
- **Legal pages** with real Privacy Policy, Terms of Service, and Cookie Policy content
- **404/500 error pages** with branded design matching the site aesthetic

### Error Handling & Recovery
- Try/catch on every async boundary with meaningful error responses
- Structured error logging with request IDs
- Graceful degradation when storage fails
- User-friendly error states in all forms

### Security
- Authentication on all `/admin/*` routes (session-based or token-based)
- CSRF protection on all mutation endpoints
- Rate limiting on contact form and blog API
- Content Security Policy headers
- Proper HTML sanitization using a battle-tested library (not regex)
- Input validation on every user-facing endpoint

### Observability
- Structured logging with timestamps and request IDs
- Health check endpoint (`GET /health`)
- Error tracking integration

### Performance
- Static asset caching with proper Cache-Control headers
- Gzip/Brotli compression
- Lazy loading for below-fold content
- Optimized image assets (WebP, proper dimensions)

### Testing
- Unit tests for storage layer, validation schemas, and sanitization
- Integration tests for all API endpoints
- E2E smoke tests for critical user flows

### CI/CD
- Automated linting and type checking on PR
- Automated test execution
- Staged deployment (dev -> staging -> production)
- Rollback capability

---

## Section 2: Current State Audit

| Module/Feature | Status | What Exists | What's Missing |
|---|---|---|---|
| **Homepage** | 🔧 PARTIAL | Full layout with hero, features, stats, testimonials, CTA, contact form section. All content renders correctly. | Hardcoded stats, broken social links (`#`), no analytics |
| **About Page** | 🔧 PARTIAL | Full layout with team section, values, mission, stats. | Hardcoded team data, no real team photos |
| **How It Works Page** | ✅ DONE | Complete 3-step process, FAQ with Alpine.js accordion, CTA section | - |
| **Careers Page** | 🔧 PARTIAL | Full layout with benefits, open positions, culture sections | Job listings are hardcoded in template, no application form |
| **Press Page** | 🔧 PARTIAL | Press releases listed, media contact section, brand assets section | Press releases hardcoded, no downloadable media kit |
| **Contact Page** | 🔧 PARTIAL | Form with name/email/company/impressions/message fields, Alpine.js state management, success/error states | No email notification, no CAPTCHA, no rate limiting, data not persisted |
| **Blog Listing** | ⚠️ BROKEN | Page renders with post cards, category filter buttons exist | Category filter buttons change Alpine state but never filter the DOM -- all posts always visible regardless of selection |
| **Blog Post View** | 🔧 PARTIAL | Individual post rendering with content, tags, author, back link | No related posts, no social share buttons, raw HTML content = XSS risk |
| **Blog Admin Panel** | ⚠️ BROKEN | CRUD interface exists with list/create/edit/delete | No authentication -- publicly accessible. No image upload. No rich text editor. Data lost on restart |
| **Blog API (CRUD)** | 🔧 PARTIAL | POST/PUT/DELETE endpoints with Zod validation, slug uniqueness check | No auth, no rate limiting, no pagination, regex-based HTML sanitizer bypassable |
| **Contact API** | 🔧 PARTIAL | POST endpoint with Zod validation, success/error HTML responses | No rate limiting, no email forwarding, no CAPTCHA, no persistent storage |
| **Contact Leads API** | ⚠️ BROKEN | GET /api/contact returns all leads as JSON | Completely unauthenticated -- anyone can view all submitted contact data |
| **9 Solution Pages** | 🔧 PARTIAL | Header Bidding, Display Ads, CTV/OTT, In-App, MCM, Manage Account, Manage Inventory, Open Bidding, Ad Exchange AdX -- all render with overview, features, stats, CTA | Content is marketing copy only, no interactive demos or calculators |
| **Navigation** | ✅ DONE | Desktop nav with Solutions dropdown (hover), mobile nav with hamburger + expandable solutions, scroll shadow effect | - |
| **Footer** | 🔧 PARTIAL | 6-column layout with Solutions, Company, Resources, Legal links, social icons, copyright | Social links point to `#`, Resources links (Case Studies, Documentation, Support, FAQ) point to `#`, Legal links (Privacy Policy, Terms, Cookie Policy, GDPR) point to `#` |
| **SEO Meta Tags** | 🔧 PARTIAL | Title, description, og:title, og:description, og:type, og:image, twitter:card on every page | og:image uses relative URL (breaks social previews), no canonical `<link>`, no JSON-LD structured data, no sitemap.xml, no robots.txt |
| **Static Asset Serving** | 🔧 PARTIAL | `/assets/:filename` serves from `attached_assets/` in dev, `public/assets/` for Workers | File-based serving with fs.readFileSync (blocks event loop), basic MIME type detection |
| **Cloudflare Worker** | ⚠️ BROKEN | `worker.ts` duplicates all route logic from `routes.ts` instead of importing it | Any route change requires updating two files. Worker entry has no static asset fallback for CSS/JS CDN failures |
| **Data Persistence** | ⚠️ BROKEN | In-memory Maps with seeded blog posts | All data lost on restart. No database. Schema defines PostgreSQL tables via Drizzle but no DB connection exists |
| **Authentication** | 🔲 PLANNED | `users` table defined in schema.ts, passport/passport-local in dependencies | Zero auth implementation. Schema exists but nothing uses it |
| **HTML Sanitization** | ⚠️ BROKEN | Regex-based sanitizeHtml() strips script/style tags and event handlers | Duplicated in 2 files, regex approach bypassable, does not handle edge cases (nested tags, encoded entities, SVG-based XSS) |
| **Design System** | ✅ DONE | Consistent glassmorphism with CSS custom properties, glass-card/glass-btn/glass-input classes, animations | - |
| **Mobile Responsiveness** | ✅ DONE | All pages responsive via Tailwind breakpoints, mobile nav, touch-friendly | - |
| **Error Handling** | 🔧 PARTIAL | Try/catch on API routes with console.error and generic 500 responses | No request IDs, no structured logging, no user-friendly error pages, no 404 page |
| **Testing** | 📋 REQUIRED | Nothing exists | No unit tests, integration tests, or E2E tests |
| **CI/CD** | 📋 REQUIRED | Nothing exists | No automated pipeline, manual deployment only |
| **Rate Limiting** | 📋 REQUIRED | Nothing exists | No rate limiting on any endpoint |
| **CSRF Protection** | 📋 REQUIRED | Nothing exists | No CSRF tokens on any forms |
| **Logging** | 🔧 PARTIAL | Hono logger middleware for request logging, console.error for errors | No structured format, no request IDs, no log levels |
| **Health Check** | 📋 REQUIRED | Nothing exists | No health check endpoint |
| **Privacy Policy Page** | 📋 REQUIRED | Link exists in footer but points to `#` | No actual page or content |
| **Terms of Service Page** | 📋 REQUIRED | Link exists in footer but points to `#` | No actual page or content |
| **Sitemap & Robots** | 📋 REQUIRED | Nothing exists | No sitemap.xml, no robots.txt |
| **404 Error Page** | 📋 REQUIRED | Nothing exists | Hono default plain text "404 Not Found" |

---

## Section 3: Dependency & Security Audit

### Actually Used Dependencies

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| hono | ^4.11.9 | OK | Active, well-maintained |
| @hono/node-server | ^1.19.9 | OK | Official Hono package |
| zod | ^3.24.2 | OK | Active, well-maintained |
| zod-validation-error | ^3.4.0 | OK | Active |
| @cloudflare/workers-types | ^4.20260207.0 | OK | Type definitions only |
| wrangler | ^4.63.0 | OK | Cloudflare CLI |
| tsx | ^4.20.5 | OK | Dev-only TypeScript runner |
| esbuild | ^0.25.0 | OK | Build tool |
| typescript | 5.6.3 | OK | Language |

### Unused Dependencies (Should Be Removed)
~50+ packages are installed but never imported. See ARCHITECTURE.md "Unused Dependencies" section for the full list. Key categories:
- **React ecosystem** (react, react-dom, 20+ Radix UI packages, tanstack query, etc.)
- **Express ecosystem** (express, express-session, passport, passport-local)
- **Database** (drizzle-orm, drizzle-zod, drizzle-kit, pg, connect-pg-simple)
- **Misc** (@octokit/rest, ws, date-fns, framer-motion, recharts, etc.)

### Security Issues

| Issue | Severity | Details |
|-------|----------|---------|
| No authentication on admin | **CRITICAL** | `/admin/blog`, `/api/blog` POST/PUT/DELETE, `/api/contact` GET are all publicly accessible |
| Regex-based HTML sanitization | **HIGH** | `sanitizeHtml()` uses regex to strip dangerous HTML. Regex-based sanitization is fundamentally flawed and bypassable with mixed case, encoding tricks, or nested constructs |
| No CSRF protection | **HIGH** | All mutation endpoints accept requests from any origin with no token verification |
| No rate limiting | **MEDIUM** | Contact form and blog API can be spammed without limit |
| No CSP headers | **MEDIUM** | No Content-Security-Policy header. Uses `<script src="https://cdn.tailwindcss.com">` which requires `unsafe-eval` in CSP |
| Raw HTML rendering | **HIGH** | Blog post `content` field is rendered directly into page HTML via `${post.content}`. Even with sanitization, this is a persistent XSS vector |
| GET /api/contact exposes all leads | **HIGH** | Any visitor can `GET /api/contact` and see all submitted contact form data (names, emails, companies, messages) |
| No input length limits | **LOW** | Blog content, messages have no max length -- potential for large payload abuse |

### Missing Security Practices
- No HTTPS enforcement (Cloudflare handles this at the edge, but no redirect in app)
- No Helmet-style security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- No input sanitization on contact form fields (names, company names)
- No secure cookie configuration (no cookies used currently, but relevant when auth is added)

---

## Section 4: Implementation Phases

### Phase 0: Critical Fixes
**Goal**: Fix anything broken that blocks other work or poses immediate security risk.

1. Add basic auth to admin routes (blocks any safe blog management)
2. Replace regex sanitizeHtml with a proper library
3. Protect GET /api/contact behind auth
4. Fix blog category filter functionality
5. Deduplicate worker.ts route logic (import from shared source)

### Phase 1: Complete Core
**Goal**: All 🔧 PARTIAL items become ✅ DONE. All ⚠️ BROKEN items become ✅ DONE or removed.

1. Add persistent storage (Cloudflare D1 or KV for Workers, SQLite/PostgreSQL for Node)
2. Create 404 error page with branded design
3. Fix footer links (add real legal pages or remove broken links)
4. Fix OG image URLs to be absolute
5. Add sitemap.xml and robots.txt
6. Add blog post pagination
7. Clean up unused dependencies from package.json

### Phase 2: Harden
**Goal**: Error handling, input validation, and edge cases.

1. Add CSRF protection to all mutation endpoints
2. Add rate limiting to contact form and blog API
3. Add structured error logging with request IDs
4. Add CSP headers
5. Add input length limits on all text fields
6. Add proper error pages (500, 403)
7. Validate and sanitize all user inputs (not just blog content)

### Phase 3: Optimize
**Goal**: Performance, caching, bundle size.

1. Remove ~50 unused npm dependencies (reduce install size dramatically)
2. Add proper Cache-Control headers for static assets
3. Optimize images (convert JPEG logos to WebP, proper dimensions)
4. Split template.ts monolith into separate page files
5. Add gzip/brotli compression middleware

### Phase 4: Production Infrastructure
**Goal**: CI/CD, environments, monitoring.

1. Add GitHub Actions CI pipeline (lint, type-check, test)
2. Add health check endpoint
3. Configure staging environment
4. Add automated Cloudflare Workers deployment
5. Set up error monitoring/alerting

### Phase 5: Enterprise Grade
**Goal**: Full observability, admin tooling, compliance.

1. Add comprehensive test suite (unit + integration)
2. Add admin dashboard for contact lead management
3. Add privacy policy and terms of service pages with real content
4. Add cookie consent banner
5. Add structured data (JSON-LD) for SEO
6. Add analytics integration

---

## Section 5: Task Breakdown

### Task 0-1: Add Basic Authentication to Admin Routes
**Status**: 🔲 Not Started
**Phase**: Phase 0 - Critical Fixes
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `server/routes.ts`, `worker.ts`, `server/storage.ts`, `shared/schema.ts`

**Context**: The blog admin panel at `/admin/blog`, `/admin/blog/new`, `/admin/blog/edit/:id`, and all blog mutation API endpoints (`POST /api/blog`, `PUT /api/blog/:id`, `DELETE /api/blog/:id`) are completely unauthenticated. Anyone on the internet can create, edit, or delete blog posts. The `GET /api/contact` endpoint also exposes all submitted contact leads to any visitor.

**Requirements**:
1. Add a Hono middleware that checks for a valid admin session or API key on all routes matching `/admin/*` and `/api/blog` (POST/PUT/DELETE) and `/api/contact` (GET)
2. Implement a simple login page at `/admin/login` that accepts a username/password
3. Store admin credentials as environment variables (`ADMIN_USERNAME`, `ADMIN_PASSWORD`) -- not hardcoded
4. Use Hono's built-in `basicAuth` middleware or a session-cookie approach
5. Redirect unauthenticated requests to `/admin/login`
6. For Cloudflare Workers, use `wrangler secret` for credentials and `c.env` to access them

**Acceptance Criteria**:
- [ ] Visiting `/admin/blog` without auth redirects to `/admin/login`
- [ ] `POST /api/blog` without auth returns 401
- [ ] `GET /api/contact` without auth returns 401
- [ ] Valid credentials allow access to admin panel
- [ ] Credentials are read from environment variables, not hardcoded

**Implementation Notes**: Hono has a built-in `basicAuth` middleware that works on both Node.js and Cloudflare Workers. This is the simplest approach for an MVP. The `users` table already exists in `shared/schema.ts` but implementing full session auth is out of scope for this task -- basic auth is sufficient.

---

### Task 0-2: Replace Regex-Based HTML Sanitizer with a Proper Library
**Status**: 🔲 Not Started
**Phase**: Phase 0 - Critical Fixes
**Priority**: High
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/routes.ts`, `worker.ts`

**Context**: The `sanitizeHtml()` function in both `routes.ts` (lines 9-21) and `worker.ts` (lines 19-29) uses regex to strip `<script>`, `<style>`, event handler attributes, and `javascript:` URIs. Regex-based HTML sanitization is fundamentally flawed -- it can be bypassed with mixed-case tags (`<ScRiPt>`), HTML entity encoding (`&#x3C;script>`), or nested/malformed constructs. Blog post content is rendered directly into page HTML as `${post.content}`, making this a persistent XSS vulnerability.

**Requirements**:
1. Install `sanitize-html` (npm package, works in both Node.js and Workers) or `isomorphic-dompurify`
2. Create a shared `server/sanitize.ts` module exporting a `sanitizeHtml(html: string): string` function
3. Configure the sanitizer to allow the same tags currently in the `allowedTags` array in routes.ts: `h1-h6, p, a, ul, ol, li, strong, em, b, i, br, blockquote, pre, code, img, span, div, hr, table, thead, tbody, tr, th, td`
4. Allow `href`, `src`, `alt`, `class`, `target`, `rel`, `width`, `height` attributes
5. Strip everything else (scripts, event handlers, iframes, objects, embeds)
6. Import this shared module in both `routes.ts` and `worker.ts`, replacing the inline regex functions
7. Remove the duplicated inline `sanitizeHtml()` functions from both files

**Acceptance Criteria**:
- [ ] `sanitizeHtml('<script>alert(1)</script>')` returns empty string or stripped content
- [ ] `sanitizeHtml('<img src=x onerror=alert(1)>')` returns `<img src="x">` (no onerror)
- [ ] `sanitizeHtml('<ScRiPt>alert(1)</ScRiPt>')` returns empty string (case-insensitive)
- [ ] `sanitizeHtml('<p>Hello <strong>world</strong></p>')` returns the input unchanged
- [ ] Only one `sanitizeHtml` implementation exists (in `server/sanitize.ts`)
- [ ] Both `routes.ts` and `worker.ts` import from the same module

**Implementation Notes**: `sanitize-html` is the most common choice and works in Node.js. For Cloudflare Workers compatibility, verify it doesn't depend on Node.js-specific APIs (it should be fine since it's pure JS). If not, consider `xss` npm package which is also pure JS.

---

### Task 0-3: Protect Contact Leads API Endpoint
**Status**: 🔲 Not Started
**Phase**: Phase 0 - Critical Fixes
**Priority**: High
**Complexity**: S (< 1hr)
**Depends On**: Task 0-1
**Files**: `server/routes.ts`, `worker.ts`

**Context**: `GET /api/contact` at `routes.ts:191-199` returns all submitted contact leads as JSON with no authentication. This exposes names, email addresses, company names, and messages of everyone who has submitted the contact form.

**Requirements**:
1. Apply the same auth middleware from Task 0-1 to the `GET /api/contact` route
2. Unauthenticated requests should return `401 { message: "Unauthorized" }`
3. Apply the same change in `worker.ts`

**Acceptance Criteria**:
- [ ] `GET /api/contact` without auth returns 401
- [ ] `GET /api/contact` with valid admin auth returns the leads array
- [ ] Change is applied in both `routes.ts` and `worker.ts`

**Implementation Notes**: This is a one-liner if Task 0-1's auth middleware is implemented as a reusable Hono middleware.

---

### Task 0-4: Fix Blog Category Filter
**Status**: 🔲 Not Started
**Phase**: Phase 0 - Critical Fixes
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/template.ts`

**Context**: In `renderBlogPage()` (template.ts around line 1930), the blog listing page has category filter buttons that use Alpine.js `x-data="{ activeCategory: '' }"`. Clicking a button changes `activeCategory` state, but no `x-show` or `x-if` directive on the post cards references this state. All posts are always visible regardless of which category filter is selected.

**Requirements**:
1. Move the `x-data="{ activeCategory: '' }"` from the filter button container to a parent element that wraps both the filters and the post grid
2. Add `x-show="!activeCategory || activeCategory === '${post.category}'"` to each blog post `<article>` element in `renderBlogPage()`
3. Add `x-transition` to the articles for smooth show/hide

**Acceptance Criteria**:
- [ ] Clicking "All Posts" shows all blog posts
- [ ] Clicking a category (e.g., "Industry Trends") shows only posts in that category
- [ ] Clicking the same category again deselects it and shows all posts
- [ ] Posts smoothly transition when filtered

**Implementation Notes**: The Alpine.js state and button logic already work correctly -- the only missing piece is connecting the state to the post visibility. This is a template-only change.

---

### Task 0-5: Deduplicate Worker Route Logic
**Status**: 🔲 Not Started
**Phase**: Phase 0 - Critical Fixes
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `worker.ts`, `server/routes.ts`

**Context**: `worker.ts` (178 lines) re-implements every route handler that exists in `server/routes.ts` (200 lines). The only difference is that `worker.ts` doesn't have the `/assets/:filename` route (Workers serve static files via the `[assets]` config in `wrangler.toml`). This means every route change, bug fix, or new page must be applied in two places. The `sanitizeHtml()` function is also duplicated.

**Requirements**:
1. Refactor `server/routes.ts` so that route registration logic is independent of the Node.js `fs` module (the only Node-specific code is the `/assets/:filename` handler)
2. Extract the `/assets/:filename` handler as a separate, conditionally-registered route
3. Modify `worker.ts` to import and call `registerRoutes(app)` from `server/routes.ts`
4. Remove all duplicated route definitions from `worker.ts`
5. Ensure the worker still works (no Node.js-only imports at the top level of shared code)

**Acceptance Criteria**:
- [ ] `worker.ts` is reduced to ~10 lines: import Hono, import registerRoutes, create app, register routes, export default app
- [ ] All route logic exists in exactly one place (`server/routes.ts`)
- [ ] `npm run dev` still works (Node.js dev server)
- [ ] `npx wrangler dev` still works (Workers local dev)
- [ ] No `fs` or `path` imports at the top level of `routes.ts` (conditionally imported or behind a platform check)

**Implementation Notes**: The `/assets/:filename` route uses `fs.readFileSync` and `path.join` which don't exist in Workers. Two approaches: (a) Dynamically import `fs`/`path` only inside the route handler and only register the route when not in Workers, or (b) Move the static asset route to a separate file and only import it in `server/index.ts`. Option (b) is cleaner.

---

### Task 1-1: Add Persistent Storage
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core
**Priority**: High
**Complexity**: L (4hr+)
**Depends On**: Task 0-5
**Files**: `server/storage.ts`, `shared/schema.ts`, `wrangler.toml`

**Context**: All data is stored in in-memory JavaScript Maps. Blog posts are seeded on startup but any user-created posts, edits, or contact submissions are lost when the server restarts or the Worker cold-starts. The `shared/schema.ts` file already defines PostgreSQL table schemas via Drizzle ORM but no database connection exists.

**Requirements**:
1. For Cloudflare Workers: Add Cloudflare D1 (SQLite) binding in `wrangler.toml`
2. Create a `D1Storage` class implementing the existing `IStorage` interface
3. Create migration scripts to set up the `blog_posts` and `contact_leads` tables in D1
4. For Node.js dev: Use `better-sqlite3` as a local SQLite database to mirror D1's behavior
5. Keep `MemStorage` as a fallback (useful for testing) but make persistent storage the default
6. Seed blog posts only if the database is empty (first run)
7. Update the storage export to use environment detection: D1 in Workers, SQLite in Node.js dev

**Acceptance Criteria**:
- [ ] Blog posts persist across server restarts in both dev and production
- [ ] Contact leads persist across server restarts
- [ ] Seed data is only inserted on first run (empty database)
- [ ] `IStorage` interface is unchanged (existing code works without modification)
- [ ] `npx wrangler dev` works with D1 local mode
- [ ] `npm run dev` works with local SQLite

**Implementation Notes**: Cloudflare D1 uses SQLite syntax. The Drizzle ORM schemas in `shared/schema.ts` define PostgreSQL-specific types (`pgTable`). For D1, you'd either switch to Drizzle's SQLite adapter or write raw SQL migrations. Since the schema is simple (2 tables, no joins, no complex queries), raw SQL migrations are simpler and avoid the Drizzle dependency entirely. Consider removing Drizzle and using D1's native API directly.

---

### Task 1-2: Create Branded 404 Error Page
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/template.ts`, `server/routes.ts`, `worker.ts`

**Context**: Requesting any undefined route returns Hono's default "404 Not Found" plain text response. This is a poor user experience on a polished marketing site.

**Requirements**:
1. Add a `renderNotFoundPage()` function to `template.ts` that uses `renderLayout()` with a branded 404 page
2. Include the standard nav/footer, a large "404" heading, a "Page not found" message, and a "Go Home" button linking to `/`
3. Register a catch-all route `app.notFound()` in `routes.ts` that returns `c.html(renderNotFoundPage(), 404)`

**Acceptance Criteria**:
- [ ] Visiting `/nonexistent-page` shows a branded 404 page with nav and footer
- [ ] HTTP status code is 404 (not 200)
- [ ] "Go Home" button links to `/`
- [ ] Page matches the site's glassmorphism design

**Implementation Notes**: Hono's `app.notFound((c) => ...)` handler catches all unmatched routes. Place it after all other route registrations.

---

### Task 1-3: Fix Footer Links
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/template.ts`

**Context**: In `renderFooter()` (template.ts lines 567-643), several link groups point to `"#"`: social media icons (LinkedIn, Twitter/X, email), Resources column (Case Studies, Documentation, Support, FAQ), and Legal column (Privacy Policy, Terms of Service, Cookie Policy, GDPR). These are dead links that look unprofessional.

**Requirements**:
1. Remove the Resources column links that have no corresponding pages (Case Studies, Documentation, Support, FAQ) or replace them with `/blog` and `/contact` where appropriate
2. Remove the Legal column links that have no corresponding pages, or create stub pages for them (Privacy Policy, Terms, Cookie Policy, GDPR)
3. For social media links: either set them to real HBDR social media URLs (if they exist) or remove the social icons entirely
4. Keep the email social icon and link it to `mailto:contact@hbdr.com`

**Acceptance Criteria**:
- [ ] No links in the footer point to `"#"`
- [ ] Every footer link either navigates to a real page or has been removed
- [ ] Email icon links to `mailto:contact@hbdr.com`

**Implementation Notes**: This is a template-only change. If real social URLs aren't available, removing the icons is better than leaving broken `#` links.

---

### Task 1-4: Fix OG Image URLs
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/template.ts`

**Context**: In `renderHead()` (template.ts line 21), `<meta property="og:image">` uses a relative URL: `/assets/HBDR_Logo_Pack_all_sizes_-_2_1770577514801.jpeg`. Social media crawlers (Facebook, Twitter, LinkedIn) require absolute URLs to fetch OG images. The current relative URL means social previews show no image.

**Requirements**:
1. Add a `siteUrl` configuration (e.g., `https://hbdr.com` or read from environment variable `SITE_URL`)
2. Prepend `siteUrl` to the `og:image` meta content to make it absolute
3. Also fix `og:url` to be a full absolute URL (currently `${options.canonicalPath || '/'}` which is relative)
4. Add a `<link rel="canonical">` tag using the absolute URL

**Acceptance Criteria**:
- [ ] `og:image` contains a full URL starting with `https://`
- [ ] `og:url` contains a full URL starting with `https://`
- [ ] A `<link rel="canonical">` tag is present on every page
- [ ] The site URL is configurable via environment variable, not hardcoded

**Implementation Notes**: For Cloudflare Workers, the site URL can be set as a `[vars]` in `wrangler.toml`. For dev, it can default to `http://localhost:5000`.

---

### Task 1-5: Add sitemap.xml and robots.txt
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: Task 1-4
**Files**: `server/routes.ts`

**Context**: The site has no `sitemap.xml` or `robots.txt`, which are basic SEO requirements. Search engines rely on these to discover and index pages.

**Requirements**:
1. Add a `GET /sitemap.xml` route that generates an XML sitemap containing all page URLs (homepage, about, how-it-works, careers, press, contact, all 9 solution pages, blog listing)
2. Include dynamic blog post URLs by querying `storage.getBlogPosts(true)` for published posts
3. Add a `GET /robots.txt` route that allows all crawlers and references the sitemap URL
4. Block `/admin/*` paths in robots.txt
5. Use the `SITE_URL` from Task 1-4 for absolute URLs

**Acceptance Criteria**:
- [ ] `GET /sitemap.xml` returns valid XML with all page URLs
- [ ] Blog post URLs are dynamically included in the sitemap
- [ ] `GET /robots.txt` returns valid robots.txt content
- [ ] `/admin/*` is disallowed in robots.txt
- [ ] Both endpoints return correct Content-Type headers

**Implementation Notes**: The sitemap should be generated dynamically (not a static file) so blog posts are always up to date. Set `Content-Type: application/xml` for the sitemap and `Content-Type: text/plain` for robots.txt.

---

### Task 1-6: Add Blog Pagination
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core
**Priority**: Low
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `server/template.ts`, `server/routes.ts`, `server/storage.ts`

**Context**: The blog listing page renders all posts at once. As the number of posts grows, this page will become very long and slow.

**Requirements**:
1. Add `page` and `limit` query parameters to `GET /blog` (default: page=1, limit=12)
2. Update `storage.getBlogPosts()` to accept `offset` and `limit` parameters
3. Add pagination UI to `renderBlogPage()`: Previous/Next buttons, current page indicator
4. Generate pagination links as standard `<a>` tags (not Alpine.js) for SEO crawlability

**Acceptance Criteria**:
- [ ] `/blog` shows first 12 posts
- [ ] `/blog?page=2` shows posts 13-24
- [ ] Previous/Next buttons navigate between pages
- [ ] Page 1 has no Previous button; last page has no Next button
- [ ] URL updates when navigating pages (standard link navigation, not JS)

**Implementation Notes**: Keep it simple -- server-rendered pagination with full page reloads. No infinite scroll or client-side pagination needed.

---

### Task 1-7: Remove Unused Dependencies
**Status**: 🔲 Not Started
**Phase**: Phase 1 - Complete Core (also Phase 3 - Optimize)
**Priority**: Medium
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `package.json`

**Context**: `package.json` lists ~70 dependencies, of which ~10 are actually used. The rest are remnants of a prior React/Express/PostgreSQL architecture that was abandoned in favor of the current Hono/Alpine.js stack. This wastes disk space, increases install time, and creates confusion about the actual tech stack.

**Requirements**:
1. Remove all React packages: `react`, `react-dom`, `@tanstack/react-query`, `react-hook-form`, `@hookform/resolvers`, `react-day-picker`, `react-icons`, `react-resizable-panels`, `recharts`, `framer-motion`, `next-themes`, `lucide-react`, `cmdk`, `embla-carousel-react`, `input-otp`, `vaul`, `wouter`
2. Remove all Radix UI packages (20+ `@radix-ui/react-*` packages)
3. Remove unused styling packages: `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `tw-animate-css`
4. Remove unused backend packages: `express`, `express-session`, `passport`, `passport-local`, `connect-pg-simple`, `memorystore`, `pg`, `ws`, `@octokit/rest`, `date-fns`, `@jridgewell/trace-mapping`
5. Remove unused devDependencies: `@vitejs/plugin-react`, `vite`, `@replit/vite-plugin-*`, `@tailwindcss/vite`, `@tailwindcss/typography`, `autoprefixer`, `postcss`, `@types/express`, `@types/express-session`, `@types/passport`, `@types/passport-local`, `@types/react`, `@types/react-dom`, `@types/ws`, `@types/connect-pg-simple`
6. If Drizzle is not used for persistent storage (see Task 1-1), also remove `drizzle-orm`, `drizzle-zod`, `drizzle-kit`
7. Remove `components.json` (shadcn/ui config with no corresponding components)
8. Remove `client/` directory (contains only an orphaned `favicon.png`)
9. Update package name from `rest-express` to `hbdr-website`
10. Remove the `db:push` script from package.json
11. Run `npm install` to regenerate a clean `package-lock.json`

**Acceptance Criteria**:
- [ ] `package.json` contains only packages that are actually imported in the codebase
- [ ] `npm install` completes successfully
- [ ] `npm run dev` starts the server without errors
- [ ] `npm run check` (TypeScript) passes without errors
- [ ] Package name is `hbdr-website`
- [ ] `components.json` is deleted
- [ ] `client/` directory is deleted

**Implementation Notes**: Run `npx depcheck` before and after to verify. Be careful not to remove packages that are indirect dependencies of used packages. The Drizzle decision depends on Task 1-1's approach.

---

### Task 2-1: Add CSRF Protection
**Status**: 🔲 Not Started
**Phase**: Phase 2 - Harden
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: Task 0-1
**Files**: `server/routes.ts`, `server/template.ts`

**Context**: All mutation endpoints (`POST /api/contact`, `POST /api/blog`, `PUT /api/blog/:id`, `DELETE /api/blog/:id`) accept requests from any origin with no CSRF token. An attacker could craft a malicious page that submits forms to these endpoints using a logged-in admin's session.

**Requirements**:
1. Implement CSRF token generation and validation using Hono middleware
2. Generate a CSRF token per session and include it as a hidden field in the contact form and blog editor form
3. Validate the CSRF token on all POST/PUT/DELETE requests
4. Return 403 with `{ message: "Invalid CSRF token" }` on validation failure
5. For API-only consumers (if any), support `X-CSRF-Token` header as alternative

**Acceptance Criteria**:
- [ ] Contact form includes a hidden CSRF token field
- [ ] Blog editor form includes a hidden CSRF token field
- [ ] POST/PUT/DELETE requests without a valid CSRF token return 403
- [ ] Forms with valid CSRF tokens submit successfully
- [ ] Token is rotated per session

**Implementation Notes**: For Cloudflare Workers (stateless), consider the double-submit cookie pattern or a signed token approach since there's no server-side session store. Alternatively, use `hono/csrf` middleware which implements the Origin/Referer header check pattern.

---

### Task 2-2: Add Rate Limiting
**Status**: 🔲 Not Started
**Phase**: Phase 2 - Harden
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `server/routes.ts`, `worker.ts`

**Context**: The contact form and blog API have no rate limiting. A bot could submit thousands of contact form entries or create/delete blog posts at high volume.

**Requirements**:
1. Add rate limiting middleware to `POST /api/contact`: max 5 requests per IP per 15 minutes
2. Add rate limiting middleware to blog mutation endpoints: max 30 requests per IP per 15 minutes
3. For Node.js dev: use an in-memory rate limiter (Map-based with TTL)
4. For Cloudflare Workers: use Workers KV or the Rate Limiting API
5. Return 429 with `{ message: "Too many requests. Please try again later." }` and `Retry-After` header

**Acceptance Criteria**:
- [ ] 6th contact form submission within 15 minutes returns 429
- [ ] Rate limit resets after the window expires
- [ ] Rate limit is per-IP, not global
- [ ] `Retry-After` header is included in 429 responses
- [ ] Rate limiting works in both Node.js and Workers environments

**Implementation Notes**: Hono has a rate-limiting middleware in `hono/rate-limit` for simple cases. For Workers, Cloudflare's built-in Rate Limiting (in the dashboard) is more robust than in-Worker implementations.

---

### Task 2-3: Add Structured Error Logging
**Status**: 🔲 Not Started
**Phase**: Phase 2 - Harden
**Priority**: Medium
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `server/routes.ts`, `server/index.ts`, `worker.ts`

**Context**: Current error handling uses `console.error("Error creating blog post:", error)` which outputs unstructured text. There are no request IDs, no log levels, and no correlation between request and error.

**Requirements**:
1. Add a request ID middleware that generates a UUID for each request and attaches it to the Hono context
2. Create a `logger` utility that outputs structured JSON logs: `{ timestamp, requestId, level, message, error?, path?, method? }`
3. Replace all `console.error` calls with the structured logger
4. Include the request ID in all error responses: `{ message: "Internal server error", requestId: "abc-123" }`
5. Add the request ID as an `X-Request-Id` response header

**Acceptance Criteria**:
- [ ] Every request gets a unique ID visible in `X-Request-Id` header
- [ ] Error responses include `requestId` in the JSON body
- [ ] Server logs are structured JSON with timestamp, level, requestId
- [ ] All existing `console.error` calls are replaced with structured logging

**Implementation Notes**: Hono's context (`c`) can carry request-scoped data via `c.set('requestId', uuid)`. The structured logger should be a simple function, not a heavyweight library.

---

### Task 2-4: Add Content Security Policy Headers
**Status**: 🔲 Not Started
**Phase**: Phase 2 - Harden
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/routes.ts` or `server/index.ts`

**Context**: No CSP headers are sent with responses. The site loads scripts from CDNs (tailwindcss.com, unpkg.com, cdn.jsdelivr.net, fonts.googleapis.com) and uses inline `<style>` blocks. Without CSP, injected scripts can execute freely.

**Requirements**:
1. Add a Hono middleware that sets the `Content-Security-Policy` header on all HTML responses
2. Allow scripts from: `cdn.tailwindcss.com`, `unpkg.com`, `cdn.jsdelivr.net` and `'unsafe-eval'` (required by Tailwind CDN's JIT compiler)
3. Allow styles from: `cdn.jsdelivr.net`, `fonts.googleapis.com`, and `'unsafe-inline'` (required for inline styles)
4. Allow fonts from: `fonts.gstatic.com`
5. Allow images from: `'self'` and `data:` (for inline SVG data URIs)
6. Set `frame-ancestors 'none'` to prevent clickjacking
7. Also add `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`

**Acceptance Criteria**:
- [ ] `Content-Security-Policy` header is present on all HTML responses
- [ ] The site renders correctly with CSP enabled (no console errors)
- [ ] `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` headers are present
- [ ] Injecting a `<script>` via blog content is blocked by CSP

**Implementation Notes**: Use Hono's `secureHeaders` middleware as a starting point. The Tailwind CDN JIT compiler requires `'unsafe-eval'` which weakens CSP -- this is a known trade-off of using Tailwind via CDN. Moving to a build-time Tailwind setup would eliminate this need but is a larger change.

---

### Task 2-5: Add Input Length Limits
**Status**: 🔲 Not Started
**Phase**: Phase 2 - Harden
**Priority**: Low
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `shared/schema.ts`

**Context**: Blog post content, titles, and contact form messages have no maximum length constraints. A malicious user could submit megabytes of content in a single field.

**Requirements**:
1. Add `.max()` constraints to all Zod schema string fields:
   - `name`: max 200 characters
   - `email`: max 254 characters (RFC 5321 limit)
   - `company`: max 200 characters
   - `impressions`: max 50 characters
   - `message`: max 5000 characters
   - Blog `title`: max 500 characters
   - Blog `slug`: max 200 characters
   - Blog `excerpt`: max 1000 characters
   - Blog `content`: max 100000 characters (~100KB)
   - Blog `author`: max 200 characters
   - Blog `category`: max 100 characters
   - Blog `tags`: max 500 characters
2. Add `maxlength` attributes to corresponding HTML input elements in `template.ts`

**Acceptance Criteria**:
- [ ] Submitting a blog post with content > 100KB returns a 400 validation error
- [ ] Submitting a contact form with message > 5000 chars returns a 400 validation error
- [ ] HTML inputs have `maxlength` attributes matching the schema limits
- [ ] Error messages clearly indicate the maximum length

**Implementation Notes**: Zod's `.max()` method: `z.string().max(200, "Name must be 200 characters or less")`.

---

### Task 3-1: Split Template Monolith
**Status**: 🔲 Not Started
**Phase**: Phase 3 - Optimize
**Priority**: Medium
**Complexity**: L (4hr+)
**Depends On**: None
**Files**: `server/template.ts` (source), new files in `server/templates/`

**Context**: `server/template.ts` is 3363 lines containing every page template, shared layout components, and utility functions. This makes the file extremely difficult to navigate, maintain, or modify. Adding a new page means scrolling through thousands of lines of unrelated HTML.

**Requirements**:
1. Create a `server/templates/` directory
2. Extract shared components: `server/templates/layout.ts` (renderHead, renderNav, renderFooter, renderScripts, renderLayout), `server/templates/components.ts` (renderContactFormSection, renderStatsSection, renderPageHero, renderCTASection)
3. Extract each page into its own file: `server/templates/home.ts`, `server/templates/about.ts`, `server/templates/how-it-works.ts`, `server/templates/careers.ts`, `server/templates/press.ts`, `server/templates/contact.ts`, `server/templates/blog.ts`, `server/templates/solutions/header-bidding.ts`, etc.
4. Create `server/templates/index.ts` that re-exports all page render functions (preserving the existing import interface)
5. Update `server/routes.ts` imports to use the new barrel export
6. Delete the original `server/template.ts`

**Acceptance Criteria**:
- [ ] No single template file exceeds 400 lines
- [ ] All existing page render functions are exported with the same names
- [ ] `server/routes.ts` and `worker.ts` import paths are updated
- [ ] All pages render identically to before the refactor
- [ ] Shared components (nav, footer, layout) are reused from a single source

**Implementation Notes**: Use a barrel export (`server/templates/index.ts`) so that import statements in routes.ts need minimal changes. The shared `LayoutOptions` interface and helper functions should be in `layout.ts` and imported by individual page templates.

---

### Task 4-1: Add Health Check Endpoint
**Status**: 🔲 Not Started
**Phase**: Phase 4 - Production Infrastructure
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/routes.ts`

**Context**: There is no health check endpoint for monitoring. Uptime monitoring services need a simple endpoint to ping.

**Requirements**:
1. Add `GET /health` route that returns `200 { status: "ok", timestamp: "...", uptime: process.uptime() }`
2. Optionally check storage connectivity (if persistent storage is implemented)
3. Return `503 { status: "unhealthy", error: "..." }` if storage is unreachable

**Acceptance Criteria**:
- [ ] `GET /health` returns 200 with JSON body when healthy
- [ ] Response includes `status`, `timestamp` fields
- [ ] Endpoint responds in < 50ms

**Implementation Notes**: Keep it minimal. No authentication required on health checks.

---

### Task 4-2: Add GitHub Actions CI Pipeline
**Status**: 🔲 Not Started
**Phase**: Phase 4 - Production Infrastructure
**Priority**: Medium
**Complexity**: M (1-4hr)
**Depends On**: Task 5-1 (tests exist to run)
**Files**: `.github/workflows/ci.yml` (new)

**Context**: There is no CI/CD pipeline. Code changes are not automatically validated.

**Requirements**:
1. Create `.github/workflows/ci.yml` with jobs for:
   - `npm install`
   - `npm run check` (TypeScript type checking)
   - `npm test` (when tests exist)
2. Trigger on push to `main` and on pull requests
3. Use Node.js 20.x
4. Cache `node_modules` for faster runs

**Acceptance Criteria**:
- [ ] CI runs on every push to main and every PR
- [ ] TypeScript errors fail the build
- [ ] Test failures fail the build
- [ ] Pipeline completes in < 5 minutes

**Implementation Notes**: Start with type checking only. Add test execution once Task 5-1 is complete.

---

### Task 5-1: Add Core Test Suite
**Status**: 🔲 Not Started
**Phase**: Phase 5 - Enterprise Grade
**Priority**: Medium
**Complexity**: L (4hr+)
**Depends On**: Task 0-2, Task 1-1
**Files**: New files in `tests/` directory

**Context**: There are zero tests in the project. No unit tests, integration tests, or E2E tests.

**Requirements**:
1. Set up Vitest as the test runner (compatible with TypeScript, fast, minimal config)
2. Write unit tests for:
   - `sanitizeHtml()`: verify it strips scripts, event handlers, and dangerous attributes
   - `MemStorage`: verify CRUD operations for blog posts and contact leads
   - Zod schemas: verify validation accepts valid data and rejects invalid data
3. Write integration tests for:
   - `GET /` returns 200 and contains expected HTML
   - `POST /api/contact` with valid data returns success
   - `POST /api/contact` with invalid data returns 400
   - `POST /api/blog` with valid data returns 201
   - `GET /blog/:slug` returns the correct blog post
   - `GET /nonexistent` returns 404
4. Add a `test` script to `package.json`: `"test": "vitest run"`

**Acceptance Criteria**:
- [ ] `npm test` runs and passes all tests
- [ ] Sanitization edge cases are covered (mixed case, encoded entities, nested tags)
- [ ] All API endpoints have at least one happy-path and one error-path test
- [ ] Tests run in < 10 seconds

**Implementation Notes**: Hono has built-in test utilities (`app.request()`) that make integration testing straightforward without starting a server. Use `describe`/`it` blocks organized by module.
