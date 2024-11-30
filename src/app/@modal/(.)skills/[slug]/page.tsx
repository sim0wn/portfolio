import { portableTextComponents } from "@/components/portable-text-components"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { SanityDatabase } from "@/lib/sanity-database.lib"
import { SkillRepository } from "@/repositories/skill-repository"
import { PortableText } from "next-sanity"
import { notFound } from "next/navigation"

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  const database = new SanityDatabase()
  const skillRepository = new SkillRepository(database)
  const skills = await skillRepository.findAll()
  return skills.map(({ slug }) => ({ slug: slug.current }))
}

export default async function ModalSkill({ params }: { params: Params }) {
  const { slug } = await params
  const database = new SanityDatabase()
  const skillRepository = new SkillRepository(database)
  const skill = await skillRepository.findBySlug(slug)
  if (!skill) {
    return notFound()
  }
  const { title, description } = skill
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
