const express = require("express");

const { auditProducts } = require("../services/auditService");
const { fetchProducts } = require("../services/shopifyService");

const router = express.Router();

router.get("/audit", async (_req, res) => {
  try {
    const products = await fetchProducts();
    const auditResults = await auditProducts(products);

    res.json(auditResults);
  } catch (error) {
    console.error("Audit failed", error);
    res.status(500).json({ error: "Audit failed" });
  }
});

module.exports = router;
