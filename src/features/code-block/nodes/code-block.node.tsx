import {
  $applyNodeReplacement,
  DecoratorNode,
  LexicalNode,
  SerializedElementNode,
  Spread,
} from "@payloadcms/richtext-lexical/lexical"
import { lazy, ReactElement } from "react"

const CodeBlockComponent = lazy(() =>
  import("../components").then((mod) => ({ default: mod.CodeBlockComponent })),
)

type CodeBlockPayload = {
  code: string
  language: string
  path: string
}

type SerializedCodeBlockNode = Spread<CodeBlockPayload, SerializedElementNode>

class CodeBlockNode extends DecoratorNode<ReactElement> {
  private __code: string
  private __language: string
  private __path: string

  constructor(
    { code = "", language = "", path = "" }: CodeBlockPayload,
    key?: string,
  ) {
    super(key)
    this.__code = code
    this.__language = language
    this.__path = path
  }

  static override clone(node: CodeBlockNode) {
    return new CodeBlockNode(
      {
        code: node.__code,
        language: node.__language,
        path: node.__path,
      },
      node.__key,
    )
  }

  static override getType() {
    return "codeBlock"
  }

  static override importJSON({
    code,
    language,
    path,
  }: SerializedCodeBlockNode) {
    const node = $createCodeBlockNode({ code, language, path })
    return node
  }

  override createDOM() {
    const element = document.createElement("div")
    element.className = "code-block"
    return element
  }

  override decorate() {
    return <CodeBlockComponent nodeKey={this.getKey()} />
  }

  override exportJSON() {
    return {
      ...super.exportJSON(),
      code: this.__code,
      language: this.__language,
      path: this.__path,
      type: "codeBlock",
      version: 1,
    }
  }

  getCode() {
    return this.__code
  }

  getLanguage() {
    return this.__language ?? "text"
  }

  getPath() {
    return this.__path
  }

  override isInline() {
    return false
  }

  setCode(newCode: CodeBlockPayload["code"] = "") {
    const writable = this.getWritable()
    writable.__code = newCode
    return writable
  }

  setLanguage(newLanguage: CodeBlockPayload["language"] = "") {
    const writable = this.getWritable()
    writable.__language = newLanguage
    return writable
  }

  setPath(newPath: CodeBlockPayload["path"] = "") {
    const writable = this.getWritable()
    writable.__path = newPath
    return writable
  }

  override updateDOM() {
    return false
  }
}

function $createCodeBlockNode({ code = "", language = "", path = "" }) {
  const codeNode = new CodeBlockNode({ code, language, path })
  return $applyNodeReplacement(codeNode)
}

function $isCodeBlockNode(node: LexicalNode | null | undefined) {
  return node instanceof CodeBlockNode
}

export { $createCodeBlockNode, $isCodeBlockNode, CodeBlockNode }
export type { CodeBlockPayload, SerializedCodeBlockNode }
