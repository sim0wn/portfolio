"use client"

import {
  createClientFeature,
  getSelectedNode,
  slashMenuBasicGroupWithItems,
  toolbarFormatGroupWithItems,
} from "@payloadcms/richtext-lexical/client"
import {
  $getSelection,
  $isRangeSelection,
} from "@payloadcms/richtext-lexical/lexical"
import { $findMatchingParent } from "@payloadcms/richtext-lexical/lexical/utils"
import { Highlighter } from "lucide-react"

import { $isHighlighterNode, HighlighterNode } from "../nodes"
import { HighlighterPlugin, TOGGLE_HIGHLIGHTER_COMMAND } from "../plugins"
import { HighlighterMarkdownTransformer } from "../transformers"

const Icon = () => (
  <Highlighter
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

export const HighlighterFeatureClient = createClientFeature(() => ({
  markdownTransformers: [HighlighterMarkdownTransformer],
  nodes: [HighlighterNode],
  plugins: [{ Component: HighlighterPlugin, position: "normal" }],
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon,
          key: "highlighter",
          keywords: ["highlight"],
          label: ({ i18n }) => {
            return i18n.t("lexical:highlighter:label")
          },
          onSelect({ editor }) {
            editor.dispatchCommand(TOGGLE_HIGHLIGHTER_COMMAND, {})
          },
        },
      ]),
    ],
  },
  toolbarInline: {
    groups: [
      toolbarFormatGroupWithItems([
        {
          ChildComponent: Icon,
          isActive({ selection }) {
            if ($isRangeSelection(selection)) {
              const node = getSelectedNode(selection)
              const parent = $findMatchingParent(node, $isHighlighterNode)
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
          key: "highlighter",
          label: ({ i18n }) => i18n.t("lexical:highlighter:label"),
          onSelect({ editor }) {
            editor.getEditorState().read(() => {
              const selection = $getSelection()
              if (selection) {
                editor.dispatchCommand(TOGGLE_HIGHLIGHTER_COMMAND, {})
              }
            })
          },
        },
      ]),
    ],
  },
}))
