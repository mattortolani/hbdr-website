# IMPLEMENTATION_SPEC.md

## Section 1: End-State Product Definition

The finished HBDR website is a production-grade marketing site with the following characteristics:

- **26 server-rendered pages** with consistent glassmorphism design, SEO metadata, and responsive layouts
- **Blog CMS** with authentication, persistent storage, category filtering, rich text editor, and content moderation
- **Contact form** with validation, spam protection, email notifications to sales team, and persistent lead storage
- **Cloudflare Workers deployment** with a single shared route file (no duplication), proper security headers, and a staging environment
- **Comprehensive error handling** with branded 404/500 pages, structured logging, and graceful degradation
- **Security hardened**: input validation on every endpoint, proper HTML sanitization, authentication on admin routes, rate limiting, CSRF protection, CSP headers
- **SEO optimized**: absolute OG image URLs, sitemap.xml, robots.txt, canonical URLs, JSON-LD structured data
- **Tested**: E2E tests using the existing data-testid attributes, API endpoint tests, HTML validation
- **CI/CD**: GitHub Actions running type-check + tests on PR, automated Workers deployment on merge to main

---

## Section 2: Current State Audit

| Module/Feature | Status | What Exists | What's Missing |
|----------------|--------|-------------|----------------|
| **Homepage** | 🔧 PARTIAL | Full hero, solutions grid, comparison table, testimonials, stats, logo carousel | Stats hardcoded, no analytics, Tailwind CDN play mode (not production-ready) |
| **About Page** | ✅ DONE | Mission, timeline (2000-2025), team values, CTA | - |
| **How It Works Page** | ✅ DONE | 3-step process, 6 FAQs with accordion, CTA | - |
| **Careers Page** | ✅ DONE | Benefits (7), open positions (6), CTA | Positions likely placeholder data |
| **Press Page** | ✅ DONE | Press releases (6), media contact info | - |
| **Contact Page** | 🔧 PARTIAL | Contact form with Alpine.js validation and submission | Leads stored in-memory only, never forwarded (email/webhook), no spam protection, no rate limiting |
| **9 Solution Pages** | ✅ DONE | Header Bidding, Display Ads, CTV/OTT, In-App, MCM, Manage Account, Manage Inventory, Open Bidding, Ad Exchange AdX | - |
| **Video Player Page** | ✅ DONE | Instream, outstream, floating/sticky, mobile formats, revenue engine, specs | - |
| **Privacy Policy** | ✅ DONE | Full privacy policy with GDPR/CCPA rights, data practices, DPO contact | - |
| **Terms & Conditions** | ✅ DONE | Full T&C with Florida governing law | - |
| **GDPR & Cookie Policy** | ✅ DONE | GDPR rights, cookie table (10 cookies), consent management | - |
| **FAQ & Support Page** | 🔧 PARTIAL | 15 FAQs in 4 categories, support channels, support form | **Support form sends wrong fields** -- schema mismatch with /api/contact |
| **Dashboard Page** | ✅ DONE | Marketing page with features, data dimensions, links to dashboard.hbdr.com | External link unverified |
| **Partners Page** | ✅ DONE | 45 named partners across SSP, DSP, identity, compliance, tech categories | - |
| **Publishers Page** | ✅ DONE | Value props, 5-step onboarding, requirements, 8 FAQs | - |
| **Advertisers Page** | ✅ DONE | 3 deal types, inventory stats, brand safety, getting-started steps | - |
| **Trust & Compliance Page** | ✅ DONE | Supply chain, anti-fraud, privacy, certifications, capabilities | - |
| **Navigation** | ✅ DONE | Solutions dropdown (10), Company dropdown (9), Publisher/Advertiser/Partners standalone, mobile hamburger | - |
| **Footer** | 🔧 PARTIAL | Resources (7 real links), Legal (3 real links), Solutions, Company columns, scroll-to-top | LinkedIn and Twitter/X social icons still `href="#"` |
| **SEO Meta Tags** | 🔧 PARTIAL | title, description, og:title, og:description, og:type, og:image, twitter:card on every page | og:image uses relative URL, no canonical link, no JSON-LD, no sitemap.xml, no robots.txt |
| **Blog Listing** | 🔧 PARTIAL | Blog page with post cards, category filter buttons, active styling | **Category filters broken**: buttons update Alpine state but posts aren't filtered |
| **Blog Post View** | ✅ DONE | Individual post with prose styling, author, date, category, related CTA | - |
| **Blog Admin** | ⚠️ BROKEN | Full CRUD admin panel (list, create, edit, delete) | **No authentication** -- publicly accessible. Anyone can modify all blog content |
| **Blog Editor** | 🔧 PARTIAL | Form with title, slug, excerpt, content (textarea), author, category, tags, publish toggle | No rich text editor, no preview, no image upload |
| **Blog API** | 🔧 PARTIAL | POST/PUT/DELETE /api/blog with Zod validation, slug uniqueness | No auth, regex sanitization bypassable, published is string not boolean |
| **Contact API** | 🔧 PARTIAL | POST /api/contact with Zod validation, HTML success/error response | No auth on GET /api/contact (PII exposure), leads lost on restart, no email forwarding |
| **Cloudflare Worker** | ⚠️ BROKEN | worker.ts with 16 of 26 page routes + all API routes | **Missing 10 page routes**. sanitizeHtml duplicated. Cannot import from routes.ts. |
| **Authentication** | 📋 REQUIRED | Schema defines users table, IStorage has user methods, MemStorage has users Map | No login page, no session handling, no middleware, no password hashing. Users Map never populated |
| **Data Persistence** | 📋 REQUIRED | IStorage interface designed for swappable backends. Drizzle pgTable definitions exist in schema.ts | Only MemStorage (in-memory Maps) implemented. No database connection, no migration scripts |
| **Error Pages** | 📋 REQUIRED | Not mentioned anywhere | No 404 page, no 500 page. Hono returns plain text |
| **Testing** | 📋 REQUIRED | data-testid attributes on key elements | No test framework, no test files, no CI |
| **CI/CD** | 📋 REQUIRED | wrangler.toml configured | No GitHub Actions, no automated deploy, no staging |
| **Rate Limiting** | 📋 REQUIRED | Not mentioned anywhere | No rate limiting on any endpoint |
| **CSRF Protection** | 📋 REQUIRED | Not mentioned anywhere | No CSRF tokens, no same-origin checks |
| **Security Headers** | 📋 REQUIRED | Not mentioned anywhere | No CSP, no HSTS, no X-Frame-Options |
| **HTML Sanitization** | ⚠️ BROKEN | Regex-based sanitizeHtml() in routes.ts and worker.ts | Regex HTML sanitization is fundamentally bypassable |

