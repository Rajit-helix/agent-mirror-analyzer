const {
  generateAISummary,
  generateSemanticTags,
  generateSuggestedRewrite,
} = require("./aiService");

const getPrimaryVariant = (product) => product.variants?.edges?.[0]?.node;

const calculateScore = (product) => {
  let score = 100;

  if (!product.description || product.description.length < 50) {
    score -= 20;
  }

  if (!getPrimaryVariant(product)?.sku) {
    score -= 10;
  }

  if (!product.featuredImage) {
    score -= 15;
  }

  if (
    product.description &&
    product.description.toLowerCase().includes("long battery")
  ) {
    score -= 8;
  }

  return Math.max(score, 0);
};

const detectIssues = (product) => {
  const issues = [];

  if (!product.description || product.description.length < 50) {
    issues.push("Product description is vague or too short");
  }

  if (!getPrimaryVariant(product)?.sku) {
    issues.push("Missing SKU information");
  }

  if (!product.featuredImage) {
    issues.push("Missing product image");
  }

  if (
    product.description &&
    product.description.toLowerCase().includes("long battery")
  ) {
    issues.push("Ambiguous battery life claim");
  }

  return issues;
};

const auditProduct = (product) => {
  const score = calculateScore(product);
  const issues = detectIssues(product);
  const aiSummary = generateAISummary(product, issues);
  const tags = generateSemanticTags(product);
  const suggestedRewrite = generateSuggestedRewrite(product, issues);

  return {
    aiSummary,
    issues,
    score,
    suggestedRewrite,
    tags,
    title: product.title,
  };
};

const auditProducts = async (products) => products.map(auditProduct);

module.exports = {
  auditProduct,
  auditProducts,
  calculateScore,
  detectIssues,
};
