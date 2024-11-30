import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Highlight } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id } from "sanity"

export class HighlightRepository implements Repository<Highlight> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale: Locale): Promise<Highlight[]> {
    const query = defineQuery(`*[_type == 'highlight' && locale == $locale]`)
    const params = { locale }
    return await this.database.fetch<Highlight[]>(query, params)
  }

  async findById(id: Id): Promise<Highlight | null> {
    const query = defineQuery(`*[_type == 'highlight' && _id == $id]`)
    const params = { id }
    return await this.database.fetch<Highlight>(query, params)
  }
}