---

## Section 3: Dependency & Security Audit

### Runtime Dependencies

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| hono | ^4.11.9 | OK | Active, well-maintained |
| zod | ^3.24.2 | OK | Active, well-maintained |
| zod-validation-error | ^3.4.0 | OK | Active |
| drizzle-orm | ^0.39.3 | OK | Active. Only pgTable/type exports used -- no DB connection |
| drizzle-zod | ^0.7.0 | OK | Active. createInsertSchema used |

### Missing Dependencies

| Package | Required By | Impact |
|---------|------------|--------|
| @hono/node-server | server/index.ts | **Dev server will crash** after npm install |
| tsx | npm run dev (removed) | No way to run dev server without reinstating script |

### Dev Dependencies

| Package | Version | Status | Notes |
|---------|---------|--------|-------|
| @cloudflare/workers-types | ^4.20260207.0 | OK | Current |
| wrangler | ^4.63.0 | OK | Current |
| typescript | 5.6.3 | OK | Stable release |

### CDN Dependencies (no version pinning)

| Library | Loaded Version | Risk |
|---------|---------------|------|
| Tailwind CSS | Latest via cdn.tailwindcss.com | **HIGH**: Play CDN is explicitly not for production. Loads full Tailwind JIT at runtime. Performance and reliability risk |
| DaisyUI | 4.12.14 | LOW: Version pinned |
| HTMX | 2.0.4 | LOW: Version pinned, but **never used** |
| Alpine.js | 3.14.8 | LOW: Version pinned |
| Alpine.js Intersect | 3.14.8 | LOW: Version pinned |
| Figtree font | Latest | LOW: Google Fonts are stable |
| Instrument Serif font | Latest | LOW: Google Fonts are stable |

### Security Issues

