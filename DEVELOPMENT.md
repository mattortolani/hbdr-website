# DEVELOPMENT.md

## Local Setup From Zero

### Prerequisites

- Node.js 20.x or later
- npm 10.x or later

### Installation

```bash
git clone <repo-url>
cd hbdr-website
npm install
```

**CRITICAL**: `npm install` will fail to provide a working dev server. The Node.js dev server imports `@hono/node-server` (in `server/index.ts` line 1), but this package is **not listed in package.json**. You must add it manually:

```bash
npm install @hono/node-server
```

Additionally, there is **no lockfile** (`package-lock.json` was deleted). The first `npm install` will generate a fresh one. Pin it immediately by committing the generated lockfile.

### Running the Dev Server

The dev server requires `tsx` (TypeScript executor), which is also **not in package.json**. There is no `dev` script defined — only `"deploy": "wrangler deploy"` exists.

To run the dev server:

```bash
# Install missing runtime dependency
npm install @hono/node-server

# Install tsx as a dev dependency
npm install -D tsx

# Run the dev server
npx tsx server/index.ts
```

Opens at `http://localhost:5000`. No hot reload — restart the server after code changes.

### Running the Cloudflare Workers Dev Server

```bash
npx wrangler dev
```

This starts a local Workers-compatible server. Requires a Cloudflare account (run `npx wrangler login` first). This is the more reliable local dev path since `wrangler` IS in package.json.

### TypeScript Checking

There is no `check` script in package.json. To type-check:

```bash
npx tsc --noEmit
```

**Warning**: `tsconfig.json` references phantom paths (`client/src/**/*`) and phantom types (`vite/client`) that don't exist. Type checking may produce errors from stale config, not from actual code issues.

---

## Current package.json State

