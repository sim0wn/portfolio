import {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical"
import {
  RichText as ConvertRichText,
  JSXConvertersFunction,
} from "@payloadcms/richtext-lexical/react"

import { cn } from "@/utils"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

type RichTextProps = React.HTMLAttributes<HTMLDivElement> & {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
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
          "prose md:prose-md darK:prose-invert mx-auto": enableProse,
        },
        className,
      )}
    />
  )
}
