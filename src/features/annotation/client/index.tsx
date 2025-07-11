"use client"

import { $findMatchingParent } from "@lexical/utils"
import {
  createClientFeature,
  getSelectedNode,
  slashMenuBasicGroupWithItems,
  toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client"
import { $getSelection, $isRangeSelection } from "lexical"
import { NotebookPen } from "lucide-react"

import { $isAnnotationNode, AnnotationNode } from "../nodes"
import {
  AnnotationPlugin,
  INSERT_ANNOTATION_COMMAND,
  REMOVE_ANNOTATION_COMMAND,
} from "../plugins"

const Icon = () => (
  <NotebookPen
    aria-hidden="true"
    fill="none"
    height={16}
    stroke="currentColor"
    style={{
      color: "var(--theme-elevation-600)",
      height: "var(--base)",
      width: "var(--base)",
    }}
    width="16"
  />
)

export const AnnotationFeatureClient = createClientFeature(() => ({
  nodes: [AnnotationNode],
  plugins: [{ Component: AnnotationPlugin, position: "normal" }],
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon,
          key: "annotation",
          keywords: ["annotation", "note"],
          label: ({ i18n }) => {
            return i18n.t("lexical:annotation:label")
          },
          onSelect({ editor }) {
            editor.dispatchCommand(INSERT_ANNOTATION_COMMAND, {
              note: "",
            })
          },
        },
      ]),
    ],
  },
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          ChildComponent: Icon,
          isActive({ selection }) {
            if ($isRangeSelection(selection)) {
              const node = getSelectedNode(selection)
              const parent = $findMatchingParent(node, $isAnnotationNode)
              return parent !== null
            }
            return false
          },
          isEnabled({ selection }) {
            return !!(
              $isRangeSelection(selection) &&
              $getSelection()?.getTextContent()?.length
            )
          },
          key: "annotation",
          label: ({ i18n }) => i18n.t("lexical:annotation:label"),
          onSelect({ editor, isActive }) {
            if (!isActive) {
              editor.getEditorState().read(() => {
                const selection = $getSelection()
                if (selection) {
                  editor.dispatchCommand(INSERT_ANNOTATION_COMMAND, {
                    note: "",
                    text: selection.getTextContent(),
                  })
                }
              })
            } else {
              editor.dispatchCommand(REMOVE_ANNOTATION_COMMAND, null)
            }
          },
        },
      ]),
    ],
  },
}))
