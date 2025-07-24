import {
  COMMAND_PRIORITY_EDITOR,
  createCommand,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { mergeRegister } from "@payloadcms/richtext-lexical/lexical/utils"
import { useEffect } from "react"

const AI_REVIEW_COMMAND = createCommand("aiReview")

function AiReviewPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        AI_REVIEW_COMMAND,
        // TODO: Implement AI review logic
        (payload: { text: string }) => {
          console.debug(payload)
          return true
        },
        COMMAND_PRIORITY_EDITOR,
      ),
    )
  }, [editor])

  return null
}

export { AI_REVIEW_COMMAND, AiReviewPlugin }
