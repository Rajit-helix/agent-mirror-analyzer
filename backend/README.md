# Backend

## Responsibilities

The backend handles:

- Shopify Admin GraphQL API product ingestion;
- product metadata audit scoring;
- issue detection for AI shopping-agent readiness; and
- OpenAI-powered perception summaries.

## Stack

- Node.js
- Express
- Axios
- dotenv
- OpenAI Node SDK

## Endpoint

### `GET /api/audit`

Fetches Shopify products, audits metadata quality, generates an AI readiness score, and returns AI perception summaries.

## Environment Variables

Copy `.env.example` to `.env` and fill in real credentials:

```env
SHOPIFY_STORE=agent-mirror-demo.myshopify.com
SHOPIFY_ADMIN_TOKEN=your_shopify_admin_token
SHOPIFY_API_VERSION=2026-04
OPENAI_API_KEY=your_openai_key
PORT=5000
```

## Running Locally

```bash
npm install
npm run dev
```
