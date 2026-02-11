// Node.js dev server entry point
// Uses shared route modules (single source of truth)

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { registerPageRoutes } from "./routes/pages";
import { registerApiRoutes } from "./routes/api";
import { registerAdminRoutes } from "./routes/admin";
import { registerSeoRoutes } from "./routes/seo";
import { MemStorage } from "./services/mem-storage";
import * as fs from "fs";
import * as path from "path";

const app = new Hono();

app.use("*", logger());

// Single shared storage instance for dev
const storage = new MemStorage();
storage.seedBlogPosts().catch(err => console.error("Seed error:", err));

function getStorage() {
  return storage;
}

// Static assets (dev only — Workers serves from public/ via wrangler)
app.get("/assets/:filename", (c) => {
  const filename = c.req.param("filename");
  const filePath = path.join(process.cwd(), "attached_assets", filename);
  try {
    const file = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const contentType =
      ext === ".jpeg" || ext === ".jpg" ? "image/jpeg" :
      ext === ".png" ? "image/png" :
      ext === ".svg" ? "image/svg+xml" :
      ext === ".ico" ? "image/x-icon" :
      "application/octet-stream";
    return new Response(file, {
      headers: { "Content-Type": contentType, "Cache-Control": "public, max-age=86400" },
    });
  } catch {
    return c.text("Not found", 404);
  }
});

// Register all routes from shared modules
registerPageRoutes(app, getStorage);
registerApiRoutes(app, getStorage, () => ({
  resendApiKey: process.env.RESEND_API_KEY,
}));
registerAdminRoutes(app, getStorage, () => ({
  adminPassword: process.env.ADMIN_PASSWORD || "hbdr2025!",
}));
registerSeoRoutes(app);

const port = parseInt(process.env.PORT || "5000", 10);

serve(
  { fetch: app.fetch, port, hostname: "0.0.0.0" },
  (info) => {
    const time = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    console.log(`${time} [hono] serving on port ${info.port}`);
  }
);
