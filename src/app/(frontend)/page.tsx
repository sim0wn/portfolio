import { Mascot } from "@/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ExternalLink,
  Skeleton,
} from "@/components/ui"
import { getDictionary, payload } from "@/lib"
import { HacktivityService } from "@/services/hacktivity-service.service"
import { Media } from "@/types"
import { cn, getLocale, truncateString } from "@/utils"
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
import { Suspense } from "react"

import { ChallengeCategoryIcon } from "./_components/challenge-category-icon"
import { ContactForm } from "./_components/contact-form"

const searchParamsCache = createSearchParamsCache(
  {
    hacktivity: parseAsInteger.withDefault(1),
  },
  { urlKeys: { hacktivity: "h" } },
)

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const locale = getLocale(await headers())
  const { landingPage, pagination: paginationDictionary } =
    await getDictionary(locale)
  const { hacktivity: hacktivityPage } =
    await searchParamsCache.parse(searchParams)
  const { data, pagination } = await HacktivityService.fetchActivities(
    hacktivityPage,
    8,
  )
  if (hacktivityPage > pagination.totalPages) {
    redirect(`/?h=${pagination.totalPages}`)
  } else if (hacktivityPage < 1) {
    redirect(`/`)
  }
  return (
    <main className="flex flex-col place-content-center">
      <Suspense
        fallback={
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
        }
      >
        <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
          <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
            <h1 className="text-3xl font-extrabold">
              {landingPage.headline.title}
            </h1>
            <p className="pb-4">{landingPage.headline.subTitle}</p>
            <Button asChild>
              <Link className="self-center" href="#contact">
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
      </Suspense>
      <Suspense
        fallback={
          <section className="flex place-content-center gap-4 bg-neutral-200 py-4 dark:bg-neutral-900">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton className="h-10 w-32" key={index} />
            ))}
          </section>
        }
      >
        <section className="flex place-content-center gap-4 bg-neutral-200 py-4 dark:bg-neutral-900">
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
              <Link href={`/highlights/${slug}`} scroll={false}>
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
      </Suspense>
      <Suspense
        fallback={
          <section className="dark:bg-purple-1000 flex flex-col place-items-center justify-center gap-8 bg-purple-700 pt-8 pb-12 md:px-0">
            <Skeleton className="h-4 w-56" />
            <div className="flex gap-8 *:h-96 *:w-80">
              <Skeleton />
              <Skeleton className="hidden md:block" />
              <Skeleton className="hidden lg:block" />
            </div>
            <div className="flex gap-4">
              {Array.from({ length: 2 }).map((_, index) => (
                <Skeleton className="h-10 w-10" key={index} />
              ))}
            </div>
          </section>
        }
      >
        <section className="dark:bg-purple-1000 flex flex-col place-items-center justify-center gap-8 bg-purple-700 pt-8 pb-12 md:px-0">
          <h1 className="text-lg font-semibold text-neutral-50">
            {landingPage.services.title}
          </h1>
          <Carousel
            className="mx-2 flex w-full max-w-xs flex-col gap-2 md:max-w-2xl"
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent>
              {(
                await payload.find({
                  collection: "skills",
                  locale,
                  pagination: false,
                  select: { brief: true, id: true, slug: true, title: true },
                })
              ).docs.map(({ brief, id, slug, title }, _, self) => (
                <CarouselItem
                  className={cn({
                    "basis-full": self.length === 1,
                    "lg:basis-1/3": self.length > 2,
                    "md:basis-1/2": self.length <= 2,
                  })}
                  key={id}
                >
                  <Card className="flex h-full flex-col">
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      {truncateString(brief, 300)}
                    </CardContent>
                    <CardFooter className="flex w-full place-content-center">
                      <Button
                        asChild
                        className="text-center"
                        variant={"outline"}
                      >
                        <Link href={`/skills/${slug}`} scroll={false}>
                          {landingPage.services.dialogTriggerLabel}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <footer className="flex justify-center gap-2">
              <CarouselPrevious />
              <CarouselNext />
            </footer>
          </Carousel>
        </section>
      </Suspense>
      <Suspense
        fallback={
          <section className="container flex h-fit flex-col place-items-center justify-center gap-4 py-16">
            <Skeleton className="h-8 w-32" />
            <section className="flex h-min w-full flex-col gap-2 rounded-md border bg-neutral-100 p-2.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
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
        }
      >
        <section className="container flex h-fit flex-col place-items-center justify-center py-16">
          <h1 className="py-2 text-center text-lg font-semibold">
            {landingPage.hacktivity.title}
          </h1>
          <section className="flex h-min w-full flex-1 flex-col gap-2 rounded-md border bg-neutral-100 p-2.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            {data.map(({ category, date, name, platform, url }, index) => (
              <article
                className="flex flex-1 items-center justify-stretch gap-2 rounded-md border bg-neutral-50 p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
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
                  <Button
                    asChild
                    className="w-fit p-0 text-wrap"
                    variant={"link"}
                  >
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
      </Suspense>
      <Suspense
        fallback={
          <section className="container grid grid-rows-[min-content_1fr] items-center gap-x-12 gap-y-8 py-12 lg:grid-cols-2 lg:grid-rows-1">
            <aside className="flex flex-col gap-4">
              <Skeleton className="h-8 w-48 self-center text-lg font-semibold md:self-start" />
              <section className="flex flex-col gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton className="h-12 w-full" key={index} />
                ))}
              </section>
            </aside>
            <article className="flex flex-col gap-8 rounded-md border p-4 dark:border-neutral-800">
              <section className="flex flex-col gap-2">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-2 w-64" />
              </section>
              <section className="flex flex-col gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index}>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                ))}
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-36 w-full" />
                <Skeleton className="h-12 w-24" />
              </section>
            </article>
          </section>
        }
      >
        <section className="container grid grid-rows-[min-content_1fr] items-center gap-x-12 gap-y-8 py-12 lg:grid-cols-2 lg:grid-rows-1">
          <aside>
            <p className="text-center text-lg font-semibold md:text-start">
              {landingPage.faq.title}
            </p>
            <Accordion collapsible type="single">
              {(
                await payload.find({
                  collection: "faq",
                  locale,
                  pagination: false,
                })
              ).docs.map(({ answer, id, question }) => (
                <AccordionItem key={id} value={id}>
                  <AccordionTrigger>{question}</AccordionTrigger>
                  <AccordionContent>{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </aside>
          <Card id="contact">
            <CardHeader>
              <CardTitle>{landingPage.contactForm.title}</CardTitle>
              <CardDescription>
                {landingPage.contactForm.subTitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm translation={landingPage} />
            </CardContent>
          </Card>
        </section>
      </Suspense>
    </main>
  )
}
