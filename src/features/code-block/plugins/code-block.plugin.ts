"use client"

import { PluginComponent } from "@payloadcms/richtext-lexical"
import {
  $getNodeByKey,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import { useEffect } from "react"

import { useCode } from "../hooks"
import { $isCodeBlockNode, CodeBlockNode, CodeBlockPayload } from "../nodes"

const CREATE_CODE_BLOCK_COMMAND = createCommand("createCodeBlock")
const UPDATE_CODE_BLOCK_COMMAND = createCommand("updateCodeBlock")
import "./styles.scss"

const CodeBlockPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const { createCode } = useCode()

  useEffect(() => {
    if (!editor.hasNodes([CodeBlockNode]))
      throw new Error("CodeBlockPlugin: CodeBlockNode not registered.")
    return mergeRegister(
      editor.registerCommand(
        CREATE_CODE_BLOCK_COMMAND,
        () => {
          createCode()
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        UPDATE_CODE_BLOCK_COMMAND,
        (payload: CodeBlockPayload & { nodeKey: string }) => {
          editor.update(() => {
            const codeBlockNode = $getNodeByKey(payload.nodeKey)
            if ($isCodeBlockNode(codeBlockNode)) {
              codeBlockNode.setCode(payload.code ?? codeBlockNode.getCode())
              codeBlockNode.setLanguage(
                payload.language ?? codeBlockNode.getLanguage(),
              )
              codeBlockNode.setPath(payload.path ?? codeBlockNode.getPath())
            }
          })
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor, createCode])

  return null
}

export { CodeBlockPlugin, CREATE_CODE_BLOCK_COMMAND, UPDATE_CODE_BLOCK_COMMAND }
