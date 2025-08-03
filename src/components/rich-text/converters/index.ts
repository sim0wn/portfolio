import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical"
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react"

import { AnnotationJSXConverter } from "./annotation"
import { CalloutJSXConverter } from "./callout"
import { CodeBlockJSXConverter } from "./code-block"
import { HighlighterJSXConverter } from "./highlighter"
import { internalDocToHref } from "./internal-link"
import { UploadJSXConverter } from "./upload"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...AnnotationJSXConverter,
  ...CalloutJSXConverter,
  ...CodeBlockJSXConverter,
  ...HighlighterJSXConverter,
  ...LinkJSXConverter({ internalDocToHref }),
  ...UploadJSXConverter,
  blocks: {},
})

export { jsxConverters }
