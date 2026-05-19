const { generateAISummary } = require("./aiService");

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

const auditProducts = async (products) => {
  const results = [];

  for (const product of products) {
    const score = calculateScore(product);
    const issues = detectIssues(product);
    const aiSummary = await generateAISummary(product, issues);

    results.push({
      aiSummary,
      issues,
      score,
      title: product.title,
    });
  }

  return results;
};

module.exports = { auditProducts, calculateScore, detectIssues };
