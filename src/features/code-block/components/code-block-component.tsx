"use client"

import { $getNodeByKey } from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import {
  CodeEdiftor,
  Select,
  ShimmerEffect,
  TextInput,
  useTheme,
  useTranslation,
} from "@payloadcms/ui"
import { SyntheticEvent, useEffect, useState } from "react"
import { bundledLanguagesInfo } from "shiki"

import { $isCodeBlockNode, CodeBlockNode } from "../nodes"
import { UPDATE_CODE_BLOCK_COMMAND } from "../plugins"

export function CodeBlockComponent({ nodeKey }: { nodeKey: string }) {
  const [editor] = useLexicalComposerContext()
  const [node, setNode] = useState<CodeBlockNode | null>(null)
  const { theme } = useTheme()
  const languageOptions = bundledLanguagesInfo.map(({ id, name }) => ({
    label: name,
    value: id,
  }))
  const { t } = useTranslation<
    object,
    | "lexical:codeBlock:codeEditorPlaceholder"
    | "lexical:codeBlock:languagePlaceholder"
    | "lexical:codeBlock:pathPlaceholder"
  >()
  useEffect(() => {
    const updateNode = () => {
      const node = $getNodeByKey(nodeKey)

      if ($isCodeBlockNode(node)) {
        setNode(node)
      }
    }
    editor.read(() => {
      updateNode()
    })
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateNode()
      })
    })
  }, [editor, nodeKey])

  if (!node) return <ShimmerEffect />

  return (
    <>
      <header className="code-block">
        <TextInput
          onChange={(e: SyntheticEvent<HTMLInputElement>) =>
            editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
              nodeKey,
              path: e.currentTarget.value,
            })
          }
          path={`codeBlock/${node?.getKey()}/path`}
          placeholder={t("lexical:codeBlock:pathPlaceholder")}
          style={{ flex: "auto" }}
          value={node?.getPath()}
        />
        <Select
          className="code-block"
          isMulti={false}
          onChange={(options) => {
            const option = Array.isArray(options) ? options[0] : options
            editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
              language: option.value,
              nodeKey: node?.getKey(),
            })
          }}
          options={languageOptions}
          placeholder={t("lexical:codeBlock:languagePlaceholder")}
          value={languageOptions.find(
            (option) => option.value === node.getLanguage(),
          )}
        />
      </header>
      <CodeEdiftor
        language={node?.getLanguage()}
        onChange={(code) => {
          editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
            code,
            nodeKey: node?.getKey(),
          })
        }}
        theme={theme === "dark" ? "vs-dark" : "light"}
        value={node?.getCode()}
        width="100%"
      />
    </>
  )
}
