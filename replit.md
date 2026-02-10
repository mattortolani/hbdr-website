# HBDR - Header Bidding & Ad Monetization Solutions

## Overview

HBDR is a marketing/landing page website for a header bidding and ad monetization company. It's a server-rendered multi-page site with an Apple-inspired "liquid glass" aesthetic. The backend uses Hono (Node.js) to serve HTML with Alpine.js for interactivity, HTMX for progressive enhancement, and Tailwind CSS + DaisyUI for styling. The site captures contact form leads with full security (rate limiting, honeypot, input sanitization), stores them in PostgreSQL, sends email notifications via Resend, and includes a full blog with built-in CMS admin panel and a leads management admin panel.

## User Preferences

Preferred communication style: Simple, everyday language.
Design aesthetic: Apple-inspired "liquid glass" / glassmorphism with dark theme, frosted glass cards, subtle gradients, and clean typography.
Brand colors: Mint green accent (#2BDE73), dark green (#1AAF5C), light green (#6CF5A0), dark surface (#0a0a0c), white text on dark backgrounds.
Brand logo: Hexagonal "H" mark in green/white (attached_assets/HBDR_Logo_Pack_all_sizes_-_8*.jpeg for icon, _2*.jpeg for horizontal with text).
Email service: Resend (free tier, 3k emails/month).

## Recent Changes

- **Feb 2026**: Added comprehensive contact form security system
  - PostgreSQL database for persistent lead storage (replaces in-memory)
  - Rate limiting (5 submissions per 15 min per IP)
  - Honeypot field for bot detection (hidden field that traps bots)
  - Input sanitization (HTML entity encoding)
  - IP logging for all form submissions
  - Source tracking (contact form vs support form)
  - Lead status tracking (new, contacted, qualified, converted, archived)
- **Feb 2026**: Built admin panel with authentication
  - Session-based admin auth at /admin/login
  - Leads management dashboard at /admin/leads
  - CSV export for leads
  - Lead status updates via dropdown
  - Message viewing modal
  - Blog admin now requires authentication
- **Feb 2026**: Added email notifications via Resend
  - Sends formatted HTML email to contact@hbdr.com on new leads
  - Includes contact details, company info, impression volume
  - Non-blocking (email errors don't affect form submission)
- **Feb 2026**: Updated SSP partner carousel to 6 rows with 67 partners, Clearbit logos with fallback badges
- **Feb 2026**: Added Cloudflare D1 database for Workers deployment
  - SQLite-based persistent storage on Cloudflare edge
  - D1Storage class implements same IStorage interface as PostgreSQL DatabaseStorage
  - Auto-seeds blog posts on first blog page visit
  - Migration file at migrations/0001_init.sql
  - Database name: hbdr-website-database, ID: 141aed40-1a51-46ac-a795-31e1c913a626

## System Architecture

### Stack
- **Server Framework**: Hono (with @hono/node-server for Node.js runtime)
- **Database**: PostgreSQL (Neon-backed via Replit, Drizzle ORM)
- **Email**: Resend API for lead notifications
- **Interactivity**: Alpine.js (mobile nav, testimonial carousel, contact form state, admin panel)
- **Progressive Enhancement**: HTMX (available for future use)
- **Styling**: Tailwind CSS + DaisyUI (loaded via CDN)
- **Typography**: Figtree + Instrument Serif fonts (Google Fonts CDN)
- **Content**: Server-rendered HTML template (template.ts)

### Backend
- **Runtime**: Node.js with TypeScript (tsx for development)
- **Framework**: Hono
- **API**: REST endpoints
  - `GET /` — homepage
  - `GET /about` — About Us page
  - `GET /how-it-works` — How It Works page
  - `GET /careers` — Careers page
  - `GET /press` — Press & News page
  - `GET /contact` — Contact page (with contact form)
  - `GET /solutions/header-bidding` — Header Bidding solution page
  - `GET /solutions/display-ads` — Display Ads solution page
  - `GET /solutions/ctv-ott` — CTV & OTT solution page
  - `GET /solutions/in-app-ads` — In-App Ads solution page
  - `GET /solutions/mcm` — MCM (Multiple Customer Management) solution page
  - `GET /solutions/manage-account` — Manage Account solution page
  - `GET /solutions/manage-inventory` — Manage Inventory solution page
  - `GET /solutions/open-bidding` — Open Bidding solution page
  - `GET /solutions/ad-exchange-adx` — Ad Exchange AdX solution page
  - `GET /dashboard` — Analytics Dashboard page (links to dashboard.hbdr.com)
  - `GET /solutions/video-player` — Video Player solution page
  - `GET /partners` — Partners & Integrations page (DSPs, SSPs, identity, compliance tech)
  - `GET /publishers` — For Publishers page (onboarding, getting started, FAQ)
  - `GET /advertisers` — For Advertisers page (PMPs, PG deals, direct sales)
  - `GET /trust` — Trust & Compliance page (certifications, capabilities, compliance)
  - `GET /privacy-policy` — Privacy Policy page
  - `GET /terms` — Terms & Conditions page
  - `GET /gdpr-cookie-policy` — GDPR & Cookie Policy page
  - `GET /support` — FAQ & Support page (with support contact form)
  - `GET /blog` — Blog listing page (published posts only)
  - `GET /blog/:slug` — Individual blog post page
  - `GET /admin/login` — Admin login page
  - `GET /admin/logout` — Admin logout
  - `GET /admin/leads` — Leads management panel (auth required)
  - `GET /admin/leads/export` — CSV export of all leads (auth required)
  - `GET /admin/blog` — Blog admin/CMS panel (auth required)
  - `GET /admin/blog/new` — New post editor (auth required)
  - `GET /admin/blog/edit/:id` — Edit post editor (auth required)
  - `GET /assets/:filename` — serves static assets from attached_assets/
  - `POST /api/contact` — creates a contact lead (rate limited, honeypot, validated, sends email notification)
  - `GET /api/contact` — retrieves all contact leads (auth required)
  - `POST /api/leads/:id/status` — updates lead status (auth required)
  - `POST /api/blog` — creates a blog post (auth required)
  - `PUT /api/blog/:id` — updates a blog post (auth required)
  - `DELETE /api/blog/:id` — deletes a blog post (auth required)
  - `POST /admin/login` — processes admin login
- **Storage**: PostgreSQL via Drizzle ORM (`DatabaseStorage` class in `server/storage.ts`)
- **Security**:
  - Rate limiting: 5 requests per 15 minutes per IP address
  - Honeypot field: Hidden `_hp_website` field that traps bots
  - Input sanitization: HTML entity encoding for all text inputs
  - Session-based auth: HTTP-only cookies with 24hr expiry for admin routes
  - IP logging: Records submitter IP for fraud detection

### Frontend (Server-Rendered)
- Multi-page site rendered by `server/template.ts` using shared layout (renderLayout helper)
- Pages: Homepage, About, How It Works, Careers, Press, Contact, Dashboard (analytics), Partners & Integrations, For Publishers, For Advertisers, Trust & Compliance, 10 Solution pages, Blog (listing + individual posts), Privacy Policy, Terms & Conditions, GDPR & Cookie Policy, FAQ & Support
- Admin pages rendered by `server/adminTemplate.ts` (login, leads management)
- Navigation has Solutions dropdown (desktop hover, mobile expandable) linking to all solution pages
- Blog CMS admin panel at /admin/blog for creating, editing, and deleting posts
- Leads admin panel at /admin/leads for managing contact form submissions
- No build step needed - all CSS/JS loaded via CDN
- Alpine.js handles:
  - Mobile navigation toggle
  - Testimonial carousel (auto-play with manual prev/next)
  - Contact form state management and submission via fetch()
  - Blog post editor form state and submission
  - Stats section intersection animation
  - Admin leads filtering, status updates, message modal
- Scroll-based animations via IntersectionObserver
- Custom CSS for glassmorphism effects (glass-card, glass-input, glass-btn, etc.)

### Shared Layer
- **Schema**: `shared/schema.ts` defines Drizzle ORM tables + Zod validation schemas via `drizzle-zod`
- **Tables**: 
  - contact_leads (id, name, email, company, impressions, message, ip, source, status, createdAt)
  - blog_posts (id, title, slug, excerpt, content, coverImage, author, category, tags, published, publishedAt, updatedAt)
  - users (id, username, password)

### Design System
- **Theme**: Dark theme with glassmorphism
- **Colors**: Green accent (#2BDE73), dark green (#1AAF5C), dark surface (#0a0a0c), frosted glass overlays
- **Glass Cards**: `backdrop-filter: blur(40px) saturate(180%)` with subtle white borders
- **Buttons**: Pill-shaped (border-radius: 980px) with gradient fills
- **Typography**: Figtree (body) + Instrument Serif (display headings), text-gradient and text-gradient-accent for headings
- **Animations**: Scroll-triggered fade-in-up, floating orbs, logo carousel scroll

### Project Structure
```
server/
  index.ts           # Hono server entry point (Node.js local dev)
  routes.ts          # Route registration (page + API + admin + security)
  template.ts        # Layout + all page templates
  adminTemplate.ts   # Admin panel templates (login, leads management)
  storage.ts         # DatabaseStorage implementation (PostgreSQL via Drizzle)
  d1Storage.ts       # D1Storage implementation (Cloudflare D1/SQLite for Workers)
  db.ts              # Database connection (pg pool + drizzle)
  email.ts           # Resend email service for lead notifications
  rateLimit.ts       # Rate limiting middleware (IP-based)
  seed.ts            # Blog post database seeder
shared/
  schema.ts          # Drizzle schema + Zod validation
worker.ts            # Cloudflare Workers entry point (mirrors routes.ts)
wrangler.toml        # Workers configuration
tsconfig.worker.json # TypeScript config for Worker build
public/assets/       # Static assets served by Workers
client/              # Legacy React app (not used in current stack)
```

### Build & Development
- **Development**: `npm run dev` runs `tsx server/index.ts` which starts Hono server on port 5000
- **Key**: No frontend build step. All styling/JS via CDN. Template is a TypeScript function returning HTML string.
- **Database**: PostgreSQL (auto-provisioned by Replit). Schema pushed via `npx drizzle-kit push`.
- **Blog seeding**: Blog posts auto-seeded on first startup if database is empty.

### Admin Access
- **URL**: /admin/login
- **Credentials**: username `admin`, password from `ADMIN_PASSWORD` env var (default: `hbdr2025!`)
- **Session**: HTTP-only cookie, 24-hour expiry, scoped to /admin path

### Environment Variables
- `DATABASE_URL` — PostgreSQL connection string (auto-set by Replit)
- `RESEND_API_KEY` — Resend API key for email notifications (secret)
- `SESSION_SECRET` — Session signing secret (secret)
- `ADMIN_PASSWORD` — Admin panel password (env var, default: hbdr2025!)
- `CLOUDFLARE_ACCOUNT_ID` — Cloudflare account ID for Workers deployment
- `CLOUDFLARE_API_TOKEN` — Cloudflare API token for Workers deployment

### Deployment
- **GitHub**: Code is pushed to https://github.com/mattortolani/hbdr-website
- **Cloudflare Workers**: `wrangler deploy` deploys the site. Uses `worker.ts` as entry point with `[assets]` serving static files from `public/`.
- **Static assets**: Logo images in `public/assets/` are served by Cloudflare Workers Static Assets before reaching the worker.
- **D1 Database**: Cloudflare D1 (SQLite) provides persistent storage for Workers deployment. D1Storage class in `server/d1Storage.ts` implements the same IStorage interface. Blog posts auto-seed on first visit.

## External Dependencies

- **CDN**: Tailwind CSS, DaisyUI 4.12, HTMX 2.0, Alpine.js 3.14 (with intersect plugin), Figtree + Instrument Serif fonts
- **npm**: hono, @hono/node-server, zod, zod-validation-error, drizzle-orm, drizzle-zod, drizzle-kit, pg, resend
