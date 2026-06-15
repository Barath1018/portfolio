import { sql, initDatabase } from './db';
import fs from 'fs';
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
  if (process.env.DATABASE_URL) {
    try {
      await initDatabase();
      const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
      console.log(`[getProjects] Fetched ${projects.length} projects from database`);
      if (projects.length > 0) return projects as ProjectData[];
      console.warn('[getProjects] Database has no projects, falling back to JSON');
    } catch (error) {
      console.error('[getProjects] Database query failed:', error instanceof Error ? error.message : error);
      console.error('[getProjects] Full error:', error);
    }
  } else {
    console.warn('[getProjects] No DATABASE_URL set, using local JSON');
  }

  try {
    const dataFilePath = path.join(process.cwd(), 'src/data/projects.json');
    if (fs.existsSync(dataFilePath)) {
      const fileContent = fs.readFileSync(dataFilePath, 'utf8');
      const local = JSON.parse(fileContent) as ProjectData[];
      console.log(`[getProjects] Loaded ${local.length} projects from local JSON`);
      return local;
    }
  } catch (error) {
    console.error('[getProjects] Failed to read local JSON:', error);
  }

  return [];
}
