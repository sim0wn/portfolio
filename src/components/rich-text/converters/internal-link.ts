import { SerializedLinkNode } from "@payloadcms/richtext-lexical"
import { Breadcrumb } from "node_modules/@payloadcms/plugin-nested-docs/dist/types"

import { Book } from "@/types"

export function internalDocToHref({
  linkNode,
}: {
  linkNode: SerializedLinkNode
}) {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object")
  }
  const { slug } = value
  switch (relationTo) {
    case "pages":
      return `/books/${(value.book as Book).slug}${(value.breadcrumbs as Breadcrumb[]).find((b) => b.url?.includes(slug as string))?.url || slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}
