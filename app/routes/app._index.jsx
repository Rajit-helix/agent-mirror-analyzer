import { useState } from "react";

import {
  Page,
  Layout,
  Card,
  Text,
  Button,
  DataTable,
  Badge,
} from "@shopify/polaris";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Index() {
  const [aiResult, setAiResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const products = [
    {
      name: "PulseFit X1 Smart Fitness Watch",
      score: 78,
    },
    {
      name: "AeroWatch Pro Fitness Smartwatch",
      score: 66,
    },
    {
      name: "TitanFit Lite Smart Watch",
      score: 54,
    },
    {
      name: "NeoPulse Active Smartwatch",
      score: 82,
    },
    {
      name: "FitCore Edge Smart Fitness Watch",
      score: 71,
    },
  ];

  const getGrade = (score) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  const getRecommendation = (score) => {
    if (score >= 85) {
      return "Excellent AI discoverability";
    }

    if (score >= 70) {
      return "Add semantic product tags";
    }

    if (score >= 60) {
      return "Improve metadata and SEO";
    }

    return "Weak product description and metadata";
  };

  const getBadgeTone = (score) => {
    if (score >= 85) return "success";
    if (score >= 70) return "info";
    if (score >= 60) return "warning";
    return "critical";
  };

  const handleAnalyze = async () => {
    try {
      setIsAnalyzing(true);
      setAiResult("Running lightweight AI analysis...");

      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAiResult(data.result);
      } else {
        setAiResult(`Analysis error: ${data.error || "Unable to analyze products."}`);
      }
    } catch (error) {
      console.error("Analyze request failed", error);
      setAiResult("Analysis request failed. Scores and charts are still available above.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const averageScore = Math.round(
    products.reduce((acc, item) => acc + item.score, 0) /
      products.length
  );

  const alerts = products.filter((item) => item.score < 70).length;

  const rows = products.map((product) => [
    product.name,

    <Text
      as="span"
      key={`${product.name}-score`}
      variant="bodyMd"
      fontWeight="bold"
      tone={
        product.score >= 80
          ? "success"
          : product.score >= 65
          ? "warning"
          : "critical"
      }
    >
      {product.score}
    </Text>,

    <Badge key={`${product.name}-grade`} tone={getBadgeTone(product.score)}>
      {getGrade(product.score)}
    </Badge>,

    getRecommendation(product.score),
  ]);

  return (
    <Page title="Agent Mirror Analyzer">
      <Layout>
        <Layout.Section>
          <div style={{ marginBottom: "20px" }}>
            <Text variant="heading2xl" as="h1">
              Agent Mirror Analyzer
            </Text>

            <div style={{ marginTop: "8px" }}>
              <Text variant="bodyMd" tone="subdued">
                AI Representation Optimizer for Shopify Products
              </Text>
            </div>

            <div style={{ marginTop: "20px" }}>
              <Button
                disabled={isAnalyzing}
                loading={isAnalyzing}
                onClick={handleAnalyze}
                variant="primary"
              >
                Run Lightweight Analysis
              </Button>
            </div>
          </div>
        </Layout.Section>

        <Layout.Section>
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <Card>
              <div style={{ padding: "20px", minWidth: "180px" }}>
                <Text variant="heading2xl" as="h2">
                  {averageScore}%
                </Text>

                <Text variant="bodyMd">
                  Average AI Score
                </Text>
              </div>
            </Card>

            <Card>
              <div style={{ padding: "20px", minWidth: "180px" }}>
                <Text variant="heading2xl" as="h2">
                  {products.length}
                </Text>

                <Text variant="bodyMd">
                  Products Analyzed
                </Text>
              </div>
            </Card>

            <Card>
              <div style={{ padding: "20px", minWidth: "180px" }}>
                <Text variant="heading2xl" as="h2">
                  {alerts}
                </Text>

                <Text variant="bodyMd">
                  Optimization Alerts
                </Text>
              </div>
            </Card>
          </div>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: "20px" }}>
              <Text variant="headingLg" as="h2">
                AI Product Score Distribution
              </Text>

              <div style={{ height: "350px", marginTop: "20px" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={products}>
                    <XAxis
                      dataKey="name"
                      tickFormatter={(value) =>
                        value.substring(0, 12)
                      }
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                      dataKey="score"
                      fill="#008060"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: "20px" }}>
              <Text variant="headingLg" as="h2">
                Product Representation Analysis
              </Text>

              <div style={{ marginTop: "20px" }}>
                <DataTable
                  columnContentTypes={[
                    "text",
                    "text",
                    "text",
                    "text",
                  ]}
                  headings={[
                    "Product",
                    "AI Score",
                    "Grade",
                    "Recommendation",
                  ]}
                  rows={rows}
                />
              </div>
            </div>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div style={{ padding: "20px" }}>
              <Text variant="headingLg" as="h2">
                AI Recommendations
              </Text>

              <div style={{ marginTop: "15px" }}>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    fontSize: "14px",
                  }}
                >
                  {aiResult}
                </pre>
              </div>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
