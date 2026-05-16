# Agent Mirror Analyzer

AI Representation Optimizer for Shopify merchants built for the Kasparro Agent Commerce Hackathon.

The MVP includes:

- a Node/Express backend that fetches Shopify products through the Shopify Admin GraphQL API;
- a metadata audit pipeline that detects missing or ambiguous product information;
- OpenAI-powered AI perception summaries for each product; and
- a Next.js/Tailwind dashboard that displays readiness scores, issues, and summaries.

## Repository Structure

```txt
agent-mirror-analyzer/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   ├── routes/
│   │   └── auditRoutes.js
│   └── services/
│       ├── aiService.js
│       ├── auditService.js
│       └── shopifyService.js
├── frontend/
│   ├── package.json
│   ├── pages/
│   │   ├── _app.js
│   │   └── index.js
│   ├── components/
│   │   ├── ProductCard.js
│   │   └── ScoreCard.js
│   └── styles/
│       └── globals.css
└── docs/
```

## Backend Quick Start

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Required environment variables:

```env
SHOPIFY_STORE=agent-mirror-demo.myshopify.com
SHOPIFY_ADMIN_TOKEN=your_shopify_admin_token
SHOPIFY_API_VERSION=2026-04
OPENAI_API_KEY=your_openai_key
PORT=5000
```

Audit endpoint:

```txt
http://localhost:5000/api/audit
```

## Frontend Quick Start

```bash
cd frontend
npm install
npm run dev
```

The dashboard calls `http://localhost:5000` by default. Set `NEXT_PUBLIC_API_BASE_URL` to point at another backend URL.
