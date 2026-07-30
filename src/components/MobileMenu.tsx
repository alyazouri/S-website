"use client";

import { useState } from "react";
import { useLang } from "./LanguageContext";
import { t } from "@/lib/i18n";

export function MobileMenu() {
  const { lang } = useLang();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-white/5 text-white"
        aria-label="Toggle menu"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-[#0a0a14] border-l border-white/10 p-6">
            <div className="flex items-center justify-between mb-8">
              <div className="font-display text-lg font-bold text-white">ALYAZOURI</div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-2">
              <a
                href="#generator"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:bg-white/5 hover:text-orange-300"
              >
                <span>🎯</span>
                {t("nav_generator", lang)}
              </a>
              <a
                href="#ping"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:bg-white/5 hover:text-orange-300"
              >
                <span>📡</span>
                {t("nav_ping", lang)}
              </a>
              <a
                href="#weapons"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:bg-white/5 hover:text-orange-300"
              >
                <span>🔫</span>
                {t("nav_weapons", lang)}
              </a>
              <a
                href="#pac"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-white/70 hover:bg-white/5 hover:text-orange-300"
              >
                <span>📡</span>
                {t("nav_pac", lang)}
              </a>
            </nav>
            <div className="mt-8">
              <a
                href="#generator"
                onClick={() => setIsOpen(false)}
                className="btn-primary flex items-center justify-center rounded-xl px-4 py-3 text-sm"
              >
                {t("nav_cta", lang)}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
