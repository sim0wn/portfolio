import { getTranslation } from "@/lib/translations.lib"
import { getLocale } from "@/utils/locale.util"
import { SanityDatabase } from "@/lib/sanity-database.lib"
import { HighlightRepository } from "@/repositories/highlight-repository"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { urlFor } from "@/utils"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SkillRepository } from "@/repositories/skill-repository"
import classNames from "classnames"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Mascot } from "@/components/icons"
import { findAllHacktivity } from "@/lib/hacktivity.lib"
import { PlatformIcon } from "./components/platform-icon"
import { ExternalLink } from "@/components/ui/external-link"
import { ChallengeCategoryIcon } from "./components/challenge-category-icon"
import { intlFormatDistance } from "date-fns"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ContactForm } from "./components/contact-form"
import { FaqRepository } from "@/repositories/faq-repository"
import { ScrollArea } from "@/components/ui/scroll-area"

export default async function LandingPage() {
  const locale = await getLocale()
  const translation = await getTranslation(locale)
  const database = new SanityDatabase()
  const highlightRepository = new HighlightRepository(database)
  const highlights = await highlightRepository.findAll(locale)
  const skillRepository = new SkillRepository(database)
  const skills = await skillRepository.findAll(locale)
  const hacktivity = await findAllHacktivity()
  const faqRepository = new FaqRepository(database)
  const faqs = await faqRepository.findAll(locale)
  const { landingPage } = translation
  return (
    <main className="flex flex-col place-content-center">
      <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
        <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
          <h1 className="text-3xl font-extrabold">
            {landingPage.headline.title}
          </h1>
          <p className="pb-4">{landingPage.headline.subTitle}</p>
          <Button asChild>
            <Link href="#contact" className="self-center">
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
      <section className="flex flex-col items-center gap-4 bg-neutral-200 py-4 dark:bg-neutral-900">
        {highlights.map(({ _id, icon, title, slug }) => (
          <Button
            variant={"outline"}
            className="bg-gradient-to-t from-purple-600 to-purple-300 dark:from-[#8A4BCA] dark:to-[#A77BFF]"
            key={_id}
            asChild
          >
            <Link href={`/highlights/${slug.current}`} scroll={false}>
              <Image
                src={urlFor(icon).url()}
                width={100}
                height={1}
                alt={title}
              />
            </Link>
          </Button>
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
                        {translation.landingPage.services.dialogTriggerLabel}
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
      <section className="container flex h-fit flex-col place-items-center justify-center py-16">
        <h1 className="py-2 text-center text-lg font-semibold">
          {landingPage.hacktivity.title}
        </h1>
        <ScrollArea className="flex max-h-[28rem] w-full rounded-md border bg-neutral-100 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <section className="flex h-max flex-1 flex-col gap-2 p-2.5">
            {hacktivity.map(
              ({ name, platform, category, date, url }, index) => (
                <article
                  className="flex flex-1 items-center gap-2 rounded-md border bg-neutral-50 p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-950"
                  key={index}
                >
                  <PlatformIcon platform={platform} />
                  <div className="flex w-full flex-col flex-wrap place-items-start gap-x-2 sm:flex-row sm:items-center">
                    <Button
                      asChild
                      variant={"link"}
                      className="w-fit text-wrap p-0"
                    >
                      <ExternalLink href={url}>{name}</ExternalLink>
                    </Button>
                    <ChallengeCategoryIcon category={category} />
                  </div>
                  <time
                    dateTime={date}
                    className="ml-auto w-fit text-nowrap text-sm"
                  >
                    {intlFormatDistance(date, new Date())}
                  </time>
                </article>
              ),
            )}
          </section>
        </ScrollArea>
      </section>
      <section className="container grid grid-rows-[min-content_1fr] items-center gap-x-12 gap-y-8 py-12 lg:grid-cols-2 lg:grid-rows-1">
        <aside>
          <p className="text-center text-lg font-semibold md:text-start">
            {landingPage.faq.title}
          </p>
          <Accordion type="single" collapsible>
            {faqs.map(({ _id, question, answer }) => (
              <AccordionItem key={_id} value={_id}>
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
    </main>
  )
}
