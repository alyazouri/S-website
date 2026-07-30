"use client";

import { useState, useEffect, useCallback } from "react";
import { useLang } from "./LanguageContext";

interface RatingData {
  id: number;
  rating: number;
  comment: string | null;
}

export function RatingSection() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saved, setSaved] = useState<RatingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [stats, setStats] = useState<{ averageRating: string; totalRatings: number } | null>(null);

  useEffect(() => {
    // Generate or retrieve session ID
    let sid = localStorage.getItem("alyazouri_session");
    if (!sid) {
      sid = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem("alyazouri_session", sid);
    }
    setSessionId(sid);

    // Fetch existing rating
    fetch(`/api/ratings?sessionId=${sid}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.rating) {
          setSaved(data.rating);
          setRating(data.rating.rating);
          setComment(data.rating.comment || "");
          setSubmitted(true);
        }
      })
      .catch(console.error);

    // Fetch stats
    fetch("/api/ratings?stats=true")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (rating === 0 || !sessionId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, rating, comment }),
      });
      const data = await res.json();
      if (data.rating) {
        setSaved(data.rating);
        setSubmitted(true);
        // Refresh stats
        fetch("/api/ratings?stats=true")
          .then((r) => r.json())
          .then(setStats)
          .catch(console.error);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    } finally {
      setLoading(false);
    }
  }, [rating, comment, sessionId]);

  const stars = [1, 2, 3, 4, 5];
  const activeRating = hoverRating || rating;

  return (
    <div className="card neon-box rounded-2xl p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💬</span>
          <h3 className="font-display text-lg font-bold text-white">
            {isAr ? "قيّم تجربتك" : "Rate Your Experience"}
          </h3>
        </div>
        {stats && (
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>⭐ {stats.averageRating}</span>
            <span>({stats.totalRatings})</span>
          </div>
        )}
      </div>

      {submitted && saved ? (
        <div className="text-center py-4">
          <div className="text-4xl mb-3">🎉</div>
          <div className="text-lg font-bold text-white mb-1">
            {isAr ? "شكراً لتقييمك!" : "Thanks for your rating!"}
          </div>
          <div className="flex justify-center gap-1 mb-3">
            {stars.map((s) => (
              <span key={s} className={`text-2xl ${s <= saved.rating ? "opacity-100" : "opacity-20"}`}>
                ⭐
              </span>
            ))}
          </div>
          {saved.comment && (
            <div className="rounded-xl border border-white/5 bg-black/30 p-3 text-sm text-white/70 max-w-sm mx-auto">
              &ldquo;{saved.comment}&rdquo;
            </div>
          )}
          <button
            onClick={() => {
              setSubmitted(false);
              setSaved(null);
            }}
            className="mt-4 text-xs text-orange-300 hover:text-orange-200"
          >
            {isAr ? "تعديل التقييم" : "Edit rating"}
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center gap-2 mb-4">
            {stars.map((s) => (
              <button
                key={s}
                onMouseEnter={() => setHoverRating(s)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(s)}
                className={`text-3xl transition-transform hover:scale-125 ${
                  s <= activeRating ? "opacity-100 scale-110" : "opacity-30"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
          <div className="text-center text-xs text-white/50 mb-4">
            {activeRating === 1 && (isAr ? "ضعيف" : "Poor")}
            {activeRating === 2 && (isAr ? "مقبول" : "Fair")}
            {activeRating === 3 && (isAr ? "جيد" : "Good")}
            {activeRating === 4 && (isAr ? "ممتاز" : "Excellent")}
            {activeRating === 5 && (isAr ? "🏆 أسطوري!" : "🏆 Legendary!")}
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={isAr ? "اكتب تعليقك هنا... (اختياري)" : "Write your comment... (optional)"}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-white placeholder-white/30 resize-none h-20 focus:border-orange-400/50 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || loading}
            className="btn-primary mt-3 w-full rounded-xl px-5 py-3 text-sm disabled:opacity-40"
          >
            {loading ? (isAr ? "جاري الإرسال..." : "Submitting...") : isAr ? "إرسال التقييم" : "Submit Rating"}
          </button>
        </>
      )}
    </div>
  );
}
