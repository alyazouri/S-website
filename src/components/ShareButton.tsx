"use client";

import { useState, useCallback } from "react";
import { useLang } from "./LanguageContext";
import type { Sens } from "@/lib/sensitivity";

export function ShareButton({ sens, deviceName, weaponName }: { sens: Sens; deviceName: string; weaponName: string }) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [shared, setShared] = useState(false);

  const buildShareText = useCallback(() => {
    return [
      isAr ? "🎯 حساسيتي من ALYAZOURI 2026" : "🎯 My Sensitivity from ALYAZOURI 2026",
      `📱 ${deviceName} · 🔫 ${weaponName}`,
      ``,
      `📷 Camera: TPP ${sens.cam.tpp}% | FPP ${sens.cam.fpp}%`,
      `🎯 ADS: TPP ${sens.ads.tpp}% | FPP ${sens.ads.fpp}%`,
      `Red Dot: ${sens.cam.red}% | ×4: ${sens.cam.scope4}%`,
      `🏆 AI Score: ${sens.aiScore}/100`,
      ``,
      `🔗 alyazouri.com`,
    ].join("\n");
  }, [sens, deviceName, weaponName, isAr]);

  const handleShare = async () => {
    const text = buildShareText();
    try {
      if (navigator.share) {
        await navigator.share({ title: "ALYAZOURI Sensitivity", text });
        setShared(true);
      } else {
        await navigator.clipboard.writeText(text);
        setShared(true);
      }
      setTimeout(() => setShared(false), 3000);
    } catch { /* cancelled */ }
  };

  return (
    <button
      onClick={handleShare}
      className={`btn-ghost w-full rounded-xl px-5 py-3 text-sm transition-all ${shared ? "!border-emerald-400/50 !text-emerald-300" : ""}`}
    >
      {shared
        ? `✅ ${isAr ? "تمت المشاركة!" : "Shared!"}`
        : `📤 ${isAr ? "مشاركة الحساسية" : "Share Sensitivity"}`}
    </button>
  );
}
