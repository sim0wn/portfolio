import "server-only" // avoid importing this module on the client-side

// dynamically import the translation files
const translations = {
  "en-US": async () => (await import("@/translations/en-US.json")).default,
  "pt-BR": async () => (await import("@/translations/pt-BR.json")).default,
}

type Translation = Awaited<ReturnType<(typeof translations)["en-US"]>>

export async function getTranslation(locale: string) {
  // select the translation file based on the locale or fallback to "en-US"
  const loadTranslation =
    translations[locale as keyof typeof translations] || translations["en-US"]
  return loadTranslation()
}

export type { Translation }
