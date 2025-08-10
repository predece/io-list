import { type NextRequest } from "next/server";
import { middleware as middlewareLogin } from "./middleware/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/IO-list")) {
    return middlewareLogin(request);
  }
}
