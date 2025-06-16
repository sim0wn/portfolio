import { Locale } from "next-intl"
import { notFound } from "next/navigation"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  RichText,
} from "@/components"
import { Link } from "@/i18n"
import { payload } from "@/lib"
import { Book, Page as PageCollection } from "@/types"

type Props = { params: Promise<{ locale: Locale; slug: string[] }> }

export default async function Page({ params }: Props) {
  const {
    locale,
    slug: [book, ...slug],
  } = await params
  const {
    docs: [page],
  } = await payload.find({
    collection: "pages",
    locale,
    where: {
      "book.slug": { equals: book },
      "breadcrumbs.url": { equals: `/${slug.join("/")}` },
      slug: { equals: slug[slug.length - 1] },
    },
  })
  if (!page || page.type === "section") {
    notFound()
  }
  return (
    <div>
      <h1 className="text-accent-foreground font-bold">{page.title}</h1>
      {page.description && (
        <p className="text-muted-foreground">{page.description}</p>
      )}
      {page.content ? (
        <RichText className="flex flex-col" data={page.content} />
      ) : (
        <Index locale={locale} page={page} />
      )}
    </div>
  )
}

async function Index({
  locale,
  page,
}: {
  locale: Locale
  page: PageCollection
}) {
  const { docs: pages } = await payload.find({
    collection: "pages",
    locale,
    where: {
      "parent.id": {
        equals: page.id,
      },
      type: {
        equals: "page",
      },
    },
  })
  return (
    <section className="flex flex-row flex-wrap gap-2">
      {pages.map((page) => (
        <Card className="flex-1" key={page.id}>
          <CardHeader>
            <CardTitle>
              <Link
                href={`/books/${(page.book as Book).slug}${
                  page.breadcrumbs?.find((breadcrumb) =>
                    breadcrumb.url?.endsWith(page.slug),
                  )?.url ?? "#"
                }`}
                locale={locale}
              >
                {page.title}
              </Link>
            </CardTitle>
            {page.description && (
              <CardDescription>{page.description}</CardDescription>
            )}
          </CardHeader>
        </Card>
      ))}
    </section>
  )
}
