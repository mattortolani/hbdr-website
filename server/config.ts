// Site-wide configuration constants
export const SITE_URL = "https://hbdr-website.matt-ortolani.workers.dev";
export const SITE_NAME = "HBDR";
export const CONTACT_EMAIL = "contact@hbdr.com";
export const EMAIL_FROM = "HBDR Leads <onboarding@resend.dev>";

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
