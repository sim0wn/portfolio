import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"

import { Contact, ContactFallback } from "./_components/contact"
import { Hacktivity, HacktivityFallback } from "./_components/hacktivity"
import { Hero, HeroFallback } from "./_components/hero"
import { Highlights, HighlightsFallback } from "./_components/highlights"
import { Skills, SkillsFallback } from "./_components/skills"

type Props = {
  params: Promise<{ locale: Locale }>
  searchParams: Promise<SearchParams>
}

export default async function LandingPage({ params, searchParams }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "Home" })
  return (
    <main className="flex flex-1 flex-col place-content-center">
      <Suspense fallback={<HeroFallback />}>
        <Hero
          cta={t("hero.cta")}
          description={t("hero.description")}
          quote={{
            author: t("hero.quote.author"),
            message: t("hero.quote.message"),
          }}
          title={t("hero.title")}
        />
      </Suspense>
      <Suspense fallback={<HighlightsFallback />}>
        <Highlights />
      </Suspense>
      <Suspense fallback={<SkillsFallback />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<HacktivityFallback />}>
        <Hacktivity searchParams={searchParams} />
      </Suspense>
      <Suspense fallback={<ContactFallback />}>
        <Contact />
      </Suspense>
    </main>
  )
}
