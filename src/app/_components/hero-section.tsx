import { Mascot } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Translation } from "@/lib/translations.lib"
import Link from "next/link"

export async function HeroSection({
  translation: { landingPage },
}: {
  translation: Translation
}) {
  return (
    <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
      <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
        <h1 className="text-3xl font-extrabold">
          {landingPage.headline.title}
        </h1>
        <p className="pb-4">{landingPage.headline.subTitle}</p>
        <Button asChild>
          <Link href="#contact" className="self-center">
            {landingPage.headline.contactLink}
          </Link>
        </Button>
      </aside>
      {/* Mascot */}
      <aside className="hidden md:block">
        <Mascot className="rounded-full text-[16rem]" />
      </aside>
      {/* Quote */}
      <p className="col-span-full inline-flex w-fit flex-col justify-self-center pt-8">
        <q className="text-center">{landingPage.headline.quote.message}</q>
        <small className="text-end">
          - {landingPage.headline.quote.author}
        </small>
      </p>
    </section>
  )
}

export function HeroSectionFallback() {
  return (
    <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
      <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
        <Skeleton className="h-8 w-full md:w-3/4" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-4 w-full" />
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
