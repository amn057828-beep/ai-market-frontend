type WatchlistItem = {
  id: number;
  symbol: string;
  user_id: number;
};

type WatchlistProps = {
  items: WatchlistItem[];
  currentSymbol: string;
  onSelect: (symbol: string) => void;
  onRemove: (id: number, symbol: string) => void;
};

export default function Watchlist({
  items,
  currentSymbol,
  onSelect,
  onRemove,
}: WatchlistProps) {
  return (
    <div className="glass-card mb-8 rounded-[28px] p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-emerald-400">
            WATCHLIST
          </p>

          <h3 className="text-2xl font-black">
            Favorite Assets
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            قائمتك المفضلة المحفوظة في حسابك.
          </p>
        </div>

        <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400">
          {items.length} Assets
        </span>
      </div>

      {items.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-400">
          لا توجد عناصر في المفضلة.
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${
              currentSymbol === item.symbol
                ? "border-emerald-500/30 bg-emerald-500/15"
                : "border-white/10 bg-white/[0.04] hover:border-emerald-500/20 hover:bg-white/[0.07]"
            }`}
          >
            <button
              onClick={() => onSelect(item.symbol)}
              className="font-black text-white"
            >
              {item.symbol}
            </button>

            <button
              onClick={() => onRemove(item.id, item.symbol)}
              className="rounded-full bg-red-500/10 px-2 py-1 text-xs font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}