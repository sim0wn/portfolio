import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Skill } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class SkillRepository implements Repository<Skill> {
  private db: SanityClient

  constructor(sanityClient: SanityClient) {
    this.db = sanityClient
  }

  async findAll(locale: Locale): Promise<Skill[]> {
    const query = defineQuery(`*[_type == "skill" && locale == $locale]`)
    return await this.db.fetch(query, {
      locale,
    })
  }

  async findById(id: Id): Promise<Skill | null> {
    const query = defineQuery(`*[_type == "skill" && _id == $id][0]`)
    return await this.db.fetch(query, { id })
  }
}
