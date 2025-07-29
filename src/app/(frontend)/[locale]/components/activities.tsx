"use client"

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Paperclip,
  Syringe,
} from "lucide-react"
import { Locale, useTranslations } from "next-intl"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { useEffect, useRef } from "react"
import useSWR from "swr"

import { getActivitiesAction, getActivityCategoriesAction } from "@/actions"
import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  SpinnerOverlay,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components"
import { Link } from "@/i18n"
import { cn } from "@/utils"

function Activity({ locale }: { locale: Locale }) {
  const t = useTranslations("Home")
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault(""),
  )
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1))
  const [title, setTitle] = useQueryState(
    "title",
    parseAsString.withDefault(""),
  )
  const { data: activitiesData, isLoading: isLoadingActivity } = useSWR(
    { category, collection: "activities", locale, page, title },
    () => getActivitiesAction({ category, page, title }),
  )
  const {
    data: activityCategoriesData,
    isLoading: isLoadingActivityCategories,
  } = useSWR(
    { collection: "activity-categories", locale },
    getActivityCategoriesAction,
  )

  const activityListRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    setPage(1)
  }, [category, title, setPage])

  if (!activitiesData) {
    return <ActivitySkeleton />
  }

  const {
    docs: activities,
    hasNextPage,
    hasPrevPage,
    nextPage,
    page: currentPage,
    pagingCounter,
    prevPage,
    totalDocs,
    totalPages,
  } = activitiesData

  return (
    <section
      aria-label={t("activities.title")}
      className="container flex flex-col items-center justify-center gap-2 py-16"
      id="activities"
    >
      <header className="w-full">
        <h1 className="text-center text-lg font-semibold">
          {t("activities.title")}
        </h1>
        <form className="flex w-full flex-col gap-x-2 gap-y-4 *:flex *:flex-col *:gap-1 sm:flex-row sm:items-end">
          {/* Category Filter */}
          <div>
            <Label htmlFor="category">
              {t("activities.filter.category.label")}
            </Label>
            <Select
              defaultValue={category}
              name="category"
              onValueChange={(v) => {
                setCategory(v !== "*" ? v : null)
              }}
            >
              <SelectTrigger
                aria-label={t("activities.filter.category.label")}
                id="category"
              >
                <SelectValue
                  placeholder={t("activities.filter.category.placeholder")}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"*"}>
                  {t("activities.filter.category.placeholder")}
                </SelectItem>
                {!isLoadingActivityCategories &&
                  activityCategoriesData?.docs.map(({ id, name, slug }) => (
                    <SelectItem key={id} value={slug}>
                      {name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          {/* Text Search */}
          <div className="flex-1">
            <Label htmlFor="title">{t("activities.filter.title.label")}</Label>
            <Input
              aria-label={t("activities.filter.title.label")}
              autoComplete="off"
              className="w-full"
              defaultValue={title}
              id="title"
              name="title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              placeholder={t("activities.filter.title.placeholder")}
              type="search"
            />
          </div>
        </form>
      </header>
      {/* Results */}
      <section className="flex w-full flex-col gap-2 rounded-md border p-2 shadow-sm">
        <ul
          aria-label={t("activities.ariaList")}
          className={cn(
            "relative flex w-full flex-col gap-1 overflow-y-auto p-0.5",
            "divide-border divide-y",
          )}
          ref={activityListRef}
        >
          {isLoadingActivity ? (
            <li>
              <SpinnerOverlay />
            </li>
          ) : (
            activities.length === 0 && (
              <li className="text-muted-foreground w-full py-8 text-center">
                {t("activities.messages.noResults.description", {
                  category:
                    activityCategoriesData?.docs.find(
                      (ac) => ac.slug === category,
                    )?.name ?? category,
                  hasTitle: title && "true",
                  title,
                })}
              </li>
            )
          )}
          {activities?.map(
            ({ category: activityCategory, platform, ...activity }) => (
              <li className="flex items-center gap-2 py-1" key={activity.id}>
                {/* Title & Link */}
                <div className="min-w-0 flex-1 items-start">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        asChild
                        className="block truncate px-0 font-medium"
                        variant={"link"}
                      >
                        {activity.url ? (
                          <Link
                            className="hover:underline focus-visible:outline"
                            href={activity.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {activity.title}
                          </Link>
                        ) : (
                          activity.title
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent align={"start"}>
                      {activity.title}
                    </TooltipContent>
                  </Tooltip>
                  {/* Description preview */}
                  {activity.description && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="text-muted-foreground block cursor-pointer truncate text-xs">
                          {activity.description}
                        </span>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{activity.title}</DialogTitle>
                        </DialogHeader>
                        {activity.description}
                      </DialogContent>
                    </Dialog>
                  )}
                  {/* Attachments */}
                  {activity.attachments && activity.attachments.length > 0 && (
                    <ul
                      aria-label={t("activities.attachments")}
                      className="flex flex-col gap-1"
                    >
                      {activity.attachments.map(
                        ({ description, url }, i: number) => (
                          <li key={i}>
                            <Button
                              asChild
                              className="bg-muted text-accent size-fit p-1 shadow-sm"
                              size="icon"
                              variant="ghost"
                            >
                              <Link
                                className="text-accent hover:text-accent-foreground flex items-center gap-1 text-xs underline focus-visible:outline"
                                href={url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                <Paperclip
                                  aria-label={t("activities.attachment")}
                                  className="size-4 transition-all duration-200"
                                  role="img"
                                  strokeWidth={2}
                                />
                                {description}
                              </Link>
                            </Button>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
                {/* Badges */}
                <div className="flex min-w-max flex-col items-end gap-1">
                  <div className="flex flex-wrap gap-1">
                    {typeof activityCategory === "object" && (
                      <Badge>{activityCategory.name}</Badge>
                    )}
                    {typeof activityCategory === "object" &&
                      typeof platform === "object" &&
                      (activityCategory.slug === "lab" ||
                        activityCategory.slug === "challenge") &&
                      platform?.name === "Hack The Box" && (
                        <Badge className="capitalize" variant={"outline"}>
                          {(activity.metadata as { firstBlood: boolean })
                            .firstBlood && (
                            <span title="First blood">
                              <Syringe className="size-3" />
                            </span>
                          )}
                          {(activity.metadata as { category: string }).category}
                        </Badge>
                      )}
                    {platform && typeof platform === "object" && (
                      <Badge variant="secondary">
                        {platform.website ? (
                          <Link
                            href={platform.website}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            {platform.name}
                          </Link>
                        ) : (
                          platform.name
                        )}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {activity.schedule.workload && (
                      <Badge variant="secondary">
                        <Clock className="mr-1 h-3 w-3" />
                        {(() => {
                          const hours = Math.floor(
                            activity.schedule.workload! / 60,
                          )
                          const minutes = activity.schedule.workload! % 60
                          if (minutes === 0) {
                            return t("activities.schedule.workload.hours", {
                              hours,
                            })
                          }
                          if (hours === 0) {
                            return t("activities.schedule.workload.minutes", {
                              minutes,
                            })
                          }
                          return t("activities.schedule.workload.full", {
                            hours,
                            minutes,
                          })
                        })()}
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {!activity.schedule.endDate
                        ? t("activities.schedule.date.single", {
                            startDate: new Date(activity.schedule.startDate),
                          })
                        : t("activities.schedule.date.range", {
                            endDate: new Date(activity.schedule.endDate!),
                            startDate: new Date(activity.schedule.startDate),
                          })}
                    </Badge>
                  </div>
                </div>
              </li>
            ),
          )}
        </ul>
        {/* Pagination */}
        <footer>
          <nav
            aria-label={t("activities.pagination.ariaLabel")}
            className="flex flex-col items-center gap-4 md:flex-row md:justify-between"
          >
            <span aria-live="polite" className="text-muted-foreground text-sm">
              {t("activities.pagination.summary", {
                from: pagingCounter ?? 0,
                to:
                  activities && pagingCounter
                    ? activities.length + pagingCounter - 1
                    : 0,
                total: totalDocs ?? 0,
              })}
            </span>
            <div className="flex items-center justify-end gap-2">
              <Button
                aria-label={t("activities.pagination.first")}
                disabled={hasPrevPage && page === 1}
                onClick={() => setPage(1)}
                size="icon"
                variant="ghost"
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                aria-label={t("activities.pagination.previous")}
                disabled={!hasPrevPage}
                onClick={() => prevPage && setPage(prevPage)}
                size="icon"
                variant="ghost"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="min-w-[64px] text-center text-sm">
                {t("activities.pagination.label", {
                  page: currentPage ?? page,
                  totalPages: totalPages ?? 0,
                })}
              </span>
              <Button
                aria-label={t("activities.pagination.next")}
                disabled={!hasNextPage}
                onClick={() => nextPage && setPage(nextPage)}
                size="icon"
                variant="ghost"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                aria-label={t("activities.pagination.last")}
                disabled={page === totalPages}
                onClick={() => totalPages && setPage(totalPages)}
                size="icon"
                variant="ghost"
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </nav>
        </footer>
      </section>
    </section>
  )
}

function ActivitySkeleton() {
  return (
    <section
      aria-busy="true"
      className="container flex flex-col items-center justify-center py-16"
      id="activities"
    >
      <Skeleton aria-hidden className="mb-4 h-8 w-44 rounded" />
      {/* Filters skeleton */}
      <form
        aria-hidden
        className="mb-6 flex w-full flex-col gap-x-2 gap-y-4 sm:flex-row sm:items-end"
        tabIndex={-1}
      >
        <div className="flex w-full max-w-xs min-w-[160px] flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-24 rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <Skeleton className="mb-1 h-4 w-24 rounded" />
          <Skeleton className="h-10 w-full rounded" />
        </div>
        <Skeleton className="h-10 w-28 self-end rounded" />
      </form>
      {/* Cards grid skeleton */}
      <section className="flex w-full flex-col gap-2 rounded-md border p-2 shadow-sm">
        <ul
          aria-hidden
          className={cn(
            "relative flex w-full flex-col gap-1 overflow-y-auto p-0.5",
            "divide-border divide-y",
          )}
        >
          {[...Array(6)].map((_, i) => (
            <li
              aria-hidden="true"
              className="flex animate-pulse items-center gap-2 py-1"
              key={i}
            >
              {/* Title & Description */}
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-48 rounded" />
                {/* Attachments */}
                <ul className="mt-1 flex flex-col gap-1">
                  {[...Array(2)].map((_, i) => (
                    <li key={i}>
                      <span className="flex items-center gap-1">
                        <span className="bg-muted text-accent rounded p-1 shadow-sm">
                          <Paperclip className="size-4 opacity-60" role="img" />
                        </span>
                        <Skeleton className="h-3 w-16 rounded" />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Badges */}
              <div className="flex min-w-max flex-col items-end gap-1">
                <div className="flex flex-wrap gap-1">
                  <Skeleton className="h-5 w-16 rounded" />
                  <Skeleton className="h-5 w-14 rounded" />
                </div>
                <div className="mt-1 flex gap-1">
                  <Skeleton className="h-4 w-12 rounded" />
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 opacity-60" />
                    <Skeleton className="h-4 w-10 rounded" />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/* Pagination skeleton */}
        <nav
          aria-hidden
          className="mt-6 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between"
        >
          <Skeleton className="h-5 w-44 rounded" />
          <div className="flex items-center justify-end gap-2">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-6 w-16 rounded" />
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </nav>
      </section>
    </section>
  )
}

export { Activity, ActivitySkeleton }
