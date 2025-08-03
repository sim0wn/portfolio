import { JSXConverters } from "@payloadcms/richtext-lexical/react"
import { randomInt } from "crypto"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import { codeToHast } from "shiki"

import { SerializedCodeBlockNode } from "@/features"
import { cn } from "@/utils"

/**
 * Renders a themed, accessible code block with a fake Vim UI.
 * - Uses rose-pine for syntax theme.
 * - Adaptive to light/dark via Tailwind + CSS vars.
 * - Prevents overflow beyond parent container.
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

    return (
      <article
        className={cn(
          "not-prose bg-card border-border focus-within:ring-primary flex h-auto w-full flex-col overflow-hidden rounded-xl border font-mono shadow-lg transition-shadow duration-300 focus-within:ring-2 hover:shadow-2xl",
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
                  "text-card focus-visible:ring-primary block p-2 text-sm leading-relaxed whitespace-pre transition-shadow duration-200 outline-none focus-visible:ring-2",
                )}
                tabIndex={0}
              >
                {props.children}
              </code>
            ),
            pre: (props) => (
              <pre
                {...props}
                className={cn(
                  props.className,
                  // Remove default margin, provide flex sizing, no border, limit width/height.
                  "m-0 max-h-[80vh] w-full max-w-full min-w-0 flex-1 overflow-scroll border-0 p-0 outline-none",
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
        <footer className="bg-muted border-border flex w-full items-center border-t font-mono text-xs select-none">
          <span className="bg-secondary text-secondary-foreground rounded-bl px-3 py-1 font-bold">
            NORMAL
          </span>
          <span className="bg-popover text-popover-foreground border-border border-l px-2 py-1">
            main
          </span>
          {path && (
            <span className="bg-popover text-primary border-border flex-1 truncate border-l px-2 py-1 font-semibold">
              {path}
            </span>
          )}
          <span className="bg-popover text-muted-foreground border-border flex-1 border-l px-2 py-1"></span>
          <span className="bg-popover text-popover-foreground border-border border-l px-2 py-1">
            utf-8
          </span>
          <span className="bg-popover text-popover-foreground border-border border-l px-2 py-1">
            LF
          </span>
          <span className="bg-popover text-primary border-border border-l px-2 py-1">
            {language}
          </span>
          <span className="bg-destructive text-destructive-foreground px-3 py-1 font-semibold">
            100%
          </span>
          <span className="bg-popover text-popover-foreground border-border border-l px-2 py-1">
            {randomInt(code.length)}:{randomInt(code.length)}
          </span>
        </footer>
      </article>
    )
  },
}

export { CodeBlockJSXConverter }
