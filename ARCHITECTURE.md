# ARCHITECTURE.md

## System Overview

HBDR Website is a server-rendered marketing site for HBDR, an ad-tech company specializing in header bidding and publisher monetization. It is a 26-page website with a blog CMS and contact form lead capture, built on the Hono framework (TypeScript). All pages are rendered as complete HTML strings on the server -- there is no client-side JavaScript framework. Alpine.js handles interactivity (accordions, mobile nav, form submissions) and Tailwind CSS + DaisyUI provide styling via CDN.

---

## Component Map

```
                        ┌─────────────────────────────────┐
                        │         Client Browser          │
                        │  Alpine.js + Tailwind CSS (CDN) │
                        └────────────┬────────────────────┘
                                     │ HTTP
                        ┌────────────▼────────────────────┐
                        │       Hono HTTP Router          │
                        │  (routes.ts OR worker.ts)       │
                        └──┬──────────┬──────────┬────────┘
                           │          │          │
              ┌────────────▼──┐  ┌────▼─────┐  ┌▼──────────────┐
              │  Page Routes  │  │ Blog API │  │ Contact API   │
              │  26 GET pages │  │ CRUD     │  │ POST/GET      │
              └────────────┬──┘  └────┬─────┘  └┬──────────────┘
                           │          │          │
              ┌────────────▼──────────▼──────────▼──────────────┐
              │              template.ts (5212 lines)           │
              │  renderLayout() + 29 render*() functions        │
              │  renderHead() / renderNav() / renderFooter()    │
              └────────────────────────┬────────────────────────┘
                                       │
              ┌────────────────────────▼────────────────────────┐
              │            storage.ts (MemStorage)              │
              │  IStorage interface + in-memory Maps            │
              │  blogPosts Map | contactLeads Map | users Map   │
              └────────────────────────────────────────────────┘
                                       │
              ┌────────────────────────▼────────────────────────┐
              │            schema.ts (Zod + Drizzle)            │
              │  insertContactLeadSchema | insertBlogPostSchema │
              │  Type exports: User, ContactLead, BlogPost      │
              └─────────────────────────────────────────────────┘
```

### Dual Entry Points (CRITICAL DRIFT)

```
Node.js Dev (server/index.ts)           Cloudflare Workers (worker.ts)
────────────────────────────            ────────────────────────────
imports registerRoutes(app)             RE-IMPLEMENTS all routes inline
  from routes.ts                          (not imported from routes.ts)
26 page routes ✅                       16 page routes only ⚠️
5 API routes ✅                         5 API routes ✅
/assets/:filename handler ✅            (served by wrangler [assets]) ✅
sanitizeHtml() in routes.ts            sanitizeHtml() DUPLICATED in worker.ts
```

**worker.ts is missing 10 page routes**: `/privacy-policy`, `/terms`, `/gdpr-cookie-policy`, `/support`, `/dashboard`, `/solutions/video-player`, `/partners`, `/publishers`, `/advertisers`, `/trust`

---

## Tech Stack

### Runtime Dependencies (package.json)

| Package | Version | Purpose | Actually Used? |
|---------|---------|---------|----------------|
| hono | ^4.11.9 | HTTP framework (routing, middleware, responses) | YES |
| zod | ^3.24.2 | Schema validation for blog posts and contact leads | YES |
| zod-validation-error | ^3.4.0 | Human-readable Zod error messages | YES |
| drizzle-orm | ^0.39.3 | ORM table definitions used only for schema/type generation | PARTIAL -- only pgTable definitions used for createInsertSchema. No DB connection. |
| drizzle-zod | ^0.7.0 | Generates Zod schemas from Drizzle table defs | YES (createInsertSchema) |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| @cloudflare/workers-types | ^4.20260207.0 | TypeScript types for Workers runtime |
| wrangler | ^4.63.0 | Cloudflare Workers CLI (build + deploy) |
| typescript | 5.6.3 | TypeScript compiler (type checking only) |

### Missing from package.json but imported

| Package | Imported Where | Purpose |
|---------|---------------|---------|
| @hono/node-server | server/index.ts line 1 | `serve()` function for Node.js HTTP server |

