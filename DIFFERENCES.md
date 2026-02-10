# DIFFERENCES.md

## Changes Since Last Assessment

This document catalogs all changes between the previous codebase assessment (initial 16-page site) and the current state.

---

## Summary of Changes

| Area | Before | After |
|------|--------|-------|
| template.ts line count | 3,363 lines | 5,212 lines (+55%) |
| routes.ts line count | ~170 lines | 212 lines |
| worker.ts line count | ~130 lines | 177 lines (but **missing new routes**) |
| Total page templates | 16 pages | 26 pages (+10 new) |
| Solution pages | 9 | 10 (+Video Player) |
| Legal pages | 0 | 3 (Privacy Policy, Terms, GDPR/Cookie) |
| Audience pages | 0 | 2 (Publishers, Advertisers) |
| Utility pages | 0 | 4 (Partners, Dashboard, Trust, FAQ/Support) |
| Navigation dropdowns | 1 (Solutions) | 2 (Solutions + Company) |
| Footer link columns | 4 (with `#` links) | 4 (with real page links) |

---

## New Pages Added

### 1. Privacy Policy (`/privacy-policy`)
- **Render function**: `renderPrivacyPolicyPage()` in template.ts
- **Content**: Full legal privacy policy covering data collection, use, sharing, cookies, GDPR/CCPA rights, international transfers, children's privacy, security measures, data retention, and contact info
- **Contact info**: privacy@hbdr.com, DPO at 1200 Brickell Ave Ste 1950, Miami, FL 33131
- **Notes**: Comprehensive legal content with proper section numbering and cross-links to GDPR & Cookie Policy

### 2. Terms & Conditions (`/terms`)
- **Render function**: `renderTermsPage()` in template.ts
- **Content**: Full legal terms covering acceptance, service description, account terms, payment, IP rights, liability limits, indemnification, termination, governing law (Florida), and modifications
- **Contact info**: legal@hbdr.com
- **Notes**: Jurisdiction set to Miami-Dade County, Florida courts

### 3. GDPR & Cookie Policy (`/gdpr-cookie-policy`)
- **Render function**: `renderGdprCookiePolicyPage()` in template.ts
- **Content**: GDPR rights, data subject rights, cookie consent management, detailed cookie table listing 9 cookies by category (Essential, Analytics, Advertising, Preferences)
- **Cookies listed**: `_hbdr_session`, `_hbdr_csrf`, `_hbdr_consent`, `_ga`, `_ga_*`, `_gid`, `_pbjs_userid_*`, `__gads`, `_hbdr_prefs`, `_hbdr_tz`
- **Contact info**: DPO at privacy@hbdr.com, 1200 Brickell Ave Ste 1950, Miami, FL 33131

### 4. FAQ & Support (`/support`)
- **Render function**: `renderFaqSupportPage()` in template.ts
- **Content**: 4 FAQ categories (General: 4 items, Technical: 4, Account & Billing: 3, Integration & Setup: 4), support channels, support request form
- **Support channels**: support@hbdr.com, (786) 675-6080, Mon-Fri 9am-6pm ET
- **Support form**: Reuses `/api/contact` endpoint but maps subject+priority into the `company` field -- schema mismatch issue (see New Issues below)

### 5. Dashboard (`/dashboard`)
- **Render function**: `renderDashboardPage()` in template.ts
- **Content**: Analytics Dashboard product page with 6 data dimensions, 3 revenue views (AdX, Ad Server, SSP), 8 platform features
- **External link**: Links to `https://dashboard.hbdr.com` for login/signup
- **Notes**: Marketing page describing the dashboard product, not an actual dashboard

### 6. Video Player (`/solutions/video-player`)
- **Render function**: `renderVideoPlayerPage()` in template.ts
- **Content**: Video ad formats (Instream, Outstream, Floating/Sticky, Mobile-Optimized), revenue engine features, 8 technical capabilities
- **Notes**: Added to Solutions dropdown in nav alongside existing 9 solution pages

### 7. Partners & Integrations (`/partners`)
- **Render function**: `renderPartnersPage()` in template.ts
- **Content**: Partner categories with specific named partners:
  - SSP Partners (16): Google AdX, Pubmatic, Magnite, Index Exchange, OpenX, Sovrn, TripleLift, Amazon TAM, Xandr, GumGum, Sharethrough, Media.net, Yieldmo, Rise, Criteo, Kargo
  - DSP Partners (8): Google DV360, The Trade Desk, Amazon DSP, MediaMath, Xandr Invest, StackAdapt, Basis Technologies, Adelphic
  - Identity Partners (6): LiveRamp, The Trade Desk UID2, ID5, Lotame Panorama, Criteo Commerce, Audigent
  - Compliance Partners (7): Google CMP, OneTrust, Cookiebot, TrustArc, Usercentrics, Quantcast, Didomi
  - Technology Partners (8): Google Cloud, AWS, Cloudflare, Fastly, Prebid.org, IAB Tech Lab, comScore, Moat by Oracle

