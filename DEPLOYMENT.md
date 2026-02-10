# DEPLOYMENT.md

## Current Deployment Target

**Cloudflare Workers** via Wrangler CLI.

Worker name: `hbdr-website`
Config file: `wrangler.toml`

---

## Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. Node.js 20.x+ and npm 10.x+
3. Wrangler CLI (installed as project devDependency)

---

## CRITICAL: Pre-Deployment Blockers

Before deploying, these issues **must** be resolved or the production site will be broken:

### 1. worker.ts is 10 Pages Behind routes.ts

The Cloudflare Workers entry point (`worker.ts`) only has 16 of 26 page routes. The following pages will **404 in production**:

- `/privacy-policy` — linked from every page's footer
- `/terms` — linked from every page's footer
- `/gdpr-cookie-policy` — linked from every page's footer
- `/support`
- `/dashboard`
- `/solutions/video-player`
- `/partners`
- `/publishers`
- `/advertisers`
- `/trust`

The three legal pages are the most critical — they're linked from the footer of **every single page** on the site.

**Fix**: Add the 10 missing imports and route registrations to `worker.ts` to match `routes.ts`.

### 2. No Admin Authentication

The blog admin panel at `/admin/blog` is publicly accessible. Anyone can create, edit, and delete blog posts. The blog API endpoints (`POST /api/blog`, `PUT /api/blog/:id`, `DELETE /api/blog/:id`) and the contact leads endpoint (`GET /api/contact`) are also unauthenticated.

**Fix**: Implement basic auth or equivalent before any public deployment.

### 3. @hono/node-server Missing (Dev Only)

This doesn't affect Workers deployment, but `@hono/node-server` is missing from `package.json`. The Node.js dev server (`server/index.ts`) won't start without it. This only blocks local development, not Cloudflare deployment.

---

## Step-by-Step Deploy

### First-Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Login to Cloudflare
npx wrangler login
# This opens a browser for OAuth. Authorize the CLI.

# 3. Verify login
npx wrangler whoami
```

### Deploy

```bash
npm run deploy
# or equivalently:
npx wrangler deploy
```

This:
1. Compiles `worker.ts` using Wrangler's built-in esbuild bundler
2. Uploads static assets from `public/` directory (configured in `wrangler.toml [assets]`)
3. Deploys the Worker to Cloudflare's edge network

**Output**: URL like `https://hbdr-website.<your-subdomain>.workers.dev`

### Custom Domain Setup

1. Add your domain to Cloudflare DNS (if not already)
2. In Cloudflare dashboard: **Workers & Pages** > `hbdr-website` > **Settings** > **Domains & Routes**
3. Add your custom domain (e.g., `hbdr.com`)
4. Cloudflare handles SSL automatically

---

## wrangler.toml Configuration

```toml
name = "hbdr-website"
main = "worker.ts"
compatibility_date = "2025-01-29"

[assets]
directory = "./public"
```

Key points:
- `main` points to `worker.ts` (NOT `server/index.ts`)
- Static assets served from `public/` directory
- No environment variables configured
- No KV namespaces, D1 databases, or other Workers bindings
- TypeScript compiled using `tsconfig.worker.json` (separate from main `tsconfig.json`)

---

## What Gets Deployed vs What Doesn't

### Deployed (via worker.ts)
- All route handlers defined in `worker.ts` (currently 16 of 26 pages)
- All API endpoints (contact, blog CRUD)
- Static assets from `public/` directory
- `sanitizeHtml()` function (duplicated from routes.ts)
- Storage interface and MemStorage class

### NOT Deployed
- `server/index.ts` — Node.js entry point, not used in Workers
- `server/routes.ts` — Node.js routes, worker.ts has its own copy
- `script/build.ts` — Orphaned build script, not referenced anywhere
- `attached_assets/` — Source branding files, not in `public/`
- `client/` — Orphaned directory with only a non-HBDR favicon

