const createClient = () => {
  const OpenAI = require("openai");

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const createFallbackSummary = (product, issues) => {
  const issueSummary = issues.length
    ? `Primary concern(s): ${issues.join("; ")}.`
    : "No obvious metadata issues were detected.";

  return [
    `${product.title} appears understandable to an AI shopping assistant based on the available catalog data.`,
    issueSummary,
    "Recommendation confidence improves when descriptions include concrete specs, trust signals, compatibility details, and unambiguous claims.",
  ].join(" ");
};

const generateAISummary = async (product, issues) => {
  if (!process.env.OPENAI_API_KEY) {
    return createFallbackSummary(product, issues);
  }

  try {
    const prompt = `
Analyze this Shopify product from the perspective of an AI shopping assistant.

Product Title:
${product.title}

Description:
${product.description || "No description provided."}

Detected Issues:
${issues.length ? issues.join(", ") : "No obvious metadata issues detected."}

Provide:
1. AI perception summary
2. Main weaknesses
3. Recommendation confidence concerns
`;

    const client = createClient();

    const response = await client.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4.1-mini",
    });

    return response.choices[0]?.message?.content || "AI analysis unavailable.";
  } catch (error) {
    console.error("AI analysis failed", error);

    return createFallbackSummary(product, issues);
  }
};

module.exports = { createFallbackSummary, generateAISummary };
