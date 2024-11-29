import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Highlight } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class HighlightRepository implements Repository<Highlight> {
  private db: SanityClient

  constructor(sanityClient: SanityClient) {
    this.db = sanityClient
  }

  async findAll(locale: Locale): Promise<Highlight[]> {
    const query = defineQuery(`*[_type == 'highlight' && locale == $locale]`)
    return await this.db.fetch<Highlight[]>(query, { locale })
  }

  async findById(id: Id): Promise<Highlight | null> {
    const query = defineQuery(`*[_type == 'highlight' && _id == $id]`)
    return await this.db.fetch<Highlight>(query, { id })
  }
}
