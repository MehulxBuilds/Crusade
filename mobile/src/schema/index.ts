import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const targetStatusEnum = ["NEW", "ABORTED", "COMPLETED"] as const;

export type TargetStatusType = (typeof targetStatusEnum)[number];

export const targets = sqliteTable("targets", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  targetDate: integer("target_date", { mode: "timestamp_ms" }).notNull(),
  status: text("target_status")
    .notNull()
    .$type<TargetStatusType>()
    .default("NEW"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(unixepoch() * 1000)`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(unixepoch() * 1000)`)
    .notNull(),
});
