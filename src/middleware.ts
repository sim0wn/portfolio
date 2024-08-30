import { NextRequest, NextResponse } from "next/server"

import { getLocale } from "./utils/locale.utils"

export function middleware(request: NextRequest) {
  const url = new URL(request.url)

  // ignore files in `public` directory and non-production requests
  if (
    ["/images"].includes(request.nextUrl.pathname) ||
    process.env.NODE_ENV !== "production"
  ) {
    return
  }

  // determine the locale based on the domain
  const locale = getLocale(request.headers)
  if (locale === "en-US") {
    url.hostname = "sim0wn.com"
  } else if (locale === "pt-BR") {
    url.hostname = "sim0wn.com.br"
  }
  return NextResponse.redirect(url.toString())
}

export const config = {
  // matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
