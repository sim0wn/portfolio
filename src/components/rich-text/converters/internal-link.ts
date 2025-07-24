import { SerializedLinkNode } from "@payloadcms/richtext-lexical"

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
      return `/knowledge-base/${value.url}`
    default:
      return `/${relationTo}/${slug}`
  }
}
