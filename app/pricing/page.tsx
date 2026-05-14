"use client";

import Link from "next/link";

const plans = [
  {
    name: "FREE",
    price: "$0",
    description: "Basic access for beginners",
    features: [
      "5 Alerts",
      "Basic Scanner",
      "Basic AI Signals",
      "Watchlist",
    ],
    color: "border-zinc-700",
    button: "Start Free",
  },
  {
    name: "PRO",
    price: "$19",
    description: "Advanced AI trading tools",
    features: [
      "Unlimited Alerts",
      "AI Forecast",
      "Telegram Alerts",
      "Advanced Scanner",
      "Portfolio Tracker",
      "Real-Time Notifications",
    ],
    color: "border-emerald-500",
    button: "Upgrade to PRO",
    popular: true,
  },
  {
    name: "ELITE",
    price: "$49",
    description: "Institutional-level AI intelligence",
    features: [
      "Whale Alerts",
      "AI Market Scoring",
      "Sentiment Analysis",
      "Smart Money Tracking",
      "AI Portfolio Manager",
      "Priority Features",
    ],
    color: "border-cyan-500",
    button: "Go ELITE",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#020617] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="mb-4 font-black tracking-widest text-emerald-400">
            AI MARKET PRICING
          </p>

          <h1 className="mb-6 text-5xl font-black md:text-7xl">
            Choose Your Plan
          </h1>

          <p className="mx-auto max-w-3xl text-xl text-slate-400">
            Unlock institutional-grade AI trading tools, real-time alerts,
            forecasts, and advanced market intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[32px] border ${plan.color} bg-white/[0.03] p-8 backdrop-blur-xl transition hover:scale-[1.02]`}
            >
              {plan.popular && (
                <div className="absolute right-5 top-5 rounded-full bg-emerald-500 px-4 py-2 text-xs font-black text-black">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-10">
                <h2 className="mb-3 text-3xl font-black">{plan.name}</h2>

                <div className="mb-4 flex items-end gap-2">
                  <span className="text-6xl font-black">{plan.price}</span>

                  <span className="mb-2 text-slate-400">/month</span>
                </div>

                <p className="text-slate-400">{plan.description}</p>
              </div>

              <div className="mb-10 space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-emerald-400" />

                    <span className="text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://t.me/ShadowMix_Global"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full rounded-2xl py-4 text-center text-lg font-black transition ${
                  plan.name === "FREE"
                    ? "bg-zinc-800 hover:bg-zinc-700"
                    : plan.name === "PRO"
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-cyan-500 text-black hover:bg-cyan-400"
                }`}
              >
                {plan.button}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <Link href="/" className="text-slate-400 transition hover:text-white">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}