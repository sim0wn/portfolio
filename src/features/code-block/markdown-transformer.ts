import { MultilineElementTransformer } from "@payloadcms/richtext-lexical/lexical/markdown"

import { $createCodeBlockNode, $isCodeBlockNode, CodeBlockNode } from "./nodes"

const CODE_START_REGEX = /^[ \t]*```(\w+)?[ \t]*$/
const CODE_END_REGEX = /^[ \t]*```[ \t]*$/

const CodeBlockMarkdownTransformer: MultilineElementTransformer = {
  dependencies: [CodeBlockNode],
  export: (node) => {
    if (!$isCodeBlockNode(node)) {
      return null
    }
    const textContent = node.getTextContent()
    return ["```", node.getLanguage(), textContent, "```"].join("\n")
  },
  regExpEnd: {
    optional: true,
    regExp: CODE_END_REGEX,
  },
  regExpStart: CODE_START_REGEX,
  replace: (rootNode, _children, [, language], endMatch) => {
    if (!endMatch) {
      rootNode.append($createCodeBlockNode({ language }))
    }
  },
  type: "multiline-element",
}

export { CodeBlockMarkdownTransformer }
