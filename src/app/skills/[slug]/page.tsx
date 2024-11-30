import { portableTextComponents } from "@/components/portable-text-components"
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

export default async function SkillPage({ params }: { params: Params }) {
  const { slug } = await params
  const database = new SanityDatabase()
  const skillRepository = new SkillRepository(database)
  const skill = await skillRepository.findBySlug(slug)
  if (!skill) {
    return notFound()
  }
  const { title, description } = skill
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
