import { Connection, connect } from '@planetscale/database';
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from './schema';

const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
}) satisfies Connection;

export const db = drizzle(connection, { schema });
export type DbClient = typeof db;