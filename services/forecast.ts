const API_URL =
  "http://127.0.0.1:8000";

export async function getForecast(
  symbol: string
) {

  const response =
    await fetch(
      `${API_URL}/forecast/${symbol}`
    );

  if (!response.ok) {

    throw new Error(
      "Forecast failed"
    );

  }

  return response.json();
}