import { SerializedBlockNode } from "@payloadcms/richtext-lexical"
import { toJsxRuntime } from "hast-util-to-jsx-runtime"
import { Fragment } from "react"
import { jsx, jsxs } from "react/jsx-runtime"
import { codeToHast } from "shiki"

import { cn } from "@/utils"

/**
 * Props for the CodeBlock component.
 */
export type CodeBlockProps = {
  code: string
  filename?: string
  language: string
  showLineNumbers?: boolean
}

/**
 * Renders a themed, accessible code block with a fake terminal UI.
 * - Uses rose-pine for syntax theme.
 * - Adaptive to light/dark via Tailwind + CSS vars.
 *
 * @param node - serialized block node with code and meta
 */
export async function CodeBlockComponent({
  node,
}: {
  node: SerializedBlockNode<CodeBlockProps>
}) {
  const { code, filename, language } = node.fields
  const hast = await codeToHast(code, {
    lang: language ?? "text",
    themes: { dark: "rose-pine", light: "rose-pine-dawn" },
  })

  // Colors and sizing use the design system (8px grid, muted palette).
  return (
    <figure
      aria-label={`Code block: ${language}${filename ? `, file ${filename}` : ""}`}
      className={cn(
        "not-prose bg-card focus-within:ring-primary flex w-full flex-col overflow-hidden rounded-xl border font-mono shadow-lg transition-shadow duration-300 focus-within:ring-2 hover:shadow-2xl",
      )}
      role="region"
      tabIndex={0}
    >
      {/* Header Bar */}
      <figcaption className="bg-popover flex h-10 items-center justify-between gap-3 border-b px-4 py-2 select-none">
        <div className="flex flex-col justify-center gap-0.5">
          <span className="text-muted-foreground font-mono text-xs">
            Terminal
          </span>
          <span className="text-foreground font-mono text-xs tracking-tight">
            root@sim0wn.rocks:~
          </span>
        </div>
        <span
          aria-label="Terminal status"
          className="border-muted bg-muted size-4 rounded-full border shadow"
        />
      </figcaption>

      {/* Code Content */}
      <div className="bg-card relative flex-1">
        {toJsxRuntime(hast, {
          components: {
            code: (props) => (
              <code
                {...props}
                aria-label={filename ? `Code from ${filename}` : "Code content"}
                className={cn(
                  props.className,
                  "focus-visible:ring-primary block overflow-x-auto p-4 text-sm leading-relaxed whitespace-pre transition-shadow duration-200 outline-none focus-visible:ring-2",
                )}
                tabIndex={0}
              />
            ),
            pre: (props) => (
              <pre
                {...props}
                className={cn(
                  props.className,
                  "m-0 max-w-full min-w-0 flex-1 border-0 bg-transparent p-0 outline-none",
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
      </div>

      {/* Status Bar */}
      <div className="border-border bg-muted flex h-8 items-center border-t font-mono text-xs select-none">
        <span className="bg-chart-4 text-card rounded-bl px-3 py-1 font-bold">
          NORMAL
        </span>
        <span className="border-border bg-popover text-muted-foreground border-l px-2 py-1">
           main
        </span>
        <span className="border-border bg-popover text-primary flex-1 truncate border-l px-2 py-1 font-semibold">
          {filename ?? "%"}
        </span>
        <span className="border-border bg-popover text-muted-foreground border-l px-2 py-1">
          Ln 1, Col 1
        </span>
        <span className="border-border bg-popover text-muted-foreground flex-1 border-l px-2 py-1"></span>
        <span className="border-border bg-popover text-muted-foreground border-l px-2 py-1">
          utf-8
        </span>
        <span className="border-border bg-popover text-muted-foreground border-l px-2 py-1">
          LF
        </span>
        <span className="border-border bg-popover text-primary border-l px-2 py-1">
          {language}
        </span>
        <span className="bg-destructive rounded-br px-3 py-1 font-semibold text-white">
          100%
        </span>
      </div>
    </figure>
  )
}

const CodeBlockJSXConverter = { codeBlock: CodeBlockComponent }

export { CodeBlockJSXConverter }
