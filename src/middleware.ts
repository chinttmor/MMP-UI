import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './constants/Enum/role.enum';

export async function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl;
  const hasSessionToken = request.cookies.has('next-auth.session-token');
  const isSignInRoute = redirectUrl.pathname === '/auth/sign-in';
  const protectedPaths = ['/admin'];
  const matchesProtectedPath = protectedPaths.some((path) =>
    redirectUrl.pathname.startsWith(path),
  );
  const token = await getToken({ req: request });
  if (hasSessionToken) {
    if (matchesProtectedPath) {
      if (token.zone[0] !== Role.ADMIN) {
        redirectUrl.pathname = '/landing-page';
        return NextResponse.redirect(redirectUrl);
      } else {
        return NextResponse.next();
      }
    } else {
      return NextResponse.next();
    }
  } else if (!hasSessionToken) {
    redirectUrl.pathname = '/auth/sign-in';
    return NextResponse.redirect(redirectUrl);
  } else {
    redirectUrl.pathname = '/errors/404';
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|auth/register|auth/sign-in|errors/404).*)',
};
