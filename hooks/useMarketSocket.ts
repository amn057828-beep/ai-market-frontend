"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const WS_URL =
  "ws://127.0.0.1:8000/ws/market";

export default function useMarketSocket() {

  const socketRef =
    useRef<WebSocket | null>(null);

  const [marketStream,
    setMarketStream] =
    useState<any[]>([]);

  const [connected,
    setConnected] =
    useState(false);

  useEffect(() => {

    const socket =
      new WebSocket(WS_URL);

    socketRef.current =
      socket;

    socket.onopen = () => {

      console.log(
        "WebSocket connected"
      );

      setConnected(true);
    };

    socket.onmessage = (
      event
    ) => {

      try {

        const message =
          JSON.parse(
            event.data
          );

        if (
          message.type ===
          "market_update"
        ) {

          setMarketStream(
            message.data
          );

        }

      } catch (
        error
      ) {

        console.error(
          error
        );

      }

    };

    socket.onclose = () => {

      console.log(
        "WebSocket disconnected"
      );

      setConnected(false);

    };

    socket.onerror = (
      error
    ) => {

      console.error(
        "WebSocket error",
        error
      );

    };

    return () => {

      socket.close();

    };

  }, []);

  return {
    marketStream,
    connected,
  };
}