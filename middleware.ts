// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CONST_VALUES } from './constants/values.constant';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(CONST_VALUES.TOKEN)?.value;

  if (pathname.startsWith('/auth/login')) {
    if (token) return NextResponse.redirect(new URL('/dashboard', request.url));
    return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // đã auth và đúng role → cho qua
    return NextResponse.next();
  }

  // 3. Các route còn lại → không can thiệp
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/login/:path*', '/dashboard/:path*']
};
