import { sqliteTable } from "drizzle-orm/sqlite-core";
import { SQL, sql } from "drizzle-orm";

export const users = sqliteTable("users", (t) => ({
  id: t.integer().primaryKey({ autoIncrement: true }),
  email: t.text().notNull().unique(),
  passwordHash: t.text(),
  admin: t.integer({ mode: "boolean" }).notNull().default(false),
  name: t
    .text()
    .notNull()
    .generatedAlwaysAs(
      (): SQL => sql`UPPER(SUBSTR(SUBSTR(${users.email}, 1, INSTR(${users.email}, '@') - 1), 1, 1))
    || ' ' || UPPER(SUBSTR(SUBSTR(${users.email}, 1, INSTR(${users.email}, '@') - 1), 2, 1)) ||
    REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(
    SUBSTR(SUBSTR(${users.email}, 1, INSTR(${users.email}, '@') - 1), 3)
    , '0', ''),'1', ''),'2', ''),'3', ''),'4', ''),'5', ''),'6', ''),'7', ''),'8', ''),'9', '')`,
    ),
}));

export const tokens = sqliteTable("tokens", (t) => ({
  hash: t.text().notNull(),
  email: t
    .text()
    .notNull()
    .unique()
    .references(() => users.email, { onDelete: "cascade" }),
}));
