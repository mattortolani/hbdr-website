# IMMEDIATE FIXES — Agent Implementation Instructions

**Target**: Sonnet 4.5 or equivalent sub-agent
**Scope**: Template-level bugs, config hygiene, and security hardening
**Rule**: No new features. Fix only what's listed below. Test nothing — there is no test framework.
**Branch**: Work on your current branch. Commit each fix separately with a descriptive message.

---

## Fix 1: Remove HTMX CDN (Dead Weight)

**File**: `server/template.ts`
**Line**: 30
**Problem**: HTMX 2.0.4 is loaded on every page via CDN. There are zero `hx-*` attributes anywhere in the codebase. It adds ~14KB per page for nothing.

**Action**: Delete this line:
```html
<script src="https://unpkg.com/htmx.org@2.0.4"></script>
```

**Verification**: Search the entire codebase for `hx-` to confirm zero usage. If any `hx-*` attributes exist, do NOT remove HTMX.

---

## Fix 2: Fix Blog Category Filters

**File**: `server/template.ts`
**Function**: `renderBlogPage()` (starts at line 2104)
**Problem**: The Alpine.js `x-data="{ activeCategory: '' }"` is on the filter buttons container (line 2148), but the post cards (lines 2107-2132) are outside its scope AND have no `x-show` directives. Clicking filter buttons changes button styling but posts never actually filter.

**Action — 3 changes required**:

### Change A: Move `x-data` up to a wrapping element
The `x-data` is currently on the filter `<div>` at line 2148. It needs to wrap BOTH the filter buttons AND the post grid. Move it to the `<section>` or add a new wrapper `<div>`.

Replace this block (lines 2146-2160):
```html
  <section class="py-16 lg:py-24" data-testid="blog-listing">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-wrap items-center gap-3 mb-12" x-data="{ activeCategory: '' }" data-testid="blog-filters">
```

With:
```html
  <section class="py-16 lg:py-24" data-testid="blog-listing">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" x-data="{ activeCategory: '' }">
      <div class="flex flex-wrap items-center gap-3 mb-12" data-testid="blog-filters">
```

This moves `x-data` from the filter buttons `<div>` to the parent `<div>` that wraps both the buttons and the grid.

### Change B: Add `data-category` attribute and `x-show` to each post card
In the `postCards` template (lines 2107-2132), add `x-show` to the `<article>` element:

Replace:
```html
    <article class="glass-card overflow-hidden group" data-testid="blog-card-${post.slug}">
```

With:
```html
    <article class="glass-card overflow-hidden group" data-testid="blog-card-${post.slug}" x-show="!activeCategory || activeCategory === '${post.category}'">
```

### Change C: (Optional but recommended) Add `x-cloak` to prevent flash
Add `x-cloak` to the same `<article>` element so cards don't flash before Alpine initializes:
```html
    <article class="glass-card overflow-hidden group" data-testid="blog-card-${post.slug}" x-show="!activeCategory || activeCategory === '${post.category}'" x-cloak>
```

And add this CSS rule inside the `<style>` block in `renderHead()` (anywhere inside the existing `<style>` tag):
```css
[x-cloak] { display: none !important; }
```

---

## Fix 3: Fix Social Icon Links in Footer

**File**: `server/template.ts`
**Lines**: 684, 687, 690
**Problem**: All three social icons (LinkedIn, Twitter/X, Email) have `href="#"`. They go nowhere.

**Action**: Replace the three links:

Line 684 — change LinkedIn `href="#"` to `href="https://www.linkedin.com/company/hbdr"`:
```html
<a href="https://www.linkedin.com/company/hbdr" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-linkedin">
```

Line 687 — change Twitter/X `href="#"` to `href="https://x.com/haborMedia"`:
```html
<a href="https://x.com/haborMedia" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-twitter">
```

Line 690 — change Email `href="#"` to `href="mailto:contact@hbdr.com"`:
```html
<a href="mailto:contact@hbdr.com" class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all" data-testid="button-social-email">
```

**Note**: If the LinkedIn/Twitter URLs above are wrong, search the codebase for any reference to HBDR social profiles (check `attached_assets/` content files). If no real URLs can be found, use `https://www.linkedin.com/company/hbdr` and `https://x.com/hbdr` as reasonable defaults.

