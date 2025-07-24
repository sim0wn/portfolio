"use client"

import {
  createClientFeature,
  toolbarFeatureButtonsGroupWithItems,
} from "@payloadcms/richtext-lexical/client"
import { $getSelection } from "@payloadcms/richtext-lexical/lexical"
import { Sparkles } from "lucide-react"

import { AI_REVIEW_COMMAND } from "../plugins"
import { AiReviewPlugin } from "../plugins/ai-review.plugin"

const Icon = () => (
  <Sparkles
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

export const AiFeatureClient = createClientFeature(() => ({
  nodes: [],
  plugins: [{ Component: AiReviewPlugin, position: "normal" }],
  toolbarInline: {
    groups: [
      toolbarFeatureButtonsGroupWithItems([
        {
          ChildComponent: Icon,
          key: "ai",
          label: ({ i18n }) => i18n.t("lexical:ai:label"),
          onSelect({ editor }) {
            editor.getEditorState().read(() => {
              const selection = $getSelection()
              if (selection) {
                editor.dispatchCommand(AI_REVIEW_COMMAND, { text: selection })
              }
            })
          },
        },
      ]),
    ],
  },
}))
