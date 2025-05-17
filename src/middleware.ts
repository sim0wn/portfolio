import { NextRequest, NextResponse } from "next/server"

import { getLocale, getLocaleDomain } from "./utils"

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

  if (hostname === "sim0wn.com" || hostname === "sim0wn.com.br") {
    // get the locale from the request headers
    const locale = getLocale(headers)
    const localeDomain = getLocaleDomain(locale)

    // redirect to the correct domain if the locale domain is different
    if (hostname !== localeDomain) {
      request.nextUrl.hostname = localeDomain
      return NextResponse.redirect(request.nextUrl, 301)
    }
  }

  // return the modified response
  return response
}

export const config = {
  // matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