```json
{
  "name": "hbdr-website",
  "version": "1.0.0",
  "type": "module",
  "private": true,
  "scripts": {
    "deploy": "wrangler deploy"
  },
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

### What's Missing

| Package | Why It's Needed | Where It's Imported |
|---------|----------------|---------------------|
| `@hono/node-server` | Node.js HTTP adapter for Hono | `server/index.ts` line 1 |
| `tsx` | TypeScript execution for dev server | Was `npm run dev` script target |

### What's Installed But Only Used at Schema Level

| Package | Status |
|---------|--------|
| `drizzle-orm` | Only used to define pgTable schemas in `shared/schema.ts`. No database connection exists. |
| `drizzle-zod` | Only used to generate Zod schemas from Drizzle table definitions. Works fine standalone. |
| `zod-validation-error` | Imported in `routes.ts` and `worker.ts` for `fromZodError()`. Actively used. |

### What Was Removed (From Prior ~70 Dependencies)

React, 20+ Radix UI packages, Express, Passport, connect-pg-simple, Drizzle-kit, memorystore, Framer Motion, Recharts, Wouter, class-variance-authority, clsx, tailwind-merge, lucide-react, react-hook-form, @hookform/resolvers, neon-serverless, ws, and ~40 more. The cleanup was thorough — only 5 runtime + 3 dev dependencies remain.

---

## Dev Workflow

### Adding a New Page

1. Open `server/template.ts`
2. Add a new `export function renderMyNewPage(): string` function
3. Use `renderLayout()` to wrap your content with the standard head/nav/footer:
   ```typescript
   export function renderMyNewPage(): string {
     const content = `
       ${renderPageHero("Tag", "Page Title", "Page description.")}
       <!-- your content here -->
       ${renderCTASection("CTA heading", "Button Text")}
     `;
     return renderLayout({
       title: "My Page - HBDR",
       description: "Page meta description for SEO.",
       canonicalPath: "/my-page",
       bodyContent: content,
     });
   }
   ```
4. Open `server/routes.ts`
5. Add the import and route:
   ```typescript
   import { renderMyNewPage } from "./template";
   // ...inside registerRoutes():
   app.get("/my-page", (c) => c.html(renderMyNewPage()));
   ```
6. **CRITICAL**: Also add the same import + route to `worker.ts`. Routes are duplicated between these two files. **worker.ts is currently 10 pages behind routes.ts** — do not let this gap grow further.
7. Add the page to navigation in `renderNav()` and/or footer in `renderFooter()` in `template.ts`

### Modifying API Endpoints

1. Edit the route handler in `server/routes.ts`
2. **IMPORTANT**: Apply the same change to `worker.ts` (routes are duplicated)
3. If adding new data, update the schema in `shared/schema.ts`
4. If adding new storage methods, update the `IStorage` interface and `MemStorage` class in `server/storage.ts`
5. If changing validation, update the Zod schema refinements in the route handler

### Working with template.ts (5212 Lines)

The entire UI lives in one file. Navigation tips:

| Function | Approx Line | Purpose |
|----------|-------------|---------|
| `renderHead()` | 1 | `<head>` with CSS, meta, CDN links |
| `renderNav()` | 536 | Navigation bar with dropdowns |
| `renderFooter()` | 661 | Footer with columns and social icons |
| `renderScripts()` | 750 | Alpine.js init, scroll animations |
| `renderLayout()` | 774 | Composition wrapper (head + nav + content + footer + scripts) |
| `renderContactFormSection()` | 791 | Reusable contact form with Alpine.js |
| `renderPage()` | 1046 | Homepage |
| `renderBlogPage()` | 1994 | Blog listing (category filters broken) |
| `renderBlogAdminPage()` | 2133 | Blog admin (NO AUTH) |
| `renderPrivacyPolicyPage()` | 3473 | Privacy Policy |
| `renderTermsPage()` | 3596 | Terms & Conditions |
| `renderGdprCookiePolicyPage()` | 3710 | GDPR & Cookie Policy |
| `renderFaqSupportPage()` | 3892 | FAQ & Support (schema mismatch) |
| `renderDashboardPage()` | 4108 | Dashboard |
| `renderVideoPlayerPage()` | 4256 | Video Player solution |
| `renderPartnersPage()` | 4428 | Partners (45 named) |
| `renderPublishersPage()` | 4587 | Publishers |
| `renderAdvertisersPage()` | 4809 | Advertisers |
| `renderTrustCompliancePage()` | 4994 | Trust & Compliance |

### Working with the Design System

Key CSS classes (defined in `renderHead()` `<style>` block, lines 49-530):

| Class | Usage |
|-------|-------|
| `glass-card` | Frosted glass container with blur, border, hover lift |
| `glass-btn` | Primary green gradient pill button |
| `glass-btn-outline` | Secondary transparent outline pill button |
| `glass-input` | Form input with glass background and green focus ring |
| `glass-select` | Dropdown select with glass styling |
| `glass-tag` | Small pill label (green tint) |
| `glass-nav` | Fixed top navigation bar with blur |
| `text-gradient` | White-to-gray gradient text |
| `text-gradient-accent` | Green gradient text |
| `liquid-gradient` | Background with radial green gradients |
| `animate-on-scroll` | Fade-in-up on scroll (via IntersectionObserver) |
| `stagger-1` through `stagger-6` | Delay for staggered animations |
| `section-divider` | Subtle horizontal line between sections |

### Reusable Template Components

| Function | Purpose |
|----------|---------|
| `renderLayout(options)` | Wraps content with full HTML document (head, nav, footer, scripts) |
| `renderPageHero(tag, title, description)` | Standard page hero section with orbs and gradient |
| `renderStatsSection()` | Stats grid (1T+ ads, 50%+ revenue, etc.) |
| `renderCTASection(heading, buttonText)` | Call-to-action section with centered heading and button |
| `renderContactFormSection()` | Full contact form with Alpine.js state management |

### Fonts

The site uses **Figtree** (sans-serif, body text) and **Instrument Serif** (serif, decorative headings) loaded from Google Fonts CDN. Prior documentation incorrectly stated Inter — that was changed.

---

## How to Test

There are **no automated tests**. No test framework is installed. No `test` script exists in package.json.

Manual testing checklist:

1. Start the dev server (see setup instructions above)
2. Visit each page in a browser — all 26 routes
3. Test the contact form at `/contact` — should submit to `/api/contact`
4. Test the blog admin at `/admin/blog` (create, edit, delete posts) — **no auth required**
5. Test mobile responsiveness using browser DevTools
6. Test the blog listing category filters at `/blog` — **known broken** (buttons toggle but posts don't filter)
7. Test legal pages: `/privacy-policy`, `/terms`, `/gdpr-cookie-policy`
8. Test the support form at `/support` — **known broken** (sends wrong fields to API, will fail Zod validation)
9. Test audience pages: `/publishers`, `/advertisers`, `/partners`
10. Test navigation Company dropdown and mobile nav submenus
11. Test Solutions dropdown — should show all 10 solution pages
12. Test `/dashboard` — should show link to dashboard.hbdr.com
13. Test `/trust` — should show compliance certifications

---

## How to Debug

### Server Errors
- Check the terminal output — Hono logger middleware logs all requests with method, path, status, and timing
- API errors logged via `console.error` with the error object
- Zod validation errors are caught and returned as structured JSON with field-level error messages

### Template Issues
- Template functions return HTML strings — `console.log()` the output to see generated HTML
- Alpine.js errors appear in browser DevTools console
- CSS issues: check the `<style>` block in `renderHead()` (template.ts lines 49-530)
- Tailwind classes: using Play CDN (generates styles on-the-fly in browser)

### Storage Issues
- `MemStorage` is a plain JavaScript Map — add `console.log(this.blogPosts)` to debug
- Data resets on server restart (by design — no persistence)
- Blog posts are seeded in `MemStorage.seedBlogPosts()` (storage.ts line 43)
- Contact leads start empty — no seeded data

### Worker Issues
- Run `npx wrangler dev` to test Workers locally
- Check wrangler output for build/runtime errors
- Remember: worker.ts is **10 pages behind** routes.ts — if a page 404s in wrangler but works in Node.js dev, it's probably a missing route in worker.ts

---

## Project Conventions

- **TypeScript strict mode** enabled (in tsconfig.json)
- **ES modules** (`"type": "module"` in package.json)
- **Template literals** for HTML generation (no JSX, no template engine)
- **Hono context** (`c`) for request/response handling
- **Zod** for all input validation
- **`data-testid`** attributes on interactive elements and key sections (for future E2E tests, no framework exists yet)
- **No semicolons** enforced (but used inconsistently in existing code)
- **No linter** configured (no ESLint, no Prettier)
- **No formatter** configured
- **No pre-commit hooks**

---

## Orphaned Files (Safe to Delete)

| File/Directory | Why It's Orphaned |
|---------------|-------------------|
| `components.json` | shadcn/ui config — references paths that don't exist, shadcn not installed |
| `client/public/favicon.png` | Orange checkered icon — not HBDR branding, not referenced anywhere |
| `script/build.ts` | Build script referencing Vite, Express, Passport, pg — all removed from package.json |
| `.upm/store.json` | Replit package manager cache — not relevant outside Replit |

---

## Node_modules and Lockfile Status

As of this assessment:

- **No `node_modules/` directory exists** — dependencies are not installed
- **No `package-lock.json` exists** — lockfile was explicitly deleted
- Running `npm install` will generate both, but the dev server will still fail without adding `@hono/node-server`
