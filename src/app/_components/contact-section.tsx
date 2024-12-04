import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Database } from "@/interfaces/database"
import { Translation } from "@/lib/translations.lib"
import { FaqRepository } from "@/repositories/faq-repository"
import { Locale } from "@/types/locale.type"
import { ContactForm } from "./contact-form"
import { Skeleton } from "@/components/ui/skeleton"

export async function ContactSection({
  database,
  translation: { landingPage },
  locale,
}: {
  translation: Translation
  database: Database
  locale: Locale
}) {
  const faqRepository = new FaqRepository(database)
  const faqs = await faqRepository.findAll(locale)
  return (
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
          <CardDescription>{landingPage.contactForm.subTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <ContactForm translation={landingPage} />
        </CardContent>
      </Card>
    </section>
  )
}

export function ContactSectionFallback() {
  return (
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
  )
}
