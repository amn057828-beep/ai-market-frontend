export type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type AiSignal = {
  type: string;
  label_ar: string;
  strength: number;
  color: "green" | "yellow" | "red" | "blue" | string;
  reason: string;
};

export type MarketData = {
  success: boolean;
  symbol?: string;

  market_data?: {
    price: number;
    volume: number;
  };

  technical_indicators?: {
    rsi: number;
    ma20: number;
    ma50: number;
    macd: number;
    signal: number;
  };

  ai_analysis?: {
    score: number;
    trend: string;
    rsi_status: string;
    macd_signal: string;
    risk_level: string;
    recommendation_ar: string;
  };

  ai_signals?: AiSignal[];

  error?: string;
};

export type ScannerItem = {
  symbol: string;
  price: number;
  rsi: number;
  trend: string;
  signal: string;
  score: number;
};

export type PeriodOption = {
  label: string;
  value: string;
};

export type MarketOption = {
  label: string;
  value: string;
};