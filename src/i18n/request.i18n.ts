import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { messages } from "@/messages"

import { routing } from "./routing.i18n"

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: await messages[locale](),
  }
})
