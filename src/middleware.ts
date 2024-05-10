import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const mySession: RequestCookie | undefined =
      request.cookies.get("mySession");

    if (mySession) {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const value = await jwtVerify(mySession?.value, secret);

      if (value.payload.user_id === process.env.NEXT_PUBLIC_USER)
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
