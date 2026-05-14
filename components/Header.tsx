import { useMemo } from "react";
import SearchSuggestions from "@/components/SearchSuggestions";
import { allSymbols } from "@/data/symbols";

type HeaderProps = {
  symbol: string;
  setSymbol: (value: string) => void;
  onAnalyze: () => void;
};

export default function Header({
  symbol,
  setSymbol,
  onAnalyze,
}: HeaderProps) {
  const suggestions = useMemo(() => {
    const query = symbol.trim().toLowerCase();

    if (query.length < 1) {
      return [];
    }

    return allSymbols
      .filter((item) => {
        return (
          item.symbol.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query)
        );
      })
      .slice(0, 6);
  }, [symbol]);

  function selectSuggestion(nextSymbol: string) {
    setSymbol(nextSymbol);

    setTimeout(() => {
      onAnalyze();
    }, 0);
  }

  return (
    <div className="mb-10 rounded-[32px] border border-white/10 bg-slate-950/50 p-6 backdrop-blur-xl">
      <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">
            AI-Powered Global Markets Platform
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white lg:text-6xl">
            Market Intelligence
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">
            منصة احترافية لتحليل الأسهم الأمريكية والخليجية والمعادن والنفط
            والكريبتو باستخدام مؤشرات فنية وذكاء اصطناعي.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          <div className="relative w-full xl:w-[480px]">
            <input
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAnalyze();
                }
              }}
              placeholder="Search AAPL / 2222.SR / BTC-USD / GC=F"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-500/60 focus:bg-white/[0.06]"
            />

            <SearchSuggestions
              suggestions={suggestions}
              onSelect={selectSuggestion}
            />
          </div>

          <button
            onClick={onAnalyze}
            className="rounded-2xl bg-emerald-500 px-8 py-4 font-black text-black shadow-[0_0_35px_rgba(34,197,94,0.25)] transition hover:bg-emerald-400"
          >
            Analyze
          </button>
        </div>
      </div>
    </div>
  );
}