import { describe, it, expect, beforeEach, vi } from "vitest";
import { checkRateLimit, getClientIp } from "../rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => {
    // Reset rate limit state by using a unique IP per test
    vi.useFakeTimers();
  });

  it("allows first request", () => {
    const ip = `test-${Date.now()}-${Math.random()}`;
    const result = checkRateLimit(ip);
    expect(result.allowed).toBe(true);
  });

  it("allows up to 5 requests in window", () => {
    const ip = `test-allow5-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip).allowed).toBe(true);
    }
  });

  it("blocks after 5 requests", () => {
    const ip = `test-block-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip);
    }
    const result = checkRateLimit(ip);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it("resets after window expires", () => {
    const ip = `test-reset-${Date.now()}`;
    for (let i = 0; i < 5; i++) {
      checkRateLimit(ip);
    }
    expect(checkRateLimit(ip).allowed).toBe(false);

    // Advance past the 15-minute window
    vi.advanceTimersByTime(16 * 60 * 1000);
    expect(checkRateLimit(ip).allowed).toBe(true);
  });

  vi.useRealTimers();
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
