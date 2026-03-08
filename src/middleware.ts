import createMiddleware from 'next-intl/middleware';
import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['es', 'en'],
    defaultLocale: 'es'
});

const publicPages = [
  '/',
  '/login',
  '/register',
  '/auth/error',
  '/api/auth',
];

const isPublicPage = (pathname: string) => {
  return publicPages.some(page => 
    pathname === page || 
    pathname.startsWith(`${page}/`) ||
    pathname.match(/^\/(es|en)(\/.*)?$/) && publicPages.some(p => pathname.includes(p))
  );
};

export default auth((req) => {
  const pathname = req.nextUrl.pathname;
  
  if (!isPublicPage(pathname) && !req.auth) {
    const locale = req.nextUrl.locale || 'es';
    const newUrl = new URL(`/${locale}/login`, req.nextUrl.origin);
    newUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(newUrl);
  }

  return intlMiddleware(req as NextRequest);
});

export const config = {
    matcher: ['/', '/(es|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
