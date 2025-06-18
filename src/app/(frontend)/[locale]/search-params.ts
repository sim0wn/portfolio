import { createSearchParamsCache, parseAsString } from "nuqs/server"

const searchParamsParsers = {
  tab: parseAsString,
}

export const searchParamsCache = createSearchParamsCache(searchParamsParsers, {
  urlKeys: { tab: "t" },
})
