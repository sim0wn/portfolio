import { headers } from "next/headers"
import Link from "next/link"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { payload } from "@/lib"
import { getLocale } from "@/utils"

export default async function Page() {
  const locale = getLocale(await headers())
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
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter>
            <Button asChild variant={"ghost"}>
              <Link href={`/books/${slug}`}>Acessar</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </main>
  )
}
