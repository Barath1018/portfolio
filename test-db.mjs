import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL);
try {
  const result = await sql`SELECT id, title, image, tags FROM projects ORDER BY id`;
  console.log('DB OK, projects:', JSON.stringify(result, null, 2));
} catch (e) {
  console.error('DB ERROR:', e.message);
}
