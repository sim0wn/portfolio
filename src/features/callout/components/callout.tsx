"use client"

import {
  $getNodeByKey,
  mergeRegister,
} from "@payloadcms/richtext-lexical/lexical"
import { useLexicalComposerContext } from "@payloadcms/richtext-lexical/lexical/react/LexicalComposerContext"
import { Button, Select, ShimmerEffect, useTranslation } from "@payloadcms/ui"
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { $isCalloutNode, CalloutNode, CalloutPayload } from "../nodes"
import { REMOVE_CALLOUT_COMMAND, UPDATE_CALLOUT_COMMAND } from "../plugins"

export function Callout({ nodeKey }: { nodeKey: string }) {
  const [editor] = useLexicalComposerContext()
  const { t } = useTranslation<
    object,
    | "lexical:callout:label"
    | "lexical:callout:message:label"
    | "lexical:callout:message:placeholder"
    | "lexical:callout:title:label"
    | "lexical:callout:title:placeholder"
    | "lexical:callout:variant"
    | "lexical:callout:variant:error"
    | "lexical:callout:variant:info"
    | "lexical:callout:variant:placeholder"
    | "lexical:callout:variant:success"
    | "lexical:callout:variant:warning"
  >()
  const [node, setNode] = useState<CalloutNode | null>(null)
  const [variant, setVariant] = useState<CalloutPayload["variant"]>()

  const titleRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLInputElement>(null)

  const variantOptions = useMemo(
    () =>
      Object.entries({
        error: {
          icon: <XCircle className="callout-variant__icon" />,
          label: t("lexical:callout:variant:error"),
        },
        info: {
          icon: <Info className="callout-variant__icon" />,
          label: t("lexical:callout:variant:info"),
        },
        success: {
          icon: <CheckCircle className="callout-variant__icon" />,
          label: t("lexical:callout:variant:success"),
        },
        warning: {
          icon: <AlertTriangle className="callout-variant__icon" />,
          label: t("lexical:callout:variant:warning"),
        },
      }).map(([key, { icon, label }]) => ({
        label: (
          <div className="callout-variant_item">
            {icon}
            {label}
          </div>
        ),
        value: key,
      })),
    [t],
  )

  const updateNode = useCallback(() => {
    const n = $getNodeByKey(nodeKey)
    if ($isCalloutNode(n)) {
      setNode(n)
    }
  }, [nodeKey])

  const updateCallout = useCallback(
    (payload: Partial<CalloutPayload>) => {
      editor.dispatchCommand(UPDATE_CALLOUT_COMMAND, {
        nodeKey,
        ...payload,
      })
    },
    [editor, nodeKey],
  )

  useEffect(() => {
    editor.read(updateNode)
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(updateNode)
      }),
    )
  }, [editor, nodeKey, updateNode])

  useEffect(() => {
    editor.read(() => {
      if (!node) return
      if (titleRef.current) {
        titleRef.current.value = node.getTitle()
      }
      if (messageRef.current) {
        messageRef.current.value = node.getMessage()
      }
    })
  }, [editor, node, titleRef])

  if (!node) return <ShimmerEffect />

  return (
    <>
      <header>
        <div>
          <h1>{t("lexical:callout:label")}</h1>
          <Button
            buttonStyle="error"
            icon="x"
            onClick={() => {
              editor.dispatchCommand(REMOVE_CALLOUT_COMMAND, {
                nodeKey: node.getKey(),
              })
            }}
            size="xsmall"
            tooltip={t("general:remove")}
          />
        </div>
      </header>
      <div>
        <div>
          <label
            className="field-label"
            htmlFor={`callout-variant-${node.getKey()}`}
          >
            {t("lexical:callout:title:label")}
          </label>
          <Select
            aria-label={t("lexical:callout:variant:placeholder")}
            className="callout-variant"
            id={`callout-variant-${nodeKey}`}
            isClearable={false}
            isMulti={false}
            isSearchable={false}
            onChange={(option) => {
              if (Array.isArray(option)) return
              setVariant(option?.value as CalloutPayload["variant"])
            }}
            options={variantOptions}
            placeholder={t("lexical:callout:variant:placeholder")}
            value={variantOptions.find(
              (variantOption) => variantOption.value === variant,
            )}
          />
        </div>
        <div className="field-type text">
          <label
            className="field-label"
            htmlFor={`callout-title-${node.getKey()}`}
          >
            {t("lexical:callout:title:label")}
          </label>
          <input
            id={`callout-title-${node.getKey()}`}
            onBlur={(event) =>
              updateCallout({ title: event.currentTarget.value })
            }
            placeholder={t("lexical:callout:title:placeholder")}
            ref={titleRef}
          />
        </div>
      </div>
      <div>
        <div className="field-type text">
          <label
            className="field-label"
            htmlFor={`callout-message-${node.getKey()}`}
          >
            {t("lexical:callout:message:label")}
          </label>
          <input
            id={`callout-message-${node.getKey()}`}
            onBlur={(event) =>
              updateCallout({ message: event.currentTarget.value })
            }
            placeholder={t("lexical:callout:message:placeholder")}
            ref={messageRef}
          />
        </div>
      </div>
    </>
  )
}
