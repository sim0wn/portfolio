import { createNode, createServerFeature } from "@payloadcms/richtext-lexical"

import { AnnotationNode } from "../nodes/annotation.node"
import { i18n } from "./i18n"

export const AnnotationFeature = createServerFeature({
  feature: () => ({
    ClientFeature: "@/features/annotation/client#AnnotationFeatureClient",
    i18n,
    nodes: [
      createNode({
        node: AnnotationNode,
      }),
    ],
  }),
  key: "annotation",
})
