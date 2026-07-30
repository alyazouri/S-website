"use client";

import { useState } from "react";
import type { Sens } from "@/lib/sensitivity";
import { t } from "@/lib/i18n";

export function CopyButton({ sens, lang }: { sens: Sens; lang: string }) {
  const [copied, setCopied] = useState(false);

  const buildText = () => {
    return [
      `═══ ALYAZOURI SENSITIVITY 2026 ═══`, ``,
      `📷 Camera:`, `  TPP: ${sens.cam.tpp}%  |  FPP: ${sens.cam.fpp}%`,
      `  Red Dot: ${sens.cam.red}%`, `  ×2: ${sens.cam.scope2}%  |  ×3: ${sens.cam.scope3}%`,
      `  ×4: ${sens.cam.scope4}%  |  ×6: ${sens.cam.scope6}%  |  ×8: ${sens.cam.scope8}%`, ``,
      `🎯 ADS:`, `  TPP: ${sens.ads.tpp}%  |  FPP: ${sens.ads.fpp}%`,
      `  Red Dot: ${sens.ads.red}%`, `  ×2: ${sens.ads.scope2}%  |  ×3: ${sens.ads.scope3}%`,
      `  ×4: ${sens.ads.scope4}%  |  ×6: ${sens.ads.scope6}%  |  ×8: ${sens.ads.scope8}%`, ``,
      `🔄 Gyro Cam: TPP ${sens.gyroCam.tpp}% | FPP ${sens.gyroCam.fpp}%`,
      `🔄 Gyro ADS: TPP ${sens.gyroAds.tpp}% | FPP ${sens.gyroAds.fpp}%`, ``,
      `👁️ Free Look: ${sens.freeLook.cam}% | ${sens.freeLook.parashoot}% | ${sens.freeLook.vehicle}%`, ``,
      `🏆 AI Score: ${sens.aiScore}/100`, ``,
      `🔗 alyazouri.com`,
    ].join("\n");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <button
      onClick={copy}
      className={`btn-primary w-full rounded-xl px-5 py-3 text-sm transition-all ${
        copied ? "!bg-emerald-500" : ""
      }`}
    >
      {copied ? t("copy_success", lang as "ar" | "en" | "tr" | "ru" | "es") : t("copy_btn", lang as "ar" | "en" | "tr" | "ru" | "es")}
    </button>
  );
}
