import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Skill } from "@/types/sanity-schema.type"
import groq, { defineQuery } from "groq"
import { Id } from "sanity"

export class SkillRepository implements Repository<Skill> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale?: Locale): Promise<Skill[]> {
    const query = defineQuery(
      groq`*[_type == "skill" && locale == coalesce($locale, locale)]`,
    )
    const params = { locale: locale ?? null }
    return await this.database.fetch(query, params)
  }

  async findById(id: Id): Promise<Skill | null> {
    const query = defineQuery(`*[_type == "skill" && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch(query, params)
  }

  async findBySlug(slug: string): Promise<Skill | null> {
    const query = defineQuery(
      groq`*[_type == "skill" && slug.current == $slug][0]`,
    )
    const params = { slug }
    return await this.database.fetch(query, params)
  }
}
