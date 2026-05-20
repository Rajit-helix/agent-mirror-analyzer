# Frontend — Agent Mirror Analyzer Dashboard

Next.js + Tailwind dashboard that visualizes the audit produced by the
backend.

## Features

- AI Readiness Score per product (color-coded)
- Detected issues with merchant-friendly copy
- AI perception summary (simulated agent read)
- Semantic tag chips
- Expandable suggested rewrite per product
- Catalog-level summary stats
- Sort, filter, re-run, and one-click CSV export

## Stack

- Next.js 15
- React 19
- Tailwind CSS 3
- Axios

## Running Locally

```bash
npm install
npm run dev
```

The dashboard calls `http://localhost:5000/api/audit` by default. Override the
backend host with `NEXT_PUBLIC_API_BASE_URL`.
