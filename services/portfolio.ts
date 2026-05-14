const API_URL =
  "http://127.0.0.1:8000";

function getHeaders() {

  const token =
    localStorage.getItem("token");

  return {
    "Content-Type":
      "application/json",

    Authorization:
      `Bearer ${token}`,
  };
}

export async function getPortfolio() {

  const response =
    await fetch(
      `${API_URL}/portfolio`,
      {
        headers:
          getHeaders(),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to load portfolio"
    );

  }

  return response.json();
}

export async function addPortfolioPosition(
  symbol: string,
  quantity: number,
  buy_price: number
) {

  const response =
    await fetch(
      `${API_URL}/portfolio`,
      {
        method: "POST",

        headers:
          getHeaders(),

        body: JSON.stringify({
          symbol,
          quantity,
          buy_price,
        }),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    throw new Error(
      data.detail ||
        "Failed to add position"
    );

  }

  return data;
}

export async function deletePortfolioPosition(
  id: number
) {

  const response =
    await fetch(
      `${API_URL}/portfolio/${id}`,
      {
        method: "DELETE",

        headers:
          getHeaders(),
      }
    );

  if (!response.ok) {

    throw new Error(
      "Failed to delete position"
    );

  }

  return response.json();
}