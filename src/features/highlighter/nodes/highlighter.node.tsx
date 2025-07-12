import {
  $applyNodeReplacement,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "lexical"

type HighlighterPayload = object

type SerializedHighlighterNode = Spread<
  HighlighterPayload,
  SerializedElementNode
>

class HighlighterNode extends ElementNode {
  constructor(key?: NodeKey) {
    super(key)
  }

  static clone(node: HighlighterNode) {
    return new HighlighterNode(node.__key)
  }

  static getType() {
    return "highlighter"
  }

  static importJSON(serializedNode: SerializedHighlighterNode) {
    const node = $createHighlighterNode()
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  createDOM() {
    const span = document.createElement("span")
    span.className = "highlighter"
    return span
  }

  exportJSON(): SerializedHighlighterNode {
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
