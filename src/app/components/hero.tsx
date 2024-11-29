import { Mascot } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Translation } from "@/lib/translations.lib"
import Link from "next/link"

export async function Hero({ translation }: { translation: Translation }) {
  const { landingPage } = translation
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
