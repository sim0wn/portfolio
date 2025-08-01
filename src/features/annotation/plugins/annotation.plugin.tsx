"use client"

import { PluginComponent } from "@payloadcms/richtext-lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import { useDebounce, useTranslation } from "@payloadcms/ui"
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "lexical"

import "./styles.scss"
import {
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
  const dialogRef = useRef<HTMLDivElement>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)
  const { toggleAnnotation, updateAnnotation } = useAnnotation()
  const onChangeNote = useDebounce(() => {
    if (noteRef.current && node) {
      editor.dispatchCommand(UPDATE_ANNOTATION_COMMAND, {
        nodeKey: node.getKey(),
        note: noteRef.current.value,
      })
    }
  }, 3000)

  const updateNode = useCallback(() => {
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
  }, [])

  // Sincroniza o valor do textarea via ref quando o node muda
  useEffect(() => {
    if (node && noteRef.current) {
      noteRef.current.value = node.getNote()
    }
  }, [node])

  useEffect(() => {
    if (!editor.hasNodes([AnnotationNode])) {
      throw new Error("AnnotationPlugin: AnnotationNode not registered.")
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
  }, [editor, node, toggleAnnotation, updateAnnotation, updateNode])

  useLayoutEffect(() => {
    if (!node) return
    requestAnimationFrame(() => {
      const dom = editor.getElementByKey(node.getKey())
      if (dom) {
        const bounding = dom.getBoundingClientRect()
        if (dialogRef.current) {
          dialogRef.current.style.left =
            bounding.left + window.scrollX + bounding.width / 2 + "px"
          dialogRef.current.style.top =
            Math.max(bounding.top + window.scrollY + 28, 8) + "px"
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
    <div className="annotation" ref={dialogRef} role="dialog" tabIndex={-1}>
      <div className="annotation__field">
        <div className="annotation__field-wrap">
          <div className="annotation__textarea-outer">
            <textarea
              aria-label={t("lexical:annotation:form:note:label")}
              className="annotation__textarea"
              defaultValue={node.getNote()}
              onChange={onChangeNote}
              placeholder={t("lexical:annotation:form:note:placeholder")}
              ref={noteRef}
              rows={3}
            />
          </div>
        </div>
      </div>
      <div className="annotation__footer">
        <span className="annotation__label">
          {t("lexical:annotation:form:note:delete")}
        </span>
        <button
          aria-label={t("lexical:annotation:form:note:delete")}
          className="annotation__remove-btn"
          onClick={() => {
            toggleAnnotation()
          }}
          type="button"
        >
          <svg
            aria-hidden="true"
            className="annotation__remove-icon"
            fill="none"
            focusable="false"
            height={18}
            viewBox="0 0 20 20"
            width={18}
          >
            <title>{t("lexical:annotation:form:note:delete")}</title>
            <path
              d="M7.5 8v6m5-6v6M3 6h14M5 6v10a2 2 0 002 2h6a2 2 0 002-2V6M8 6V4a2 2 0 012-2h0a2 2 0 012 2v2"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </button>
      </div>
    </div>,
    document.body,
  )
}

export { AnnotationPlugin, TOGGLE_ANNOTATION_COMMAND }
