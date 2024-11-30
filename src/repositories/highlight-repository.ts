import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Highlight } from "@/types/sanity-schema.type"
import groq, { defineQuery } from "groq"

export class HighlightRepository implements Repository<Highlight> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale?: Locale): Promise<Highlight[]> {
    const query = defineQuery(
      groq`*[_type == 'highlight' && locale == coalesce($locale, locale)]`,
    )
    const params = { locale: locale ?? null }
    return await this.database.fetch<Highlight[]>(query, params)
  }

  async findById(id: string): Promise<Highlight | null> {
    const query = defineQuery(`*[_type == 'highlight' && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch<Highlight>(query, params)
  }

  async findBySlug(slug: string): Promise<Highlight | null> {
    const query = defineQuery(
      groq`*[_type == 'highlight' && slug.current == $slug][0]`,
    )
    const params = { slug }
    return await this.database.fetch<Highlight>(query, params)
  }
}
