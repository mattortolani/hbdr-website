import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { checkRateLimit, getClientIp } from "../rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows first request (in-memory)", async () => {
    const ip = `test-${Date.now()}-${Math.random()}`;
    const result = await checkRateLimit(ip);
    expect(result.allowed).toBe(true);
  });

  it("allows up to 5 requests in window", async () => {
    const ip = `test-allow5-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      expect((await checkRateLimit(ip)).allowed).toBe(true);
    }
  });

  it("blocks after 5 requests", async () => {
    const ip = `test-block-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      await checkRateLimit(ip);
    }
    const result = await checkRateLimit(ip);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it("resets after window expires", async () => {
    const ip = `test-reset-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      await checkRateLimit(ip);
    }
    expect((await checkRateLimit(ip)).allowed).toBe(false);

    // Advance past the 15-minute window
    vi.advanceTimersByTime(16 * 60 * 1000);
    expect((await checkRateLimit(ip)).allowed).toBe(true);
  });

  it("falls back to in-memory when db is null", async () => {
    const ip = `test-null-db-${Date.now()}`;
    const result = await checkRateLimit(ip, null);
    expect(result.allowed).toBe(true);
  });

  it("falls back to in-memory when db is undefined", async () => {
    const ip = `test-undef-db-${Date.now()}`;
    const result = await checkRateLimit(ip, undefined);
    expect(result.allowed).toBe(true);
  });
});

describe("getClientIp", () => {
  it("prefers cf-connecting-ip", () => {
    const headers = new Headers({
      "cf-connecting-ip": "1.2.3.4",
      "x-real-ip": "5.6.7.8",
      "x-forwarded-for": "9.10.11.12",
    });
    expect(getClientIp(headers)).toBe("1.2.3.4");
  });

  it("falls back to x-real-ip", () => {
    const headers = new Headers({ "x-real-ip": "5.6.7.8" });
    expect(getClientIp(headers)).toBe("5.6.7.8");
  });

  it("falls back to x-forwarded-for first IP", () => {
    const headers = new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" });
    expect(getClientIp(headers)).toBe("1.1.1.1");
  });

  it("returns unknown when no headers", () => {
    expect(getClientIp(new Headers())).toBe("unknown");
  });
});
