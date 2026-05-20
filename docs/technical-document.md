# Technical Document

## System Overview

Agent Mirror Analyzer is an AI representation auditing platform for Shopify
merchants. It analyzes product data and identifies the metadata issues that
degrade AI shopping-agent recommendation quality.

The platform combines:

- Shopify Admin GraphQL API integration (with a credential-free fallback for demos)
- Deterministic metadata scoring
- A rule-based semantic engine for AI perception simulation and copy rewriting
- A merchant-facing audit dashboard

## Architecture

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

### Frontend
- Next.js 15 + React 19
- Tailwind CSS for styling
- Sort, filter, re-run, and one-click CSV export
- Per-product card with score, issues, AI perception summary, semantic tags, and
  an expandable suggested rewrite

### Backend
- Node.js + Express
- Routes:
  - `GET /health` — liveness probe
  - `GET /api/audit` — JSON audit response
  - `GET /api/export` — streams the same audit as a CSV download
- Services:
  - `shopifyService` — Shopify Admin GraphQL client with sample-data fallback
  - `auditService` — deterministic scoring and issue detection
  - `aiService` — entrypoint that delegates to the rule-based chatbot
  - `chatbotEngine` — perception simulation, recommendations, semantic tags, suggested rewrites

### Shopify Integration
Fetches via the Admin GraphQL API:

- `id`, `title`, `description`
- `featuredImage.url`
- First variant's `price` and `sku`

If `SHOPIFY_STORE`/`SHOPIFY_ADMIN_TOKEN` are missing or `USE_SAMPLE_DATA=true`,
the backend returns three bundled demo products instead. This lets judges run
the full demo with zero credential setup.

### Semantic Layer (Rule-Based Chatbot)

The chatbot has four responsibilities:

1. **Perception simulation** — paragraph-level summary of how an AI shopping
   assistant would describe the product, gated on the count of detected issues.
2. **Weakness prioritization** — ranked list of the highest-impact issues.
3. **Recommendation generation** — concrete next steps for the merchant.
4. **Suggested rewrite** — a structured rewrite of the title and description
   with explicit placeholders for the missing fields (dimensions, material,
   warranty, compatibility, battery life).

The engine is intentionally rule-based for explainability, zero external cost,
and offline-demo reliability. The `aiService` boundary is the single seam
where an LLM could be swapped in.

## Data Flow

1. Dashboard requests `/api/audit`
2. Backend fetches the product catalog (Shopify GraphQL or sample data)
3. `auditService` runs the deterministic score + issue detection per product
4. `aiService` (via `chatbotEngine`) generates the perception summary,
   semantic tags, and a suggested rewrite
5. The backend returns a single JSON array, one entry per product
6. The dashboard renders the score, issues, summary, tags, and rewrite,
   supporting sort/filter/CSV export

## Deterministic Audit Logic

Scoring starts at 100 and deducts:
- `-20` if the description is missing or shorter than 50 chars
- `-10` if the primary variant has no SKU
- `-15` if there is no featured image
- `-8` if the description contains the ambiguous phrase "long battery"

Issues are surfaced as merchant-facing strings (e.g., *"Ambiguous battery
life claim"*) so the dashboard can render them directly without translation.

## Why We Split AI and Deterministic Logic

| Layer | Strengths | Reason it's its own concern |
|---|---|---|
| Deterministic | Measurable, fast, free, testable | Catches regressions in unit tests |
| Semantic (rule-based engine) | Generates language, prioritizes, rewrites | Failure here can't break scoring |

This split improves reliability, explainability, and cost — and means swapping
a real LLM in later is a one-file change at the `aiService` seam.

## Failure Handling

### Shopify API Failure
- If the Shopify API returns an unexpected shape, the backend raises a
  descriptive error and the dashboard surfaces a retry CTA.
- If credentials are missing, the system silently falls back to the sample
  catalog so demos still work.

### Semantic Engine Failure
- `aiService` catches any thrown error and falls back to `createFallbackSummary`,
  guaranteeing every product still gets an AI summary.

### Invalid Product Data
- Missing fields are surfaced as audit findings rather than crashing the
  pipeline (partial products are still scored and rendered).

## Tests

Unit tests use `node:test` and cover:

- Full-score path for a complete product
- Score deductions for short descriptions, missing SKU, missing image, and
  ambiguous battery claims
- End-to-end audit pipeline producing score, issues, summary, tags, and
  suggested rewrite
- The suggested rewrite targets the specific gaps detected for imperfect
  products

Run with `cd backend && npm test`.

## Local Development URLs

The app is currently running in Shopify CLI dev mode with the following verified URLs:

- Preview URL: `https://admin.shopify.com/store/agent-mirror-demo/apps/91be6c578baa8f338810c941bad77e88?dev-console=show`
- Direct dev tunnel: `https://sentences-assuming-oriented-courses.trycloudflare.com`
- GraphiQL URL: `http://localhost:3457/graphiql?key=6d41da1d38dbb95e2a5223ee26b46e50d73fbbfff119d9f57b0627a19666c9bc`

> If the Shopify admin preview page returns a 404, verify that the app is installed on the dev store and that the full URL is copied intact.

## Known Limitations

- Rule-based semantic layer (no live LLM in the hackathon MVP)
- No multi-store benchmarking
- No live agent integration (Perplexity / Rufus / ChatGPT shopping)
- Static heuristics — would benefit from learned weights

## Future Improvements

- Replace `chatbotEngine` with a real LLM at the `aiService` seam
- Live simulation across multiple AI shopping assistants
- Metafield and structured-data depth analysis
- Automated metadata rewrites via Shopify Admin mutations
- Cohort benchmarking against industry vertical baselines

## Tradeoffs

We prioritized:

- Focused AI representation analysis
- Explainability of every score and recommendation
- A working, credential-free demo

over:

- Full LLM integration in the MVP
- Broad ecommerce-management features
- Complex ML ranking systems

This kept the project aligned with the hackathon prompt while remaining
demonstrably reliable in a 90-second walkthrough.