| Issue | Severity | Details |
|-------|----------|---------|
| No authentication | CRITICAL | Admin panel and contact lead API publicly accessible |
| PII exposure via GET /api/contact | CRITICAL | All submitted contact leads (names, emails, companies) readable by anyone |
| Regex HTML sanitization | HIGH | sanitizeHtml() uses regex to strip dangerous HTML. Regex parsing of HTML is inherently unreliable. Bypassable via encoding, case tricks, mutation XSS |
| No CSRF protection | HIGH | POST endpoints accept any origin. No token validation |
| No rate limiting | HIGH | APIs can be spammed without limit |
| No CSP header | MEDIUM | No Content-Security-Policy. XSS has no browser-side mitigation |
| No SRI on CDN scripts | MEDIUM | CDN compromise could inject arbitrary code into every page |
| Tailwind Play CDN | MEDIUM | Not intended for production use per Tailwind docs |
| No HTTPS enforcement | LOW | No HSTS header. Cloudflare handles HTTPS but browser-side enforcement missing |

---

## Section 4: Implementation Phases

### Phase 0: Critical Fixes (unblock development and deployment)

**Goal**: Make the project installable, runnable, and deployable without data loss on critical pages.

1. Add `@hono/node-server` to package.json dependencies
2. Generate package-lock.json via `npm install`
3. Add `"dev": "npx tsx server/index.ts"` script back to package.json
4. Sync worker.ts with routes.ts (add 10 missing page route imports and registrations)
5. Fix support form schema mismatch in renderFaqSupportPage()

### Phase 1: Complete Core (all PARTIAL → DONE, all BROKEN → DONE)

**Goal**: Every feature works correctly for primary use cases.

1. Fix blog category filters (add x-show to post cards)
2. Add basic auth middleware to admin routes and contact lead GET
3. Deduplicate routes: refactor routes.ts into importable function, have worker.ts import it
4. Replace regex sanitizeHtml with a real HTML sanitizer library (e.g., sanitize-html or DOMPurify)
5. Add branded 404 and 500 error pages
6. Fix OG image URLs to be absolute
7. Add sitemap.xml and robots.txt routes
8. Remove HTMX CDN script (loaded but never used)
9. Clean up orphaned files (components.json, client/, script/build.ts)
10. Update README.md to reflect current state

### Phase 2: Harden (error handling, validation, edge cases)

**Goal**: Robust error handling, proper validation, and graceful degradation.

1. Add try/catch with structured error responses to all async route handlers
2. Add Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, HSTS headers via Hono middleware
3. Add rate limiting middleware (per-IP) on contact and blog API endpoints
4. Add CSRF protection (origin checking or token-based)
5. Add SRI hashes to CDN script/link tags
6. Add input length limits to prevent oversized payloads
7. Add request logging with correlation IDs
8. Handle malformed JSON gracefully (currently throws unhandled)

### Phase 3: Optimize (performance, caching, bundle)

**Goal**: Production-grade performance.

1. Replace Tailwind Play CDN with built CSS file (proper Tailwind build step)
2. Add Cache-Control headers for static pages (or use Cloudflare cache rules)
3. Lazy-load below-fold images
4. Add image optimization (convert JPEGs to WebP, add srcset)
5. Minify inline CSS in renderHead()
6. Consider splitting template.ts into per-page modules for maintainability

### Phase 4: Production Infrastructure

**Goal**: Reliable deployment pipeline with monitoring.

1. Add GitHub Actions CI: TypeScript type-check on every PR
2. Add GitHub Actions CD: Deploy to Cloudflare Workers on merge to main
3. Set up staging environment (separate Workers project)
4. Add persistent storage (Cloudflare D1 or KV, implementing IStorage)
5. Add health check endpoint (GET /api/health)
6. Set up email forwarding for contact leads (Cloudflare Email Workers or webhook)

### Phase 5: Enterprise Grade

**Goal**: Production-ready for real business traffic.

1. Add full authentication system (login, sessions, password hashing)
2. Add rate limiting per API key for future API consumers
3. Add audit logging for admin actions
4. Add comprehensive E2E test suite using data-testid attributes
5. Add admin dashboard with contact lead management
6. Add blog image upload and management
7. Add rich text editor for blog content
8. Add analytics integration

---

## Section 5: Task Breakdown

