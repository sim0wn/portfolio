import { payload } from "@/lib/payload.lib"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
  const { docs: highlights } = await payload.find({ collection: "highlights" })
  return highlights.map(({ id }) => ({ id }))
}

export default async function HighlightDetails({ params }: { params: Params }) {
  const { id } = await params
  const { docs } = await payload.find({
    collection: "highlights",
    limit: 1,
    where: { id: { equals: id } },
  })
  if (!docs) {
    return notFound()
  }
  const [{ description, title }] = docs
  return (
    <main className="flex flex-col place-content-center gap-2 p-2">
      <h1 className="text-center text-lg font-semibold">{title}</h1>
      <RichText data={description} />
    </main>
  )
}
