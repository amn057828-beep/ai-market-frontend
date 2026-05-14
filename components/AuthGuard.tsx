"use client";

import { useEffect, useState } from "react";

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({
  children,
}: AuthGuardProps) {
  const [authorized, setAuthorized] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      window.location.href =
        "/auth/login";

      return;
    }

    setAuthorized(true);
  }, []);

  if (!authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#020617] text-white">
        <div className="text-center">
          <div className="mb-4 h-14 w-14 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent mx-auto" />

          <p className="text-slate-400">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}