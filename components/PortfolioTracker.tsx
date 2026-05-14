"use client";

type Position = {
  id: number;
  symbol: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  market_value: number;
  cost_value: number;
  pnl: number;
  pnl_percent: number;
};

type PortfolioSummary = {
  total_value: number;
  total_cost: number;
  total_pnl: number;
  total_pnl_percent: number;
};

type LivePrice = {
  symbol: string;
  price: number;
};

type PortfolioProps = {
  positions: Position[];
  summary: PortfolioSummary;
  livePrices?: LivePrice[];
  onDelete: (id: number) => void;
};

export default function PortfolioTracker({
  positions,
  summary,
  livePrices = [],
  onDelete,
}: PortfolioProps) {

  function getLivePrice(
    symbol: string,
    fallback: number
  ) {

    const live =
      livePrices.find(
        (item) =>
          item.symbol === symbol
      );

    return live?.price || fallback;
  }

  function calculateLivePnL(
    item: Position
  ) {

    const livePrice =
      getLivePrice(
        item.symbol,
        item.current_price
      );

    const marketValue =
      livePrice *
      item.quantity;

    const costValue =
      item.buy_price *
      item.quantity;

    const pnl =
      marketValue - costValue;

    const pnlPercent =
      costValue > 0
        ? (pnl / costValue) * 100
        : 0;

    return {
      livePrice,
      marketValue,
      pnl,
      pnlPercent,
    };
  }

  return (
    <div className="glass-card mb-8 rounded-[28px] p-6">

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="mb-2 text-sm font-bold text-emerald-400">
            PORTFOLIO
          </p>

          <h3 className="text-3xl font-black">
            Investment Portfolio
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Real-time portfolio tracking.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

            <p className="text-xs text-slate-400">
              Portfolio Value
            </p>

            <h4 className="mt-2 text-xl font-black text-white">
              $
              {summary.total_value.toLocaleString()}
            </h4>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

            <p className="text-xs text-slate-400">
              Total Cost
            </p>

            <h4 className="mt-2 text-xl font-black text-white">
              $
              {summary.total_cost.toLocaleString()}
            </h4>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

            <p className="text-xs text-slate-400">
              P/L
            </p>

            <h4
              className={`mt-2 text-xl font-black ${
                summary.total_pnl >= 0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {summary.total_pnl >= 0
                ? "+"
                : ""}
              $
              {summary.total_pnl.toLocaleString()}
            </h4>

          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">

            <p className="text-xs text-slate-400">
              Performance
            </p>

            <h4
              className={`mt-2 text-xl font-black ${
                summary.total_pnl_percent >=
                0
                  ? "text-emerald-400"
                  : "text-red-400"
              }`}
            >
              {summary.total_pnl_percent >=
              0
                ? "+"
                : ""}
              {summary.total_pnl_percent}%
            </h4>

          </div>

        </div>

      </div>

      {positions.length === 0 && (

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-sm text-slate-400">
          No portfolio positions yet.
        </div>

      )}

      {positions.length > 0 && (

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] border-separate border-spacing-y-3">

            <thead>

              <tr className="text-left text-sm text-slate-400">

                <th>Symbol</th>

                <th>Qty</th>

                <th>Buy Price</th>

                <th>Live Price</th>

                <th>Market Value</th>

                <th>P/L</th>

                <th>P/L %</th>

                <th></th>

              </tr>

            </thead>

            <tbody>

              {positions.map((item) => {

                const live =
                  calculateLivePnL(
                    item
                  );

                return (

                  <tr
                    key={item.id}
                    className="rounded-2xl bg-white/[0.04]"
                  >

                    <td className="rounded-l-2xl px-4 py-4 font-black">
                      {item.symbol}
                    </td>

                    <td className="px-4 py-4">
                      {item.quantity}
                    </td>

                    <td className="px-4 py-4">
                      ${item.buy_price}
                    </td>

                    <td className="px-4 py-4 font-black text-cyan-400">
                      ${live.livePrice}
                    </td>

                    <td className="px-4 py-4 font-bold">
                      $
                      {live.marketValue.toLocaleString()}
                    </td>

                    <td
                      className={`px-4 py-4 font-black ${
                        live.pnl >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {live.pnl >= 0
                        ? "+"
                        : ""}
                      $
                      {live.pnl.toFixed(2)}
                    </td>

                    <td
                      className={`px-4 py-4 font-black ${
                        live.pnlPercent >= 0
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {live.pnlPercent >= 0
                        ? "+"
                        : ""}
                      {live.pnlPercent.toFixed(
                        2
                      )}
                      %
                    </td>

                    <td className="rounded-r-2xl px-4 py-4">

                      <button
                        onClick={() =>
                          onDelete(item.id)
                        }
                        className="rounded-xl bg-red-500/10 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}