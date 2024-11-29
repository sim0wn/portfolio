import { Translation } from "@/lib/translations.lib"
import { PlatformIcon } from "./platform-icon"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/ui/external-link"
import { ChallengeCategoryIcon } from "./challenge-category-icon"
import { intlFormatDistance } from "date-fns"
import { findAllHacktivity } from "@/lib/hacktivity.lib"
import { ScrollArea } from "@/components/ui/scroll-area"

export async function Hacktivity({
  translation,
}: {
  translation: Translation
}) {
  const { landingPage } = translation
  const hacktivity = await findAllHacktivity()
  return (
    <section className="container flex flex-col place-items-center justify-center py-16">
      <h1 className="py-2 text-center text-lg font-semibold">
        {landingPage.hacktivity.title}
      </h1>
      <ScrollArea className="flex max-h-[28rem] w-full rounded-md border border-neutral-800">
        <section className="flex flex-1 flex-col gap-2 p-2.5">
          {hacktivity.map(({ name, platform, category, date, url }, index) => (
            <article
              className="flex flex-1 items-center gap-2 rounded-md border border-neutral-800 p-2"
              key={index}
            >
              <PlatformIcon platform={platform} />
              <div className="flex w-full flex-col flex-wrap place-items-start gap-x-2 sm:flex-row sm:items-center">
                <Button
                  asChild
                  variant={"link"}
                  className="w-fit text-wrap p-0"
                >
                  <ExternalLink href={url}>{name}</ExternalLink>
                </Button>
                <ChallengeCategoryIcon category={category} />
              </div>
              <time
                dateTime={date}
                className="ml-auto w-fit text-nowrap text-sm"
              >
                {intlFormatDistance(date, new Date())}
              </time>
            </article>
          ))}
        </section>
      </ScrollArea>
    </section>
  )
}
