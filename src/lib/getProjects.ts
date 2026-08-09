import { sql, initDatabase } from './db';
import { readFile } from 'fs/promises';
import path from 'path';

export interface ProjectData {
  id?: number;
  company?: string;
  year?: string;
  title: string;
  description: string;
  link?: string;
  repo?: string;
  image: string;
  tags?: string;
}

export async function getProjects(): Promise<ProjectData[]> {
  if (!process.env.DATABASE_URL) {
    console.error('[getProjects] DATABASE_URL is not set!');
    return [];
  }

  try {
    await initDatabase();
    const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    console.log(`[getProjects] Fetched ${projects.length} projects from database`);
    return projects as ProjectData[];
  } catch (error) {
    console.error('[getProjects] Database query failed:', error instanceof Error ? error.message : error);
    console.error('[getProjects] Falling back to projects.json');
    try {
      const data = await readFile(path.join(process.cwd(), 'projects.json'), 'utf-8');
      return JSON.parse(data) as ProjectData[];
    } catch {
      return [];
    }
  }
}
