import {RichText as ConvertRichText,} from "@payloadcms/richtext-lexical/react"

import {cn} from "@/utils"

import {RichTextProps} from "./types";
import {jsxConverters} from "./utils";

export function RichText(props: RichTextProps) {
    const {className, enableGutter = false, enableProse = true, ...rest} = props
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