---

## Fix 4: Fix OG Image to Use Absolute URL

**File**: `server/template.ts`
**Function**: `renderHead()` (starts at line 10)
**Lines**: 21-22
**Problem**: `og:image` and `og:url` use relative paths. Social media crawlers (Facebook, LinkedIn, Twitter) cannot resolve relative URLs — no preview image appears when the site is shared.

**Action**:

Step 1: Add a `SITE_URL` constant at the top of `server/template.ts` (before the `LayoutOptions` interface, line 1):
```typescript
const SITE_URL = "https://hbdr-website.matt-ortolani.workers.dev";
```

Step 2: Replace line 21:
```html
<meta property="og:image" content="/assets/HBDR_Logo_Pack_all_sizes_-_2_1770577514801.jpeg" />
```
With:
```html
<meta property="og:image" content="${SITE_URL}/assets/HBDR_Logo_Pack_all_sizes_-_2_1770577514801.jpeg" />
```

Step 3: Replace line 22:
```html
<meta property="og:url" content="${options.canonicalPath || '/'}" />
```
With:
```html
<meta property="og:url" content="${SITE_URL}${options.canonicalPath || '/'}" />
```

**Note**: If the Workers dev URL is wrong, check `wrangler.toml` or ask the user for the correct production URL. The pattern is `https://<worker-name>.<subdomain>.workers.dev` or whatever custom domain is configured.

---

## Fix 5: Move Admin Password to Wrangler Secret

**File**: `wrangler.toml`
**Line**: 12
**Problem**: `ADMIN_PASSWORD = "hbdr2025!"` is in plaintext in `[vars]`, committed to Git. Anyone with repo access can see it.

**Action — 2 steps**:

Step 1: Remove line 12 from `wrangler.toml`. The `[vars]` section should only contain:
```toml
[vars]
ENVIRONMENT = "production"
```

Step 2: Document that the admin password must be set as a Wrangler secret. Add a comment above `[vars]`:
```toml
# ADMIN_PASSWORD must be set via: npx wrangler secret put ADMIN_PASSWORD
# Do NOT put secrets in [vars] — they are committed to Git in plaintext.
[vars]
ENVIRONMENT = "production"
```

**IMPORTANT**: After deploying this change, the admin password must be re-set via CLI:
```bash
npx wrangler secret put ADMIN_PASSWORD
```
Document this in the commit message.

---

## Fix 6: Add robots.txt and sitemap.xml Routes

**File**: `worker.ts` (this is what's deployed to Cloudflare)
**Problem**: No `robots.txt` or `sitemap.xml`. Search engines can't efficiently crawl the site. Admin paths aren't blocked from indexing at the server level.

**Action**: Add these two route handlers to `worker.ts`, BEFORE the `export default app;` line at the end of the file.

```typescript
app.get("/robots.txt", (c) => {
  return c.text(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://hbdr-website.matt-ortolani.workers.dev/sitemap.xml`);
});

app.get("/sitemap.xml", (c) => {
  const pages = [
    "/", "/about", "/how-it-works", "/careers", "/press", "/contact",
    "/solutions/header-bidding", "/solutions/display-ads", "/solutions/ctv-ott",
    "/solutions/in-app-ads", "/solutions/mcm", "/solutions/manage-account",
    "/solutions/manage-inventory", "/solutions/open-bidding", "/solutions/ad-exchange-adx",
    "/solutions/video-player", "/blog", "/publishers", "/advertisers", "/partners",
    "/dashboard", "/trust", "/tools", "/support",
    "/privacy-policy", "/terms", "/gdpr-cookie-policy",
  ];
  const baseUrl = "https://hbdr-website.matt-ortolani.workers.dev";
  const urls = pages.map(p => `  <url><loc>${baseUrl}${p}</loc></url>`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  return c.text(xml, 200, { "Content-Type": "application/xml" });
});
```

**Also add the same two routes to `server/routes.ts`** inside the `registerRoutes()` function, so the Node.js dev server also serves them. Use the same code.

**Note**: Replace the base URL if the production domain is different.

---

## Fix 7: Deduplicate and Improve sanitizeHtml

**File**: Create `server/sanitize.ts` (new file)
**Problem**: `sanitizeHtml()` and `sanitizeText()` are copy-pasted in both `server/routes.ts` (lines 43-58) and `worker.ts` (lines 31-46). The regex sanitizer is weak but replacing it with a library is out of scope for this fix. At minimum, deduplicate.

**Action**:

Step 1: Create `server/sanitize.ts`:
```typescript
export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<object[\s\S]*?<\/object>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    .replace(/<link[\s\S]*?>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript\s*:/gi, 'blocked:')
    .replace(/data\s*:/gi, 'blocked:')
    .replace(/vbscript\s*:/gi, 'blocked:');
}

