import "server-only"

const dictionaries = {
  "en-US": () =>
    import("@/dictionaries/en-US.json").then((module) => module.default),
  "pt-BR": () =>
    import("@/dictionaries/pt-BR.json").then((module) => module.default),
}

export function getDictionary(locale: string) {
  return dictionaries[locale as keyof typeof dictionaries]()
}
