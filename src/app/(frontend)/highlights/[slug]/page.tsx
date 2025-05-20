import { RichText } from "@payloadcms/richtext-lexical/react"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { i18n } from "@/config"
import { payload } from "@/lib/payload.lib"
import { getLocale } from "@/utils"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const params = []
  for (const locale of i18n.locales) {
    const { docs: highlights } = await payload.find({
      collection: "highlights",
      locale,
      pagination: false,
    })
    params.push(...highlights.map(({ slug }) => ({ slug })))
  }
  return params
}

export default async function HighlightDetails({ params }: { params: Params }) {
  const { slug } = await params
  const locale = getLocale(await headers())
  const { docs: highlights } = await payload.find({
    collection: "highlights",
    limit: 1,
    locale,
    where: { slug: { equals: slug } },
  })
  if (highlights.length === 0) {
    return notFound()
  }
  const [{ description, title }] = highlights
  return (
    <main className="flex flex-col place-content-center gap-2 p-2">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <RichText data={description} />
        </CardContent>
      </Card>
    </main>
  )
}
