const getScoreColor = (score) => {
  if (score >= 85) {
    return "text-emerald-300";
  }

  if (score >= 65) {
    return "text-amber-300";
  }

  return "text-rose-300";
};

export default function ScoreCard({ score }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg shadow-black/20">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
        AI Readiness Score
      </p>
      <div className="mt-3 flex items-end gap-2">
        <span className={`text-5xl font-black ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="pb-2 text-slate-400">/ 100</span>
      </div>
    </div>
  );
}
