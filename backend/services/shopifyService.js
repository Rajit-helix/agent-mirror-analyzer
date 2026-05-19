const axios = require("axios");

const { sampleProducts } = require("../data/sampleProducts");

const shouldUseSampleData = () =>
  process.env.USE_SAMPLE_DATA === "true" ||
  process.env.NODE_ENV === "test" ||
  (!process.env.SHOPIFY_STORE && !process.env.SHOPIFY_ADMIN_TOKEN);

const getShopifyConfig = () => {
  const store = process.env.SHOPIFY_STORE;
  const token = process.env.SHOPIFY_ADMIN_TOKEN;
  const apiVersion = process.env.SHOPIFY_API_VERSION || "2026-04";

  if (!store || !token) {
    throw new Error(
      "Missing Shopify configuration. Set SHOPIFY_STORE and SHOPIFY_ADMIN_TOKEN, or set USE_SAMPLE_DATA=true for demo data."
    );
  }

  return { apiVersion, store, token };
};

const normalizeProducts = (responseData) => {
  const edges = responseData?.data?.products?.edges;

  if (!Array.isArray(edges)) {
    throw new Error("Unexpected Shopify response shape.");
  }

  return edges.map((productEdge) => productEdge.node);
};

const fetchProducts = async () => {
  if (shouldUseSampleData()) {
    return sampleProducts;
  }

  const { apiVersion, store, token } = getShopifyConfig();

  const query = `
  {
    products(first: 10) {
      edges {
        node {
          id
          title
          description
          featuredImage {
            url
          }
          variants(first: 1) {
            edges {
              node {
                price
                sku
              }
            }
          }
        }
      }
    }
  }
  `;

  const response = await axios.post(
    `https://${store}/admin/api/${apiVersion}/graphql.json`,
    { query },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": token,
      },
    }
  );

  return normalizeProducts(response.data);
};

module.exports = { fetchProducts, normalizeProducts, shouldUseSampleData };
