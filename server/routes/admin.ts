// Admin routes — login, logout, leads panel, blog admin, CSV export
// Single source of truth for both entry points

import type { Hono } from "hono";
import type { IStorage } from "../services/storage";
import { isAuthenticated, createSession, destroySession } from "../middleware/auth";
import { renderAdminLoginPage, renderAdminLeadsPage } from "../templates/admin/leads";
import { renderBlogAdminPage, renderBlogEditorPage } from "../templates/admin/blog";

interface AdminConfig {
  adminPassword: string;
}

export function registerAdminRoutes(
  app: Hono<any>,
  getStorage: (c: any) => IStorage,
  getConfig: (c: any) => AdminConfig
) {
  // Auth routes
  app.get("/admin/login", (c) => {
    if (isAuthenticated(c.req.header("cookie"))) return c.redirect("/admin/leads");
    return c.html(renderAdminLoginPage());
  });

  app.post("/admin/login", async (c) => {
    const body = await c.req.parseBody();
    const username = body.username as string;
    const password = body.password as string;
    const config = getConfig(c);

    if (username === "admin" && password === config.adminPassword) {
      const sessionId = createSession(username);
      c.header("Set-Cookie", `hbdr_admin_session=${sessionId}; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=86400`);
      return c.redirect("/admin/leads", 302);
    }

    return c.html(renderAdminLoginPage("Invalid username or password"), 401);
  });

  app.get("/admin/logout", (c) => {
    destroySession(c.req.header("cookie"));
    return c.redirect("/admin/login", 302);
  });

  // Leads panel
  app.get("/admin/leads", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.redirect("/admin/login");
    const storage = getStorage(c);
    const leads = await storage.getContactLeads();
    return c.html(renderAdminLeadsPage(leads));
  });

  // CSV export
  app.get("/admin/leads/export", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.redirect("/admin/login");
    const storage = getStorage(c);
    const leads = await storage.getContactLeads();
    const headers = ["ID", "Name", "Email", "Company", "Impressions", "Message", "Source", "Status", "IP", "Date"];
    const csvRows = [headers.join(",")];
    for (const lead of leads) {
      csvRows.push([
        lead.id,
        `"${(lead.name || "").replace(/"/g, '""')}"`,
        lead.email,
        `"${(lead.company || "").replace(/"/g, '""')}"`,
        lead.impressions,
        `"${(lead.message || "").replace(/"/g, '""')}"`,
        lead.source || "contact",
        lead.status || "new",
        lead.ip || "",
        lead.createdAt ? new Date(lead.createdAt).toISOString() : "",
      ].join(","));
    }
    return new Response(csvRows.join("\n"), {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="hbdr-leads-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  });

  // Blog admin
  app.get("/admin/blog", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.redirect("/admin/login");
    const storage = getStorage(c);
    const posts = await storage.getBlogPosts(false);
    return c.html(renderBlogAdminPage(posts));
  });

  app.get("/admin/blog/new", (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.redirect("/admin/login");
    return c.html(renderBlogEditorPage());
  });

  app.get("/admin/blog/edit/:id", async (c) => {
    if (!isAuthenticated(c.req.header("cookie"))) return c.redirect("/admin/login");
    const storage = getStorage(c);
    const id = c.req.param("id");
    const post = await storage.getBlogPostById(id);
    if (!post) return c.text("Post not found", 404);
    return c.html(renderBlogEditorPage(post));
  });
}
