import { intlFormatDistance } from "date-fns"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { headers } from "next/headers"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  createSearchParamsCache,
  parseAsInteger,
  SearchParams,
} from "nuqs/server"

import { Button, ExternalLink, Skeleton } from "@/components/ui"
import { getDictionary } from "@/lib"
import { HacktivityService } from "@/services/hacktivity-service.service"
import { getLocale } from "@/utils"

import { ChallengeCategoryIcon } from "./challenge-category-icon"

export async function Hacktivity({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const searchParamsCache = createSearchParamsCache(
    {
      hacktivity: parseAsInteger.withDefault(1),
    },
    { urlKeys: { hacktivity: "h" } },
  )
  const { hacktivity: hacktivityPage } = searchParamsCache.parse(
    await searchParams,
  )
  const { data, pagination } = await HacktivityService.fetchActivities(
    hacktivityPage,
    8,
  )
  if (hacktivityPage > pagination.totalPages) {
    redirect(`/?h=${pagination.totalPages}`)
  } else if (hacktivityPage < 1) {
    redirect(`/`)
  }
  const locale = getLocale(await headers())
  const {
    landingPage: { hacktivity },
    pagination: paginationDictionary,
  } = await getDictionary(locale)
  return (
    <section className="container flex h-fit flex-col place-items-center justify-center py-16">
      <h1 className="py-2 text-center text-lg font-semibold">
        {hacktivity.title}
      </h1>
      <section className="flex h-min w-full flex-1 flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        {data.map(({ category, date, name, platform, url }, index) => (
          <article
            className="flex flex-1 items-center justify-stretch gap-2 rounded-md border p-2 shadow-sm"
            key={index}
          >
            <Button asChild variant={"ghost"}>
              <ExternalLink href={platform.profileUrl}>
                <Image
                  alt={platform.name}
                  height={35}
                  src={platform.iconUrl}
                  width={35}
                />
              </ExternalLink>
            </Button>
            <div className="flex w-full flex-col flex-wrap place-items-start gap-x-2 sm:flex-row sm:items-center">
              <Button asChild className="w-fit p-0 text-wrap" variant={"link"}>
                <ExternalLink href={url}>{name}</ExternalLink>
              </Button>
              <ChallengeCategoryIcon category={category} />
            </div>
            <time
              className="ml-auto w-fit text-sm text-nowrap"
              dateTime={date.toISOString()}
            >
              {intlFormatDistance(date, new Date())}
            </time>
          </article>
        ))}
        <footer className="flex items-center justify-center gap-2 *:w-fit">
          <Button asChild variant={"ghost"}>
            <Link href={`/?h=1`} scroll={false}>
              <ChevronFirst />
            </Link>
          </Button>
          <Button asChild variant={"ghost"}>
            <Link href={`/?h=${pagination.previousPage}`} scroll={false}>
              <ChevronLeft />
            </Link>
          </Button>
          <p>
            {paginationDictionary.current.in} {pagination.currentPage}{" "}
            {paginationDictionary.current.of} {pagination.totalPages}
          </p>
          <Button asChild variant={"ghost"}>
            <Link href={`/?h=${pagination.nextPage}`} scroll={false}>
              <ChevronRight />
            </Link>
          </Button>
          <Button asChild variant={"ghost"}>
            <Link href={`/?h=${pagination.totalPages}`} scroll={false}>
              <ChevronLast />
            </Link>
          </Button>
        </footer>
      </section>
    </section>
  )
}

export function HacktivityFallback() {
  return (
    <section className="container flex h-fit flex-col place-items-center justify-center gap-4 py-16">
      <Skeleton className="h-8 w-32" />
      <section className="flex h-min w-full flex-col gap-2 rounded-md border p-2.5 shadow-sm">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton className="h-12 w-full py-8" key={index} />
        ))}
        <footer className="flex w-full items-center justify-center gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </footer>
      </section>
    </section>
  )
}
