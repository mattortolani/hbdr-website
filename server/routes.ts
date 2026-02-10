import { Hono } from "hono";
import { storage } from "./storage";
import { insertContactLeadSchema, insertBlogPostSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { checkRateLimit, getClientIp } from "./rateLimit";
import { sendContactNotification } from "./email";
import { renderPage, renderAboutPage, renderHowItWorksPage, renderCareersPage, renderPressPage, renderContactPage, renderBlogPage, renderBlogPostPage, renderBlogAdminPage, renderBlogEditorPage, renderHeaderBiddingPage, renderDisplayAdsPage, renderCtvOttPage, renderInAppAdsPage, renderMcmPage, renderManageAccountPage, renderManageInventoryPage, renderOpenBiddingPage, renderAdExchangePage, renderPrivacyPolicyPage, renderTermsPage, renderGdprCookiePolicyPage, renderFaqSupportPage, renderDashboardPage, renderVideoPlayerPage, renderPartnersPage, renderPublishersPage, renderAdvertisersPage, renderTrustCompliancePage, SITE_URL } from "./template";
import { renderPublisherToolsPage } from "./toolsTemplate";
import { renderAdminLoginPage, renderAdminLeadsPage } from "./adminTemplate";
import { sanitizeHtml, sanitizeText } from "./sanitize";
import * as fs from "fs";
import * as path from "path";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hbdr2025!";

const sessions = new Map<string, { username: string; expiresAt: number }>();

function generateSessionId(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getSessionFromCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/hbdr_admin_session=([^;]+)/);
  return match ? match[1] : null;
}

function isAuthenticated(cookieHeader: string | undefined): boolean {
  const sessionId = getSessionFromCookie(cookieHeader);
  if (!sessionId) return false;
  const session = sessions.get(sessionId);
  if (!session) return false;
  if (session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return false;
  }
  return true;
}

