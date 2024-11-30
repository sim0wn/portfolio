import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { portableTextComponents } from "@/components/portable-text-components"
import { PortableText } from "next-sanity"

import { SanityDatabase } from "@/lib/sanity-database.lib"
import { HighlightRepository } from "@/repositories/highlight-repository"

import { notFound } from "next/navigation"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const database = new SanityDatabase()
  const highlightRepository = new HighlightRepository(database)
  const highlights = await highlightRepository.findAll()
  return highlights.map(({ slug }) => ({ slug: slug.current }))
}

export default async function ModalHighlight({ params }: { params: Params }) {
  const { slug } = await params
  const database = new SanityDatabase()
  const highlightRepository = new HighlightRepository(database)
  const highlight = await highlightRepository.findBySlug(slug)
  if (!highlight) {
    return notFound()
  }
  const { title, description } = highlight
  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <PortableText
          value={description}
          components={portableTextComponents}
        ></PortableText>
      </DialogContent>
    </Dialog>
  )
}
