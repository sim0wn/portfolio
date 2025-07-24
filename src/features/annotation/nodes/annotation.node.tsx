import {
  $applyNodeReplacement,
  ElementNode,
  LexicalNode,
  NodeKey,
  SerializedElementNode,
  Spread,
} from "@payloadcms/richtext-lexical/lexical"

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

  static override clone(node: AnnotationNode) {
    return new AnnotationNode(node.__note, node.__key)
  }

  static override getType() {
    return "annotation"
  }

  static override importDOM() {
    return {
      u: () => ({
        conversion: (node: HTMLBaseElement) => {
          const note = node.getAttribute("data-annotation-note") || ""
          return { node: $createAnnotationNode(note) }
        },
      }),
    }
  }

  static importJSON(serializedNode: SerializedAnnotationNode) {
    const { note } = serializedNode
    const node = $createAnnotationNode(note)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }

  override createDOM() {
    const span = document.createElement("span")
    span.className = "annotation"
    return span
  }

  override exportDOM() {
    const element = document.createElement("u")
    const text = document.createTextNode(this.getTextContent())
    element.append(text)
    element.setAttribute("data-annotation-note", this.__note)
    return { element }
  }

  override exportJSON(): SerializedAnnotationNode {
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

  override isInline() {
    return true
  }

  setNote(note: string) {
    const writable = this.getWritable()
    writable.__note = note
    return writable
  }

  override updateDOM(prevNode: AnnotationNode) {
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
