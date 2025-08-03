import { createNode, createServerFeature } from "@payloadcms/richtext-lexical"

import { CalloutMarkdownTransformer } from "../markdown-transformer"
import { CalloutNode } from "../nodes"
import { i18n } from "./i18n"

export const CalloutFeature = createServerFeature({
  feature: {
    ClientFeature: {
      path: "@/features/callout/client#CalloutFeatureClient",
    },
    i18n,
    markdownTransformers: [CalloutMarkdownTransformer],
    nodes: [createNode({ node: CalloutNode })],
  },
  key: "callout",
})
