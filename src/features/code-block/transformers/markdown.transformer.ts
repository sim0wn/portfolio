import { ElementTransformer } from "@payloadcms/richtext-lexical/lexical/markdown"

import { $createCodeBlockNode, $isCodeBlockNode, CodeBlockNode } from "../nodes"

const CodeBlockMarkdownTransformer: ElementTransformer = {
  dependencies: [CodeBlockNode],
  export(node) {
    if ($isCodeBlockNode(node)) {
      return `\`\`\`${node.getLanguage()}\n// ${node.getPath()}\n${node.getCode()}\n\`\`\``
    }
    return null
  },
  regExp: /```(\w+)?\n([\s\S]+?)\n```/g,
  replace(parentNode, _children, match) {
    const [, language, path, code] = match
    const codeNode = $createCodeBlockNode({ code, language, path })
    parentNode.replace(codeNode)
  },
  type: "element",
}

export { CodeBlockMarkdownTransformer }
