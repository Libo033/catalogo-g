import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const mySession: RequestCookie | undefined =
      request.cookies.get("mySession");

    if (request.cookies.has("mySession")) {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
};
