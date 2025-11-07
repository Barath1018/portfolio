import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "Barath's_Resume.pdf");
    const file = await fs.readFile(filePath);
    // Convert Node Buffer to a web-compatible Uint8Array (BodyInit)
    const body = new Uint8Array(file);
    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=\"Barath_Resume.pdf\"",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Resume file not found" },
      { status: 404 }
    );
  }
}
