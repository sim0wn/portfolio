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

export function RichText({
  className,
  enableGutter = false,
  ...props
}: RichTextProps) {
  return (
    <ConvertedRichText
      className={cn(
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
        },
        [
          "prose dark:prose-invert prose-neutral",
          "prose-code:bg-muted/50 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:font-mono prose-code:transition-colors prose-code:hover:bg-muted/70 hover:prose-code:duration-200 prose-code:after:content-[''] prose-code:before:content-['']",
        ],
        "mx-auto",
        className,
      )}
      converters={jsxConverters}
      {...props}
    />
  )
}
