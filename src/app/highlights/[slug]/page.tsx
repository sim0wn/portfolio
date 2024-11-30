import { portableTextComponents } from "@/components/portable-text-components"
import { SanityDatabase } from "@/lib/sanity-database.lib"
import { HighlightRepository } from "@/repositories/highlight-repository"
import { PortableText } from "next-sanity"
import { notFound } from "next/navigation"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const database = new SanityDatabase()
  const highlightRepository = new HighlightRepository(database)
  const highlights = await highlightRepository.findAll()
  return highlights.map(({ slug }) => ({ slug: slug.current }))
}

export default async function HighlightDetails({ params }: { params: Params }) {
  const { slug } = await params
  const database = new SanityDatabase()
  const highlightRepository = new HighlightRepository(database)
  const highlight = await highlightRepository.findBySlug(slug)
  if (!highlight) {
    return notFound()
  }
  const { title, description } = highlight
  return (
    <main className="flex flex-col place-content-center gap-2 p-2">
      <h1 className="text-center text-lg font-semibold">{title}</h1>
      <PortableText
        value={description}
        components={portableTextComponents}
      ></PortableText>
    </main>
  )
}
