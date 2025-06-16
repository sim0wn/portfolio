import { routing } from "@/i18n"
import formats from "@/i18n/request.i18n"
import { messages } from "@/messages"

import { formats } from "./request.i18n"

type Messages = Awaited<ReturnType<(typeof messages)["pt-BR"]>>

declare module "next-intl" {
  interface AppConfig {
    Formats: typeof formats
    Locale: (typeof routing.locales)[number]
    Messages: Messages
  }
}
