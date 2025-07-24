import { JSXConverters } from "@payloadcms/richtext-lexical/react"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import { codeToHast } from "shiki"

import { ScrollArea } from "@/components/ui"
import { SerializedCodeBlockNode } from "@/features"
import { cn } from "@/utils"

/**
 * Renders a themed, accessible code block with a fake Vim UI.
 * - Uses rose-pine for syntax theme.
 * - Adaptive to light/dark via Tailwind + CSS vars.
 *
 * @param node - serialized code node with code and meta
 */
const CodeBlockJSXConverter: JSXConverters<SerializedCodeBlockNode> = {
  codeBlock: async ({ node }: { node: SerializedCodeBlockNode }) => {
    const { code, language, path } = node
    const hast = await codeToHast(code, {
      lang: language ?? "text",
      themes: { dark: "rose-pine", light: "rose-pine-dawn" },
    })

    // Colors and sizing use the design system (8px grid, muted palette).
    return (
      <article
        className={cn(
          "not-prose bg-card focus-within:ring-primary flex w-full flex-col overflow-hidden rounded-xl border font-mono shadow-lg transition-shadow duration-300 focus-within:ring-2 hover:shadow-2xl",
        )}
        role="region"
        tabIndex={0}
      >
        {/* Code Content */}
        {toJsxRuntime(hast, {
          components: {
            code: (props) => (
              <code
                {...props}
                className={cn(
                  props.className,
                  "focus-visible:ring-primary block overflow-x-auto p-2 text-sm leading-relaxed whitespace-pre transition-shadow duration-200 outline-none focus-visible:ring-2",
                )}
                tabIndex={0}
              >
                <ScrollArea className="max-h-[60vh] w-full">
                  {props.children}
                </ScrollArea>
              </code>
            ),
            pre: (props) => (
              <pre
                {...props}
                className={cn(
                  props.className,
                  "m-0 max-w-full min-w-0 flex-1 border-0 p-0 outline-none",
                )}
                data-custom-codeblock
                tabIndex={-1}
              />
            ),
          },
          Fragment,
          jsx,
          jsxs,
        })}

        {/* Status Bar */}
        <footer className="bg-muted flex items-center border-t font-mono text-xs select-none">
          <span className="bg-chart-4 text-card rounded-bl px-3 py-1 font-bold">
            NORMAL
          </span>
          <span className="bg-popover text-muted-foreground border-l px-2 py-1">
            main
          </span>
          {path && (
            <span className="bg-popover text-primary flex-1 truncate border-l px-2 py-1 font-semibold">
              {path}
            </span>
          )}
          <span className="bg-popover text-muted-foreground flex-1 border-l px-2 py-1"></span>
          <span className="bg-popover text-muted-foreground border-l px-2 py-1">
            utf-8
          </span>
          <span className="bg-popover text-muted-foreground border-l px-2 py-1">
            LF
          </span>
          <span className="bg-popover text-primary border-l px-2 py-1">
            {language}
          </span>
          <span className="bg-destructive px-3 py-1 font-semibold text-white">
            100%
          </span>
          <span className="bg-popover text-muted-foreground border-l px-2 py-1">
            {code.length}:{code.length}
          </span>
        </footer>
      </article>
    )
  },
}

export { CodeBlockJSXConverter }
