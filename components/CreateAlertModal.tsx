"use client";

import {
  useState,
} from "react";

interface Props {
  symbol: string;
  token: string;
}

export default function CreateAlertModal({
  symbol,
  token,
}: Props) {

  const [
    targetPrice,
    setTargetPrice,
  ] = useState("");

  const [
    alertType,
    setAlertType,
  ] = useState(
    "price_above"
  );

  const [
    loading,
    setLoading,
  ] = useState(false);

  const createAlert = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(
          "http://127.0.0.1:8000/alerts/",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify({
              symbol,
              alert_type: alertType,
              target_price:
                Number(targetPrice),
            }),
          }
        );

      const data =
        await response.json();

      alert(
        data.message ||
        "Alert created"
      );

    } catch (error) {

      alert(
        "Failed to create alert"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mt-5">

      <h2 className="text-xl font-bold mb-4">
        Create Alert
      </h2>

      <div className="space-y-4">

        <select
          value={alertType}
          onChange={(e) =>
            setAlertType(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl bg-zinc-800"
        >
          <option value="price_above">
            Price Above
          </option>

          <option value="price_below">
            Price Below
          </option>
        </select>

        <input
          type="number"
          placeholder="Target Price"
          value={targetPrice}
          onChange={(e) =>
            setTargetPrice(
              e.target.value
            )
          }
          className="w-full p-3 rounded-xl bg-zinc-800"
        />

        <button
          onClick={createAlert}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 transition p-3 rounded-xl font-bold"
        >
          {loading
            ? "Creating..."
            : "Create Alert"}
        </button>

      </div>

    </div>
  );
}