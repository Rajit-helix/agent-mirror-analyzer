const titleKeywordPattern = /\b(size|color|material|brand|type|pack|watch|smart|fitness)\b/i;
const sizePattern = /\b(size|dimension|length|width|height|diameter|mm|cm|inch)\b/i;
const materialPattern = /\b(material|fabric|plastic|metal|wood|leather|cotton|silicone)\b/i;
const featurePattern = /\b(feature|benefit|use|purpose|ideal for|perfect for|tracking|battery)\b/i;

const tagPatterns = {
  "fitness-tech": /\b(fitness|smartwatch|smart watch|tracking|pulse|active)\b/i,
  "wearable": /\b(watch|wearable|strap|wrist)\b/i,
  "premium": /\b(premium|pro|edge|high-end|advanced)\b/i,
  "lightweight": /\b(light|lite|compact|portable)\b/i,
  "battery-life": /\b(battery|charge|power)\b/i,
  "health": /\b(heart|sleep|health|wellness)\b/i,
};

export function analyzeTitleIssues(title) {
  const safeTitle = String(title || "").trim();
  const issues = [];

  if (!safeTitle) {
    return ["Title is missing"];
  }

  if (safeTitle.length < 10) {
    issues.push("Title too short for confident product matching");
  }

  if (!titleKeywordPattern.test(safeTitle)) {
    issues.push("Title needs clearer product type or attribute keywords");
  }

  return issues;
}

export function analyzeDescriptionIssues(description) {
  const safeDescription = String(description || "").trim();
  const issues = [];

  if (!safeDescription) {
    return ["Missing product description"];
  }

  if (safeDescription.length < 100) {
    issues.push("Description needs richer product detail");
  }

  const missingDetails = [];

  if (!sizePattern.test(safeDescription)) {
    missingDetails.push("size or dimensions");
  }

  if (!materialPattern.test(safeDescription)) {
    missingDetails.push("material");
  }

  if (!featurePattern.test(safeDescription)) {
    missingDetails.push("features or benefits");
  }

  if (missingDetails.length > 0) {
    issues.push(`Missing ${missingDetails.join(", ")} detail`);
  }

  return issues;
}

export function generateSemanticTags(product) {
  const combined = `${product.title || ""} ${product.description || ""}`;
  const tags = Object.entries(tagPatterns)
    .filter(([, pattern]) => pattern.test(combined))
    .map(([tag]) => tag);

  return tags.length > 0 ? tags : ["general-product"];
}

export function generateDiscoverabilityGuidance(product, issues) {
  const guidance = [];

  if (issues.length === 0) {
    guidance.push("Product metadata is already strong for AI discovery.");
  } else {
    guidance.push(`Address ${issues.length} metadata gap(s) before scaling recommendations.`);
  }

  guidance.push("Add concrete specs, compatibility language, and buyer intent phrases.");
  guidance.push("Use concise semantic tags that match how customers ask shopping agents.");

  if (product.score < 70) {
    guidance.push("Prioritize this listing before traffic campaigns or agent-facing promotions.");
  }

  return guidance.join("\n");
}

export function generateProductAnalysis(product, detectedIssues = []) {
  const titleIssues = analyzeTitleIssues(product.title);
  const descriptionIssues = analyzeDescriptionIssues(product.description);
  const issues = [...new Set([...detectedIssues, ...titleIssues, ...descriptionIssues])];
  const confidence =
    product.score >= 80 ? "high" : product.score >= 65 ? "medium" : "low";

  return [
    `AI assistant confidence: ${confidence}`,
    "",
    issues.length
      ? `Main weaknesses:\n${issues.map((issue, index) => `${index + 1}. ${issue}`).join("\n")}`
      : "Main weaknesses:\nNo major metadata gaps detected.",
    "",
    "Optimization recommendations:",
    "1. Add product type, audience, and use case language.",
    "2. Include concrete specs such as size, materials, battery, and compatibility.",
    "3. Use semantic keywords that match conversational search prompts.",
  ].join("\n");
}
