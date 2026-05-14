"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

const WS_URL =
  "ws://127.0.0.1:8000/ws/notifications";

export default function useNotifications() {

  const socketRef =
    useRef<WebSocket | null>(null);

  const [notifications,
    setNotifications] =
    useState<any[]>([]);

  const [connected,
    setConnected] =
    useState(false);

  useEffect(() => {

    const socket =
      new WebSocket(
        WS_URL
      );

    socketRef.current =
      socket;

    socket.onopen = () => {

      console.log(
        "Notifications connected"
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
          "alert_triggered"
        ) {

          setNotifications(
            (prev) => [
              {
                ...message.data,
                id:
                  Date.now(),
              },
              ...prev,
            ]
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

      setConnected(false);

    };

    socket.onerror = (
      error
    ) => {

      console.error(
        error
      );

    };

    return () => {

      socket.close();

    };

  }, []);

  return {
    notifications,
    connected,
  };
}