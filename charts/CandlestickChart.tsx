"use client";

import { useEffect, useRef } from "react";

import {
  createChart,
  CandlestickSeries,
  ColorType,
} from "lightweight-charts";

type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export default function CandlestickChart({
  candles,
}: {
  candles: Candle[];
}) {

  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!chartRef.current) return;

    chartRef.current.innerHTML = "";

    const chart = createChart(chartRef.current, {

      width: chartRef.current.clientWidth,
      height: 420,

      layout: {

        background: {
          type: ColorType.Solid,
          color: "#050505",
        },

        textColor: "#ffffff",
      },

      grid: {

        vertLines: {
          color: "#1f1f1f",
        },

        horzLines: {
          color: "#1f1f1f",
        },
      },

    });

    const candleSeries = chart.addSeries(CandlestickSeries, {

      upColor: "#00ff88",
      downColor: "#ff4d4f",

      borderUpColor: "#00ff88",
      borderDownColor: "#ff4d4f",

      wickUpColor: "#00ff88",
      wickDownColor: "#ff4d4f",
    });

    candleSeries.setData(candles);

    chart.timeScale().fitContent();

    const handleResize = () => {

      chart.applyOptions({
        width: chartRef.current?.clientWidth || 800,
      });

    };

    window.addEventListener("resize", handleResize);

    return () => {

      window.removeEventListener("resize", handleResize);

      chart.remove();

    };

  }, [candles]);

  return (
    <div
      ref={chartRef}
      className="w-full"
    />
  );
}