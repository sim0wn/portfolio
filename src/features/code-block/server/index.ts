import { createServerFeature } from "@payloadcms/richtext-lexical"

import { CodeBlockNode } from "../nodes"
import { CodeBlockMarkdownTransformer } from "../transformers"
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
