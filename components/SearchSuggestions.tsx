type Suggestion = {
  symbol: string;
  name: string;
};

type SearchSuggestionsProps = {
  suggestions: Suggestion[];
  onSelect: (symbol: string) => void;
};

export default function SearchSuggestions({
  suggestions,
  onSelect,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/95 shadow-2xl backdrop-blur-xl">
      {suggestions.map((item) => (
        <button
          key={item.symbol}
          onClick={() => onSelect(item.symbol)}
          className="flex w-full items-center justify-between border-b border-white/5 px-5 py-4 text-left transition last:border-none hover:bg-white/5"
        >
          <div>
            <div className="text-base font-black text-white">
              {item.symbol}
            </div>

            <div className="mt-1 text-sm text-slate-400">
              {item.name}
            </div>
          </div>

          <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400">
            Analyze
          </div>
        </button>
      ))}
    </div>
  );
}