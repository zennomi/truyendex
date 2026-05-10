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

    // Do not intercept specific nettrom pages
    if (
      pathname === "/nettrom/theo-doi" ||
      pathname === "/nettrom/lich-su" ||
      pathname === "/dang-nhap"
    ) {
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
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-original-path", pathname);

    return NextResponse.rewrite(new URL("/maintenance", request.url), {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}