### CDN Dependencies (loaded at runtime in browser)

| Library | Version | CDN |
|---------|---------|-----|
| Tailwind CSS | Latest (CDN play) | cdn.tailwindcss.com |
| DaisyUI | 4.12.14 | cdn.jsdelivr.net |
| HTMX | 2.0.4 | unpkg.com (loaded but never used) |
| Alpine.js | 3.14.8 | cdn.jsdelivr.net |
| Alpine.js Intersect | 3.14.8 | cdn.jsdelivr.net |
| Figtree font | Latest | fonts.googleapis.com |
| Instrument Serif font | Latest | fonts.googleapis.com |

### Orphaned Files

| File | Original Purpose | Status |
|------|-----------------|--------|
| `components.json` | shadcn/ui component config (references `client/src`, `tailwind.config.ts`) | Orphaned. No React, no shadcn, no tailwind.config.ts exists |
| `client/public/favicon.png` | React SPA favicon | Orphaned. Orange checkered icon, not HBDR branding |
| `script/build.ts` | esbuild + Vite bundler for prior React+Express architecture | Orphaned. References `vite`, `express`, `passport`, `pg`, etc. that are no longer installed. No "build" script in package.json. |
| `attached_assets/content-*.md` | Scraped competitor website content (Operative.com, Aditude.com) | Reference material, not used in code |
| `attached_assets/branding-*.json` | Scraped competitor branding analysis | Reference material, not used in code |
| `attached_assets/logo.svg` | SVG logo from competitor scrape | Not used; HBDR uses JPEG logos |
| `attached_assets/ogImage.svg` | SVG OG image from competitor scrape | Not used |

---

## Data Flow

### Page Request (e.g., GET /about)

```
Browser                  Hono Router              template.ts
───────                  ───────────              ───────────
GET /about ────────────► app.get("/about") ──────► renderAboutPage()
                                                    │
                                                    ├── builds content HTML string
                                                    │
                                                    ├── calls renderLayout({
                                                    │     title, description,
                                                    │     canonicalPath, bodyContent
                                                    │   })
                                                    │
                                                    ├──── renderHead() → <html><head>...</head>
                                                    ├──── renderNav()  → <nav>...</nav>
                                                    ├──── bodyContent  → page HTML
                                                    ├──── renderFooter() → <footer>...</footer>
                                                    ├──── renderScripts() → <script>...</script>
                                                    │
                              c.html(fullHTML) ◄─────┘
                                     │
Browser ◄──────────── 200 text/html ─┘
```

### Blog Post Creation (POST /api/blog)

```
Browser (Admin Editor)   Hono Router              storage.ts
──────────────────────   ───────────              ──────────
POST /api/blog ─────────► app.post("/api/blog")
  { title, slug,              │
    content, ... }            ├── c.req.json() → parse body
                              ├── insertBlogPostSchema.safeParse()
                              │     → 400 if invalid
                              ├── storage.getBlogPostBySlug()
                              │     → 400 if duplicate
                              ├── sanitizeHtml(content)
                              │     → strip <script>, onerror=, etc.
                              ├── storage.createBlogPost()
                              │     → generates UUID, sets dates
                              │     → stores in blogPosts Map
                              │
                         201 JSON ◄─┘
```

### Contact Form Submission (POST /api/contact)

```
Browser (Contact Page)   Hono Router              storage.ts
──────────────────────   ───────────              ──────────
POST /api/contact ──────► app.post("/api/contact")
  { name, email,              │
    company, impressions,     ├── c.req.json() → parse body
    message }                 ├── insertContactLeadSchema.safeParse()
                              │     → 400 JSON if invalid
                              ├── storage.createContactLead()
                              │     → generates UUID, sets createdAt
                              │     → stores in contactLeads Map
                              │
                         200 HTML fragment ◄─┘
                         (success message)
```

---

## File Structure

