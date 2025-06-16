import { getTranslations } from "next-intl/server"
import Link from "next/link"

import { Button, Mascot, Skeleton } from "@/components"

export async function Hero() {
  const t = await getTranslations("Home.hero")
  return (
    <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
      <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
        <h1 className="text-3xl font-extrabold">{t("title")}</h1>
        <p className="pb-4">{t("description")}</p>
        <Button asChild>
          <Link className="self-center" href="#contact">
            {t("cta")}
          </Link>
        </Button>
      </aside>
      {/* Mascot */}
      <aside className="hidden md:block">
        <Mascot className="rounded-full text-[16rem]" />
      </aside>
      {/* Quote */}
      <p className="col-span-full inline-flex w-fit flex-col justify-self-center pt-8">
        <q className="text-center">{t("quote.message")}</q>
        <small className="text-end">- {t("quote.author")}</small>
      </p>
    </section>
  )
}

export function HeroFallback() {
  return (
    <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
      <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
        <Skeleton className="h-8 w-full md:w-3/4" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton className="h-4 w-full" key={index} />
        ))}
        <Skeleton className="mt-4 h-10 w-32 self-center" />
      </aside>
      <aside className="hidden md:block">
        <Skeleton className="h-[16rem] w-[16rem] rounded-full" />
      </aside>
      <footer className="col-span-full flex w-full flex-col items-end justify-center gap-2 justify-self-center px-8 pt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-32" />
      </footer>
    </section>
  )
}
