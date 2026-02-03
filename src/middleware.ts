
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('next.token_sinfa')?.value;

  const publicPaths = [
    '/',
    '/sinfa/consutoria-farmaceutica',
    '/sinfa/contablidade-autoria',
    '/sinfa/software-de-facturacao',
    '/sinfa/desenvolvimento',
    '/sinfa/Design',
    '/sinfa/Marketing',
    '/sinfa/noticias',
    '/sinfa/sobre/historia',
    '/sinfa/contacto',
    '/portfolio-comercial.pdf',
    '/login', 
    '/login/signup'
  ];

  if (token && publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  
  if (!token && !publicPaths.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$|favicon.ico).*)',
  ],
};


