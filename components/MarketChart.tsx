'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function MarketChart({ symbol }: { symbol: string }) {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/market/${symbol}`)
      .then(res => res.json())
      .then(res => setData(res.candles || []))
      .catch(err => console.error('Market data fetch error', err));
  }, [symbol]);

  const series = [{ data }];
  const options = {
    chart: { type: 'candlestick', height: 350 },
    xaxis: { type: 'category' },
  };

  return <Chart options={options} series={series} type="candlestick" height={350} />;
}