import { describe, it, expect } from "vitest";
import { generateCsrfToken, getCsrfTokenFromCookie, validateCsrfToken, validateOrigin } from "../csrf";

describe("generateCsrfToken", () => {
  it("generates a 64-character hex string", () => {
    const token = generateCsrfToken();
    expect(token).toMatch(/^[0-9a-f]{64}$/);
  });

  it("generates unique tokens", () => {
    const tokens = new Set(Array.from({ length: 10 }, () => generateCsrfToken()));
    expect(tokens.size).toBe(10);
  });
});

describe("getCsrfTokenFromCookie", () => {
  it("extracts token from cookie header", () => {
    expect(getCsrfTokenFromCookie("hbdr_csrf=abc123; other=val")).toBe("abc123");
  });

  it("returns null for missing cookie", () => {
    expect(getCsrfTokenFromCookie("other=val")).toBeNull();
    expect(getCsrfTokenFromCookie(undefined)).toBeNull();
  });
});

describe("validateCsrfToken", () => {
  it("validates matching tokens", () => {
    const token = generateCsrfToken();
    expect(validateCsrfToken(`hbdr_csrf=${token}`, token)).toBe(true);
  });

  it("rejects mismatched tokens", () => {
    const token1 = generateCsrfToken();
    const token2 = generateCsrfToken();
    expect(validateCsrfToken(`hbdr_csrf=${token1}`, token2)).toBe(false);
  });

  it("rejects missing tokens", () => {
    expect(validateCsrfToken(undefined, "abc")).toBe(false);
    expect(validateCsrfToken("hbdr_csrf=abc", undefined)).toBe(false);
    expect(validateCsrfToken(undefined, undefined)).toBe(false);
  });

  it("rejects different-length tokens (timing-safe)", () => {
    expect(validateCsrfToken("hbdr_csrf=short", "longer_token_here")).toBe(false);
  });
});

describe("validateOrigin", () => {
  it("validates matching origin", () => {
    const headers = new Headers({ origin: "https://hbdr.com", host: "hbdr.com" });
    expect(validateOrigin(headers)).toBe(true);
  });

  it("rejects mismatched origin", () => {
    const headers = new Headers({ origin: "https://evil.com", host: "hbdr.com" });
    expect(validateOrigin(headers)).toBe(false);
  });

  it("falls back to referer when no origin", () => {
    const headers = new Headers({ referer: "https://hbdr.com/page", host: "hbdr.com" });
    expect(validateOrigin(headers)).toBe(true);
  });

  it("allows requests with no origin or referer", () => {
    const headers = new Headers({ host: "hbdr.com" });
    expect(validateOrigin(headers)).toBe(true);
  });

  it("rejects malformed origin", () => {
    const headers = new Headers({ origin: "not-a-url", host: "hbdr.com" });
    expect(validateOrigin(headers)).toBe(false);
  });
});
