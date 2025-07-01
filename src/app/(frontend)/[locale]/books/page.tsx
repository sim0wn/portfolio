import { Locale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { Link, routing } from "@/i18n"
import { payload } from "@/lib"
import { getPageURL } from "@/utils"

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function Library({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, { docs: books }] = await Promise.all([
    getTranslations({ locale, namespace: "Library" }),
    payload.find({
      collection: "books",
      locale,
      select: {
        description: true,
        slug: true,
        title: true,
      },
    }),
  ])
  return (
    <ul className="container flex flex-col gap-4">
      {books.map(async ({ description, id, slug, title }) => {
        // Get the first page of the book to use for the card link
        const {
          docs: [page],
        } = await payload.find({
          collection: "pages",
          limit: 1,
          locale,
          select: {
            breadcrumbs: true,
          },
          sort: ["parent.slug", "slug"],
          where: {
            "book.slug": { equals: slug },
            type: {
              equals: "page",
            },
          },
        })
        return (
          <li key={id}>
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
              <CardFooter>
                <Button asChild variant={"link"}>
                  <Link href={getPageURL(page, slug)}>{t("card.button")}</Link>
                </Button>
              </CardFooter>
            </Card>
          </li>
        )
      })}
    </ul>
  )
}
