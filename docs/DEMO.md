# 🎬 Agent Mirror Analyzer — 90-Second Demo Script

This is the exact script we use to walk a hackathon judge through the product.
Total time: **~90 seconds**, no Shopify credentials required.

--**Refer to DEMO_SCRIPT.md for the full demo (both video and audio)**.-

## 0. Pre-flight (do once, before judging)

```bash
# Terminal 1
cd backend
npm install
npm run dev

# Terminal 2
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** and confirm the dashboard renders 3 demo
products. Done.

---

## 1. Hook (10s)

> "Agent commerce is here. ChatGPT, Perplexity, Rufus — they all read your
> Shopify catalog and decide whether to recommend, skip, or misquote your
> products. The problem is, merchants today have **zero visibility** into how
> those agents read them. **Agent Mirror Analyzer** is that mirror."

## 2. The Score (15s)

Point at the dashboard.

> "We pulled the merchant's catalog through the Shopify Admin API and ran two
> layers of analysis. Each product gets an **AI Readiness Score** from 0 to 100
> — green is agent-friendly, red is agent-invisible. The summary cards across
> the top show the catalog at a glance."

## 3. The Issues + Perception (20s)

Click on the lowest-scoring product (AeroBrew Compact Coffee Maker, score 55).

> "Three issues here: the description is too thin, there's no SKU, no image.
> But the **AI Perception Summary** is the real win — this is exactly what a
> shopping agent would 'see.' We're simulating the agent's read so the
> merchant knows what the agent *can't* infer."

## 4. The Wow Moment — Suggested Rewrite (25s)

Click **"Show suggested rewrite"**.

> "Here's the part that closes the loop. We don't just say 'your description
> is bad' — we generate a structured rewrite with placeholders for the exact
> fields the merchant needs to fill in. Dimensions, material, warranty,
> compatibility. **Insight → action → copy-pasteable fix.**"

## 5. Filtering + Export (10s)

Toggle "Only show products with issues", switch sort to "Most issues first",
then click **Download CSV**.

> "For larger catalogs, merchants filter to the products that need work and
> export the full audit as CSV — drop it into a PIM, hand it to a copywriter,
> done."

## 6. Architecture + Closer (10s)

> "Two clean layers: **deterministic scoring** for measurable validation, and
> a **semantic engine** for perception and rewrites. Both are independently
> testable — `npm test` in the backend proves it. The semantic layer runs
> without external API keys, so the product works offline and stays
> explainable."
>
> "Agent Mirror Analyzer turns the AI agent from a black box into a mirror
> merchants can act on. **That's the submission.**"



---

## Q&A cheat sheet

**"Why no live LLM?"**
We separated semantic logic into a rule-based engine for explainability, cost,
and offline-demo reliability. Swapping in a real LLM at `aiService.js`
boundary is one file change — and we'd do that on day one of post-hackathon
work.

**"Why no Shopify auth flow in the MVP?"**
The parent repo is already scaffolded as a real Shopify embedded app (`app/`,
`prisma/`, `shopify.app.toml`). The hackathon MVP focuses on the *insight
engine* — the embedded-app shell is the day-two integration.

**"How would this scale to a 50k-product catalog?"**
The audit is per-product and stateless. We'd batch fetches via Shopify
GraphQL pagination, persist scores in Prisma (already in the parent repo),
and stream results to the dashboard.

**"What's the differentiation versus generic SEO tools?"**
SEO tools optimize for keyword matching on search engines. We optimize for
*agent reasoning* — disambiguating claims ("long battery"), surfacing missing
structured attributes (compatibility, dimensions), and simulating the
agent's perception so the merchant can act on it.
