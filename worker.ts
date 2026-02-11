// Cloudflare Workers entry point — production
// Uses shared route modules (single source of truth)

import { Hono } from "hono";
import { logger } from "hono/logger";
import { D1Storage } from "./server/d1Storage";
import { registerPageRoutes } from "./server/routes/pages";
import { registerApiRoutes } from "./server/routes/api";
import { registerAdminRoutes } from "./server/routes/admin";
import { registerSeoRoutes } from "./server/routes/seo";

type Env = {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  ENVIRONMENT: string;
  RESEND_API_KEY?: string;
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", logger());

// Storage factory — creates D1Storage per-request
function getStorage(c: any) {
  return new D1Storage(c.env.DB);
}

// Register all routes from shared modules
registerPageRoutes(app, getStorage);
registerApiRoutes(app, getStorage, (c) => ({
  resendApiKey: c.env.RESEND_API_KEY,
}));
registerAdminRoutes(app, getStorage, (c) => ({
  adminPassword: c.env.ADMIN_PASSWORD || "hbdr2025!",
}));
registerSeoRoutes(app);

export default app;