### Task 0-1: Add Missing Dependencies and Restore Dev Workflow
**Status**: 🔲 Not Started
**Phase**: Phase 0 -- Critical Fixes
**Priority**: High
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `package.json`

**Context**: `@hono/node-server` is imported in `server/index.ts:1` but was accidentally removed from package.json during the dependency cleanup. There is no lockfile and no node_modules. The `dev` script was also removed, so there's no way to run the dev server.

**Requirements**:
1. Add `"@hono/node-server": "^1.13.0"` to dependencies in package.json
2. Add `"tsx": "^4.0.0"` to devDependencies in package.json
3. Add scripts: `"dev": "npx tsx server/index.ts"`, `"check": "npx tsc --noEmit"`
4. Run `npm install` to generate node_modules and package-lock.json
5. Commit the generated package-lock.json

**Acceptance Criteria**:
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts the server on port 5000
- [ ] `npm run check` runs TypeScript type checking
- [ ] package-lock.json exists and is committed

**Implementation Notes**: The dev script previously used `tsx server/index.ts` which is a TypeScript execution tool. tsx must be a devDependency. Do NOT add back any of the 60+ previously-removed unused dependencies.

---

### Task 0-2: Sync Worker.ts with Routes.ts
**Status**: 🔲 Not Started
**Phase**: Phase 0 -- Critical Fixes
**Priority**: High
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `worker.ts`

**Context**: worker.ts is the Cloudflare Workers production entry point but is missing 10 page routes that exist in routes.ts. Deploying to Workers will 404 on Privacy Policy, Terms, GDPR/Cookie Policy, FAQ/Support, Dashboard, Video Player, Partners, Publishers, Advertisers, and Trust & Compliance. The legal pages are linked from every page's footer -- all visitors can encounter these broken links.

**Requirements**:
1. Add these imports to worker.ts from `./server/template`: `renderPrivacyPolicyPage`, `renderTermsPage`, `renderGdprCookiePolicyPage`, `renderFaqSupportPage`, `renderDashboardPage`, `renderVideoPlayerPage`, `renderPartnersPage`, `renderPublishersPage`, `renderAdvertisersPage`, `renderTrustCompliancePage`
2. Add these route registrations after the existing solution routes:
   - `app.get("/dashboard", (c) => c.html(renderDashboardPage()));`
   - `app.get("/solutions/video-player", (c) => c.html(renderVideoPlayerPage()));`
   - `app.get("/partners", (c) => c.html(renderPartnersPage()));`
   - `app.get("/publishers", (c) => c.html(renderPublishersPage()));`
   - `app.get("/advertisers", (c) => c.html(renderAdvertisersPage()));`
   - `app.get("/trust", (c) => c.html(renderTrustCompliancePage()));`
   - `app.get("/privacy-policy", (c) => c.html(renderPrivacyPolicyPage()));`
   - `app.get("/terms", (c) => c.html(renderTermsPage()));`
   - `app.get("/gdpr-cookie-policy", (c) => c.html(renderGdprCookiePolicyPage()));`
   - `app.get("/support", (c) => c.html(renderFaqSupportPage()));`

**Acceptance Criteria**:
- [ ] worker.ts imports all 29 render functions from template.ts
- [ ] worker.ts has all 26 page GET routes matching routes.ts
- [ ] `npx tsc --noEmit -p tsconfig.worker.json` passes

**Implementation Notes**: Match the exact route patterns and handler signatures from routes.ts lines 44-54.

---

### Task 0-3: Fix Support Form Schema Mismatch
**Status**: 🔲 Not Started
**Phase**: Phase 0 -- Critical Fixes
**Priority**: High
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/template.ts`

**Context**: The FAQ/Support page (`renderFaqSupportPage()`) has a support request form that submits to `/api/contact`. The form maps fields incorrectly: it sends `website: ''` and `monthlyPageviews: ''`, but the Zod schema expects `impressions` (required, must be min 1 char) and has no `website` or `monthlyPageviews` field. The form will fail validation.

**Requirements**:
1. In `renderFaqSupportPage()` around line 4014-4021, update the fetch body to:
   - Remove `website` field (not in schema)
   - Change `monthlyPageviews` to `impressions` with a default value like `"N/A - Support Request"`
   - Keep `company` field mapping (subject + priority is acceptable)
2. Verify the form submission works by checking the Zod schema in `shared/schema.ts` -- all required fields must be present

**Acceptance Criteria**:
- [ ] Support form submission at `/support` does not return a 400 validation error
- [ ] All required fields (name, email, company, impressions, message) are sent in the POST body
- [ ] The `impressions` field has a valid value (not empty string)

**Implementation Notes**: The contact form on `/contact` works correctly -- it sends `impressions` from a dropdown. The support form should follow the same pattern but can use a hardcoded value since impressions aren't relevant for support requests.

---

### Task 1-1: Fix Blog Category Filters
**Status**: 🔲 Not Started
**Phase**: Phase 1 -- Complete Core
**Priority**: Medium
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/template.ts`

