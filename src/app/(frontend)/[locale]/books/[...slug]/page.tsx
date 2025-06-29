import { Locale } from "next-intl"
import { setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  RichText,
} from "@/components"
import { Link, routing } from "@/i18n"
import { payload } from "@/lib"
import { Book, Page as PageCollection } from "@/types"

type Props = { params: Promise<{ locale: Locale; slug: string[] }> }

export async function generateMetadata({ params }: Props) {
  const {
    locale,
    slug: [book, ...slug],
  } = await params
  const {
    docs: [page],
  } = await payload.find({
    collection: "pages",
    locale:
      locale === "pt-BR" || locale === "en-US" ? locale : routing.defaultLocale,
    where: {
      "book.slug": { equals: book },
      "breadcrumbs.url": { equals: `/${slug.join("/")}` },
      slug: { equals: slug[slug.length - 1] },
    },
  })
  return {
    description: page.description || undefined,
    title: page.title,
  }
}

export async function generateStaticParams() {
  const { docs: pages } = await payload.find({
    collection: "pages",
    select: {
      book: true,
      breadcrumbs: true,
      type: true,
    },
    where: {
      type: {
        equals: "page",
      },
    },
  })

  return pages.flatMap(({ book, breadcrumbs }) => {
    if (!breadcrumbs || breadcrumbs.length === 0) return []

    const slug = new Set(
      breadcrumbs.flatMap(({ url }) => url?.split("/").filter(Boolean)),
    )

    return routing.locales.map((locale) => ({
      locale,
      slug: [book && typeof book === "object" ? book.slug : book, ...slug],
    }))
  })
}

export default async function Page({ params }: Props) {
  const {
    locale,
    slug: [book, ...slug],
  } = await params
  setRequestLocale(locale)
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
    <>
      <header>
        <h1 className="text-accent-foreground font-bold">{page.title}</h1>
        {page.description && (
          <p className="text-muted-foreground">{page.description}</p>
        )}
      </header>
      {page.content ? (
        <RichText className="flex max-w-full flex-col" data={page.content} />
      ) : (
        <Index locale={locale} page={page} />
      )}
    </>
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
    select: {
      book: true,
      breadcrumbs: true,
      description: true,
      id: true,
      slug: true,
      title: true,
    },
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
    <ul className="flex w-full flex-col flex-wrap justify-center gap-2">
      {pages.map((page) => (
        <li className="flex-1" key={page.id}>
          <Card>
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
        </li>
      ))}
    </ul>
  )
}
