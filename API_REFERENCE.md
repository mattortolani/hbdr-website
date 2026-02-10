# API_REFERENCE.md

## Overview

All API endpoints are served by the Hono framework. JSON APIs use `Content-Type: application/json`. Page routes return `Content-Type: text/html`.

**Base URL (dev)**: `http://localhost:5000`
**Base URL (prod)**: `https://hbdr-website.<subdomain>.workers.dev` (or custom domain)

**Authentication**: None. All endpoints are currently public. See IMPLEMENTATION_SPEC.md Task 0-1 for planned auth.

---

## Page Routes

All page routes return `200` with full HTML documents (nav, content, footer).

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Homepage |
| GET | `/about` | About Us |
| GET | `/how-it-works` | How It Works (3-step process + FAQ) |
| GET | `/careers` | Careers (benefits + open positions) |
| GET | `/press` | Press & News (press releases + media contact) |
| GET | `/contact` | Contact page with lead capture form |
| GET | `/blog` | Blog listing (published posts only, sorted by date desc) |
| GET | `/blog/:slug` | Individual blog post (returns 404 if not found or not published) |
| GET | `/admin/blog` | Blog admin panel (lists all posts incl. unpublished) |
| GET | `/admin/blog/new` | Blog post editor (new post) |
| GET | `/admin/blog/edit/:id` | Blog post editor (edit existing post) |
| GET | `/solutions/header-bidding` | Header Bidding solution page |
| GET | `/solutions/display-ads` | Display Ads solution page |
| GET | `/solutions/ctv-ott` | CTV & OTT solution page |
| GET | `/solutions/in-app-ads` | In-App Ads solution page |
| GET | `/solutions/mcm` | MCM solution page |
| GET | `/solutions/manage-account` | Manage Account solution page |
| GET | `/solutions/manage-inventory` | Manage Inventory solution page |
| GET | `/solutions/open-bidding` | Open Bidding solution page |
| GET | `/solutions/ad-exchange-adx` | Ad Exchange AdX solution page |
| GET | `/solutions/video-player` | Video Player solution page |
| GET | `/dashboard` | Analytics Dashboard product page (links to dashboard.hbdr.com) |
| GET | `/partners` | Partners & Integrations (SSP, DSP, identity, compliance, tech) |
| GET | `/publishers` | For Publishers (value props, onboarding, FAQs) |
| GET | `/advertisers` | For Advertisers (deal types, inventory, brand safety) |
| GET | `/trust` | Trust & Compliance (supply chain, anti-fraud, privacy, certs) |
| GET | `/privacy-policy` | Privacy Policy (legal page) |
| GET | `/terms` | Terms & Conditions (legal page) |
| GET | `/gdpr-cookie-policy` | GDPR & Cookie Policy (legal page) |
| GET | `/support` | FAQ & Support (4 FAQ categories + support form) |

---

## REST API Endpoints

### POST /api/contact

Creates a new contact lead.

**Auth**: None (public)
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "name": "John Smith",
  "email": "john@company.com",
  "company": "Acme Publishing",
  "impressions": "10m-50m",
  "message": "Optional message text"
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | Min 2 characters |
| email | string | Yes | Valid email format |
| company | string | Yes | Min 2 characters |
| impressions | string | Yes | Min 1 character (select value) |
| message | string | No | Optional free text |

**Success Response** (200):
Returns HTML fragment (for HTMX/Alpine.js integration):
```html
<div id="contact-form-result" class="glass-card p-8 text-center">
  ...Message Sent!...
</div>
```

**Validation Error** (400):
```json
{
  "message": "Validation error: Name must be at least 2 characters",
  "errors": {
    "name": ["Name must be at least 2 characters"]
  }
}
```

**Server Error** (500):
Returns HTML error fragment.

---

### GET /api/contact

Returns all submitted contact leads.

**Auth**: None (PUBLIC -- security issue, see IMPLEMENTATION_SPEC.md Task 0-3)

