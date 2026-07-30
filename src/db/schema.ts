import { pgTable, serial, varchar, integer, timestamp, text, jsonb, boolean } from "drizzle-orm/pg-core";

// Saved user profiles for sensitivity settings
export const sensitivityProfiles = pgTable("sensitivity_profiles", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  name: varchar("name", { length: 200 }).notNull(),
  deviceBrand: varchar("device_brand", { length: 100 }).notNull(),
  deviceName: varchar("device_name", { length: 200 }).notNull(),
  weaponCategory: varchar("weapon_category", { length: 100 }).notNull(),
  weaponName: varchar("weapon_name", { length: 100 }).notNull(),
  fingers: integer("fingers").notNull().default(4),
  styleId: varchar("style_id", { length: 50 }).notNull(),
  gyroMode: varchar("gyro_mode", { length: 20 }).notNull(),
  sensitivityData: jsonb("sensitivity_data").notNull(),
  aiScore: integer("ai_score").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User ratings
export const ratings = pgTable("ratings", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Ping measurements for analytics
export const pingMeasurements = pgTable("ping_measurements", {
  id: serial("id").primaryKey(),
  sessionId: varchar("session_id", { length: 100 }).notNull(),
  serverId: varchar("server_id", { length: 50 }).notNull(),
  serverName: varchar("server_name", { length: 100 }).notNull(),
  ping: integer("ping").notNull(),
  jitter: integer("jitter"),
  loss: integer("loss"),
  isBest: boolean("is_best").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Type exports
export type SensitivityProfile = typeof sensitivityProfiles.$inferSelect;
export type NewSensitivityProfile = typeof sensitivityProfiles.$inferInsert;
export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;
export type PingMeasurement = typeof pingMeasurements.$inferSelect;
export type NewPingMeasurement = typeof pingMeasurements.$inferInsert;
