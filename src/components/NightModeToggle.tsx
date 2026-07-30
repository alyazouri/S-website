"use client";

import { useEffect, useState } from "react";
import { useLang } from "./LanguageContext";

const NIGHT_KEY = "alyazouri_night_mode";

export function useNightMode() {
  const [night, setNight] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(NIGHT_KEY);
      if (saved === "true") setNight(true);
    } catch { /* */ }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.classList.toggle("gaming-mode", night);
    try { localStorage.setItem(NIGHT_KEY, String(night)); } catch { /* */ }
  }, [night, mounted]);

  return { night, toggleNight: () => setNight((n) => !n), mounted };
}

export function NightModeToggle() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const { night, toggleNight, mounted } = useNightMode();

  if (!mounted) return null;

  return (
    <button
      onClick={toggleNight}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
        night
          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
          : "btn-ghost"
      }`}
      title={isAr ? "وضع الألعاب الليلي" : "Gaming Night Mode"}
    >
      <span className="text-lg">{night ? "🌙" : "☀️"}</span>
    </button>
  );
}
