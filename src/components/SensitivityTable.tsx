"use client";

type SensObj = {
  tpp: number;
  fpp: number;
  red: number;
  scope2: number;
  scope3: number;
  scope4: number;
  scope6: number;
  scope8: number;
};

export function SensitivityTable({
  label,
  data,
  color = "orange",
  showTppFpp = true,
}: {
  label: string;
  data: SensObj;
  color?: "orange" | "sky";
  showTppFpp?: boolean;
}) {
  const colorClasses = color === "sky"
    ? "text-sky-300 from-sky-500/10 to-indigo-500/5"
    : "text-orange-300 from-orange-500/10 to-red-500/5";

  const items = [
    ...(showTppFpp ? [
      { k: "TPP", v: data.tpp },
      { k: "FPP", v: data.fpp },
    ] : []),
    { k: "Red", v: data.red },
    { k: "×2", v: data.scope2 },
    { k: "×3", v: data.scope3 },
    { k: "×4", v: data.scope4 },
    { k: "×6", v: data.scope6 },
    { k: "×8", v: data.scope8 },
  ];

  return (
    <div className="card rounded-2xl p-4">
      <h4 className={`mb-3 font-display text-sm font-bold tracking-widest ${colorClasses.split(" ")[0]}`}>
        {label}
      </h4>
      <div className="grid grid-cols-4 gap-1.5">
        {items.map((item) => (
          <div
            key={item.k}
            className={`rounded-lg border border-white/5 bg-gradient-to-br ${colorClasses.split(" ").slice(1).join(" ")} p-2 text-center`}
          >
            <div className="text-[10px] uppercase tracking-widest text-white/50">{item.k}</div>
            <div className={`mt-0.5 font-display text-lg font-black tabular-nums ${colorClasses.split(" ")[0]}`}>
              {item.v}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
