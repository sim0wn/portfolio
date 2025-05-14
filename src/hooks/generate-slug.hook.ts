import { slugify } from "@/utils"
import { FieldHookArgs } from "payload"

export function generateSlug({ data, operation }: FieldHookArgs) {
  if (operation === "create" || operation === "update") {
    return slugify(data?.title)
  }
  return data?.slug
}
