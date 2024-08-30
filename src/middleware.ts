import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const { hostname } = request.nextUrl

  // ignore files in `public` directory and non-production requests
  if (
    ["/images"].includes(request.nextUrl.pathname) ||
    process.env.NODE_ENV !== "production"
  ) {
    return
  }

  // set the locale based on the domain
  if (hostname.endsWith(".com")) {
    request.headers.set("Accept-Language", "en-US")
  } else if (hostname.endsWith(".com.br")) {
    request.headers.set("Accept-Language", "pt-BR")
  }
  return NextResponse.next()
}

export const config = {
  // matcher ignoring `/_next/` and `/api/`
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
