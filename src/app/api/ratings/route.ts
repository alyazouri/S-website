import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { ratings } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

const NO_DB = () => NextResponse.json({ rating: null, averageRating: "0.0", totalRatings: 0 });

export async function GET(request: Request) {
  const db = getDb();
  if (!db) return NO_DB();
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (searchParams.get("stats") === "true") {
      const r = await db.select({ avg: sql<number>`AVG(${ratings.rating})`, cnt: sql<number>`COUNT(*)` }).from(ratings);
      return NextResponse.json({ averageRating: r[0]?.avg ? Number(r[0].avg).toFixed(1) : "0.0", totalRatings: Number(r[0]?.cnt) || 0 });
    }

    if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    const [row] = await db.select().from(ratings).where(eq(ratings.sessionId, sessionId)).orderBy(desc(ratings.createdAt)).limit(1);
    return NextResponse.json({ rating: row ?? null });
  } catch (e) { console.error(e); return NO_DB(); }
}

export async function POST(request: Request) {
  const db = getDb();
  if (!db) return NextResponse.json({ rating: null });
  try {
    const { sessionId, rating, comment } = await request.json();
    if (!sessionId || !rating || rating < 1 || rating > 5) return NextResponse.json({ error: "Invalid" }, { status: 400 });

    const [existing] = await db.select().from(ratings).where(eq(ratings.sessionId, sessionId)).limit(1);
    if (existing) {
      const [u] = await db.update(ratings).set({ rating, comment: comment || null }).where(eq(ratings.id, existing.id)).returning();
      return NextResponse.json({ rating: u });
    }
    const [n] = await db.insert(ratings).values({ sessionId, rating, comment: comment || null }).returning();
    return NextResponse.json({ rating: n });
  } catch (e) { console.error(e); return NextResponse.json({ error: "fail" }, { status: 500 }); }
}
