import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Skeleton,
} from "@/components/ui"
import { payload } from "@/lib"
import { cn } from "@/utils"

export async function Skills({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.skills")
  const { docs: skills } = await payload.find({
    collection: "skills",
    locale,
    pagination: false,
  })
  return (
    <section
      aria-labelledby="skills-heading"
      className={cn(
        "flex flex-col items-center justify-center gap-8 pt-8 pb-12 md:px-0",
      )}
    >
      <h2
        className="text-lg font-semibold text-neutral-50"
        id="skills-heading"
        tabIndex={-1}
      >
        {t("title")}
      </h2>
      <div className="mx-auto w-full px-4 py-10">
        <Carousel
          aria-label={t("carousel.ariaLabel")}
          className="mx-auto max-w-5xl"
          opts={{ align: "center", containScroll: "trimSnaps", loop: true }}
        >
          <CarouselContent className="-ml-2 py-0.5 md:-ml-4">
            {skills.map((skill) => (
              <CarouselItem
                aria-roledescription={t("carousel.ariaDescription", {
                  default: "Skill card",
                })}
                className="h-full pl-2 sm:basis-4/5 md:basis-3/4 md:pl-4 lg:basis-2/3"
                key={skill.id}
              >
                <Card
                  aria-describedby={`skill-desc-${skill.id}`}
                  aria-labelledby={`skill-title-${skill.id}`}
                  className={cn(
                    "max-h-sm overflow-hidden select-none",
                    "focus-within:ring-primary focus-within:ring-2 focus-within:ring-offset-2",
                  )}
                  tabIndex={0}
                >
                  <CardHeader>
                    <CardTitle id={`skill-title-${skill.id}`}>
                      {skill.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent
                    className={cn("flex min-h-[250px] items-start")}
                    id={`skill-desc-${skill.id}`}
                  >
                    {skill.description}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            aria-label={t("carousel.previous")}
            className="left-2"
          />
          <CarouselNext aria-label={t("carousel.next")} className="right-2" />
        </Carousel>
      </div>
    </section>
  )
}

export function SkillsFallback() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading skills"
      className="flex flex-col items-center justify-center gap-8 pt-8 pb-12 md:px-0"
    >
      <Skeleton aria-hidden="true" className="h-4 w-56" />
      <div className="flex gap-8 *:h-96 *:w-80">
        <Skeleton aria-hidden="true" />
        <Skeleton aria-hidden="true" className="hidden md:block" />
        <Skeleton aria-hidden="true" className="hidden lg:block" />
      </div>
      <div className="flex gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton aria-hidden="true" className="h-10 w-10" key={index} />
        ))}
      </div>
    </section>
  )
}
