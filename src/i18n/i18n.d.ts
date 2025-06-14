import { formats, Messages } from "./request.i18n"
import { routing } from "./routing.i18n"

declare module "next-intl" {
  interface AppConfig {
    Formats: typeof formats
    Locale: (typeof routing.locales)[number]
    Messages: Messages
  }
}
