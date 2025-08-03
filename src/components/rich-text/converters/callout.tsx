import { JSXConverters } from "@payloadcms/richtext-lexical/react"
import { cva } from "class-variance-authority"
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  InfoIcon,
  LucideProps,
  XCircleIcon,
} from "lucide-react"
import { getTranslations } from "next-intl/server"
import { JSX } from "react"

import { CalloutNode, SerializedCalloutNode } from "@/features"
import { cn } from "@/utils"

type CalloutVariant = NonNullable<CalloutNode["__variant"]>

const CalloutIcon = ({
  className,
  variant,
  ...props
}: LucideProps & { variant: CalloutVariant }) => {
  const icons: Record<CalloutVariant, JSX.Element> = {
    error: <XCircleIcon className={cn(className, "text-red-600")} {...props} />,
    info: <InfoIcon className={cn(className, "text-blue-600")} {...props} />,
    success: (
      <CheckCircle2Icon
        className={cn(className, "text-green-600")}
        {...props}
      />
    ),
    warning: (
      <AlertTriangleIcon
        className={cn(className, "text-yellow-600")}
        {...props}
      />
    ),
  }
  return icons[variant] ?? icons.info
}

const calloutStyles = cva(
  "rounded-lg border-l-4 px-4 py-3 my-4 flex items-start gap-3",
  {
    defaultVariants: {
      variant: "info",
    },
    variants: {
      variant: {
        error: "bg-red-50 dark:bg-red-900/20 border-red-500",
        info: "bg-muted border-accent",
        success: "bg-green-50 dark:bg-green-900/20 border-green-500",
        warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500",
      },
    },
  },
)

export const CalloutJSXConverter: JSXConverters<SerializedCalloutNode> = {
  callout: async ({ node }: { node: SerializedCalloutNode }) => {
    const { message, title, variant = "info" } = node
    const t = await getTranslations("Callout")
    const label = t(variant)

    return (
      <section
        aria-label={label}
        aria-live="polite"
        className={calloutStyles({ variant })}
        data-variant={variant}
        role="status"
        tabIndex={0}
      >
        <span
          aria-hidden="true"
          className="flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <CalloutIcon
            aria-label={label}
            className="h-5 w-5"
            focusable={false}
            role="img"
            variant={variant}
          />
        </span>
        <div className="flex w-full flex-col gap-1">
          {title && (
            <h3 className="text-foreground mt-0 mb-1 text-base font-semibold">
              {title}
            </h3>
          )}
          <div className="text-muted-foreground text-sm">{message}</div>
        </div>
      </section>
    )
  },
}