**Response** (200):
```json
[
  {
    "id": "uuid-string",
    "name": "John Smith",
    "email": "john@company.com",
    "company": "Acme Publishing",
    "impressions": "10m-50m",
    "message": "Optional message",
    "createdAt": "2025-01-15T00:00:00.000Z"
  }
]
```

**Server Error** (500):
```json
{
  "message": "Internal server error"
}
```

---

### POST /api/blog

Creates a new blog post.

**Auth**: None (security issue -- see IMPLEMENTATION_SPEC.md Task 0-1)
**Content-Type**: `application/json`

**Request Body**:
```json
{
  "title": "My Blog Post Title",
  "slug": "my-blog-post-title",
  "excerpt": "A brief summary of the post content...",
  "content": "<h2>Heading</h2><p>HTML content...</p>",
  "coverImage": "https://example.com/image.jpg",
  "author": "Jane Doe",
  "category": "Industry Trends",
  "tags": "header bidding,programmatic,trends",
  "published": "true"
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| title | string | Yes | Min 3 characters |
| slug | string | Yes | Min 3 chars, lowercase alphanumeric + hyphens only (`/^[a-z0-9-]+$/`) |
| excerpt | string | Yes | Min 10 characters |
| content | string | Yes | Min 20 characters. Accepts HTML (sanitized server-side) |
| coverImage | string | No | URL string |
| author | string | Yes | Min 2 characters |
| category | string | Yes | Min 2 characters |
| tags | string | No | Comma-separated tag list |
| published | string | No | `"true"` or `"false"` (defaults to `"true"`) |

**Success Response** (201):
```json
{
  "id": "uuid-string",
  "title": "My Blog Post Title",
  "slug": "my-blog-post-title",
  "excerpt": "A brief summary...",
  "content": "<h2>Heading</h2><p>Sanitized HTML content...</p>",
  "coverImage": null,
  "author": "Jane Doe",
  "category": "Industry Trends",
  "tags": "header bidding,programmatic,trends",
  "published": "true",
  "publishedAt": "2025-01-15T00:00:00.000Z",
  "updatedAt": "2025-01-15T00:00:00.000Z"
}
```

**Duplicate Slug Error** (400):
```json
{
  "message": "A post with this slug already exists"
}
```

**Validation Error** (400):
```json
{
  "message": "Validation error: ...",
  "errors": { "field": ["error message"] }
}
```

**Server Error** (500):
```json
{
  "message": "Internal server error"
}
```

---

### PUT /api/blog/:id

Updates an existing blog post. Supports partial updates.

**Auth**: None (security issue)
**Content-Type**: `application/json`
**URL Params**: `id` -- the blog post UUID

**Request Body**: Same fields as POST, all optional (partial update).

**Success Response** (200): Updated blog post object (same shape as POST response).

**Not Found** (404):
```json
{
  "message": "Post not found"
}
```

**Duplicate Slug Error** (400):
```json
{
  "message": "A post with this slug already exists"
}
```

---

### DELETE /api/blog/:id

Deletes a blog post.

**Auth**: None (security issue)
**URL Params**: `id` -- the blog post UUID

**Success Response** (200):
```json
{
  "message": "Post deleted"
}
```

**Not Found** (404):
```json
{
  "message": "Post not found"
}
```

---

### GET /assets/:filename

Serves static files from the `attached_assets/` directory (Node.js dev) or `public/assets/` directory (Workers).

**Node.js only** -- Workers serve static files via wrangler.toml `[assets]` config.

**Supported MIME types**: `.jpeg`/`.jpg` -> `image/jpeg`, `.png` -> `image/png`, `.svg` -> `image/svg+xml`, `.ico` -> `image/x-icon`, fallback -> `application/octet-stream`

**Cache**: `Cache-Control: public, max-age=86400` (24 hours)

**Not Found** (404): Plain text "Not found"
