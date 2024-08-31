import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

// transform the headers into a simple object
export function parseHeaders(headers: ReadonlyHeaders): Record<string, string> {
  const negotiatorHeaders: Record<string, string> = {}
  headers.forEach((value: string, key: string) => {
    negotiatorHeaders[key] = value
  })
  return negotiatorHeaders
}
