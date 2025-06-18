import { format } from "date-fns"
import { enUS, ptBR } from "date-fns/locale"
import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "nuqs/server"

import {
  Skeleton,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components"
import { Link } from "@/i18n"
import { payload } from "@/lib"
import { cn } from "@/utils"

import { searchParamsCache } from "../search-params"

export async function Activity({
  locale,
  searchParams,
}: {
  locale: Locale
  searchParams: Promise<SearchParams>
}) {
  const t = await getTranslations("Home.activities")
  const { tab } = searchParamsCache.parse(await searchParams)

  const { docs: activityCategories } = await payload.find({
    collection: "activity-categories",
    locale,
  })
  const { docs: activities } = await payload.find({
    collection: "activities",
    limit: 8,
    locale,
    where: {
      "category.slug": {
        equals: tab ?? activityCategories[0].slug,
      },
    },
  })
  return (
    <section
      aria-label={t("title")}
      className="container flex flex-col items-center justify-center py-16"
    >
      <h1 className="py-2 text-center text-lg font-semibold">{t("title")}</h1>
      <section className="flex w-full flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        <Tabs className="w-full" value={tab ?? activityCategories[0].slug}>
          <TabsList
            aria-label={t("tabs.ariaLabel")}
            className="flex w-full flex-wrap gap-x-4 gap-y-2"
            role="tablist"
          >
            {activityCategories.map((category) => (
              <TabsTrigger
                aria-current={tab === category.slug ? "page" : undefined}
                aria-label={category.name}
                className={cn(
                  "rounded-md px-4 py-2 font-medium capitalize transition-colors",
                  "focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",
                  "aria-selected:bg-primary aria-selected:text-primary-foreground",
                )}
                key={category.id}
                value={category.slug}
              >
                <Link
                  href={`/?t=${category.slug}`}
                  locale={locale}
                  scroll={false}
                  tabIndex={-1} // Prevents nested link from being focusable, since TabsTrigger is already interactive
                >
                  {category.name}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
          {activityCategories.map((category) => (
            <TabsContent
              aria-labelledby={`tab-${category.slug}`}
              className="focus:outline-none"
              key={category.id}
              role="tabpanel"
              value={category.slug}
            >
              <ul
                aria-label={t("tabs.ariaActivities", {
                  category: category.name,
                })}
                className={cn(
                  "grid gap-4",
                  "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3",
                )}
              >
                {activities.length === 0 ? (
                  <li className="text-muted-foreground col-span-full py-8 text-center">
                    {t("tabs.no-data")}
                  </li>
                ) : (
                  activities.map((activity) => (
                    <li key={activity.id}>
                      <article
                        aria-labelledby={`activity-title-${activity.id}`}
                        className="bg-card hover:ring-primary/30 focus-within:ring-primary/40 rounded-lg border p-4 shadow-sm transition focus-within:ring-2 hover:ring-2"
                        tabIndex={-1}
                      >
                        <header className="mb-2">
                          <h3
                            className="mb-1 text-lg leading-tight font-semibold"
                            id={`activity-title-${activity.id}`}
                          >
                            {activity.url ? (
                              <Link
                                href={activity.url}
                                rel="noopener noreferrer"
                                target="_blank"
                              >
                                {activity.title}
                              </Link>
                            ) : (
                              activity.title
                            )}
                          </h3>
                          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                            <span>
                              {typeof activity.category === "object" &&
                                activity.category?.name}
                            </span>
                            <span aria-hidden="true">&middot;</span>
                            {/* If it has a workload (in minutes), show it in hours and minutes */}
                            {activity.schedule.workload && (
                              <>
                                <span>
                                  {(() => {
                                    const hours = Math.floor(
                                      activity.schedule.workload / 60,
                                    )
                                    const minutes =
                                      activity.schedule.workload % 60
                                    if (minutes === 0) {
                                      return t("tabs.workload.hours", {
                                        hours,
                                      })
                                    }
                                    if (hours === 0) {
                                      return t("tabs.workload.minutes", {
                                        minutes:
                                          activity.schedule.workload % 60,
                                      })
                                    }
                                    return t("tabs.workload.full", {
                                      hours,
                                      minutes: activity.schedule.workload % 60,
                                    })
                                  })()}
                                </span>
                                <span aria-hidden="true">&middot;</span>
                              </>
                            )}
                            <time dateTime={activity.schedule.startDate}>
                              {format(
                                new Date(activity.schedule.startDate),
                                "PPP",
                                {
                                  locale: locale === "pt-BR" ? ptBR : enUS,
                                },
                              )}
                            </time>
                            {activity.schedule.endDate && (
                              <>
                                <span aria-hidden="true">&middot;</span>
                                <time dateTime={activity.schedule.endDate}>
                                  {format(
                                    new Date(activity.schedule.endDate),
                                    "PPP",
                                    {
                                      locale: locale === "pt-BR" ? ptBR : enUS,
                                    },
                                  )}
                                </time>
                              </>
                            )}
                          </div>
                          {typeof activity.platform === "object" &&
                            activity.platform?.name && (
                              <div className="flex items-center gap-1 text-xs">
                                <span className="sr-only">
                                  {t("tabs.platform")}
                                </span>
                                {activity.platform.website ? (
                                  <Link
                                    className="underline"
                                    href={activity.platform.website}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    {activity.platform.name}
                                  </Link>
                                ) : (
                                  activity.platform.name
                                )}
                              </div>
                            )}
                        </header>
                        {activity.description && (
                          <p className="text-foreground/90 mb-2 line-clamp-3 text-sm">
                            {activity.description}
                          </p>
                        )}
                        {activity.attachments &&
                          activity.attachments.length > 0 && (
                            <ul
                              aria-label={t("tabs.attachments")}
                              className="mt-2 space-y-1"
                            >
                              {activity.attachments.map((att, i) => (
                                <li key={i}>
                                  <Link
                                    className="text-accent hover:text-accent-foreground rounded px-1 py-0.5 text-sm underline focus-visible:outline"
                                    href={att.url}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                  >
                                    {att.description || att.url}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                      </article>
                    </li>
                  ))
                )}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </section>
  )
}

export function ActivityFallback() {
  // Assume 3 categories for skeleton and 3 activities per tab for best loading UX
  const skeletonCategories = Array.from({ length: 3 })
  const skeletonCards = Array.from({ length: 3 })

  return (
    <section
      aria-busy="true"
      aria-label="Loading activities"
      className="container flex flex-col items-center justify-center py-16"
    >
      <h1 className="py-2 text-center text-lg font-semibold">
        <Skeleton className="mx-auto h-7 w-40 rounded" />
      </h1>
      <section className="flex w-full flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        <Tabs className="w-full" value="loading">
          <TabsList
            aria-label="Loading activity categories"
            className="flex w-full flex-wrap gap-x-4 gap-y-2"
            role="tablist"
          >
            {skeletonCategories.map((_, i) => (
              <TabsTrigger
                aria-disabled="true"
                className="rounded-md px-4 py-2 font-medium capitalize transition-colors"
                disabled
                key={i}
                tabIndex={-1}
                value={`loading-${i}`}
              >
                <Skeleton className="h-5 w-20 rounded" />
              </TabsTrigger>
            ))}
          </TabsList>
          {skeletonCategories.map((_, i) => (
            <TabsContent
              className="focus:outline-none"
              key={i}
              role="tabpanel"
              value={`loading-${i}`}
            >
              <ul
                aria-label="Loading activities"
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              >
                {skeletonCards.map((_, j) => (
                  <li key={j}>
                    <article
                      aria-busy="true"
                      aria-label="Loading activity"
                      className="bg-card rounded-lg border p-4 shadow-sm"
                      tabIndex={-1}
                    >
                      <header className="mb-2">
                        <h3 className="mb-1 text-lg font-semibold">
                          <Skeleton className="h-6 w-32 rounded" />
                        </h3>
                        <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                          <Skeleton className="h-4 w-20 rounded" />
                          <span aria-hidden="true">&middot;</span>
                          <Skeleton className="h-4 w-14 rounded" />
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Skeleton className="h-4 w-16 rounded" />
                        </div>
                      </header>
                      <Skeleton className="mb-2 h-5 w-full rounded" />
                      <Skeleton className="h-4 w-5/6 rounded" />
                    </article>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </section>
    </section>
  )
}
