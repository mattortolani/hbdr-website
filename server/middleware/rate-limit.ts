// Rate limiting with optional D1 persistence
// Falls back to in-memory Map when no D1 database is provided

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

/**
 * Check and increment rate limit for an IP.
 * If a D1 database is provided, persists counters across Worker evictions.
 * Otherwise falls back to in-memory (resets on eviction).
 */
export async function checkRateLimit(
  ip: string,
  db?: { prepare: (sql: string) => any; batch?: (stmts: any[]) => Promise<any[]> } | null
): Promise<RateLimitResult> {
  if (db) {
    return checkRateLimitD1(ip, db);
  }
  return checkRateLimitMemory(ip);
}

function checkRateLimitMemory(ip: string): RateLimitResult {
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

async function checkRateLimitD1(
  ip: string,
  db: { prepare: (sql: string) => any; batch?: (stmts: any[]) => Promise<any[]> }
): Promise<RateLimitResult> {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Clean expired + fetch current in one batch
  const cleanStmt = db.prepare("DELETE FROM rate_limits WHERE window_start < ?").bind(windowStart);
  const fetchStmt = db.prepare("SELECT count, window_start FROM rate_limits WHERE ip = ?").bind(ip);

  let row: any;
  if (db.batch) {
    const [, fetchResult] = await db.batch([cleanStmt, fetchStmt]);
    row = (fetchResult as any).results?.[0];
  } else {
    await cleanStmt.run();
    row = await fetchStmt.first();
  }

  if (!row || row.window_start < windowStart) {
    // New window — upsert with count=1
    await db.prepare(
      "INSERT INTO rate_limits (ip, count, window_start) VALUES (?, 1, ?) ON CONFLICT(ip) DO UPDATE SET count = 1, window_start = ?"
    ).bind(ip, now, now).run();
    return { allowed: true };
  }

  if (row.count >= MAX_REQUESTS) {
    const resetAt = row.window_start + WINDOW_MS;
    const retryAfter = Math.ceil((resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  // Increment
  await db.prepare(
    "UPDATE rate_limits SET count = count + 1 WHERE ip = ?"
  ).bind(ip).run();
  return { allowed: true };
}

export function getClientIp(headers: Headers): string {
  return (
    headers.get("cf-connecting-ip") ||
    headers.get("x-real-ip") ||
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
