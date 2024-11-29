import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.util"
import { Hacktivity } from "./components/hacktivity"
import { Hero } from "./components/hero"
import { Features } from "./components/features"
import { Extra } from "./components/extra"

export default async function LandingPage() {
  const translation = await getTranslation(await getLocale())
  return (
    <main className="flex flex-col place-content-center">
      <Hero translation={translation} />
      <Features translation={translation} />
      <Hacktivity translation={translation} />
      <Extra translation={translation} />
    </main>
  )
}
