const sampleProducts = [
  {
    id: "gid://shopify/Product/1001",
    title: "PulseFit X1 Smart Fitness Watch",
    description:
      "A lightweight smartwatch with heart-rate tracking, sleep insights, water resistance, and long battery performance for everyday training.",
    featuredImage: {
      url: "https://cdn.shopify.com/s/files/1/0000/0001/products/pulsefit-x1.jpg",
    },
    variants: {
      edges: [
        {
          node: {
            price: "149.00",
            sku: "PF-X1-BLK",
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/1002",
    title: "AeroBrew Compact Coffee Maker",
    description: "Compact coffee maker.",
    featuredImage: null,
    variants: {
      edges: [
        {
          node: {
            price: "79.00",
            sku: "",
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/1003",
    title: "TrailLite Weekend Backpack",
    description:
      "A 28-liter weekend backpack with padded laptop storage, side water-bottle pockets, reinforced zippers, and recycled ripstop fabric.",
    featuredImage: {
      url: "https://cdn.shopify.com/s/files/1/0000/0001/products/traillite-weekend.jpg",
    },
    variants: {
      edges: [
        {
          node: {
            price: "119.00",
            sku: "TL-WKD-28-GRN",
          },
        },
      ],
    },
  },
];

module.exports = { sampleProducts };
