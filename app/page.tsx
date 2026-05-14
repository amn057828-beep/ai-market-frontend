"use client";

import { useEffect, useState } from "react";

import AuthGuard from "@/components/AuthGuard";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import MarketCard from "@/components/MarketCard";
import AnalysisPanel from "@/components/AnalysisPanel";
import ScannerTable from "@/components/ScannerTable";
import MarketHeatmap from "@/components/MarketHeatmap";
import Watchlist from "@/components/Watchlist";
import PortfolioTracker from "@/components/PortfolioTracker";
import AiSignals from "@/components/AiSignals";
import AlertsPanel from "@/components/AlertsPanel";
import ForecastPanel from "@/components/ForecastPanel";
import NotificationCenter from "@/components/NotificationCenter";
import CreateAlertModal from "@/components/CreateAlertModal";

import CandlestickChart from "@/charts/CandlestickChart";

import useMarketSocket from "@/hooks/useMarketSocket";
import useNotifications from "@/hooks/useNotifications";

import { logoutUser, getCurrentUser } from "@/services/auth";

import {
  getWatchlist,
  addWatchlist,
  deleteWatchlist,
} from "@/services/watchlist";

import {
  getPortfolio,
  addPortfolioPosition,
  deletePortfolioPosition,
} from "@/services/portfolio";

import {
  analyzeSymbol,
  getChartData,
  getScanner,
} from "@/services/api";

import { getForecast } from "@/services/forecast";

const periods = [
  { label: "5D", value: "5d" },
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
];

const markets = [
  { label: "🇺🇸 US Stocks", value: "us" },
  { label: "🇸🇦 Gulf Market", value: "gulf" },
  { label: "₿ Crypto", value: "crypto" },
  { label: "🛢️ Commodities", value: "commodities" },
];

const emptyPortfolio = {
  positions: [],
  summary: {
    total_value: 0,
    total_cost: 0,
    total_pnl: 0,
    total_pnl_percent: 0,
  },
};

