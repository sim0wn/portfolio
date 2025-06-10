import { SerializedBlockNode } from "@payloadcms/richtext-lexical"
import SyntaxHighlighter from "react-syntax-highlighter"

import { codeBlockStyle } from "@/blocks"

type CodeBlockProps = {
  code: string
  filename?: string
  language: string
  showLineNumbers?: boolean
}

function CodeBlockComponent({
  node,
}: {
  node: SerializedBlockNode<CodeBlockProps>
}) {
  const { code, filename, language, showLineNumbers } = node.fields
  return (
    <div className="border-muted bg-background my-6 rounded-md border shadow-md">
      {filename && (
        <div className="bg-muted border-muted-foreground/10 rounded-t-md border-b px-4 py-2 font-mono text-xs">
          {filename}
        </div>
      )}
      <SyntaxHighlighter
        aria-label={filename ? `Code snippet: ${filename}` : "Code snippet"}
        customStyle={{
          borderRadius: filename ? "0 0 0.375rem 0.375rem" : "0.375rem",
          fontSize: "0.95rem",
          margin: 0,
        }}
        language={language === "other" ? undefined : language}
        lineNumberStyle={{
          color: "#888",
          fontSize: "0.85em",
        }}
        showLineNumbers={showLineNumbers}
        style={codeBlockStyle}
        wrapLongLines={true}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

const CodeBlockJSXConverter = { codeBlock: CodeBlockComponent }

export { CodeBlockJSXConverter }
