import {
  DefaultNodeTypes,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical"
import { JSXConverters } from "@payloadcms/richtext-lexical/react"
import NextImage from "next/image"

function ImageWithCaption({ node }: { node: SerializedUploadNode }) {
  if (node.relationTo !== "images" || typeof node.value !== "object") {
    return null
  }
  const { alt, caption, height, sizes: imageSizes, url, width } = node.value
  const sizes = [
    // map over any provided sizes (or empty if none)
    ...Object.values({ ...imageSizes })
      .filter((size) => size?.width && size?.url)
      .map(({ url, width }) => `${url} ${width}w`),
    // always include the original image
    `${url} ${width}w`,
  ].join(", ")

  return (
    <figure className="mx-auto w-fit">
      <NextImage
        alt={alt}
        blurDataURL={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8Mvd/PQAILgMRNprRMgAAAABJRU5ErkJggg=="
        }
        className="rounded-md"
        height={height ?? 0}
        placeholder="blur"
        priority
        sizes={sizes}
        src={url ?? ""}
        width={width ?? 0}
      />
      {caption && <figcaption className="text-center">{caption}</figcaption>}
    </figure>
  )
}

const UploadJSXConverter: JSXConverters<DefaultNodeTypes> = {
  upload: ({ node }) => <ImageWithCaption node={node} />,
}

export { UploadJSXConverter }
