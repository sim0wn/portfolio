import {
  $applyNodeReplacement,
  DecoratorNode,
  LexicalNode,
  SerializedElementNode,
  Spread,
} from "@payloadcms/richtext-lexical/lexical"
import { lazy, ReactElement } from "react"

const Callout = lazy(() =>
  import("../components").then(({ Callout }) => ({ default: Callout })),
)

type CalloutPayload = {
  message?: string
  title?: string
  variant?: "error" | "info" | "success" | "warning"
}

type SerializedCalloutNode = Spread<CalloutPayload, SerializedElementNode>

class CalloutNode extends DecoratorNode<ReactElement> {
  private __message: CalloutPayload["message"]
  private __title: CalloutPayload["title"]
  private __variant: CalloutPayload["variant"]

  constructor(
    { message = "", title = "", variant = "info" }: CalloutPayload,
    key?: string,
  ) {
    super(key)
    this.__message = message
    this.__title = title
    this.__variant = variant
  }

  static override clone(node: CalloutNode) {
    return new CalloutNode(
      {
        message: node.__message,
        title: node.__title,
        variant: node.__variant,
      },
      node.__key,
    )
  }

  static override getType() {
    return "callout"
  }

  static override importJSON({
    message,
    title,
    variant,
  }: SerializedCalloutNode) {
    const node = $createCalloutNode({ message, title, variant })
    return node
  }

  override createDOM() {
    const element = document.createElement("div")
    element.className = "callout"
    return element
  }

  override decorate() {
    return <Callout nodeKey={this.getKey()} />
  }

  override exportJSON() {
    return {
      ...super.exportJSON(),
      message: this.__message,
      title: this.__title,
      type: "callout",
      variant: this.__variant,
      version: 1,
    }
  }

  getMessage() {
    return this.__message ?? ""
  }

  getTitle() {
    return this.__title ?? ""
  }

  getVariant() {
    return this.__variant ?? ""
  }

  override isInline() {
    return false
  }

  setMessage(message: CalloutPayload["message"] = "") {
    const writable = this.getWritable()
    writable.__message = message
    return writable
  }

  setTitle(title: CalloutPayload["title"] = "") {
    const writable = this.getWritable()
    writable.__title = title
    return writable
  }

  setVariant(variant: CalloutPayload["variant"] = "info") {
    const writable = this.getWritable()
    writable.__variant = variant
    return writable
  }

  override updateDOM() {
    return false
  }
}

function $createCalloutNode({
  message = "",
  title = "",
  variant = "info",
}: CalloutPayload) {
  const calloutNode = new CalloutNode({ message, title, variant })
  return $applyNodeReplacement(calloutNode)
}

function $isCalloutNode(node: LexicalNode | null | undefined) {
  return node instanceof CalloutNode
}

export { $createCalloutNode, $isCalloutNode, CalloutNode }
export type { CalloutPayload, SerializedCalloutNode }
