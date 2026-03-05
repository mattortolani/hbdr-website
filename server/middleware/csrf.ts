// CSRF protection — double-submit cookie pattern
// Stateless: no server-side token storage needed

export function generateCsrfToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function getCsrfTokenFromCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/hbdr_csrf=([^;]+)/);
  return match ? match[1] : null;
}

export function validateCsrfToken(cookieHeader: string | undefined, formToken: string | undefined): boolean {
  const cookieToken = getCsrfTokenFromCookie(cookieHeader);
  if (!cookieToken || !formToken) return false;
  if (cookieToken.length !== formToken.length) return false;
  // Constant-time comparison to prevent timing attacks
  let result = 0;
  for (let i = 0; i < cookieToken.length; i++) {
    result |= cookieToken.charCodeAt(i) ^ formToken.charCodeAt(i);
  }
  return result === 0;
}

/**
 * Validate that the Origin or Referer header matches the request Host.
 * Protects JSON API endpoints from cross-origin requests.
 */
export function validateOrigin(headers: Headers): boolean {
  const origin = headers.get("origin");
  const host = headers.get("host");

  if (origin) {
    try {
      const originHost = new URL(origin).host;
      return originHost === host;
    } catch {
      return false;
    }
  }

  // Fall back to Referer
  const referer = headers.get("referer");
  if (referer) {
    try {
      const refererHost = new URL(referer).host;
      return refererHost === host;
    } catch {
      return false;
    }
  }

  // No Origin or Referer — allow (e.g. same-origin navigation, curl, Postman)
  // CSRF tokens provide defense in depth for form POSTs
  return true;
}
