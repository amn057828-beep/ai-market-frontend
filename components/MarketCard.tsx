type MarketCardProps = {
  title: string;
  value: string;
  subtitle: string;
  color: string;
};

export default function MarketCard({
  title,
  value,
  subtitle,
  color,
}: MarketCardProps) {
  return (
    <div className="glass-card rounded-[28px] p-6 transition hover:-translate-y-1 hover:border-emerald-500/30">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-400">
          {title}
        </p>

        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(34,197,94,0.9)]" />
      </div>

      <h3 className="text-4xl font-black tracking-tight text-white">
        {value}
      </h3>

      <p className={`mt-4 text-sm font-semibold ${color}`}>
        {subtitle}
      </p>
    </div>
  );
}