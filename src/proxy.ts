import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Check if trying to access the dashboard
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const session = request.cookies.get('admin_session');

    if (!session || session.value !== 'authenticated') {
      // Redirect to login page if not authenticated
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Check if trying to access the login page while already authenticated
  if (request.nextUrl.pathname === '/admin') {
    const session = request.cookies.get('admin_session');
    
    if (session && session.value === 'authenticated') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