**Context**: The blog listing page (`renderBlogPage()`) around line 1994 has category filter buttons that update Alpine.js `activeCategory` state. The buttons have active/inactive styling. But the blog post cards are rendered without any `x-show` directive, so clicking a category button changes the button appearance but doesn't filter any posts.

**Requirements**:
1. Add `x-show="!activeCategory || activeCategory === '${post.category}'"` to each blog post card's container element
2. Ensure the "All" button sets `activeCategory` to `''` (it already does)
3. Add `x-transition` for smooth show/hide animation

**Acceptance Criteria**:
- [ ] Clicking a category button shows only posts in that category
- [ ] Clicking "All" shows all posts
- [ ] Posts animate smoothly when filtering

**Implementation Notes**: The Alpine.js state `activeCategory` is already managed correctly at line 2024. Each post card is generated in a `.map()` call. Add the `x-show` to the outer div of each card.

---

### Task 1-2: Add Basic Auth to Admin Routes
**Status**: 🔲 Not Started
**Phase**: Phase 1 -- Complete Core
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: Task 0-1
**Files**: `server/routes.ts`, `worker.ts`, `wrangler.toml`

**Context**: The blog admin panel (`/admin/blog/*`), blog API (`POST/PUT/DELETE /api/blog/*`), and contact leads API (`GET /api/contact`) are completely unauthenticated. Anyone can create, edit, or delete blog posts, and anyone can read all submitted contact leads (PII).

**Requirements**:
1. Add a `ADMIN_PASSWORD` environment variable to `wrangler.toml` (for Workers) and document it for dev
2. Create a Hono middleware function that checks for HTTP Basic Auth with username `admin` and password from env
3. Apply the middleware to these routes: `/admin/blog*`, `POST /api/blog`, `PUT /api/blog/:id`, `DELETE /api/blog/:id`, `GET /api/contact`
4. Return 401 with `WWW-Authenticate: Basic` header when auth is missing or wrong

**Acceptance Criteria**:
- [ ] Visiting `/admin/blog` without credentials shows browser's Basic Auth prompt
- [ ] Entering correct credentials grants access
- [ ] Entering wrong credentials returns 401
- [ ] Blog listing (`GET /blog`) and individual posts (`GET /blog/:slug`) remain public
- [ ] POST /api/contact (submit form) remains public
- [ ] Auth works in both dev server (routes.ts) and worker (worker.ts)

**Implementation Notes**: HTTP Basic Auth is simple but effective for a single-admin site. The password should be set as an environment variable, not hardcoded. For dev, use a `.dev.vars` file (already gitignored). For Workers, set via `wrangler secret put ADMIN_PASSWORD`.

---

### Task 1-3: Deduplicate Routes (routes.ts / worker.ts)
**Status**: 🔲 Not Started
**Phase**: Phase 1 -- Complete Core
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: Task 0-2
**Files**: `server/routes.ts`, `worker.ts`

**Context**: worker.ts re-implements every route from routes.ts instead of importing `registerRoutes()`. This caused the 10-page drift. The only reason worker.ts can't directly import routes.ts is the `/assets/:filename` route uses Node.js `fs` and `path` modules.

**Requirements**:
1. In routes.ts, make the `/assets/:filename` route conditional: only register it if `typeof process !== 'undefined'` or behind a parameter
2. Move `sanitizeHtml()` from both files to a new `server/sanitize.ts` module
3. Modify worker.ts to import and call `registerRoutes(app)` instead of reimplementing routes
4. Remove all duplicate route code from worker.ts

