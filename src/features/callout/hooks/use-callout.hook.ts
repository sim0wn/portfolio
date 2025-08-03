import {
  $getSelection,
  $isRangeSelection,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { useCallback } from "react"

import { $createCalloutNode } from "../nodes"

export function useCallout() {
  const [editor] = useLexicalComposerContext()

  const createCallout = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.extract()
        // If no nodes are selected, do nothing
        if (nodes.length === 0) return true
        nodes[0].insertAfter(
          $createCalloutNode({
            message: nodes.map((node) => node.getTextContent()).join(""),
          }),
        )
        nodes.forEach((node) => {
          node.remove()
        })
      }
    })
  }, [editor])

  return { createCallout }
}
