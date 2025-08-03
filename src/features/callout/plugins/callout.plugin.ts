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

import "./styles.scss"
import { useCallout } from "../hooks"
import { $isCalloutNode, CalloutNode, CalloutPayload } from "../nodes"

const CREATE_CALLOUT_COMMAND = createCommand("createCallout")
const UPDATE_CALLOUT_COMMAND = createCommand("updateCallout")

const CalloutPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()
  const { createCallout } = useCallout()

  useEffect(() => {
    if (!editor.hasNodes([CalloutNode]))
      throw new Error("CalloutPlugin: CalloutNode not registered.")
    return mergeRegister(
      editor.registerCommand(
        CREATE_CALLOUT_COMMAND,
        () => {
          createCallout()
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        UPDATE_CALLOUT_COMMAND,
        (payload: CalloutPayload & { nodeKey: string }) => {
          editor.update(() => {
            const calloutNode = $getNodeByKey(payload.nodeKey)
            if ($isCalloutNode(calloutNode)) {
              if (payload.message) {
                calloutNode.setMessage(payload.message)
              }
              if (payload.title) {
                calloutNode.setTitle(payload.title)
              }
              if (payload.variant) {
                calloutNode.setVariant(payload.variant)
              }
            }
          })
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor, createCallout])

  return null
}

export { CalloutPlugin, CREATE_CALLOUT_COMMAND, UPDATE_CALLOUT_COMMAND }
