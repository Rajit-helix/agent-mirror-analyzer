# Technical Document

## System Overview

Agent Mirror Analyzer is an AI representation auditing platform for Shopify merchants. The system analyzes merchant product data and identifies issues that reduce AI recommendation quality and representation confidence.

The platform combines:
- Shopify Admin API integration
- deterministic metadata analysis
- LLM-based perception analysis
- scoring and prioritization logic

## Architecture

### Frontend
- Next.js dashboard
- Displays audit reports, AI readiness scores, and recommendations

### Backend
- Node.js + Express API server
- Handles Shopify API integration and audit pipeline execution

### Shopify Integration
- Shopify Admin GraphQL API
- Fetches:
  - product titles
  - descriptions
  - images
  - metafields
  - pricing
  - inventory metadata

### AI Layer
- OpenAI API
- Generates:
  - AI perception summaries
  - ambiguity analysis
  - recommendation suggestions

## Data Flow

1. Merchant connects Shopify store
2. Backend fetches product catalog using Shopify Admin API
3. Deterministic audit engine evaluates metadata quality
4. Product data is passed to LLM analysis pipeline
5. AI-generated insights are combined with deterministic scores
6. Dashboard displays:
   - readiness score
   - detected issues
   - AI perception summary
   - recommended improvements

## Deterministic Audit Logic

The deterministic layer evaluates:
- metadata completeness
- title quality
- description clarity
- trust signal presence
- structured attribute coverage
- image availability

Example checks:
- missing compatibility details
- vague battery claims
- absent waterproof rating
- missing SKU
- incomplete metafields

## AI Responsibilities

The LLM layer is responsible for:
- simulating AI shopping agent perception
- identifying ambiguity
- generating merchant-facing explanations
- prioritizing recommendation clarity issues

Example output:
> "This product lacks connectivity specifications and contains ambiguous durability claims, reducing AI recommendation confidence."

## Why We Split AI and Deterministic Logic

We intentionally separated:
- deterministic validation
- AI interpretation

Deterministic logic handles:
- measurable validation
- metadata completeness
- rule-based scoring

LLM analysis handles:
- semantic ambiguity
- perception simulation
- contextual reasoning

This separation improves:
- reliability
- explainability
- cost efficiency

## Failure Handling

### Shopify API Failure
If Shopify API requests fail:
- retry logic is triggered
- cached product data may be used
- partial audit results are shown when possible

### LLM Failure
If the LLM returns malformed or empty output:
- deterministic scoring still executes
- fallback summaries are generated
- errors are logged for retry

### Invalid Product Data
If merchant product data is incomplete or malformed:
- products are still analyzed partially
- missing fields are surfaced as audit findings

## Known Limitations

Current limitations include:
- limited policy analysis
- no multi-store benchmarking
- no live AI shopping agent integration
- simplified scoring heuristics

## Future Improvements

With more time we would add:
- competitor benchmarking
- policy clarity analysis
- AI simulation across multiple shopping agents
- automated metadata rewriting
- merchant analytics dashboard

## Technical Tradeoffs

We intentionally prioritized:
- focused AI representation analysis
- explainability
- actionable outputs

instead of building:
- generic chatbots
- full ecommerce management tools
- broad analytics platforms

This allowed the project scope to remain aligned with the hackathon problem statement.
