# Agent Mirror Analyzer — MVP Setup

> Zero-credential setup: the bundled sample catalog runs the full demo
> without a Shopify store or any external API keys.

## Backend

```bash
cd backend
cp .env.example .env          # optional — defaults to sample data
npm install
npm run dev
```

The backend exposes:

- `GET http://localhost:5000/health` — liveness probe
- `GET http://localhost:5000/api/audit` — JSON audit
- `GET http://localhost:5000/api/export` — CSV download

### Environment Variables

All are optional. Leaving Shopify credentials blank, or setting
`USE_SAMPLE_DATA=true`, makes the backend serve the bundled demo catalog.

| Variable | Purpose | Default |
|---|---|---|
| `SHOPIFY_STORE` | `your-store.myshopify.com` | _(empty → sample data)_ |
| `SHOPIFY_ADMIN_TOKEN` | Admin API access token | _(empty → sample data)_ |
| `SHOPIFY_API_VERSION` | Admin API version | `2026-04` |
| `USE_SAMPLE_DATA` | Force the demo catalog | `true` if Shopify creds missing |
| `PORT` | Backend port | `5000` |

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**. Override the backend URL with
`NEXT_PUBLIC_API_BASE_URL` if needed.

## Tests

```bash
cd backend
npm test
```

## MVP Success Criteria

1. Fetch Shopify products (or sample data fallback).
2. Detect metadata issues deterministically.
3. Generate AI readiness scores.
4. Produce AI perception summaries.
5. Surface a suggested rewrite per product.
6. Display, sort, filter, and export results from the dashboard.
