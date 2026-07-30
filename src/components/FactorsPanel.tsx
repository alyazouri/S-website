"use client";

import type { Sens } from "@/lib/sensitivity";
import { useLang } from "./LanguageContext";
import { t } from "@/lib/i18n";

export function FactorsPanel({ sens }: { sens: Sens }) {
  const { lang } = useLang();

  const factors = [
    { k: t("factors_device", lang), v: sens.factors.deviceFactor, icon: "📱" },
    { k: t("factors_finger", lang), v: sens.factors.fingerFactor, icon: "🖐️" },
    { k: t("factors_style", lang), v: sens.factors.styleFactor, icon: "🎮" },
    { k: t("factors_weapon", lang), v: sens.factors.weaponFactor, icon: "🔫" },
  ];

  return (
    <div className="card rounded-2xl p-4">
      <h4 className="mb-3 font-display text-sm font-bold tracking-widest text-white/90">
        {t("factors_title", lang)}
      </h4>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {factors.map((f) => (
          <div key={f.k} className="rounded-xl border border-white/5 bg-black/30 p-3 text-center">
            <div className="text-lg">{f.icon}</div>
            <div className="mt-1 text-[10px] text-white/50">{f.k}</div>
            <div className="mt-0.5 font-display text-lg font-bold text-orange-300 tabular-nums">
              ×{f.v.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
