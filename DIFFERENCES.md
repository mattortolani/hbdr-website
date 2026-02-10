# DIFFERENCES.md

## Changes Between Assessments

This document catalogs all differences between the initial codebase assessment and the current state. It serves as a changelog for understanding what changed, what was added, what was removed, and what new issues were discovered.

---

## Assessment Timeline

- **Assessment 1** (initial): 16-page site with ~70 npm dependencies
- **Assessment 2** (second pass): 26-page site, same ~70 dependencies, worker.ts drift discovered
- **Assessment 3** (current — this document): 26-page site, dependencies drastically cleaned to 8, multiple new issues found

---

## Major Changes Since Assessment 2

### package.json — Dramatic Cleanup

**Before** (Assessment 2): ~70 dependencies including React, 20+ Radix UI packages, Express, Passport, connect-pg-simple, Drizzle-kit, memorystore, Framer Motion, Recharts, Wouter, class-variance-authority, clsx, tailwind-merge, lucide-react, react-hook-form, @hookform/resolvers, neon-serverless, ws, and many more. Package name was `rest-express`.

**After** (Assessment 3):
```json
{
  "name": "hbdr-website",
  "dependencies": {
    "hono": "^4.11.9",
    "zod": "^3.24.2",
    "zod-validation-error": "^3.4.0",
    "drizzle-orm": "^0.39.3",
    "drizzle-zod": "^0.7.0"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20260207.0",
    "wrangler": "^4.63.0",
    "typescript": "5.6.3"
  }
}
```

Changes:
- Package name: `rest-express` → `hbdr-website`
- Dependencies: ~70 → 5 runtime + 3 dev (total 8)
- Scripts: `dev`, `build`, `check`, `db:push` all removed. Only `"deploy": "wrangler deploy"` remains.
- **New issue created**: `@hono/node-server` was removed along with the unused packages, but it's still actively imported in `server/index.ts`. The dev server is now broken.
- **New issue created**: `tsx` was removed, so there's no way to run the dev script even if it existed.

### package-lock.json — Deleted

**Before**: Lockfile existed (generated from ~70 dependencies)
**After**: No lockfile. Builds are non-reproducible.

### node_modules — Deleted

**Before**: Existed (installed from ~70 dependencies)
**After**: Directory does not exist. Nothing is installed.

### Scripts Removed

| Script | Was | Now |
|--------|-----|-----|
| `dev` | `tsx server/index.ts` | Removed |
| `build` | `tsx script/build.ts` | Removed |
| `check` | `tsc --noEmit` | Removed |
| `db:push` | `drizzle-kit push` | Removed |
| `deploy` | `wrangler deploy` | Still present |

---

## Changes Since Assessment 1 (Initial → Current)

### New Pages Added (10)

| Page | Route | Template Function | In worker.ts? |
|------|-------|-------------------|---------------|
| Privacy Policy | `/privacy-policy` | `renderPrivacyPolicyPage()` | NO |
| Terms & Conditions | `/terms` | `renderTermsPage()` | NO |
| GDPR & Cookie Policy | `/gdpr-cookie-policy` | `renderGdprCookiePolicyPage()` | NO |
| FAQ & Support | `/support` | `renderFaqSupportPage()` | NO |
| Dashboard | `/dashboard` | `renderDashboardPage()` | NO |
| Video Player Solution | `/solutions/video-player` | `renderVideoPlayerPage()` | NO |
| Partners | `/partners` | `renderPartnersPage()` | NO |
| For Publishers | `/publishers` | `renderPublishersPage()` | NO |
| For Advertisers | `/advertisers` | `renderAdvertisersPage()` | NO |
| Trust & Compliance | `/trust` | `renderTrustCompliancePage()` | NO |

All 10 new pages exist in `routes.ts` but are missing from `worker.ts`.

### Navigation Expanded

**Before**: Solutions dropdown with fewer items, Company dropdown with fewer items
**After**:
- Solutions dropdown: 10 items (added Video Player)
- Company dropdown: 9 items (added Dashboard, Partners, Trust, Support, 3 legal pages)
- Standalone nav links: Publishers, Advertisers, Partners (desktop + mobile)

### Footer Updated

**Before**: Resources and Legal columns had `href="#"` placeholder links
**After**:
- Resources column: 7 real page links (How It Works, Blog, Partners, Dashboard, Publishers, Advertisers, Support)
- Legal column: 3 real page links (Privacy Policy, Terms, GDPR & Cookie Policy)
- Social icons: LinkedIn and Twitter/X still `href="#"` (not fixed)

