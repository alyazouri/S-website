"use client";

import { useLang } from "./LanguageContext";

interface AIPredictionsProps {
  deviceName: string;
  fingers: number;
  styleId: string;
  weaponName: string;
}

export function AIPredictions({ deviceName, fingers, styleId, weaponName }: AIPredictionsProps) {
  const { lang } = useLang();
  const isAr = lang === "ar";

  const tips: { icon: string; text: string; priority: "high" | "medium" | "low" }[] = [];

  // Device-based tips
  if (deviceName.includes("iPad") || deviceName.includes("Tab")) {
    tips.push({
      icon: "📱",
      text: isAr ? "شاشتك كبيرة — استفد من الأصابع الإضافية لتحكم أدق" : "Large screen detected — use more fingers for better control",
      priority: "medium",
    });
  }

  if (deviceName.includes("ROG") || deviceName.includes("RedMagic") || deviceName.includes("Legion")) {
    tips.push({
      icon: "🎮",
      text: isAr ? "جهازك للألعاب — استفد من معدل اللمس العالي بحساسية منخفضة" : "Gaming device — leverage high touch rate with lower sensitivity",
      priority: "high",
    });
  }

  // Finger-based
  if (fingers <= 2) {
    tips.push({
      icon: "🖐️",
      text: isAr ? "ننصحك بالانتقال لـ 3-4 أصابع لتحسين الأداء بشكل كبير" : "Consider upgrading to 3-4 fingers for major improvement",
      priority: "high",
    });
  }
  if (fingers >= 5) {
    tips.push({
      icon: "⚡",
      text: isAr ? "أنت لاعب محترف! ركّز على ضبط Peek و Scope لأقصى سرعة" : "Pro player! Focus on peek & scope for maximum speed",
      priority: "medium",
    });
  }

  // Style-based
  if (styleId === "headshot") {
    tips.push({
      icon: "🎯",
      text: isAr ? "لأسلوب الهيدشوت: فعّل الجايرو Always On وتدرّب على السحب للأسفل" : "For headshot style: enable Always On gyro and practice pull-down",
      priority: "high",
    });
  }
  if (styleId === "spray") {
    tips.push({
      icon: "🔫",
      text: isAr ? "لأسلوب السبراي: تدرّب على التحكم بالارتداد الأفقي مع الجايرو" : "For spray: practice horizontal recoil with gyro control",
      priority: "medium",
    });
  }
  if (styleId === "conqueror") {
    tips.push({
      icon: "👑",
      text: isAr ? "لوصول الكونكر: اثبت على هذه الحساسية أسبوعين كاملين قبل التغيير" : "For Conqueror: stick with this sensitivity for 2 weeks before changing",
      priority: "high",
    });
  }
  if (styleId === "close") {
    tips.push({
      icon: "⚡",
      text: isAr ? "للقتال القريب: TPP/FPP عالية ضرورية — تدرّب على لفة 180° سريعة" : "For CQC: high TPP/FPP is essential — practice fast 180° turns",
      priority: "medium",
    });
  }

  // Weapon-based
  if (weaponName === "AKM" || weaponName === "M762") {
    tips.push({
      icon: "💪",
      text: isAr ? `${weaponName} ارتداده قوي — فعّل الجايرو على السكوب وتدرّب على السحب` : `${weaponName} has high recoil — enable scope gyro and practice pull-down`,
      priority: "high",
    });
  }
  if (weaponName === "AWM" || weaponName === "Kar98k" || weaponName === "M24") {
    tips.push({
      icon: "🎯",
      text: isAr ? `${weaponName}: خفّض حساسية السكوب العالي (6x-8x) للدقة القاتلة` : `${weaponName}: lower high scope sensitivity (6x-8x) for deadly accuracy`,
      priority: "high",
    });
  }
  if (weaponName === "M416" || weaponName === "SCAR-L") {
    tips.push({
      icon: "✅",
      text: isAr ? `${weaponName} سلاح متوازن — مثالي للتدريب وضبط الإعدادات` : `${weaponName} is balanced — perfect for training and tuning settings`,
      priority: "low",
    });
  }

  // Always add general tips
  tips.push({
    icon: "💡",
    text: isAr ? "تدرّب 15 دقيقة يومياً في Training Mode قبل اللعب" : "Practice 15 minutes daily in Training Mode before playing",
    priority: "low",
  });

  // Sort by priority and take top 4
  const sortedTips = tips
    .sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    })
    .slice(0, 4);

  return (
    <div className="card neon-box rounded-2xl p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-xl">🤖</span>
        <h3 className="font-display text-sm font-bold tracking-widest text-white">
          {isAr ? "توصيات الذكاء الاصطناعي" : "AI Recommendations"}
        </h3>
      </div>

      <div className="space-y-2">
        {sortedTips.map((tip, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 rounded-xl border p-3 transition-all ${
              tip.priority === "high"
                ? "border-orange-400/30 bg-gradient-to-br from-orange-500/10 to-red-500/5"
                : tip.priority === "medium"
                ? "border-amber-400/20 bg-amber-500/5"
                : "border-white/5 bg-white/[0.02]"
            }`}
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/10 text-lg">
              {tip.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white/80">{tip.text}</p>
              {tip.priority === "high" && (
                <span className="mt-1 inline-block rounded-full bg-orange-500/20 px-2 py-0.5 text-[9px] font-bold text-orange-300">
                  {isAr ? "مهم جداً" : "HIGH PRIORITY"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <div className="text-xs text-emerald-300/80">
            {isAr
              ? "هذه التوصيات مخصصة لإعداداتك الحالية — جرّبها وشاركنا النتائج!"
              : "These recommendations are tailored to your current setup — try them and share your results!"}
          </div>
        </div>
      </div>
    </div>
  );
}
