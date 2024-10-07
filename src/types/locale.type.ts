import { i18n } from "@/config/i18n.config"

/**
 * Represents a locale type derived from the `i18n` object's `locales` array.
 * This type is used to ensure that only valid locales defined in the `i18n.locales` array are used.
 */
export type Locale = (typeof i18n)["locales"][number]
