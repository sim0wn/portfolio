import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Faq } from "@/types/sanity-schema.type"
import groq, { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class FaqRepository implements Repository<Faq> {
  private db: SanityClient

  constructor(sanityClient: SanityClient) {
    this.db = sanityClient
  }

  async findAll(locale: Locale): Promise<Faq[]> {
    const query = defineQuery(
      groq`*[_type == 'faq' && locale == $locale] | order(question asc)`,
    )
    return await this.db.fetch<Faq[]>(query, { locale })
  }

  async findById(id: Id): Promise<Faq | null> {
    const query = defineQuery(`*[_type == 'faq' && _id == $id][0]`)
    return await this.db.fetch<Faq>(query, { id })
  }
}
