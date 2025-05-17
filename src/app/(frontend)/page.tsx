import { SearchParams } from "nuqs/server"
import { Suspense } from "react"

import { Contact, ContactFallback } from "./_components/contact"
import { Hacktivity, HacktivityFallback } from "./_components/hacktivity"
import { Hero, HeroFallback } from "./_components/hero"
import { Highlights, HighlightsFallback } from "./_components/highlights"
import { Skills, SkillsFallback } from "./_components/skills"

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  return (
    <main className="flex flex-col place-content-center">
      <Suspense fallback={<HeroFallback />}>
        <Hero />
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
