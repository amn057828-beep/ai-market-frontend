type AnalysisPanelProps = {
  trend: string;
  rsiStatus: string;
  macdSignal: string;
  riskLevel: string;
  volume: string;
  ma20: string;
  ma50: string;
  recommendation: string;
};

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 pb-4">
      <span className="text-sm font-medium text-slate-400">
        {label}
      </span>

      <span className="font-black text-white">
        {value}
      </span>
    </div>
  );
}

export default function AnalysisPanel({
  trend,
  rsiStatus,
  macdSignal,
  riskLevel,
  volume,
  ma20,
  ma50,
  recommendation,
}: AnalysisPanelProps) {
  return (
    <div className="glass-card rounded-[28px] p-6">
      <div className="mb-6">
        <p className="mb-2 text-sm font-bold text-emerald-400">
          AI SUMMARY
        </p>

        <h3 className="text-2xl font-black">
          Technical Insight
        </h3>
      </div>

      <div className="space-y-4">
        <Row label="Trend" value={trend} />
        <Row label="RSI Status" value={rsiStatus} />
        <Row label="MACD Signal" value={macdSignal} />
        <Row label="Risk Level" value={riskLevel} />
        <Row label="Volume" value={volume} />
        <Row label="MA20" value={ma20} />
        <Row label="MA50" value={ma50} />
      </div>

      <div className="mt-8 rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-5">
        <p className="text-sm font-medium text-slate-400">
          AI Recommendation
        </p>

        <h4 className="mt-2 text-xl font-black text-emerald-400">
          {recommendation}
        </h4>

        <p className="mt-3 text-xs leading-5 text-slate-500">
          هذا تحليل معلوماتي فقط وليس توصية شراء أو بيع.
        </p>
      </div>
    </div>
  );
}