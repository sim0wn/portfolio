import {
  DefaultNodeTypes,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical"
import { JSXConverters } from "@payloadcms/richtext-lexical/react"
import NextImage from "next/image"

function ImageWithCaption({ node }: { node: SerializedUploadNode }) {
  if (node.relationTo === "media") {
    if (typeof node.value !== "object") {
      return null
    }
    // Create a custom component to render the Image with a caption
    const { alt, height, url, width } = node.value
    return (
      <figure className="mx-auto w-fit">
        <NextImage
          alt={alt}
          className="rounded-md"
          height={height || 0}
          src={url || ""}
          width={width || 0}
        />
        <figcaption className="text-center">{alt}</figcaption>
      </figure>
    )
  }
  return null
}

const UploadJSXConverter: JSXConverters<DefaultNodeTypes> = {
  upload: ({ node }) => <ImageWithCaption node={node} />,
}

export { UploadJSXConverter }
