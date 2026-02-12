# RESTRUCTURE PLAN

## Goals
1. Break the 5327-line monolith into individual page files
2. Eliminate route duplication between worker.ts and routes.ts
3. Remove dead React app (client/) and ~60 unused dependencies
4. Harden security (sanitization, secrets, CSRF)
5. Future-proof for 50+ more pages, funnels, free tools, and blog content marketing

## Target Architecture

```
server/
  templates/
    layout.ts                    ← renderLayout + renderHead + renderNav + renderFooter + renderScripts
    styles.ts                    ← CSS string (extracted from renderHead's 530-line <style> block)
    components/
      hero.ts                    ← renderPageHero()
      cta.ts                     ← renderCTASection()
      stats.ts                   ← renderStatsSection()
      contact-form.ts            ← renderContactFormSection()
      blog-card.ts               ← renderBlogCard() — reusable for HTMX partials
    pages/
      home.ts                    ← renderPage() (605 lines)
      about.ts                   ← renderAboutPage() (96 lines)
      how-it-works.ts            ← renderHowItWorksPage() (110 lines)
      careers.ts                 ← renderCareersPage() (108 lines)
      press.ts                   ← renderPressPage() (77 lines)
      contact.ts                 ← renderContactPage() (29 lines)
      blog.ts                    ← renderBlogPage() + renderBlogPostPage() + helpers
      dashboard.ts               ← renderDashboardPage() (148 lines)
      partners.ts                ← renderPartnersPage() (159 lines)
      trust.ts                   ← renderTrustCompliancePage() (104 lines)
      support.ts                 ← renderFaqSupportPage() (221 lines)
      solutions/
        header-bidding.ts
        display-ads.ts
        ctv-ott.ts
        in-app-ads.ts
        mcm.ts
        manage-account.ts
        manage-inventory.ts
        open-bidding.ts
        ad-exchange-adx.ts
        video-player.ts
      audience/
        publishers.ts            ← renderPublishersPage() (222 lines)
        advertisers.ts           ← renderAdvertisersPage() (185 lines)
      legal/
        privacy-policy.ts
        terms.ts
        gdpr-cookie-policy.ts
    admin/
      layout.ts                  ← renderAdminLayout() (from adminTemplate.ts)
      login.ts                   ← renderAdminLoginPage()
      leads.ts                   ← renderAdminLeadsPage()
      blog.ts                    ← renderBlogAdminPage() + renderBlogEditorPage()
    tools/
      index.ts                   ← renderToolsPage() (from toolsTemplate.ts)
  routes/
    pages.ts                     ← ALL page GET routes (single source of truth)
    api.ts                       ← ALL API endpoints (blog CRUD, contact, leads)
    admin.ts                     ← Admin routes + auth middleware
    seo.ts                       ← /robots.txt, /sitemap.xml, dynamic sitemap generation
  middleware/
    auth.ts                      ← Session management, isAuthenticated, generateSessionId
    rate-limit.ts                ← Rate limiting (extracted from rateLimit.ts)
    sanitize.ts                  ← sanitizeHtml + sanitizeText (single source of truth)
  services/
    email.ts                     ← Email notification (unified from two implementations)
    storage.ts                   ← IStorage interface + MemStorage (dev)
    d1-storage.ts                ← D1Storage (production)
  config.ts                      ← SITE_URL, env var handling, constants
  index.ts                       ← Node.js dev entry point (unchanged)
worker.ts                        ← Cloudflare entry — creates app, wires storage, calls shared routes
shared/
  schema.ts                      ← Zod schemas (unchanged)
migrations/
  0001_init.sql                  ← D1 schema (unchanged)
public/                          ← Static assets (unchanged)
wrangler.toml                    ← Config (password moved to secret)
```

## Phase 1: Eliminate Route Duplication (THE critical structural fix)

**Problem**: routes.ts (411 lines) and worker.ts (455 lines) duplicate ALL routes, sanitization, auth, and email logic. Any change must be made in two places. They've already diverged.

**Solution**: Create shared route modules that both entry points consume.

1. Extract `server/middleware/auth.ts` — session management functions
2. Extract `server/middleware/sanitize.ts` — sanitizeHtml + sanitizeText
3. Extract `server/middleware/rate-limit.ts` — rate limiting
4. Extract `server/services/email.ts` — unified email (works with or without Resend key)
5. Create `server/routes/pages.ts` — registers all page GET routes
6. Create `server/routes/api.ts` — registers all API routes (takes storage as param)
7. Create `server/routes/admin.ts` — registers admin routes (takes storage + config as params)
8. Create `server/routes/seo.ts` — robots.txt + sitemap.xml

Both `worker.ts` and `server/index.ts` become thin entry points:
- Instantiate their storage (D1 or Mem)
- Create Hono app
- Call `registerAllRoutes(app, storage, config)`

**Routes receive storage via dependency injection, not import**. This is the key pattern that eliminates duplication.

## Phase 2: Break template.ts Into Individual Files

**Extraction order** (dependencies first):

1. `templates/styles.ts` — export the CSS string (530 lines)
2. `templates/layout.ts` — renderHead, renderNav, renderFooter, renderScripts, renderLayout
3. `templates/components/hero.ts` — renderPageHero
4. `templates/components/cta.ts` — renderCTASection
5. `templates/components/stats.ts` — renderStatsSection
6. `templates/components/contact-form.ts` — renderContactFormSection
7. `templates/components/blog-card.ts` — renderBlogCard (extract from renderBlogPage)
8. Each page file in `templates/pages/` — imports from layout + components

