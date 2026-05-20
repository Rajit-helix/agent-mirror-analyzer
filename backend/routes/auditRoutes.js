const express = require("express");

const { auditProducts } = require("../services/auditService");
const { fetchProducts } = require("../services/shopifyService");

const router = express.Router();

const csvEscape = (value) => {
  if (value === null || value === undefined) return "";
  const str = String(value).replace(/\r?\n/g, " ");
  if (/[",]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

const toCsv = (results) => {
  const header = ["Title", "Score", "Issues", "Tags", "AI Summary"];
  const rows = results.map((result) => [
    csvEscape(result.title),
    csvEscape(result.score),
    csvEscape(result.issues.join(" | ")),
    csvEscape((result.tags || []).join(" | ")),
    csvEscape(result.aiSummary),
  ]);
  return [header, ...rows].map((row) => row.join(",")).join("\n");
};

router.get("/audit", async (_req, res) => {
  try {
    const products = await fetchProducts();
    const auditResults = await auditProducts(products);
    res.json(auditResults);
  } catch (error) {
    console.error("Audit failed", error);
    res.status(500).json({ error: "Audit failed", message: error.message });
  }
});

router.get("/export", async (_req, res) => {
  try {
    const products = await fetchProducts();
    const auditResults = await auditProducts(products);
    const csv = toCsv(auditResults);
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="agent-mirror-audit-${new Date()
        .toISOString()
        .replace(/[:.]/g, "-")}.csv"`
    );
    res.send(csv);
  } catch (error) {
    console.error("Export failed", error);
    res.status(500).json({ error: "Export failed", message: error.message });
  }
});

module.exports = router;
