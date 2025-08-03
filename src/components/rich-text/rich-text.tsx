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

export function RichText({ className, ...props }: RichTextProps) {
  return (
    <ConvertedRichText
      className={cn(className)}
      converters={jsxConverters}
      {...props}
    />
  )
}
