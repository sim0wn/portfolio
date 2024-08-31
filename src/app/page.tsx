import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.utils"
import classNames from "classnames"
import Image from "next/image"

import { jetbrains_mono } from "./fonts"

export default async function Homepage() {
  const translation = await getTranslation(getLocale())
  return (
    /* main container */
    <main className="flex sm:flex-row-reverse flex-col place-items-center justify-center gap-4 p-2">
      {/* logo */}
      <Image
        alt={translation.alt.avatar}
        className="rounded-full"
        height="300"
        src="/images/mascot.svg"
        width="300"
      />
      <aside className="max-w-lg">
        <h1 className="font-bold">{translation.homepage.greeting}</h1>
        <p className={classNames(jetbrains_mono.className, "font-light")}>
          {translation.homepage.bio}
        </p>
      </aside>
    </main>
  )
}
