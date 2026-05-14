"use client";

type Props = {
  notifications: any[];
};

export default function NotificationCenter({
  notifications,
}: Props) {

  return (

    <div className="glass-card mb-8 rounded-[28px] p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="mb-2 text-sm font-bold text-yellow-400">
            LIVE ALERTS
          </p>

          <h3 className="text-2xl font-black">
            Notification Center
          </h3>

        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/10 text-xl">
          🔔
        </div>

      </div>

      {notifications.length === 0 && (

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm text-slate-400">
          No live alerts yet.
        </div>

      )}

      <div className="space-y-4">

        {notifications.map(
          (item) => (

            <div
              key={item.id}
              className="animate-pulse rounded-2xl border border-yellow-500/20 bg-yellow-500/10 p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <h4 className="text-xl font-black text-yellow-400">
                    {item.symbol}
                  </h4>

                  <p className="mt-2 text-sm text-slate-300">
                    Alert Triggered:
                    {" "}
                    {item.alert_type}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-sm text-slate-400">
                    Current Price
                  </p>

                  <h3 className="mt-2 text-2xl font-black text-white">
                    $
                    {item.price}
                  </h3>

                </div>

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );
}