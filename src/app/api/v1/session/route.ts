import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const secret_key: string | undefined = process.env.JWT_SECRET;
    const mySession: RequestCookie | undefined = cookies().get("mySession");
    const user = process.env.NEXT_PUBLIC_USER;

    if (!secret_key || !user) {
      return Response.json(
        { Error: "credentials error", code: 500 },
        { status: 500 }
      );
    }

    if (mySession !== undefined) {
      let key: Uint8Array = new TextEncoder().encode(secret_key);
      const value = await jwtVerify(mySession.value, key);

      if (value.payload.user_id === user)
        return Response.json({ admin: true, code: 200 }, { status: 200 });
    }

    return Response.json({ admin: false, code: 200 }, { status: 200 });
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const secret_key: string | undefined = process.env.JWT_SECRET;
    const user = process.env.NEXT_PUBLIC_USER;
    const pass = process.env.PASS;
    const data: { email: string; password: string } = await req.json();

    if (!secret_key || !user || !pass) {
      return Response.json(
        { Error: "credentials error", code: 500 },
        { status: 500 }
      );
    }

    if (data.email === user && data.password === pass) {
      const my_token: string = jwt.sign(
        {
          user_id: user,
        },
        secret_key
      );

      cookies().set("mySession", my_token, {
        httpOnly: true,
        sameSite: "strict",
        expires: Date.now() + 86400000 * 30, // 30 dias
      });

      return Response.json({ code: 200 }, { status: 200 });
    }

    return Response.json(
      { Error: "forbidden session", code: 403 },
      { status: 403 }
    );
  } catch (error) {
    return Response.json({ Error: error, code: 500 }, { status: 500 });
  }
}
