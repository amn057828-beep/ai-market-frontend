const API_URL = "http://127.0.0.1:8000";

// =========================================
// ANALYZE
// =========================================

export async function analyzeSymbol(
  symbol: string
) {

  const response = await fetch(
    `${API_URL}/analyze/${symbol}`
  );

  return response.json();
}

// =========================================
// CHART
// =========================================

export async function getChartData(
  symbol: string,
  period: string
) {

  const response = await fetch(
    `${API_URL}/chart/${symbol}?period=${period}`
  );

  return response.json();
}

// =========================================
// SCANNER
// =========================================

export async function getScanner(
  market: string
) {

  const response = await fetch(
    `${API_URL}/scanner/${market}`
  );

  return response.json();
}