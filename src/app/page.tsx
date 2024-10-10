import { ContactForm } from "@/components/contact-form"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { findAllFAQs } from "@/lib/faqs.lib"
import { findAllHighlights } from "@/lib/highlights.lib"
import { findAllServices } from "@/lib/services.lib"
import { findAllTestimonials } from "@/lib/testimonial.lib"
import { getTranslation } from "@/lib/translations.lib"
import { getInitials } from "@/utils/get-initials.util"
import { urlFor } from "@/utils/image.util"
import { getLocale } from "@/utils/locale.util"
import { DialogDescription } from "@radix-ui/react-dialog"
import { StarIcon } from "lucide-react"
import { PortableText } from "next-sanity"
import Link from "next/link"
import { Mascot } from "../components/icons/mascot"
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
} from "../components/ui/carousel"

export default async function LandingPage() {
  const { landingPage } = await getTranslation(getLocale())
  return (
    <main className="flex flex-col place-content-center gap-24">
      {/* Call for Action */}
      <section className="container flex items-center justify-between gap-x-12 gap-y-4 py-24 md:py-36">
        {/* Headline */}
        <aside className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold">
            {landingPage.headline.title}
          </h1>
          <p>{landingPage.headline.subTitle}</p>
          <Link
            href="#contact"
            className="w-fit self-center rounded-md bg-purple-plum p-2 font-semibold"
          >
            {landingPage.headline.contactLink}
          </Link>
        </aside>
        <aside className="hidden md:block">
          <Mascot className="rounded-full text-[16rem]" />
        </aside>
      </section>
      {/* Services */}
      <section className="flex flex-col place-items-center justify-center bg-purple-plum">
        <h1 className="py-4 text-lg font-semibold">
          {landingPage.services.title}
        </h1>
        <section className="flex flex-wrap px-4 pb-12">
          {(await findAllServices()).map(
            ({ _id, title, brief, description }) => (
              <Card key={_id} className="max-w-lg">
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
                      <DialogDescription>
                        <PortableText value={description}></PortableText>
                      </DialogDescription>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ),
          )}
        </section>
      </section>
      {/* Highlights */}
      <section className="container flex flex-col items-center gap-4 py-12">
        <h1 className="text-lg font-semibold">
          {landingPage.highlights.title}
        </h1>
        {(await findAllHighlights()).map(({ _id, title, description }) => (
          <Card key={_id} className="max-w-md">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <PortableText value={description} />
            </CardContent>
          </Card>
        ))}
      </section>
      {/* Social Proof */}
      <section className="container flex flex-col items-center gap-4 py-8">
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
      </section>
      {/* Contact Section */}
      <section className="container grid grid-rows-[min-content_1fr] items-center gap-x-12 gap-y-8 py-12 lg:grid-cols-2 lg:grid-rows-1">
        <aside>
          <p className="text-center text-lg font-semibold md:text-start">
            {landingPage.callForAction.title}
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
            <ContactForm />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
