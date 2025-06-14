import createMiddleware from "next-intl/middleware"

import { routing } from "@/i18n"

export default createMiddleware(routing)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - admin (PayloadCMS admin panel)
     */
    "/((?!admin|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}
