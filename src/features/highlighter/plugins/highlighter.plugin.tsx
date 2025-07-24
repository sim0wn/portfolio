"use client"

import { PluginComponent } from "@payloadcms/richtext-lexical"
import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import { useEffect } from "react"

import "./index.scss"
import { useHighlighter } from "../hooks"
import { HighlighterNode } from "../nodes"

const TOGGLE_HIGHLIGHTER_COMMAND = createCommand("toggleHighlighter")

const HighlighterPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const { toggleHighlighter } = useHighlighter()

  // Register the custom commands
  useEffect(() => {
    if (!editor.hasNodes([HighlighterNode])) {
      throw new Error("HighlighterPlugin: HighlighterNode not registered.")
    }
    return mergeRegister(
      editor.registerCommand(
        TOGGLE_HIGHLIGHTER_COMMAND,
        () => {
          toggleHighlighter()
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor, toggleHighlighter])

  // Render the UI for editing annotations
  return null
}

export { HighlighterPlugin, TOGGLE_HIGHLIGHTER_COMMAND }
