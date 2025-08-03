import { createServerFeature } from "@payloadcms/richtext-lexical"

import { CodeBlockMarkdownTransformer } from "../markdown-transformer"
import { CodeBlockNode } from "../nodes"
import { i18n } from "./i18n"

export const CodeBlockFeature = createServerFeature({
  feature: {
    ClientFeature: {
      path: "@/features/code-block/client#CodeBlockFeatureClient",
    },
    i18n,
    markdownTransformers: [CodeBlockMarkdownTransformer],
    nodes: [{ node: CodeBlockNode }],
  },
  key: "codeBlock",
})
