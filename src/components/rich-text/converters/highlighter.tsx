import {
  convertLexicalNodesToJSX,
  defaultJSXConverters,
  JSXConverters,
} from "@payloadcms/richtext-lexical/react"

import { SerializedHighlighterNode } from "@/features"
import { cn } from "@/utils"

import { jsxConverters } from "."

function Highlighter({ node }: { node: SerializedHighlighterNode }) {
  const children = convertLexicalNodesToJSX({
    converters: jsxConverters({ defaultConverters: defaultJSXConverters }),
    nodes: node.children,
    parent: node,
  })
  return (
    <span
      className={cn(
        "bg-secondary text-secondary-foreground rounded-sm px-1 py-0.5",
      )}
    >
      {children}
    </span>
  )
}

const HighlighterJSXConverter: JSXConverters<SerializedHighlighterNode> = {
  highlighter: ({ node }: { node: SerializedHighlighterNode }) => (
    <Highlighter node={node} />
  ),
}

export { HighlighterJSXConverter }
