const ChatbotEngine = require("./chatbotEngine");

const chatbot = new ChatbotEngine();

const generateAISummary = async (product, issues) => {
  try {
    return chatbot.generateProductAnalysis(product, issues || []);
  } catch (error) {
    console.error("Chatbot analysis failed", error);
    return createFallbackSummary(product, issues || []);
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

const generateSemanticTags = (product) => {
  return chatbot.generateSemanticTags(product);
};

const generateDiscoverabilityGuidance = (product, issues) => {
  return chatbot.generateDiscoverabilityGuidance(product, issues || []);
};

module.exports = {
  createFallbackSummary,
  generateAISummary,
  generateSemanticTags,
  generateDiscoverabilityGuidance,
};
