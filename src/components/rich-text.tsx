import {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical"
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react"
import { Breadcrumb } from "node_modules/@payloadcms/plugin-nested-docs/dist/types"

import { Book } from "@/types"
import { cn } from "@/utils"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

type RichTextProps = React.HTMLAttributes<HTMLDivElement> & {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
}

function internalDocToHref({ linkNode }: { linkNode: SerializedLinkNode }) {
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

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

export default function RichText(props: RichTextProps) {
  const { className, enableGutter = false, enableProse = true, ...rest } = props
  return (
    <ConvertRichText
      converters={jsxConverters}
      {...rest}
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "prose dark:prose-invert prose-neutral mx-auto": enableProse,
        },
        className,
      )}
    />
  )
}
