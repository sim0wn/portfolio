import { createNode, createServerFeature } from "@payloadcms/richtext-lexical"

import { HighlighterNode } from "../nodes"
import { HighlighterMarkdownTransformer } from "../transformers"
import { i18n } from "./i18n"

export const HighlighterFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/features/highlighter/client#HighlighterFeatureClient",
    i18n,
    markdownTransformers: [HighlighterMarkdownTransformer],
    nodes: [
      createNode({
        node: HighlighterNode,
      }),
    ],
  }),
  key: "highlighter",
})
