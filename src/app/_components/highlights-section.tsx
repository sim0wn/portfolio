import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Database } from "@/interfaces/database"
import { HighlightRepository } from "@/repositories/highlight-repository"
import { Locale } from "@/types/locale.type"
import { urlFor } from "@/utils"
import Image from "next/image"
import Link from "next/link"

export async function HighlightsSection({
  database,
  locale,
}: {
  database: Database
  locale: Locale
}) {
  const highlightRepository = new HighlightRepository(database)
  const highlights = await highlightRepository.findAll(locale)
  return (
    <section className="flex place-content-center gap-4 bg-neutral-200 py-4 dark:bg-neutral-900">
      {highlights.map(({ _id, icon, title, slug }) => (
        <Button
          variant={"outline"}
          className="bg-gradient-to-t from-purple-600 to-purple-300 dark:from-[#8A4BCA] dark:to-[#A77BFF]"
          key={_id}
          asChild
        >
          <Link href={`/highlights/${slug.current}`} scroll={false}>
            <Image
              src={urlFor(icon).url()}
              width={100}
              height={1}
              alt={title}
            />
          </Link>
        </Button>
      ))}
    </section>
  )
}

export function HighlightsSectionFallback() {
  return (
    <section className="flex place-content-center gap-4 bg-neutral-200 py-4 dark:bg-neutral-900">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton className="h-10 w-32" key={index} />
      ))}
    </section>
  )
}
