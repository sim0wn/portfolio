export const i18n = {
  defaultLocale: "en-US",
  locales: ["en-US", "pt-BR"],
}

export type Locale = (typeof i18n)["locales"][number]
