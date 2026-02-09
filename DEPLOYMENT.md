# DEPLOYMENT.md

## Current Deployment Target

**Cloudflare Workers** via Wrangler CLI.

Worker name: `hbdr-website`
Config file: `wrangler.toml`

---

## Prerequisites

1. [Cloudflare account](https://dash.cloudflare.com/sign-up)
2. Node.js 20.x+ and npm 10.x+
3. Wrangler CLI (installed as project dependency)

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
npx wrangler deploy
```

This:
1. Compiles `worker.ts` using the `tsconfig.worker.json` TypeScript config
2. Uploads static assets from `public/` directory
3. Deploys the Worker to Cloudflare's edge network

**Output**: URL like `https://hbdr-website.<your-subdomain>.workers.dev`

### Custom Domain Setup

1. Add your domain to Cloudflare DNS (if not already)
2. In Cloudflare dashboard: **Workers & Pages** > `hbdr-website` > **Settings** > **Domains & Routes**
3. Add your custom domain (e.g., `hbdr.com`)
4. Cloudflare handles SSL automatically

---

## Environment Variables

### Current (None Required)
The application currently has no environment variables. All configuration is hardcoded.

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

- [ ] Homepage loads at the deployed URL
- [ ] Navigation works (all page links)
- [ ] Contact form submits successfully
- [ ] Blog listing shows seeded posts
- [ ] Individual blog post pages load
- [ ] Static assets load (logo in nav, favicon)
- [ ] Mobile responsive (test on phone or DevTools)
- [ ] Solution pages load (check 2-3 from the dropdown)

---

## Known Deployment Caveats

1. **Data resets on every deploy**: In-memory storage means all user-created blog posts and contact leads are lost on each deployment. Seeded blog posts will reappear.
2. **worker.ts duplicates routes**: If you changed routes in `routes.ts` but forgot to update `worker.ts`, the deployed Worker will not reflect those changes.
3. **No staging environment**: There is no staging deployment. All deploys go directly to production.
4. **Cold start latency**: Cloudflare Workers have a small cold-start penalty. The first request after idle may be slower.
5. **Static assets directory**: Workers serve files from `public/` (configured in `wrangler.toml [assets]`). Dev server serves from `attached_assets/` via the `/assets/:filename` route. Make sure needed assets exist in both locations.
