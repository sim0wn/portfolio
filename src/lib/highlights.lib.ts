import { Highlight } from "@/types/sanity-schema.type"
import { getLocale } from "@/utils/locale.util"
import { sanityClient } from "./sanity-client.lib"

export async function findAllHighlights() {
  return (await sanityClient.fetch(
    `*[_type == 'highlight' && locale == $locale] | order(title asc)`,
    { locale: await getLocale() },
  )) as Highlight[]
}
