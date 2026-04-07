"use client"

import { PluginComponent } from "@payloadcms/richtext-lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import { Button, TextareaInput, useTranslation } from "@payloadcms/ui"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical"

import "./styles.scss"
import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

import { useAnnotation } from "../hooks"
import { $isAnnotationNode, AnnotationNode, AnnotationPayload } from "../nodes"

const TOGGLE_ANNOTATION_COMMAND = createCommand("toggleAnnotation")
const UPDATE_ANNOTATION_COMMAND = createCommand("updateAnnotation")

const AnnotationPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const [node, setNode] = useState<AnnotationNode | null>(null)
  const { t } = useTranslation<
    object,
    | "lexical:annotation:form:note:delete"
    | "lexical:annotation:form:note:label"
    | "lexical:annotation:form:note:placeholder"
  >()
  const popupRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLInputElement>(null)
  const { toggleAnnotation, updateAnnotation } = useAnnotation()

  const updateNode = useCallback(() => {
    const selection = $getSelection()
    if ($isRangeSelection(selection)) {
      const node = selection.anchor.getNode()
      const parent = node.getParent()
      setNode($isAnnotationNode(parent) ? parent : null)
    }
  }, [])

  useEffect(() => {
    const requiredNodes = [AnnotationNode]
    if (!editor.hasNodes(requiredNodes)) {
      throw new Error(
        `AnnotationPlugin: ${requiredNodes.map((node) => node.name).join(", ")} not registered.`,
      )
    }
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(updateNode)
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
  }, [editor, node, toggleAnnotation, updateAnnotation, updateNode])

  useLayoutEffect(() => {
    if (!node) return
    requestAnimationFrame(() => {
      const dom = editor.getElementByKey(node.getKey())
      if (dom) {
        const bounding = dom.getBoundingClientRect()
        if (popupRef.current) {
          popupRef.current.style.left =
            bounding.left + window.scrollX + bounding.width / 2 + "px"
          popupRef.current.style.top =
            Math.max(bounding.top + window.scrollY + 28, 8) + "px"
          popupRef.current.style.opacity = "1"
          if (noteRef.current) {
            noteRef.current.focus({ preventScroll: true })
          }
        }
      }
    })
  }, [editor, node])

  if (!node || !popupRef || !noteRef) return null

  // Render the UI for editing annotations
  return createPortal(
    <div className="popup__content" ref={popupRef} role="dialog" tabIndex={-1}>
      <header>
        <h1>{t("lexical:annotation:form:note:label")}</h1>
        <Button
          buttonStyle="error"
          icon="x"
          onClick={() => {
            toggleAnnotation()
          }}
          size="xsmall"
          tooltip={t("lexical:annotation:form:note:delete")}
        />
      </header>
      <TextareaInput
        aria-label={t("lexical:annotation:form:note:label")}
        inputRef={noteRef as RefObject<HTMLInputElement>}
        onChange={(event) => {
          editor.dispatchCommand(UPDATE_ANNOTATION_COMMAND, {
            nodeKey: node.getKey(),
            note: event.currentTarget.value,
          })
        }}
        path="note"
        placeholder={t("lexical:annotation:form:note:placeholder")}
        rows={3}
        value={node.getNote()}
      />
    </div>,
    document.body,
  )
}

export { AnnotationPlugin, TOGGLE_ANNOTATION_COMMAND }
