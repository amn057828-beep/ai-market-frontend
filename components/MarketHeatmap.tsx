import { ScannerItem } from "@/types/market";

type MarketHeatmapProps = {
  scanner: ScannerItem[];
  onSelect: (symbol: string) => void;
};

export default function MarketHeatmap({
  scanner,
  onSelect,
}: MarketHeatmapProps) {
  return (
    <div className="glass-card mb-8 rounded-[28px] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-emerald-400">
            AI HEATMAP
          </p>

          <h3 className="text-2xl font-black">
            Market Momentum
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            خريطة ذكية لزخم السوق والفرص الأقوى.
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">
          Live Market
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        {scanner.map((item) => (
          <button
            key={item.symbol}
            onClick={() => onSelect(item.symbol)}
            className={`group relative overflow-hidden rounded-[26px] border p-5 text-left transition duration-300 hover:-translate-y-1 ${
              item.score >= 70
                ? "border-emerald-500/20 bg-emerald-500/10"
                : item.score >= 50
                ? "border-yellow-500/20 bg-yellow-500/10"
                : "border-red-500/20 bg-red-500/10"
            }`}
          >
            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-white/5 blur-3xl transition group-hover:scale-125" />

            <div className="relative z-10">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <div className="text-xl font-black text-white">
                    {item.symbol}
                  </div>

                  <div className="mt-1 text-xs text-slate-400">
                    AI Market Asset
                  </div>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-black ${
                    item.trend === "Bullish"
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-red-500/15 text-red-400"
                  }`}
                >
                  {item.trend}
                </div>
              </div>

              <div className="mb-4 text-4xl font-black tracking-tight text-white">
                ${item.price}
              </div>

              <div className="mb-3 flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  RSI
                </span>

                <span className="font-bold text-white">
                  {item.rsi}
                </span>
              </div>

              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Signal
                </span>

                <span
                  className={`font-bold ${
                    item.signal === "Oversold"
                      ? "text-emerald-400"
                      : item.signal === "Overbought"
                      ? "text-yellow-400"
                      : "text-cyan-400"
                  }`}
                >
                  {item.signal}
                </span>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    AI Score
                  </span>

                  <span className="text-sm font-black text-white">
                    {item.score}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      item.score >= 70
                        ? "bg-emerald-400"
                        : item.score >= 50
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                    style={{
                      width: `${item.score}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}