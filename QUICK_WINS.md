# QUICK_WINS.md

## Top Highest-Impact, Lowest-Effort Changes

Ordered by urgency and effort. Effort estimates assume familiarity with the codebase.

---

### 1. Add Missing @hono/node-server to package.json (5 min)

**Impact**: The Node.js dev server (`server/index.ts`) imports `@hono/node-server` on line 1, but this package is not listed in `package.json`. Running `npm install && npx tsx server/index.ts` will crash with a module-not-found error. No one can run the dev server.

**What to do**: Run `npm install @hono/node-server`. Also add `tsx` as a dev dependency (`npm install -D tsx`) and restore the dev script in package.json:
```json
"scripts": {
  "dev": "tsx server/index.ts",
  "deploy": "wrangler deploy"
}
```

**Files**: `package.json`

---

### 2. Sync worker.ts with routes.ts — Add 10 Missing Page Routes (45 min)

**Impact**: The production Cloudflare Workers deployment will 404 on 10 pages. Three of these are legal pages (`/privacy-policy`, `/terms`, `/gdpr-cookie-policy`) linked from the footer of **every page** on the site. Every visitor can click a broken link.

**What to do**: Add the 10 missing imports and route registrations to `worker.ts`:

Missing imports (add to the import block at top of worker.ts):
```typescript
import {
  renderPrivacyPolicyPage,
  renderTermsPage,
  renderGdprCookiePolicyPage,
  renderFaqSupportPage,
  renderDashboardPage,
  renderVideoPlayerPage,
  renderPartnersPage,
  renderPublishersPage,
  renderAdvertisersPage,
  renderTrustCompliancePage,
} from "./server/template";
```

Missing routes (add inside the route registration section):
```typescript
app.get("/privacy-policy", (c) => c.html(renderPrivacyPolicyPage()));
app.get("/terms", (c) => c.html(renderTermsPage()));
app.get("/gdpr-cookie-policy", (c) => c.html(renderGdprCookiePolicyPage()));
app.get("/support", (c) => c.html(renderFaqSupportPage()));
app.get("/dashboard", (c) => c.html(renderDashboardPage()));
app.get("/solutions/video-player", (c) => c.html(renderVideoPlayerPage()));
app.get("/partners", (c) => c.html(renderPartnersPage()));
app.get("/publishers", (c) => c.html(renderPublishersPage()));
app.get("/advertisers", (c) => c.html(renderAdvertisersPage()));
app.get("/trust", (c) => c.html(renderTrustCompliancePage()));
```

**Files**: `worker.ts`

---

### 3. Fix Blog Category Filters (15 min)

**Impact**: The blog page has category filter buttons that visually respond to clicks but never actually filter posts. The Alpine.js state management and button toggle logic already work. The only missing piece is connecting the state to the DOM.

**What to do**: In `server/template.ts` in the `renderBlogPage()` function (~line 1994):

1. Move the `x-data="{ activeCategory: '' }"` attribute to a parent `<div>` that wraps both the filter buttons AND the post grid
2. Add `x-show="!activeCategory || activeCategory === '${post.category}'"` to each blog post `<article>` element

The buttons already set `activeCategory` correctly. They just need the posts to respond to the state.

**Files**: `server/template.ts` (renderBlogPage function, ~line 1994)

---

### 4. Fix Support Form Schema Mismatch (15 min)

**Impact**: The FAQ & Support page at `/support` has a form that submits to `/api/contact` but sends wrong field names. It sends `website` (not in schema) and `monthlyPageviews` (not in schema) instead of `impressions` (required by schema). The form will always fail Zod validation, and users see an unhelpful error.

**What to do**: In `server/template.ts` in `renderFaqSupportPage()` (~line 3892), find the fetch body around lines 4014-4021. Change:
- Remove `website: ''` — not in the Zod schema
- Change `monthlyPageviews: ''` to `impressions: 'Support Request'` (or map it from another field)
- Ensure `company` has a value (required by schema) — default to `'N/A'` if the support form doesn't collect company name

**Files**: `server/template.ts` (renderFaqSupportPage function, ~lines 4014-4021)

---

### 5. Generate a Lockfile (2 min)

**Impact**: No `package-lock.json` exists. Different `npm install` runs on different machines or at different times can resolve to different dependency versions. Builds are not reproducible.

**What to do**: Run `npm install` and commit the generated `package-lock.json`.

**Files**: `package-lock.json` (generated)

---

### 6. Fix Social Icon Dead Links in Footer (10 min)

**Impact**: LinkedIn and Twitter/X social icons in the footer link to `"#"`. This looks unprofessional. The email icon correctly links to `mailto:contact@hbdr.com`.

