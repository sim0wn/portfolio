import { i18n } from "@/config/i18n.config"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { headers } from "next/headers"

import { parseHeaders } from "./headers.util"
import { Locale } from "@/types/locale.type"

export async function getLocale(): Promise<Locale> {
  const { defaultLocale, locales } = i18n
  const preferredLanguages = new Negotiator({
    headers: parseHeaders(await headers()),
  }).languages(locales)
  return match(preferredLanguages, locales, defaultLocale)
}

export function getLocaleDomain(locale: Locale) {
  if (locale === "pt-BR") {
    return "sim0wn.com.br"
  } else if (locale === "en-US") {
    return "sim0wn.com"
  }
}
