# Backend

## Responsibilities

The backend handles:
- Shopify Admin API integration
- product ingestion
- metadata auditing
- AI perception analysis
- readiness scoring

## Planned Stack

- Node.js
- Express
- Shopify Admin GraphQL API
- OpenAI API

## Planned Endpoints

### GET /products
Fetch Shopify products

### POST /audit
Run representation audit pipeline

### GET /score/:productId
Return AI readiness score

## Environment Variables

```env
SHOPIFY_STORE=
SHOPIFY_ADMIN_TOKEN=
OPENAI_API_KEY=
```

## Current Status

Backend integration setup in progress.

