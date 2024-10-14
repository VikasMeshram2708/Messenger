import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;
  const publicPath = new Set(["/u/login", "/u/signup"]);
  const isPublicPath = publicPath.has(path);

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/u/login", request.url));
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/u/login",
    "/u/signup",
    "/u/:path*",
  ],
};