### template.ts Growth

**Before**: ~3500 lines (16 pages)
**After**: 5212 lines (26 pages) — grew by ~1700 lines

### Font Change

**Before**: Inter (sans-serif) loaded from Google Fonts
**After**: Figtree (sans-serif) + Instrument Serif (serif) loaded from Google Fonts. Inter is no longer referenced.

### data-testid Attributes Added

New pages include `data-testid` attributes on interactive elements and key sections. Original pages do not have these consistently. No test framework exists to use them.

---

## Issues Status Tracker

### Issues Present in Assessment 1, Still Present

| Issue | Status |
|-------|--------|
| No auth on `/admin/blog` | Still broken |
| In-memory storage (no persistence) | Still broken |
| Blog category filters broken | Still broken |
| sanitizeHtml() is regex-based and bypassable | Still broken |
| No automated tests | Still no tests |
| No CI/CD pipeline | Still none |
| No error pages (404, 500) | Still none |
| No rate limiting | Still none |
| No CSRF protection | Still none |
| OG image uses relative URL | Still broken |
| No sitemap.xml | Still missing |
| No robots.txt | Still missing |

### Issues Present in Assessment 2, Still Present

| Issue | Status |
|-------|--------|
| worker.ts missing 10 page routes | Still broken (same 10 pages) |
| Support form schema mismatch | Still broken |
| Social icons link to `#` | Still broken (LinkedIn, Twitter/X) |
| sanitizeHtml() duplicated in worker.ts | Still duplicated |

### NEW Issues Found in Assessment 3

| Issue | Severity | Description |
|-------|----------|-------------|
| @hono/node-server missing from package.json | **CRITICAL** | Dev server cannot start. `server/index.ts` line 1 imports it. |
| No package-lock.json | High | Lockfile deleted. Builds non-reproducible. |
| No node_modules | High | Dependencies not installed. Nothing runs. |
| No dev script in package.json | High | `"dev"` script removed. No documented way to start dev server. |
| tsx not in package.json | High | TypeScript executor removed. Can't run `server/index.ts` directly. |
| HTMX loaded but never used | Medium | CDN script on every page, zero `hx-*` attributes in codebase. ~14KB wasted per page load. |
| script/build.ts is dead code | Medium | References Vite, Express, Passport, pg — all removed. No script invokes it. |
| Fonts changed from Inter to Figtree + Instrument Serif | Low | Prior docs were wrong about Inter. CSS and CDN links use Figtree/Instrument Serif. |
| Tailwind Play CDN not production-suitable | Medium | Play CDN generates styles at runtime. Documented as "dev only" by Tailwind. |
| tsconfig.json has phantom paths | Low | References `client/src/**/*` and `vite/client` types that don't exist. |
| components.json is orphaned | Low | shadcn/ui config for non-existent paths. |
| client/public/favicon.png is non-HBDR | Low | Orange checkered icon, not HBDR branding. |

### Issues Resolved

| Issue | Resolution |
|-------|-----------|
| ~60 unused npm dependencies | **Resolved**: Cleaned from ~70 to 8 packages. However, @hono/node-server was accidentally removed too. |
| Footer Resources links to `#` | **Resolved**: Now link to real pages. |
| Footer Legal links to `#` | **Resolved**: Now link to Privacy Policy, Terms, GDPR. |
| Package name `rest-express` | **Resolved**: Changed to `hbdr-website`. |

---

## Documentation Updates in Assessment 3

All documentation files were rewritten from scratch to reflect the current state:

| Document | Key Changes |
|----------|-------------|
| ARCHITECTURE.md | Updated dependency count (8 vs ~70), added missing @hono/node-server issue, updated font names, added HTMX-unused finding, updated orphaned files list, comprehensive 21-issue catalog |
| IMPLEMENTATION_SPEC.md | 34-item current state audit, 5 implementation phases, 12 detailed tasks, updated dependency/security audit |
| CLAUDE.md | 15 gotchas (up from 11), new entries for missing @hono/node-server, no lockfile, HTMX unused, fonts changed, dead build script |
| API_REFERENCE.md | Complete rewrite with exact line numbers, request/response examples, validation details |
| DEVELOPMENT.md | Complete rewrite documenting broken dev setup, missing packages, orphaned files |
| DEPLOYMENT.md | Complete rewrite with 3 pre-deployment blockers, deployment caveats, verification checklist |
| QUICK_WINS.md | Rewritten and reordered: 10 items (up from 6), new #1 is missing @hono/node-server |
| DIFFERENCES.md | This file — complete changelog across all 3 assessments |
