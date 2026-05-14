"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
  getAdminUsers,
  activateUserPro,
  deactivateUserSubscription,
} from "@/services/admin";


export default function AdminPage() {

  const [
    users,
    setUsers,
  ] = useState<any[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    actionLoading,
    setActionLoading,
  ] = useState<number | null>(null);


  async function loadUsers() {

    try {

      const data =
        await getAdminUsers();

      setUsers(
        data.users || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }


  async function activatePro(
    userId: number
  ) {

    try {

      setActionLoading(userId);

      await activateUserPro(
        userId
      );

      await loadUsers();

    } catch (error) {

      console.error(error);

    } finally {

      setActionLoading(null);
    }
  }


  async function deactivate(
    userId: number
  ) {

    try {

      setActionLoading(userId);

      await deactivateUserSubscription(
        userId
      );

      await loadUsers();

    } catch (error) {

      console.error(error);

    } finally {

      setActionLoading(null);
    }
  }


  useEffect(() => {

    loadUsers();

  }, []);


  const activeUsers =
    users.filter(
      (u) => u.subscription_active
    ).length;

  const freeUsers =
    users.filter(
      (u) => !u.subscription_active
    ).length;

  const monthlyRevenue =
    activeUsers * 19;


  return (

    <main className="min-h-screen bg-[#020617] px-6 py-10 text-white">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">

          <div>

            <p className="mb-2 font-black tracking-widest text-cyan-400">
              ADMIN PANEL
            </p>

            <h1 className="text-5xl font-black">
              Platform Control
            </h1>

            <p className="mt-3 text-slate-400">
              Manage users, subscriptions, and platform activity.
            </p>

          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 font-black text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            ← Dashboard
          </Link>

        </div>


        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-4">

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

            <p className="text-sm text-slate-400">
              Users
            </p>

            <h3 className="mt-3 text-4xl font-black">
              {users.length}
            </h3>

          </div>


          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

            <p className="text-sm text-slate-400">
              Active PRO
            </p>

            <h3 className="mt-3 text-4xl font-black text-emerald-400">
              {activeUsers}
            </h3>

          </div>


          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

            <p className="text-sm text-slate-400">
              Free Users
            </p>

            <h3 className="mt-3 text-4xl font-black text-yellow-400">
              {freeUsers}
            </h3>

          </div>


          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

            <p className="text-sm text-slate-400">
              Estimated MRR
            </p>

            <h3 className="mt-3 text-4xl font-black text-cyan-400">
              ${monthlyRevenue}
            </h3>

          </div>

        </div>


        <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6">

          <div className="mb-6">

            <h2 className="text-3xl font-black">
              Users
            </h2>

            <p className="mt-2 text-slate-400">
              Real-time subscription management dashboard.
            </p>

          </div>


          {loading ? (

            <div className="py-10 text-center text-slate-400">
              Loading users...
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px] border-separate border-spacing-y-3">

                <thead>

                  <tr className="text-left text-sm text-slate-400">

                    <th>ID</th>

                    <th>Username</th>

                    <th>Email</th>

                    <th>Telegram</th>

                    <th>Plan</th>

                    <th>Status</th>

                    <th>Actions</th>

                  </tr>

                </thead>


                <tbody>

                  {users.map((user) => (

                    <tr
                      key={user.id}
                      className="bg-white/[0.04]"
                    >

                      <td className="rounded-l-2xl px-4 py-4 font-black">
                        #{user.id}
                      </td>


                      <td className="px-4 py-4">
                        {user.username}
                      </td>


                      <td className="px-4 py-4 text-slate-300">
                        {user.email}
                      </td>


                      <td className="px-4 py-4 text-slate-400">
                        {user.telegram_chat_id || "-"}
                      </td>


                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            user.subscription_plan === "pro"
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-yellow-500/10 text-yellow-400"
                          }`}
                        >
                          {user.subscription_plan?.toUpperCase()}
                        </span>

                      </td>


                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-black ${
                            user.subscription_active
                              ? "bg-emerald-500/10 text-emerald-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {user.subscription_active
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>


                      <td className="rounded-r-2xl px-4 py-4">

                        {user.subscription_active ? (

                          <button
                            onClick={() =>
                              deactivate(user.id)
                            }
                            disabled={
                              actionLoading === user.id
                            }
                            className="rounded-xl bg-red-500 px-4 py-2 font-black text-white transition hover:bg-red-400"
                          >
                            {actionLoading === user.id
                              ? "Loading..."
                              : "Deactivate"}
                          </button>

                        ) : (

                          <button
                            onClick={() =>
                              activatePro(user.id)
                            }
                            disabled={
                              actionLoading === user.id
                            }
                            className="rounded-xl bg-emerald-500 px-4 py-2 font-black text-black transition hover:bg-emerald-400"
                          >
                            {actionLoading === user.id
                              ? "Loading..."
                              : "Activate PRO"}
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </main>
  );
}