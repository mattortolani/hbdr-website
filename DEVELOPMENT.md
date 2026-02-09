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

### Running the Dev Server

```bash
npm run dev
```

Opens at `http://localhost:5000`. No hot reload -- restart the server after code changes.

### Running the Cloudflare Workers Dev Server

```bash
npx wrangler dev
```

This starts a local Workers-compatible server. Requires a Cloudflare account (run `npx wrangler login` first).

### TypeScript Checking

```bash
npm run check
```

Runs `tsc --noEmit` to check for type errors without producing output.

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
5. Add the import: `import { renderMyNewPage } from "./template";`
6. Add the route: `app.get("/my-page", (c) => c.html(renderMyNewPage()));`
7. **IMPORTANT**: Also add the same route to `worker.ts` (routes are duplicated -- see ARCHITECTURE.md Known Issues)
8. Add the page to the nav and/or footer in `renderNav()` / `renderFooter()` in `template.ts`

### Modifying API Endpoints

1. Edit the route handler in `server/routes.ts`
2. **IMPORTANT**: Apply the same change to `worker.ts` (routes are duplicated)
3. If adding new data, update the schema in `shared/schema.ts`
4. If adding new storage methods, update the `IStorage` interface and `MemStorage` class in `server/storage.ts`

### Working with the Design System

Key CSS classes (defined in `template.ts` `<style>` block):

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

---

## How to Test

There are currently no automated tests. Manual testing:

1. Start the dev server: `npm run dev`
2. Visit each page in a browser
3. Test the contact form at `/contact`
4. Test the blog admin at `/admin/blog` (create, edit, delete posts)
5. Test mobile responsiveness using browser DevTools
6. Test the blog listing category filters (known to be broken)

---

## How to Debug

### Server Errors
- Check the terminal output -- Hono logger middleware logs all requests
- API errors logged via `console.error` with the error object

### Template Issues
- Template functions return HTML strings -- `console.log()` the output to see generated HTML
- Alpine.js errors appear in browser DevTools console
- CSS issues: check the `<style>` block in `renderHead()` (template.ts lines 49-466)

### Storage Issues
- `MemStorage` is a plain JavaScript Map -- add `console.log(this.blogPosts)` to debug
- Data resets on server restart (by design -- no persistence)
- Blog posts are seeded in `MemStorage.seedBlogPosts()` (storage.ts line 43)

---

## Deployment

### Cloudflare Workers

```bash
# Login (first time only)
npx wrangler login

# Deploy
npx wrangler deploy
```

This builds and deploys `worker.ts` to Cloudflare Workers. Static assets in `public/` are uploaded as Worker assets.

### Environment Variables

Currently none required. When auth is added (see IMPLEMENTATION_SPEC.md):

```bash
# Set secrets for Workers
npx wrangler secret put ADMIN_USERNAME
npx wrangler secret put ADMIN_PASSWORD
```

---

## Project Conventions

- **TypeScript strict mode** enabled
- **ES modules** (`"type": "module"` in package.json)
- **Template literals** for HTML generation (no JSX, no template engine)
- **Hono context** (`c`) for request/response handling
- **Zod** for all input validation
- **No semicolons** are enforced (but used inconsistently in existing code)
- **data-testid** attributes on interactive elements and key sections (for future E2E tests)
