import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /dashboard/* but not /dashboard/login
  if (
    pathname.startsWith('/dashboard') &&
    !pathname.startsWith('/dashboard/login')
  ) {
    const session = request.cookies.get('dash_session');
    const secret = process.env.DASHBOARD_SECRET || 'martinelli-secret-2025';

    if (!session || session.value !== secret) {
      const loginUrl = new URL('/dashboard/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
