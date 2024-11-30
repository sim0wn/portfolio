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
import { ContactForm } from "./contact-form"
import { Translation } from "@/lib/translations.lib"
import { FaqRepository } from "@/repositories/faq-repository"
import { getLocale } from "@/utils"
import { SanityDatabase } from "@/lib/sanity-database.lib"

export async function Extra({ translation }: { translation: Translation }) {
  const { landingPage } = translation
  const database = new SanityDatabase()
  const locale = await getLocale()
  const repository = new FaqRepository(database)
  const faqs = await repository.findAll(locale)
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
