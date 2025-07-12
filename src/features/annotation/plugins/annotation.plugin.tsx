"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { mergeRegister } from "@lexical/utils"
import { PluginComponent } from "@payloadcms/richtext-lexical"
import { useTranslation, XIcon } from "@payloadcms/ui"
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import "./index.scss"
import { useAnnotation } from "../hooks"
import { $isAnnotationNode, AnnotationNode, AnnotationPayload } from "../nodes"

const TOGGLE_ANNOTATION_COMMAND = createCommand("toggleAnnotation")

const AnnotationPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const [note, setNote] = useState("")
  const [nodeKey, setNodeKey] = useState<null | string>(null)
  const { t } = useTranslation<
    object,
    | "lexical:annotation:form:note:label"
    | "lexical:annotation:form:note:placeholder"
    | "lexical:annotation:form:submit"
    | "lexical:annotation:label"
  >()
  const dialogRef = useRef<HTMLDivElement>(null)
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
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const selection = $getSelection()
          if ($isRangeSelection(selection)) {
            const node = selection.anchor.getNode()
            const parent = node.getParent()
            if ($isAnnotationNode(parent)) {
              setNodeKey(parent.getKey())
              return
            }
          }
          setNodeKey(null)
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
    )
  }, [editor, toggleAnnotation])

  useEffect(() => {
    if (!nodeKey) {
      return
    }
    editor.getEditorState().read(() => {
      const node = $getNodeByKey(nodeKey)
      if ($isAnnotationNode(node)) {
        setNote(node.getNote())
      }
    })
  }, [editor, nodeKey])

  useLayoutEffect(() => {
    if (!nodeKey) {
      return
    }
    // Aguarda o próximo frame para garantir que o DOM foi atualizado
    requestAnimationFrame(() => {
      const dom = editor.getElementByKey(nodeKey)
      if (dom) {
        const bounding = dom.getBoundingClientRect()
        setPosition({
          left: bounding.left + window.scrollX + bounding.width / 2,
          top: Math.max(bounding.top + window.scrollY + 28, 8),
        })
        if (dialogRef.current) {
          dialogRef.current.style.opacity = "1"
        }
      }
    })
  }, [editor, nodeKey])

  if (!nodeKey) return null

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
      <header>
        <span>{t("lexical:annotation:label")}</span>
        <button
          onClick={() =>
            editor.dispatchCommand(TOGGLE_ANNOTATION_COMMAND, null)
          }
        >
          <XIcon />
        </button>
      </header>
      <div>
        <div>
          <label className="annotation-label" htmlFor="annotation-note">
            {t("lexical:annotation:form:note:label")}
          </label>
          <textarea
            aria-label="Editar anotação"
            id="annotation-note"
            onChange={(e) => setNote(e.target.value)}
            placeholder={t("lexical:annotation:form:note:placeholder")}
            value={note}
          />
        </div>
        <button onClick={() => updateAnnotation(nodeKey, note)}>
          {t("lexical:annotation:form:submit")}
        </button>
      </div>
    </div>,
    document.body,
  )
}

export { AnnotationPlugin, TOGGLE_ANNOTATION_COMMAND }
