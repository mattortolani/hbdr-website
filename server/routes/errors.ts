// Global error handlers — 404 not found and 500 server error
// Register after all other routes in both worker.ts and server/index.ts

import type { Hono } from "hono";
import { render404Page, render500Page } from "../templates/pages/error";

export function registerErrorHandlers(app: Hono<any>) {
  app.notFound((c) => {
    return c.html(render404Page(), 404);
  });

  app.onError((err, c) => {
    console.error("Server error:", err);
    return c.html(render500Page(), 500);
  });
}
