import { ContactForm } from "@/components/contact-form"
import { Mascot } from "@/components/icons"
import { portableTextComponents } from "@/components/portable-text-components"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { findAllFAQs } from "@/lib/faqs.lib"
import { findAllHighlights } from "@/lib/highlights.lib"
import { findAllServices } from "@/lib/services.lib"
import { getTranslation } from "@/lib/translations.lib"
import { urlFor } from "@/utils/image.util"
import { getLocale } from "@/utils/locale.util"
import { PortableText } from "next-sanity"
import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { findAllHacktivity } from "@/lib/hacktivity.lib"
import { Button } from "@/components/ui/button"
import classNames from "classnames"
import { intlFormatDistance } from "date-fns"
import { ExternalLink } from "@/components/ui/external-link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlatformIcon } from "./components/platform-icon"
import { ChallengeCategoryIcon } from "./components/challenge-category-icon"

export default async function LandingPage() {
  const { landingPage } = await getTranslation(getLocale())
  const hacktivity = await findAllHacktivity()
  const services = await findAllServices()
  return (
    <main className="flex flex-col place-content-center">
      {/* Hero Section */}
      <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-8 py-12 md:py-24">
        {/* Headline */}
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
      {/* Highlights */}
      <section className="flex flex-col items-center gap-4 border-t-2 border-t-neutral-800 bg-neutral-900 py-4">
        {(await findAllHighlights()).map(
          ({ _id, icon, title, description }) => (
            <Dialog key={_id}>
              <DialogTrigger
                asChild
                className="bg-gradient-to-t from-[#8A4BCA] to-[#A77BFF]"
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
          ),
        )}
      </section>
      {/* Services */}
      <section className="flex flex-col place-items-center justify-center gap-8 bg-purple-1000 pb-12 pt-8 md:px-0">
        <h1 className="text-lg font-semibold">{landingPage.services.title}</h1>
        <Carousel
          opts={{ align: "center", loop: true }}
          className="mx-2 flex w-full max-w-xs flex-col gap-2 md:max-w-2xl"
        >
          <CarouselContent>
            {services.map(({ _id, title, brief, description }) => (
              <CarouselItem
                key={_id}
                className={classNames({
                  "md:basis-1/2": services.length <= 2,
                  "lg:basis-1/3": services.length > 2,
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
      {/* Hacktivity */}
      <section className="container flex flex-col place-items-center justify-center py-16">
        <h1 className="py-2 text-center text-lg font-semibold">
          {landingPage.hacktivity.title}
        </h1>
        <ScrollArea className="flex max-h-[28rem] w-full rounded-md border border-neutral-800">
          <section className="flex flex-1 flex-col gap-2 p-2.5">
            {hacktivity.map(
              ({ name, platform, category, date, url }, index) => (
                <article
                  className="flex flex-1 items-center gap-2 rounded-md border border-neutral-800 p-2"
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
            {(await findAllFAQs()).map(({ _id, question, answer }) => (
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
            <ContactForm translation={landingPage.contactForm.fields} />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
