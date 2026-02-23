import { hasLocale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { SWRConfig, unstable_serialize } from "swr"

import { getActivitiesAction, getActivityCategoriesAction } from "@/actions"
import { routing } from "@/i18n"

import { About, AboutFallback } from "./components/about"
import { Activity, ActivitySkeleton } from "./components/activities"
import { Career } from "./components/career"
import { Featured, FeaturedFallback } from "./components/featured"
import { Skills, SkillsFallback } from "./components/skills"

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

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
      <Suspense fallback={<AboutFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<FeaturedFallback />}>
        <Featured locale={locale} />
      </Suspense>
      <Suspense fallback={<SkillsFallback />}>
        <Skills locale={locale} />
      </Suspense>
      <Career locale={locale} />
      <Suspense fallback={<ActivitySkeleton />}>
        <Activity locale={locale} />
      </Suspense>
    </SWRConfig>
  )
}
