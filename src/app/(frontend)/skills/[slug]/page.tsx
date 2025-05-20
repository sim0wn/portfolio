import { RichText } from "@payloadcms/richtext-lexical/react"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui"
import { i18n } from "@/config"
import { payload } from "@/lib/payload.lib"
import { getLocale } from "@/utils"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const params = []
  for (const locale of i18n.locales) {
    const { docs: skills } = await payload.find({
      collection: "skills",
      locale,
      pagination: false,
    })
    params.push(...skills.map(({ slug }) => ({ slug })))
  }
  return params
}

export default async function SkillPage({ params }: { params: Params }) {
  const { slug } = await params
  const locale = getLocale(await headers())
  const { docs: skills } = await payload.find({
    collection: "skills",
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  if (skills.length === 0) {
    return notFound()
  }
  const [{ brief, description, title }] = skills
  return (
    <main className="flex flex-col place-content-center gap-2 p-2">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{brief}</CardDescription>
        </CardHeader>
        <CardContent>
          <RichText data={description} />
        </CardContent>
      </Card>
    </main>
  )
}
