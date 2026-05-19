import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  DataTable,
  Badge,
} from "@shopify/polaris";



import { authenticate } from "../shopify.server";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    query {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
          }
        }
      }
    }
  `);

  const responseJson = await response.json();

  const products = responseJson.data.products.edges.map((edge) => {
    const product = edge.node;

    const score =
      product.description.length > 120
        ? 90
        : product.description.length > 50
        ? 75
        : 60;

    return {
      title: product.title,
      score,
      recommendation:
        score > 85
          ? "Excellent AI representation"
          : score > 70
          ? "Needs semantic improvements"
          : "Weak product description",
      seo:
        score > 85
          ? "High"
          : score > 70
          ? "Medium"
          : "Low",
    };
  });

  return {
  products,
};
}

export default function Dashboard({ loaderData }) {
  const { products } = loaderData;

  const rows = products.map((product) => [
    product.title,
    product.score,
    product.recommendation,
    product.seo,
  ]);

  const averageScore = Math.round(
    products.reduce((acc, p) => acc + p.score, 0) / products.length
  );

  return (
    <Page
      title="Agent Mirror Analyzer"
      subtitle="AI Representation Optimizer for Shopify Products"
    >
      <Layout>
        <Layout.Section>
          <Card>
            <div
              style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
              }}
            >
              <Card>
                <div style={{ padding: "15px" }}>
                  <Text variant="heading2xl" as="h2">
                    {averageScore}%
                  </Text>

                  <Text>Average AI Score</Text>
                </div>
              </Card>

              <Card>
                <div style={{ padding: "15px" }}>
                  <Text variant="heading2xl" as="h2">
                    {products.length}
                  </Text>

                  <Text>Products Analyzed</Text>
                </div>
              </Card>

              <Card>
                <div style={{ padding: "15px" }}>
                  <Text variant="heading2xl" as="h2">
                    {
                      products.filter((p) => p.score < 80).length
                    }
                  </Text>

                  <Text>Optimization Alerts</Text>
                </div>
              </Card>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <div style={{ padding: "20px" }}>
                <Text variant="headingLg" as="h2">
                  Product Representation Analysis
                </Text>
              </div>

              <DataTable
                columnContentTypes={[
                  "text",
                  "numeric",
                  "text",
                  "text",
                ]}
                headings={[
                  "Product",
                  "AI Score",
                  "Recommendation",
                  "SEO Strength",
                ]}
                rows={rows}
              />
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <div style={{ padding: "20px" }}>
                <Text variant="headingLg" as="h2">
                  AI Optimization Recommendations
                </Text>

                <div style={{ marginTop: "15px" }}>
                  <Badge tone="warning">
                    Add richer semantic keywords
                  </Badge>

                  <div style={{ height: "10px" }} />

                  <Badge tone="info">
                    Improve metadata discoverability
                  </Badge>

                  <div style={{ height: "10px" }} />

                  <Badge tone="success">
                    Enhance conversational product context
                  </Badge>
                </div>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}