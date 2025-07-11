import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical"
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react"

import { AnnotationJSXConverter } from "./annotation"
import { CodeBlockJSXConverter } from "./code-block"
import { internalDocToHref } from "./internal-link"
import { UploadJSXConverter } from "./upload"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...AnnotationJSXConverter,
  ...LinkJSXConverter({ internalDocToHref }),
  ...UploadJSXConverter,
  blocks: { ...CodeBlockJSXConverter },
})

export { jsxConverters }