export default function Home() {
  const { marketStream, connected } = useMarketSocket();
  const { notifications } = useNotifications();

  const [symbol, setSymbol] = useState("AAPL");
  const [period, setPeriod] = useState("1mo");
  const [market, setMarket] = useState("us");

  const [data, setData] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [candles, setCandles] = useState<any[]>([]);
  const [scanner, setScanner] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any>(emptyPortfolio);

  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState("");

  const [loading, setLoading] = useState(false);
  const [scannerLoading, setScannerLoading] = useState(false);
  const [notification, setNotification] = useState("");

  async function loadAnalysis(currentSymbol: string, currentPeriod = period) {
    try {
      setLoading(true);

      const analysis = await analyzeSymbol(currentSymbol);
      setData(analysis);

      const forecastData = await getForecast(currentSymbol);
      setForecast(forecastData);

      const chart = await getChartData(currentSymbol, currentPeriod);

      if (chart.success) {
        setCandles(chart.candles);
      } else {
        setCandles([]);
      }
    } catch {
      setCandles([]);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  }

  async function loadScanner(selectedMarket: string) {
    try {
      setScannerLoading(true);

      const data = await getScanner(selectedMarket);

      if (data.success) {
        setScanner(data.results);
      } else {
        setScanner([]);
      }
    } catch {
      setScanner([]);
    } finally {
      setScannerLoading(false);
    }
  }

  async function loadWatchlist() {
    try {
      const data = await getWatchlist();
      setWatchlist(data);
    } catch {
      setWatchlist([]);
    }
  }

  async function loadPortfolio() {
    try {
      const data = await getPortfolio();
      setPortfolio(data);
    } catch {
      setPortfolio(emptyPortfolio);
    }
  }

  function showNotification(message: string) {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  }

  function selectSymbol(nextSymbol: string) {
    setSymbol(nextSymbol);
    loadAnalysis(nextSymbol, period);
  }

  function changePeriod(nextPeriod: string) {
    setPeriod(nextPeriod);
    loadAnalysis(symbol, nextPeriod);
  }

  function changeMarket(nextMarket: string) {
    setMarket(nextMarket);
    loadScanner(nextMarket);
  }

  async function handleAddWatchlist() {
    try {
      await addWatchlist(symbol);
      await loadWatchlist();

      showNotification(`${symbol} added`);
    } catch (err: any) {
      showNotification(err.message);
    }
  }

  async function handleRemoveWatchlist(id: number, symbolName: string) {
    try {
      await deleteWatchlist(id);
      await loadWatchlist();

      showNotification(`${symbolName} removed`);
    } catch {
      showNotification("Delete failed");
    }
  }

  async function handleAddPortfolio() {
    try {
      const currentPrice = Number(data?.market_data?.price || 0);

      if (!symbol || currentPrice <= 0) {
        showNotification("No valid price found");
        return;
      }

      await addPortfolioPosition(symbol, 10, currentPrice);

      await loadPortfolio();

      showNotification(`${symbol} added to portfolio`);
    } catch (err: any) {
      showNotification(err.message || "Failed to add position");
    }
  }

  async function handleDeletePortfolio(id: number) {
    try {
      await deletePortfolioPosition(id);

      await loadPortfolio();

      showNotification("Position removed");
    } catch {
      showNotification("Delete failed");
    }
  }

  useEffect(() => {
    setUser(getCurrentUser());
    setToken(localStorage.getItem("token") || "");

    loadAnalysis(symbol, period);
    loadScanner(market);
    loadWatchlist();
    loadPortfolio();
  }, []);

  return (
    <AuthGuard>
      <main className="min-h-screen bg-[#020617] text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute left-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
          <div className="absolute right-[-120px] top-[100px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        {notification && (
          <div className="fixed right-5 top-5 z-50 rounded-2xl bg-emerald-500 px-5 py-3 font-black text-black shadow-2xl">
            {notification}
          </div>
        )}

        <div className="relative z-10 flex min-h-screen">
          <Sidebar />

          <section className="flex-1 p-6 lg:p-10">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-400">Logged in as</p>

                <h3 className="text-xl font-black">
                  {user?.username || "User"}
                </h3>
              </div>

              <button
                onClick={logoutUser}
                className="rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 font-black text-red-400 transition hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>

            <Header
              symbol={symbol}
              setSymbol={setSymbol}
              onAnalyze={() => loadAnalysis(symbol, period)}
            />

            <NotificationCenter notifications={notifications} />

            <div className="glass-card mb-8 rounded-[28px] p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="mb-2 text-sm font-bold text-cyan-400">
                    LIVE MARKET STREAM
                  </p>

                  <h3 className="text-2xl font-black">Real-Time Prices</h3>
                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    connected
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-red-500/10 text-red-400"
                  }`}
                >
                  {connected ? "Connected" : "Offline"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {marketStream.map((item) => (
                  <button
                    key={item.symbol}
                    onClick={() => selectSymbol(item.symbol)}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition hover:border-cyan-500/30 hover:bg-white/[0.07]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Asset</p>

                        <h4 className="mt-2 text-2xl font-black">
                          {item.symbol}
                        </h4>
                      </div>

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 font-black text-cyan-400">
                        $
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm text-slate-400">Live Price</p>

                      <h3 className="mt-2 text-3xl font-black text-emerald-400">
                        ${item.price}
                      </h3>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8 flex flex-wrap gap-3">
              <button
                onClick={handleAddWatchlist}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-5 py-3 font-black text-emerald-400 transition hover:bg-emerald-500 hover:text-black"
              >
                + Add to Watchlist
              </button>
            </div>

            <Watchlist
              items={watchlist}
              currentSymbol={symbol}
              onSelect={selectSymbol}
              onRemove={handleRemoveWatchlist}
            />

            {loading && (
              <div className="glass-card mb-8 rounded-[28px] p-8 text-center text-slate-400">
                Loading market data...
              </div>
            )}

            {!loading && data && !data.success && (
              <div className="mb-8 rounded-[28px] border border-red-500/20 bg-red-500/10 p-5 text-red-400">
                {data.error || "No market data found"}
              </div>
            )}

            {!loading && data && data.success && (
              <>
                <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
                  <MarketCard
                    title={data.symbol || symbol}
                    value={`$${data.market_data.price}`}
                    subtitle={data.ai_analysis.recommendation_ar}
                    color="text-emerald-400"
                  />

                  <MarketCard
                    title="RSI"
                    value={String(data.technical_indicators.rsi)}
                    subtitle={data.ai_analysis.rsi_status}
                    color="text-yellow-400"
                  />

                  <MarketCard
                    title="MACD"
                    value={data.ai_analysis.macd_signal}
                    subtitle={data.ai_analysis.trend}
                    color="text-cyan-400"
                  />

                  <MarketCard
                    title="AI Score"
                    value={`${data.ai_analysis.score}/100`}
                    subtitle={`Risk: ${data.ai_analysis.risk_level}`}
                    color="text-emerald-400"
                  />
                </div>

                <AiSignals signals={data.ai_signals || []} />

                <ForecastPanel forecast={forecast} />

                <CreateAlertModal symbol={symbol} token={token} />

                <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
                  <div className="glass-card rounded-[28px] p-6 xl:col-span-2">
                    <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <h3 className="text-2xl font-black">Market Chart</h3>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {periods.map((item) => (
                            <button
                              key={item.value}
                              onClick={() => changePeriod(item.value)}
                              className={`rounded-xl px-4 py-2 text-sm font-black transition ${
                                period === item.value
                                  ? "bg-emerald-500 text-black"
                                  : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]"
                              }`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="overflow-hidden rounded-[24px] border border-white/10 bg-black">
                      <CandlestickChart candles={candles} />
                    </div>
                  </div>

                  <AnalysisPanel
                    trend={data.ai_analysis.trend}
                    rsiStatus={data.ai_analysis.rsi_status}
                    macdSignal={data.ai_analysis.macd_signal}
                    riskLevel={data.ai_analysis.risk_level}
                    volume={String(data.market_data.volume)}
                    ma20={String(data.technical_indicators.ma20)}
                    ma50={String(data.technical_indicators.ma50)}
                    recommendation={data.ai_analysis.recommendation_ar}
                  />
                </div>
              </>
            )}

            <div className="mb-6 flex flex-wrap gap-3">
              <button
                onClick={handleAddPortfolio}
                className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3 font-black text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
              >
                + Add to Portfolio
              </button>
            </div>

            <PortfolioTracker
              positions={portfolio.positions}
              summary={portfolio.summary}
              livePrices={marketStream}
              onDelete={handleDeletePortfolio}
            />

            <AlertsPanel />

            <div className="mb-6 flex flex-wrap gap-2">
              {markets.map((item) => (
                <button
                  key={item.value}
                  onClick={() => changeMarket(item.value)}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    market === item.value
                      ? "bg-emerald-500 text-black"
                      : "bg-white/[0.04] text-slate-400 hover:bg-white/[0.08]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {scannerLoading && (
              <div className="glass-card mb-8 rounded-[28px] p-6 text-center text-slate-400">
                Loading scanner...
              </div>
            )}

            <MarketHeatmap scanner={scanner} onSelect={selectSymbol} />

            <ScannerTable
              scanner={scanner}
              loading={scannerLoading}
              onSelectSymbol={selectSymbol}
            />
          </section>
        </div>
      </main>
    </AuthGuard>
  );
}