**Acceptance Criteria**:
- [ ] worker.ts has fewer than 30 lines of code (import + app setup + export)
- [ ] Routes exist in exactly one place (routes.ts)
- [ ] sanitizeHtml exists in exactly one place (server/sanitize.ts)
- [ ] Dev server still works (fs/path route works in Node.js)
- [ ] Worker still works (no fs/path references in Worker context)
- [ ] Adding a new route requires editing only routes.ts

**Implementation Notes**: The simplest approach is to have `registerRoutes` accept an optional config parameter like `{ serveStaticFiles: boolean }` and only register the `/assets/:filename` route when true. worker.ts calls `registerRoutes(app, { serveStaticFiles: false })`, index.ts calls `registerRoutes(app, { serveStaticFiles: true })`.

---

### Task 1-4: Replace Regex HTML Sanitizer
**Status**: 🔲 Not Started
**Phase**: Phase 1 -- Complete Core
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: Task 1-3
**Files**: `server/sanitize.ts` (from Task 1-3), `package.json`

**Context**: `sanitizeHtml()` uses regex to strip `<script>`, `<style>`, `on*` event handlers, and dangerous URL schemes. Regex HTML parsing is a known anti-pattern -- it cannot handle nested contexts, encoding variations, or mutation XSS. The routes.ts version even declares `allowedTags` and `allowedAttrs` arrays that it never uses.

**Requirements**:
1. Install `sanitize-html` npm package (works in both Node.js and Workers)
2. Replace the regex implementation in `server/sanitize.ts` with `sanitize-html` using an allowlist of safe tags and attributes
3. Allow: h1-h6, p, a (href, target, rel), ul, ol, li, strong, em, b, i, br, blockquote, pre, code, img (src, alt, width, height), span, div, hr, table, thead, tbody, tr, th, td
4. Disallow: script, style, iframe, form, input, all event handlers (on*)

**Acceptance Criteria**:
- [ ] Blog posts can contain safe HTML (headings, paragraphs, links, lists, images)
- [ ] `<script>alert(1)</script>` is stripped from blog content
- [ ] `<img src=x onerror=alert(1)>` has the onerror removed
- [ ] `<a href="javascript:alert(1)">` has the href removed or blocked
- [ ] Existing seeded blog post content renders identically

**Implementation Notes**: `sanitize-html` is the standard Node.js HTML sanitizer. Ensure it works in the Cloudflare Workers environment -- if not, use `isomorphic-dompurify` or a WASM-based alternative.

---

### Task 1-5: Add Error Pages and Clean Up Orphans
**Status**: 🔲 Not Started
**Phase**: Phase 1 -- Complete Core
**Priority**: Medium
**Complexity**: M (1-4hr)
**Depends On**: None
**Files**: `server/template.ts`, `server/routes.ts`, `worker.ts`, `components.json` (delete), `client/` (delete), `script/build.ts` (delete), `README.md`, `tsconfig.json`

**Context**: Unmatched routes return Hono's default "404 Not Found" plain text. Several orphaned files from the abandoned React+Express SPA still exist. README.md is outdated.

**Requirements**:
1. Add `renderNotFoundPage()` to template.ts -- branded 404 page with glassmorphism design
2. Add `app.notFound()` handler in routes.ts that serves the 404 page
3. Add `app.onError()` handler in routes.ts that serves a branded 500 page
4. Delete orphaned files: `components.json`, `client/` directory, `script/build.ts`
5. Update README.md to list all 26 pages and current tech stack
6. Fix tsconfig.json: remove `client/src/**/*` from includes, remove `"vite/client"` from types
7. Remove HTMX CDN script from renderHead() (loaded but never used)

**Acceptance Criteria**:
- [ ] Visiting `/nonexistent` shows a branded 404 page, not plain text
- [ ] Server errors show a branded 500 page
- [ ] `components.json`, `client/`, `script/build.ts` are deleted
- [ ] README.md lists all 26 pages
- [ ] tsconfig.json only references existing directories
- [ ] HTMX script tag removed from renderHead()

---

### Task 1-6: Fix OG Images and Add SEO Files
**Status**: 🔲 Not Started
**Phase**: Phase 1 -- Complete Core
**Priority**: Medium
**Complexity**: M (1-4hr)
**Depends On**: Task 0-1
**Files**: `server/template.ts`, `server/routes.ts`, `wrangler.toml`

