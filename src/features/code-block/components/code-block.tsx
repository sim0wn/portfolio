"use client"

import { $getNodeByKey } from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import {
  CodeEditorLazy,
  Select,
  ShimmerEffect,
  TextInput,
  useTheme,
  useTranslation,
} from "@payloadcms/ui"
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { bundledLanguagesInfo } from "shiki"

import { $isCodeBlockNode, CodeBlockNode, CodeBlockPayload } from "../nodes"
import { UPDATE_CODE_BLOCK_COMMAND } from "../plugins"

export function CodeBlock({ nodeKey }: { nodeKey: string }) {
  const [editor] = useLexicalComposerContext()
  const { theme } = useTheme()
  const { t } = useTranslation<
    object,
    | "lexical:codeBlock:codeEditorPlaceholder"
    | "lexical:codeBlock:languagePlaceholder"
    | "lexical:codeBlock:pathPlaceholder"
  >()
  const [node, setNode] = useState<CodeBlockNode | null>(null)

  const languageOptions = useMemo(
    () =>
      bundledLanguagesInfo.map(({ id, name }) => ({ label: name, value: id })),
    [],
  )

  const updateNode = useCallback(() => {
    const n = $getNodeByKey(nodeKey)
    if ($isCodeBlockNode(n)) {
      setNode(n)
    }
  }, [nodeKey])

  const updateCodeBlock = useCallback(
    (payload: Partial<CodeBlockPayload>) => {
      editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
        nodeKey,
        ...payload,
      })
    },
    [editor, nodeKey],
  )

  useEffect(() => {
    editor.read(updateNode)
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(updateNode)
    })
  }, [editor, nodeKey, updateNode])

  if (!node) return <ShimmerEffect />

  return (
    <div className="code-block">
      <div className="code-block__header">
        <TextInput
          aria-label={t("lexical:codeBlock:pathPlaceholder")}
          className="code-block__input"
          htmlAttributes={{ autoComplete: "off" }}
          onChange={(e: SyntheticEvent<HTMLInputElement>) =>
            updateCodeBlock({ path: e.currentTarget.value })
          }
          path={`code-block-path-${nodeKey}`}
          placeholder={t("lexical:codeBlock:pathPlaceholder")}
          value={node.getPath()}
        />
        <Select
          aria-label={t("lexical:codeBlock:languagePlaceholder")}
          className="code-block__select"
          id={`code-block-language-${nodeKey}`}
          onChange={(option) => {
            if (Array.isArray(option)) return
            updateCodeBlock({
              language:
                typeof option?.value === "string" ? option.value : undefined,
            })
          }}
          options={languageOptions}
          value={languageOptions.find(
            ({ value }) => value === node.getLanguage(),
          )}
        />
      </div>
      <div>
        <CodeEditorLazy
          className="code-block__editor"
          language={node.getLanguage()}
          onChange={(code) => updateCodeBlock({ code })}
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={node.getCode()}
        />
      </div>
    </div>
  )
}
