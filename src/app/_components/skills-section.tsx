import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Database } from "@/interfaces/database"
import { Translation } from "@/lib/translations.lib"
import { SkillRepository } from "@/repositories/skill-repository"
import { Locale } from "@/types/locale.type"
import classNames from "classnames"
import Link from "next/link"

export async function SkillsSection({
  database,
  locale,
  translation: { landingPage },
}: {
  database: Database
  locale: Locale
  translation: Translation
}) {
  const skillRepository = new SkillRepository(database)
  const skills = await skillRepository.findAll(locale)
  return (
    <section className="flex flex-col place-items-center justify-center gap-8 bg-purple-700 pb-12 pt-8 md:px-0 dark:bg-purple-1000">
      <h1 className="text-lg font-semibold text-neutral-50">
        {landingPage.services.title}
      </h1>
      <Carousel
        opts={{ align: "center", loop: true }}
        className="mx-2 flex w-full max-w-xs flex-col gap-2 md:max-w-2xl"
      >
        <CarouselContent>
          {skills.map(({ _id, title, brief, slug }) => (
            <CarouselItem
              key={_id}
              className={classNames({
                "md:basis-1/2": skills.length <= 2,
                "lg:basis-1/3": skills.length > 2,
              })}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-wrap">{brief}</p>
                </CardContent>
                <CardFooter>
                  <Button variant={"link"} asChild className="text-center">
                    <Link scroll={false} href={`/skills/${slug.current}`}>
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
  )
}

export function SkillsSectionFallback() {
  return (
    <section className="flex flex-col place-items-center justify-center gap-8 bg-purple-700 pb-12 pt-8 md:px-0 dark:bg-purple-1000">
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
