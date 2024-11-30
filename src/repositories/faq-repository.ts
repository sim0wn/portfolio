import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Faq } from "@/types/sanity-schema.type"
import groq, { defineQuery } from "groq"
import { Id } from "sanity"

export class FaqRepository implements Repository<Faq> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale: Locale): Promise<Faq[]> {
    const query = defineQuery(
      groq`*[_type == 'faq' && locale == $locale] | order(question asc)`,
    )
    const params = { locale }
    return await this.database.fetch<Faq[]>(query, params)
  }

  async findById(id: Id): Promise<Faq | null> {
    const query = defineQuery(`*[_type == 'faq' && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch<Faq>(query, params)
  }
}
