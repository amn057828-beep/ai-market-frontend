"use client";

import { useEffect, useState } from "react";
import { analyzeSymbol } from "@/services/api";

type AlertItem = {
  symbol: string;
  targetPrice: number;
  condition: "above" | "below";
  triggered: boolean;
};

export default function AlertsPanel() {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [symbol, setSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState<"above" | "below">("above");
  const [message, setMessage] = useState("");
  const [checking, setChecking] = useState(false);

  function saveAlerts(updated: AlertItem[]) {
    setAlerts(updated);
    localStorage.setItem("ai_market_alerts", JSON.stringify(updated));
  }

  function addAlert() {
    if (!symbol || !targetPrice) {
      setMessage("أدخل الرمز والسعر المستهدف");
      return;
    }

    const newAlert: AlertItem = {
      symbol: symbol.trim().toUpperCase(),
      targetPrice: Number(targetPrice),
      condition,
      triggered: false,
    };

    saveAlerts([...alerts, newAlert]);

    setSymbol("");
    setTargetPrice("");
    setMessage(`${newAlert.symbol} alert added`);
  }

  function removeAlert(index: number) {
    const updated = alerts.filter((_, i) => i !== index);
    saveAlerts(updated);
  }

  function clearAlerts() {
    saveAlerts([]);
    localStorage.removeItem("ai_market_alerts");
  }

  async function checkAlerts() {
    try {
      setChecking(true);
      setMessage("");

      const updated = await Promise.all(
        alerts.map(async (alert) => {
          try {
            const data = await analyzeSymbol(alert.symbol);

            if (!data.success || !data.market_data?.price) {
              return alert;
            }

            const price = Number(data.market_data.price);

            const isTriggered =
              alert.condition === "above"
                ? price >= alert.targetPrice
                : price <= alert.targetPrice;

            return {
              ...alert,
              triggered: isTriggered,
            };
          } catch {
            return alert;
          }
        })
      );

      saveAlerts(updated);
      setMessage("Alerts checked successfully");
    } finally {
      setChecking(false);
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem("ai_market_alerts");

    if (saved) {
      setAlerts(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="glass-card mb-8 rounded-[28px] p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-emerald-400">
            ALERTS
          </p>

          <h3 className="text-2xl font-black">
            Price Alerts
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            أضف تنبيهات سعرية للأسهم والمعادن والكريبتو.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {alerts.length > 0 && (
            <button
              onClick={checkAlerts}
              disabled={checking}
              className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400 transition hover:bg-emerald-500 hover:text-black disabled:opacity-50"
            >
              {checking ? "Checking..." : "Check Alerts"}
            </button>
          )}

          {alerts.length > 0 && (
            <button
              onClick={clearAlerts}
              className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none transition focus:border-emerald-500/60"
        />

        <input
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          placeholder="Target Price"
          type="number"
          className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none transition focus:border-emerald-500/60"
        />

        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value as "above" | "below")}
          className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 outline-none transition focus:border-emerald-500/60"
        >
          <option value="above">Price above</option>
          <option value="below">Price below</option>
        </select>

        <button
          onClick={addAlert}
          className="rounded-2xl bg-emerald-500 font-black text-black transition hover:bg-emerald-400"
        >
          Add Alert
        </button>
      </div>

      {message && (
        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-slate-300">
          {message}
        </div>
      )}

      <div className="overflow-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-slate-400">
              <th className="pb-4">Symbol</th>
              <th className="pb-4">Condition</th>
              <th className="pb-4">Target</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((alert, index) => (
              <tr
                key={`${alert.symbol}-${index}`}
                className="border-b border-white/5 transition hover:bg-white/[0.04]"
              >
                <td className="py-5 font-black text-white">
                  {alert.symbol}
                </td>

                <td className="py-5 text-slate-300">
                  {alert.condition === "above" ? "Above" : "Below"}
                </td>

                <td className="py-5 text-slate-300">
                  ${alert.targetPrice}
                </td>

                <td
                  className={`py-5 font-black ${
                    alert.triggered ? "text-emerald-400" : "text-slate-400"
                  }`}
                >
                  {alert.triggered ? "Triggered" : "Waiting"}
                </td>

                <td className="py-5">
                  <button
                    onClick={() => removeAlert(index)}
                    className="rounded-full bg-red-500/10 px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {alerts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-400">
                  No alerts yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}