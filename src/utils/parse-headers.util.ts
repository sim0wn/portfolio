import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

/**
 * Parses the given headers and returns them as a record of key-value pairs.
 *
 * @param headers - The headers to parse, provided as a ReadonlyHeaders object.
 * @returns A record where each key is a header name and each value is the corresponding header value.
 */
export function parseHeaders(headers: ReadonlyHeaders): Record<string, string> {
  const negotiatorHeaders: Record<string, string> = {}
  headers.forEach((value: string, key: string) => {
    negotiatorHeaders[key] = value
  })
  return negotiatorHeaders
}
