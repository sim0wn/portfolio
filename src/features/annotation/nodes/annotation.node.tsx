import {
  $applyNodeReplacement,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "lexical"

type AnnotationPayload = {
  note: string
}

type SerializedAnnotationNode = Spread<AnnotationPayload, SerializedElementNode>

class AnnotationNode extends ElementNode {
  __note: string

  constructor(note: string, key?: NodeKey) {
    super(key)
    this.__note = note
  }

  static clone(node: AnnotationNode) {
    return new AnnotationNode(node.__note, node.__key)
  }

  static getType() {
    return "annotation"
  }

  static importJSON(serializedNode: SerializedAnnotationNode) {
    const { note } = serializedNode
    const node = $createAnnotationNode(note)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  createDOM() {
    const span = document.createElement("span")
    span.className = "annotation"
    return span
  }

  exportJSON(): SerializedAnnotationNode {
    return {
      ...super.exportJSON(),
      note: this.__note,
      type: "annotation",
      version: 1,
    }
  }

  getNote() {
    return this.__note
  }

  isInline() {
    return true
  }

  setNote(note: string) {
    const writable = this.getWritable()
    writable.__note = note
    return writable
  }

  updateDOM(prevNode: AnnotationNode) {
    return prevNode.__note !== this.__note
  }
}

function $createAnnotationNode(note: string) {
  const annotationNode = new AnnotationNode(note)
  return $applyNodeReplacement(annotationNode)
}

function $isAnnotationNode(node: LexicalNode | null | undefined) {
  return node instanceof AnnotationNode
}

export { $createAnnotationNode, $isAnnotationNode, AnnotationNode }

export type { AnnotationPayload, SerializedAnnotationNode }
