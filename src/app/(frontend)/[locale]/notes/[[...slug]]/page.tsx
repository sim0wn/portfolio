import { hasLocale } from "next-intl"
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

export const dynamicParams = true

export async function generateStaticParams() {
  const { docs: notes } = await payload.find({
    collection: "notes",
    limit: 0,
    locale: "all",
    select: {
      breadcrumbs: true,
      url: true,
    },
  })

  return notes.reduce((params: any, { breadcrumbs, url }) => {
    Object.entries(breadcrumbs as unknown as object).forEach(([locale]) => {
      params.push({
        locale,
        slug: url
          .split("/")
          .filter((segment) => segment !== "notes" && segment.length > 0),
      })
    })
    return params
  }, [])
}

export default async function Notes({
  params,
}: PageProps<"/[locale]/notes/[[...slug]]">) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  // Enable static rendering
  setRequestLocale(locale)

  const {
    docs: [note],
  } = await payload.find({
    collection: "notes",
    limit: 1,
    locale: locale,
    sort: ["parent.title", "title"],
    ...(slug && {
      where: {
        url: { equals: `/notes/${slug.join("/")}` },
      },
    }),
  })
  if (!note) notFound()
  if (!note.content) {
    const { docs: notes } = await payload.find({
      collection: "notes",
      locale: locale,
      select: {
        description: true,
        id: true,
        slug: true,
        title: true,
        url: true,
      },
      where: {
        "parent.id": {
          equals: note.id,
        },
        type: {
          equals: "page",
        },
      },
    })
    return (
      <ul className="not-prose flex h-full w-full flex-col gap-2">
        {notes.map((note) => (
          <li className="w-full" key={note.id}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>
                  <Link href={note.url}>{note.title}</Link>
                </CardTitle>
                {note.description && (
                  <CardDescription>{note.description}</CardDescription>
                )}
              </CardHeader>
            </Card>
          </li>
        ))}
      </ul>
    )
  }
  return <RichText data={note.content} />
}
