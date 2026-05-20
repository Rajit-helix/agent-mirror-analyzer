import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";

import ProductCard from "../components/ProductCard";
import SummaryStats from "../components/SummaryStats";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const SORT_OPTIONS = [
  { label: "Lowest readiness first", value: "score-asc" },
  { label: "Highest readiness first", value: "score-desc" },
  { label: "Most issues first", value: "issues-desc" },
  { label: "Catalog order", value: "default" },
];

export default function Home() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [sort, setSort] = useState("score-asc");
  const [issuesOnly, setIssuesOnly] = useState(false);

  const fetchAudit = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/audit`);
      setResults(response.data);
    } catch (requestError) {
      console.error(requestError);
      setError(
        "Unable to load audit results. Confirm the backend is running and configured."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAudit();
  }, [fetchAudit]);

  const visibleResults = useMemo(() => {
    let next = [...results];
    if (issuesOnly) {
      next = next.filter((product) => product.issues.length > 0);
    }
    switch (sort) {
      case "score-asc":
        next.sort((a, b) => a.score - b.score);
        break;
      case "score-desc":
        next.sort((a, b) => b.score - a.score);
        break;
      case "issues-desc":
        next.sort((a, b) => b.issues.length - a.issues.length);
        break;
      default:
        break;
    }
    return next;
  }, [results, sort, issuesOnly]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a_45%,_#111827)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Agent Commerce Hackathon · MVP
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
            Agent Mirror Analyzer
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            See your Shopify catalog the way an AI shopping agent sees it. We
            audit product metadata, surface recommendation blockers, and
            generate the rewrites that turn invisible products into
            agent-discoverable ones.
          </p>
        </header>

        {isLoading && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-200">
            Loading Shopify audit results...
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-3xl border border-rose-300/20 bg-rose-300/10 p-8 text-rose-100">
            <p>{error}</p>
            <button
              className="mt-5 rounded-full bg-rose-100 px-5 py-2 text-sm font-bold text-rose-950 transition hover:bg-white"
              onClick={fetchAudit}
              type="button"
            >
              Retry audit
            </button>
          </div>
        )}

        {!error && !isLoading && results.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-200">
            No products returned from the audit endpoint.
          </div>
        )}

        {!error && !isLoading && results.length > 0 && (
          <>
            <SummaryStats results={results} />

            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-200">
                  <span className="font-semibold uppercase tracking-[0.18em] text-slate-400">
                    Sort
                  </span>
                  <select
                    className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1.5 text-sm text-slate-100 focus:border-cyan-300 focus:outline-none"
                    onChange={(event) => setSort(event.target.value)}
                    value={sort}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex items-center gap-2 text-sm text-slate-200">
                  <input
                    checked={issuesOnly}
                    className="h-4 w-4 rounded border-white/20 bg-slate-950 text-cyan-400 focus:ring-cyan-400"
                    onChange={(event) => setIssuesOnly(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Only show products with issues</span>
                </label>
              </div>

              <div className="flex items-center gap-3">
                <button
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                  onClick={fetchAudit}
                  type="button"
                >
                  Re-run audit
                </button>
                <a
                  className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                  href={`${API_BASE_URL}/api/export`}
                >
                  Download CSV
                </a>
              </div>
            </div>

            <section className="space-y-6">
              {visibleResults.length === 0 ? (
                <div className="rounded-3xl border border-emerald-300/20 bg-emerald-300/10 p-8 text-emerald-100">
                  All filtered products look healthy. Disable the filter to see
                  the full catalog.
                </div>
              ) : (
                visibleResults.map((product, index) => (
                  <ProductCard
                    key={`${product.title}-${index}`}
                    product={product}
                  />
                ))
              )}
            </section>
          </>
        )}

        <footer className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
          Built for the Kasparro Agent Commerce Hackathon · Agent Mirror Analyzer
        </footer>
      </div>
    </main>
  );
}
