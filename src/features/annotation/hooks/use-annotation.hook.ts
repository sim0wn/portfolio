import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { $wrapNodeInElement } from "@payloadcms/richtext-lexical/lexical/utils"
import { useCallback } from "react"

import {
  $createAnnotationNode,
  $isAnnotationNode,
  AnnotationPayload,
} from "../nodes"

export function useAnnotation() {
  const [editor] = useLexicalComposerContext()

  const toggleAnnotation = useCallback(
    (note = "") => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const nodes = selection.extract()

          nodes.forEach((node) => {
            const parent = node.getParent()
            const children = parent?.getChildren()
            if ($isAnnotationNode(parent)) {
              children?.forEach((child) => {
                parent.insertBefore(child)
              })
              parent.remove()
            } else {
              if (nodes.some($isAnnotationNode)) {
                if ($isAnnotationNode(node)) {
                  node.getChildren().forEach((child) => {
                    node.insertBefore(child)
                  })
                  node.remove()
                }
              } else {
                $wrapNodeInElement(node, () => $createAnnotationNode(note))
              }
            }
          })
        }
      })
    },
    [editor],
  )

  const updateAnnotation = useCallback(
    ({ note }: AnnotationPayload, nodeKey: string) => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey)
        if (node && $isAnnotationNode(node)) {
          node.setNote(note)
        }
      })
    },
    [editor],
  )

  return {
    toggleAnnotation,
    updateAnnotation,
  }
}
