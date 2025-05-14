import { Locale } from "@/types"
import "server-only" // avoid importing this module on the client-side

// dynamically import the translation files
const dictionaries = {
  "en-US": async () => (await import("@/dictionaries/en-US.json")).default,
  "pt-BR": async () => (await import("@/dictionaries/pt-BR.json")).default,
}

type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en-US"]>> // "en-US" is the default locale

export async function getDictionary(locale: Locale) {
  // select the translation file based on the locale or fallback to "en-US"
  return (
    dictionaries[locale as keyof typeof dictionaries] || dictionaries["en-US"]
  )()
}

export type { Dictionary }
