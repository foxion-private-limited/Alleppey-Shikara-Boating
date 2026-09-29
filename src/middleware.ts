import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'alleppey-secret-key-super-secure-token-2026'
);

// Explicit 301 migration redirects from old website structure (single-hop, no redirect chains)
const MIGRATION_REDIRECTS: Record<string, string> = {
  '/about-us': '/',
  '/about-us/': '/',
  '/packages-2': '/',
  '/packages-2/': '/',
  '/contact': '/',
  '/contact/': '/',
  '/gallery/': '/gallery',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Permanent 301 migration redirects
  const redirectTarget = MIGRATION_REDIRECTS[pathname];
  if (redirectTarget) {
    return NextResponse.redirect(new URL(redirectTarget, request.url), 301);
  }

  // 2. Only protect /admin routes
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
  matcher: [
    '/admin/:path*',
    '/about-us',
    '/about-us/',
    '/packages-2',
    '/packages-2/',
    '/contact',
    '/contact/',
    '/gallery/',
  ],
};
