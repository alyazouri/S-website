"use client";

import { useState, useEffect, useCallback } from "react";
import { DNS_GROUPS, getTotalServers, type DnsGroup } from "@/lib/dns-servers";
import Link from "next/link";

interface DnsResult {
  ip: string;
  status: "online" | "offline" | "timeout" | "checking" | "pending";
  avgPing: number;
  minPing: number;
  maxPing: number;
  jitter: number;
  packetLoss: number;
  canResolve: boolean;
  resolveTime: number;
  pings: number[];
}

function emptyResult(ip: string, status: DnsResult["status"] = "pending"): DnsResult {
  return { ip, status, avgPing: 0, minPing: 0, maxPing: 0, jitter: 0, packetLoss: 0, canResolve: false, resolveTime: 0, pings: [] };
}

export default function DnsPage() {
  const [results, setResults] = useState<Record<string, DnsResult>>({});
  const [checking, setChecking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [copiedIp, setCopiedIp] = useState<string | null>(null);
  const totalServers = getTotalServers();

  const copyIp = async (ip: string) => {
    try {
      await navigator.clipboard.writeText(ip);
      setCopiedIp(ip);
      setTimeout(() => setCopiedIp(null), 2000);
    } catch { /* */ }
  };

  const checkBatch = useCallback(async (ips: string[]) => {
    try {
      const res = await fetch("/api/dns-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ips }),
      });
      const data = await res.json();
      if (data.results) {
        setResults((prev) => {
          const next = { ...prev };
          for (const r of data.results) next[r.ip] = r;
          return next;
        });
      }
    } catch {
      setResults((prev) => {
        const next = { ...prev };
        for (const ip of ips) next[ip] = emptyResult(ip, "offline");
        return next;
      });
    }
  }, []);

  const runFullCheck = useCallback(async () => {
    setChecking(true);
    setProgress(0);
    const allIps = DNS_GROUPS.flatMap((g) => g.servers.map((s) => s.ip));
    const initial: Record<string, DnsResult> = {};
    for (const ip of allIps) initial[ip] = emptyResult(ip, "checking");
    setResults(initial);

    const batchSize = 8;
    for (let i = 0; i < allIps.length; i += batchSize) {
      const batch = allIps.slice(i, i + batchSize);
      await checkBatch(batch);
      setProgress(Math.min(100, Math.round(((i + batchSize) / allIps.length) * 100)));
    }
    setChecking(false);
    setProgress(100);
  }, [checkBatch]);

  useEffect(() => { runFullCheck(); }, [runFullCheck]);

  // === Stats ===
  const allResults = Object.values(results).filter((r) => r.status !== "checking" && r.status !== "pending");
  const online = allResults.filter((r) => r.status === "online").length;
  const offline = allResults.filter((r) => r.status === "offline").length;
  const timeoutCount = allResults.filter((r) => r.status === "timeout").length;
  const resolving = allResults.filter((r) => r.canResolve).length;
  const onlineResults = allResults.filter((r) => r.status === "online" && r.avgPing > 0);
  const avgPing = onlineResults.length > 0 ? Math.round(onlineResults.reduce((s, r) => s + r.avgPing, 0) / onlineResults.length) : 0;
  const avgJitter = onlineResults.length > 0 ? Math.round(onlineResults.reduce((s, r) => s + r.jitter, 0) / onlineResults.length) : 0;

  // === TOP 3 BEST DNS ===
  const top3 = [...onlineResults]
    .filter((r) => r.canResolve)
    .sort((a, b) => {
      // Score: lower is better. Weighted: ping 40% + jitter 35% + resolveTime 25%
      const scoreA = a.avgPing * 0.4 + a.jitter * 3.5 + a.resolveTime * 0.25;
      const scoreB = b.avgPing * 0.4 + b.jitter * 3.5 + b.resolveTime * 0.25;
      return scoreA - scoreB;
    })
    .slice(0, 3);

  const findServer = (ip: string) => {
    for (const g of DNS_GROUPS) {
      const srv = g.servers.find((s) => s.ip === ip);
      if (srv) return { server: srv, group: g };
    }
    return null;
  };

  const displayGroups = selectedGroup ? DNS_GROUPS.filter((g) => g.id === selectedGroup) : DNS_GROUPS;

  return (
    <div className="min-h-screen bg-[#05070c] text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#05070c]/80 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30">
              <span className="font-display text-lg font-black text-white">A</span>
            </div>
            <div>
              <div className="font-display text-sm font-black tracking-widest text-white">ALYAZOURI</div>
              <div className="text-[10px] text-white/50">DNS Live Status</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-ghost rounded-lg px-4 py-2 text-xs">← الرئيسية</Link>
            <button onClick={runFullCheck} disabled={checking} className="btn-primary rounded-lg px-4 py-2 text-xs disabled:opacity-50">
              {checking ? `⏳ ${progress}%` : "🔄 فحص الكل"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-5 py-8">
        {/* Hero */}
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a1628] to-[#05070c] p-8">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
          <div className="relative">
            <div className="font-display text-xs tracking-[0.3em] text-orange-400">DNS LIVE STATUS MONITOR</div>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">📡 فحص DNS حي — كل سيرفرات الأردن</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/60">
              فحص حقيقي (3 عينات TCP + DNS Resolve) لكل سيرفر — بنق، ذبذبة، فقدان حزم، وسرعة حل DNS.
            </p>

            {checking && (
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500 transition-all" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-1 text-[10px] text-white/40">جاري فحص {totalServers} سيرفر...</div>
              </div>
            )}

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
              {[
                { v: totalServers, l: "إجمالي", c: "text-white", bg: "border-white/5" },
                { v: online, l: "🟢 يعمل", c: "text-emerald-400", bg: "border-emerald-400/20 bg-emerald-500/5" },
                { v: offline, l: "🔴 متوقف", c: "text-red-400", bg: "border-red-400/20 bg-red-500/5" },
                { v: timeoutCount, l: "🟡 بطيء", c: "text-amber-400", bg: "border-amber-400/20 bg-amber-500/5" },
                { v: resolving, l: "✅ يحل DNS", c: "text-sky-400", bg: "border-sky-400/20 bg-sky-500/5" },
                { v: `${avgPing}ms`, l: "⚡ متوسط بنق", c: "text-purple-400", bg: "border-purple-400/20 bg-purple-500/5" },
                { v: `${avgJitter}ms`, l: "📊 متوسط ذبذبة", c: "text-orange-400", bg: "border-orange-400/20 bg-orange-500/5" },
              ].map((s, i) => (
                <div key={i} className={`rounded-xl border p-3 text-center ${s.bg}`}>
                  <div className={`text-xl font-black font-display ${s.c}`}>{s.v}</div>
                  <div className="text-[10px] text-white/50">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ TOP 3 BEST DNS ═══ */}
        {top3.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h2 className="font-display text-xl font-black text-white">أفضل 3 DNS الآن</h2>
              <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold text-emerald-300">LIVE</span>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {top3.map((r, rank) => {
                const info = findServer(r.ip);
                const medals = ["🥇", "🥈", "🥉"];
                const ringColors = [
                  "border-amber-400/60 shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]",
                  "border-slate-300/50 shadow-[0_0_30px_-10px_rgba(203,213,225,0.4)]",
                  "border-orange-600/50 shadow-[0_0_30px_-10px_rgba(234,88,12,0.4)]",
                ];
                const score = Math.round(100 - (r.avgPing * 0.3 + r.jitter * 2 + r.resolveTime * 0.1));

                return (
                  <div key={r.ip} className={`card relative overflow-hidden rounded-2xl border-2 p-5 ${ringColors[rank]}`}>
                    {/* Medal */}
                    <div className="absolute -top-1 -right-1 text-4xl">{medals[rank]}</div>

                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${info?.group.color ?? "from-gray-500 to-gray-700"} text-xl`}>
                        {info?.group.icon ?? "📡"}
                      </div>
                      <div>
                        <div className="font-display text-sm font-bold text-white">{info?.group.isp ?? "Unknown"}</div>
                        <div className="text-[10px] text-white/50">{info?.server.city ?? "Jordan"} · {info?.server.asn}</div>
                      </div>
                    </div>

                    {/* IP with copy */}
                    <div className="mt-3 flex items-center gap-2">
                      <code className="flex-1 rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-orange-300 select-all">
                        {r.ip}
                      </code>
                      <button
                        onClick={() => copyIp(r.ip)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold transition-all ${
                          copiedIp === r.ip ? "bg-emerald-500 text-white" : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {copiedIp === r.ip ? "✅" : "📋"}
                      </button>
                    </div>

                    {/* Metrics Grid */}
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      <div className="rounded-lg bg-black/30 p-2 text-center">
                        <div className="text-[9px] text-white/40">بنق</div>
                        <div className={`font-display text-lg font-black tabular-nums ${r.avgPing < 50 ? "text-emerald-400" : r.avgPing < 100 ? "text-amber-400" : "text-red-400"}`}>
                          {r.avgPing}
                        </div>
                        <div className="text-[8px] text-white/30">ms</div>
                      </div>
                      <div className="rounded-lg bg-black/30 p-2 text-center">
                        <div className="text-[9px] text-white/40">ذبذبة</div>
                        <div className={`font-display text-lg font-black tabular-nums ${r.jitter < 5 ? "text-emerald-400" : r.jitter < 15 ? "text-amber-400" : "text-red-400"}`}>
                          {r.jitter}
                        </div>
                        <div className="text-[8px] text-white/30">ms</div>
                      </div>
                      <div className="rounded-lg bg-black/30 p-2 text-center">
                        <div className="text-[9px] text-white/40">حل DNS</div>
                        <div className={`font-display text-lg font-black tabular-nums ${r.resolveTime < 80 ? "text-emerald-400" : r.resolveTime < 200 ? "text-amber-400" : "text-red-400"}`}>
                          {r.resolveTime}
                        </div>
                        <div className="text-[8px] text-white/30">ms</div>
                      </div>
                      <div className="rounded-lg bg-black/30 p-2 text-center">
                        <div className="text-[9px] text-white/40">نقاط</div>
                        <div className={`font-display text-lg font-black tabular-nums ${score > 80 ? "text-emerald-400" : score > 60 ? "text-amber-400" : "text-red-400"}`}>
                          {Math.max(0, score)}
                        </div>
                        <div className="text-[8px] text-white/30">/100</div>
                      </div>
                    </div>

                    {/* Ping chart */}
                    <div className="mt-2 flex items-end gap-1 h-6">
                      {r.pings.map((p, i) => (
                        <div
                          key={i}
                          className={`flex-1 rounded-t transition-all ${p > 0 ? "bg-gradient-to-t from-emerald-500/60 to-emerald-400/30" : "bg-red-500/30"}`}
                          style={{ height: p > 0 ? `${Math.max(20, Math.min(100, (p / Math.max(...r.pings.filter(x=>x>0), 1)) * 100))}%` : "30%" }}
                          title={`Ping ${i + 1}: ${p > 0 ? p + "ms" : "فشل"}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[8px] text-white/30 mt-0.5">
                      <span>P1: {r.pings[0] > 0 ? r.pings[0] + "ms" : "—"}</span>
                      <span>P2: {r.pings[1] > 0 ? r.pings[1] + "ms" : "—"}</span>
                      <span>P3: {r.pings[2] > 0 ? r.pings[2] + "ms" : "—"}</span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-emerald-400 font-bold">✅ يحل DNS</span>
                      <span className="text-white/40">👥 {info?.server.estimatedUsers}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <button onClick={() => setSelectedGroup(null)} className={`chip rounded-full px-3 py-1.5 text-xs font-semibold ${!selectedGroup ? "active" : ""}`}>
            📊 الكل ({totalServers})
          </button>
          {DNS_GROUPS.map((g) => {
            const gOnline = g.servers.filter((s) => results[s.ip]?.status === "online").length;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedGroup(selectedGroup === g.id ? null : g.id)}
                className={`chip rounded-full px-3 py-1.5 text-xs font-semibold ${selectedGroup === g.id ? "active" : ""}`}
              >
                {g.icon} {g.isp} <span className="text-emerald-400 mr-1">{gOnline}</span>/{g.servers.length}
              </button>
            );
          })}
        </div>

        {/* Groups */}
        <div className="space-y-6">
          {displayGroups.map((group) => (
            <GroupCard key={group.id} group={group} results={results} copiedIp={copiedIp} onCopy={copyIp} />
          ))}
        </div>

        {/* Compatibility */}
        <div className="mt-8 card rounded-2xl p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white">🔍 هل تنفع لإنترنتي؟</h3>
          <p className="mt-2 text-sm text-white/60">أي DNS يظهر 🟢 + ✅ + ذبذبة أقل من 10ms = ينفع لإنترنتك. للألعاب استخدم الأقل ذبذبة.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
              <div className="text-lg font-bold text-emerald-400">✅ ممتاز للألعاب</div>
              <div className="mt-1 text-xs text-white/60">بنق &lt; 50ms + ذبذبة &lt; 5ms</div>
            </div>
            <div className="rounded-xl border border-amber-400/20 bg-amber-500/5 p-4">
              <div className="text-lg font-bold text-amber-400">⚠️ مقبول</div>
              <div className="mt-1 text-xs text-white/60">بنق &lt; 100ms + ذبذبة &lt; 15ms</div>
            </div>
            <div className="rounded-xl border border-red-400/20 bg-red-500/5 p-4">
              <div className="text-lg font-bold text-red-400">❌ لا ينصح</div>
              <div className="mt-1 text-xs text-white/60">بنق &gt; 100ms أو ذبذبة &gt; 15ms</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ═══ GROUP CARD ═══ */
function GroupCard({ group, results, copiedIp, onCopy }: {
  group: DnsGroup;
  results: Record<string, DnsResult>;
  copiedIp: string | null;
  onCopy: (ip: string) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const groupOnline = group.servers.filter((s) => results[s.ip]?.status === "online").length;
  const groupResolving = group.servers.filter((s) => results[s.ip]?.canResolve).length;
  const health = group.servers.length > 0 ? Math.round((groupOnline / group.servers.length) * 100) : 0;

  // Sort by avgPing
  const sorted = [...group.servers].sort((a, b) => {
    const ra = results[a.ip];
    const rb = results[b.ip];
    if (!ra || ra.status !== "online") return 1;
    if (!rb || rb.status !== "online") return -1;
    return ra.avgPing - rb.avgPing;
  });

  return (
    <div className="card overflow-hidden rounded-2xl">
      <button onClick={() => setExpanded(!expanded)} className="flex w-full items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${group.color} text-2xl`}>{group.icon}</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold text-white">{group.isp}</span>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-white/50">{group.servers.length} سيرفر</span>
            </div>
            <div className="text-xs text-white/50">{group.ispFull} · 🇯🇴 {group.country}</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="text-emerald-400">🟢 {groupOnline}</span>
            <span className="text-sky-400">✅ {groupResolving}</span>
            <span className="text-white/50">👥 {group.servers[0]?.estimatedUsers}</span>
          </div>
          <div className="hidden sm:block w-20">
            <div className="h-2 overflow-hidden rounded-full bg-white/5">
              <div className={`h-full rounded-full transition-all ${health >= 80 ? "bg-emerald-500" : health >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${health}%` }} />
            </div>
            <div className="mt-0.5 text-center text-[9px] text-white/40">{health}%</div>
          </div>
          <span className={`transition-transform text-white/40 ${expanded ? "rotate-180" : ""}`}>▾</span>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/5 p-4">
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((server) => {
              const r = results[server.ip];
              const status = r?.status ?? "pending";
              const isOnline = status === "online";

              return (
                <div
                  key={server.ip}
                  className={`relative overflow-hidden rounded-xl border p-3 transition-all ${
                    isOnline ? "border-emerald-400/20 bg-emerald-500/[0.03]"
                    : status === "offline" ? "border-red-400/15 bg-red-500/[0.02]"
                    : status === "timeout" ? "border-amber-400/15 bg-amber-500/[0.02]"
                    : "border-white/5 bg-white/[0.01]"
                  }`}
                >
                  {/* Header: IP + Copy + Status */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm shrink-0">
                        {status === "online" ? "🟢" : status === "offline" ? "🔴" : status === "timeout" ? "🟡" : status === "checking" ? "⏳" : "⚪"}
                      </span>
                      <code className="font-mono text-sm font-bold text-white truncate">{server.ip}</code>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onCopy(server.ip); }}
                      className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold transition-all ${
                        copiedIp === server.ip ? "bg-emerald-500 text-white" : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {copiedIp === server.ip ? "✅ تم" : "📋 نسخ"}
                    </button>
                  </div>

                  {/* Metrics */}
                  {r && status !== "checking" && status !== "pending" && (
                    <div className="mt-2 grid grid-cols-5 gap-1.5">
                      <div className="rounded bg-black/30 p-1.5 text-center">
                        <div className="text-[8px] text-white/40">بنق</div>
                        <div className={`font-display text-sm font-bold tabular-nums ${r.avgPing > 0 && r.avgPing < 50 ? "text-emerald-400" : r.avgPing < 100 ? "text-amber-400" : "text-red-400"}`}>
                          {r.avgPing > 0 ? r.avgPing : "—"}
                        </div>
                      </div>
                      <div className="rounded bg-black/30 p-1.5 text-center">
                        <div className="text-[8px] text-white/40">ذبذبة</div>
                        <div className={`font-display text-sm font-bold tabular-nums ${r.jitter < 5 ? "text-emerald-400" : r.jitter < 15 ? "text-amber-400" : "text-red-400"}`}>
                          {r.jitter}
                        </div>
                      </div>
                      <div className="rounded bg-black/30 p-1.5 text-center">
                        <div className="text-[8px] text-white/40">فقدان</div>
                        <div className={`font-display text-sm font-bold tabular-nums ${r.packetLoss === 0 ? "text-emerald-400" : "text-red-400"}`}>
                          {r.packetLoss}%
                        </div>
                      </div>
                      <div className="rounded bg-black/30 p-1.5 text-center">
                        <div className="text-[8px] text-white/40">حل</div>
                        <div className={`text-sm font-bold ${r.canResolve ? "text-emerald-400" : "text-red-400"}`}>
                          {r.canResolve ? "✅" : "❌"}
                        </div>
                      </div>
                      <div className="rounded bg-black/30 p-1.5 text-center">
                        <div className="text-[8px] text-white/40">DNS</div>
                        <div className={`font-display text-sm font-bold tabular-nums ${r.resolveTime > 0 && r.resolveTime < 80 ? "text-emerald-400" : r.resolveTime < 200 ? "text-amber-400" : "text-red-400"}`}>
                          {r.resolveTime > 0 ? r.resolveTime : "—"}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Ping bars */}
                  {r && r.pings && r.pings.length > 0 && isOnline && (
                    <div className="mt-1.5 flex items-center gap-1">
                      {r.pings.map((p, i) => (
                        <div key={i} className="flex items-center gap-0.5 text-[8px]">
                          <span className={`inline-block h-1.5 w-1.5 rounded-full ${p > 0 ? "bg-emerald-400" : "bg-red-500"}`} />
                          <span className="text-white/30">{p > 0 ? p : "×"}</span>
                        </div>
                      ))}
                      <span className="text-[8px] text-white/20 mr-1">|</span>
                      <span className="text-[8px] text-white/40">{server.type} · {server.asn}</span>
                    </div>
                  )}

                  {status === "checking" && (
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-white/40">
                      <span className="animate-pulse">⏳</span> جاري الفحص...
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
