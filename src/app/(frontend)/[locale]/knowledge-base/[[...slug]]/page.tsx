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
import { Link } from "@/i18n"
import { payload } from "@/lib"

type Props = { params: Promise<{ locale: Locale; slug: string[] }> }

export const dynamicParams = true

export async function generateStaticParams() {
  const { docs: pages } = await payload.find({
    collection: "pages",
    limit: 0,
    locale: "all",
    select: {
      breadcrumbs: true,
      url: true,
    },
  })

  return pages.flatMap(({ url }) => {
    if (!(url && typeof url === "object")) return null
    return Object.entries(url).map(([locale, slugs]) => ({
      locale,
      slug: (slugs as string).split("/"),
    }))
  })
}

export default async function Page({ params }: Props) {
  const { locale, slug } = await params

  // Enable static rendering
  setRequestLocale(locale)

  const {
    docs: [page],
  } = await payload.find({
    collection: "pages",
    limit: 1,
    locale,
    sort: ["parent.title", "title"],
    ...(slug && {
      where: {
        "breadcrumbs.url": { equals: `/${slug.join("/")}` },
      },
    }),
  })
  if (!page) {
    notFound()
  }
  if (!page.content) {
    const { docs: pages } = await payload.find({
      collection: "pages",
      locale,
      select: {
        breadcrumbs: true,
        description: true,
        id: true,
        slug: true,
        title: true,
        url: true,
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
      <ul className="not-prose flex h-full w-full flex-col gap-2">
        {pages.map((page) => (
          <li className="w-full" key={page.id}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  <Link href={`/knowledge-base/${page.url}`}>{page.title}</Link>
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
  return <RichText data={page.content} />
}