**What to do**: In `server/template.ts` in `renderFooter()` (~line 661), either:
- Replace `href="#"` with actual HBDR company social profile URLs (if they exist)
- Or remove the LinkedIn and Twitter icons entirely

**Files**: `server/template.ts` (renderFooter function, ~line 661)

---

### 7. Remove HTMX CDN Load (5 min)

**Impact**: Every page loads the HTMX library (~14KB gzipped) from a CDN, but there are **zero** `hx-*` attributes anywhere in the codebase. It's dead weight on every page load.

**What to do**: In `server/template.ts` in `renderHead()`, remove the HTMX `<script>` tag from the CDN includes.

**Files**: `server/template.ts` (renderHead function, early lines)

---

### 8. Fix OG Image and Add Basic SEO Files (45 min)

**Impact**: Social media shares show no preview image because `og:image` uses a relative URL that crawlers can't resolve. There's no `sitemap.xml` or `robots.txt`, which means search engines can't efficiently discover and index the 26 pages.

**What to do**:
1. Add a `SITE_URL` environment variable (default `http://localhost:5000`)
2. Prepend it to `og:image` and `og:url` in `renderHead()` to make absolute URLs
3. Add a `GET /sitemap.xml` route that generates XML with all 26 page URLs
4. Add a `GET /robots.txt` route that allows all crawlers and blocks `/admin/*`
5. Add both routes to `worker.ts` as well

**Files**: `server/template.ts` (renderHead), `server/routes.ts`, `worker.ts`, `wrangler.toml`

---

### 9. Clean Up Orphaned Files (10 min)

**Impact**: Orphaned configuration files and directories confuse anyone reading the project. They suggest tech stack components (shadcn/ui, Replit, Vite) that aren't actually used.

**What to do**: Delete these files:
- `components.json` — shadcn/ui config referencing non-existent paths
- `client/` directory — contains only an orange non-HBDR favicon
- `script/build.ts` — references removed packages (Vite, Express, Passport, pg)
- `.upm/` directory — Replit package manager cache

**Files**: `components.json`, `client/`, `script/build.ts`, `.upm/`

---

### 10. Fix tsconfig.json Phantom References (5 min)

**Impact**: `tsconfig.json` includes `"client/src/**/*"` in its file list and references `"vite/client"` in compilerOptions.types. Neither exists. This causes spurious type-check errors and misleads developers about the project structure.

**What to do**: Remove `"client/src/**/*"` from the `include` array. Remove `"vite/client"` from `compilerOptions.types`. These are leftovers from the removed React/Vite stack.

**Files**: `tsconfig.json`

---

## Time Bombs (Things That Will Break Soon)

### 0. Worker.ts is 10 Pages Behind = Broken Production Deploy
The worker.ts file does not have 10 new page routes that exist in routes.ts. If deployed, legal pages linked from every page's footer will 404. **Fix before any deployment.**

### 1. No Admin Auth = Public Blog Vandalism
The blog admin panel is at `/admin/blog` with zero authentication. Bots and bad actors can delete all posts, inject malicious HTML, or spam fake posts. **Fix before any public deployment.**

### 2. In-Memory Storage + Workers = Constant Data Loss
Cloudflare Workers are evicted after minutes of inactivity. All user-created content vanishes on eviction. Blog posts reset to seed data. Contact leads disappear permanently. There is no email forwarding, no webhook, no database — leads are silently lost.

### 3. Tailwind Play CDN is Not for Production
The site uses Tailwind's Play CDN (`cdn.tailwindcss.com`), which generates styles at runtime in the browser. It is explicitly documented as "for development and prototyping only." It adds latency, increases page weight, and could break if the CDN has issues.

### 4. Missing @hono/node-server Blocks All Dev Work
The Node.js dev server cannot start without this package. Anyone who clones the repo and runs `npm install` will be unable to develop locally.

---

## 90% Done — Just Needs a Small Push

### Blog Category Filtering
The UI is complete: filter buttons exist, they toggle Alpine.js state, they have active/inactive styling. The only missing piece is a single `x-show` attribute on each blog post card. One-line template change per card.

### Cloudflare Workers Deployment
`wrangler.toml` is configured. Static assets are in `public/`. The deploy command works (`npm run deploy`). **Three blockers**: (1) worker.ts missing 10 page routes, (2) no admin auth, (3) support form will always fail.

### Schema for Persistent Storage
`shared/schema.ts` already defines PostgreSQL table schemas for `blog_posts` and `contact_leads` via Drizzle ORM. The `IStorage` interface in `storage.ts` defines the exact method signatures any storage implementation needs. Swapping in a real database requires implementing a new class that satisfies `IStorage`.
