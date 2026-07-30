import { NextResponse } from "next/server";
import { db } from "@/db";
import { ratings } from "@/db/schema";
import { eq, desc, sql } from "drizzle-orm";

// GET - Fetch rating for a session or get stats
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");
    const stats = searchParams.get("stats");

    if (stats === "true") {
      // Get average rating and count
      const result = await db
        .select({
          avgRating: sql<number>`AVG(${ratings.rating})`,
          totalRatings: sql<number>`COUNT(*)`,
        })
        .from(ratings);

      return NextResponse.json({
        averageRating: result[0]?.avgRating ? Number(result[0].avgRating).toFixed(1) : "0.0",
        totalRatings: Number(result[0]?.totalRatings) || 0,
      });
    }

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const [userRating] = await db
      .select()
      .from(ratings)
      .where(eq(ratings.sessionId, sessionId))
      .orderBy(desc(ratings.createdAt))
      .limit(1);

    return NextResponse.json({ rating: userRating || null });
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST - Submit or update a rating
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sessionId, rating, comment } = body;

    if (!sessionId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Valid sessionId and rating (1-5) required" }, { status: 400 });
    }

    // Check if user already rated
    const [existing] = await db
      .select()
      .from(ratings)
      .where(eq(ratings.sessionId, sessionId))
      .limit(1);

    if (existing) {
      // Update existing rating
      const [updated] = await db
        .update(ratings)
        .set({ rating, comment: comment || null })
        .where(eq(ratings.id, existing.id))
        .returning();

      return NextResponse.json({ rating: updated });
    } else {
      // Create new rating
      const [newRating] = await db
        .insert(ratings)
        .values({
          sessionId,
          rating,
          comment: comment || null,
        })
        .returning();

      return NextResponse.json({ rating: newRating });
    }
  } catch (error) {
    console.error("Error saving rating:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
