import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.util"
import { SanityDatabase } from "@/lib/sanity-database.lib"
import {
  createSearchParamsCache,
  parseAsInteger,
  SearchParams,
} from "nuqs/server"
import { HeroSection, HeroSectionFallback } from "./_components/hero-section"
import {
  HighlightsSection,
  HighlightsSectionFallback,
} from "./_components/highlights-section"
import {
  SkillsSection,
  SkillsSectionFallback,
} from "./_components/skills-section"
import {
  HacktivitySectionFallback,
  HacktivitySection,
} from "./_components/hacktivity-section"
import {
  ContactSection,
  ContactSectionFallback,
} from "./_components/contact-section"
import { Suspense } from "react"

const searchParamsCache = createSearchParamsCache(
  {
    hacktivity: parseAsInteger.withDefault(1),
  },
  { urlKeys: { hacktivity: "h" } },
)

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const locale = await getLocale()
  const translation = await getTranslation(locale)
  const { hacktivity: hacktivityPage } =
    await searchParamsCache.parse(searchParams)
  const database = new SanityDatabase()

  return (
    <main className="flex flex-col place-content-center">
      <Suspense fallback={<HeroSectionFallback />}>
        <HeroSection translation={translation} />
      </Suspense>
      <Suspense fallback={<HighlightsSectionFallback />}>
        <HighlightsSection database={database} locale={locale} />
      </Suspense>
      <Suspense fallback={<SkillsSectionFallback />}>
        <SkillsSection
          database={database}
          locale={locale}
          translation={translation}
        />
      </Suspense>
      <Suspense fallback={<HacktivitySectionFallback />}>
        <HacktivitySection page={hacktivityPage} translation={translation} />
      </Suspense>
      <Suspense fallback={<ContactSectionFallback />}>
        <ContactSection
          database={database}
          locale={locale}
          translation={translation}
        />
      </Suspense>
    </main>
  )
}
