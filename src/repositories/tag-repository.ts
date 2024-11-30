import { Database } from "@/interfaces/database"
import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Tag } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id } from "sanity"

export class TagRepository implements Repository<Tag> {
  private database: Database

  constructor(database: Database) {
    this.database = database
  }

  async findAll(locale: Locale): Promise<Tag[]> {
    const query = defineQuery(
      `*[_type == 'tag'] && locale == $locale | order(title asc)`,
    )
    const params = { locale }
    return await this.database.fetch<Tag[]>(query, params)
  }

  async findById(id: Id): Promise<Tag | null> {
    const query = defineQuery(`*[_type == 'tag' && _id == $id][0]`)
    const params = { id }
    return await this.database.fetch<Tag>(query, params)
  }
}
