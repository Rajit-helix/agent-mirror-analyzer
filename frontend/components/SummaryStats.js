const calculateAverageScore = (results) => {
  if (results.length === 0) {
    return 0;
  }

  const total = results.reduce((sum, product) => sum + product.score, 0);
  return Math.round(total / results.length);
};

export default function SummaryStats({ results }) {
  const issueCount = results.reduce(
    (sum, product) => sum + product.issues.length,
    0
  );
  const averageScore = calculateAverageScore(results);

  const stats = [
    { label: "Products Audited", value: results.length },
    { label: "Average Readiness", value: `${averageScore}/100` },
    { label: "Issues Found", value: issueCount },
  ];

  return (
    <section className="mb-8 grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20"
          key={stat.label}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
            {stat.label}
          </p>
          <p className="mt-3 text-3xl font-black text-white">{stat.value}</p>
        </div>
      ))}
    </section>
  );
}
