import { payload } from "@/lib/payload.lib"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { notFound } from "next/navigation"

type Params = Promise<{ id: string }>

export async function generateStaticParams() {
  const { docs: skills } = await payload.find({
    collection: "skills",
    pagination: false,
  })
  return skills.map(({ id }) => ({ id }))
}

export default async function SkillPage({ params }: { params: Params }) {
  const { id } = await params
  const { docs: skills } = await payload.find({
    collection: "skills",
    where: {
      id: {
        equals: id,
      },
    },
  })
  if (!skills) {
    return notFound()
  }
  const [{ description, title }] = skills
  return (
    <main className="flex flex-col place-content-center gap-2 p-2">
      <h1 className="text-center text-lg font-semibold">{title}</h1>
      <RichText data={description} />
    </main>
  )
}
