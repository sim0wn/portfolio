import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui"
import { i18n } from "@/config"
import { payload } from "@/lib"
import { Media } from "@/types"
import { getLocale } from "@/utils"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { Dialog } from "@radix-ui/react-dialog"
import { headers } from "next/headers"
import Image from "next/image"
import { notFound } from "next/navigation"

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

export default async function ModalHighlight({ params }: { params: Params }) {
  const { slug } = await params
  const locale = getLocale(await headers())
  const { docs: highlights } = await payload.find({
    collection: "highlights",
    locale,
    where: { slug: { equals: slug } },
  })
  if (highlights.length === 0) {
    return notFound()
  }
  const [{ description, icon, title }] = highlights
  return (
    <Dialog defaultOpen={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <Image
          alt={(icon as Media).alt}
          className="mx-auto"
          height={1}
          src={(icon as Media).url ?? ""}
          width={200}
        />
        <RichText data={description} />
      </DialogContent>
    </Dialog>
  )
}
