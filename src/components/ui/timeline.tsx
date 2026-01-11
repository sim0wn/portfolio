import { getTranslations } from "next-intl/server"
import {
  Children,
  Fragment,
  HTMLAttributes,
  isValidElement,
  LiHTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
  TimeHTMLAttributes,
} from "react"

import { cn } from "@/utils"

/**
 * @example
 * ```tsx
 * <Timeline data-orientation="vertical">
 *  <Timeline.Item>
 *    <Timeline.Marker />
 *    <Timeline.Content>
 *      <Timeline.Header>
 *        <Timeline.Title>Title</Timeline.Title>
 *      </Timeline.Header>
 *      <Timeline.Subtitle>Subtitle</Timeline.Subtitle>
 *      <Timeline.Date dateTime="2023-01-01">January 1, 2023</Timeline.Date>
 *    </Timeline.Content>
 *  </Timeline.Item>
 * </Timeline>
 * ```
 */
function Timeline({
  children,
  className,
  ...props
}: OlHTMLAttributes<HTMLOListElement> & {
  "data-orientation": "horizontal" | "vertical"
}) {
  return (
    <ol
      className={cn(
        "relative flex gap-8",
        "group/timeline",
        "data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:overflow-x-auto",
        "data-[orientation=vertical]:flex-col data-[orientation=vertical]:md:gap-12",
        className,
      )}
      role="list"
      {...props}
    >
      {children}
    </ol>
  )
}

function TimelineContent({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "peer-data-[orientation=horizontal]/dot:mt-4",
        "peer-data-[orientation=vertical]/dot:ml-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TimelineDate({
  children,
  className,
  ...props
}: TimeHTMLAttributes<HTMLTimeElement>) {
  return (
    <time
      className={cn("text-primary/80 text-xs font-medium", className)}
      {...props}
    >
      {children}
    </time>
  )
}

async function TimelineDateRange({
  children,
  className,
  onGoing = false,
  separator = "–",
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  onGoing?: boolean
  separator?: string
}) {
  const childArray = Children.toArray(children)
  const dateComponents = childArray.filter(
    (child) => isValidElement(child) && child.type === TimelineDate,
  )
  const t = await getTranslations("Components.Timeline")

  return (
    <div
      className={cn(
        "text-primary/80 flex items-center gap-1.5 text-xs font-medium",
        className,
      )}
      {...props}
    >
      {dateComponents.map((child, index) => (
        <Fragment key={index}>
          {child}
          {index < dateComponents.length - 1 && (
            <span aria-hidden="true" className="text-muted-foreground/60">
              {separator}
            </span>
          )}
        </Fragment>
      ))}
      {onGoing && dateComponents.length === 1 && (
        <>
          <span aria-hidden="true" className="text-muted-foreground/60">
            {separator}
          </span>
          <span className="font-semibold">{t("onGoing")}</span>
        </>
      )}
    </div>
  )
}

function TimelineDescription({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "text-foreground/80 mt-2 text-sm leading-relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function TimelineHeader({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {children}
    </header>
  )
}

function TimelineItem({
  children,
  className,
  ...props
}: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      className={cn(
        "group/item relative flex",
        "group-data-[orientation=horizontal]/timeline:min-w-64 group-data-[orientation=horizontal]/timeline:flex-1 group-data-[orientation=horizontal]/timeline:flex-col group-data-[orientation=horizontal]/timeline:items-center",
        "group-data-[orientation=vertical]/timeline:flex-row group-data-[orientation=vertical]/timeline:items-start group-data-[orientation=vertical]/timeline:gap-6",
        "last:*:[&.marker>.connector]:hidden",
        className,
      )}
      role="listitem"
      {...props}
    >
      {children}
    </li>
  )
}

function TimelineMarker({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "marker peer/marker",
        "relative flex flex-col items-center",
        "group-data-[orientation=horizontal]/timeline:flex-row",
      )}
      role="presentation"
    >
      <div
        className={cn(
          "border-background relative z-10 flex shrink-0 items-center justify-center rounded-full border-2 shadow-sm transition-all duration-300 hover:shadow-md",
          "bg-primary text-primary-foreground hover:ring-primary/20 hover:ring-2",
          "h-6 w-6",
          className,
        )}
        role={props["aria-label"] ? "img" : "presentation"}
        {...props}
      >
        {children ? (
          <span className="flex h-full w-full items-center justify-center">
            {children}
          </span>
        ) : (
          <span
            aria-hidden="true"
            className="rounded-full bg-current opacity-70"
          />
        )}
      </div>

      {/* Linha conectora - esconde no último item */}
      <div
        aria-hidden="true"
        className={cn(
          "connector",
          "from-border absolute bg-linear-to-b to-transparent transition-all duration-300",
          "group-data-[orientation=vertical]/timeline:top-10 group-data-[orientation=vertical]/timeline:left-2.5 group-data-[orientation=vertical]/timeline:h-8 group-data-[orientation=vertical]/timeline:w-px",
          "group-data-[orientation=horizontal]/timeline:top-2.5 group-data-[orientation=horizontal]/timeline:left-10 group-data-[orientation=horizontal]/timeline:h-px group-data-[orientation=horizontal]/timeline:w-8",
        )}
      />
    </div>
  )
}

function TimelineSubtitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <h4
      className={cn("text-muted-foreground text-sm font-medium", className)}
      {...props}
    >
      {children}
    </h4>
  )
}

function TimelineTitle({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-foreground text-base leading-tight font-semibold",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

Timeline.Item = TimelineItem
Timeline.Header = TimelineHeader
Timeline.Content = TimelineContent
Timeline.Description = TimelineDescription
Timeline.Marker = TimelineMarker
Timeline.Title = TimelineTitle
Timeline.Subtitle = TimelineSubtitle
Timeline.Date = TimelineDate
Timeline.DateRange = TimelineDateRange

export { Timeline }
