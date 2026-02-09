import { Hono } from "hono";
import { logger } from "hono/logger";
import { storage } from "./server/storage";
import { insertContactLeadSchema, insertBlogPostSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import {
  renderPage, renderAboutPage, renderHowItWorksPage, renderCareersPage,
  renderPressPage, renderContactPage, renderBlogPage, renderBlogPostPage,
  renderBlogAdminPage, renderBlogEditorPage, renderHeaderBiddingPage,
  renderDisplayAdsPage, renderCtvOttPage, renderInAppAdsPage, renderMcmPage,
  renderManageAccountPage, renderManageInventoryPage, renderOpenBiddingPage,
  renderAdExchangePage
} from "./server/template";

const app = new Hono();

app.use("*", logger());

function sanitizeHtml(html: string): string {
  let result = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '')
    .replace(/javascript\s*:/gi, 'blocked:')
    .replace(/data\s*:/gi, 'blocked:')
    .replace(/vbscript\s*:/gi, 'blocked:');
  return result;
}

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
  const posts = await storage.getBlogPosts(false);
  return c.html(renderBlogAdminPage(posts));
});

app.get("/admin/blog/new", (c) => c.html(renderBlogEditorPage()));

app.get("/admin/blog/edit/:id", async (c) => {
  const id = c.req.param("id");
  const post = await storage.getBlogPostById(id);
  if (!post) return c.text("Post not found", 404);
  return c.html(renderBlogEditorPage(post));
});

app.post("/api/blog", async (c) => {
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

app.post("/api/contact", async (c) => {
  try {
    const body = await c.req.json();
    const validatedData = insertContactLeadSchema.safeParse(body);
    if (!validatedData.success) {
      const validationError = fromError(validatedData.error);
      return c.json({ message: validationError.toString(), errors: validatedData.error.flatten().fieldErrors }, 400);
    }
    const lead = await storage.createContactLead(validatedData.data);
    return c.html(`
      <div id="contact-form-result" class="glass-card p-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
          <svg class="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">Message Sent!</h3>
        <p class="text-base-content/60">We'll get back to you within 24 hours. Thank you for your interest in HBDR.</p>
      </div>
    `);
  } catch (error) {
    console.error("Error creating contact lead:", error);
    return c.html(`
      <div id="contact-form-result" class="glass-card p-8 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-error/20 mb-4">
          <svg class="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">Something went wrong</h3>
        <p class="text-base-content/60">Please try again or email us directly at contact@hbdr.com</p>
      </div>
    `);
  }
});

app.get("/api/contact", async (c) => {
  try {
    const leads = await storage.getContactLeads();
    return c.json(leads);
  } catch (error) {
    console.error("Error fetching contact leads:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

export default app;
