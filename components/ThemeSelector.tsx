type ThemeSelectorProps = {
  theme: string;
  onChange: (theme: string) => void;
};

const themes = [
  {
    name: "Emerald",
    value: "emerald",
    color: "bg-emerald-500",
    glow: "shadow-[0_0_24px_rgba(34,197,94,0.45)]",
  },
  {
    name: "Blue",
    value: "blue",
    color: "bg-blue-500",
    glow: "shadow-[0_0_24px_rgba(59,130,246,0.45)]",
  },
  {
    name: "Purple",
    value: "purple",
    color: "bg-purple-500",
    glow: "shadow-[0_0_24px_rgba(168,85,247,0.45)]",
  },
  {
    name: "Gold",
    value: "gold",
    color: "bg-yellow-400",
    glow: "shadow-[0_0_24px_rgba(250,204,21,0.45)]",
  },
];

export default function ThemeSelector({
  theme,
  onChange,
}: ThemeSelectorProps) {
  return (
    <div className="glass-card mb-8 rounded-[28px] p-6">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-2 text-sm font-bold text-emerald-400">
            APPEARANCE
          </p>

          <h3 className="text-2xl font-black">
            Platform Theme
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            اختر اللون العام لهوية المنصة.
          </p>
        </div>

        <span className="rounded-full bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-400">
          Current: {theme}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {themes.map((item) => (
          <button
            key={item.value}
            onClick={() => onChange(item.value)}
            className={`rounded-[24px] border p-5 text-left transition hover:-translate-y-1 ${
              theme === item.value
                ? "border-white/30 bg-white/10"
                : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07]"
            }`}
          >
            <div
              className={`mb-5 h-10 w-10 rounded-2xl ${item.color} ${
                theme === item.value ? item.glow : ""
              }`}
            />

            <h4 className="text-lg font-black text-white">
              {item.name}
            </h4>

            <p className="mt-2 text-xs text-slate-400">
              {theme === item.value ? "Active theme" : "Click to apply"}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}