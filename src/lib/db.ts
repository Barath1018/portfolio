import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

export const sql = neon(process.env.DATABASE_URL);

export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        company TEXT,
        year TEXT,
        title TEXT,
        description TEXT,
        link TEXT,
        repo TEXT,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}
