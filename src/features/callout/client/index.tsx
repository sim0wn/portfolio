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
import { MessageSquare } from "lucide-react"

import { CalloutMarkdownTransformer } from "../markdown-transformer"
import { $isCalloutNode, CalloutNode } from "../nodes"
import { CalloutPlugin, CREATE_CALLOUT_COMMAND } from "../plugins"

const Icon = () => (
  <MessageSquare
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

export const CalloutFeatureClient = createClientFeature({
  markdownTransformers: [CalloutMarkdownTransformer],
  nodes: [CalloutNode],
  plugins: [{ Component: CalloutPlugin, position: "normal" }],
  slashMenu: {
    groups: [
      slashMenuBasicGroupWithItems([
        {
          Icon,
          key: "callout",
          keywords: ["alert", "callout"],
          label: ({ i18n }) => i18n.t("lexical:callout:label"),
          onSelect({ editor }) {
            editor.dispatchCommand(CREATE_CALLOUT_COMMAND, null)
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
              const parent = $findMatchingParent(node, $isCalloutNode)
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
          key: "callout",
          label: ({ i18n }) => i18n.t("lexical:callout:label"),
          onSelect({ editor }) {
            editor.dispatchCommand(CREATE_CALLOUT_COMMAND, null)
          },
        },
      ]),
    ],
  },
})
