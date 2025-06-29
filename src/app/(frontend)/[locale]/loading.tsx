import { getTranslations } from "next-intl/server"

import { Mascot } from "@/components"

export default async function Loading() {
  const t = await getTranslations("Loading")
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="flex h-full flex-col items-center justify-center gap-6"
    >
      <div className="relative inline-flex aspect-square h-32 w-32 items-center justify-center md:h-48 md:w-48">
        {/* Spinner */}
        <div
          aria-hidden="true"
          className="border-t-gradient-to-bl absolute inset-0 rounded-full border-6 border-t-purple-900 drop-shadow-2xl motion-safe:animate-[spin_1.7s_ease-in-out_infinite]"
        >
          <div className="bg-blur-md h-full w-full rounded-full bg-slate-100 dark:bg-zinc-900" />
        </div>
        <Mascot
          aria-label="Mascote"
          className="relative size-full rounded-full p-1.5"
          role="img"
        />
      </div>
      <span className="sr-only">{t("sr")}</span>
    </div>
  )
}
