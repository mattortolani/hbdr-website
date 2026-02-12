# API_REFERENCE.md

## Overview

All routes are defined in `server/routes.ts` (Node.js dev) and **partially** duplicated in `worker.ts` (Cloudflare Workers -- missing 10 page routes).

Base URL: `http://localhost:5000` (dev) or `https://hbdr-website.<subdomain>.workers.dev` (production)

---

## Page Routes

All page routes return `200 text/html` with a complete HTML document.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Homepage (hero, solutions, comparison, testimonials, stats) |
| GET | `/about` | About Us (mission, timeline, values) |
| GET | `/how-it-works` | How It Works (3-step process, FAQs) |
| GET | `/careers` | Careers (benefits, positions) |
| GET | `/press` | Press & News (releases, media contact) |
| GET | `/contact` | Contact (form with Alpine.js) |
| GET | `/solutions/header-bidding` | Header Bidding solution page |
| GET | `/solutions/display-ads` | Display Ads solution page |
| GET | `/solutions/video-player` | Video Player solution page |
| GET | `/solutions/ctv-ott` | CTV & OTT solution page |
| GET | `/solutions/in-app-ads` | In-App Ads solution page |
| GET | `/solutions/mcm` | MCM solution page |
| GET | `/solutions/manage-account` | Manage Account solution page |
| GET | `/solutions/manage-inventory` | Manage Inventory solution page |
| GET | `/solutions/open-bidding` | Open Bidding solution page |
| GET | `/solutions/ad-exchange-adx` | Ad Exchange AdX solution page |
| GET | `/dashboard` | Analytics Dashboard (links to dashboard.hbdr.com) |
| GET | `/partners` | Partners & Integrations (45 named partners) |
| GET | `/publishers` | For Publishers (onboarding, FAQs) |
| GET | `/advertisers` | For Advertisers (deal types, brand safety) |
| GET | `/trust` | Trust & Compliance (certs, capabilities) |
| GET | `/privacy-policy` | Privacy Policy (legal page) |
| GET | `/terms` | Terms & Conditions (legal page) |
| GET | `/gdpr-cookie-policy` | GDPR & Cookie Policy (legal page) |
| GET | `/support` | FAQ & Support (15 FAQs + support form) |
| GET | `/blog` | Blog listing (published posts only) |
| GET | `/blog/:slug` | Individual blog post |
| GET | `/admin/blog` | Blog admin panel (**NO AUTH**) |
| GET | `/admin/blog/new` | Blog post editor (new) |
| GET | `/admin/blog/edit/:id` | Blog post editor (edit existing) |

**worker.ts is missing**: `/dashboard`, `/solutions/video-player`, `/partners`, `/publishers`, `/advertisers`, `/trust`, `/privacy-policy`, `/terms`, `/gdpr-cookie-policy`, `/support`

---

## REST API Endpoints

### POST /api/contact

Creates a new contact lead.

**Auth**: None (public)

**Request Body** (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "impressions": "1M-5M",
  "message": "I'm interested in header bidding solutions"
}
```

**Validation** (Zod):
- `name`: string, min 2 chars, required
- `email`: string, valid email format, required
- `company`: string, min 2 chars, required
- `impressions`: string, min 1 char, required
- `message`: string, optional

**Success Response** (200, text/html):
```html
<div id="contact-form-result" class="glass-card p-8 text-center">
  <h3>Message Sent!</h3>
  <p>We'll get back to you within 24 hours.</p>
</div>
```

**Validation Error** (400, application/json):
```json
{
  "message": "Validation error: Name must be at least 2 characters",
  "errors": { "name": ["Name must be at least 2 characters"] }
}
```

**Server Error** (500, text/html): Error card HTML fragment

**Note**: The support form at `/support` submits to this endpoint but sends incorrect fields (`website`, `monthlyPageviews` instead of `impressions`). This will fail validation.

---

### GET /api/contact

Returns all contact leads. **NO AUTH -- PII EXPOSURE RISK.**

**Auth**: None (should require admin auth)

**Response** (200, application/json):
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Acme Corp",
    "impressions": "1M-5M",
    "message": "...",
    "createdAt": "2025-01-15T00:00:00.000Z"
  }
]
```

---

### POST /api/blog

Creates a new blog post.

**Auth**: None (should require admin auth)

**Request Body** (JSON):
```json
{
  "title": "Post Title",
  "slug": "post-title",
  "excerpt": "Short description...",
  "content": "<h2>Content HTML</h2><p>...</p>",
  "author": "Author Name",
  "category": "Industry Trends",
  "coverImage": "https://...",
  "tags": "tag1,tag2",
  "published": "true"
}
```

**Validation** (Zod):
- `title`: string, min 3 chars, required
- `slug`: string, min 3 chars, regex `^[a-z0-9-]+$`, required, must be unique
- `excerpt`: string, min 10 chars, required
- `content`: string, min 20 chars, required (passed through regex sanitizeHtml)
- `author`: string, min 2 chars, required
- `category`: string, min 2 chars, required
- `coverImage`: string, optional
- `tags`: string, optional (comma-separated)
- `published`: string, optional, defaults to `"true"`

**Success** (201, application/json): Full post object with generated id, publishedAt, updatedAt

**Duplicate Slug** (400): `{ "message": "A post with this slug already exists" }`

**Validation Error** (400): `{ "message": "...", "errors": { ... } }`

---

### PUT /api/blog/:id

Updates an existing blog post. All fields are optional (partial update).

**Auth**: None (should require admin auth)

**URL Params**: `id` -- blog post UUID

**Request Body** (JSON): Same fields as POST, all optional

**Success** (200): Updated post object

**Not Found** (404): `{ "message": "Post not found" }`

**Duplicate Slug** (400): If changing slug to one that already exists

---

### DELETE /api/blog/:id

Deletes a blog post.

**Auth**: None (should require admin auth)

**URL Params**: `id` -- blog post UUID

**Success** (200): `{ "message": "Post deleted" }`

**Not Found** (404): `{ "message": "Post not found" }`

---

### GET /assets/:filename

Serves static files from the `attached_assets/` directory.

**Node.js only** -- Workers serve static files via wrangler.toml `[assets]` config.

**Supported MIME types**: `.jpeg`/`.jpg` -> `image/jpeg`, `.png` -> `image/png`, `.svg` -> `image/svg+xml`, `.ico` -> `image/x-icon`, fallback -> `application/octet-stream`

**Cache**: `Cache-Control: public, max-age=86400` (24 hours)

**Not Found** (404): Plain text "Not found"
