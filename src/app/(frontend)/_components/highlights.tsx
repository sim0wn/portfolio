import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { Button, Skeleton } from "@/components/ui"
import { payload } from "@/lib"
import { Media } from "@/types"
import { getLocale } from "@/utils"

export async function Highlights() {
  const locale = getLocale(await headers())
  return (
    <section className="flex place-content-center gap-4 border-y border-y-neutral-900 py-4">
      {(
        await payload.find({
          collection: "highlights",
          depth: 1,
          locale,
        })
      ).docs.map(({ icon, id, slug }) => (
        <Button
          asChild
          className="bg-gradient-to-t from-purple-600 to-purple-300 dark:from-[#8A4BCA] dark:to-[#A77BFF]"
          key={id}
          variant={"outline"}
        >
          <Link className="p-8" href={`/highlights/${slug}`} scroll={false}>
            <Image
              alt={(icon as Media).alt}
              height={0}
              src={(icon as Media).url ?? ""}
              width={100}
            />
          </Link>
        </Button>
      ))}
    </section>
  )
}

export function HighlightsFallback() {
  return (
    <section className="flex place-content-center gap-4 bg-neutral-200 py-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton className="h-10 w-32" key={index} />
      ))}
    </section>
  )
}
