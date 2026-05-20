import {
  generateDiscoverabilityGuidance,
  generateProductAnalysis,
  generateSemanticTags,
} from "../services/lightweightChatbot.server";

const getRecommendation = (score) => {
  if (score >= 85) {
    return "Excellent AI discoverability";
  }

  if (score >= 70) {
    return "Add semantic product tags and richer buyer intent context";
  }

  if (score >= 60) {
    return "Improve metadata, SEO terms, and concrete product attributes";
  }

  return "Weak product description and metadata need immediate attention";
};

const getScoreIssues = (score) => {
  if (score >= 85) {
    return [];
  }

  if (score >= 70) {
    return [
      "Semantic tags could be more specific",
      "Conversational buying context can be expanded",
    ];
  }

  if (score >= 60) {
    return [
      "Metadata needs stronger SEO coverage",
      "Product attributes are not specific enough for AI recommendations",
    ];
  }

  return [
    "Weak product description and metadata",
    "Low confidence for AI shopping assistant recommendations",
    "Missing semantic product context",
  ];
};

const normalizeProduct = (product) => {
  const score = Number(product.score || 0);
  const title = product.title || product.name || "Untitled product";
  const recommendation = product.recommendation || getRecommendation(score);

  return {
    ...product,
    description:
      product.description ||
      `${title}. Current AI score: ${score}. ${recommendation}.`,
    recommendation,
    score,
    title,
  };
};

const summarizeProducts = (products) => {
  const averageScore = Math.round(
    products.reduce((total, product) => total + product.score, 0) /
      products.length
  );
  const weakestProduct = [...products].sort((a, b) => a.score - b.score)[0];
  const strongestProduct = [...products].sort((a, b) => b.score - a.score)[0];

  const productSections = products.map((product) => {
    const issues = getScoreIssues(product.score);
    const tags = generateSemanticTags(product);
    const guidance = generateDiscoverabilityGuidance(product, issues);
    const chatbotSummary = generateProductAnalysis(product, issues);

    return [
      `${product.title} (${product.score}/100)`,
      `Recommendation: ${product.recommendation}`,
      `Semantic tags: ${tags.join(", ")}`,
      chatbotSummary,
      guidance,
    ].join("\n");
  });

  return [
    "Lightweight AI Recommendation Summary",
    "",
    `Average score: ${averageScore}/100`,
    `Strongest listing: ${strongestProduct.title} (${strongestProduct.score}/100)`,
    `Prioritize first: ${weakestProduct.title} (${weakestProduct.score}/100)`,
    "",
    "Product-level recommendations:",
    "",
    productSections.join("\n\n---\n\n"),
  ].join("\n");
};

export async function action({ request }) {
  try {
    const body = await request.json();
    const products = Array.isArray(body.products)
      ? body.products.map(normalizeProduct)
      : [];

    if (products.length === 0) {
      return Response.json(
        {
          error: "No products were provided for analysis.",
          success: false,
        },
        { status: 400 }
      );
    }

    return Response.json({
      result: summarizeProducts(products),
      success: true,
    });
  } catch (error) {
    console.error("Local analysis failed", error);

    return Response.json(
      {
        error: error instanceof Error ? error.message : "Analysis failed",
        success: false,
      },
      { status: 500 }
    );
  }
}
