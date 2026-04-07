"use client"

import { PluginComponent } from "@payloadcms/richtext-lexical"
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import {
  $insertNodeToNearestRoot,
  mergeRegister,
} from "@payloadcms/richtext-lexical/lexical/utils"
import { useEffect } from "react"

import "./styles.scss"
import {
  $createCalloutNode,
  $isCalloutNode,
  CalloutNode,
  CalloutPayload,
} from "../nodes"

const CREATE_CALLOUT_COMMAND = createCommand("createCallout")
const UPDATE_CALLOUT_COMMAND = createCommand("updateCallout")
const REMOVE_CALLOUT_COMMAND = createCommand("removeCallout")

const CalloutPlugin: PluginComponent = () => {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    if (!editor.hasNodes([CalloutNode])) {
      throw new Error("CalloutPlugin: CalloutNode not registered.")
    }
    return mergeRegister(
      editor.registerCommand(
        CREATE_CALLOUT_COMMAND,
        () => {
          const selection = $getSelection()
          const calloutNode = $createCalloutNode({})

          if ($isRangeSelection(selection)) {
            const focusNode = selection.focus.getNode()
            calloutNode.setMessage(focusNode.getTextContent())
            focusNode.remove()
          }

          $insertNodeToNearestRoot(calloutNode)
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        REMOVE_CALLOUT_COMMAND,
        ({ nodeKey }: { nodeKey: string }) => {
          const node = $getNodeByKey(nodeKey)
          if ($isCalloutNode(node)) {
            node.remove()
          }
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
      editor.registerCommand(
        UPDATE_CALLOUT_COMMAND,
        (payload: CalloutPayload & { nodeKey: string }) => {
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
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor])

  return null
}

export {
  CalloutPlugin,
  CREATE_CALLOUT_COMMAND,
  REMOVE_CALLOUT_COMMAND,
  UPDATE_CALLOUT_COMMAND,
}
