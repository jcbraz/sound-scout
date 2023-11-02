import { relations, sql } from "drizzle-orm";
import { index, int, mysqlTable, serial, tinyint, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 320 }).notNull(),
  first_name: varchar('first_name', { length: 50 }),
  last_name: varchar('last_name', { length: 50 }),
  credits: tinyint('credits').notNull().default(5),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const playlist = mysqlTable('playlist', {
  id: serial('id').primaryKey(),
  user_id: int('user_id').notNull(),
  prompt: varchar('prompt', { length: 250 }),
  suggestion: varchar('suggestion', { length: 1000 }),
  url: varchar('url', { length: 65 }), // url
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
}, (playlists) => ({
  userIndex: index('user_idx').on(playlists.user_id),
  urlIndex: index('url_idx').on(playlists.url)
}));

export const feedback = mysqlTable('feedback', {
  id: serial('id').primaryKey(),
  user_id: int('user_id').notNull(),
  title: varchar('title', { length: 50 }).notNull(),
  description: varchar('description', { length: 250 }).notNull(),
  created_at: timestamp('created_at').notNull().default(sql`CURRENT_TIMESTAMP`).notNull(),
  resolved: boolean('resolved').default(false)
}, (feedbacks) => ({
  userIndex: index('user_idx').on(feedbacks.user_id)
}));

export const userRelations = relations(user, ({ many }) => ({
  playlist: many(playlist)
}));

export const playlistRelations = relations(playlist, ({ one, many }) => ({
  user: one(user, {
    fields: [playlist.user_id],
    references: [user.id]
  }),
  feedback: many(feedback)
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(user, {
    fields: [feedback.user_id],
    references: [user.id]
  })
}));


export type SelectUser = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
export type SelectPlaylist = InferSelectModel<typeof playlist>;
export type InsertPlaylist = InferInsertModel<typeof playlist>;
export type SelectFeedback = InferSelectModel<typeof feedback>;
export type InsertFeedback = InferInsertModel<typeof feedback>;