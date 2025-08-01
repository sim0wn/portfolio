import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"
import { SWRConfig, unstable_serialize } from "swr"

import { getActivitiesAction, getActivityCategoriesAction } from "@/actions"

import { About, AboutFallback } from "./components/about"
import { Activity, ActivitySkeleton } from "./components/activities"
import { Featured, FeaturedFallback } from "./components/featured"
import { Hero, HeroFallback } from "./components/hero"
import { Skills, SkillsFallback } from "./components/skills"

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<SearchParams>
}) {
  const { locale } = await params

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <SWRConfig
      value={{
        fallback: {
          [unstable_serialize({
            category: "",
            collection: "activities",
            locale,
            page: 1,
            title: "",
          })]: getActivitiesAction(),
          [unstable_serialize({ collection: "activity-categories", locale })]:
            getActivityCategoriesAction(),
        },
        keepPreviousData: true,
        // Disable revalidation since I'm doing manual revalidation
        revalidateOnFocus: false,
        revalidateOnMount: false,
        revalidateOnReconnect: false,
      }}
    >
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<FeaturedFallback />}>
        <Featured locale={locale} />
      </Suspense>
      <Suspense fallback={<SkillsFallback />}>
        <Skills locale={locale} />
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <Activity locale={locale} />
      </Suspense>
      <Suspense fallback={<AboutFallback />}>
        <About locale={locale} />
      </Suspense>
    </SWRConfig>
  )
}
