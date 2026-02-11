// All API routes — single source of truth
// Handles contact form, blog CRUD, lead management

import type { Hono } from "hono";
import type { IStorage } from "../services/storage";
import { insertContactLeadSchema, insertBlogPostSchema } from "@shared/schema";
import { fromError } from "zod-validation-error";
import { sanitizeHtml, sanitizeText } from "../middleware/sanitize";
import { checkRateLimit, getClientIp } from "../middleware/rate-limit";
import { isAuthenticated } from "../middleware/auth";
import { sendContactNotification } from "../services/email";

interface ApiConfig {
  resendApiKey?: string;
}

export function registerApiRoutes(
  app: Hono<any>,
  getStorage: (c: any) => IStorage,
  getConfig: (c: any) => ApiConfig
) {
  // Contact form submission
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

      // Honeypot check
      if (body._hp_website && body._hp_website.trim() !== "") {
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

      const storage = getStorage(c);
      const lead = await storage.createContactLead({ ...sanitizedData, ip, source });

      const config = getConfig(c);
      if (config.resendApiKey) {
        sendContactNotification(config.resendApiKey, {
          name: sanitizedData.name,
          email: sanitizedData.email,
          company: sanitizedData.company,
          impressions: sanitizedData.impressions,
          message: sanitizedData.message,
          source,
          ip,
        }).catch((err) => console.error("Email send failed:", err));
      }

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

  // Blog CRUD API
  app.post("/api/blog", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.json({ message: "Unauthorized" }, 401);
    try {
      const storage = getStorage(c);
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
    if (!isAuthenticated(c.req.header("cookie"))) return c.json({ message: "Unauthorized" }, 401);
    try {
      const storage = getStorage(c);
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
    if (!isAuthenticated(c.req.header("cookie"))) return c.json({ message: "Unauthorized" }, 401);
    try {
      const storage = getStorage(c);
      const id = c.req.param("id");
      const deleted = await storage.deleteBlogPost(id);
      if (!deleted) return c.json({ message: "Post not found" }, 404);
      return c.json({ message: "Post deleted" });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  });

  // Protected contact leads API
  app.get("/api/contact", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.json({ message: "Unauthorized" }, 401);
    try {
      const storage = getStorage(c);
      const leads = await storage.getContactLeads();
      return c.json(leads);
    } catch (error) {
      console.error("Error fetching contact leads:", error);
      return c.json({ message: "Internal server error" }, 500);
    }
  });

  // Lead status update
  app.post("/api/leads/:id/status", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.json({ message: "Unauthorized" }, 401);
    const storage = getStorage(c);
    const id = c.req.param("id");
    const body = await c.req.json();
    if (!["new", "contacted", "qualified", "converted", "archived"].includes(body.status)) {
      return c.json({ message: "Invalid status" }, 400);
    }
    const updated = await storage.updateContactLeadStatus(id, body.status);
    if (!updated) return c.json({ message: "Lead not found" }, 404);
    return c.json(updated);
  });
}
