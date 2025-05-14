import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { payload } from "@/lib"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
  const { docs: highlights } = await payload.find({
    collection: "highlights",
    pagination: false,
  })
  return highlights.map(({ id }) => ({ id }))
}

export default async function ModalHighlight({ params }: { params: Params }) {
  const { id } = await params
  const { docs: highlight } = await payload.find({
    collection: "highlights",
    where: { id: { equals: id } },
  })
  if (!highlight) {
    return notFound()
  }
  const [{ description, title }] = highlight
  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <RichText data={description} />
      </DialogContent>
    </Dialog>
  )
}
