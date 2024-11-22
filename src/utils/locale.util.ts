import { i18n } from "@/config/i18n.config"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"
import { headers } from "next/headers"

import { parseHeaders } from "./headers.util"

/**
 * Retrieves the best matching locale based on the preferred languages
 * from the request headers.
 *
 * This function uses the `negotiator` and `intl-localematcher` libraries
 * to determine the most appropriate locale from the available locales.
 *
 * @returns {string} The best matching locale.
 */
export function getLocale(): string {
  const { defaultLocale, locales } = i18n
  const preferredLanguages = new Negotiator({
    headers: parseHeaders(headers()),
  }).languages(locales)
  return match(preferredLanguages, locales, defaultLocale)
}

/**
 * Returns the domain associated with the given locale.
 *
 * @param locale - The locale string (e.g., "pt-BR", "en-US").
 * @returns The domain corresponding to the provided locale.
 */
export function getLocaleDomain(locale: string) {
  if (locale === "pt-BR") {
    return "sim0wn.com.br"
  } else if (locale === "en-US") {
    return "sim0wn.com"
  }
}