export function sanitizeText(text: string): string {
  return text.replace(/[<>"'&]/g, (char) => {
    const entities: Record<string, string> = {
      '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;'
    };
    return entities[char] || char;
  });
}
```

Step 2: In `server/routes.ts`, remove the local `sanitizeHtml()` function (lines 43-53) and `sanitizeText()` function (lines 55-58). Add at the top:
```typescript
import { sanitizeHtml, sanitizeText } from "./sanitize";
```

Step 3: In `worker.ts`, remove the local `sanitizeHtml()` function (lines 31-41) and `sanitizeText()` function (lines 43-46). Add to the imports:
```typescript
import { sanitizeHtml, sanitizeText } from "./server/sanitize";
```

---

## Fix 8: Clean Up Support Form Company Field Hack

**File**: `server/template.ts`
**Function**: `renderFaqSupportPage()`
**Lines**: 4124-4132
**Problem**: The support form stuffs `subject + ' [Priority: ' + priority + ']'` into the `company` field. This pollutes lead data — when someone filters by company in the admin panel, they'll see strings like `"Billing Issue [Priority: High]"` instead of company names.

**Action**: Add a `subject` and `priority` field to the message instead of mangling `company`. Replace lines 4124-4132:

```javascript
body: JSON.stringify({
  name: this.formData.name,
  email: this.formData.email,
  company: this.formData.subject + ' [Priority: ' + this.formData.priority + ']',
  impressions: 'support-request',
  message: this.formData.message,
  _hp_website: this.formData._hp_website,
  _source: 'support'
})
```

With:
```javascript
body: JSON.stringify({
  name: this.formData.name,
  email: this.formData.email,
  company: 'Support Request',
  impressions: 'support-request',
  message: '[' + this.formData.subject + ' | Priority: ' + this.formData.priority + '] ' + this.formData.message,
  _hp_website: this.formData._hp_website,
  _source: 'support'
})
```

This puts subject and priority into the message (where they belong) and uses a clean `company` value that won't pollute the CRM.

---

## Execution Order

Run these in order — some are independent but this sequence minimizes conflicts:

1. **Fix 1** (HTMX removal) — one line delete, no dependencies
2. **Fix 2** (blog filters) — template changes only
3. **Fix 3** (social icons) — template changes only
4. **Fix 4** (OG image) — template changes only
5. **Fix 8** (support form) — template changes only
6. **Fix 7** (sanitize dedup) — new file + edits to routes.ts and worker.ts
7. **Fix 6** (robots/sitemap) — edits to routes.ts and worker.ts
8. **Fix 5** (admin password) — wrangler.toml edit

Commit each fix separately. Use commit messages like:
- `Remove unused HTMX CDN script from all pages`
- `Fix blog category filters — connect Alpine.js state to post cards`
- `Fix social icon links in footer — add real URLs`
- `Fix OG image meta tag to use absolute URL`
- `Clean up support form — move subject/priority to message field`
- `Deduplicate sanitizeHtml into shared server/sanitize.ts`
- `Add robots.txt and sitemap.xml routes`
- `Move admin password from wrangler.toml vars to secret`

---

## Out of Scope (Do NOT Touch)

- Do not modify `package.json` dependencies (the bloat is a known issue but requires careful analysis)
- Do not modify the D1 database schema or storage implementations
- Do not modify admin authentication logic
- Do not modify email notification logic
- Do not add new pages or features
- Do not modify CSS/design system beyond the `x-cloak` rule in Fix 2
- Do not run `npm install`, `wrangler deploy`, or any deployment commands
- Do not modify any files in `client/`, `scripts/`, `attached_assets/`, or `migrations/`
