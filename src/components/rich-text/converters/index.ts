import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical"
import {
  JSXConvertersFunction,
  LinkJSXConverter,
} from "@payloadcms/richtext-lexical/react"

import { internalDocToHref } from "./internal-link"
import { UploadJSXConverter } from "./upload"

type NodeTypes = DefaultNodeTypes | SerializedBlockNode

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...UploadJSXConverter,
})

export { jsxConverters }