Every page file follows this pattern:
```typescript
import { renderLayout } from "../layout";
import { renderPageHero } from "../components/hero";
import { renderCTASection } from "../components/cta";

export function renderAboutPage(): string {
  const content = `
    ${renderPageHero("About", "Our Story", "Description...")}
    <!-- page-specific content -->
    ${renderCTASection("Ready to get started?", "Contact Us")}
  `;
  return renderLayout({
    title: "About - HBDR",
    description: "...",
    canonicalPath: "/about",
    bodyContent: content,
  });
}
```

## Phase 3: Remove Dead Code

1. Delete `client/` directory entirely (React app — unused, never deployed)
2. Delete `components.json` (shadcn/ui config for deleted React app)
3. Delete `vite.config.ts` (Vite config for deleted React app)
4. Delete `postcss.config.js` (PostCSS for deleted React app)
5. Delete `tailwind.config.ts` (Tailwind config for deleted React app — site uses CDN)
6. Delete `server/vite.ts` (Vite dev middleware — unused)
7. Delete `server/db.ts` (PostgreSQL connection — unused, D1 is the real DB)
8. Delete `server/seed.ts` (PostgreSQL seeder — D1 has its own seeding in d1Storage.ts)
9. Delete `script/build.ts` (references removed packages)
10. Delete `scripts/` directory (Replit GitHub push helpers — not needed)
11. Delete `.upm/` directory (Replit cache)
12. Delete `.local/` directory (Replit agent state — 17 binary files)
13. Delete `.replit` (Replit config)
14. Delete `drizzle.config.ts` (PostgreSQL Drizzle config — D1 uses raw SQL)

## Phase 4: Clean package.json

Strip to only what the production site actually uses:

```json
{
  "name": "hbdr-website",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy",
    "check": "tsc --noEmit"
  },
  "dependencies": {
    "hono": "^4.11.9",
    "resend": "^6.9.1",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20260210.0",
    "typescript": "5.6.3",
    "wrangler": "^4.63.0"
  }
}
```

Removed: React, 20+ Radix UI, Express, Passport, pg, connect-pg-simple, Framer Motion, Recharts, Wouter, Vite, PostCSS, drizzle-orm, drizzle-zod, drizzle-kit, etc. (~60 packages).

**Note**: `drizzle-orm` and `drizzle-zod` are removed because the deployed site uses D1 raw SQL (d1Storage.ts), not Drizzle ORM. The Zod schemas in `shared/schema.ts` need to be rewritten as plain Zod schemas without Drizzle pgTable dependency.

## Phase 5: Harden Security

1. **Replace regex sanitizeHtml** with a proper allowlist approach:
   - Parse HTML into tokens
   - Only allow specific tags: h1-h6, p, a, ul, ol, li, strong, em, b, i, br, blockquote, pre, code, img, span, div, hr, table, thead, tbody, tr, th, td
   - Only allow specific attributes: href, src, alt, class, target, rel
   - Strip everything else

2. **Move ADMIN_PASSWORD to Wrangler secret** — remove from wrangler.toml [vars]

3. **Add CSRF token** to forms:
   - Generate token per session
   - Include as hidden field in contact/support/blog forms
   - Validate on POST

4. **Fix admin session** — currently in-memory Map (lost on Worker eviction). For Workers, use a signed cookie with expiration instead.

5. **Content-Security-Policy header** — add basic CSP allowing only known CDNs

## Phase 6: Future-Proofing

### For 50+ More Pages
The file-per-page structure means adding a page is:
1. Create `server/templates/pages/new-page.ts`
2. Add one line to `server/routes/pages.ts`
3. Add to nav/footer if needed

### For Funnels
Create `server/templates/funnels/` directory with:
- Multi-step form pages
- Landing page variants
- Thank-you / confirmation pages
- Funnel routes in `server/routes/funnels.ts`

### For Free Publisher Tools
The `toolsTemplate.ts` pattern is already good. Extend it:
- `server/templates/tools/index.ts` — tools landing page
- `server/templates/tools/revenue-calculator.ts`
- `server/templates/tools/header-bidding-analyzer.ts`
- `server/templates/tools/ad-density-checker.ts`
- Each tool gets its own HTMX API route for calculations
- Tool routes in `server/routes/tools.ts`

### For Blog Content Marketing
- `server/routes/blog.ts` — blog routes including:
  - `/blog` — listing with pagination
  - `/blog/:slug` — individual post
  - `/blog/category/:category` — category pages (for SEO)
  - `/blog/tag/:tag` — tag pages (for long-tail SEO)
  - `/api/blog/search` — HTMX search endpoint
  - `/api/blog/cards` — HTMX partial for infinite scroll / filtering
- Dynamic sitemap includes all blog post URLs
- Structured data (JSON-LD) for blog posts (Article schema)
- Canonical URLs on every page
- Previous/Next pagination links for crawlers

### For Inquiry Funnels
- Every tool page ends with a CTA to `/contact` or a tool-specific inquiry form
- Every blog post ends with a contextual CTA
- `/publishers` and `/advertisers` pages as dedicated landing pages
- UTM parameter tracking on contact form submissions (store `source` field)

## Execution Order

1. **Phase 1** first — eliminate duplication (structural prerequisite for everything else)
2. **Phase 2** — break template.ts into files (biggest code change)
3. **Phase 3** — delete dead code (clean slate)
4. **Phase 4** — clean package.json + rewrite schemas
5. **Phase 5** — security hardening
6. **Phase 6** — add SEO/future infrastructure

Each phase gets its own commit. Deploy and verify after Phase 2.

## Risks

- **Breaking the live site**: Mitigated by testing with `wrangler dev` before deploy
- **Import path changes**: All internal imports change. Must be thorough.
- **Schema rewrite**: Removing Drizzle means rewriting shared/schema.ts as plain Zod. D1Storage.ts uses raw SQL already, so no ORM dependency exists in production path.
- **Blog seeding**: D1 seeding in d1Storage.ts must remain intact
