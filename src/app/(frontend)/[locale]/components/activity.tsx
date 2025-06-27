import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  Paperclip,
} from "lucide-react"
import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "nuqs/server"
import { Where } from "payload"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
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
import { payload } from "@/lib"
import { cn } from "@/utils"

import { searchParamsCache } from "../search-params"

const PAGE_SIZE = 8

export async function Activity({
  locale,
  searchParams,
}: {
  locale: Locale
  searchParams: Promise<SearchParams>
}) {
  const t = await getTranslations("Home")
  const parsedSearchParams = searchParamsCache.parse(await searchParams)
  const { category, page, title } = parsedSearchParams

  const activityWhere: Where = {}
  if (category && category !== "*") {
    activityWhere["category.slug"] = { equals: category }
  }
  if (title) {
    activityWhere["title"] = { like: title }
  }
  const [
    { docs: activityCategories },
    {
      docs: activities,
      hasNextPage,
      hasPrevPage,
      nextPage,
      page: currentPage,
      pagingCounter,
      prevPage,
      totalDocs,
      totalPages,
    },
  ] = await Promise.all([
    payload.find({
      collection: "activity-categories",
      locale,
    }),
    payload.find({
      collection: "activities",
      limit: PAGE_SIZE % 2 == 0 ? PAGE_SIZE : PAGE_SIZE + 1, // Ensure even number for grid layout
      locale,
      page,
      pagination: true,
      where: activityWhere,
    }),
  ])

  function buildPageUrl(page: number) {
    const paramsObj = { ...parsedSearchParams, page, title }
    return (
      "?" +
      Object.entries(paramsObj)
        .filter(([, v]) => v !== undefined && v !== "")
        .map(
          ([k, v]) =>
            `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
        )
        .join("&") +
      "#activities"
    )
  }

  return (
    <section
      aria-label={t("activities.title")}
      className="container flex flex-col items-center justify-center py-16"
      id="activities"
    >
      <h1 className="py-2 text-center text-lg font-semibold">
        {t("activities.title")}
      </h1>
      {/* Filters */}
      <form
        action="/#activities"
        className="mb-6 flex w-full flex-col gap-x-2 gap-y-4 sm:flex-row sm:items-end"
        method="GET"
        role="search"
      >
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="category">
            {t("activities.filter.category.label")}
          </Label>
          <Select defaultValue={category} name="category">
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
            placeholder={t("activities.filter.title.placeholder")}
            type="search"
          />
        </div>
        <Button className="self-end" type="submit">
          {t("activities.filter.submit.label")}
        </Button>
      </form>
      {/* Results */}
      <section className="flex w-full flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        <ul
          aria-label={t("activities.ariaList")}
          className={cn(
            "grid gap-4",
            "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3",
          )}
        >
          {activities.length === 0 ? (
            <li className="text-muted-foreground col-span-full py-8 text-center">
              {t("activities.no-data", {
                category:
                  activityCategories.find((ac) => ac.slug === category)?.name ??
                  category,
                hasTitle: title && "true",
                title,
              })}
            </li>
          ) : (
            activities.map(({ category, platform, ...activity }) => (
              <li key={activity.id}>
                <Card
                  aria-labelledby={`activity-title-${activity.id}`}
                  className="h-full justify-between"
                  tabIndex={-1}
                >
                  <CardHeader>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CardTitle
                          className="truncate overflow-hidden whitespace-nowrap"
                          id={`activity-title-${activity.id}`}
                        >
                          {activity.url ? (
                            <Link
                              className="focus-visible:outline"
                              href={activity.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              {activity.title}
                            </Link>
                          ) : (
                            activity.title
                          )}
                        </CardTitle>
                      </TooltipTrigger>
                      <TooltipContent>{activity.title}</TooltipContent>
                    </Tooltip>
                    <div className="text-muted-foreground flex flex-wrap items-start gap-2 text-xs">
                      <span className="flex gap-2">
                        <Badge>
                          {typeof category === "object" && category.name}
                        </Badge>
                        {platform && typeof platform === "object" && (
                          <Badge variant="outline">
                            {platform.website ? (
                              <Link
                                className="underline"
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

                        {activity.schedule.workload && (
                          <Badge variant="secondary">
                            <Clock />
                            {(() => {
                              const hours = Math.floor(
                                activity.schedule.workload / 60,
                              )
                              const minutes = activity.schedule.workload % 60
                              if (minutes === 0) {
                                return t("activities.schedule.workload.hours", {
                                  hours,
                                })
                              }
                              if (hours === 0) {
                                return t(
                                  "activities.schedule.workload.minutes",
                                  {
                                    minutes,
                                  },
                                )
                              }
                              return t("activities.schedule.workload.full", {
                                hours,
                                minutes,
                              })
                            })()}
                          </Badge>
                        )}
                      </span>
                      <span className="flex gap-1">
                        <Badge variant={"secondary"}>
                          {!activity.schedule.endDate
                            ? t("activities.schedule.date.single", {
                                startDate: new Date(
                                  activity.schedule.startDate,
                                ),
                              })
                            : t("activities.schedule.date.range", {
                                endDate: new Date(activity.schedule.endDate),
                                startDate: new Date(
                                  activity.schedule.startDate,
                                ),
                              })}
                        </Badge>
                      </span>
                    </div>
                  </CardHeader>
                  {activity.description && (
                    <CardContent>
                      <Dialog>
                        <DialogTrigger asChild>
                          <p className="text-foreground/90 cursor-pointer truncate text-sm">
                            {activity.description}
                          </p>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{activity.title}</DialogTitle>
                          </DialogHeader>
                          {activity.description}
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  )}
                  {activity.attachments && activity.attachments.length > 0 && (
                    <CardFooter>
                      <ul
                        aria-label={t("activities.attachments")}
                        className="space-y-1"
                      >
                        {activity.attachments.map((att, i) => (
                          <li key={i}>
                            <Link
                              className="text-accent hover:text-accent-foreground group flex items-center gap-2 rounded px-1 py-0.5 text-sm underline focus-visible:outline"
                              href={att.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              <Paperclip
                                aria-label="Anexo"
                                className={`bg-muted text-accent group-hover:bg-accent group-hover:text-accent-foreground group-focus-visible:bg-accent group-focus-visible:text-accent-foreground mr-1 shrink-0 rounded p-1 shadow-sm transition-all duration-200 group-hover:shadow-lg`}
                                role="img"
                                strokeWidth={2}
                              />
                              {att.description}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </CardFooter>
                  )}
                </Card>
              </li>
            ))
          )}
        </ul>
        {/* Pagination */}
        <nav
          aria-label={t("activities.pagination.ariaLabel")}
          className="mt-6 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:justify-between"
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
              asChild
              size="icon"
              variant="ghost"
            >
              {hasPrevPage ? (
                <Link href={buildPageUrl(1)}>
                  <ChevronsLeft className="h-4 w-4" />
                </Link>
              ) : (
                <span>
                  <ChevronsLeft className="h-4 w-4 opacity-50" />
                </span>
              )}
            </Button>
            <Button
              aria-label={t("activities.pagination.previous")}
              asChild
              size="icon"
              variant="ghost"
            >
              {hasPrevPage ? (
                <Link href={buildPageUrl(prevPage ?? page)}>
                  <ChevronLeft className="h-4 w-4" />
                </Link>
              ) : (
                <span>
                  <ChevronLeft className="h-4 w-4 opacity-50" />
                </span>
              )}
            </Button>
            <span className="min-w-[64px] text-center text-sm">
              {t("activities.pagination.label", {
                page: currentPage ?? page,
                totalPages,
              })}
            </span>
            <Button
              aria-label={t("activities.pagination.next")}
              asChild
              size="icon"
              variant="ghost"
            >
              {hasNextPage ? (
                <Link href={buildPageUrl(nextPage ?? page)}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              ) : (
                <span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </span>
              )}
            </Button>
            <Button
              aria-label={t("activities.pagination.last")}
              asChild
              disabled={page === totalPages}
              size="icon"
              variant="ghost"
            >
              {page === totalPages ? (
                <span>
                  <ChevronsRight className="h-4 w-4 opacity-50" />
                </span>
              ) : (
                <Link href={buildPageUrl(totalPages)}>
                  <ChevronsRight className="h-4 w-4" />
                </Link>
              )}
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
      <section className="flex w-full flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        <ul
          aria-hidden
          className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
        >
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <li key={i}>
              <Card
                aria-label="Carregando atividade"
                className="flex h-full animate-pulse flex-col justify-between"
                tabIndex={-1}
              >
                <CardHeader>
                  <CardTitle className="truncate overflow-hidden whitespace-nowrap">
                    <Skeleton className="h-5 w-4/5 rounded" />
                  </CardTitle>
                  <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <Badge className="h-5 w-20 rounded" variant="outline">
                      <Skeleton className="h-full w-full" />
                    </Badge>
                    <span>&middot;</span>
                    <Skeleton className="h-4 w-8 rounded" />
                    <span>&middot;</span>
                    <Skeleton className="h-4 w-14 rounded" />
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    <Skeleton className="h-4 w-16 rounded" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="mb-2 h-4 w-full rounded" />
                  <Skeleton className="mb-2 h-4 w-3/4 rounded" />
                  <Skeleton className="h-4 w-2/3 rounded" />
                </CardContent>
                <CardFooter>
                  <ul aria-hidden className="mt-2 w-full space-y-2">
                    {[0, 1].map((att) => (
                      <li className="flex items-center gap-2" key={att}>
                        <span className="bg-muted text-accent mr-1 shrink-0 rounded p-1 shadow-sm">
                          <Paperclip
                            className="opacity-60"
                            size={18}
                            strokeWidth={2}
                          />
                        </span>
                        <Skeleton className="h-4 w-24 rounded" />
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
            </li>
          ))}
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
