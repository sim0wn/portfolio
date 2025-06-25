import { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Skeleton,
} from "@/components/ui"
import { payload } from "@/lib"

import { Contact } from "./contact"

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home.about")
  return (
    <section className="container grid grid-rows-[min-content_1fr] items-center gap-x-12 gap-y-8 py-12 lg:grid-cols-2 lg:grid-rows-1">
      <aside>
        <p className="text-center text-lg font-semibold md:text-start">
          {t("title")}
        </p>
        <Accordion collapsible type="single">
          {(
            await payload.find({
              collection: "faq",
              locale,
              pagination: false,
            })
          ).docs.map(({ answer, id, question }) => (
            <AccordionItem key={id} value={id}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </aside>
      <Card id="contact">
        <CardHeader>
          <CardTitle>{t("form.title")}</CardTitle>
          <CardDescription>{t("form.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Contact />
        </CardContent>
      </Card>
    </section>
  )
}

export function AboutFallback() {
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
      <article className="flex flex-col gap-8 rounded-md border p-4">
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