export function registerRoutes(app: Hono) {
  app.get("/", (c) => c.html(renderPage()));
  app.get("/about", (c) => c.html(renderAboutPage()));
  app.get("/how-it-works", (c) => c.html(renderHowItWorksPage()));
  app.get("/careers", (c) => c.html(renderCareersPage()));
  app.get("/press", (c) => c.html(renderPressPage()));
  app.get("/contact", (c) => c.html(renderContactPage()));

  app.get("/solutions/header-bidding", (c) => c.html(renderHeaderBiddingPage()));
  app.get("/solutions/display-ads", (c) => c.html(renderDisplayAdsPage()));
  app.get("/solutions/ctv-ott", (c) => c.html(renderCtvOttPage()));
  app.get("/solutions/in-app-ads", (c) => c.html(renderInAppAdsPage()));
  app.get("/solutions/mcm", (c) => c.html(renderMcmPage()));
  app.get("/solutions/manage-account", (c) => c.html(renderManageAccountPage()));
  app.get("/solutions/manage-inventory", (c) => c.html(renderManageInventoryPage()));
  app.get("/solutions/open-bidding", (c) => c.html(renderOpenBiddingPage()));
  app.get("/solutions/ad-exchange-adx", (c) => c.html(renderAdExchangePage()));

  app.get("/dashboard", (c) => c.html(renderDashboardPage()));
  app.get("/solutions/video-player", (c) => c.html(renderVideoPlayerPage()));
  app.get("/partners", (c) => c.html(renderPartnersPage()));
  app.get("/publishers", (c) => c.html(renderPublishersPage()));
  app.get("/advertisers", (c) => c.html(renderAdvertisersPage()));
  app.get("/trust", (c) => c.html(renderTrustCompliancePage()));
  app.get("/tools", (c) => c.html(renderPublisherToolsPage()));

  app.get("/privacy-policy", (c) => c.html(renderPrivacyPolicyPage()));
  app.get("/terms", (c) => c.html(renderTermsPage()));
  app.get("/gdpr-cookie-policy", (c) => c.html(renderGdprCookiePolicyPage()));
  app.get("/support", (c) => c.html(renderFaqSupportPage()));

  // SEO routes
  app.get("/robots.txt", (c) => {
    return c.text(`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`);
  });

  app.get("/sitemap.xml", (c) => {
    const pages = [
      "/", "/about", "/how-it-works", "/careers", "/press", "/contact",
      "/solutions/header-bidding", "/solutions/display-ads", "/solutions/ctv-ott",
      "/solutions/in-app-ads", "/solutions/mcm", "/solutions/manage-account",
      "/solutions/manage-inventory", "/solutions/open-bidding", "/solutions/ad-exchange-adx",
      "/solutions/video-player", "/dashboard", "/partners", "/publishers",
      "/advertisers", "/trust", "/tools", "/blog",
      "/privacy-policy", "/terms", "/gdpr-cookie-policy", "/support",
    ];
    const urls = pages.map(p => `  <url><loc>${SITE_URL}${p}</loc></url>`).join("\n");
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
    return new Response(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  });

  // Blog routes
  app.get("/blog", async (c) => {
    const posts = await storage.getBlogPosts(true);
    return c.html(renderBlogPage(posts));
  });

  app.get("/blog/:slug", async (c) => {
    const slug = c.req.param("slug");
    const post = await storage.getBlogPostBySlug(slug);
    if (!post) return c.text("Post not found", 404);
    if (post.published !== "true") return c.text("Post not found", 404);
    return c.html(renderBlogPostPage(post));
  });

  app.get("/admin/blog", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.redirect("/admin/login");
    }
    const posts = await storage.getBlogPosts(false);
    return c.html(renderBlogAdminPage(posts));
  });

  app.get("/admin/blog/new", (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.redirect("/admin/login");
    }
    return c.html(renderBlogEditorPage());
  });

  app.get("/admin/blog/edit/:id", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.redirect("/admin/login");
    }
    const id = c.req.param("id");
    const post = await storage.getBlogPostById(id);
    if (!post) return c.text("Post not found", 404);
    return c.html(renderBlogEditorPage(post));
  });

  // Blog API
  app.post("/api/blog", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    try {
      const body = await c.req.json();
      const validated = insertBlogPostSchema.safeParse(body);
      if (!validated.success) {
        const validationError = fromError(validated.error);
        return c.json({ message: validationError.toString(), errors: validated.error.flatten().fieldErrors }, 400);
      }
      const existing = await storage.getBlogPostBySlug(validated.data.slug);
      if (existing) return c.json({ message: "A post with this slug already exists" }, 400);
      validated.data.content = sanitizeHtml(validated.data.content);
      const post = await storage.createBlogPost(validated.data);
      return c.json(post, 201);
    } catch (error) {
      console.error("Error creating blog post:", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  });

  app.put("/api/blog/:id", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    try {
      const id = c.req.param("id");
      const body = await c.req.json();
      const existing = await storage.getBlogPostById(id);
      if (!existing) return c.json({ message: "Post not found" }, 404);
      const updateSchema = insertBlogPostSchema.partial();
      const validated = updateSchema.safeParse(body);
      if (!validated.success) {
        const validationError = fromError(validated.error);
        return c.json({ message: validationError.toString(), errors: validated.error.flatten().fieldErrors }, 400);
      }
      if (validated.data.slug && validated.data.slug !== existing.slug) {
        const slugExists = await storage.getBlogPostBySlug(validated.data.slug);
        if (slugExists) return c.json({ message: "A post with this slug already exists" }, 400);
      }
      if (validated.data.content) validated.data.content = sanitizeHtml(validated.data.content);
      const updated = await storage.updateBlogPost(id, validated.data);
      return c.json(updated);
    } catch (error) {
      console.error("Error updating blog post:", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  });

  app.delete("/api/blog/:id", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    try {
      const id = c.req.param("id");
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) return c.json({ message: "Post not found" }, 404);
      return c.json({ message: "Post deleted" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  });

  // Static assets
  app.get("/assets/:filename", (c) => {
    const filename = c.req.param("filename");
    const filePath = path.join(process.cwd(), "attached_assets", filename);
    try {
      const file = fs.readFileSync(filePath);
      const ext = path.extname(filename).toLowerCase();
      const contentType = ext === ".jpeg" || ext === ".jpg" ? "image/jpeg" : ext === ".png" ? "image/png" : ext === ".svg" ? "image/svg+xml" : ext === ".ico" ? "image/x-icon" : "application/octet-stream";
      return new Response(file, { headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=86400" } });
    } catch {
      return c.text("Not found", 404);
    }
  });

  // Contact form submission with security
  app.post("/api/contact", async (c) => {
    try {
      const ip = getClientIp(c.req.raw.headers);

      const rateCheck = checkRateLimit(ip);
      if (!rateCheck.allowed) {
        return c.html(`
          <div id="contact-form-result" class="glass-card p-8 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
              <svg class="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-2">Too Many Requests</h3>
            <p class="text-white/50">Please wait a few minutes before submitting again.</p>
          </div>
        `, 429);
      }

      const body = await c.req.json();

      if (body._hp_website && body._hp_website.trim() !== '') {
        console.log(`Bot detected via honeypot from IP: ${ip}`);
        return c.html(`
          <div id="contact-form-result" class="glass-card p-8 text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
              <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h3 class="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
            <p class="text-white/50">We'll get back to you within 24 hours.</p>
          </div>
        `);
      }

      const source = body._source || "contact";
      delete body._hp_website;
      delete body._source;

      const validatedData = insertContactLeadSchema.safeParse(body);
      if (!validatedData.success) {
        const validationError = fromError(validatedData.error);
        return c.json({ message: validationError.toString(), errors: validatedData.error.flatten().fieldErrors }, 400);
      }

      const sanitizedData = {
        ...validatedData.data,
        name: sanitizeText(validatedData.data.name),
        email: validatedData.data.email.toLowerCase().trim(),
        company: sanitizeText(validatedData.data.company),
        message: validatedData.data.message ? sanitizeText(validatedData.data.message) : null,
      };

      const lead = await storage.createContactLead({
        ...sanitizedData,
        ip,
        source,
      });

      sendContactNotification({
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company,
        impressions: sanitizedData.impressions,
        message: sanitizedData.message,
        source,
        ip,
      }).catch(err => console.error("Email send failed:", err));

      return c.html(`
        <div id="contact-form-result" class="glass-card p-8 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
          <p class="text-white/50">We'll get back to you within 24 hours. Thank you for your interest in HBDR.</p>
        </div>
      `);
    } catch (error) {
      console.error("Error creating contact lead:", error);
      return c.html(`
        <div id="contact-form-result" class="glass-card p-8 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
            <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </div>
          <h3 class="text-2xl font-semibold text-white mb-2">Something went wrong</h3>
          <p class="text-white/50">Please try again or email us directly at contact@hbdr.com</p>
        </div>
      `);
    }
  });

  // Admin auth routes
  app.get("/admin/login", (c) => {
    if (isAuthenticated(c.req.header("cookie"))) {
      return c.redirect("/admin/leads");
    }
    return c.html(renderAdminLoginPage());
  });

  app.post("/admin/login", async (c) => {
    const body = await c.req.parseBody();
    const username = body.username as string;
    const password = body.password as string;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const sessionId = generateSessionId();
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000;
      sessions.set(sessionId, { username, expiresAt });

      c.header("Set-Cookie", `hbdr_admin_session=${sessionId}; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=86400`);
      return c.redirect("/admin/leads", 302);
    }

    return c.html(renderAdminLoginPage("Invalid username or password"), 401);
  });

  app.get("/admin/logout", (c) => {
    const sessionId = getSessionFromCookie(c.req.header("cookie"));
    if (sessionId) sessions.delete(sessionId);
    return c.redirect("/admin/login", 302);
  });

  // Admin leads panel
  app.get("/admin/leads", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.redirect("/admin/login");
    }
    const leads = await storage.getContactLeads();
    return c.html(renderAdminLeadsPage(leads));
  });

  // Update lead status
  app.post("/api/leads/:id/status", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    const id = c.req.param("id");
    const body = await c.req.json();
    const status = body.status;
    if (!["new", "contacted", "qualified", "converted", "archived"].includes(status)) {
      return c.json({ message: "Invalid status" }, 400);
    }
    const updated = await storage.updateContactLeadStatus(id, status);
    if (!updated) return c.json({ message: "Lead not found" }, 404);
    return c.json(updated);
  });

  // CSV export
  app.get("/admin/leads/export", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.redirect("/admin/login");
    }
    const leads = await storage.getContactLeads();
    const headers = ["ID", "Name", "Email", "Company", "Impressions", "Message", "Source", "Status", "IP", "Date"];
    const csvRows = [headers.join(",")];
    for (const lead of leads) {
      const row = [
        lead.id,
        `"${(lead.name || '').replace(/"/g, '""')}"`,
        lead.email,
        `"${(lead.company || '').replace(/"/g, '""')}"`,
        lead.impressions,
        `"${(lead.message || '').replace(/"/g, '""')}"`,
        lead.source || "contact",
        lead.status || "new",
        lead.ip || "",
        lead.createdAt ? new Date(lead.createdAt).toISOString() : "",
      ];
      csvRows.push(row.join(","));
    }
    const csv = csvRows.join("\n");
    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="hbdr-leads-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  });

  // Protected contact leads API
  app.get("/api/contact", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    try {
      const leads = await storage.getContactLeads();
      return c.json(leads);
    } catch (error) {
      console.error("Error fetching contact leads:", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  });
}
