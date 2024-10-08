import { Faq } from "@/types/sanity-schema.type"
import { getLocale } from "@/utils/locale.util"
import { sanityClient } from "./sanity-client.lib"

export async function findAllFAQs() {
  return (await sanityClient.fetch(
    `*[_type == 'faq' && locale == $locale] | order(title asc)`,
    { locale: getLocale() },
  )) as Faq[]
}
