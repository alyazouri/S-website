"use client";

import { useEffect, useMemo, useState } from "react";
import { BRANDS, WEAPONS, STYLES, FINGERS } from "@/lib/data";
import { computeSensitivity, type Sens, type SensParams, type GyroMode } from "@/lib/sensitivity";
import { Particles } from "@/components/Particles";
import { Hero } from "@/components/Hero";
import { StatusBar } from "@/components/StatusBar";
import { SectionHeader } from "@/components/SectionHeader";
import { SensitivityTable } from "@/components/SensitivityTable";
import { FactorsPanel } from "@/components/FactorsPanel";
import { CopyButton } from "@/components/CopyButton";
import { ShareButton } from "@/components/ShareButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { QuickSearch } from "@/components/QuickSearch";
import { NightModeToggle } from "@/components/NightModeToggle";
import { PingMonitor } from "@/components/PingMonitor";
import { PacSection } from "@/components/PacSection";
import { RatingSection } from "@/components/RatingSection";
import { HudPreview } from "@/components/HudPreview";
import { SavedProfiles } from "@/components/SavedProfiles";
import { TouchTest } from "@/components/TouchTest";
import { DPICalculator } from "@/components/DPICalculator";
import { AIPredictions } from "@/components/AIPredictions";
import { useLang } from "@/components/LanguageContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { MobileMenu } from "@/components/MobileMenu";
import { t } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  const [brandId, setBrandId] = useState(BRANDS[0].id);
  const [deviceIdx, setDeviceIdx] = useState(0);
  const [fingers, setFingers] = useState(4);
  const [styleId, setStyleId] = useState("headshot");
  const [weaponCatId, setWeaponCatId] = useState(WEAPONS[0].id);
  const [weaponIdx, setWeaponIdx] = useState(0);
  const [gyroMode, setGyroMode] = useState<GyroMode>("always");
  const [heroPing, setHeroPing] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setHeroPing(35 + Math.round(Math.random() * 8)), 800);
    return () => clearTimeout(timer);
  }, []);

  const brand = BRANDS.find((b) => b.id === brandId)!;
  const device = brand.devices[deviceIdx] ?? brand.devices[0];
  const weaponCat = WEAPONS.find((c) => c.id === weaponCatId)!;
  const weapon = weaponCat.weapons[weaponIdx] ?? weaponCat.weapons[0];

  useEffect(() => setDeviceIdx(0), [brandId]);
  useEffect(() => setWeaponIdx(0), [weaponCatId]);

  const params: SensParams = useMemo(
    () => ({
      deviceId: `${brandId}-${deviceIdx}`,
      device,
      brandId,
      fingers,
      styleId,
      gyroMode,
      weaponId: `${weaponCatId}-${weaponIdx}`,
      weaponName: weapon.name,
      weaponRecoil: weapon.recoil,
      weaponRange: weapon.range,
      weaponType: weapon.type,
    }),
    [brandId, deviceIdx, device, fingers, styleId, gyroMode, weaponCatId, weaponIdx, weapon]
  );

  const sens: Sens = useMemo(() => computeSensitivity(params), [params]);

  return (
    <div className="relative min-h-screen bg-[#05070c] text-white">
      <Particles />
      <ScrollToTop />

      {/* Fixed Navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/5 bg-[#05070c]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
              <span className="font-display text-lg font-black text-white">A</span>
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#05070c]" />
            </div>
            <div>
              <div className="font-display text-sm font-black tracking-widest text-white">ALYAZOURI</div>
              <div className="text-[10px] text-white/50">Jordan Optimizer · 2026</div>
            </div>
          </a>
          <div className="hidden items-center gap-1 text-sm md:flex">
            <a href="#generator" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_generator", lang)}
            </a>
            <a href="#ping" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_ping", lang)}
            </a>
            <a href="#weapons" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_weapons", lang)}
            </a>
            <a href="#pac" className="rounded-lg px-3 py-1.5 text-white/70 hover:bg-white/5 hover:text-orange-300">
              {t("nav_pac", lang)}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <QuickSearch
              onSelectDevice={(bId, dIdx) => {
                setBrandId(bId);
                setTimeout(() => setDeviceIdx(dIdx), 0);
              }}
              onSelectWeapon={(cId, wIdx) => {
                setWeaponCatId(cId);
                setTimeout(() => setWeaponIdx(wIdx), 0);
              }}
            />
            <NightModeToggle />
            <LanguageSwitcher />
            <a href="#generator" className="btn-primary hidden rounded-lg px-4 py-2 text-xs sm:inline-block">
              {t("nav_cta", lang)}
            </a>
            <MobileMenu />
          </div>
        </div>
      </nav>

      <StatusBar />

      <div className="pt-24">
        <Hero ping={heroPing} />
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 pb-24">
        {/* Generator */}
        <section id="generator" className="mt-12 scroll-mt-32">
          <SectionHeader
            eyebrow={t("sec_generator_eyebrow", lang)}
            title={t("sec_generator_title", lang)}
            subtitle={t("sec_generator_sub", lang)}
          />

          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            {/* Controls */}
            <div className="space-y-5">
              {/* Device */}
              <div className="card rounded-2xl p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <h3 className="font-display text-sm font-bold tracking-widest text-white">
                    {t("device_select", lang)}
                  </h3>
                </div>
                <div className="mb-3 flex flex-wrap gap-2">
                  {BRANDS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBrandId(b.id)}
                      className={`chip rounded-full px-3 py-1.5 text-xs font-semibold ${brandId === b.id ? "active" : ""}`}
                    >
                      <span className="ml-1">{b.icon}</span>
                      {b.name}
                    </button>
                  ))}
                </div>
                <div className="grid max-h-40 grid-cols-1 gap-1.5 overflow-y-auto sm:grid-cols-2">
                  {brand.devices.map((d, i) => (
                    <button
                      key={d.name}
                      onClick={() => setDeviceIdx(i)}
                      className={`chip flex flex-col items-start gap-0.5 rounded-lg px-3 py-2 text-right text-xs ${deviceIdx === i ? "active" : ""}`}
                    >
                      <span className="font-semibold">{d.name}</span>
                      <span className="text-[10px] text-white/40">
                        {d.fps} FPS · {d.touchRate}Hz · {d.screenSize}&quot;
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-lg border border-white/5 bg-black/30 p-3 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-white/50">{t("device_selected", lang)}</span>
                      <b className="text-orange-300">{device.name}</b>
                    </div>
                    <div className="flex gap-2 text-[10px] text-white/60">
                      <span className="rounded bg-black/40 px-2 py-0.5 font-display">{device.fps} FPS</span>
                      <span className="rounded bg-black/40 px-2 py-0.5 font-display">{device.touchRate} Hz</span>
                      <span className="rounded bg-black/40 px-2 py-0.5 font-display">{device.screenSize}&quot;</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gyro Mode */}
              <div className="card rounded-2xl p-5">
                <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">
                  {t("gyro_title", lang)}
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {(["off", "scope", "always"] as GyroMode[]).map((mode) => {
                    const labels = {
                      off: { main: t("gyro_off", lang), sub: t("gyro_off_desc", lang) },
                      scope: { main: t("gyro_scope", lang), sub: t("gyro_scope_desc", lang) },
                      always: { main: t("gyro_always", lang), sub: t("gyro_always_desc", lang) },
                    };
                    return (
                      <button
                        key={mode}
                        onClick={() => setGyroMode(mode)}
                        className={`chip flex flex-col items-center gap-1 rounded-xl px-3 py-3 text-xs ${gyroMode === mode ? "active" : ""}`}
                      >
                        <div className="text-base">{mode === "off" ? "⭕" : mode === "scope" ? "🎯" : "🔄"}</div>
                        <div className="font-semibold">{labels[mode].main}</div>
                        <div className="text-[10px] text-white/50">{labels[mode].sub}</div>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 rounded-lg border border-white/5 bg-black/30 p-2 text-xs text-white/60">
                  {gyroMode === "off" && t("gyro_msg_off", lang)}
                  {gyroMode === "scope" && t("gyro_msg_scope", lang)}
                  {gyroMode === "always" && t("gyro_msg_always", lang)}
                </div>
              </div>

              {/* Fingers + Style */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="card rounded-2xl p-5">
                  <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">
                    {t("fingers_title", lang)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {FINGERS.map((f) => (
                      <button
                        key={f}
                        onClick={() => setFingers(f)}
                        className={`chip flex-1 rounded-lg px-3 py-2 text-sm font-bold ${fingers === f ? "active" : ""}`}
                      >
                        {f} {t("fingers_suffix", lang)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="card rounded-2xl p-5">
                  <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">
                    {t("style_title", lang)}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {STYLES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setStyleId(s.id)}
                        className={`chip rounded-lg px-2 py-2 text-xs font-semibold ${styleId === s.id ? "active" : ""}`}
                      >
                        <div className="text-base">{s.icon}</div>
                        {t(`style_${s.id}` as keyof typeof import("@/lib/i18n").translations, lang)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weapon */}
              <div className="card rounded-2xl p-5" id="weapons">
                <h3 className="mb-3 font-display text-sm font-bold tracking-widest text-white">
                  {t("weapon_title", lang)}
                </h3>
                <div className="mb-3 flex flex-wrap gap-2">
                  {WEAPONS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setWeaponCatId(c.id)}
                      className={`chip rounded-full px-3 py-1.5 text-xs font-semibold ${weaponCatId === c.id ? "active" : ""}`}
                    >
                      <span className="ml-1">{c.icon}</span>
                      {c.name}
                    </button>
                  ))}
                </div>
                <div className="grid max-h-40 grid-cols-2 gap-1.5 overflow-y-auto sm:grid-cols-3">
                  {weaponCat.weapons.map((w, i) => (
                    <button
                      key={w.name}
                      onClick={() => setWeaponIdx(i)}
                      className={`chip rounded-lg px-3 py-2 text-right text-xs font-semibold ${weaponIdx === i ? "active" : ""}`}
                    >
                      {w.name}
                    </button>
                  ))}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-white/5 bg-black/30 p-2.5">
                    <div className="text-white/40">{t("weapon_recoil", lang)}</div>
                    <div className="stat-bar mt-1.5 h-1.5">
                      <span style={{ width: `${weapon.recoil}%` }} />
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-black/30 p-2.5">
                    <div className="text-white/40">{t("weapon_range", lang)}</div>
                    <div className="stat-bar mt-1.5 h-1.5">
                      <span style={{ width: `${weapon.range}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <CopyButton sens={sens} lang={lang} />
              <ShareButton sens={sens} deviceName={device.name} weaponName={weapon.name} />

              {/* Saved Profiles */}
              <SavedProfiles
                currentSens={sens}
                currentParams={params}
                onLoadProfile={(profile) => {
                  const brandIdx = BRANDS.findIndex((b) => b.id === profile.deviceName.split(" ")[0].toLowerCase());
                  if (brandIdx >= 0) setBrandId(BRANDS[brandIdx].id);
                  setFingers(profile.fingers);
                  setStyleId(profile.styleId);
                  const weaponCatIdx = WEAPONS.findIndex((w) =>
                    w.weapons.some((wp) => wp.name === profile.weaponName)
                  );
                  if (weaponCatIdx >= 0) {
                    setWeaponCatId(WEAPONS[weaponCatIdx].id);
                    setTimeout(() => {
                      const wpIdx = WEAPONS[weaponCatIdx].weapons.findIndex((w) => w.name === profile.weaponName);
                      if (wpIdx >= 0) setWeaponIdx(wpIdx);
                    }, 0);
                  }
                }}
              />
            </div>

            {/* Output */}
            <div className="space-y-5">
              {/* AI Score */}
              <div className="card relative overflow-hidden rounded-2xl p-5">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="font-display text-[11px] tracking-[0.3em] text-orange-400">
                      {t("ai_score_label", lang)}
                    </div>
                    <div className="mt-1 text-xl font-bold text-white">{t("ai_score_title", lang)}</div>
                    <div className="mt-1 text-xs text-white/50">
                      {device.name} · {weapon.name} · {fingers} {t("ai_suffix", lang)}
                    </div>
                  </div>
                  <div className="relative h-28 w-28">
                    <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                      <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                      <circle
                        cx="50" cy="50" r="42"
                        stroke="url(#grad)" strokeWidth="8" fill="none"
                        strokeLinecap="round"
                        strokeDasharray={`${(sens.aiScore / 100) * 264} 264`}
                      />
                      <defs>
                        <linearGradient id="grad" x1="0" x2="1">
                          <stop offset="0%" stopColor="#ff7a00" />
                          <stop offset="100%" stopColor="#ffd166" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="font-display text-3xl font-black text-white tabular-nums">{sens.aiScore}</div>
                      <div className="text-[9px] uppercase tracking-widest text-white/50">AI SCORE</div>
                    </div>
                  </div>
                </div>
              </div>

              <FactorsPanel sens={sens} />

              {/* Sensitivity tables */}
              <div className="grid gap-4 sm:grid-cols-2">
                <SensitivityTable label={t("sens_camera", lang)} data={sens.cam} color="orange" />
                <SensitivityTable label={t("sens_ads", lang)} data={sens.ads} color="orange" />
                {gyroMode === "off" ? (
                  <div className="card flex flex-col items-center justify-center rounded-2xl p-8 text-center sm:col-span-2">
                    <div className="text-4xl">⭕</div>
                    <div className="mt-2 font-display text-sm font-bold text-white">{t("gyro_disabled_title", lang)}</div>
                    <div className="mt-1 text-xs text-white/50">{t("gyro_disabled_msg", lang)}</div>
                  </div>
                ) : (
                  <>
                    <SensitivityTable label={t("sens_gyro_cam", lang)} data={sens.gyroCam} color="sky" showTppFpp={gyroMode === "always"} />
                    <SensitivityTable label={t("sens_gyro_ads", lang)} data={sens.gyroAds} color="sky" showTppFpp={gyroMode === "always"} />
                  </>
                )}
              </div>

              {/* Free Look */}
              <div className="card rounded-2xl p-5">
                <h4 className="mb-3 font-display text-sm font-bold tracking-widest text-white/90">
                  {t("sens_freelook", lang)}
                </h4>
                <div className="grid grid-cols-3 gap-3 text-center">
                  {Object.entries(sens.freeLook).map(([k, v]) => {
                    const labelKey = k === "cam" ? "sens_freelook_cam" : k === "parashoot" ? "sens_freelook_para" : "sens_freelook_vehicle";
                    return (
                      <div key={k} className="rounded-xl border border-white/5 bg-black/30 p-3">
                        <div className="text-[10px] uppercase tracking-widest text-white/40">
                          {t(labelKey as keyof typeof import("@/lib/i18n").translations, lang)}
                        </div>
                        <div className="mt-1 font-display text-2xl font-black text-orange-300 tabular-nums">{v}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Predictions */}
              <AIPredictions deviceName={device.name} fingers={fingers} styleId={styleId} weaponName={weapon.name} />

              {/* Stability Analysis */}
              <div className="card rounded-2xl p-5">
                <h4 className="mb-3 font-display text-sm font-bold tracking-widest text-white/90">
                  {t("stability_title", lang)}
                </h4>
                <div className="space-y-3">
                  {[
                    { label: t("stability_device", lang), value: (sens.factors.deviceFactor * 100).toFixed(0), color: "from-orange-500 to-red-500" },
                    { label: t("stability_weapon", lang), value: (sens.factors.weaponFactor * 100).toFixed(0), color: "from-amber-500 to-orange-500" },
                    { label: t("stability_fingers", lang), value: (sens.factors.fingerFactor * 100).toFixed(0), color: "from-emerald-500 to-teal-500" },
                    { label: t("stability_style", lang), value: (sens.factors.styleFactor * 100).toFixed(0), color: "from-sky-500 to-indigo-500" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-24 text-xs text-white/60">{item.label}</div>
                      <div className="flex-1">
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div className={`h-full rounded-full bg-gradient-to-r ${item.color}`} style={{ width: `${Math.min(100, Number(item.value))}%` }} />
                        </div>
                      </div>
                      <div className="w-12 text-right font-display text-sm font-bold text-white tabular-nums">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="mt-16">
          <SectionHeader
            eyebrow="ADVANCED TOOLS"
            title={lang === "ar" ? "🛠️ أدوات متقدمة" : "🛠️ Advanced Tools"}
            subtitle={lang === "ar" ? "أدوات إضافية لتحسين أدائك في اللعبة" : "Additional tools to improve your gameplay"}
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TouchTest />
            <DPICalculator />
            <HudPreview fingers={fingers} style={styleId} />
          </div>
        </section>

        {/* Ping Monitor */}
        <section id="ping" className="mt-16 scroll-mt-32">
          <PingMonitor />
        </section>

        {/* DNS Live Status Banner */}
        <section className="mt-16">
          <a
            href="/dns"
            className="group card neon-box block overflow-hidden rounded-2xl p-6 transition-all hover:border-orange-400/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-2xl shadow-lg shadow-orange-500/30">
                  📡
                </div>
                <div>
                  <div className="font-display text-xs tracking-[0.3em] text-orange-400">DNS LIVE STATUS</div>
                  <div className="text-lg font-bold text-white">{lang === "ar" ? "فحص DNS حي لكل سيرفرات الأردن" : "Live DNS Check for All Jordan Servers"}</div>
                  <div className="text-xs text-white/50">{lang === "ar" ? "فحص فعلي لـ 100+ سيرفر DNS — هل تعمل؟ هل تنفع لإنترنتك؟" : "Real check of 100+ DNS servers — are they working for you?"}</div>
                </div>
              </div>
              <div className="btn-primary rounded-xl px-6 py-3 text-sm group-hover:translate-x-1 transition-transform">
                {lang === "ar" ? "🔍 افحص الآن" : "🔍 Check Now"} →
              </div>
            </div>
          </a>
        </section>

        {/* PAC Section */}
        <section id="pac" className="mt-16 scroll-mt-32">
          <PacSection />
        </section>

        {/* Rating Section */}
        <section className="mt-16">
          <div className="mx-auto max-w-xl">
            <RatingSection />
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/5 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg">
                <span className="font-display text-sm font-black text-white">A</span>
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">ALYAZOURI</div>
                <div className="text-[10px]">Jordan Optimizer · 2026</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-xs">
              <a href="https://tiktok.com/@saeedalyazouri0" target="_blank" rel="noreferrer" className="hover:text-orange-300">
                TikTok
              </a>
              <a href="https://instagram.com/saeedjor11" target="_blank" rel="noreferrer" className="hover:text-orange-300">
                Instagram
              </a>
              <span>PUBG ID: 5744469523</span>
            </div>
            <div className="text-xs">
              Made with ❤️ in 🇯🇴 Jordan
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
