import { i18n } from "@/config/i18n.config"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers"

export function getLocale(headers: ReadonlyHeaders) {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {}
  headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // use negotiator and intl-localematcher to get best locale
  const { defaultLocale, locales } = i18n
  const preferredLanguages = new Negotiator({
    headers: negotiatorHeaders,
  }).languages(locales)

  const locale = match(preferredLanguages, locales, defaultLocale)
  return locale
}
