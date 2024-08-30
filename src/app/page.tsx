import { getDictionary } from "@/lib/dictionaries"
import { getLocale } from "@/utils/locale.utils"
import classNames from "classnames"
import { headers } from "next/headers"
import Image from "next/image"

import { jetbrains_mono } from "./fonts"

export default async function Home() {
  const dictionary = await getDictionary(getLocale(headers()))
  return (
    /* main container */
    <main className="flex sm:flex-row-reverse flex-col place-items-center justify-center gap-4 p-2">
      {/* logo */}
      <Image
        alt="Brave purple squirrel mascot logo."
        className="rounded-full"
        height="300"
        src="/images/mascot.svg"
        width="300"
      />
      <aside className="max-w-lg">
        <h1 className="font-bold">{dictionary.homepage.greeting}</h1>
        <p className={classNames(jetbrains_mono.className, "font-light")}>
          {dictionary.homepage.bio}
        </p>
      </aside>
    </main>
  )
}
