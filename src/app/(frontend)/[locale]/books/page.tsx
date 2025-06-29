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
import { Link } from "@/i18n"
import { payload } from "@/lib"

type Props = {
  params: Promise<{ locale: Locale }>
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
      {books.map(({ description, id, slug, title }) => (
        <li key={id}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
            <CardFooter>
              <Button asChild variant={"link"}>
                <Link href={`/books/${slug}`} locale={locale}>
                  {t("card.button")}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </li>
      ))}
    </ul>
  )
}
