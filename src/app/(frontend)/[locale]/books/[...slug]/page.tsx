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
    limit: 0,
    locale: "all",
    populate: {
      books: {
        slug: true,
      },
    },
    select: {
      book: true,
      breadcrumbs: { url: true },
      locale: true,
      url: true,
    },
    where: {
      slug: { exists: true },
    },
  })

  return pages.flatMap(({ book, ...page }) => {
    if (!(typeof book === "object" && page.url && typeof page.url === "object"))
      return null
    const url = page.url as Record<string, string>
    return Object.entries(url).map(([locale, path]) => ({
      locale,
      slug: [book!.slug, ...path.split("/")],
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
  if (!page) {
    notFound()
  }
  return page.content ? (
    <RichText className="flex max-w-full flex-col" data={page.content} />
  ) : (
    <Index locale={locale} page={page} />
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
    <ul className="flex w-full flex-row flex-wrap place-content-center gap-2 py-4 *:w-full">
      {pages.map((page) => (
        <li key={page.id}>
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
