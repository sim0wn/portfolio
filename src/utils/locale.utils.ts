import { i18n } from "@/config/i18n.config"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { headers } from "next/headers"

import { parseHeaders } from "./headers.utils"

export function getLocale() {
  // use negotiator and intl-localematcher to get best locale
  const { defaultLocale, locales } = i18n
  // get the preferred languages from the headers
  const preferredLanguages = new Negotiator({
    headers: parseHeaders(headers()), // parse headers as a simple object
  }).languages(locales)
  // return the best locale
  return match(preferredLanguages, locales, defaultLocale)
}

export function getLocaleDomain(locale: string) {
  if (locale === "pt-BR") {
    return "sim0wn.com.br"
  } else if (locale === "en-US") {
    return "sim0wn.com"
  }
}
