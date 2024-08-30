import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { hostname } = request.nextUrl
  const response = NextResponse.next()

  // ignore files in `public` directory and non-production requests
  if (
    ["/images"].includes(request.nextUrl.pathname) ||
    process.env.NODE_ENV !== "production"
  ) {
    return
  }

  // set the locale based on the domain
  if (hostname.endsWith(".com")) {
    response.headers.set("Accept-Language", "en-US")
  } else if (hostname.endsWith(".com.br")) {
    response.headers.set("Accept-Language", "pt-BR")
  }

  // return the modified response
  return response
}

export const config = {
  // matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
