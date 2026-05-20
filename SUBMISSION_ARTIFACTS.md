# Submission Artifacts — Agent Mirror Analyzer

This repository contains every artifact required by the Kasparro Agent
Commerce Hackathon submission rubric.

## Required Documents

| Artifact | Location | What it covers |
|---|---|---|
| Top-level README | [`README.md`](README.md) | Problem, solution, quickstart, architecture, roadmap |
| Product document | [`docs/product-document.md`](docs/product-document.md) | Problem, users, solution, scope, tradeoffs |
| Technical document | [`docs/technical-document.md`](docs/technical-document.md) | Architecture, data flow, AI vs. deterministic split, limitations |
| Decision log | [`docs/decision-log.md`](docs/decision-log.md) | Seven key design decisions with rationale |
| Contribution note | [`CONTRIBUTION_NOTE.md`](CONTRIBUTION_NOTE.md) | Work split between product thinking and development |
| Demo script | [`docs/DEMO.md`](docs/DEMO.md) | 90-second walkthrough used for judge demos |
| MVP setup | [`docs/mvp-setup.md`](docs/mvp-setup.md) | Step-by-step run instructions |

## Code Artifacts

| Layer | Path | Purpose |
|---|---|---|
| Backend (Express + Node) | [`backend/`](backend/) | Audit API: `/api/audit` (JSON) and `/api/export` (CSV) |
| Frontend (Next.js + Tailwind) | [`frontend/`](frontend/) | Merchant-facing audit dashboard |
| Tests (`node:test`) | [`backend/test/`](backend/test/) | Unit coverage for scoring, issue detection, AI summary, and rewrite |
| Sample catalog | [`backend/data/sampleProducts.js`](backend/data/sampleProducts.js) | Intentionally imperfect demo products for credential-free demos |

## Reproducing the Demo

```bash
# Backend
cd backend && npm install && npm run dev          # http://localhost:5000

# Frontend
cd frontend && npm install && npm run dev         # http://localhost:3000
```

Then open `http://localhost:3000` and follow [`docs/DEMO.md`](docs/DEMO.md).

## Tests

```bash
cd backend && npm test
```

All 5 unit tests should pass.

## Demo Video

_To be added._ Recording will follow the [`docs/DEMO.md`](docs/DEMO.md) script
exactly so judges can pause at the same marks the script describes.
