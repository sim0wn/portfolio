import { Locale } from "next-intl"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"

import { About, AboutFallback } from "./components/about"
import { Activity, ActivityFallback } from "./components/activity"
import { Hero, HeroFallback } from "./components/hero"
import { Highlights, HighlightsFallback } from "./components/highlights"
import { Skills, SkillsFallback } from "./components/skills"

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<SearchParams>
}

export default async function LandingPage({ params, searchParams }: Props) {
  const { locale } = await params
  return (
    <main className="flex flex-1 flex-col place-content-center">
      <Suspense fallback={<HeroFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<HighlightsFallback />}>
        <Highlights locale={locale} />
      </Suspense>
      <Suspense fallback={<SkillsFallback />}>
        <Skills locale={locale} />
      </Suspense>
      <Suspense fallback={<ActivityFallback />}>
        <Activity locale={locale} searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<AboutFallback />}>
        <About locale={locale} />
      </Suspense>
    </main>
  )
}
