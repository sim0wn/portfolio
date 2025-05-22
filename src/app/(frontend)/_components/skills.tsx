import { headers } from "next/headers"
import Link from "next/link"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton,
} from "@/components/ui"
import { getDictionary, payload } from "@/lib"
import { cn, getLocale, truncateString } from "@/utils"

export async function Skills() {
  const locale = getLocale(await headers())
  const {
    landingPage: { services },
  } = await getDictionary(locale)
  const { docs: skills } = await payload.find({
    collection: "skills",
    locale,
    pagination: false,
    select: { brief: true, id: true, slug: true, title: true },
  })
  return (
    <section
      className={cn(
        "flex flex-col place-items-center justify-center gap-8 pt-8 pb-12 md:px-0",
      )}
    >
      <h1 className="text-lg font-semibold text-neutral-50">
        {services.title}
      </h1>
      <div className="mx-auto w-full px-4 py-10">
        <Carousel
          className="mx-auto max-w-5xl"
          opts={{
            align: "center",
            containScroll: "trimSnaps",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {skills.map(({ brief, id, slug, title }) => (
              <CarouselItem
                className="h-full pl-2 sm:basis-4/5 md:basis-3/4 md:pl-4 lg:basis-2/3"
                key={id}
              >
                <Card className="max-h-sm overflow-hidden select-none">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent className={cn("flex min-h-[250px] items-start")}>
                    {truncateString(brief, 300)}
                  </CardContent>
                  <CardFooter className="flex place-content-center">
                    <Button asChild className="text-center" variant={"outline"}>
                      <Link href={`/skills/${slug}`} scroll={false}>
                        {services.dialogTriggerLabel}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  )
}

export function SkillsFallback() {
  return (
    <section className="flex flex-col place-items-center justify-center gap-8 pt-8 pb-12 md:px-0">
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
  )
}
