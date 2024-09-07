import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.utils"
import classNames from "classnames"
import Image from "next/image"

import { jetbrains_mono } from "./fonts"

export default async function Homepage() {
  const translation = await getTranslation(getLocale())
  return (
    /* main container */
    <main className="flex flex-col place-content-center gap-4 p-2">
      {/* logo */}
      <article className="flex flex-col md:flex-row-reverse md:mx-auto gap-2 items-center">
        <Image
          alt={translation.alt.avatar}
          className="rounded-full"
          height="300"
          src="/images/mascot.svg"
          width="300"
        />
        <section className="md:max-w-lg">
          <h1 className="font-bold self-start">{translation.salutation}</h1>
          <p
            className={classNames(
              jetbrains_mono.className,
              "font-light text-justify",
            )}
          >
            {translation.bio}
          </p>
        </section>
      </article>
      <blockquote className="text-sm md:max-w-2xl md:mx-auto">
        <p className="text-center">&quot;{translation.quote.message}&quot;</p>
        <footer className="text-right">
          — {translation.quote.author},{" "}
          <cite>What it means to be an intellectual</cite>
        </footer>
      </blockquote>
    </main>
  )
}