```
hbdr-website/
├── server/
│   ├── index.ts              # Node.js dev server entry. Hono + @hono/node-server, port 5000.
│   │                         # Imports registerRoutes from routes.ts.
│   ├── routes.ts             # ALL route handlers (213 lines). 26 page GETs + 5 API endpoints.
│   │                         # Contains sanitizeHtml(). Imports all 29 render functions.
│   │                         # Uses Node.js fs/path for /assets/:filename static file serving.
│   ├── storage.ts            # IStorage interface + MemStorage class (305 lines).
│   │                         # In-memory Maps for users, contactLeads, blogPosts.
│   │                         # Proxy-based lazy initialization. Seeds 5 blog posts on construction.
│   │                         # Custom UUID generator with crypto.randomUUID() fallback.
│   └── template.ts           # ALL 26 page templates + shared components (5212 lines).
│                              # 29 exported render functions + ~10 private helpers.
│                              # Contains ALL CSS in renderHead() (lines 50-530).
│                              # Contains renderNav(), renderFooter(), renderScripts().
│                              # Contains renderLayout(), renderPageHero(), renderStatsSection(),
│                              #   renderCTASection(), renderContactFormSection().
│
├── shared/
│   └── schema.ts             # Drizzle pgTable defs + Zod validation schemas (73 lines).
│                              # Defines: users, contactLeads, blogPosts tables.
│                              # Exports: insertContactLeadSchema, insertBlogPostSchema.
│                              # Exports types: User, InsertUser, ContactLead, InsertContactLead,
│                              #   BlogPost, InsertBlogPost.
│
├── worker.ts                 # Cloudflare Workers entry (177 lines). DUPLICATES routes.
│                              # ⚠️ MISSING 10 PAGE ROUTES. Only has 16 of 26 pages.
│                              # Contains its own sanitizeHtml() copy.
│                              # Does NOT import registerRoutes -- reimplements everything.
│
├── script/
│   └── build.ts              # ORPHANED. esbuild + Vite bundler for prior React+Express stack.
│
├── public/assets/            # Static files served by Cloudflare Workers.
├── attached_assets/          # Source branding files served by dev server at /assets/:filename.
├── client/public/favicon.png # ORPHANED. Non-HBDR favicon from prior React SPA.
├── components.json           # ORPHANED. shadcn/ui config.
├── package.json              # 5 deps + 3 devDeps. Missing @hono/node-server. No lockfile.
├── tsconfig.json             # Main TS config. References phantom client/src/ and vite/client.
├── tsconfig.worker.json      # Worker-specific TS config. Targets ES2022.
├── wrangler.toml             # Cloudflare Workers config. Serves public/ as static assets.
└── README.md                 # OUTDATED. Says "16+ pages", lists only 9 solution pages.
```

---

## External Integrations

| Service | How Used | Auth | Notes |
|---------|----------|------|-------|
| Cloudflare Workers | Production hosting via `wrangler deploy` | Wrangler CLI OAuth | Worker name: `hbdr-website` |
| CDN (jsdelivr, unpkg, googleapis) | Runtime CSS/JS/font loading | None (public CDN) | No SRI hashes |
| `https://dashboard.hbdr.com` | External link from Dashboard page | N/A | Status unknown |

There are no webhooks, no third-party API calls, no email integrations, no payment processors, no analytics services, and no database connections.

---

## State Management

| State Type | Where | Persistence | Contents |
|------------|-------|-------------|----------|
| Blog posts | `MemStorage.blogPosts` Map | Lost on restart. Reseeded with 5 sample posts. | id, title, slug, excerpt, content, etc. |
| Contact leads | `MemStorage.contactLeads` Map | Lost on restart. Never forwarded. | id, name, email, company, impressions, message, createdAt |
| Users | `MemStorage.users` Map | Lost on restart. Never populated. | id, username, password |
| Alpine.js UI state | Browser `x-data` | Lost on page navigation | Form fields, mobile nav, FAQ accordions |

---

## Security Model

### Authentication
**None.** There is no login, no sessions, no cookies, no JWT, no API keys. Every endpoint is public, including the full blog admin panel and `GET /api/contact` (PII exposure).

