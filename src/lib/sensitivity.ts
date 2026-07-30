import { getWeaponProfile } from "./weaponProfiles";

// PUBG Mobile Sensitivity Object — matches in-game layout exactly
type SensObj = {
  tpp: number;     // TPP No Scope (180° for CQC)
  fpp: number;     // FPP No Scope (180° for CQC)
  red: number;     // Red Dot / Holographic
  scope2: number;  // 2x Scope
  scope3: number;  // 3x Scope
  scope4: number;  // 4x Scope
  scope6: number;  // 6x Scope
  scope8: number;  // 8x Scope
};

// PUBG Mobile ranges
const SENS_MAX = 300;    // Regular sensitivity: 1% - 300%
const GYRO_MAX = 400;    // Gyroscope sensitivity: 1% - 400%
const SENS_MIN = 1;

export type Sens = {
  cam: SensObj;
  ads: SensObj;
  gyroCam: SensObj;
  gyroAds: SensObj;
  freeLook: { cam: number; parashoot: number; vehicle: number };
  aiScore: number;
  factors: {
    fps: number;
    touchRate: number;
    screenSize: number;
    gyroQuality: string;
    deviceFactor: number;
    fingerFactor: number;
    styleFactor: number;
    weaponFactor: number;
  };
};

export type GyroMode = "off" | "scope" | "always";

export type SensParams = {
  deviceId: string;
  device: {
    name: string;
    fps: number;
    touchRate: number;
    screenSize: number;
    resolution: string;
    gyroQuality: "excellent" | "good" | "average";
  };
  brandId: string;
  fingers: number;
  styleId: string;
  gyroMode: GyroMode;
  weaponId: string;
  weaponName: string;
  weaponRecoil: number;
  weaponRange: number;
  weaponType: string;
};

const clamp = (n: number, min = SENS_MIN, max = SENS_MAX) => Math.max(min, Math.min(max, Math.round(n)));
const clampGyro = (n: number) => Math.max(SENS_MIN, Math.min(GYRO_MAX, Math.round(n)));

