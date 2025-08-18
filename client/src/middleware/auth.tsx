import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (token) {
    const res = await fetch("https://back-production-533d.up.railway.app/api/auth", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (!isAuthPage) {
        return NextResponse.redirect(new URL("/auth?type=login", request.url));
      }
      return NextResponse.next();
    }
    return NextResponse.next();
  }

  if (!isAuthPage) {
    return NextResponse.redirect(new URL("/auth?type=login", request.url));
  }
  return NextResponse.next();
}
