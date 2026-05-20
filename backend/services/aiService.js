const ChatbotEngine = require("./chatbotEngine");

const chatbot = new ChatbotEngine();

const generateAISummary = (product, issues) => {
  try {
    return chatbot.generateProductAnalysis(product, issues || []);
  } catch (error) {
    console.error("Chatbot analysis failed", error);
    return createFallbackSummary(product, issues || []);
  }
};

const generateSuggestedRewrite = (product, issues) => {
  try {
    return chatbot.generateSuggestedRewrite(product, issues || []);
  } catch (error) {
    console.error("Chatbot rewrite failed", error);
    return null;
  }
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

const generateSemanticTags = (product) => chatbot.generateSemanticTags(product);

const generateDiscoverabilityGuidance = (product, issues) =>
  chatbot.generateDiscoverabilityGuidance(product, issues || []);

module.exports = {
  createFallbackSummary,
  generateAISummary,
  generateDiscoverabilityGuidance,
  generateSemanticTags,
  generateSuggestedRewrite,
};
