"use client"

import { $getNodeByKey } from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import {
  Select,
  ShimmerEffect,
  TextInput,
  useTranslation,
} from "@payloadcms/ui"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import { $isCalloutNode, CalloutNode, CalloutPayload } from "../nodes"
import { UPDATE_CALLOUT_COMMAND } from "../plugins"

export function Callout({ nodeKey }: { nodeKey: string }) {
  const [editor] = useLexicalComposerContext()
  const { t } = useTranslation<
    object,
    | "lexical:callout:messagePlaceholder"
    | "lexical:callout:titlePlaceholder"
    | "lexical:callout:variant"
    | "lexical:callout:variant:error"
    | "lexical:callout:variant:info"
    | "lexical:callout:variant:placeholder"
    | "lexical:callout:variant:success"
    | "lexical:callout:variant:warning"
  >()
  const [node, setNode] = useState<CalloutNode | null>(null)
  const [message, setMessage] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [variant, setVariant] = useState<string>("")

  const variantOptions = useMemo(() => {
    const variants = {
      error: { icon: <XCircle />, label: t("lexical:callout:variant:error") },
      info: { icon: <Info />, label: t("lexical:callout:variant:info") },
      success: {
        icon: <CheckCircle />,
        label: t("lexical:callout:variant:success"),
      },
      warning: {
        icon: <AlertTriangle />,
        label: t("lexical:callout:variant:warning"),
      },
    }
    return Object.entries(variants).map(([key, { icon, label }]) => ({
      label: (
        <div className="callout__variant_item">
          {icon}
          {label}
        </div>
      ),
      value: key,
    }))
  }, [t])

  const updateNode = useCallback(() => {
    const n = $getNodeByKey(nodeKey)
    if ($isCalloutNode(n)) {
      setNode(n)
      setMessage(n.getMessage())
      setTitle(n.getTitle())
      setVariant(n.getVariant())
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

  const onChangeTitle = (newTitle: CalloutPayload["title"]) => {
    if (newTitle) {
      setTitle(newTitle)
      editor.dispatchCommand(UPDATE_CALLOUT_COMMAND, {
        nodeKey,
        title: newTitle,
      })
    }
  }

  const onChangeVariant = (newVariant: string) => {
    if (newVariant) {
      setVariant(newVariant)
      editor.dispatchCommand(UPDATE_CALLOUT_COMMAND, {
        nodeKey,
        variant: newVariant,
      })
    }
  }

  const onChangeMessage = (newMessage: CalloutPayload["message"]) => {
    if (newMessage) {
      setMessage(newMessage)
      editor.dispatchCommand(UPDATE_CALLOUT_COMMAND, {
        message: newMessage,
        nodeKey,
      })
    }
  }

  if (!node) return <ShimmerEffect />

  return (
    <div className="callout">
      <section className="callout__main">
        <div className="callout__row">
          <Select
            aria-label={t("lexical:callout:variant:placeholder")}
            className="callout__variant"
            id={`callout-variant-${nodeKey}`}
            isClearable={false}
            isMulti={false}
            isSearchable={false}
            onChange={(option) => {
              if (Array.isArray(option)) return
              onChangeVariant(option?.value as string)
            }}
            options={variantOptions}
            placeholder={t("lexical:callout:variant:placeholder")}
            value={variantOptions.find(
              (variantOption) => variantOption.value === variant,
            )}
          />
          <TextInput
            aria-label={t("lexical:callout:titlePlaceholder")}
            className="callout__title"
            htmlAttributes={{ autoComplete: "off" }}
            onChange={(e: SyntheticEvent<HTMLInputElement>) =>
              onChangeTitle(e.currentTarget.value)
            }
            path={`callout-${nodeKey}`}
            placeholder={t("lexical:callout:titlePlaceholder")}
            value={title}
          />
        </div>
        <TextInput
          aria-label={t("lexical:callout:messagePlaceholder")}
          htmlAttributes={{ autoComplete: "off" }}
          onChange={(e: SyntheticEvent<HTMLInputElement>) =>
            onChangeMessage(e.currentTarget.value)
          }
          path={`callout-path-${nodeKey}`}
          placeholder={t("lexical:callout:messagePlaceholder")}
          value={message}
        />
      </section>
    </div>
  )
}
