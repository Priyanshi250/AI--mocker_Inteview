import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { MockInterview, UserAnswer } from './schema';
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL);
export const db = drizzle({ client: sql, schema: { MockInterview, UserAnswer } });