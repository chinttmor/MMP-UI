import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const redirectUrl = request.nextUrl.clone();
  const hasSessionToken = request.cookies.has("next-auth.session-token");
  const isSignInRoute = redirectUrl.pathname === "/auth/sign-in";
  if (hasSessionToken && isSignInRoute) {
    redirectUrl.pathname = "/admin";
    return NextResponse.redirect(redirectUrl);
  } else if (!hasSessionToken && !isSignInRoute) {
    redirectUrl.pathname = "/auth/sign-in";
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|auth/register).*)",
};
