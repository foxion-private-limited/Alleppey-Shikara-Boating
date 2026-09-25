import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'alleppey-secret-key-super-secure-token-2026'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const token = request.cookies.get('admin_session')?.value;

    let isAuthenticated = false;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        isAuthenticated = true;
      } catch (err) {
        isAuthenticated = false;
      }
    }

    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && isLoginPage) {
      const adminUrl = new URL('/admin', request.url);
      return NextResponse.redirect(adminUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
