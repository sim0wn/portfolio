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
import { headers } from "next/headers"
import Link from "next/link"

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
      <Carousel
        className="mx-2 flex w-full max-w-xs flex-col gap-2 md:max-w-2xl"
        opts={{ align: "center", loop: true }}
      >
        <CarouselContent>
          {skills.map(({ brief, id, slug, title }, _, self) => (
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
        <footer className="flex justify-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </footer>
      </Carousel>
    </section>
  )
}

export function SkillsFallback() {
  return (
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
  )
}
