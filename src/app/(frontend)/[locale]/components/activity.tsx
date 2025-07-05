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
import { Locale, useLocale, useTranslations } from "next-intl"
import { parseAsInteger, parseAsString, useQueryState } from "nuqs"
import { useEffect, useState } from "react"
import useSWR from "swr"

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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components"
import { Link } from "@/i18n"
import { ActivityCategory, Activity as ActivityType } from "@/types"
import { cn } from "@/utils"

const PAGE_SIZE = 10

export function Activity() {
  const locale = useLocale()
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
  const [activityCategories, setActivityCategories] = useState<
    ActivityCategory[]
  >([])

  const getActivities = async () => {
    const params = new URLSearchParams({
      depth: "1",
      limit: PAGE_SIZE.toString(),
      locale,
      page: page.toString(),
      ...(category && category !== "*"
        ? { "where[category.slug][equals]": category }
        : {}),
      ...(title ? { "where[title][like]": title } : {}),
    })
    const res = await fetch(
      "/api/activities" + (params ? `?${params.toString()}` : ""),
    )
    if (!res.ok) throw new Error("Failed to fetch activities")
    return res.json()
  }

  const getCategories = async (locale: Locale) => {
    const params = new URLSearchParams({ locale })
    const res = await fetch(
      "/api/activity-categories" + (params ? `?${params.toString()}` : ""),
    )
    if (!res.ok) throw new Error("Failed to fetch categories")
    return res.json()
  }

  const { data, isLoading } = useSWR(
    { category, locale, page, title, url: "/api/activities" },
    getActivities,
  )

  useEffect(() => {
    getCategories(locale).then(({ docs }) => setActivityCategories(docs))
  }, [locale])

  const activities = data?.docs ?? []
  const {
    hasNextPage,
    hasPrevPage,
    nextPage,
    page: currentPage,
    pagingCounter,
    prevPage,
    totalDocs,
    totalPages,
  } = data ?? {}

  return (
    <section
      aria-label={t("activities.title")}
      className="container flex flex-col items-center justify-center py-16"
      id="activities"
    >
      <h1 className="py-2 text-center text-lg font-semibold">
        {t("activities.title")}
      </h1>
      <div className="mb-6 flex w-full flex-col gap-x-2 gap-y-4 sm:flex-row sm:items-end">
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="category">
            {t("activities.filter.category.label")}
          </Label>
          <Select
            defaultValue={category}
            name="category"
            onValueChange={(v) => {
              if (v !== "*") {
                setCategory(v)
              } else {
                setCategory(null)
              }
              setPage(1)
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
              {activityCategories.map(({ id, name, slug }) => (
                <SelectItem key={id} value={slug}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Text Search */}
        <div className="flex flex-1 flex-col gap-1">
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
              setPage(1)
            }}
            placeholder={t("activities.filter.title.placeholder")}
            type="search"
          />
        </div>
        <Button className="self-end" type="submit">
          {t("activities.filter.submit.label")}
        </Button>
      </div>
      {/* Results */}
      <section className="flex w-full flex-col gap-2 rounded-md border p-2 shadow-sm">
        <ul
          aria-label={t("activities.ariaList")}
          className={cn(
            "flex w-full flex-col gap-1 overflow-y-auto p-0.5",
            "divide-border divide-y",
          )}
        >
          {isLoading ? (
            <ListFallback />
          ) : activities.length === 0 ? (
            <li className="text-muted-foreground w-full py-8 text-center">
              {t("activities.no-data", {
                category:
                  activityCategories.find((ac) => ac.slug === category)?.name ??
                  category,
                hasTitle: title && "true",
                title,
              })}
            </li>
          ) : (
            activities.map(
              ({
                category: activityCategory,
                platform,
                ...activity
              }: ActivityType) => (
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
                      <TooltipContent>{activity.title}</TooltipContent>
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
                    {activity.attachments &&
                      activity.attachments.length > 0 && (
                        <ul
                          aria-label={t("activities.attachments")}
                          className="flex flex-col gap-1"
                        >
                          {activity.attachments.map(
                            (
                              {
                                description,
                                url,
                              }: NonNullable<
                                ActivityType["attachments"]
                              >[number],
                              i: number,
                            ) => (
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
                        activity.metadata &&
                        typeof activity.metadata === "object" &&
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
                            {
                              (activity.metadata as { category: string })
                                .category
                            }
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
            )
          )}
        </ul>
        {/* Pagination */}
        <nav
          aria-label={t("activities.pagination.ariaLabel")}
          className="flex flex-col items-center gap-4 md:flex-row md:justify-between"
        >
          <span aria-live="polite" className="text-muted-foreground text-sm">
            {t("activities.pagination.summary", {
              from: pagingCounter,
              to: activities.length + pagingCounter - 1,
              total: totalDocs,
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
              onClick={() => setPage(prevPage)}
              size="icon"
              variant="ghost"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[64px] text-center text-sm">
              {t("activities.pagination.label", {
                page: currentPage ?? page,
                totalPages,
              })}
            </span>
            <Button
              aria-label={t("activities.pagination.next")}
              disabled={!hasNextPage}
              onClick={() => setPage(nextPage)}
              size="icon"
              variant="ghost"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              aria-label={t("activities.pagination.last")}
              disabled={page === totalPages}
              onClick={() => setPage(totalPages)}
              size="icon"
              variant="ghost"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </nav>
      </section>
    </section>
  )
}

export function ActivityFallback() {
  return (
    <section
      aria-busy="true"
      aria-label="Carregando atividades"
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
        <ul aria-hidden className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <ListFallback />
        </ul>
        {/* Pagination skeleton */}
        <nav
          aria-hidden
          aria-label="Paginação de atividades (carregando)"
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

const ListFallback = () =>
  Array.from({ length: PAGE_SIZE - 4 }).map((_, i) => (
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
  ))
