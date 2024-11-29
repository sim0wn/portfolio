import { portableTextComponents } from "@/components/portable-text-components"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sanityClient } from "@/lib/sanity-client.lib"
import { Translation } from "@/lib/translations.lib"
import { HighlightRepository } from "@/repositories/highlight-repository"
import { SkillRepository } from "@/repositories/skill-repository"
import { getLocale, urlFor } from "@/utils"
import classNames from "classnames"
import { PortableText } from "next-sanity"
import Image from "next/image"

export async function Features({ translation }: { translation: Translation }) {
  const { landingPage } = translation
  const locale = await getLocale()
  const highlightRepository = new HighlightRepository(sanityClient)
  const highlights = await highlightRepository.findAll(locale)
  const skillRepository = new SkillRepository(sanityClient)
  const skills = await skillRepository.findAll(locale)
  return (
    <>
      <section className="flex flex-col items-center gap-4 border-t bg-neutral-200 py-4 dark:border-y-neutral-800 dark:bg-neutral-900">
        {highlights.map(({ _id, icon, title, description }) => (
          <Dialog key={_id}>
            <DialogTrigger
              asChild
              className="bg-gradient-to-t from-purple-600 to-purple-300 dark:from-[#8A4BCA] dark:to-[#A77BFF]"
            >
              <Button variant={"outline"}>
                <Image
                  src={urlFor(icon).url()}
                  width={100}
                  height={1}
                  alt={title}
                />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <DialogDescription asChild>
                <section>
                  <PortableText
                    value={description}
                    components={portableTextComponents}
                  />
                </section>
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </section>
      <section className="flex flex-col place-items-center justify-center gap-8 bg-purple-700 pb-12 pt-8 md:px-0 dark:bg-purple-1000">
        <h1 className="text-lg font-semibold text-neutral-50">
          {landingPage.services.title}
        </h1>
        <Carousel
          opts={{ align: "center", loop: true }}
          className="mx-2 flex w-full max-w-xs flex-col gap-2 md:max-w-2xl"
        >
          <CarouselContent>
            {skills.map(({ _id, title, brief, description }) => (
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
                  <CardFooter className="text-center">
                    <Dialog>
                      <DialogTrigger>
                        {landingPage.services.dialogTriggerLabel}
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{title}</DialogTitle>
                        </DialogHeader>
                        <DialogDescription asChild>
                          <section>
                            <PortableText
                              value={description}
                              components={portableTextComponents}
                            ></PortableText>
                          </section>
                        </DialogDescription>
                      </DialogContent>
                    </Dialog>
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
    </>
  )
}