### 8. For Publishers (`/publishers`)
- **Render function**: `renderPublishersPage()` in template.ts
- **Content**: 6 value propositions, 5 onboarding steps, "What HBDR Manages" (10 items) vs "What You Do" (4 items), requirements (50K+ monthly page views, etc.), 8 publisher FAQs
- **Notes**: Uses Alpine.js FAQ accordion pattern

### 9. For Advertisers (`/advertisers`)
- **Render function**: `renderAdvertisersPage()` in template.ts
- **Content**: 3 deal types (Private Marketplaces, Programmatic Guaranteed, Direct Sales), 6 inventory stats, 7 brand safety features, 4 getting-started steps

### 10. Trust & Compliance (`/trust`)
- **Render function**: `renderTrustCompliancePage()` in template.ts
- **Content**: Supply chain transparency (4 cards), anti-fraud measures (5 cards), privacy compliance (6 cards), 6 certifications (ads.txt/app-ads.txt, sellers.json, TAG Certified, Google MCM Certified, IAB Tech Lab Member, SOC 2 Type II), 12 capabilities, who we serve sections

---

## Navigation Changes

### Before
- **Desktop nav**: Solutions dropdown (9 items) + standalone links (About, How It Works, Careers, Press, Blog, Contact)
- **Mobile nav**: Same structure in hamburger menu

### After
- **Desktop nav**: Solutions dropdown (10 items, added Video Player) + standalone links (Publishers, Advertisers, Partners) + Company dropdown (About, How It Works, Careers, Press, Trust & Compliance, Blog, FAQ & Support, Contact, Dashboard)
- **Mobile nav**: Updated to match desktop structure with expandable Solutions and Company submenus
- **Top-level nav items removed**: About, How It Works, Careers, Press were moved into the Company dropdown
- **Top-level nav items added**: Publishers, Advertisers, Partners as standalone links

---

## Footer Changes

