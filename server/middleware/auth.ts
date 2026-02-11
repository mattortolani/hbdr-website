// Shared authentication middleware
// Used by both worker.ts (Cloudflare) and server/index.ts (Node.js dev)

const sessions = new Map<string, { username: string; expiresAt: number }>();

export function generateSessionId(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}

export function getSessionFromCookie(cookieHeader: string | undefined): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/hbdr_admin_session=([^;]+)/);
  return match ? match[1] : null;
}

export function isAuthenticated(cookieHeader: string | undefined): boolean {
  const sessionId = getSessionFromCookie(cookieHeader);
  if (!sessionId) return false;
  const session = sessions.get(sessionId);
  if (!session || session.expiresAt < Date.now()) {
    if (sessionId) sessions.delete(sessionId);
    return false;
  }
  return true;
}

export function createSession(username: string): string {
  const sessionId = generateSessionId();
  sessions.set(sessionId, { username, expiresAt: Date.now() + 86400000 });
  return sessionId;
}

export function destroySession(cookieHeader: string | undefined): void {
  const sessionId = getSessionFromCookie(cookieHeader);
  if (sessionId) sessions.delete(sessionId);
}
