import {
  convertLexicalNodesToJSX,
  defaultJSXConverters,
  JSXConverters,
} from "@payloadcms/richtext-lexical/react"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui"
import { SerializedAnnotationNode } from "@/features"

import { jsxConverters } from "."

function Annotation({ node }: { node: SerializedAnnotationNode }) {
  const children = convertLexicalNodesToJSX({
    converters: jsxConverters({ defaultConverters: defaultJSXConverters }),
    nodes: node.children,
    parent: node,
  })
  return (
    <Tooltip>
      <TooltipTrigger className="decoration-accent-foreground underline decoration-dotted">
        {children}
      </TooltipTrigger>
      <TooltipContent>{node.note}</TooltipContent>
    </Tooltip>
  )
}

const AnnotationJSXConverter: JSXConverters<SerializedAnnotationNode> = {
  annotation: ({ node }: { node: SerializedAnnotationNode }) => (
    <Annotation node={node} />
  ),
}

export { AnnotationJSXConverter }
