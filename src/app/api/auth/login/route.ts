import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
      // In a real app, you'd set a secure cookie/session here
      return NextResponse.json({ success: true, token: 'authenticated-session-token' });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Auth failed' }, { status: 500 });
  }
}
