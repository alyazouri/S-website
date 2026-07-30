import { NextResponse } from "next/server";
import { db } from "@/db";
import { sensitivityProfiles } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

// GET - Fetch profiles for a session
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const profiles = await db
      .select()
      .from(sensitivityProfiles)
      .where(eq(sensitivityProfiles.sessionId, sessionId))
      .orderBy(desc(sensitivityProfiles.createdAt))
      .limit(5);

    return NextResponse.json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST - Save a new profile
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sessionId,
      name,
      deviceBrand,
      deviceName,
      weaponCategory,
      weaponName,
      fingers,
      styleId,
      gyroMode,
      sensitivityData,
      aiScore,
    } = body;

    if (!sessionId || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if user already has 5 profiles
    const existingCount = await db
      .select()
      .from(sensitivityProfiles)
      .where(eq(sensitivityProfiles.sessionId, sessionId));

    if (existingCount.length >= 5) {
      // Delete the oldest one
      const oldest = existingCount.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )[0];
      await db.delete(sensitivityProfiles).where(eq(sensitivityProfiles.id, oldest.id));
    }

    const [newProfile] = await db
      .insert(sensitivityProfiles)
      .values({
        sessionId,
        name,
        deviceBrand: deviceBrand || "unknown",
        deviceName: deviceName || "unknown",
        weaponCategory: weaponCategory || "ar",
        weaponName: weaponName || "M416",
        fingers: fingers || 4,
        styleId: styleId || "headshot",
        gyroMode: gyroMode || "always",
        sensitivityData: sensitivityData || {},
        aiScore: aiScore || 0,
      })
      .returning();

    return NextResponse.json({ profile: newProfile });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// DELETE - Remove a profile
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const sessionId = searchParams.get("sessionId");

    if (!id || !sessionId) {
      return NextResponse.json({ error: "id and sessionId required" }, { status: 400 });
    }

    await db
      .delete(sensitivityProfiles)
      .where(eq(sensitivityProfiles.id, parseInt(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