### Before
- **Solutions column**: Header Bidding, Display Ads, CTV & OTT, Open Bidding, Ad Exchange AdX
- **Company column**: Links to real pages (About, How It Works, Careers, Press, Contact)
- **Resources column**: Case Studies (#), Documentation (#), Support (#), FAQ (#) -- all broken `#` links
- **Legal column**: Privacy Policy (#), Terms of Service (#), Cookie Policy (#), GDPR (#) -- all broken `#` links
- **Social icons**: LinkedIn (#), Twitter/X (#), Email (mailto:contact@hbdr.com)

### After
- **Solutions column**: Same as before (Header Bidding, Display Ads, In-App Ads, CTV & OTT, Open Bidding, Ad Exchange AdX)
- **Company column**: Uses `companyLinks` variable from nav
- **Resources column**: For Publishers (/publishers), For Advertisers (/advertisers), Partners (/partners), Trust & Compliance (/trust), Blog (/blog), FAQ & Support (/support), Dashboard (/dashboard) -- **all real links now**
- **Legal column**: Privacy Policy (/privacy-policy), Terms & Conditions (/terms), GDPR & Cookie Policy (/gdpr-cookie-policy) -- **all real links now**
- **Social icons**: Unchanged (LinkedIn and Twitter/X still `#`, email still mailto)
- **Scroll-to-top button**: Added at bottom right of footer

---

## Route Changes in routes.ts

### New routes added (lines 44-54):
```
GET /dashboard              -> renderDashboardPage()
GET /solutions/video-player -> renderVideoPlayerPage()
GET /partners               -> renderPartnersPage()
GET /publishers             -> renderPublishersPage()
GET /advertisers            -> renderAdvertisersPage()
GET /trust                  -> renderTrustCompliancePage()
GET /privacy-policy         -> renderPrivacyPolicyPage()
GET /terms                  -> renderTermsPage()
GET /gdpr-cookie-policy     -> renderGdprCookiePolicyPage()
GET /support                -> renderFaqSupportPage()
```

### Existing routes: Unchanged

---

## Worker.ts Drift (NEW CRITICAL ISSUE)

**worker.ts is now significantly out of sync with routes.ts.** The worker does NOT have:

1. **Missing imports**: `renderPrivacyPolicyPage`, `renderTermsPage`, `renderGdprCookiePolicyPage`, `renderFaqSupportPage`, `renderDashboardPage`, `renderVideoPlayerPage`, `renderPartnersPage`, `renderPublishersPage`, `renderAdvertisersPage`, `renderTrustCompliancePage`
2. **Missing routes**: All 10 new page routes listed above
3. **Impact**: Deploying to Cloudflare Workers will result in 404s for all 10 new pages. The legal pages (Privacy Policy, Terms, GDPR) are linked from the footer on every page -- all broken in production.

This is the most critical new issue. The worker.ts/routes.ts duplication problem has now produced a real dev/prod mismatch.

---

## Design Pattern Changes

### data-testid Attributes
All new pages include `data-testid` attributes on key sections and interactive elements. Examples:
- `data-testid="section-hero"`, `data-testid="section-cookie-table"`, `data-testid="section-support-form"`
- `data-testid="link-publisher-signup"`, `data-testid="button-scroll-top"`
- These were also retroactively added to existing components (nav, footer)
- No test framework exists to use these attributes

### Contact Info Now Consistent Across Pages
- **Address**: 1200 Brickell Ave, Suite 1950, Miami, FL 33131
- **Phone**: (786) 675-6080
- **General email**: contact@hbdr.com
- **Support email**: support@hbdr.com
- **Privacy/DPO email**: privacy@hbdr.com
- **Legal email**: legal@hbdr.com
- **Press email**: press@hbdr.com

### New External Link
- Dashboard page links to `https://dashboard.hbdr.com` as the login/signup destination

---

## New Issues Discovered

### 1. Worker.ts Out of Sync (CRITICAL)
See "Worker.ts Drift" section above. 10 new pages exist in routes.ts but not in worker.ts.

### 2. Support Form Schema Mismatch (MEDIUM)
The FAQ/Support page at `/support` has a support request form that submits to `/api/contact` but maps fields incorrectly:
```javascript
body: JSON.stringify({
  name: this.formData.name,
  email: this.formData.email,
  company: this.formData.subject + ' [Priority: ' + this.formData.priority + ']',
  website: '',              // NOT in the Zod schema
  monthlyPageviews: '',     // NOT in the Zod schema (schema has 'impressions')
  message: this.formData.message
})
```
The Zod `insertContactLeadSchema` expects `impressions` (required), not `monthlyPageviews`. The `website` field does not exist in the schema. This form will likely fail validation silently or send malformed data.

### 3. Template Monolith Worsened (LOW)
template.ts grew from 3,363 to 5,212 lines (+55%). The maintenance burden is now even larger. All 26 page templates remain in a single file.

### 4. Social Links Still Broken (LOW)
LinkedIn and Twitter/X social icons in the footer still point to `#`. Only the email icon has a real link.

---

## Files Changed vs Unchanged

### Changed
| File | Change |
|------|--------|
| `server/template.ts` | 3,363 → 5,212 lines. +10 new render functions, nav restructured, footer links updated, data-testid attrs added |
| `server/routes.ts` | +10 new route registrations, +10 new imports from template |
| `worker.ts` | **NOT updated** -- missing all new routes (critical drift) |

### Unchanged
| File | Status |
|------|--------|
| `shared/schema.ts` | 73 lines, no changes |
| `server/storage.ts` | 304 lines, no changes |
| `server/index.ts` | No changes |
| `script/build.ts` | 68 lines, no changes |
| `package.json` | No changes (same dependency bloat) |
| `wrangler.toml` | No changes |
| `tsconfig.json` | No changes |
| `tsconfig.worker.json` | No changes |
| `README.md` | No changes |
| `.gitignore` | No changes |

---

## Previously Reported Issues -- Status Update

| Issue | Status |
|-------|--------|
| No auth on admin panel | **Still open** -- no change |
| No data persistence | **Still open** -- no change |
| ~60 unused npm dependencies | **Still open** -- no change |
| sanitizeHtml() duplicated | **Still open** -- still in both routes.ts and worker.ts |
| Blog category filters broken | **Still open** -- no change |
| Footer links broken (`#`) | **Partially fixed** -- Resources and Legal columns now link to real pages; social icons still `#` |
| OG image URLs relative | **Still open** -- no change |
| No 404 page | **Still open** -- no change |
| No sitemap.xml/robots.txt | **Still open** -- no change |
| `published` field is string | **Still open** -- no change |
| Package name `rest-express` | **Still open** -- no change |
| `components.json` orphaned | **Still open** -- no change |
| `client/public/favicon.png` orphaned | **Still open** -- no change |
