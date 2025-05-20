import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { z } from "zod"

import { i18n } from "@/config"
import { Locale } from "@/types"
import { parseHeaders } from "@/utils"

export function getLocale(headers: Headers) {
  const { defaultLocale, locales: i18nLocales } = i18n
  const locales = Object.keys(i18nLocales)
  const preferredLanguages = new Negotiator({
    headers: parseHeaders(headers),
  }).languages(locales)
  return match(preferredLanguages, locales, defaultLocale) as Locale
}

export function getLocaleDomain(locale: Locale) {
  const schema = z.enum(["en-US", "pt-BR"])
  const parsedLocale = schema.safeParse(locale)
  if (parsedLocale.success) {
    const locale = parsedLocale.data
    if (locale === "pt-BR") {
      return "sim0wn.com.br"
    }
  }
  return "sim0wn.com"
}
