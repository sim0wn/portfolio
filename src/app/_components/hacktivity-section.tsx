import { Button } from "@/components/ui/button"
import { ExternalLink } from "@/components/ui/external-link"
import { Translation } from "@/lib/translations.lib"
import { HacktivityService } from "@/services/hacktivity-service.service"
import Image from "next/image"
import { redirect } from "next/navigation"
import { ChallengeCategoryIcon } from "./challenge-category-icon"
import { intlFormatDistance } from "date-fns"
import Link from "next/link"
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export async function HacktivitySection({
  translation: { landingPage, pagination: paginationTranslation },
  page,
}: {
  translation: Translation
  page: number
}) {
  const { data, pagination } = await HacktivityService.fetchActivities(page, 8)
  if (page > pagination.totalPages) {
    redirect(`/?h=${pagination.totalPages}`)
  } else if (page < 1) {
    redirect(`/`)
  }
  return (
    <section className="container flex h-fit flex-col place-items-center justify-center py-16">
      <h1 className="py-2 text-center text-lg font-semibold">
        {landingPage.hacktivity.title}
      </h1>
      <section className="flex h-min w-full flex-1 flex-col gap-2 rounded-md border bg-neutral-100 p-2.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {data.map(({ name, platform, category, date, url }, index) => (
          <article
            className="flex flex-1 items-center justify-stretch gap-2 rounded-md border bg-neutral-50 p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
            key={index}
          >
            <Button asChild variant={"ghost"}>
              <ExternalLink href={platform.profileUrl}>
                <Image
                  src={platform.iconUrl}
                  alt={platform.name}
                  width={35}
                  height={35}
                />
              </ExternalLink>
            </Button>
            <div className="flex w-full flex-col flex-wrap place-items-start gap-x-2 sm:flex-row sm:items-center">
              <Button asChild variant={"link"} className="w-fit text-wrap p-0">
                <ExternalLink href={url}>{name}</ExternalLink>
              </Button>
              <ChallengeCategoryIcon category={category} />
            </div>
            <time
              dateTime={date.toISOString()}
              className="ml-auto w-fit text-nowrap text-sm"
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
            {paginationTranslation.current.in} {pagination.currentPage}{" "}
            {paginationTranslation.current.of} {pagination.totalPages}
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

export function HacktivitySectionFallback() {
  return (
    <section className="container flex h-fit flex-col place-items-center justify-center gap-4 py-16">
      <Skeleton className="h-8 w-32" />
      <section className="flex h-min w-full flex-col gap-2 rounded-md border bg-neutral-100 p-2.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full py-8" />
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
