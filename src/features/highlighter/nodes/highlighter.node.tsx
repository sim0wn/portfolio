import {
  $applyNodeReplacement,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "@payloadcms/richtext-lexical/lexical"

type HighlighterPayload = object

type SerializedHighlighterNode = Spread<
  HighlighterPayload,
  SerializedElementNode
>

class HighlighterNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key)
  }

  static override clone(node: HighlighterNode) {
    return new HighlighterNode(node.__key)
  }

  static override getType() {
    return "highlighter"
  }

  static override importDOM() {
    return {
      mark: () => ({
        conversion: () => ({ node: $createHighlighterNode() }),
      }),
    }
  }

  static override importJSON(serializedNode: SerializedHighlighterNode) {
    const node = $createHighlighterNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  override createDOM() {
    const span = document.createElement("span")
    span.className = "highlighter"
    return span
  }

  override exportDOM() {
    const element = document.createElement("mark")
    const text = document.createTextNode(this.getTextContent())
    element.append(text)
    return { element }
  }

  override exportJSON(): SerializedHighlighterNode {
    return {
      ...super.exportJSON(),
      type: "highlighter",
      version: 1,
    }
  }

  isInline() {
    return true
  }

  updateDOM(prevNode: HighlighterNode) {
    return prevNode.getChildren() !== this.getChildren()
  }
}

function $createHighlighterNode() {
  const highlighterNode = new HighlighterNode()
  return $applyNodeReplacement(highlighterNode)
}

function $isHighlighterNode(node: LexicalNode | null | undefined) {
  return node instanceof HighlighterNode
}

export { $createHighlighterNode, $isHighlighterNode, HighlighterNode }

export type { HighlighterPayload, SerializedHighlighterNode }
