import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  if (isMaintenanceMode) {
    const { pathname } = request.nextUrl;

    // Do not intercept the root page '/'
    if (pathname === "/") {
      return NextResponse.next();
    }

    // Do not intercept if the URL is already /maintenance
    if (pathname === "/maintenance") {
      return NextResponse.next();
    }

    // Ignore API routes, Next.js static files, and other assets
    if (
      pathname.startsWith("/api/") ||
      pathname.startsWith("/_next/") ||
      pathname.includes(".")
    ) {
      return NextResponse.next();
    }

    // Rewrite all other requests to the /maintenance page
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  return NextResponse.next();
}
