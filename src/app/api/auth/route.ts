import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_LOGIN = "admin";
const ADMIN_PASSWORD = "AaaBez$2026!";
const VALID_SESSION = "aaabez-admin-session-x9k2m7p4";

// POST — login
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body.login === ADMIN_LOGIN && body.password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", VALID_SESSION, {
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
