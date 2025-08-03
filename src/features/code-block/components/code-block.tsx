"use client"

import { $getNodeByKey } from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import {
  CodeEditorLazy,
  Select,
  ShimmerEffect,
  TextInput,
  useDebouncedCallback,
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

import { $isCodeBlockNode, CodeBlockNode } from "../nodes"
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
  const [code, setCode] = useState<string>("")
  const [path, setPath] = useState<string>("")
  const [language, setLanguage] = useState<string>("")

  const languageOptions = useMemo(
    () =>
      bundledLanguagesInfo.map(({ id, name }) => ({ label: name, value: id })),
    [],
  )

  const updateNode = useCallback(() => {
    const n = $getNodeByKey(nodeKey)
    if ($isCodeBlockNode(n)) {
      setNode(n)
      setCode(n.getCode())
      setPath(n.getPath())
      setLanguage(n.getLanguage())
    }
  }, [nodeKey])

  useEffect(() => {
    editor.read(() => updateNode())
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        updateNode()
      })
    })
  }, [editor, nodeKey, updateNode])

  const onChangePath = (value: string) => {
    setPath(value)
    editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
      nodeKey,
      path: value,
    })
  }

  const onChangeLanguage = (value: string = "text") => {
    setLanguage(value)
    editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
      language: value,
      nodeKey,
    })
  }

  const onChangeCode = useDebouncedCallback((value: string) => {
    setCode(value)
    editor.dispatchCommand(UPDATE_CODE_BLOCK_COMMAND, {
      code: value,
      nodeKey: nodeKey,
    })
  }, 400)

  if (!node) return <ShimmerEffect />

  return (
    <div className="code-block">
      <div className="code-block__header">
        <TextInput
          aria-label={t("lexical:codeBlock:pathPlaceholder")}
          className="code-block__input"
          htmlAttributes={{ autoComplete: "off" }}
          onChange={(e: SyntheticEvent<HTMLInputElement>) =>
            onChangePath(e.currentTarget.value)
          }
          path={`code-block-path-${nodeKey}`}
          placeholder={t("lexical:codeBlock:pathPlaceholder")}
          value={path}
        />
        <Select
          aria-label={t("lexical:codeBlock:languagePlaceholder")}
          className="code-block__select"
          id={`code-block-language-${nodeKey}`}
          onChange={(option) => {
            if (Array.isArray(option)) return
            onChangeLanguage(
              typeof option?.value === "string" ? option.value : undefined,
            )
          }}
          options={languageOptions}
          value={languageOptions.find(({ value }) => value === language)}
        />
      </div>
      <div>
        <CodeEditorLazy
          className="code-block__editor"
          language={language}
          onChange={onChangeCode}
          theme={theme === "dark" ? "vs-dark" : "light"}
          value={code}
        />
      </div>
    </div>
  )
}
