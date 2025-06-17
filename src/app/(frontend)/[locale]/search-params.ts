import { createSearchParamsCache, parseAsString } from "nuqs/server"

const searchParamsParsers = {
  tab: parseAsString.withDefault("event"),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParsers, {
  urlKeys: { tab: "t" },
})
