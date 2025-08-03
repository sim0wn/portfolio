import { MultilineElementTransformer } from "@payloadcms/richtext-lexical/lexical/markdown"

import { $createCalloutNode, CalloutNode, CalloutPayload } from "./nodes"

export const CalloutMarkdownTransformer: MultilineElementTransformer = {
  dependencies: [CalloutNode],
  // Export node as markdown
  export: (node) => {
    if (!(node instanceof CalloutNode)) {
      return null
    }
    const variant = node.getVariant()
    const title = node.getTitle() ?? ""
    const message = node.getMessage()
    return [`:::${variant}`, title, message, ":::"].join("\n")
  },
  regExpEnd: { optional: true, regExp: /^[ \t]*:::[ \t]*$/ },
  regExpStart: /^[ \t]*:::(info|warning|error|success)[ \t]*$/,
  replace: (rootNode, _children, [, variant], endMatch) => {
    if (!endMatch) {
      rootNode.append(
        $createCalloutNode({ variant: variant as CalloutPayload["variant"] }),
      )
    }
  },
  type: "multiline-element",
}
