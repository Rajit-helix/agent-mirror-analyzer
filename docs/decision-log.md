# Decision Log

## Decision 1 — Use intentionally imperfect Shopify product data

We intentionally created products with:
- missing metadata
- vague descriptions
- incomplete specifications
- weak trust signals

Reason:
Real merchant stores frequently contain incomplete product information. The system is designed to identify and prioritize these representation gaps.

---

## Decision 2 — Separate deterministic logic from AI reasoning

We separated:
- rule-based validation
- LLM interpretation

Reason:
Deterministic checks are more reliable for measurable validation, while LLMs are better suited for ambiguity analysis and perception simulation.

---

## Decision 3 — Focus only on AI representation quality

We intentionally avoided:
- checkout systems
- recommendation engines
- generic ecommerce assistants

Reason:
The hackathon specifically evaluates merchant AI representation quality and product thinking.

---

## Decision 4 — Use Shopify Admin API as the primary ingestion source

We chose Shopify Admin API because it provides:
- structured product metadata
- images
- metafields
- inventory information

Reason:
The challenge is centered around Shopify merchant ecosystems.

---

## Decision 5 — Prioritize explainability over model complexity

The system produces:
- explicit issue detection
- actionable recommendations
- readable AI summaries

Reason:
Merchant trust depends on understandable audit results rather than opaque scoring systems.

---

## Decision 6 — Keep scoring heuristics intentionally simple

We used weighted heuristic scoring instead of complex ML ranking systems.

Reason:
The project prioritizes clarity, explainability, and implementation speed within hackathon constraints.

---

## Decision 7 — Simulate AI shopping agent perception

We added an LLM-powered perception analysis layer.

Reason:
The core challenge asks merchants to understand how AI shopping agents perceive their products.
