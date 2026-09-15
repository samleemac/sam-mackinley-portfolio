import { NextResponse, type NextRequest } from "next/server";

const ACCESS_COOKIE = "studio_access";
const ACCESS_VALUE = "granted";

export function proxy(request: NextRequest) {
  if (request.cookies.get(ACCESS_COOKIE)?.value === ACCESS_VALUE) {
    return NextResponse.next();
  }

  // Rewrite (not redirect) to the gate: the URL in the address bar stays put,
  // and no Location header is sent — important because responses travel
  // through the sammackinley.com rewrite, where an absolute redirect would
  // leak the internal .vercel.app host.
  const url = request.nextUrl.clone();
  const requested = `${url.pathname}${url.search}`; // basePath-stripped
  url.pathname = "/gate";
  url.search = `?next=${encodeURIComponent(requested)}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except the gate itself, its submit endpoint, Next internals,
  // and static files (any path containing a dot).
  matcher: ["/", "/((?!gate|api/gate|_next|.*\\..*).*)"],
};
