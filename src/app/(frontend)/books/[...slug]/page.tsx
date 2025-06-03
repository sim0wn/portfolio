import { headers } from "next/headers"
import Link from "next/link"
import { notFound } from "next/navigation"

import RichText from "@/components/rich-text"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { payload } from "@/lib"
import { Page as PageCollection } from "@/types"
import { getLocale } from "@/utils"

type Params = Promise<{ slug: string[] }>

export default async function Page({ params }: { params: Params }) {
  const {
    slug: [book, ...slug],
  } = await params
  const locale = getLocale(await headers())
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
    <main>
      <h1 className="text-2xl font-bold">{page.title}</h1>
      {page.description && (
        <p className="text-muted-foreground">{page.description}</p>
      )}
      {page.content ? <RichText data={page.content} /> : <Index page={page} />}
    </main>
  )
}

async function Index({ page }: { page: PageCollection }) {
  const locale = getLocale(await headers())
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
                href={
                  page.breadcrumbs?.find((breadcrumb) =>
                    breadcrumb.url?.includes(page.slug),
                  )?.url ?? "#"
                }
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
