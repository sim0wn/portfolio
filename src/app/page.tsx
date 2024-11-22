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
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { Hacktivity } from "@/types/hacktivity.type"
import { dateCell } from "./components/date-cell"

export default async function LandingPage() {
  const { landingPage } = await getTranslation(getLocale())
  const locale = getLocale()
  const hacktivity = await findAllHacktivity()
  const hacktivityTableColumnDefinition: ColumnDef<Hacktivity>[] = [
    { accessorKey: "name", header: landingPage.hacktivity.tableHeaders.name },
    {
      accessorKey: "category",
      header: landingPage.hacktivity.tableHeaders.category,
    },
    {
      accessorKey: "points",
      header: landingPage.hacktivity.tableHeaders.points,
    },
    {
      accessorKey: "date",
      header: landingPage.hacktivity.tableHeaders.date,
      cell: dateCell,
    },
  ]
  return (
    <main className="flex flex-col place-content-center">
      {/* Hero Section */}
      <section className="container grid grid-cols-[1fr_16rem] items-center justify-between gap-x-12 gap-y-4 py-12 md:py-24">
        {/* Headline */}
        <aside className="col-span-full flex flex-col gap-2 md:col-span-1">
          <h1 className="text-3xl font-extrabold">
            {landingPage.headline.title}
          </h1>
          <p>{landingPage.headline.subTitle}</p>
          <Link
            href="#contact"
            className="w-fit self-center rounded-md bg-purple-1000 p-2 font-semibold"
          >
            {landingPage.headline.contactLink}
          </Link>
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
              <DialogTrigger className="rounded-md border-2 border-neutral-800 bg-gradient-to-br from-berry-600 via-purple-800 via-75% to-purple-1000 p-2">
                <Image
                  src={urlFor(icon).url()}
                  width={100}
                  height={1}
                  alt={title}
                />
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
      <section className="flex flex-col place-items-center justify-center gap-8 bg-gradient-to-r from-purple-1000 via-berry-600 to-purple-1000 pb-12 pt-8">
        <h1 className="text-lg font-semibold">{landingPage.services.title}</h1>
        <Carousel
          opts={{ align: "center", loop: true }}
          className="max-w-xs sm:max-w-sm md:max-w-xl"
        >
          <CarouselContent>
            {(await findAllServices()).map(
              ({ _id, title, brief, description }) => (
                <CarouselItem key={_id} className="">
                  <Card>
                    <CardHeader>
                      <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{brief}</p>
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
              ),
            )}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      {/* Hacktivity */}
      <section className="container">
        <h1 className="py-12 text-lg font-semibold">
          {landingPage.hacktivity.title}
        </h1>
        <DataTable
          columns={hacktivityTableColumnDefinition}
          data={hacktivity}
        />
      </section>
      {/* Social Proof */}
      {/* <section className="container flex flex-col items-center gap-4 py-8">
        <h1 className="text-lg font-semibold">
          {landingPage.socialProof.title}
        </h1>
        <p>{landingPage.socialProof.subTitle}</p>
        <Carousel className="w-full max-w-xs">
          <CarouselContent>
            {(await findAllTestimonials()).map(
              ({ name, company, rating, review, photo, role, _id }) => (
                <CarouselItem key={_id}>
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-2">
                      <Avatar className="bg-primary p-0.5">
                        <AvatarImage src={photo ? urlFor(photo).url() : ""} />
                        <AvatarFallback>{getInitials(name)}</AvatarFallback>
                      </Avatar>
                      <address className="flex flex-col">
                        <span>{name}</span>
                        <span>
                          {role} @ {company}
                        </span>
                      </address>
                    </CardHeader>
                    <CardContent>{review}</CardContent>
                    <CardFooter className="flex gap-2">
                      <span className="flex">
                        {Array.from({ length: rating }).map((_, index) => (
                          <StarIcon key={index} />
                        ))}
                      </span>
                      {rating}
                    </CardFooter>
                  </Card>
                </CarouselItem>
              ),
            )}
          </CarouselContent>
        </Carousel>
      </section> */}
      {/* Contact Section */}
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
