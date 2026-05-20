const assert = require("node:assert/strict");
const test = require("node:test");

const {
  auditProducts,
  calculateScore,
  detectIssues,
} = require("../services/auditService");

const completeProduct = {
  title: "Complete Product",
  description:
    "A detailed product description with enough concrete information for AI shopping assistants to compare features and recommend confidently.",
  featuredImage: { url: "https://example.com/product.jpg" },
  variants: {
    edges: [
      {
        node: {
          sku: "SKU-123",
        },
      },
    ],
  },
};

test("calculateScore returns full score for complete metadata", () => {
  assert.equal(calculateScore(completeProduct), 100);
});

test("detectIssues finds short description, missing SKU, missing image, and ambiguous battery claim", () => {
  const product = {
    title: "Incomplete Watch",
    description: "Long battery.",
    featuredImage: null,
    variants: { edges: [{ node: { sku: "" } }] },
  };

  assert.deepEqual(detectIssues(product), [
    "Product description is vague or too short",
    "Missing SKU information",
    "Missing product image",
    "Ambiguous battery life claim",
  ]);
  assert.equal(calculateScore(product), 47);
});

test("auditProducts enriches each product with score, issues, summary, tags, and rewrite", async () => {
  const [result] = await auditProducts([completeProduct]);

  assert.equal(result.title, completeProduct.title);
  assert.equal(result.score, 100);
  assert.deepEqual(result.issues, []);
  assert.match(result.aiSummary, /AI Shopping Assistant Perspective/);
  assert.ok(Array.isArray(result.tags));
  assert.ok(result.suggestedRewrite);
  assert.equal(typeof result.suggestedRewrite.title, "string");
  assert.equal(typeof result.suggestedRewrite.description, "string");
});

test("auditProducts flags an imperfect product and produces a rewrite that targets the gaps", async () => {
  const product = {
    title: "Watch",
    description: "Long battery.",
    featuredImage: null,
    variants: { edges: [{ node: { sku: "" } }] },
  };

  const [result] = await auditProducts([product]);

  assert.ok(result.score < 100);
  assert.ok(result.issues.length >= 3);
  assert.ok(result.suggestedRewrite.hasGaps);
  assert.match(result.suggestedRewrite.description, /Suggested structured additions/);
});
