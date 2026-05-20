# Backend — Agent Mirror Analyzer

Express + Node API that audits Shopify product metadata for AI shopping-agent
readiness.

## Responsibilities

- Shopify Admin GraphQL ingestion (with a credential-free sample-data fallback)
- Deterministic metadata scoring and issue detection
- Rule-based semantic engine for AI perception summaries and suggested rewrites
- JSON audit + CSV export endpoints

## Stack

- Node.js (≥ 20)
- Express
- Axios
- dotenv

> No external LLM dependency. The semantic layer is a transparent, testable
> rule engine — see `services/chatbotEngine.js`.

## Endpoints

| Method | Path | Returns |
|---|---|---|
| `GET` | `/health` | `{ status: "ok" }` |
| `GET` | `/api/audit` | Array of `{ title, score, issues[], aiSummary, tags, suggestedRewrite }` |
| `GET` | `/api/export` | CSV download of the latest audit |

## Environment Variables

Copy `.env.example` to `.env`. All values are optional — leaving Shopify
credentials empty triggers the bundled sample catalog so demos work without
any setup.

```env
SHOPIFY_STORE=
SHOPIFY_ADMIN_TOKEN=
SHOPIFY_API_VERSION=2026-04
USE_SAMPLE_DATA=true
PORT=5000
```

## Running Locally

```bash
npm install
npm run dev
```

## Tests

```bash
npm test
```

All 5 unit tests should pass.
