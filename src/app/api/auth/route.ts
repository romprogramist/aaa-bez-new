import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "AaaBez$2026!";
const SESSION_SECRET = "aaabez-session-secret-k8x2m9";

function makeToken(login: string): string {
  return crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(login + Date.now().toString().slice(0, -5))
    .digest("hex");
}

export function verifyToken(token: string): boolean {
  // Token is valid for ~24 hours (we regenerate every ~28h window)
  const now = Date.now().toString().slice(0, -5);
  const prev = (Date.now() - 100000000).toString().slice(0, -5);

  const valid1 = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(ADMIN_LOGIN + now)
    .digest("hex");
  const valid2 = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(ADMIN_LOGIN + prev)
    .digest("hex");

  return token === valid1 || token === valid2;
}

// POST — login
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.login === ADMIN_LOGIN && body.password === ADMIN_PASSWORD) {
    const token = makeToken(body.login);
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
}

// DELETE — logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
