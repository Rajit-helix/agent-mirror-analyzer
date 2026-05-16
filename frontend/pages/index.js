import axios from "axios";
import { useCallback, useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import SummaryStats from "../components/SummaryStats";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function Home() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);

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

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_30%),linear-gradient(135deg,_#020617,_#0f172a_45%,_#111827)] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Agent Commerce MVP
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-white md:text-6xl">
            Agent Mirror Analyzer
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Audit Shopify product metadata, surface recommendation blockers, and
            generate AI perception summaries that help merchants improve how
            shopping agents understand their catalog.
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
          <SummaryStats results={results} />
        )}

        <section className="space-y-6">
          {results.map((product, index) => (
            <ProductCard key={`${product.title}-${index}`} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}
