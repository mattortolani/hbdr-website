const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS = 5;

setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (entry.resetAt < now) {
      rateLimitMap.delete(key);
    }
  });
}, 60 * 1000);

export function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count++;
  return { allowed: true };
}

export function getClientIp(headers: Headers): string {
  return headers.get("cf-connecting-ip")
    || headers.get("x-real-ip")
    || headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || "unknown";
}
