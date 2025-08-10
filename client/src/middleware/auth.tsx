import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");

  if (token) {
    const res = await fetch("http://localhost:7000/api/auth", {
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
