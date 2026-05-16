const assert = require("node:assert/strict");
const test = require("node:test");

const { createFallbackSummary } = require("../services/aiService");

test("createFallbackSummary includes title and detected issues", () => {
  const summary = createFallbackSummary(
    { title: "Demo Product" },
    ["Missing SKU information"]
  );

  assert.match(summary, /Demo Product/);
  assert.match(summary, /Missing SKU information/);
});
