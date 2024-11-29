import { Repository } from "@/interfaces/repository"
import { Locale } from "@/types/locale.type"
import { Tag } from "@/types/sanity-schema.type"
import { defineQuery } from "groq"
import { Id, SanityClient } from "sanity"

export class TagRepository implements Repository<Tag> {
  private db: SanityClient

  constructor(sanityClient: SanityClient) {
    this.db = sanityClient
  }

  async findAll(locale: Locale): Promise<Tag[]> {
    return await this.db.fetch<Tag[]>(
      defineQuery(`*[_type == 'tag'] && locale == $locale | order(title asc)`),
      { locale },
    )
  }

  async findById(id: Id): Promise<Tag | null> {
    return await this.db.fetch<Tag>(
      defineQuery(`*[_type == 'tag' && _id == $id][0]`),
      {
        id,
      },
    )
  }
}
