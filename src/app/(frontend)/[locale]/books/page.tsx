import { Locale } from "next-intl"

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

export default async function Page({ params }: Props) {
  const { locale } = await params
  const { docs: books } = await payload.find({
    collection: "books",
    locale,
  })
  return (
    <main className="container grid flex-1 grid-rows-[min-content_1fr] gap-2 md:grid-cols-2 lg:grid-cols-3">
      {books.map(({ description, id, slug, title }) => (
        <Card className="h-fit" key={id}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>{description}</CardContent>
          <CardFooter>
            <Button asChild variant={"ghost"}>
              <Link href={`/books/${slug}`} locale={locale}>
                Acessar
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  )
}
