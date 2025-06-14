import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"

import { routing } from "./routing.i18n"

// dynamically import the message files
const messages = {
  "en-US": async () => (await import("@/messages/en-US.json")).default,
  "pt-BR": async () => (await import("@/messages/pt-BR.json")).default,
}

type Messages = Awaited<ReturnType<(typeof messages)["pt-BR"]>> // "pt-BR" is the default locale

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

export type { Messages }
