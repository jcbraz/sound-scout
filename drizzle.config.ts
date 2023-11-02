import type { Config } from "drizzle-kit";
 
export default {
  schema: "./db/schema.ts",
  out: "./db/migrations",
  driver: 'mysql2',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ? process.env.DATABASE_URL : '',
  }
} satisfies Config;