export function computeSensitivity(p: SensParams): Sens {
  // ════════════════════════════════════════════════════════════
  //  المعادلة النهائية — بروفايل حقيقي لكل سلاح
  //  مرجع: iPad Pro 11" · 120FPS · 240Hz · 4 أصابع · Gyro Always On
  //  ثم تعديل حسب: جهاز + أصابع + أسلوب + جايرو
  // ════════════════════════════════════════════════════════════

  // ──── 1) جلب بروفايل السلاح المرجعي ────
  const wp = getWeaponProfile(p.weaponName, p.weaponRecoil, p.weaponRange, p.weaponType);
  // wp.cam/ads/gyro/gyroAds = [TPP, FPP, Red, 2x, 3x, 4x, 6x, 8x]
  // هذه القيم مضبوطة لـ iPad Pro 11" · 120FPS · 240Hz · 4 أصابع

  // ──── 2) عامل الجهاز ────
  // المرجع: iPad Pro 11" → 120 FPS, 240Hz, 11.0", excellent
  const refFps = 120, refTouch = 240, refScreen = 11.0;
  const fps = p.device.fps;
  const touch = p.device.touchRate;
  const screen = p.device.screenSize;
  const gyroQ = p.device.gyroQuality;

  // FPS أقل → حساسية أعلى (تعويض)، FPS أعلى → حساسية أقل (أدق)
  const fpsMul = refFps / fps; // 120/60=2.0, 120/120=1.0, 120/165=0.73
  const fpsFactor = 0.65 + fpsMul * 0.35; // normalize: 0.90..1.35

  // Touch rate أقل → حساسية أعلى
  const touchMul = refTouch / touch;
  const touchFactor = 0.80 + touchMul * 0.20; // 0.85..1.20

  // شاشة أصغر → حساسية أقل (مسافة سحب أقل)
  // شاشة أكبر → حساسية أعلى (مسافة سحب أطول)
  const screenFactor = screen / refScreen; // 6.5/11=0.59, 11/11=1.0, 13/11=1.18

  // الجايرو
  const gyroQualityMul = gyroQ === "excellent" ? 1.0 : gyroQ === "good" ? 0.92 : 0.80;

  // عامل الجهاز الكلي لللمس (Camera + ADS)
  const deviceMul = fpsFactor * touchFactor * screenFactor;

  // عامل الجهاز للجايرو (يتأثر بجودة الجايرو أيضاً)
  const deviceGyroMul = deviceMul * gyroQualityMul;

  // ──── 3) عامل الأصابع ────
  // المرجع: 4 أصابع = 1.0
  // 2 أصابع → حساسية أعلى (عمل أكثر لكل إصبع)
  // 6 أصابع → حساسية أقل (أصابع مخصصة)
  const fingerMul: Record<number, number> = {
    2: 1.15, 3: 1.06, 4: 1.0, 5: 0.95, 6: 0.90,
  };
  const fMul = fingerMul[p.fingers] ?? 1.0;

  // ──── 4) عامل أسلوب اللعب ────
  // يؤثر على CQC (TPP/FPP) والسكوبات بشكل مختلف
  const styleCQC: Record<string, number> = {
    headshot: 0.96, spray: 1.05, competitive: 1.0,
    close: 1.12, reflex: 1.08, conqueror: 0.98,
  };
  const styleScope: Record<string, number> = {
    headshot: 0.94, spray: 1.04, competitive: 1.0,
    close: 1.06, reflex: 1.02, conqueror: 0.96,
  };
  const styleGyro: Record<string, number> = {
    headshot: 1.06, spray: 1.02, competitive: 1.0,
    close: 1.04, reflex: 1.03, conqueror: 0.98,
  };
  const sCQC = styleCQC[p.styleId] ?? 1.0;
  const sScope = styleScope[p.styleId] ?? 1.0;
  const sGyro = styleGyro[p.styleId] ?? 1.0;

  // ──── 5) عامل الجايرو لـ TPP/FPP ────
  // إذا الجايرو OFF أو Scope On → TPP/FPP أسرع (اللمس فقط للمواجهات)
  const gyroOffBoost = (p.gyroMode === "off" || p.gyroMode === "scope") ? 1.15 : 1.0;

  // ──── 6) عامل تتبع الأهداف المتحركة (Vehicle Tracking) ────
  // TPP/FPP + Red Dot + 2x تحتاج حساسية أعلى لتلحق الخصم بالسيارة
  // السكوبات العالية (4x-8x) لا تحتاج رفع (لا تستخدم ضد سيارات قريبة)
  const VEHICLE_TRACK_CQC = 1.18;   // +18% لـ TPP/FPP
  const VEHICLE_TRACK_RED = 1.14;   // +14% لـ Red Dot
  const VEHICLE_TRACK_2X = 1.10;    // +10% لـ 2x
  const VEHICLE_TRACK_3X = 1.05;    // +5% لـ 3x

  // ════════════════════════════════════════════════════════════
  //  تطبيق المعاملات على بروفايل السلاح
  // ════════════════════════════════════════════════════════════

  const cqcMul = deviceMul * fMul * sCQC * gyroOffBoost * VEHICLE_TRACK_CQC;
  const scopeMul = deviceMul * fMul * sScope;
  const gMul = deviceGyroMul * fMul * sGyro;

  // Camera — مع تتبع الأهداف المتحركة
  const cam: SensObj = {
    tpp:    clamp(wp.cam[0] * cqcMul),
    fpp:    clamp(wp.cam[1] * cqcMul),
    red:    clamp(wp.cam[2] * scopeMul * VEHICLE_TRACK_RED),
    scope2: clamp(wp.cam[3] * scopeMul * VEHICLE_TRACK_2X),
    scope3: clamp(wp.cam[4] * scopeMul * VEHICLE_TRACK_3X),
    scope4: clamp(wp.cam[5] * scopeMul),
    scope6: clamp(wp.cam[6] * scopeMul),
    scope8: clamp(wp.cam[7] * scopeMul),
  };

  // ADS — مع تتبع الأهداف المتحركة
  const ads: SensObj = {
    tpp:    clamp(wp.ads[0] * cqcMul),
    fpp:    clamp(wp.ads[1] * cqcMul),
    red:    clamp(wp.ads[2] * scopeMul * VEHICLE_TRACK_RED),
    scope2: clamp(wp.ads[3] * scopeMul * VEHICLE_TRACK_2X),
    scope3: clamp(wp.ads[4] * scopeMul * VEHICLE_TRACK_3X),
    scope4: clamp(wp.ads[5] * scopeMul),
    scope6: clamp(wp.ads[6] * scopeMul),
    scope8: clamp(wp.ads[7] * scopeMul),
  };

  // Gyroscope
  const useGyroAll = p.gyroMode === "always";
  const useGyroAny = p.gyroMode !== "off";

  // Gyro — تتبع محسّن للأهداف المتحركة (السيارات)
  const GYRO_TRACK_CQC = 1.15;  // +15% جايرو TPP/FPP لتتبع السيارات
  const GYRO_TRACK_RED = 1.12;  // +12% جايرو Red Dot
  const GYRO_TRACK_2X = 1.08;   // +8% جايرو 2x

  const gyroCam: SensObj = {
    tpp:    useGyroAll ? clampGyro(wp.gyro[0] * gMul * GYRO_TRACK_CQC) : 0,
    fpp:    useGyroAll ? clampGyro(wp.gyro[1] * gMul * GYRO_TRACK_CQC) : 0,
    red:    useGyroAll ? clampGyro(wp.gyro[2] * gMul * GYRO_TRACK_RED) : 0,
    scope2: useGyroAny ? clampGyro(wp.gyro[3] * gMul * GYRO_TRACK_2X) : 0,
    scope3: useGyroAny ? clampGyro(wp.gyro[4] * gMul) : 0,
    scope4: useGyroAny ? clampGyro(wp.gyro[5] * gMul) : 0,
    scope6: useGyroAny ? clampGyro(wp.gyro[6] * gMul) : 0,
    scope8: useGyroAny ? clampGyro(wp.gyro[7] * gMul) : 0,
  };

  const gyroAds: SensObj = {
    tpp:    useGyroAll ? clampGyro(wp.gyroAds[0] * gMul * GYRO_TRACK_CQC) : 0,
    fpp:    useGyroAll ? clampGyro(wp.gyroAds[1] * gMul * GYRO_TRACK_CQC) : 0,
    red:    useGyroAll ? clampGyro(wp.gyroAds[2] * gMul * GYRO_TRACK_RED) : 0,
    scope2: useGyroAny ? clampGyro(wp.gyroAds[3] * gMul * GYRO_TRACK_2X) : 0,
    scope3: useGyroAny ? clampGyro(wp.gyroAds[4] * gMul) : 0,
    scope4: useGyroAny ? clampGyro(wp.gyroAds[5] * gMul) : 0,
    scope6: useGyroAny ? clampGyro(wp.gyroAds[6] * gMul) : 0,
    scope8: useGyroAny ? clampGyro(wp.gyroAds[7] * gMul) : 0,
  };

  // Free Look
  const freeLook = {
    cam: clamp(115 * deviceMul * fMul, 60, 200),
    parashoot: clamp(85 * deviceMul * fMul, 50, 160),
    vehicle: clamp(130 * deviceMul * fMul, 80, 220),
  };

  // AI Score
  const fpsScore = fps >= 120 ? 20 : fps >= 90 ? 12 : 6;
  const touchScore = touch >= 480 ? 15 : touch >= 240 ? 10 : 5;
  const gyroScore = gyroQ === "excellent" ? 12 : gyroQ === "good" ? 8 : 4;
  const fingerScore = p.fingers >= 4 ? 12 : p.fingers >= 3 ? 8 : 4;
  const styleScore = p.styleId === "conqueror" ? 12 : p.styleId === "competitive" ? 10 : 6;
  const weaponScore = p.weaponRecoil <= 50 ? 10 : p.weaponRecoil <= 70 ? 7 : 4;
  const aiScore = Math.min(100, Math.max(30, 20 + fpsScore + touchScore + gyroScore + fingerScore + styleScore + weaponScore));

  return {
    cam, ads, gyroCam, gyroAds, freeLook, aiScore,
    factors: {
      fps, touchRate: touch, screenSize: screen, gyroQuality: gyroQ,
      deviceFactor: Math.round(deviceMul * 100) / 100,
      fingerFactor: Math.round(fMul * 100) / 100,
      styleFactor: Math.round(sCQC * 100) / 100,
      weaponFactor: Math.round((1 / (p.weaponRecoil / 72)) * 100) / 100,
    },
  };
}
