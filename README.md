# 🪞 Agent Mirror Analyzer

> **See your Shopify catalog the way an AI shopping agent sees it — and fix what they can't understand.**

[![Node](https://img.shields.io/badge/node-%E2%89%A520.x-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 The Problem

AI shopping agents (ChatGPT shopping, Perplexity, Rufus, Gemini, etc.) increasingly mediate the path from intent to purchase. They read your product titles, descriptions, images, and metafields — and decide whether to recommend, skip, or *misrepresent* your products.

Most Shopify catalogs were written for **humans skimming a PDP**, not for **agents reasoning over structured metadata**. The cost:

- Products get **skipped entirely** when key attributes are missing
- Agents **misquote specs** when descriptions are ambiguous ("long battery life")
- Recommendation **confidence drops**, so your products lose to better-described competitors

Merchants have **no visibility** into how AI agents perceive their store. **Agent Mirror Analyzer** is that mirror.

---

## ✨ What It Does

| | |
|---|---|
| 🔍 **Catalog Audit** | Pulls products via Shopify Admin GraphQL (or built-in sample data for credential-free demos). |
| 🧮 **AI Readiness Score** | Deterministic 0–100 score per product based on metadata completeness, ambiguity, and trust signals. |
| 🤖 **AI Perception Summary** | Simulates how an AI shopping assistant would describe each product — surfacing exactly what it can and can't infer. |
| ⚠️ **Issue Detection** | Flags missing SKUs, vague descriptions, ambiguous claims, missing images, and absent structured attributes. |
| 💡 **Optimization Recommendations** | Prioritized, merchant-actionable fixes — not opaque scores. |
| 📤 **Export Report** | One-click CSV download of the full audit for sharing with copywriters or PIM teams. |

---

## 🖼️ Demo

Run it locally in **two commands** (no Shopify or OpenAI credentials required):

```bash
# Terminal 1 — backend (uses sample products by default)
cd backend && npm install && npm run dev

# Terminal 2 — dashboard
cd frontend && npm install && npm run dev
```

Open **http://localhost:3000** — you'll see a dark, agent-themed dashboard scoring three intentionally imperfect demo products.

📽️ See [`DEMO_SCRIPT.md`](DEMO_SCRIPT.md) for the 90-second pitch script we use to walk judges through the experience.

---

## 🏗️ Architecture

```
┌──────────────────────┐      ┌───────────────────────────┐      ┌──────────────────┐
│  Next.js Dashboard   │ ───▶ │   Express Audit API       │ ───▶ │  Shopify Admin   │
│  (Tailwind, React)   │ ◀─── │   /api/audit  /api/export │ ◀─── │  GraphQL API     │
└──────────────────────┘      └───────────────┬───────────┘      └──────────────────┘
                                              │
                              ┌───────────────┴────────────────┐
                              ▼                                ▼
                  ┌───────────────────────┐     ┌────────────────────────────┐
                  │  Deterministic Audit  │     │   Rule-Based Chatbot       │
                  │  (score + issues)     │     │   (perception + rewrite)   │
                  └───────────────────────┘     └────────────────────────────┘
```

**Why split deterministic and semantic logic?**
- **Deterministic** → measurable, explainable, fast, free
- **Semantic** → perception simulation, recommendations, suggested rewrites

The two layers are independently testable and each one's failure is graceful — if the semantic layer ever errors, scores still render.

---

## 📁 Repository Layout

```
agent-mirror-analyzer/
├── README.md                  ← you are here
├── LICENSE
├── CONTRIBUTION_NOTE.md       ← work split
├── SUBMISSION_ARTIFACTS.md    ← submission checklist
├── docs/
│   ├── product-document.md    ← product thinking
│   ├── technical-document.md  ← architecture decisions
│   ├── decision-log.md        ← 7 key design decisions
│   ├── mvp-setup.md           ← step-by-step setup
│   └── DEMO.md                ← 90-second pitch script
├── backend/                   ← Express + Node audit API
│   ├── server.js
│   ├── routes/auditRoutes.js
│   ├── services/
│   │   ├── shopifyService.js  ← Shopify GraphQL + sample data fallback
│   │   ├── auditService.js    ← deterministic scoring
│   │   ├── aiService.js       ← perception summary entrypoint
│   │   └── chatbotEngine.js   ← rule-based perception + rewrite
│   ├── data/sampleProducts.js ← intentionally-imperfect demo catalog
│   └── test/                  ← node:test unit tests
└── frontend/                  ← Next.js dashboard
    ├── pages/index.js
    ├── components/
    │   ├── ProductCard.js
    │   ├── ScoreCard.js
    │   └── SummaryStats.js
    └── styles/globals.css
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 20
- npm

### 1. Backend

```bash
cd backend
cp .env.example .env          # optional — sample data works without it
npm install
npm run dev                   # http://localhost:5000
```

**Environment variables** (all optional — sample data is the default):

| Variable | Purpose | Default |
|---|---|---|
| `SHOPIFY_STORE` | `your-store.myshopify.com` | — |
| `SHOPIFY_ADMIN_TOKEN` | Admin API access token | — |
| `SHOPIFY_API_VERSION` | Admin API version | `2026-04` |
| `USE_SAMPLE_DATA` | Force the demo catalog | `true` if Shopify creds missing |
| `PORT` | Backend port | `5000` |

> **No Shopify store?** Leave `SHOPIFY_STORE`/`SHOPIFY_ADMIN_TOKEN` blank — the API falls back to the bundled demo catalog automatically.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev                   # http://localhost:3000
```

Override the API host with `NEXT_PUBLIC_API_BASE_URL` if your backend runs elsewhere.

### 3. API Endpoints

| Method | Path | Returns |
|---|---|---|
| `GET` | `/health` | `{ status: "ok" }` |
| `GET` | `/api/audit` | Array of `{ title, score, issues[], aiSummary, suggestedRewrite }` |
| `GET` | `/api/export` | CSV download of the latest audit |

---

## 🧪 Tests

```bash
cd backend
npm test
```

Unit tests cover the deterministic scoring, issue detection, fallback summaries, and the end-to-end audit pipeline.

---

## 🏆 Why This Submission Stands Out

1. **Solves a real, named pain** — merchants today have *zero* visibility into how AI agents read their catalog.
2. **Zero-friction demo** — works credential-free in two commands; judges don't need to provision a Shopify store.
3. **Honest about its layers** — deterministic scoring is *not* dressed up as AI, and the semantic layer can run without external API keys.
4. **Actionable, not aesthetic** — every issue maps to a prioritized recommendation, and the suggested rewrite turns insight into a copy-pasteable fix.
5. **Tested + documented** — unit tests, decision log, technical doc, product doc, and a pitch script in one repo.

---

## 🛣️ Roadmap

- 🔄 Live agent simulation across multiple AI shopping assistants (ChatGPT, Perplexity, Rufus)
- 🏷️ Metafield + structured-data depth analysis
- 🧬 Automated metadata rewriting via Shopify Admin mutations
- 📊 Cohort benchmarking against industry vertical baselines
- 🔌 Native Shopify app (the parent `app/` directory is scaffolded for this next step)

---

## 📄 License

[MIT](LICENSE) — see file for details.

## 🙌 Credits

Built for the **Kasparro Agent Commerce Hackathon** by **Team Agent Mirror**. See [`CONTRIBUTION_NOTE.md`](CONTRIBUTION_NOTE.md) for the work split.
