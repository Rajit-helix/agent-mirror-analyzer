# Agent Mirror Analyzer MVP Setup

## Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Configure `.env` with a Shopify Admin API token and an OpenAI API key before calling the audit endpoint. For a credential-free demo, set `USE_SAMPLE_DATA=true`; the backend will return included sample products and fallback AI summaries when no OpenAI key is present.

```txt
http://localhost:5000/api/audit
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The dashboard expects the backend at `http://localhost:5000` by default. Override this with `NEXT_PUBLIC_API_BASE_URL` when needed.

## MVP Success Criteria

1. Fetch Shopify products.
2. Detect metadata issues.
3. Generate AI readiness scores.
4. Produce AI perception summaries.
5. Display results on the dashboard.
