import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './constants/Enum/role.enum';

export async function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl;
  const hasSessionToken = request.cookies.has('next-auth.session-token');
  const protectedPaths = ['/admin'];
  const matchesProtectedPath = protectedPaths.some((path) =>
    redirectUrl.pathname.startsWith(path),
  );
  const token = await getToken({ req: request });
  const isAdmin =
    hasSessionToken && matchesProtectedPath && token.zone[0] === Role.ADMIN;

  if (isAdmin) {
    return NextResponse.next();
  }

  if (!hasSessionToken) {
    redirectUrl.pathname = '/auth/sign-in';
  } else {
    if (!matchesProtectedPath) {
      return NextResponse.next();
    } else {
      redirectUrl.pathname = '/landing-page';
    }
  }

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher:
    '/((?!api|_next/static|_next/image|favicon.ico|auth/register|auth/sign-in|errors/404).*)',
};
