import { i18n } from "@/config/i18n.config"

// define the type of the locale
export type Locale = (typeof i18n)["locales"][number]
