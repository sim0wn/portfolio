import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Skill } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id } from "sanity"

export class SkillRepository implements Repository<Skill> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale: Locale): Promise<Skill[]> {
    const query = defineQuery(`*[_type == "skill" && locale == $locale]`)
    const params = { locale }
    return await this.database.fetch(query, params)
  }

  async findById(id: Id): Promise<Skill | null> {
    const query = defineQuery(`*[_type == "skill" && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch(query, params)
  }
}
