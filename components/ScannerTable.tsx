import { ScannerItem } from "@/types/market";

type ScannerTableProps = {
  scanner: ScannerItem[];
  loading: boolean;
  onSelectSymbol: (symbol: string) => void;
};

export default function ScannerTable({
  scanner,
  loading,
  onSelectSymbol,
}: ScannerTableProps) {
  return (
    <div className="glass-card rounded-[28px] p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-emerald-400">
            AI SCANNER
          </p>

          <h3 className="text-2xl font-black">
            Market Rankings
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            فحص ذكي للأسواق حسب الزخم والاتجاه ودرجة AI.
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">
          {scanner.length} Assets
        </span>
      </div>

      {loading && (
        <div className="mb-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-slate-400">
          Loading scanner...
        </div>
      )}

      <div className="overflow-auto">
        <table className="w-full min-w-[760px]">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-slate-400">
              <th className="pb-4">Symbol</th>
              <th className="pb-4">Price</th>
              <th className="pb-4">RSI</th>
              <th className="pb-4">Trend</th>
              <th className="pb-4">Signal</th>
              <th className="pb-4">AI Score</th>
            </tr>
          </thead>

          <tbody>
            {scanner.map((item) => (
              <tr
                key={item.symbol}
                onClick={() => onSelectSymbol(item.symbol)}
                className="cursor-pointer border-b border-white/5 transition hover:bg-white/[0.04]"
              >
                <td className="py-5">
                  <div className="font-black text-white">
                    {item.symbol}
                  </div>
                </td>

                <td className="py-5 font-semibold text-slate-200">
                  ${item.price}
                </td>

                <td className="py-5 font-semibold text-slate-200">
                  {item.rsi}
                </td>

                <td
                  className={`py-5 font-bold ${
                    item.trend === "Bullish"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {item.trend}
                </td>

                <td
                  className={`py-5 font-bold ${
                    item.signal === "Oversold"
                      ? "text-emerald-400"
                      : item.signal === "Overbought"
                      ? "text-yellow-400"
                      : "text-cyan-400"
                  }`}
                >
                  {item.signal}
                </td>

                <td className="py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${
                          item.score >= 70
                            ? "bg-emerald-400"
                            : item.score >= 50
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>

                    <span className="font-black text-white">
                      {item.score}
                    </span>
                  </div>
                </td>
              </tr>
            ))}

            {!loading && scanner.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-slate-400"
                >
                  No scanner data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}