**Context**: `og:image` uses a relative URL (`/assets/HBDR_Logo_Pack_all_sizes_-_2_...jpeg`) that social media crawlers can't resolve. There's no sitemap.xml or robots.txt for 26 pages.

**Requirements**:
1. Add a `SITE_URL` var to wrangler.toml (default `https://hbdr-website.<subdomain>.workers.dev`)
2. Accept `SITE_URL` in renderHead() options or as a constant
3. Prepend SITE_URL to og:image and og:url meta tags
4. Add `GET /sitemap.xml` route returning XML with all 26 page URLs
5. Add `GET /robots.txt` route allowing all crawlers, disallowing `/admin/*`

**Acceptance Criteria**:
- [ ] `og:image` contains an absolute URL starting with https://
- [ ] `og:url` contains an absolute URL
- [ ] `/sitemap.xml` returns valid XML with all page URLs
- [ ] `/robots.txt` returns text with Allow/Disallow rules

---

### Task 2-1: Add Security Headers
**Status**: 🔲 Not Started
**Phase**: Phase 2 -- Harden
**Priority**: High
**Complexity**: S (< 1hr)
**Depends On**: None
**Files**: `server/routes.ts`

**Context**: No security headers are set on any response. This leaves the site vulnerable to clickjacking, MIME sniffing, and has no browser-side XSS mitigation.

**Requirements**:
1. Add a Hono middleware that sets on every response:
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.tailwindcss.com unpkg.com cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' cdn.jsdelivr.net fonts.googleapis.com; font-src fonts.gstatic.com cdn.jsdelivr.net; img-src 'self' data:; connect-src 'self'`
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains` (production only)

**Acceptance Criteria**:
- [ ] Every response includes all 5 security headers
- [ ] Page still loads correctly with CDN scripts and fonts
- [ ] Alpine.js still works (requires 'unsafe-inline' and 'unsafe-eval')

---

### Task 2-2: Add Rate Limiting
**Status**: 🔲 Not Started
**Phase**: Phase 2 -- Harden
**Priority**: High
**Complexity**: M (1-4hr)
**Depends On**: Task 0-1
**Files**: `server/routes.ts`, `package.json`

**Context**: No rate limiting exists on any endpoint. The contact form and blog API can be spammed without limit.

**Requirements**:
1. Add per-IP rate limiting middleware using Hono's built-in or a compatible library
2. Limit POST /api/contact to 5 requests per minute per IP
3. Limit POST/PUT/DELETE /api/blog to 20 requests per minute per IP
4. Return 429 Too Many Requests with a meaningful error message

**Acceptance Criteria**:
- [ ] 6th contact form submission within 1 minute returns 429
- [ ] Rate limit resets after the window expires
- [ ] GET endpoints are not rate limited (or have a much higher limit)

---

### Task 4-1: Add Persistent Storage
**Status**: 🔲 Not Started
**Phase**: Phase 4 -- Production Infrastructure
**Priority**: High
**Complexity**: L (4hr+)
**Depends On**: Task 1-3
**Files**: `server/storage.ts`, `shared/schema.ts`, `wrangler.toml`, new migration files

**Context**: All data is stored in in-memory Maps. Blog posts reset to 5 seeded posts on every restart. Contact leads are silently lost. The `IStorage` interface is already designed for swappable backends.

**Requirements**:
1. Create a `D1Storage` class implementing `IStorage` using Cloudflare D1 (SQLite)
2. Create SQL migration scripts from the Drizzle schema in `shared/schema.ts`
3. Add D1 database binding to `wrangler.toml`
4. Modify storage.ts to use D1Storage in production, MemStorage in development
5. Seed blog posts on first D1 migration only (not on every cold start)

**Acceptance Criteria**:
- [ ] Blog posts persist across Worker restarts
- [ ] Contact leads persist across Worker restarts
- [ ] Dev server still works with MemStorage
- [ ] Seeded blog posts appear in D1 after migration
- [ ] IStorage interface is unchanged (no breaking changes to routes)

**Implementation Notes**: Cloudflare D1 is SQLite-compatible, which maps well to the Drizzle pgTable definitions (will need minor type adjustments). The `IStorage` interface was designed for exactly this kind of swap.
