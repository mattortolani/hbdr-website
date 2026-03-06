# HBDR Website — Phases B-D Design

## Phase B: SEO

### 1. JSON-LD Structured Data
- Add `Organization` + `WebSite` schema to `renderHead()` in `layout.ts` (all pages)
- Add `BlogPosting` schema to `renderBlogPostPage()` in `blog.ts` (per-post)
- Uses existing metadata: author, date, category, excerpt, coverImage

### Files: `layout.ts`, `blog.ts`

## Phase C: Features

### 2. Cloudflare Web Analytics
- Single `<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token":"..."}'>` in `renderScripts()` in `layout.ts`
- Token sourced from `CF_ANALYTICS_TOKEN` env var, passed through layout options
- Gracefully omitted if token not set

### Files: `layout.ts`, `config.ts`

### 3. Blog Admin: Cover Image URL Input
- Add text input for `coverImage` URL in blog editor form (`admin/blog.ts`)
- Field already exists in schema, Alpine.js state, and rendering templates
- Bridge solution until R2 upload is implemented

### Files: `admin/blog.ts`

### 4. R2 Image Upload + Optimization (SPEC ONLY — implement later)
**Purpose:** Replace URL-only cover images with hosted, optimized images for top PageSpeed scores.

**Architecture:**
- R2 bucket binding in `wrangler.toml` (`BLOG_IMAGES` bucket)
- New API endpoint `POST /api/upload` (admin-authenticated, accepts multipart form data)
- Store originals in R2, serve via Cloudflare Image Transformations
- URL pattern: `/cdn-cgi/image/width=W,format=auto,quality=80/R2_URL`
- Drag-and-drop upload UI in blog editor with preview
- Generate responsive `srcset` (400w, 800w, 1200w) in blog templates
- Proper `<img>` attributes: `loading="lazy"`, `width`/`height`, `fetchpriority="high"` on hero
- Accept formats: JPEG, PNG, WebP (max 5MB)
- Auto-generate slug-based filenames

**New files needed:**
- `server/routes/upload.ts` — Upload endpoint
- Update `wrangler.toml` — R2 binding
- Update `admin/blog.ts` — Drag-and-drop UI
- Update `blog.ts` — Responsive `srcset` rendering

### 5. Disposable Email Domain Blocking
- Blocklist of ~100 known disposable email domains (mailinator, guerrillamail, tempmail, etc.)
- Check in `/api/contact` handler after Zod validation, before storage
- Return user-friendly error message
- Blocklist as a Set in a dedicated module for easy maintenance

### Files: `server/middleware/email-blocklist.ts`, `api.ts`

## Phase D: Tech Debt

### 6. Admin Layout Dedup
- `admin/leads.ts` has a separate `renderAdminLayout` duplicating styles from `layout.ts`
- Refactor admin pages to use `renderLayout()` from `layout.ts` directly
- Admin-specific additions (if any) via bodyContent composition

### Files: `admin/leads.ts`, `admin/blog.ts`

### 7. Blog Editor Live Preview
- Side-by-side preview panel in blog editor
- Alpine.js reactive rendering of content textarea
- Uses `prose-content` styles from `src/styles/main.css`
- Toggle between edit/preview/split views

### Files: `admin/blog.ts`

### 8. Rate Limiter Persistence (D1)
- New `rate_limits` table: `ip TEXT, count INTEGER, window_start INTEGER`
- Replace in-memory Map in `rate-limit.ts` with D1 queries
- Clean up expired entries on each check (or periodic batch)
- Storage interface gets `checkRateLimit()` and `incrementRateLimit()` methods

### Files: `server/middleware/rate-limit.ts`, `migrations/0002_rate_limits.sql`, `server/services/storage.ts`, `server/services/d1Storage.ts`, `server/services/mem-storage.ts`
