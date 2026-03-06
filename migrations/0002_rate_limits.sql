-- Rate limit counters persisted to D1
CREATE TABLE IF NOT EXISTS rate_limits (
  ip TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start INTEGER NOT NULL
);
