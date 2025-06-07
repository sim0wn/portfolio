import { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { RichText as ConvertedRichText } from "@payloadcms/richtext-lexical/react"
import { HTMLAttributes } from "react"

import { cn } from "@/utils"

import { jsxConverters } from "./converters"

type RichTextProps = HTMLAttributes<HTMLDivElement> & {
  data: DefaultTypedEditorState
  enableGutter?: boolean
  enableProse?: boolean
}

export function RichText(props: RichTextProps) {
  const { className, enableGutter = false, enableProse = true, ...rest } = props
  return (
    <ConvertedRichText
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
