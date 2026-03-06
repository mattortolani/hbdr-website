// Site-wide configuration constants
export const SITE_URL = "https://hbdr-website.matt-ortolani.workers.dev";
export const SITE_NAME = "HBDR";
export const CONTACT_EMAIL = "contact@hbdr.com";
// IMPORTANT: Using Resend sandbox sender until hbdr.com domain is verified in Resend dashboard.
// Sandbox sender (onboarding@resend.dev) only delivers to the Resend account owner's email.
// Once hbdr.com is verified with DNS records (SPF, DKIM), change this to:
//   export const EMAIL_FROM = "HBDR Leads <leads@hbdr.com>";
export const EMAIL_FROM = "HBDR Leads <onboarding@resend.dev>";

// Where notification emails are sent (these receive the lead notifications)
export const CONTACT_NOTIFY_EMAIL = "contact@hbdr.com";
export const SUPPORT_NOTIFY_EMAIL = "support@hbdr.com";

// All page routes for sitemap generation and nav building
export const PAGE_ROUTES = [
  "/", "/about", "/how-it-works", "/careers", "/press", "/contact",
  "/solutions/header-bidding", "/solutions/display-ads", "/solutions/ctv-ott",
  "/solutions/in-app-ads", "/solutions/mcm", "/solutions/manage-account",
  "/solutions/manage-inventory", "/solutions/open-bidding", "/solutions/ad-exchange-adx",
  "/solutions/video-player", "/blog", "/publishers", "/advertisers", "/partners",
  "/dashboard", "/trust", "/tools", "/support",
  "/privacy-policy", "/terms", "/gdpr-cookie-policy",
] as const;
