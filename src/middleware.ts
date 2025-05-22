import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { headers } = request
  const origin = headers.get("origin")
  const hostname = request.nextUrl.hostname
  const response = NextResponse.next()

  if (
    (origin && /^https:\/\/(sim0wn\.com|sim0wn\.com\.br)$/.test(origin)) ||
    origin === "http://localhost:3000"
  ) {
    response.headers.set("Access-Control-Allow-Origin", origin)
    response.headers.set("Vary", "Origin")
  }

  // Set the `Accept-Language` header based on the hostname
  if (hostname.endsWith("sim0wn.com.br")) {
    response.headers.set("Accept-Language", "pt-BR")
  } else {
    response.headers.set("Accept-Language", "en-US")
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