### Input Validation
- Contact leads: Zod validation (name min 2, valid email, company min 2, impressions min 1).
- Blog posts: Zod validation (title min 3, slug regex, excerpt min 10, content min 20, author min 2, category min 2).
- Blog HTML content: Regex-based `sanitizeHtml()` -- **bypassable**.

### Security Headers
None. No CORS, no CSP, no X-Frame-Options, no X-Content-Type-Options, no HSTS.

### Secrets
None. No environment variables used in application code.

---

## Infrastructure

| Environment | Entry Point | Static Assets | Status |
|-------------|------------|--------------|--------|
| Development | server/index.ts | attached_assets/ | Requires installing missing @hono/node-server |
| Production | worker.ts | public/ via [assets] | **BROKEN** -- missing 10 page routes |

### CI/CD
**None.** No GitHub Actions, no automated testing, no staging. Manual deploy via `npx wrangler deploy`.

---

## Known Issues

### Critical
1. **No authentication on admin panel** -- `/admin/blog` and all blog/contact APIs are publicly accessible.
2. **worker.ts is 10 pages behind routes.ts** -- Deploying to Workers breaks 10 pages including legal pages linked from every footer.
3. **No data persistence** -- In-memory Maps. Contact leads and blog posts lost on every restart.
4. **XSS risk in blog content** -- Regex `sanitizeHtml()` is bypassable. Content rendered as raw innerHTML.
5. **sanitizeHtml() duplicated** -- In both `routes.ts:9-21` and `worker.ts:19-29`. The routes.ts version declares unused `allowedTags`/`allowedAttrs` arrays.
6. **@hono/node-server missing from package.json** -- Dev server will crash after `npm install`.
7. **No lockfile** -- No `package-lock.json`. Builds are non-reproducible.

### Significant
8. **Blog category filters broken** -- Filter buttons update Alpine.js state but no `x-show` on post cards.
9. **Support form schema mismatch** -- `/support` form sends `website`/`monthlyPageviews` not in Zod schema.
10. **`published` is a string** -- `"true"`/`"false"` instead of boolean.
11. **script/build.ts is dead code** -- References packages that no longer exist. No build script in package.json.

### Minor
12. **Social icon links** -- LinkedIn and Twitter/X icons point to `#`.
13. **OG image URL is relative** -- Social media previews won't show images.
14. **README.md outdated** -- Says "16+ pages", missing 10 new pages.
15. **tsconfig.json phantom paths** -- References `client/src/**/*` and `vite/client` types that don't exist.
16. **components.json orphaned** -- shadcn/ui config for non-existent React setup.
17. **No SRI hashes on CDN scripts** -- Compromised CDN could inject code.
18. **No error pages** -- 404/500 return plain text.
19. **No sitemap.xml or robots.txt** -- Missing SEO files.
20. **HTMX loaded but never used** -- CDN-loaded on every page, zero `hx-*` attributes in templates.
21. **Fonts changed** -- Code uses Figtree/Instrument Serif, docs say Inter.

---

## Git History Analysis

The git log reveals this project's evolution:

1. **Initial commit** (`27dd4a4`): Scaffolded as a React+Express+Drizzle+PostgreSQL SPA (hence the original 60+ dependencies, `components.json`, `client/` directory).

2. **Architecture pivot** (`64ad6ed`): Completely rewritten as server-rendered Hono with HTML template literals. React, Express, Vite, and all frontend build tooling abandoned. The pivot was thorough in server code but left behind orphaned configs.

3. **Documentation** (`cf6ee79`): Comprehensive docs merged via PR #1.

4. **Major content expansion** (`8c8d44e`-`9eb4b9e`): 10 new pages added. Nav restructured with Company dropdown. Footer links fixed. BUT worker.ts was NOT updated with the new routes.

5. **package.json cleanup** (`ca3a878`): Dependency purge from ~70 to 5+3 packages. Name changed to `hbdr-website`. Dev/build/check scripts removed. `@hono/node-server` accidentally removed.

6. **Lockfile deleted** (`9866842`): package-lock.json explicitly removed.

The abandoned React+Express SPA approach is well-documented in the remnant files. It was abandoned because a marketing site doesn't need client-side rendering -- SSR with Alpine.js is simpler and faster.
