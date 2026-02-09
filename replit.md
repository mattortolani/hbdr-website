# HBDR - Header Bidding & Ad Monetization Solutions

## Overview

HBDR is a marketing/landing page website for a header bidding and ad monetization company. It's a server-rendered multi-page site with an Apple-inspired "liquid glass" aesthetic. The backend uses Hono (Node.js) to serve HTML with Alpine.js for interactivity, HTMX for progressive enhancement, and Tailwind CSS + DaisyUI for styling. The site captures contact form leads and includes a full blog with built-in CMS admin panel.

## User Preferences

Preferred communication style: Simple, everyday language.
Design aesthetic: Apple-inspired "liquid glass" / glassmorphism with dark theme, frosted glass cards, subtle gradients, and clean typography.
Brand colors: Mint green accent (#2BDE73), dark green (#1AAF5C), light green (#6CF5A0), dark surface (#0a0a0c), white text on dark backgrounds.
Brand logo: Hexagonal "H" mark in green/white (attached_assets/HBDR_Logo_Pack_all_sizes_-_8*.jpeg for icon, _2*.jpeg for horizontal with text).

## System Architecture

### Stack
- **Server Framework**: Hono (with @hono/node-server for Node.js runtime)
- **Interactivity**: Alpine.js (mobile nav, testimonial carousel, contact form state)
- **Progressive Enhancement**: HTMX (available for future use)
- **Styling**: Tailwind CSS + DaisyUI (loaded via CDN)
- **Typography**: Inter font (Google Fonts CDN)
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
  - `GET /admin/blog` — Blog admin/CMS panel (list all posts)
  - `GET /admin/blog/new` — New post editor
  - `GET /admin/blog/edit/:id` — Edit post editor
  - `GET /assets/:filename` — serves static assets from attached_assets/
  - `POST /api/contact` — creates a contact lead (validated with Zod, accepts JSON)
  - `GET /api/contact` — retrieves all contact leads
  - `POST /api/blog` — creates a blog post (validated with Zod)
  - `PUT /api/blog/:id` — updates a blog post
  - `DELETE /api/blog/:id` — deletes a blog post
- **Storage**: In-memory storage (`MemStorage` class). The `IStorage` interface is defined for future database migration.

### Frontend (Server-Rendered)
- Multi-page site rendered by `server/template.ts` using shared layout (renderLayout helper)
- Pages: Homepage, About, How It Works, Careers, Press, Contact, Dashboard (analytics), Partners & Integrations, For Publishers, For Advertisers, Trust & Compliance, 10 Solution pages (Header Bidding, Display Ads, Video Player, CTV & OTT, In-App Ads, MCM, Manage Account, Manage Inventory, Open Bidding, Ad Exchange AdX), Blog (listing + individual posts), Privacy Policy, Terms & Conditions, GDPR & Cookie Policy, FAQ & Support
- Navigation has Solutions dropdown (desktop hover, mobile expandable) linking to all solution pages
- Blog CMS admin panel at /admin/blog for creating, editing, and deleting posts
- No build step needed - all CSS/JS loaded via CDN
- Alpine.js handles:
  - Mobile navigation toggle
  - Testimonial carousel (auto-play with manual prev/next)
  - Contact form state management and submission via fetch()
  - Blog post editor form state and submission
  - Stats section intersection animation
- Scroll-based animations via IntersectionObserver
- Custom CSS for glassmorphism effects (glass-card, glass-input, glass-btn, etc.)

### Shared Layer
- **Schema**: `shared/schema.ts` defines Zod validation schemas using Drizzle ORM with `drizzle-zod`
- **Tables**: 
  - contact_leads (id, name, email, company, impressions, message, createdAt)
  - blog_posts (id, title, slug, excerpt, content, coverImage, author, category, tags, published, publishedAt, updatedAt)

### Design System
- **Theme**: Dark theme with glassmorphism
- **Colors**: Green accent (#2BDE73), dark green (#1AAF5C), dark surface (#0a0a0c), frosted glass overlays
- **Glass Cards**: `backdrop-filter: blur(40px) saturate(180%)` with subtle white borders
- **Buttons**: Pill-shaped (border-radius: 980px) with gradient fills
- **Typography**: Inter font, text-gradient and text-gradient-accent for headings
- **Animations**: Scroll-triggered fade-in-up, floating orbs, logo carousel scroll

### Project Structure
```
server/
  index.ts           # Hono server entry point (Node.js local dev)
  routes.ts          # Route registration (page + API)
  template.ts        # Layout + all page templates (renderLayout, renderPage, renderAboutPage, etc.)
  storage.ts         # Storage interface and in-memory implementation
shared/
  schema.ts          # Drizzle schema + Zod validation
worker.ts            # Cloudflare Workers entry point
wrangler.toml        # Workers configuration
tsconfig.worker.json # TypeScript config for Worker build
public/assets/       # Static assets served by Workers
client/              # Legacy React app (not used in current stack)
```

### Build & Development
- **Development**: `npm run dev` runs `tsx server/index.ts` which starts Hono server on port 5000
- **Key**: No frontend build step. All styling/JS via CDN. Template is a TypeScript function returning HTML string.

### Deployment
- **GitHub**: Code is pushed to https://github.com/mattortolani/hbdr-website
- **Cloudflare Workers**: `wrangler deploy` deploys the site. Uses `worker.ts` as entry point with `[assets]` serving static files from `public/`.
- **Static assets**: Logo images in `public/assets/` are served by Cloudflare Workers Static Assets before reaching the worker.

## External Dependencies

- **CDN**: Tailwind CSS, DaisyUI 4.12, HTMX 2.0, Alpine.js 3.14 (with intersect plugin), Inter font
- **npm**: hono, @hono/node-server, zod, zod-validation-error, drizzle-orm, drizzle-zod
