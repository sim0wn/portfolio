import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"

import { Skeleton } from "@/components/ui"
import { payload } from "@/lib"
import { Media } from "@/types"
import { getLocale } from "@/utils"

export async function Highlights() {
  const locale = getLocale(await headers())
  return (
    <section className="border-y border-y-neutral-200 dark:border-y-neutral-800">
      <ul className="container my-auto flex justify-center gap-2">
        {(
          await payload.find({
            collection: "highlights",
            depth: 1,
            locale,
          })
        ).docs.map(({ icon, id, slug }) => (
          <li className="flex items-center" key={id}>
            <Link
              className="group relative h-16 w-40"
              href={`/highlights/${slug}`}
              key={id}
              scroll={false}
            >
              <Image
                alt={(icon as Media).alt}
                className="rounded-md bg-gradient-to-t from-purple-600 to-purple-300 p-2 group-hover:from-purple-600/90 group-hover:ring-2 group-hover:ring-neutral-200 dark:from-[#8A4BCA] dark:to-[#A77BFF] group-hover:dark:from-[#8A4BCA]/90 group-hover:dark:ring-neutral-800"
                fill
                objectFit={"contain"}
                src={(icon as Media).url ?? ""}
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function HighlightsFallback() {
  return (
    <section className="container border-y border-y-neutral-200 dark:border-y-neutral-800">
      <ul className="flex place-content-center gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <li className="flex items-center" key={index}>
            <Skeleton className="h-16 w-40" key={index} />
          </li>
        ))}
      </ul>
    </section>
  )
}
