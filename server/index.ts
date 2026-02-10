import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { registerRoutes } from "./routes";
import { seedBlogPosts } from "./seed";

const app = new Hono();

app.use("*", logger());

registerRoutes(app);

const port = parseInt(process.env.PORT || "5000", 10);

seedBlogPosts().catch(err => console.error("Seed error:", err));

serve(
  {
    fetch: app.fetch,
    port,
    hostname: "0.0.0.0",
  },
  (info) => {
    const formattedTime = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    console.log(`${formattedTime} [hono] serving on port ${info.port}`);
  }
);
