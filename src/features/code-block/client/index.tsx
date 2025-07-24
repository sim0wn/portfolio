"use client"

import {
  createClientFeature,
  getSelectedNode,
  slashMenuBasicGroupWithItems,
  toolbarAddDropdownGroupWithItems,
} from "@payloadcms/richtext-lexical/client"
import {
  $getSelection,
  $isRangeSelection,
} from "@payloadcms/richtext-lexical/lexical"
import { $findMatchingParent } from "@payloadcms/richtext-lexical/lexical/utils"
import { Braces } from "lucide-react"

import { $isCodeBlockNode, CodeBlockNode } from "../nodes"
import { CodeBlockPlugin, CREATE_CODE_BLOCK_COMMAND } from "../plugins"

const Icon = () => (
  <Braces
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

export const CodeBlockFeatureClient = createClientFeature({
  markdownTransformers: [],
  nodes: [CodeBlockNode],
  plugins: [{ Component: CodeBlockPlugin, position: "normal" }],
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon,
          key: "codeBlock",
          keywords: ["code", "snippet"],
          label: ({ i18n }) => i18n.t("lexical:codeBlock:label"),
          onSelect({ editor }) {
            editor.dispatchCommand(CREATE_CODE_BLOCK_COMMAND, null)
          },
        },
      ]),
    ],
  },
  toolbarInline: {
    groups: [
      toolbarAddDropdownGroupWithItems([
        {
          ChildComponent: Icon,
          isActive({ selection }) {
            if ($isRangeSelection(selection)) {
              const node = getSelectedNode(selection)
              const parent = $findMatchingParent(node, $isCodeBlockNode)
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
          key: "codeBlock",
          label: ({ i18n }) => i18n.t("lexical:codeBlock:label"),
          onSelect({ editor }) {
            editor.dispatchCommand(CREATE_CODE_BLOCK_COMMAND, null)
          },
        },
      ]),
    ],
  },
})
