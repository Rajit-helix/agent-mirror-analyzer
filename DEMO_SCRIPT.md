# Agent Mirror Analyzer - Demo Script (3-5 min)

## Demo Overview
This demo showcases how the Agent Mirror Analyzer helps Shopify merchants audit their product listings to improve AI recommendation confidence.

---

## SEGMENT 1: Introduction (0:00 - 0:30)

**Narration:**
"Agent Mirror Analyzer is an AI-powered audit platform for Shopify merchants. It analyzes your product data and identifies issues that reduce AI recommendation quality. The platform combines deterministic metadata analysis with LLM-based perception analysis to give you actionable insights."

**On Screen:**
- Show the Shopify admin dashboard
- Navigate to the Agent Mirror Analyzer app

---

## SEGMENT 2: Dashboard Overview (0:30 - 1:30)

**Narration:**
"When you open the dashboard, you'll see a summary of your product catalog health. The key metrics include your overall AI readiness score, which reflects how well your products are represented for AI systems, the total number of products analyzed, and high-priority issues that need immediate attention."

**On Screen:**
1. Open the Preview URL: `https://admin.shopify.com/store/agent-mirror-demo/apps/91be6c578baa8f338810c941bad77e88?dev-console=show`
2. Show the main dashboard with:
   - Summary statistics cards
   - AI Readiness Score display
   - Product count metrics
3. Point out the recommendation button

**Key Points to Highlight:**
- Real-time product analysis
- Color-coded severity indicators
- Clear action items

---

## SEGMENT 3: Run Lightweight Analysis (1:30 - 2:30)

**Narration:**
"Now let's run a lightweight analysis on the product catalog. This will fetch your product data from Shopify and generate AI-based recommendations in real time. The analysis checks for common issues like missing descriptions, unclear titles, and ambiguous claims that might confuse AI shopping agents."

**On Screen:**
1. Click "Run Lightweight Analysis" button
2. Wait for analysis to complete (show loading state)
3. Display the AI Recommendation Summary with:
   - Product score distribution
   - Issue breakdown
   - Semantic tag analysis
   - Discoverability guidance

**Key Points to Highlight:**
- Deterministic validation (structure, completeness)
- LLM analysis (semantic clarity, AI perception)
- Actionable recommendations

---

## SEGMENT 4: Inspect GraphiQL (2:30 - 3:30)

**Narration:**
"Behind the scenes, the app uses Shopify's Admin GraphQL API to fetch product data. Developers can test queries and mutations directly using the GraphiQL interface. This is useful for understanding the data structure and testing custom queries."

**On Screen:**
1. Open GraphiQL URL: `http://localhost:3457/graphiql?key=6d41da1d38dbb95e2a5223ee26b46e50d73fbbfff119d9f57b0627a19666c9bc`
2. Show a sample GraphQL query:
   ```graphql
   {
     products(first: 10) {
       edges {
         node {
           id
           title
           description
           images(first: 1) {
             edges {
               node {
                 url
               }
             }
           }
         }
       }
     }
   }
   ```
3. Execute the query and show the results

**Key Points to Highlight:**
- Real-time API testing
- Product data structure
- Developer-friendly interface

---

## SEGMENT 5: Summary & Call-to-Action (3:30 - 4:00)

**Narration:**
"Agent Mirror Analyzer helps merchants understand how AI systems perceive their products. By identifying and fixing issues early, you can improve recommendation confidence, increase product discoverability, and ultimately boost sales. The platform is built for developers and merchants who want to stay ahead of AI-driven commerce."

**On Screen:**
- Return to dashboard
- Show the key metrics one more time
- Display the GitHub repo link or project description

**Call-to-Action:**
"Try the app today by visiting the preview URL or check out the source code on GitHub to learn more about the architecture."

---

## Recording Tips

1. **Audio Recording Software:**
   - OBS Studio (free, recommended)
   - Camtasia
   - ScreenFlow (macOS)
   - Audacity (audio only, can layer separately)

2. **Setup:**
   - Ensure the dev server is running: `npm run dev`
   - Test all URLs before recording
   - Disable Shopify CLI notifications if possible
   - Use a clear, steady voice with natural pacing

3. **Timing Guide:**
   - Intro: 30 sec
   - Dashboard: 60 sec
   - Analysis Run: 60 sec
   - GraphiQL Demo: 60 sec
   - Summary: 30 sec
   - **Total: ~4 minutes**

4. **Editing (Post-Production):**
   - Add title card at the beginning
   - Include captions for key points
   - Add background music (royalty-free)
   - Export as MP4 or WebM for compatibility

---

## Live URLs for Reference

- **Preview URL:** `https://admin.shopify.com/store/agent-mirror-demo/apps/91be6c578baa8f338810c941bad77e88?dev-console=show`
- **GraphiQL URL:** `http://localhost:3457/graphiql?key=6d41da1d38dbb95e2a5223ee26b46e50d73fbbfff119d9f57b0627a19666c9bc`
- **Direct Tunnel:** `https://sentences-assuming-oriented-courses.trycloudflare.com`

---

## Notes

- The app is currently running in dev mode via Shopify CLI
- All URLs are live and ready for demonstration
- The AI product distribution score chart may take 10+ seconds to render on first load
- Ensure GraphiQL port is correct before recording (currently on port 3457)
