import { sql } from "drizzle-orm";
import { int, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
  latitude: real(),
  longitude: real(),
});

export const postsTable = sqliteTable("posts_table", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  body: text().notNull(),
  latitude: real(),
  longitude: real(),
  userId: integer().references(() => usersTable.id),
  createdAt: int({ mode: 'timestamp' }).default(sql`CURRENT_TIMESTAMP`),
});
