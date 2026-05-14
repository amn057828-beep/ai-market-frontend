import { AiSignal } from "@/types/market";

type AiSignalsProps = {
  signals: AiSignal[];
};

function getSignalStyles(color: string) {
  switch (color) {
    case "green":
      return {
        border: "border-emerald-500/20",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        glow: "shadow-[0_0_30px_rgba(34,197,94,0.12)]",
      };

    case "yellow":
      return {
        border: "border-yellow-500/20",
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        glow: "shadow-[0_0_30px_rgba(250,204,21,0.10)]",
      };

    case "red":
      return {
        border: "border-red-500/20",
        bg: "bg-red-500/10",
        text: "text-red-400",
        glow: "shadow-[0_0_30px_rgba(239,68,68,0.10)]",
      };

    default:
      return {
        border: "border-cyan-500/20",
        bg: "bg-cyan-500/10",
        text: "text-cyan-400",
        glow: "shadow-[0_0_30px_rgba(6,182,212,0.10)]",
      };
  }
}

export default function AiSignals({
  signals,
}: AiSignalsProps) {
  if (!signals || signals.length === 0) {
    return null;
  }

  return (
    <div className="glass-card mb-8 rounded-[28px] p-6">
      <div className="mb-6">
        <p className="mb-2 text-sm font-bold text-emerald-400">
          AI SIGNALS ENGINE
        </p>

        <h3 className="text-2xl font-black">
          Smart Trading Signals
        </h3>

        <p className="mt-2 text-sm text-slate-400">
          إشارات ذكية مبنية على الاتجاه والزخم وMACD وRSI.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {signals.map((signal, index) => {
          const styles = getSignalStyles(signal.color);

          return (
            <div
              key={`${signal.type}-${index}`}
              className={`rounded-[24px] border p-5 transition hover:-translate-y-1 ${styles.border} ${styles.bg} ${styles.glow}`}
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h4
                    className={`text-xl font-black ${styles.text}`}
                  >
                    {signal.label_ar}
                  </h4>

                  <p className="mt-1 text-sm text-slate-400">
                    {signal.type}
                  </p>
                </div>

                <div
                  className={`rounded-full px-4 py-2 text-sm font-black ${styles.bg} ${styles.text}`}
                >
                  {signal.strength}%
                </div>
              </div>

              <p className="leading-7 text-slate-300">
                {signal.reason}
              </p>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Signal Strength
                  </span>

                  <span className={`font-black ${styles.text}`}>
                    {signal.strength}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${
                      signal.color === "green"
                        ? "bg-emerald-400"
                        : signal.color === "yellow"
                        ? "bg-yellow-400"
                        : signal.color === "red"
                        ? "bg-red-400"
                        : "bg-cyan-400"
                    }`}
                    style={{
                      width: `${signal.strength}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}