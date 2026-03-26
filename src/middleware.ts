import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SESSION_SECRET = "aaabez-session-secret-k8x2m9";
const ADMIN_LOGIN = "admin";

function verifyToken(token: string): boolean {
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

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page and auth API
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protect /admin/* routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_session")?.value;

    if (!token || !verifyToken(token)) {
      const loginUrl = new URL("/admin/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
