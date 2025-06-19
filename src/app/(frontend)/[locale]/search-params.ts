import {
  createSearchParamsCache,
  parseAsInteger,
  parseAsString,
} from "nuqs/server"

const searchParamsParsers = {
  category: parseAsString.withDefault(""),
  page: parseAsInteger.withDefault(1),
  title: parseAsString.withDefault(""),
}

export const searchParamsCache = createSearchParamsCache(searchParamsParsers)
