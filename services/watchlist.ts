const API_URL = "http://127.0.0.1:8000";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getWatchlist() {
  const response = await fetch(
    `${API_URL}/watchlist`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load watchlist"
    );
  }

  return response.json();
}

export async function addWatchlist(
  symbol: string
) {
  const response = await fetch(
    `${API_URL}/watchlist`,
    {
      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify({
        symbol,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail ||
        "Failed to add symbol"
    );
  }

  return data;
}

export async function deleteWatchlist(
  id: number
) {
  const response = await fetch(
    `${API_URL}/watchlist/${id}`,
    {
      method: "DELETE",

      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to delete symbol"
    );
  }

  return response.json();
}