# Secrets

Names and sources only — no values are stored in this repo.

## CI (GitHub Actions repo secrets)

| Name | Source | Used by |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare dashboard → My Profile → API Tokens | `.github/workflows/{deploy,preview}.yml` (wrangler-action) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare dashboard → account home (account ID) | same |

## Worker runtime (Cloudflare Workers secrets — `wrangler secret put <NAME>`)

| Name | Source | Used by |
|---|---|---|
| `ADMIN_PASSWORD` | operator-chosen | admin panel login (`server/middleware/auth.ts`); dev fallback is `hbdr2025!` |
| `RESEND_API_KEY` | resend.com → API Keys | contact/lead notification email (`server/services/email.ts`) |

`PORT` is dev-only server config, not a secret.
