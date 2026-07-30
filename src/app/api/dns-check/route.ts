import { NextResponse } from "next/server";

// Use dynamic imports for Node.js modules to avoid edge runtime issues
async function checkDnsServerNode(ip: string): Promise<{
  status: "online" | "offline" | "timeout";
  pings: number[];
  avgPing: number;
  jitter: number;
  canResolve: boolean;
  resolveTime: number;
  packetLoss: number;
}> {
  try {
    const net = await import("net");
    const dns = await import("dns");

    // TCP ping function
    const tcpPing = (targetIp: string, timeoutMs = 2500): Promise<number> => {
      const start = Date.now();
      return new Promise((resolve) => {
        const socket = new net.Socket();
        let done = false;
        const finish = (ms: number) => { if (done) return; done = true; socket.destroy(); resolve(ms); };
        socket.setTimeout(timeoutMs);
        socket.on("connect", () => finish(Date.now() - start));
        socket.on("timeout", () => finish(-1));
        socket.on("error", () => finish(-2));
        socket.connect(53, targetIp);
      });
    };

    // 3 TCP pings
    const p1 = await tcpPing(ip);
    const p2 = await tcpPing(ip);
    const p3 = await tcpPing(ip);
    const pings = [p1, p2, p3];
    const goodPings = pings.filter((p) => p > 0);
    const failedCount = pings.filter((p) => p <= 0).length;

    let status: "online" | "offline" | "timeout" = "offline";
    let avgPing = 0;
    let jitter = 0;

    if (goodPings.length > 0) {
      status = goodPings.length >= 2 ? "online" : "timeout";
      avgPing = Math.round(goodPings.reduce((a, b) => a + b, 0) / goodPings.length);
      jitter = Math.round(goodPings.reduce((sum, p) => sum + Math.abs(p - avgPing), 0) / goodPings.length);
    }
    if (failedCount === 3) {
      status = pings.every((p) => p === -1) ? "timeout" : "offline";
    }

    const packetLoss = Math.round((failedCount / 3) * 100);

    // DNS resolution test
    let canResolve = false;
    let resolveTime = 0;
    if (status !== "offline") {
      const start = Date.now();
      canResolve = await new Promise<boolean>((resolve) => {
        const resolver = new dns.Resolver();
        resolver.setServers([ip]);
        const timer = setTimeout(() => resolve(false), 3500);
        resolver.resolve4("google.com", (err) => {
          clearTimeout(timer);
          resolve(!err);
        });
      });
      resolveTime = Date.now() - start;
    }

    return { status, pings, avgPing, jitter, canResolve, resolveTime, packetLoss };
  } catch {
    return { status: "offline", pings: [-2, -2, -2], avgPing: 0, jitter: 0, canResolve: false, resolveTime: 0, packetLoss: 100 };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ips } = body as { ips: string[] };
    if (!ips || !Array.isArray(ips) || ips.length === 0) {
      return NextResponse.json({ error: "ips array required" }, { status: 400 });
    }

    const batch = ips.slice(0, 15);
    const results = await Promise.all(
      batch.map(async (ip: string) => {
        const check = await checkDnsServerNode(ip);
        return {
          ip,
          ...check,
          minPing: check.pings.filter((p) => p > 0).length > 0 ? Math.min(...check.pings.filter((p) => p > 0)) : 0,
          maxPing: check.pings.filter((p) => p > 0).length > 0 ? Math.max(...check.pings.filter((p) => p > 0)) : 0,
          checkedAt: new Date().toISOString(),
        };
      })
    );

    return NextResponse.json({ results });
  } catch (error) {
    console.error("DNS check error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// Force Node.js runtime (not Edge)
export const runtime = "nodejs";
