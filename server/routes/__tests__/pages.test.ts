import { describe, it, expect, beforeAll } from "vitest";
import { Hono } from "hono";
import { registerPageRoutes } from "../pages";
import { MemStorage } from "../../services/mem-storage";

const app = new Hono();
const storage = new MemStorage();

beforeAll(async () => {
  await storage.seedBlogPosts();
  registerPageRoutes(app, () => storage);
});

// All static page routes that should return 200
const staticRoutes = [
  "/",
  "/about",
  "/how-it-works",
  "/careers",
  "/press",
  "/contact",
  "/solutions/header-bidding",
  "/solutions/display-ads",
  "/solutions/ctv-ott",
  "/solutions/in-app-ads",
  "/solutions/mcm",
  "/solutions/manage-account",
  "/solutions/manage-inventory",
  "/solutions/open-bidding",
  "/solutions/ad-exchange-adx",
  "/solutions/video-player",
  "/dashboard",
  "/partners",
  "/publishers",
  "/advertisers",
  "/trust",
  "/tools",
  "/privacy-policy",
  "/terms",
  "/gdpr-cookie-policy",
  "/support",
];

describe("page routes — 200 responses", () => {
  staticRoutes.forEach((route) => {
    it(`GET ${route} returns 200`, async () => {
      const res = await app.request(route);
      expect(res.status).toBe(200);
    });
  });
});

describe("blog routes", () => {
  it("GET /blog returns 200", async () => {
    const res = await app.request("/blog");
    expect(res.status).toBe(200);
  });

  it("GET /blog returns HTML with blog content", async () => {
    const res = await app.request("/blog");
    const html = await res.text();
    expect(html).toContain("Blog");
  });

  it("GET /blog/:slug returns 404 for missing slug", async () => {
    const res = await app.request("/blog/nonexistent-post-slug");
    expect(res.status).toBe(404);
  });
});

describe("page content structure", () => {
  it("homepage includes styles.css link", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain('href="/assets/styles.css"');
  });

  it("pages include navigation", async () => {
    const res = await app.request("/");
    const html = await res.text();
    expect(html).toContain('data-testid="navigation"');
  });

  it("pages include footer", async () => {
    const res = await app.request("/about");
    const html = await res.text();
    expect(html).toContain('data-testid="footer"');
  });
});
