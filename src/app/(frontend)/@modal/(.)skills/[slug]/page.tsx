import { RichText } from "@payloadcms/richtext-lexical/react"
import { headers } from "next/headers"
import { notFound } from "next/navigation"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui"
import { i18n } from "@/config"
import { payload } from "@/lib"
import { getLocale } from "@/utils"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const params = []
  for (const locale of i18n.locales) {
    const { docs: skills } = await payload.find({
      collection: "skills",
      locale: locale,
      pagination: false,
    })
    params.push(...skills.map(({ slug }) => ({ slug })))
  }
  return params
}

export default async function ModalSkill({ params }: { params: Params }) {
  const { slug } = await params
  const requestHeaders = await headers()
  const locale = getLocale(requestHeaders)
  const { docs: skills } = await payload.find({
    collection: "skills",
    locale,
    where: { slug: { equals: slug } },
  })
  if (skills.length === 0) {
    return notFound()
  }
  const [{ brief, description, title }] = skills
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{brief}</DialogDescription>
        </DialogHeader>
        <RichText data={description} />
      </DialogContent>
    </Dialog>
  )
}
