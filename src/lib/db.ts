import { neon } from '@neondatabase/serverless';

export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL) 
  : (() => {
      const mock = () => {
        throw new Error('DATABASE_URL is not defined. Please check your environment variables.');
      };
      return mock as any;
    })();

export async function initDatabase() {
  if (!process.env.DATABASE_URL) {
    console.warn('Skipping database initialization: DATABASE_URL is not defined.');
    return;
  }
  
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
