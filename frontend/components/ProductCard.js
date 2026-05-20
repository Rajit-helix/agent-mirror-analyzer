import { useState } from "react";

import ScoreCard from "./ScoreCard";

export default function ProductCard({ product }) {
  const [showRewrite, setShowRewrite] = useState(false);
  const rewrite = product.suggestedRewrite;

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/30">
      <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr]">
        <ScoreCard score={product.score} />

        <div>
          <div className="flex flex-col gap-2 border-b border-white/10 pb-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                Product Audit
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                {product.title}
              </h2>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Issues
              </h3>
              {product.issues.length > 0 ? (
                <ul className="mt-3 space-y-2">
                  {product.issues.map((issue) => (
                    <li
                      className="rounded-xl border border-amber-300/20 bg-amber-300/10 px-4 py-3 text-sm text-amber-100"
                      key={issue}
                    >
                      {issue}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
                  No obvious metadata issues detected.
                </p>
              )}
            </section>

            <section>
              <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                AI Perception Summary
              </h3>
              <p className="mt-3 whitespace-pre-line rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-slate-200">
                {product.aiSummary}
              </p>
            </section>
          </div>

          {rewrite && (
            <div className="mt-5">
              <button
                aria-expanded={showRewrite}
                className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                onClick={() => setShowRewrite((value) => !value)}
                type="button"
              >
                <span aria-hidden>✨</span>
                {showRewrite ? "Hide suggested rewrite" : "Show suggested rewrite"}
              </button>

              {showRewrite && (
                <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                    Suggested Rewrite
                  </p>
                  <h4 className="mt-2 text-lg font-bold text-white">
                    {rewrite.title}
                  </h4>
                  <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-sans text-sm leading-6 text-slate-100">
                    {rewrite.description}
                  </pre>
                  <p className="mt-3 text-xs text-slate-400">
                    Italicized placeholders mark gaps the merchant should fill in
                    before publishing.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
