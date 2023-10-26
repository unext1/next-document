import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, text, timestamp } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const documents = mysqlTable("documents", {
	id: int("id").autoincrement().notNull(),
	title: varchar("title", { length: 255 }),
	content: text("content"),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
},
(table) => {
	return {
		documentsId: primaryKey(table.id),
	}
});