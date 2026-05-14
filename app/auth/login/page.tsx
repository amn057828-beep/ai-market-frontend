"use client";

import { useState } from "react";
import { loginUser, saveAuthSession } from "@/services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");

      const data = await loginUser(email, password);

      saveAuthSession(data);

      window.location.href = "/";
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#020617] px-6 text-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute left-[-120px] top-[-120px] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute right-[-120px] top-[100px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-bold text-emerald-400">
            AI MARKET
          </p>

          <h1 className="text-4xl font-black">
            Welcome Back
          </h1>

          <p className="mt-3 text-slate-400">
            Login to your market intelligence dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-emerald-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 outline-none transition focus:border-emerald-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-2xl bg-emerald-500 py-4 text-lg font-black text-black transition hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/register"
            className="font-bold text-emerald-400 hover:text-emerald-300"
          >
            Create account
          </a>
        </p>
      </div>
    </main>
  );
}