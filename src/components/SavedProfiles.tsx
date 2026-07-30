"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "./LanguageContext";
import type { Sens, SensParams } from "@/lib/sensitivity";

interface Profile {
  id: number;
  name: string;
  deviceName: string;
  weaponName: string;
  fingers: number;
  styleId: string;
  aiScore: number;
  createdAt: string;
}

interface SavedProfilesProps {
  currentSens: Sens;
  currentParams: SensParams;
  onLoadProfile: (profile: Profile) => void;
}

export function SavedProfiles({ currentSens, currentParams, onLoadProfile }: SavedProfilesProps) {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    let sid = localStorage.getItem("alyazouri_session");
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("alyazouri_session", sid);
    }
    setSessionId(sid);

    // Fetch profiles
    fetch(`/api/profiles?sessionId=${sid}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.profiles) {
          setProfiles(data.profiles);
        }
      })
      .catch(console.error);
  }, []);

  const handleSave = useCallback(async () => {
    if (!sessionId) return;
    setSaving(true);

    const name = `${currentParams.device.name} · ${currentParams.weaponName} · ${currentParams.fingers}f`;

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          name,
          deviceBrand: currentParams.brandId,
          deviceName: currentParams.device.name,
          weaponCategory: currentParams.weaponId.split("-")[0],
          weaponName: currentParams.weaponName,
          fingers: currentParams.fingers,
          styleId: currentParams.styleId,
          gyroMode: currentParams.gyroMode,
          sensitivityData: currentSens,
          aiScore: currentSens.aiScore,
        }),
      });
      const data = await res.json();
      if (data.profile) {
        setProfiles((prev) => [data.profile, ...prev].slice(0, 5));
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  }, [sessionId, currentParams, currentSens]);

  const handleDelete = useCallback(
    async (id: number) => {
      if (!sessionId) return;
      setLoading(true);

      try {
        await fetch(`/api/profiles?id=${id}&sessionId=${sessionId}`, {
          method: "DELETE",
        });
        setProfiles((prev) => prev.filter((p) => p.id !== id));
      } catch (error) {
        console.error("Error deleting profile:", error);
      } finally {
        setLoading(false);
      }
    },
    [sessionId]
  );

  return (
    <div className="card rounded-2xl p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">💾</span>
          <h3 className="font-display text-sm font-bold tracking-widest text-white">
            {isAr ? "الملفات المحفوظة" : "Saved Profiles"}
          </h3>
        </div>
        <span className="text-xs text-white/50">{profiles.length}/5</span>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="btn-ghost mb-4 w-full rounded-xl px-5 py-3 text-sm disabled:opacity-50"
      >
        {saving ? (isAr ? "جاري الحفظ..." : "Saving...") : isAr ? "💾 حفظ هذا التشكيل" : "💾 Save This Build"}
      </button>

      {profiles.length === 0 ? (
        <div className="rounded-xl border border-white/5 bg-black/30 p-6 text-center">
          <div className="text-3xl mb-2">📁</div>
          <div className="text-sm text-white/50">
            {isAr ? "لا توجد ملفات محفوظة بعد" : "No saved profiles yet"}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="group flex items-center gap-3 rounded-xl border border-white/5 bg-black/30 p-3 transition-all hover:border-orange-400/30"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/10">
                <span className="font-display text-sm font-bold text-orange-300">{profile.aiScore}</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-semibold text-white">{profile.name}</div>
                <div className="text-[10px] text-white/50">
                  {new Date(profile.createdAt).toLocaleDateString(lang === "ar" ? "ar-JO" : "en-US")}
                </div>
              </div>
              <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={() => onLoadProfile(profile)}
                  className="rounded-lg bg-orange-500/20 px-2 py-1 text-[10px] font-bold text-orange-300 hover:bg-orange-500/30"
                >
                  {isAr ? "تحميل" : "Load"}
                </button>
                <button
                  onClick={() => handleDelete(profile.id)}
                  disabled={loading}
                  className="rounded-lg bg-red-500/20 px-2 py-1 text-[10px] font-bold text-red-300 hover:bg-red-500/30"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