### Deployed but Broken
- 10 page routes that exist in `routes.ts` but NOT in `worker.ts` (see blocker #1)
- Blog admin panel — works but has zero authentication
- Support form — submits but always fails validation (schema mismatch)

---

## Environment Variables

### Current State: None

The application has **no environment variables**. All configuration is hardcoded. No `[vars]` section in `wrangler.toml`. No `.dev.vars` file.

### Planned (After Auth Implementation)

For Cloudflare Workers secrets:
```bash
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put SITE_URL
```

For local development, create a `.dev.vars` file (already in `.gitignore`):
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-dev-password
SITE_URL=http://localhost:5000
```

For production `wrangler.toml` vars (non-secret):
```toml
[vars]
ENVIRONMENT = "production"
SITE_URL = "https://hbdr.com"
```

---

## Static Assets

### public/ Directory (Workers Assets)

This is what Cloudflare serves. Currently contains:
- Logo files (SVG, PNG)
- Favicon
- Any other assets needed in production

### attached_assets/ Directory (Source Files Only)

This directory contains source branding materials (logo specs, content documents). It is:
- Served by the Node.js dev server via the `/assets/:filename` route in `routes.ts`
- **NOT** served by Cloudflare Workers (no `/assets/:filename` route in `worker.ts`)
- **NOT** uploaded to Cloudflare (not in `public/`)

If any attached_asset is needed in production, copy it to `public/assets/` and reference it from there.

---

## Rollback Procedure

Cloudflare Workers supports instant rollback:

1. Go to Cloudflare dashboard > **Workers & Pages** > `hbdr-website`
2. Click **Deployments** tab
3. Find the previous working deployment
4. Click **Rollback to this deployment**

Or via CLI:
```bash
# List recent deployments
npx wrangler deployments list

# Rollback to a specific deployment
npx wrangler rollback <deployment-id>
```

---

## Verification Checklist

After deploying, verify:

**Critical (will be broken if worker.ts not synced):**
- [ ] `/privacy-policy` loads (linked from every page footer)
- [ ] `/terms` loads (linked from every page footer)
- [ ] `/gdpr-cookie-policy` loads (linked from every page footer)
- [ ] `/support` loads
- [ ] `/dashboard` loads
- [ ] `/solutions/video-player` loads
- [ ] `/partners` loads
- [ ] `/publishers` loads
- [ ] `/advertisers` loads
- [ ] `/trust` loads

**Standard verification:**
- [ ] Homepage loads at the deployed URL
- [ ] Navigation works (all page links in Solutions and Company dropdowns)
- [ ] Contact form submits successfully at `/contact`
- [ ] Blog listing shows seeded posts at `/blog`
- [ ] Individual blog post pages load at `/blog/:slug`
- [ ] Static assets load (logo in nav, favicon)
- [ ] Mobile responsive (test on phone or DevTools)
- [ ] Solution pages load (check 2-3 from the dropdown)
- [ ] Blog admin panel loads at `/admin/blog` (but should be behind auth before public deploy)

---

## Known Deployment Caveats

1. **Data resets on every deploy**: In-memory storage means all user-created blog posts and contact leads are lost on each deployment. Only the 5 seeded blog posts will reappear.

2. **Data resets on Worker eviction**: Cloudflare Workers are evicted after minutes of inactivity. When a fresh instance starts, all user-created data vanishes. This is more aggressive than restart-on-deploy — it happens continuously.

3. **Contact leads disappear silently**: Form submissions are stored in memory and never forwarded anywhere (no email, no webhook, no database). A potential customer fills out the form, sees "Message Sent!", and assumes someone will respond. The lead evaporates.

4. **worker.ts is 10 pages behind routes.ts (CRITICAL)**: See pre-deployment blocker #1 above. Legal pages linked from every footer will 404.

5. **No staging environment**: No staging deployment exists. All deploys go directly to production.

6. **CDN dependencies**: Tailwind CSS (Play CDN), Alpine.js, DaisyUI, and Google Fonts are loaded from external CDNs. If any CDN goes down, the site's styling and interactivity break. Tailwind Play CDN specifically is not recommended for production — it generates styles on-the-fly in the browser.

7. **No build step validation**: There's no type checking, linting, or testing in the deploy pipeline. `npm run deploy` just runs `wrangler deploy` directly. Broken code can be deployed without warning.

8. **script/build.ts is dead code**: The `script/build.ts` file references packages (Vite, Express, Passport, pg) that are no longer installed. It is not invoked by any script in package.json. Wrangler handles its own bundling.

9. **No lockfile**: `package-lock.json` does not exist. `npm install` on different machines or at different times may resolve to different dependency versions.
