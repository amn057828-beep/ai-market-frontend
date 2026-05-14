"use client";

type ForecastProps = {
  forecast: any;
};

export default function ForecastPanel({
  forecast,
}: ForecastProps) {

  if (
    !forecast ||
    !forecast.success
  ) {

    return null;

  }

  const data =
    forecast.forecast;

  const levels =
    forecast.technical_levels;

  return (

    <div className="glass-card mb-8 rounded-[28px] p-6">

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="mb-2 text-sm font-bold text-cyan-400">
            AI FORECAST ENGINE
          </p>

          <h3 className="text-3xl font-black">
            Market Forecast
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            AI-powered trend prediction system.
          </p>

        </div>

        <div
          className={`rounded-2xl px-5 py-3 text-lg font-black ${
            data.trend.includes(
              "Bull"
            )
              ? "bg-emerald-500/10 text-emerald-400"
              : data.trend ===
                "Neutral"
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {data.trend}
        </div>

      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <p className="text-sm text-slate-400">
            Probability Up
          </p>

          <h3 className="mt-3 text-3xl font-black text-emerald-400">
            {data.probability_up}%
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <p className="text-sm text-slate-400">
            Confidence
          </p>

          <h3 className="mt-3 text-3xl font-black text-cyan-400">
            {data.confidence}%
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <p className="text-sm text-slate-400">
            Forecast 24H
          </p>

          <h3 className="mt-3 text-3xl font-black text-white">
            $
            {data.forecast_24h}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <p className="text-sm text-slate-400">
            Forecast 7D
          </p>

          <h3 className="mt-3 text-3xl font-black text-white">
            $
            {data.forecast_7d}
          </h3>

        </div>

      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <h4 className="mb-5 text-xl font-black">
            Technical Levels
          </h4>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Support
              </span>

              <span className="font-black text-emerald-400">
                ${levels.support}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Resistance
              </span>

              <span className="font-black text-red-400">
                ${levels.resistance}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Volatility
              </span>

              <span className="font-black text-cyan-400">
                {levels.volatility}%
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Risk Level
              </span>

              <span className="font-black text-yellow-400">
                {data.risk_level}
              </span>

            </div>

          </div>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">

          <h4 className="mb-5 text-xl font-black">
            Moving Averages
          </h4>

          <div className="space-y-4">

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                SMA20
              </span>

              <span className="font-black text-white">
                ${levels.sma20}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                SMA50
              </span>

              <span className="font-black text-white">
                ${levels.sma50}
              </span>

            </div>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                SMA100
              </span>

              <span className="font-black text-white">
                ${levels.sma100}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}