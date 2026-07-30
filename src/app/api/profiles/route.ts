import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { sensitivityProfiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

const NO_DB = () => NextResponse.json({ profiles: [] });

export async function GET(request: Request) {
  const db = getDb();
  if (!db) return NO_DB();
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    if (!sessionId) return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    const rows = await db.select().from(sensitivityProfiles).where(eq(sensitivityProfiles.sessionId, sessionId)).orderBy(desc(sensitivityProfiles.createdAt)).limit(5);
    return NextResponse.json({ profiles: rows });
  } catch (e) { console.error(e); return NO_DB(); }
}

export async function POST(request: Request) {
  const db = getDb();
  if (!db) return NO_DB();
  try {
    const body = await request.json();
    const { sessionId, name, deviceBrand, deviceName, weaponCategory, weaponName, fingers, styleId, gyroMode, sensitivityData, aiScore } = body;
    if (!sessionId || !name) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const existing = await db.select().from(sensitivityProfiles).where(eq(sensitivityProfiles.sessionId, sessionId));
    if (existing.length >= 5) {
      const oldest = existing.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0];
      await db.delete(sensitivityProfiles).where(eq(sensitivityProfiles.id, oldest.id));
    }
    const [row] = await db.insert(sensitivityProfiles).values({
      sessionId, name, deviceBrand: deviceBrand ?? "unknown", deviceName: deviceName ?? "unknown",
      weaponCategory: weaponCategory ?? "ar", weaponName: weaponName ?? "M416",
      fingers: fingers ?? 4, styleId: styleId ?? "headshot", gyroMode: gyroMode ?? "always",
      sensitivityData: sensitivityData ?? {}, aiScore: aiScore ?? 0,
    }).returning();
    return NextResponse.json({ profile: row });
  } catch (e) { console.error(e); return NextResponse.json({ error: "fail" }, { status: 500 }); }
}

export async function DELETE(request: Request) {
  const db = getDb();
  if (!db) return NextResponse.json({ success: true });
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await db.delete(sensitivityProfiles).where(eq(sensitivityProfiles.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (e) { console.error(e); return NextResponse.json({ error: "fail" }, { status: 500 }); }
}
