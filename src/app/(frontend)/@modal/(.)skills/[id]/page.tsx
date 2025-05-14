import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui"
import { payload } from "@/lib"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
  const { docs: skills } = await payload.find({
    collection: "skills",
    pagination: false,
  })
  return skills.map(({ id }) => ({ id: id }))
}

export default async function ModalSkill({ params }: { params: Params }) {
  const { id } = await params
  const { docs: skills } = await payload.find({
    collection: "skills",
    where: { id: { equals: id } },
  })
  if (!skills) {
    return notFound()
  }
  const [{ description, title }] = skills
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
