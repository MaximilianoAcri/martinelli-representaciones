import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.DASHBOARD_USER || 'admin';
    const expectedPass = process.env.DASHBOARD_PASS || 'martinelli2025';
    const secret = process.env.DASHBOARD_SECRET || 'martinelli-secret-2025';

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json({ error: 'Usuario o contraseña incorrectos' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('dash_session', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 días
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
