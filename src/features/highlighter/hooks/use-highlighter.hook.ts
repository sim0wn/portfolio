import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement } from "@lexical/utils"
import { $getSelection, $isRangeSelection } from "lexical"
import { useCallback } from "react"

import { $createHighlighterNode, $isHighlighterNode } from "../nodes"

export function useHighlighter() {
  const [editor] = useLexicalComposerContext()

  const toggleHighlighter = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const nodes = selection.extract()

        nodes.forEach((node) => {
          const parent = node.getParent()
          const children = parent?.getChildren()
          if ($isHighlighterNode(parent)) {
            children?.forEach((child) => {
              parent.insertBefore(child)
            })
            parent.remove()
          } else {
            // If any of its children are highlighters nodes, unwrap them
            if (nodes.some($isHighlighterNode)) {
              if ($isHighlighterNode(node)) {
                node.getChildren().forEach((child) => {
                  node.insertBefore(child)
                })
                node.remove()
              }
            } else {
              // If not the node, nor its children are highlighters, wrap it in a highlighter node
              $wrapNodeInElement(node, () => $createHighlighterNode())
            }
          }
        })
      }
    })
  }, [editor])
  return { toggleHighlighter }
}
