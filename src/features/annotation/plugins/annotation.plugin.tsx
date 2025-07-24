"use client"

import { PluginComponent } from "@payloadcms/richtext-lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import { useTranslation } from "@payloadcms/ui"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import "./styles.scss"
import { useAnnotation } from "../hooks"
import { $isAnnotationNode, AnnotationNode, AnnotationPayload } from "../nodes"

const TOGGLE_ANNOTATION_COMMAND = createCommand("toggleAnnotation")
const UPDATE_ANNOTATION_COMMAND = createCommand("updateAnnotation")

const AnnotationPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const [node, setNode] = useState<AnnotationNode | null>(null)
  const [selection, setSelection] = useState<null | {
    end: number
    start: number
  }>(null)
  const { t } = useTranslation<
    object,
    | "lexical:annotation:form:note:label"
    | "lexical:annotation:form:note:placeholder"
  >()
  const dialogRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)
  const [position, setPosition] = useState<null | {
    left: number
    top: number
  }>(null)
  const { toggleAnnotation, updateAnnotation } = useAnnotation()

  // Register the custom commands
  useEffect(() => {
    if (!editor.hasNodes([AnnotationNode])) {
      throw new Error("AnnotationPlugin: AnnotationNode not registered.")
    }
    const updateNode = () => {
      const selection = $getSelection()
      if ($isRangeSelection(selection)) {
        const node = selection.anchor.getNode()
        const parent = node.getParent()
        if ($isAnnotationNode(parent)) {
          setNode(parent)
        } else {
          setNode(null)
        }
      }
    }
    editor.read(() => updateNode())
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateNode()
        })
      }),
      editor.registerCommand(
        TOGGLE_ANNOTATION_COMMAND,
        (payload: AnnotationPayload = { note: "" }) => {
          toggleAnnotation(payload?.note)
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        UPDATE_ANNOTATION_COMMAND,
        (payload: AnnotationPayload & { nodeKey: string }) => {
          if (node) {
            updateAnnotation({ note: payload.note }, node.getKey())
          }
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor, node, toggleAnnotation, updateAnnotation])

  useLayoutEffect(() => {
    if (!node) {
      return
    }
    // Aguarda o próximo frame para garantir que o DOM foi atualizado
    requestAnimationFrame(() => {
      const dom = editor.getElementByKey(node.getKey())
      if (dom) {
        const bounding = dom.getBoundingClientRect()
        setPosition({
          left: bounding.left + window.scrollX + bounding.width / 2,
          top: Math.max(bounding.top + window.scrollY + 28, 8),
        })
        if (dialogRef.current) {
          dialogRef.current.style.opacity = "1"
          if (noteRef.current) {
            noteRef.current.focus({ preventScroll: true })
          }
        }
      }
    })
  }, [editor, node])

  if (!node || !dialogRef || !noteRef) return null

  // Render the UI for editing annotations
  return createPortal(
    <div
      className="annotation"
      ref={dialogRef}
      role="dialog"
      style={{
        left: position?.left,
        top: position?.top,
      }}
      tabIndex={-1}
    >
      <div className="field-type textarea" style={{ width: "100%" }}>
        <div className="field-type__wrap">
          <div className="textarea-outer">
            <textarea
              aria-label={t("lexical:annotation:form:note:label")}
              onChange={(e) => {
                setSelection({
                  end: e.target.selectionEnd,
                  start: e.target.selectionStart,
                })
                editor.dispatchCommand(UPDATE_ANNOTATION_COMMAND, {
                  nodeKey: node.getKey(),
                  note: e.target.value,
                })
              }}
              onFocus={() => {
                if (noteRef.current) {
                  if (selection) {
                    noteRef.current.setSelectionRange(
                      selection.start,
                      selection.end,
                    )
                  } else {
                    const length = node.getNote().length
                    noteRef.current.setSelectionRange(length, length)
                  }
                }
              }}
              placeholder={t("lexical:annotation:form:note:placeholder")}
              ref={noteRef}
              rows={3}
              value={node.getNote()}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export { AnnotationPlugin, TOGGLE_ANNOTATION_COMMAND }
