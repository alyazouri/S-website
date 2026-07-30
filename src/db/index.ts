import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/* ── helpers ────────────────────────────────────── */
const globalForDb = globalThis as typeof globalThis & {
  __pool?: Pool;
};

function createPool() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  if (globalForDb.__pool) return globalForDb.__pool;
  const p = new Pool({ connectionString: url });
  if (process.env.NODE_ENV !== "production") globalForDb.__pool = p;
  return p;
}

/* ── exports ────────────────────────────────────── */
export const pool = createPool();

/**
 * Returns a Drizzle client **or null** when DATABASE_URL is unset.
 * Every call-site must guard: `const d = getDb(); if (!d) return …;`
 */
export function getDb() {
  const p = pool ?? createPool();      // retry in case env appeared after module init
  if (!p) return null;
  return drizzle(p);
}

// Legacy default — kept so existing `import { db }` still compiles,
// but callers MUST null-check before use.
export const db = getDb();
