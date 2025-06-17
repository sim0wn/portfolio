import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "nuqs/server"

import { activityCategories } from "@/collections/activities/activities.collection"
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
  const { docs: activities } = await payload.find({
    collection: "activities",
    limit: 8,
    locale,
    where: {
      category: {
        equals: tab,
      },
    },
  })
  return (
    <section className="container flex h-fit flex-col place-items-center justify-center py-16">
      <h1 className="py-2 text-center text-lg font-semibold">{t("title")}</h1>
      <section className="flex w-full flex-1 flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        <Tabs className="w-full" value={tab}>
          <TabsList className="flex h-full w-full flex-wrap justify-start gap-2">
            {activityCategories.map((category) => (
              <TabsTrigger
                className={cn(
                  "rounded-md px-4 py-2 font-medium capitalize transition-colors",
                  "focus-visible:ring-primary focus-visible:ring-2 focus-visible:outline-none",
                  "aria-selected:bg-primary aria-selected:text-primary-foreground",
                )}
                key={category}
                value={category}
              >
                <Link href={`/?t=${category}`} locale={locale} scroll={false}>
                  {category}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
          {activityCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <ul
                aria-label={`Activities in ${category}`}
                className={cn("grid gap-4", "sm:grid-cols-2 xl:grid-cols-3")}
              >
                {activities.length === 0 ? (
                  <li className="text-muted-foreground col-span-full py-8 text-center">
                    No activities in this category.
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
                            {activity.title}
                          </h3>
                          <div className="text-muted-foreground mb-1 flex items-center gap-2 text-xs">
                            <span className="capitalize">
                              {activity.category}
                            </span>
                            <span aria-hidden="true">&middot;</span>
                            <time dateTime={activity.date}>
                              {new Date(activity.date).toLocaleDateString()}
                            </time>
                          </div>
                          {typeof activity.platform === "object" &&
                            activity.platform?.name && (
                              <div className="flex items-center gap-1 text-xs">
                                <span className="sr-only">Platform:</span>
                                {activity.platform.name}
                              </div>
                            )}
                        </header>
                        {activity.description && (
                          <p className="text-foreground/90 mb-2 line-clamp-3 text-sm">
                            {activity.description}
                          </p>
                        )}
                        {activity.url && (
                          <div className="mb-2">
                            <Link
                              className="text-primary hover:text-primary/80 text-sm underline focus-visible:ring"
                              href={activity.url}
                              rel="noopener noreferrer"
                              target="_blank"
                            >
                              Activity Link
                            </Link>
                          </div>
                        )}
                        {activity.attachments &&
                          activity.attachments.length > 0 && (
                            <ul
                              aria-label="Attachments"
                              className="mt-2 space-y-1"
                            >
                              {activity.attachments.map((att, i) => (
                                <li key={i}>
                                  <Link
                                    className="text-accent hover:text-accent-foreground rounded px-1 py-0.5 underline focus-visible:outline"
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
  return (
    <section className="container flex h-fit flex-col place-items-center justify-center gap-4 py-16">
      <Skeleton className="h-8 w-32" />
      <section className="flex h-min w-full flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className="h-12 w-full py-8" key={index} />
        ))}
        <footer className="flex w-full items-center justify-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </footer>
      </section>
    </section>
  )
}
