import { Service } from "@/types/sanity-schema.type"
import { getLocale } from "@/utils/locale.util"
import { defineQuery } from "groq"
import { sanityClient } from "./sanity-client.lib"

export async function findAllServices() {
  return (await sanityClient.fetch(
    defineQuery("*[_type == 'service' && localization == $localization]"),
    {
      localization: getLocale(),
    },
  )) as Service[]
}
