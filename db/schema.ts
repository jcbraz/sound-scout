import { relations, sql } from "drizzle-orm";
import { index, int, mysqlTable, serial, timestamp, varchar, boolean, smallint, decimal } from "drizzle-orm/mysql-core";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 320 }).unique().notNull(),
  first_name: varchar('first_name', { length: 50 }),
  last_name: varchar('last_name', { length: 50 }),
  credits: smallint('credits').notNull().default(5),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const playlist = mysqlTable('playlist', {
  id: varchar('id', { length: 30 }).primaryKey(), // id == url => always unique
  user_id: int('user_id').notNull(),
  prompt: varchar('prompt', { length: 250 }),
  suggestion: varchar('suggestion', { length: 1000 }),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`)
}, (playlists) => ({
  userIndex: index('user_idx').on(playlists.user_id),
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

export const plan = mysqlTable('plan', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 25 }).notNull(),
  preHeader: varchar('pre_header', { length: 100 }).notNull(),
  credits: smallint('credits').notNull(),
  price: decimal('price', { precision: 3, scale: 2 }).notNull(),
  created_at: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull()
});

export const features = mysqlTable('features', {
  id: serial('id').primaryKey(),
  plan_id: int('plan_id').notNull(),
  description: varchar('feature', { length: 150 }).notNull(),
  included: boolean('included').default(true).notNull()
}, (features) => ({
  planIndex: index('plan_idx').on(features.plan_id)
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

export const planRelations = relations(plan, ({ many }) => ({
  features: many(features)
}));

export const featuresRelations = relations(features, ({ one }) => ({
  plan: one(plan, {
    fields: [features.plan_id],
    references: [plan.id]
  })
}));


export type SelectUser = InferSelectModel<typeof user>;
export type InsertUser = InferInsertModel<typeof user>;
export type SelectPlaylist = InferSelectModel<typeof playlist>;
export type InsertPlaylist = InferInsertModel<typeof playlist>;
export type SelectFeedback = InferSelectModel<typeof feedback>;
export type InsertFeedback = InferInsertModel<typeof feedback>;
export type SelectPlan = InferSelectModel<typeof plan>;
export type InsertPlan = InferInsertModel<typeof plan>;
export type SelectFeatures = InferSelectModel<typeof features>;
export type InsertFeatures = InferInsertModel<typeof features>;