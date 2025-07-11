import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $wrapNodeInElement } from "@lexical/utils"
import { $getNodeByKey, $getSelection, $isRangeSelection } from "lexical"
import { useCallback } from "react"

import { $createAnnotationNode, $isAnnotationNode } from "../nodes"

export function useAnnotation() {
  const [editor] = useLexicalComposerContext()

  const createAnnotation = useCallback(
    (note: string) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const nodes = selection.extract()
          const annotationNode = $createAnnotationNode(note)

          nodes.forEach((node) => {
            if (!$isAnnotationNode(node)) {
              $wrapNodeInElement(node, () => annotationNode)
            }
          })
        }
      })
    },
    [editor],
  )

  const updateAnnotation = useCallback(
    (nodeKey: string, newNote: string) => {
      editor.update(() => {
        const node = $getNodeByKey(nodeKey)
        if (node && $isAnnotationNode(node)) {
          node.setNote(newNote)
        }
      })
    },
    [editor],
  )

  const removeAnnotation = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection()
      const nodes = selection?.getNodes()
      nodes?.forEach((node) => {
        const parent = node.getParent()

        if ($isAnnotationNode(parent)) {
          const children = parent.getChildren()

          children.forEach((child) => {
            parent.insertBefore(child)
          })

          parent.remove()
        }
      })
    })
  }, [editor])

  return {
    createAnnotation,
    removeAnnotation,
    updateAnnotation,
  }
}
