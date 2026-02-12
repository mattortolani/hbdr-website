// SEO routes — robots.txt and sitemap.xml
import type { Hono } from "hono";
import { SITE_URL, PAGE_ROUTES } from "../config";

export function registerSeoRoutes(app: Hono<any>) {
  app.get("/robots.txt", (c) => {
    return c.text(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`);
  });

  app.get("/sitemap.xml", (c) => {
    const urls = PAGE_ROUTES.map(
      (p) => `  <url><loc>${SITE_URL}${p}</loc></url>`
    ).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
    return c.text(xml, 200, { "Content-Type": "application/xml" });
  });
}
