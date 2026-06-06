import { NextResponse } from 'next/server';
import { sql, initDatabase } from '@/lib/db';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }
    
    await initDatabase();
    const projects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
    
    // If database is empty, migrate from local JSON
    if (projects.length === 0) {
      const dataFilePath = path.join(process.cwd(), 'src/data/projects.json');
      if (fs.existsSync(dataFilePath)) {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        const localProjects = JSON.parse(fileContent);
        
        for (const p of localProjects) {
          await sql`
            INSERT INTO projects (company, year, title, description, link, repo, image)
            VALUES (${p.company}, ${p.year}, ${p.title}, ${p.description}, ${p.link}, ${p.repo}, ${p.image})
          `;
        }
        const migratedProjects = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
        return NextResponse.json(migratedProjects);
      }
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const project = await request.json();
    
    if (project.id) {
      // Update existing
      await sql`
        UPDATE projects 
        SET company = ${project.company}, 
            year = ${project.year}, 
            title = ${project.title}, 
            description = ${project.description}, 
            link = ${project.link}, 
            repo = ${project.repo}, 
            image = ${project.image}
        WHERE id = ${project.id}
      `;
    } else {
      // Insert new
      await sql`
        INSERT INTO projects (company, year, title, description, link, repo, image)
        VALUES (${project.company}, ${project.year}, ${project.title}, ${project.description}, ${project.link}, ${project.repo}, ${project.image})
      `;
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await sql`DELETE FROM projects WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
