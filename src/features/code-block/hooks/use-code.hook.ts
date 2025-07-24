import {
  $getSelection,
  $isRangeSelection,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { useCallback } from "react"

import { $createCodeBlockNode } from "../nodes"

export function useCode() {
  const [editor] = useLexicalComposerContext()

  const createCode = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.extract()
        // If no nodes are selected, do nothing
        if (nodes.length === 0) return true
        nodes[0].insertAfter(
          $createCodeBlockNode({
            code: nodes.map((node) => node.getTextContent()).join("\n"),
          }),
        )
        nodes.forEach((node) => {
          node.remove()
        })
      }
    })
  }, [editor])

  return { createCode }
}
