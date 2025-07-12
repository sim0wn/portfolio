import type { ElementTransformer } from "@payloadcms/richtext-lexical/lexical/markdown"

import {
  $createHighlighterNode,
  $isHighlighterNode,
  HighlighterNode,
} from "../nodes"

export const HighlighterMarkdownTransformer: ElementTransformer = {
  dependencies: [HighlighterNode],
  export: (node, exportChildren) => {
    if ($isHighlighterNode(node)) {
      return `==${exportChildren(node)}==`
    }
    return null
  },
  regExp: /^==([^=]+)==$/,
  replace: (parentNode) => {
    const node = $createHighlighterNode()
    if (node) {
      parentNode.replace(node)
    }
  },
  type: "element",
}
